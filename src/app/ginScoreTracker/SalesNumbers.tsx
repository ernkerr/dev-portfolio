import { Caption, Facts, InProgress } from "@/components/site/prose";
import { getGinSales, type GinSales } from "./sales";

// Results' live totals from App Store Connect, counted at most once a day.
// Until the API key is set up, it says so instead.
export default async function SalesNumbers() {
  let sales: GinSales | null = null;
  try {
    sales = await getGinSales();
  } catch (error) {
    console.error("Couldn't load Gin Score Tracker's sales", error);
  }
  if (!sales) {
    return (
      <InProgress title="Numbers">
        Downloads and Premium purchases show here, updated daily, once the App
        Store Connect API key is set up.
      </InProgress>
    );
  }
  const through = new Date(`${sales.through}T00:00:00Z`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" },
  );
  return (
    <figure>
      <Facts
        items={[
          {
            label: "First-time downloads",
            value: sales.downloads.toLocaleString("en-US"),
          },
          {
            label: "Premium purchases",
            value: sales.purchases.toLocaleString("en-US"),
          },
        ]}
      />
      <Caption>
        Since launch in June 2025, through {through}. From App Store Connect,
        updated daily.
      </Caption>
    </figure>
  );
}
