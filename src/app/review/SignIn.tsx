"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { focusRing } from "@/components/site/links";

const label = "font-mono text-label uppercase";

// The password form on /review. Signing in sets a cookie this page's
// scripts can't read, so the password isn't kept anywhere in the browser.
export default function SignIn({ next }: { next: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);
    const data = await res?.json().catch(() => null);
    setBusy(false);
    if (!res?.ok) return setError(data?.error ?? "That didn't sign in.");
    setPassword("");
    router.replace(next);
    router.refresh();
  };

  return (
    <form onSubmit={submit}>
      <label htmlFor="review-password" className={`${label} text-site-muted`}>
        Password
      </label>
      <div className="mt-3 flex gap-3">
        <input
          id="review-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`min-w-0 flex-1 border border-site-line bg-site-paper px-3 py-2 text-body text-site-ink ${focusRing}`}
        />
        <button
          type="submit"
          disabled={busy || !password}
          className={`border border-site-line px-4 py-2 ${label} text-site-ink transition-colors hover:text-site-blue disabled:text-site-muted ${focusRing}`}
        >
          Sign in
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-caption text-site-muted">
          {error}
        </p>
      )}
    </form>
  );
}
