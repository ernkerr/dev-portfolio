import crypto from "node:crypto";
import zlib from "node:zlib";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { keepMonth, keptMonths } from "./keptMonths";
import { SAVED_MONTHS } from "./savedMonths";

// Gin Score Tracker's totals since launch, from App Store Connect's sales
// reports. Needs a "Sales" API key in the environment (never in the repo):
//   ASC_ISSUER_ID, ASC_KEY_ID, ASC_PRIVATE_KEY (the .p8 file's contents),
//   ASC_VENDOR_NUMBER (Trends > Reports in App Store Connect).
// Server only. Without the key it returns null and the page says so.
//
// Apple keeps daily and monthly reports for a year and yearly ones for ten,
// so past years are counted from their yearly reports and nothing is lost.

const APP_ID = "6746460027";
const LAUNCH = new Date("2025-06-02T00:00:00Z");
const API = "https://api.appstoreconnect.apple.com/v1/salesReports";

// Product types in the sales report. A first-time download counts each Apple
// Account once. A redownload is the same account installing it again, on the
// same device or a new one.
const FIRST_TIME = new Set(["1", "1F", "1T"]);
const REDOWNLOADS = new Set(["3", "3F", "3T"]);
// Premium, as a one-time unlock or a subscription.
const PURCHASES = new Set(["IA1", "IA9", "IAY"]);

export type GinSales = {
  /** Apple Accounts that downloaded the app, each counted once. */
  users: number;
  /** Every download, first-time and redownloads. */
  downloads: number;
  /** Paid Premium purchases, not counting renewals or promo codes. */
  purchases: number;
  /** New users by device: iPhone, iPad, Mac. */
  devices: Record<string, number>;
  /** New users by country code, most first. */
  countries: [string, number][];
  /** New users a month on average, for each year since launch. */
  years: { year: number; perMonth: number; soFar: boolean }[];
  /**
   * New users in each finished month, oldest first, or null for a month Apple
   * no longer has that wasn't saved.
   */
  months: { month: string; users: number | null }[];
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

/** A report Apple has deleted. */
class Gone extends Error {}

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
    "filter[version]": "1_0",
  });
  const res = await fetch(`${API}?${params}`, {
    headers: { Authorization: `Bearer ${jwt}`, Accept: "application/a-gzip" },
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (res.status === 410) throw new Gone(`${frequency} ${date} is gone`);
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

/** A year as its months, or a month as its days. */
function finer(p: Period): Period[] {
  if (p.frequency === "YEARLY") {
    return Array.from({ length: 12 }, (_, m) => ({
      frequency: "MONTHLY",
      date: `${p.date}-${String(m + 1).padStart(2, "0")}`,
    }));
  }
  const [y, m] = p.date.split("-").map(Number);
  return daysOf(y, m - 1, new Date(Date.UTC(y, m, 0)).getUTCDate());
}

// Yearly reports come out 6 days after the year ends, monthly ones 5 days
// after the month.
const LATE_DAYS = 10;

type Get = (p: Period) => Promise<Row[] | null>;

/**
 * Every row in these reports, each marked with the period it came `from`.
 * Until a year's or month's report is out, it's counted by its months or days.
 */
async function collect(list: Period[], get: Get, today: Date) {
  const rows: Row[] = [];
  let through = "";
  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    const found = await get(p);
    const ended = (today.getTime() - Date.parse(lastDay(p))) / 86_400_000;
    if (!found && p.frequency !== "DAILY" && ended <= LATE_DAYS) {
      list.splice(i + 1, 0, ...finer(p));
      continue;
    }
    if (found) rows.push(...found.map((r) => ({ ...r, from: p.date })));
    if (found || p.frequency !== "DAILY") through = lastDay(p);
  }
  return { rows, through };
}

const units = (r: Row) => Number(r.Units) || 0;
const isNewUser = (r: Row) =>
  r["Apple Identifier"] === APP_ID &&
  FIRST_TIME.has(r["Product Type Identifier"]);

/** The month after a YYYY-MM month. */
function nextMonth(month: string) {
  const [y, m] = month.split("-").map(Number);
  return day(new Date(Date.UTC(y, m, 1))).slice(0, 7);
}

/** Months saved in the repo, plus those the cron job has kept since. */
async function savedMonths(): Promise<Record<string, number>> {
  const kept = await keptMonths().catch((error) => {
    console.error("Couldn't read Gin Score Tracker's kept months", error);
    return {};
  });
  return { ...SAVED_MONTHS, ...kept };
}

/**
 * Saves each finished month after the last saved one, once Apple's monthly
 * report is out, so the chart keeps it after Apple deletes the report. The
 * daily cron job runs this; most days there's nothing new. Returns what it
 * saved.
 */
export async function saveFinishedMonths(): Promise<Record<string, number>> {
  const jwt = token();
  const vendor = process.env.ASC_VENDOR_NUMBER;
  if (!jwt || !vendor) return {};
  const today = new Date();
  const saved = Object.keys(await savedMonths()).sort();
  const thisMonth = day(today).slice(0, 7);
  const out: Record<string, number> = {};
  for (
    let m = nextMonth(saved[saved.length - 1]);
    m < thisMonth;
    m = nextMonth(m)
  ) {
    let rows: Row[] | null;
    try {
      rows = await report(jwt, vendor, "MONTHLY", m);
    } catch (error) {
      // Gone for good: the job didn't run for a year. Nothing to save.
      if (error instanceof Gone) continue;
      throw error;
    }
    const ended =
      (today.getTime() -
        Date.parse(lastDay({ frequency: "MONTHLY", date: m }))) /
      86_400_000;
    // Not out yet, so try again tomorrow. Once it's out, none means 0.
    if (!rows && ended <= LATE_DAYS) break;
    const users = (rows ?? [])
      .filter(isNewUser)
      .reduce((n, r) => n + units(r), 0);
    if (!(await keepMonth(m, users))) break;
    out[m] = users;
  }
  return out;
}

async function count(): Promise<GinSales | null> {
  const jwt = token();
  const vendor = process.env.ASC_VENDOR_NUMBER;
  if (!jwt || !vendor) return null;

  // Each report is fetched once, even when the totals and the chart both
  // need it.
  const fetched = new Map<string, Promise<Row[] | null>>();
  const get: Get = (p) => {
    const key = `${p.frequency} ${p.date}`;
    if (!fetched.has(key)) {
      fetched.set(key, report(jwt, vendor, p.frequency, p.date));
    }
    return fetched.get(key)!;
  };
  const today = new Date();
  const { rows: all, through } = await collect(periods(today), get, today);

  // In-app purchases point at their app by its SKU, so find Gin's first.
  const skus = new Set(
    all.filter((r) => r["Apple Identifier"] === APP_ID).map((r) => r.SKU),
  );
  let users = 0;
  let redownloads = 0;
  let purchases = 0;
  const devices: Record<string, number> = {};
  const countries: Record<string, number> = {};
  const byYear = new Map<number, number>();
  for (const r of all) {
    const type = r["Product Type Identifier"];
    const n = units(r);
    if (isNewUser(r)) {
      users += n;
      // Apple calls a Mac running the iPad app "Desktop".
      const device = r.Device === "Desktop" ? "Mac" : r.Device;
      devices[device] = (devices[device] ?? 0) + n;
      countries[r["Country Code"]] = (countries[r["Country Code"]] ?? 0) + n;
      const year = Number(r.from.slice(0, 4));
      byYear.set(year, (byYear.get(year) ?? 0) + n);
    } else if (r["Apple Identifier"] === APP_ID && REDOWNLOADS.has(type)) {
      redownloads += n;
    } else if (
      skus.has(r["Parent Identifier"]) &&
      PURCHASES.has(type) &&
      r.Subscription !== "Renewal" &&
      // A promo code is free. Refunds have a negative price and still count.
      Number(r["Customer Price"]) !== 0
    ) {
      purchases += n;
    }
  }

  // New users each month: saved months, then later ones from Apple.
  const months: GinSales["months"] = Object.entries(await savedMonths())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, users]) => ({ month, users }));
  const thisMonth = day(today).slice(0, 7);
  for (
    let m = nextMonth(months[months.length - 1].month);
    m < thisMonth;
    m = nextMonth(m)
  ) {
    try {
      const { rows } = await collect(
        [{ frequency: "MONTHLY", date: m }],
        get,
        today,
      );
      const n = rows.filter(isNewUser).reduce((sum, r) => sum + units(r), 0);
      months.push({ month: m, users: n });
    } catch (error) {
      if (!(error instanceof Gone)) throw error;
      months.push({ month: m, users: null });
    }
  }

  // New users a month on average: past years from their yearly totals, this
  // year from its finished months.
  const launchYear = LAUNCH.getUTCFullYear();
  const year = today.getUTCFullYear();
  const years: GinSales["years"] = [];
  for (let y = launchYear; y < year; y++) {
    const active = 12 - (y === launchYear ? LAUNCH.getUTCMonth() : 0);
    const perMonth = Math.round((byYear.get(y) ?? 0) / active);
    years.push({ year: y, perMonth, soFar: false });
  }
  const done = months.filter(
    (m) => m.month.startsWith(`${year}-`) && m.users !== null,
  );
  if (done.length) {
    const sum = done.reduce((n, m) => n + (m.users ?? 0), 0);
    years.push({ year, perMonth: Math.round(sum / done.length), soFar: true });
  }

  return {
    users,
    downloads: users + redownloads,
    purchases,
    devices,
    countries: Object.entries(countries).sort((a, b) => b[1] - a[1]),
    years,
    months,
    through,
  };
}

