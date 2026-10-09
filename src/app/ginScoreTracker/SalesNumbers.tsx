import type { ReactNode } from "react";
import {
  Caption,
  Facts,
  label,
  H3,
  P,
  Stats,
  TipLabel,
} from "@/components/site/prose";
import {
  getGinRating,
  getGinSales,
  type GinRating,
  type GinSales,
} from "./sales";

// The case study's live numbers from App Store Connect and the App Store,
// counted at most once a day. Until the API key is set up, they show nothing.

async function load<T>(what: string, get: () => Promise<T | null>) {
  try {
    return await get();
  } catch (error) {
    console.error(`Couldn't load Gin Score Tracker's ${what}`, error);
    return null;
  }
}

const count = (n: number) => n.toLocaleString("en-US");

/** "a", "a and b", "a, b and c" */
function and(items: string[]) {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const regions = new Intl.DisplayNames(["en"], { type: "region" });
const place = (code: string) =>
  ({ US: "the US", GB: "the UK" })[code] ?? regions.of(code) ?? code;

/** Each device's share of new users, biggest first, leaving out under 1%. */
function deviceShares(sales: GinSales) {
  return Object.entries(sales.devices)
    .map(([device, n]) => ({
      device,
      share: Math.round((100 * n) / sales.users),
    }))
    .filter((d) => d.share >= 1)
    .sort((a, b) => b.share - a.share);
}

/** The numbers the case study leads with, under the opening paragraph. */
export async function HeadlineNumbers() {
  const [sales, rating] = await Promise.all([
    load<GinSales>("sales", getGinSales),
    load<GinRating>("rating", getGinRating),
  ]);
  if (!sales || !sales.users) return null;
  const conversion = ((100 * sales.purchases) / sales.users).toFixed(1);
  return (
    <figure>
      <Stats
        items={[
          {
            label: "Unique users",
            value: count(sales.users),
            tip: "Each Apple Account that downloaded it, counted once.",
          },
          {
            label: "Conversion rate",
            value: `${conversion}%`,
            tip: "Premium purchases per unique user, since launch. One-time unlocks and new subscriptions count, not renewals or promo codes.",
          },
          {
            label: "Countries",
            value: count(sales.countries.length),
            tip: `Countries where at least 1 person downloaded it. Most are in ${place(sales.countries[0][0])}, then ${and(
              sales.countries.slice(1, 4).map(([code]) => place(code)),
            )}.`,
          },
          ...(rating
            ? [
                {
                  label: "App Store rating",
                  value: `${rating.stars.toFixed(1)}★`,
                  tip: `From ${count(rating.count)} US ratings${
                    rating.since
                      ? ` since ${new Date(
                          `${rating.since}T00:00:00Z`,
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                          timeZone: "UTC",
                        })}`
                      : ""
                  }.`,
                },
              ]
            : []),
        ]}
      />
    </figure>
  );
}

/** Every number since launch, with what each one counts. */
export default async function SalesNumbers() {
  const sales = await load<GinSales>("sales", getGinSales);
  if (!sales) {
    return null;
  }
  const through = new Date(`${sales.through}T00:00:00Z`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" },
  );
  return (
    <>
      <H3>By the numbers</H3>
      <figure>
        <Facts
          items={[
            {
              label: "Unique users",
              value: count(sales.users),
              tip: "Each Apple Account that downloaded it, counted once.",
            },
            {
              label: "Total downloads",
              value: count(sales.downloads),
              tip: "Every download, including reinstalls and new devices.",
            },
            {
              label: "Premium purchases",
              value: count(sales.purchases),
              tip: "One-time unlocks and new subscriptions, not renewals or promo codes.",
            },
            {
              label: "Conversion rate",
              value: `${((100 * sales.purchases) / sales.users).toFixed(1)}%`,
              tip: "Premium purchases per unique user.",
            },
            {
              label: "Countries",
              value: count(sales.countries.length),
              tip: `Countries where at least 1 person downloaded it. Most are in ${place(
                sales.countries[0][0],
              )}, then ${and(
                sales.countries.slice(1, 4).map(([code]) => place(code)),
              )}.`,
            },
            {
              tip: "Unique users who downloaded it on an iPhone, not an iPad or Mac.",
              label: "On iPhone",
              value: `${deviceShares(sales).find((d) => d.device === "iPhone")?.share ?? 0}%`,
            },
          ]}
        />
        <Caption>
          Since launch in June 2025, through {through}, from App Store Connect.
        </Caption>
      </figure>
    </>
  );
}

