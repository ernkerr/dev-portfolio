import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawEventsPath = path.join(__dirname, "output", "raw-events.json");
const snapshotPath = path.join(
  __dirname,
  "..",
  "..",
  "src",
  "data",
  "expoWest2026",
  "snapshot.ts",
);

const DAY_KEYS = new Set([
  "2026-03-03",
  "2026-03-04",
  "2026-03-05",
  "2026-03-06",
]);

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function normalizeDay(input) {
  if (!input || typeof input !== "string") {
    return null;
  }

  const directDate = input.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  if (directDate && DAY_KEYS.has(directDate)) {
    return directDate;
  }

  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  const yyyy = parsed.getFullYear();
  const mm = String(parsed.getMonth() + 1).padStart(2, "0");
  const dd = String(parsed.getDate()).padStart(2, "0");
  const day = `${yyyy}-${mm}-${dd}`;

  return DAY_KEYS.has(day) ? day : null;
}

function formatTimeLabel(startIso, endIso, fallbackLabel) {
  if (typeof fallbackLabel === "string" && fallbackLabel.trim().length > 0) {
    return fallbackLabel.replace(/\s+/g, " ").trim();
  }

  if (!startIso) {
    return "Time TBD";
  }

  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) {
    return "Time TBD";
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Los_Angeles",
  });

  if (endIso) {
    const end = new Date(endIso);
    if (!Number.isNaN(end.getTime())) {
      return `${formatter.format(start)} - ${formatter.format(end)}`;
    }
  }

  return formatter.format(start);
}

function findValueByKeys(node, keys, depth = 0) {
  if (depth > 8 || node == null) {
    return null;
  }

  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findValueByKeys(item, keys, depth + 1);
      if (found != null) {
        return found;
      }
    }
    return null;
  }

  if (!isRecord(node)) {
    return null;
  }

  for (const [k, v] of Object.entries(node)) {
    if (keys.has(k)) {
      return v;
    }
  }

  for (const value of Object.values(node)) {
    const found = findValueByKeys(value, keys, depth + 1);
    if (found != null) {
      return found;
    }
  }

  return null;
}

function asString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parseIso(value) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return "";
  }

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    return "";
  }

  return d.toISOString();
}

function extractLocation(raw) {
  if (!isRecord(raw)) {
    return "Location TBD";
  }

  if (typeof raw.location === "string" && raw.location.trim().length > 0) {
    return raw.location.trim();
  }

  if (isRecord(raw.location) && typeof raw.location.name === "string") {
    const locationName = raw.location.name.trim();
    if (locationName.length > 0) {
      return locationName;
    }
  }

  const locationName = asString(raw.locationName);
  if (locationName) {
    return locationName;
  }

  const venue = asString(raw.venue);
  if (venue) {
    return venue;
  }

  const place = asString(raw.place);
  if (place) {
    return place;
  }

  const room = asString(raw.room);
  if (room) {
    return room;
  }

  return "Location TBD";
}

function fallbackStartIso(dayKey) {
  return `${dayKey}T08:00:00.000Z`;
}

function normalizeGraphqlEvent(raw) {
  if (!isRecord(raw)) {
    return null;
  }

  const title =
    asString(raw.withEvent?.title) ||
    asString(raw.withEvent?.name) ||
    asString(raw.title) ||
    asString(raw.name) ||
    asString(findValueByKeys(raw, new Set(["title", "name", "sessionTitle"])));

  if (!title) {
    return null;
  }

  const externalId =
    asString(raw.id) ||
    asString(raw.externalId) ||
    asString(findValueByKeys(raw, new Set(["id", "externalId", "sessionId"])));

  const startRaw =
    asString(raw.startDate) ||
    asString(raw.startTime) ||
    asString(raw.startAt) ||
    asString(raw.startsAt) ||
    asString(raw.beginsAt) ||
    asString(
      findValueByKeys(
        raw,
        new Set(["startDate", "startTime", "startsAt", "startAt", "beginsAt"]),
      ),
    );

  const endRaw =
    asString(raw.endDate) ||
    asString(raw.endTime) ||
    asString(raw.endAt) ||
    asString(raw.endsAt) ||
    asString(
      findValueByKeys(raw, new Set(["endDate", "endTime", "endsAt", "endAt"])),
    );

  const dayHint = asString(raw.__dayKeyHint);
  const dayKey = normalizeDay(startRaw) || normalizeDay(dayHint);
  if (!dayKey) {
    return null;
  }

  const startIso = parseIso(startRaw) || fallbackStartIso(dayKey);
  const endIso = parseIso(endRaw);

  const location = extractLocation(raw);

  const timeLabel = formatTimeLabel(
    startIso,
    endIso || undefined,
    asString(raw.timeLabel) || asString(raw.time),
  );

  const id =
    externalId.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
    `ew26-${dayKey}-${slugify(title)}`;

  return {
    id,
    ...(externalId ? { externalId } : {}),
    title,
    dayKey,
    startIso,
    ...(endIso ? { endIso } : {}),
    timeLabel,
    location,
  };
}

function extractCurrentVersion(fileContent) {
  const match = fileContent.match(/["']?version["']?\s*:\s*(\d+)/);
  if (!match) {
    return 0;
  }

  return Number.parseInt(match[1], 10) || 0;
}

function compareEvents(a, b) {
  const t = a.startIso.localeCompare(b.startIso);
  if (t !== 0) {
    return t;
  }

  return a.title.localeCompare(b.title);
}

async function run() {
  const [rawText, snapshotFile] = await Promise.all([
    readFile(rawEventsPath, "utf8"),
    readFile(snapshotPath, "utf8"),
  ]);

  const payload = JSON.parse(rawText);
  const sourceEvents = Array.isArray(payload.apiEvents) ? payload.apiEvents : [];

  if (sourceEvents.length === 0) {
    throw new Error("No apiEvents found in raw-events.json. Run scrape.mjs first.");
  }

  const normalizedMap = new Map();

  for (const rawEvent of sourceEvents) {
    const normalized = normalizeGraphqlEvent(rawEvent);
    if (!normalized) {
      continue;
    }

    if (!normalizedMap.has(normalized.id)) {
      normalizedMap.set(normalized.id, normalized);
    }
  }

  const normalizedEvents = Array.from(normalizedMap.values()).sort(compareEvents);

  if (normalizedEvents.length === 0) {
    throw new Error("No events normalized from GraphQL payload.");
  }

  const version = extractCurrentVersion(snapshotFile) + 1;
  const snapshot = {
    version,
    generatedAtIso: new Date().toISOString(),
    events: normalizedEvents,
  };

  const nextFileContent = `import { ScheduleSnapshot } from "@/types/expoWest2026";\n\nexport const EXPO_WEST_2026_SNAPSHOT: ScheduleSnapshot = ${JSON.stringify(
    snapshot,
    null,
    2,
  )};\n`;

  await writeFile(snapshotPath, nextFileContent, "utf8");

  const byDay = normalizedEvents.reduce((acc, event) => {
    acc[event.dayKey] = (acc[event.dayKey] ?? 0) + 1;
    return acc;
  }, {});

  console.log(
    `Wrote ${normalizedEvents.length} events to src/data/expoWest2026/snapshot.ts (v${version}).`,
  );
  console.log("Events by day:", byDay);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
