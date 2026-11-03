"use client";

import { useState } from "react";
import { EMAIL, focusRing } from "@/components/site/links";
import { inlineLink, label } from "@/components/site/prose";

// Web3Forms emails each message to me. The access key only says which inbox
// to send to, so it's meant to be public (docs.web3forms.com, FAQ), and on
// the free plan it only takes messages sent from the browser, not a server.
const ACCESS_KEY = "530d949b-a013-4894-b0af-db8983cce412";

const field = `mt-3 w-full border border-site-line bg-site-paper px-3 py-2 text-body text-site-ink ${focusRing}`;

type Status = "idle" | "sending" | "sent" | "failed";

// The form on /contact.
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // A hidden box only bots tick: they get the thank-you, nothing is sent.
    if (data.get("botcheck")) return setStatus("sent");

    setStatus("sending");
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: "A message from erinkerr.me",
        from_name: "erinkerr.me",
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
      }),
    }).catch(() => null);
    const result = await res?.json().catch(() => null);
    if (res?.ok && result?.success) {
      form.reset();
      setStatus("sent");
    } else {
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <p role="status" className="text-body text-site-ink/80">
        Thanks, I got your message.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <div>
        <label htmlFor="contact-name" className={label}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={200}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className={label}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className={label}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          className={field}
        />
      </div>
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className={`border border-site-line px-4 py-2 font-mono text-label uppercase text-site-ink transition-colors hover:text-site-blue disabled:text-site-muted ${focusRing}`}
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
        {status === "failed" && (
          <p role="alert" className="mt-3 text-caption text-site-muted">
            That didn’t send. Try again, or email me at{" "}
            <a href={`mailto:${EMAIL}`} className={inlineLink}>
              {EMAIL}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