// Bump the key if a bad result was ever cached.
/** Saving a month refreshes the numbers right away (the cron job). */
export const GIN_SALES_TAG = "gin-sales";

const countDaily = unstable_cache(count, ["gin-sales-v6"], {
  revalidate: 60 * 60 * 24,
  tags: [GIN_SALES_TAG],
});

/**
 * Counted at most once a day, and once per page however many parts show it.
 * Without a key there's nothing to cache, so a key added later shows up right
 * away instead of after a day of "no key".
 */
export const getGinSales = cache(async (): Promise<GinSales | null> => {
  const { ASC_ISSUER_ID, ASC_KEY_ID, ASC_PRIVATE_KEY, ASC_VENDOR_NUMBER } =
    process.env;
  if (!ASC_ISSUER_ID || !ASC_KEY_ID || !ASC_PRIVATE_KEY || !ASC_VENDOR_NUMBER) {
    return null;
  }
  return countDaily();
});

export type GinRating = {
  stars: number;
  count: number;
  /**
   * When the rating started over, as YYYY-MM-DD: the release date of the
   * current version, if every rating is for it.
   */
  since?: string;
};

/** The US App Store's rating, public and checked at most once a day. */
export async function getGinRating(): Promise<GinRating | null> {
  const res = await fetch(
    `https://itunes.apple.com/lookup?id=${APP_ID}&country=us`,
    { next: { revalidate: 60 * 60 * 24 } },
  );
  if (!res.ok) return null;
  const app = (await res.json()).results?.[0];
  if (!app?.userRatingCount) return null;
  const since =
    app.userRatingCountForCurrentVersion === app.userRatingCount
      ? app.currentVersionReleaseDate?.slice(0, 10)
      : undefined;
  return { stars: app.averageUserRating, count: app.userRatingCount, since };
}