const monthName = (month: string, style: "narrow" | "long") =>
  new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-US", {
    month: style,
    timeZone: "UTC",
  });

/**
 * How many new users it gets: a heading, the average a month for each year,
 * then a bar for each finished month. `focus` months are drawn in ink, and
 * `children` follow the chart.
 */
export async function NewUsersChart({
  focus = [],
  children,
}: {
  focus?: string[];
  children?: ReactNode;
}) {
  const sales = await load<GinSales>("sales", getGinSales);
  if (!sales || !sales.months.length) return null;
  const { years, months } = sales;
  const max = Math.max(...months.map((m) => m.users ?? 0), 1);
  const [before, latest] = years.slice(-2);
  const growing = before && latest && latest.perMonth > before.perMonth;
  const averages = and(
    years.map(
      (y, i) =>
        `${y.perMonth}${i === 0 ? " new users a month" : ""} in ${y.year}${
          y.soFar ? " so far" : ""
        }`,
    ),
  );
  return (
    <>
      <H3>{growing ? "It keeps growing" : "New users"}</H3>
      <P>On average, it got {averages}.</P>
      <figure>
        <p className={`relative ${label}`}>
          <TipLabel
            id="new-users-chart"
            tip="First-time downloads each month since launch, from App Store Connect, updated daily."
          >
            New users each month
          </TipLabel>
        </p>
        <ol className="mt-4 flex h-48 items-end gap-1 border-b border-site-line pt-6 sm:gap-2">
          {months.map((m) => (
            <li key={m.month} className="relative flex h-full flex-1 items-end">
              <span className="sr-only">
                {monthName(m.month, "long")} {m.month.slice(0, 4)},{" "}
                {m.users === null ? "not available" : `${m.users} new users`}
              </span>
              <span
                aria-hidden="true"
                className={`relative block w-full ${
                  focus.includes(m.month) ? "bg-site-ink" : "bg-site-ink/20"
                }`}
                style={{ height: `${(100 * (m.users ?? 0)) / max}%` }}
              >
                <span className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 text-caption text-site-muted sm:block">
                  {m.users ?? "–"}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <ol aria-hidden="true" className="mt-2 flex gap-1 sm:gap-2">
          {months.map((m, i) => (
            <li
              key={m.month}
              className="flex-1 text-center font-mono text-label uppercase text-site-muted"
            >
              {monthName(m.month, "narrow")}
              {(i === 0 || m.month.endsWith("-01")) && (
                <span className="block whitespace-nowrap">
                  {m.month.slice(0, 4)}
                </span>
              )}
            </li>
          ))}
        </ol>
      </figure>
      {children}
    </>
  );
}

const TONES = ["bg-site-ink", "bg-site-ink/40", "bg-site-ink/15"];

/** Which devices people downloaded it on, as one bar split by share. */
export async function DeviceSplit() {
  const sales = await load<GinSales>("sales", getGinSales);
  if (!sales || !sales.users) return null;
  const shares = deviceShares(sales);
  return (
    <figure>
      <p className={`relative mb-4 ${label}`}>
        <TipLabel
          id="devices"
          tip="Unique users by the device they downloaded it on, since launch. From App Store Connect, updated daily."
        >
          Downloads by device
        </TipLabel>
      </p>
      <div
        role="img"
        aria-label={shares.map((d) => `${d.share}% ${d.device}`).join(", ")}
        className="flex h-4 gap-px"
      >
        {shares.map((d, i) => (
          <span
            key={d.device}
            className={TONES[Math.min(i, TONES.length - 1)]}
            style={{ width: `${d.share}%` }}
          />
        ))}
      </div>
      <ul
        aria-hidden="true"
        className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-site-ink/80"
      >
        {shares.map((d, i) => (
          <li key={d.device} className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 ${TONES[Math.min(i, TONES.length - 1)]}`}
            />
            <span className="font-medium text-site-ink">{d.share}%</span>
            {d.device}
          </li>
        ))}
      </ul>
    </figure>
  );
}
