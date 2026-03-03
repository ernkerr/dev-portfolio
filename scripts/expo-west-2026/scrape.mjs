import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, "output");

const GRAPHQL_ENDPOINT = "https://attend.expowest.com/api/graphql";
const OPERATION_NAME = "PlanningListViewConnectionQuery";

const EVENT_ID = process.env.EXPO_EVENT_ID ?? "RXZlbnRfMzAxMDc4Nw==";
const DEFAULT_VIEW_ID = process.env.EXPO_VIEW_ID ?? "RXZlbnRWaWV3XzEyMjU1Njk=";
const VIEW_IDS = (process.env.EXPO_VIEW_IDS ?? DEFAULT_VIEW_ID)
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const TIMEZONE = process.env.EXPO_TIMEZONE ?? "America/Los_Angeles";
const PERSISTED_QUERY_HASH =
  process.env.EXPO_PERSISTED_QUERY_HASH ??
  "5c7696e702496293ae7a4015d5fa1966960bcc7cffccbffc31a968351bf2281e";

const DAY_KEYS = ["2026-03-03", "2026-03-04", "2026-03-05", "2026-03-06"];
const PAGE_SIZE = 500;

function parseDayWindow(dayKey) {
  const start = Math.floor(new Date(`${dayKey}T00:00:00-08:00`).getTime() / 1000);
  const end = Math.floor(new Date(`${dayKey}T24:00:00-08:00`).getTime() / 1000);

  return { start, end };
}

function buildAggregationId(dayKey) {
  const { start, end } = parseDayWindow(dayKey);
  const payload = { data: { range: [start, end] } };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

function makeRequestBody({ viewId, aggregationId, after }) {
  return [
    {
      operationName: OPERATION_NAME,
      variables: {
        eventId: EVENT_ID,
        withEvent: true,
        viewId,
        timezone: TIMEZONE,
        aggregationsIds: [aggregationId],
        after,
        first: PAGE_SIZE,
      },
      extensions: {
        persistedQuery: {
          version: 1,
          sha256Hash: PERSISTED_QUERY_HASH,
        },
      },
    },
  ];
}

function walkForNodeContainers(node, output, depth = 0) {
  if (!node || depth > 8) {
    return;
  }

  if (Array.isArray(node)) {
    for (const item of node) {
      walkForNodeContainers(item, output, depth + 1);
    }
    return;
  }

  if (typeof node !== "object") {
    return;
  }

  const maybeConnection = node;
  if (
    Array.isArray(maybeConnection.edges) &&
    maybeConnection.pageInfo &&
    typeof maybeConnection.pageInfo === "object"
  ) {
    output.push({
      shape: "edges",
      nodes: maybeConnection.edges
        .map((edge) => edge?.node)
        .filter((n) => n && typeof n === "object"),
      pageInfo: maybeConnection.pageInfo,
    });
  }

  if (Array.isArray(maybeConnection.nodes)) {
    output.push({
      shape: "nodes",
      nodes: maybeConnection.nodes.filter((n) => n && typeof n === "object"),
      pageInfo:
        isRecord(maybeConnection.pageInfo) || isRecord(maybeConnection.pagination)
          ? maybeConnection.pageInfo ?? maybeConnection.pagination
          : null,
    });
  }

  for (const value of Object.values(maybeConnection)) {
    walkForNodeContainers(value, output, depth + 1);
  }
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function extractPrimaryContainer(responsePayload) {
  const roots = Array.isArray(responsePayload)
    ? responsePayload.map((item) => item?.data).filter(Boolean)
    : [responsePayload?.data].filter(Boolean);

  const candidates = [];
  for (const root of roots) {
    walkForNodeContainers(root, candidates);
  }

  if (candidates.length === 0) {
    return null;
  }

  return candidates.sort((a, b) => (b.nodes?.length ?? 0) - (a.nodes?.length ?? 0))[0];
}

async function fetchDayPage(viewId, dayKey, aggregationId, after) {
  const body = makeRequestBody({ viewId, aggregationId, after });

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "https://attend.expowest.com",
      Referer: "https://attend.expowest.com/",
      "User-Agent": "Mozilla/5.0 Codex ExpoWest GraphQL Scraper",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `GraphQL request failed for ${dayKey} (${response.status}): ${text.slice(0, 300)}`,
    );
  }

  const payload = await response.json();
  const hasErrors = Array.isArray(payload)
    ? payload.some((entry) => Array.isArray(entry?.errors) && entry.errors.length > 0)
    : Array.isArray(payload?.errors) && payload.errors.length > 0;

  if (hasErrors) {
    throw new Error(
      `GraphQL response returned errors for ${dayKey}: ${JSON.stringify(payload).slice(0, 800)}`,
    );
  }

  const container = extractPrimaryContainer(payload);
  if (!container) {
    throw new Error(
      `No node container found in GraphQL payload for ${dayKey}. First payload chunk: ${JSON.stringify(
        payload,
      ).slice(0, 500)}`,
    );
  }

  const nodes = container.nodes
    .map((node) => ({ ...node, __dayKeyHint: dayKey }));

  const pageInfo = isRecord(container.pageInfo) ? container.pageInfo : {};

  return {
    nodes,
    pageInfo: {
      hasNextPage: Boolean(pageInfo.hasNextPage),
      endCursor: typeof pageInfo.endCursor === "string" ? pageInfo.endCursor : null,
    },
    rawPayload: payload,
  };
}

async function fetchAllEvents() {
  const rawResponses = [];
  const allNodes = [];

  for (const viewId of VIEW_IDS) {
    for (const dayKey of DAY_KEYS) {
      const aggregationId = buildAggregationId(dayKey);
      let after = null;
      let page = 1;

      while (true) {
        const { nodes, pageInfo, rawPayload } = await fetchDayPage(
          viewId,
          dayKey,
          aggregationId,
          after,
        );

        rawResponses.push({ viewId, dayKey, page, after, payload: rawPayload });
        allNodes.push(...nodes.map((node) => ({ ...node, __viewIdHint: viewId })));

        if (!pageInfo.hasNextPage || !pageInfo.endCursor) {
          break;
        }

        after = pageInfo.endCursor;
        page += 1;

        if (page > 100) {
          throw new Error(`Pagination guard hit for view ${viewId} day ${dayKey}.`);
        }
      }
    }
  }

  return { allNodes, rawResponses };
}

async function run() {
  await mkdir(outputDir, { recursive: true });

  const { allNodes, rawResponses } = await fetchAllEvents();

  const artifact = {
    fetchedAtIso: new Date().toISOString(),
    endpoint: GRAPHQL_ENDPOINT,
    operationName: OPERATION_NAME,
    eventId: EVENT_ID,
    viewIds: VIEW_IDS,
    timezone: TIMEZONE,
    persistedQueryHash: PERSISTED_QUERY_HASH,
    dayKeys: DAY_KEYS,
    totalRawNodes: allNodes.length,
    apiEvents: allNodes,
  };

  await writeFile(
    path.join(outputDir, "raw-events.json"),
    JSON.stringify(artifact, null, 2),
    "utf8",
  );

  await writeFile(
    path.join(outputDir, "raw-responses.json"),
    JSON.stringify(rawResponses, null, 2),
    "utf8",
  );

  console.log(`Fetched ${allNodes.length} raw event nodes from GraphQL.`);
  console.log(`Saved artifacts to ${outputDir}`);
  console.log("Next step: run `node scripts/expo-west-2026/normalize.mjs`.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
