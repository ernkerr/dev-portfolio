import crypto from "node:crypto";
import zlib from "node:zlib";
import { unstable_cache } from "next/cache";

// Gin Score Tracker's totals since launch, from App Store Connect's sales
// reports. Needs a "Sales" API key in the environment (never in the repo):
//   ASC_ISSUER_ID, ASC_KEY_ID, ASC_PRIVATE_KEY (the .p8 file's contents),
//   ASC_VENDOR_NUMBER (Trends > Reports in App Store Connect).
// Server only. Without the key it returns null and the page says so.

const APP_ID = "6746460027";
const LAUNCH = new Date("2025-06-02T00:00:00Z");
const API = "https://api.appstoreconnect.apple.com/v1/salesReports";

// Product types in the sales report: first-time downloads of the app, and
// paid in-app purchases (one-time unlocks and subscriptions).
const DOWNLOADS = new Set(["1", "1F", "1T"]);
const PURCHASES = new Set(["IA1", "IA9", "IAY"]);

export type GinSales = {
  downloads: number;
  purchases: number;
  /** The last day the totals include, as YYYY-MM-DD. */
  through: string;
};

type Row = Record<string, string>;

function token(): string | null {
  const iss = process.env.ASC_ISSUER_ID;
  const kid = process.env.ASC_KEY_ID;
  const pem = process.env.ASC_PRIVATE_KEY;
  if (!iss || !kid || !pem) return null;
  const now = Math.floor(Date.now() / 1000);
  const part = (o: object) =>
    Buffer.from(JSON.stringify(o)).toString("base64url");
  const data = `${part({ alg: "ES256", kid, typ: "JWT" })}.${part({
    iss,
    iat: now,
    exp: now + 15 * 60,
    aud: "appstoreconnect-v1",
  })}`;
  const key = crypto.createPrivateKey(pem.replace(/\\n/g, "\n"));
  const signature = crypto.sign("sha256", Buffer.from(data), {
    key,
    dsaEncoding: "ieee-p1363",
  });
  return `${data}.${signature.toString("base64url")}`;
}

/** One summary sales report, or null when there were no sales or it isn't out yet. */
async function report(
  jwt: string,
  vendor: string,
  frequency: "YEARLY" | "MONTHLY" | "DAILY",
  date: string,
): Promise<Row[] | null> {
  const params = new URLSearchParams({
    "filter[frequency]": frequency,
    "filter[reportType]": "SALES",
    "filter[reportSubType]": "SUMMARY",
    "filter[vendorNumber]": vendor,
    "filter[reportDate]": date,
    "filter[version]": "1_1",
  });
  const res = await fetch(`${API}?${params}`, {
    headers: { Authorization: `Bearer ${jwt}`, Accept: "application/a-gzip" },
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`App Store Connect returned ${res.status} for ${date}`);
  }
  const tsv = zlib
    .gunzipSync(Buffer.from(await res.arrayBuffer()))
    .toString("utf8");
  const [head, ...lines] = tsv.trim().split("\n");
  const columns = head.split("\t").map((c) => c.trim());
  return lines.map((line) => {
    const cells = line.split("\t");
    return Object.fromEntries(columns.map((c, i) => [c, cells[i] ?? ""]));
  });
}

const day = (d: Date) => d.toISOString().slice(0, 10);

type Period = { frequency: "YEARLY" | "MONTHLY" | "DAILY"; date: string };

const daysOf = (year: number, month: number, upTo: number): Period[] =>
  Array.from({ length: upTo }, (_, i) => ({
    frequency: "DAILY",
    date: day(new Date(Date.UTC(year, month, i + 1))),
  }));

/** Every report that covers launch day through yesterday, coarsest first. */
function periods(today: Date): Period[] {
  const out: Period[] = [];
  const year = today.getUTCFullYear();
  const month = today.getUTCMonth();
  for (let y = LAUNCH.getUTCFullYear(); y < year; y++) {
    out.push({ frequency: "YEARLY", date: String(y) });
  }
  const firstMonth =
    year === LAUNCH.getUTCFullYear() ? LAUNCH.getUTCMonth() : 0;
  for (let m = firstMonth; m < month; m++) {
    out.push({
      frequency: "MONTHLY",
      date: `${year}-${String(m + 1).padStart(2, "0")}`,
    });
  }
  return [...out, ...daysOf(year, month, today.getUTCDate() - 1)];
}

/** The last day a report covers. */
function lastDay(p: Period) {
  if (p.frequency === "DAILY") return p.date;
  if (p.frequency === "YEARLY") return `${p.date}-12-31`;
  const [y, m] = p.date.split("-").map(Number);
  return day(new Date(Date.UTC(y, m, 0)));
}

async function count(): Promise<GinSales | null> {
  const jwt = token();
  const vendor = process.env.ASC_VENDOR_NUMBER;
  if (!jwt || !vendor) return null;

  const today = new Date();
  const list = periods(today);
  const all: Row[] = [];
  let through = "";
  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    const rows = await report(jwt, vendor, p.frequency, p.date);
    // Last month's report comes out a few days late; use its days until then.
    const nextIsDaily =
      list[i + 1]?.frequency === "DAILY" || i === list.length - 1;
    if (!rows && p.frequency === "MONTHLY" && nextIsDaily) {
      const [y, m] = p.date.split("-").map(Number);
      const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
      list.splice(i + 1, 0, ...daysOf(y, m - 1, days));
      continue;
    }
    if (rows) {
      all.push(...rows);
      through = lastDay(p);
    } else if (p.frequency !== "DAILY") {
      through = lastDay(p);
    }
  }

  // In-app purchases point at their app by its SKU, so find Gin's first.
  const skus = new Set(
    all.filter((r) => r["Apple Identifier"] === APP_ID).map((r) => r.SKU),
  );
  let downloads = 0;
  let purchases = 0;
  for (const r of all) {
    const type = r["Product Type Identifier"];
    const units = Number(r.Units) || 0;
    if (r["Apple Identifier"] === APP_ID && DOWNLOADS.has(type)) {
      downloads += units;
    } else if (skus.has(r["Parent Identifier"]) && PURCHASES.has(type)) {
      purchases += units;
    }
  }
  return { downloads, purchases, through };
}

/** Counted at most once a day. */
export const getGinSales = unstable_cache(count, ["gin-sales"], {
  revalidate: 60 * 60 * 24,
});
