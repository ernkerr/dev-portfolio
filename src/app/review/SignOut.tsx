"use client";

import { useRouter } from "next/navigation";
import { focusRing } from "@/components/site/links";

// Signs me out of the review pages, from /review and each review page
export default function SignOut() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/review", { method: "DELETE" }).catch(() => null);
        router.replace("/review");
        router.refresh();
      }}
      className={`font-mono text-label uppercase text-site-ink transition-colors hover:text-site-blue ${focusRing}`}
    >
      Sign out
    </button>
  );
}
