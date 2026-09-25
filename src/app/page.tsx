import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// The homepage is intentionally blank while the 2026 redesign is in progress.
// The previous site lives on, unchanged, at /archive/2025.
export default async function Home() {
  const headersList = await headers();
  const hostHeader =
    headersList.get("x-forwarded-host") ?? headersList.get("host");
  const host = hostHeader?.toLowerCase().split(":")[0];

  if (host === "scheduler.erinkerr.me") {
    redirect("/scheduler");
  }

  if (host === "sceduler.erinkerr.me") {
    redirect("https://scheduler.erinkerr.me/scheduler");
  }

  return (
    <main className="flex min-h-screen items-end bg-white p-6 font-[family-name:var(--font-geist-sans)] text-black">
      <Link
        href="/archive"
        className="text-sm underline-offset-4 hover:text-[#001AFF] hover:underline"
      >
        Archive
      </Link>
    </main>
  );
}
