// New users (first-time downloads) in each finished month, from App Store
// Connect's monthly sales reports. Apple deletes monthly reports a year after
// they come out, so finished months are saved here to keep the chart's
// history. Months after the last one here are fetched live (sales.ts), so add
// them here within a year or they'll show as gaps.
//
// Saved October 7, 2026. Apple had already deleted June to September 2025.
// 2025's total still comes from its yearly report.
export const SAVED_MONTHS: Record<string, number> = {
  "2025-10": 27,
  "2025-11": 34,
  "2025-12": 61,
  "2026-01": 103,
  "2026-02": 76,
  "2026-03": 60,
  "2026-04": 79,
  "2026-05": 77,
  "2026-06": 87,
  "2026-07": 123,
  "2026-08": 107,
  "2026-09": 81,
};
