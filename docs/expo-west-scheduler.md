# Expo West Scheduler Data Pipeline

This file explains how the Expo West scheduler was built and how event data gets from Expo's website into this app.

## Goal

Build a local-first conference planner at `/scheduler` where users can:

- Browse the Expo West agenda by day
- Save their own event picks
- Keep saved picks even when official agenda data changes

## Where the data comes from

Instead of scraping rendered HTML, we pull data from Expo's GraphQL API:

- Endpoint: `https://attend.expowest.com/api/graphql`
- Method: `POST`
- Operation: `PlanningListViewConnectionQuery`
- Query type: persisted query hash

The request payload uses:

- `eventId` (Expo event identifier)
- `viewId` or multiple `viewIds`
- `timezone` (`America/Los_Angeles`)
- `aggregationsIds` (day-range filter)
- `first` and `after` for pagination

## How we fetch all events

Script:

- `scripts/expo-west-2026/scrape.mjs`

What it does:

1. Iterates all conference days:
   - `2026-03-03`
   - `2026-03-04`
   - `2026-03-05`
   - `2026-03-06`
2. Builds a day filter (`aggregationsIds`) from a base64 JSON range.
3. Calls GraphQL with `first: 500`.
4. Continues pagination while `hasNextPage` is true.
5. Supports multiple views via `EXPO_VIEW_IDS` (comma-separated).
6. Saves raw results to:
   - `scripts/expo-west-2026/output/raw-events.json`
   - `scripts/expo-west-2026/output/raw-responses.json`

## How raw API events are normalized

Script:

- `scripts/expo-west-2026/normalize.mjs`

What it maps:

- Title: prefers `withEvent.title` (important fix to avoid generic labels)
- Start/end: `beginsAt` / `endsAt` (plus fallback keys)
- Location: `place` (plus other location fallbacks)
- Day key: derived from start timestamp and constrained to Mar 3-6
- Event ID: normalized from external GraphQL event id

Output file:

- `src/data/expoWest2026/snapshot.ts`

The normalizer also increments `snapshot.version` so the UI can detect official updates.

## App-side refresh behavior (safe for user picks)

The scheduler uses two independent localStorage records:

1. User picks (`selectedEventIds`)
2. Last accepted official snapshot (`acceptedSnapshot`)

On load:

- If bundled snapshot version differs from accepted version, user sees a prompt.
- UI keeps showing accepted data until user confirms refresh.

On refresh:

- Diff is computed between old and new snapshots.
- Removed selected events are handled per-event (`keep` or `remove`).
- User selections are preserved unless the user explicitly removes.

## Commands

Run full import pipeline:

```bash
npm run expo:scrape
```

Use multiple Expo views (if needed):

```bash
EXPO_VIEW_IDS="VIEW_ID_1,VIEW_ID_2" npm run expo:scrape
```

Optional overrides:

- `EXPO_EVENT_ID`
- `EXPO_VIEW_ID`
- `EXPO_VIEW_IDS`
- `EXPO_TIMEZONE`
- `EXPO_PERSISTED_QUERY_HASH`

## Why this approach

- More reliable than parsing UI HTML
- Pulls structured session metadata
- Handles large day lists through pagination
- Keeps user schedules intact across agenda updates
