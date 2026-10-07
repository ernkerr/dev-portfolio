import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { GIN_SALES_TAG, saveFinishedMonths } from "@/app/ginScoreTracker/sales";
import { hash, json } from "@/lib/serverStore";

// Vercel calls this every day (vercel.json) with CRON_SECRET, to save Gin
// Score Tracker's finished months before Apple deletes their reports. Most
// days there's nothing new. While developing, it runs without the secret.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const given = request.headers.get("authorization") ?? "";
  const allowed = secret
    ? timingSafeEqual(hash(given), hash(`Bearer ${secret}`))
    : process.env.NODE_ENV === "development";
  if (!allowed) return json({ error: "Not allowed" }, 401);
  const saved = await saveFinishedMonths();
  if (Object.keys(saved).length) revalidateTag(GIN_SALES_TAG);
  return json({ saved });
}
