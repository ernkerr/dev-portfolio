"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import NavBar from "@/components/NavBar";
import Shine from "@/components/Shine";
import { PolkaDots } from "@/components/ui/PolkaDots";
import { geistSans, geistMono } from "../../../public/fonts/fonts";

/* ---------- small local helpers ---------- */

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px 120px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className={`${geistMono.className} inline-block rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/60`}
    >
      {children}
    </span>
  );
}

/* ---------- data ---------- */

const META = ["AI agent", "B2B order automation", "Human-in-the-loop", "Production"];

const GLANCE = [
  { k: "Role", v: "Designed & built the agent end to end" },
  { k: "Stack", v: "TypeScript · Mastra · Claude · Hono · Zod" },
  { k: "Surface", v: "Email, EDI, PDF, CSV, Excel & voice intake" },
  { k: "Focus", v: "Accuracy · auditability · graceful escalation" },
];

const PIPELINE = [
  {
    n: "01",
    t: "Order lands in the inbox",
    d: "A customer emails a purchase order — in the body, or as a PDF, spreadsheet, or EDI attachment. The Laravel backend pulls it in over the Gmail API and queues it for the agent.",
  },
  {
    n: "02",
    t: "The agent reads it",
    d: "A fresh agent spins up per request and picks the right extractor for the format — pulling the customer, PO number, and every line item out of unstructured text, scanned pages, or X12 EDI.",
  },
  {
    n: "03",
    t: "It resolves the order",
    d: "Tools match each line to a real catalog product (SKU, UPC, or fuzzy description), find the customer, apply pricing and per-customer quantity rules, and validate the whole order.",
  },
  {
    n: "04",
    t: "It acts — or asks",
    d: "Confident orders are written straight to the system and pushed to the ERP. Anything ambiguous — an unknown product, a price mismatch, a cancellation — becomes a typed escalation for a human to review.",
  },
];

const PROBLEMS = [
  {
    t: "Every customer sends it differently",
    d: "The same order shows up as a forwarded email, a scanned PDF, an Excel sheet, or an EDI 850. No two layouts match.",
  },
  {
    t: "Ops teams retype it by hand",
    d: "Someone reads each order and keys line items into the ERP — slow, and a single transposed quantity becomes a wrong shipment.",
  },
  {
    t: "The hard cases are the costly ones",
    d: "An unrecognized SKU or an off-catalog price is exactly where a silent mistake hurts most — and where naive automation fails quietly.",
  },
  {
    t: "Trust requires a paper trail",
    d: "To let software touch real orders, an operator needs to see what it extracted, why it decided what it did, and where it wasn't sure.",
  },
];

const TOOL_GROUPS = [
  {
    g: "Extraction",
    n: 7,
    items: "EDI · PDF (text + vision) · CSV · Excel · email · voice",
  },
  { g: "Products", n: 5, items: "SKU match · fuzzy match · catalog search · status" },
  { g: "Customers", n: 4, items: "match by domain · search · details · order history" },
  {
    g: "Orders",
    n: 10,
    items: "create · add line items · validate · confirm · cancel",
  },
  { g: "Pricing", n: 3, items: "calculate · validate against catalog · price sheets" },
  { g: "Escalation", n: 2, items: "raise typed escalations · log every decision" },
  { g: "EDI", n: 3, items: "parse X12 · generate 810 invoice · fetch content" },
];

const PROUD = [
  {
    t: "Confidence-gated escalation",
    d: "Instead of guessing, the agent raises one of a dozen typed escalations — unknown product, price mismatch, customer not found, cancellation requested — each with a priority. Edge cases land in a human's queue instead of becoming bad orders.",
  },
  {
    t: "Every field traces back to the source",
    d: "Extracted values carry source spans — character offsets in text, and pixel bounding boxes on PDFs — so the review UI can highlight exactly where on the original document each number came from.",
  },
  {
    t: "A decision log, not a black box",
    d: "Customer match, product match, price validation, order creation — every step the agent takes is logged as a typed decision, so an operator can audit the whole chain of reasoning after the fact.",
  },
  {
    t: "Per-request tools that capture their effects",
    d: "Each request builds its own tool set bound to the tenant; side effects (created order IDs, escalations, decisions) accumulate in capture buckets the response is assembled from — no shared global state between concurrent orders.",
  },
];

const NUMBERS = [
  { v: "35", k: "tools the agent can call" },
  { v: "6", k: "input formats, one pipeline" },
  { v: "12", k: "typed escalation kinds" },
  { v: "40", k: "step reasoning budget" },
  { v: "8", k: "extraction engines evaluated" },
  { v: "16K", k: "token budget per order" },
];

const NEXT = [
  "Surface a confidence score per field in the review UI to triage escalations faster.",
  "Expand the golden eval set and gate deploys on extraction accuracy in CI.",
  "Auto-generate EDI 810 acknowledgements back to trading partners on confirm.",
];

const STACK_CHIPS = [
  "TypeScript",
  "Mastra",
  "Claude (Anthropic)",
  "Vercel AI SDK",
  "Hono",
  "Zod",
  "Laravel API",
];

/* ---------- page ---------- */

export default function OrderSyncAgent() {
  return (
    <div className={`${geistSans.className} min-h-screen bg-navy-1 text-white`}>
      <NavBar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-1 px-8 pb-20 pt-10 md:px-16 md:pt-16 lg:px-24">
        <PolkaDots />
        <Reveal className="relative z-10">
          <Eyebrow>Case Study · AI Agent</Eyebrow>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            OrderSync Order Agent
            <br />
            <Shine>Email to order, on its own</Shine>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            A production AI agent that reads inbound B2B purchase orders — in
            any format a customer sends — and turns them into validated,
            structured orders. It matches products, prices the order, and writes
            it to the system, escalating to a human the moment it isn&apos;t
            sure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {META.map((m) => (
              <span
                key={m}
                className={`${geistMono.className} rounded-lg border border-white/10 bg-navy-2 px-3 py-1.5 text-sm text-white/80`}
              >
                {m}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* AT A GLANCE */}
      <section className="bg-navy-2 px-8 py-16 md:px-16 lg:px-24">
        <Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {GLANCE.map((g) => (
              <div key={g.k} className="bg-navy-2 p-6">
                <div
                  className={`${geistMono.className} text-xs uppercase tracking-wider text-white/40`}
                >
                  {g.k}
                </div>
                <div className="mt-2 text-sm text-white/90">{g.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* PROBLEM */}
      <section className="bg-navy-1 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            B2B orders arrive as a mess, and humans key them in.
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Distributors take orders the way their customers want to send them.
            That means an inbox full of forwarded emails, scanned POs,
            spreadsheets, and EDI files — each one read and retyped into the ERP
            by hand. It&apos;s slow, and the mistakes are expensive.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-white/10 bg-navy-2 p-6">
                <h3 className="text-lg font-semibold text-white">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-navy-3/40 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            Inbox in, structured order out.
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Four stages, fully autonomous on the happy path — with a human
            pulled in exactly when the agent decides it needs one.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PIPELINE.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 bg-navy-1 p-6">
                <div
                  className={`${geistMono.className} text-2xl font-bold text-white`}
                >
                  {s.n}
                </div>
                <h3 className="mt-3 font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {s.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="bg-navy-1 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>How it&apos;s built</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
            A tool-using agent, not a prompt.
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          <div className={`${geistMono.className} text-sm text-white/70`}>
            01 · The loop
          </div>
          <h3 className="mt-3 text-xl font-semibold">
            Reason, call a tool, read the result, repeat.
          </h3>
          <p className="mt-3 max-w-2xl text-white/70">
            Built on <code>Mastra</code> with Claude as the model. Each order
            gets its own agent that works in a loop — up to forty steps — calling
            real tools and reacting to what they return, instead of trying to
            one-shot the answer. A Sonnet&nbsp;→&nbsp;Haiku fallback and ephemeral
            prompt caching keep it resilient and cheap.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className={`${geistMono.className} text-sm text-white/70`}>
            02 · The hands
          </div>
          <h3 className="mt-3 text-xl font-semibold">
            Thirty-five tools across the whole order lifecycle.
          </h3>
          <p className="mt-3 max-w-2xl text-white/70">
            Every real action — extract, match, price, validate, write,
            escalate — is a typed tool with a <code>Zod</code> schema. The model
            never touches the database directly; it composes these tools, and
            each one is bound to the tenant making the request.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOOL_GROUPS.map((t) => (
              <div
                key={t.g}
                className="rounded-2xl border border-white/10 bg-navy-2 p-5"
              >
                <div className="flex items-baseline justify-between">
                  <h4 className="font-semibold text-white">{t.g}</h4>
                  <span
                    className={`${geistMono.className} text-sm text-blue-300`}
                  >
                    {t.n}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/55">
                  {t.items}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <div className={`${geistMono.className} text-sm text-white/70`}>
            03 · The wiring
          </div>
          <h3 className="mt-3 text-xl font-semibold">
            A microservice behind the product.
          </h3>
          <p className="mt-3 max-w-2xl text-white/70">
            The agent runs as a <code>Hono</code> service that the Laravel app
            calls over an authenticated endpoint when an order arrives. It reads
            and writes catalog, customer, and order data through a typed API
            client, and talks to a dedicated EDI service for X12 parsing and 810
            invoice generation. I rewrote the whole thing from an earlier Python
            version into this typed, tool-first TypeScript design.
          </p>
        </Reveal>
      </section>

      {/* THE PART I'M PROUDEST OF */}
      <section className="bg-navy-2 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>The part I&apos;m proudest of</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            It knows when not to trust itself.
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Automating order entry is easy until it&apos;s wrong. The work that
            made this safe to run on real orders is all about transparency and
            knowing where the line is.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {PROUD.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-white/10 bg-navy-1 p-6">
                <h3 className="text-lg font-semibold text-white">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="bg-navy-3/40 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>By the numbers</Eyebrow>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {NUMBERS.map((n, i) => (
            <Reveal key={n.k} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-white/10 bg-navy-1 p-6 text-center">
                <div className="text-3xl font-bold tracking-tight text-white">
                  {n.v}
                </div>
                <div className="mt-2 text-xs leading-snug text-white/55">
                  {n.k}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 max-w-3xl text-sm italic text-white/45">
            Built and validated against real customer documents from live B2B
            suppliers. I&apos;ve kept the numbers here to what the system
            actually does rather than quoting an accuracy figure I can&apos;t
            stand behind out of context.
          </p>
        </Reveal>
      </section>

      {/* WHAT'S NEXT */}
      <section className="bg-navy-1 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>What I&apos;d do next</Eyebrow>
          <ul className="mt-8 max-w-2xl space-y-3 text-white/70">
            {NEXT.map((n) => (
              <li key={n} className="flex gap-3">
                <span className="text-white/30">→</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* CTA FOOTER */}
      <section className="relative overflow-hidden bg-navy-4 px-8 py-20 md:px-16 lg:px-24">
        <PolkaDots />
        <Reveal className="relative z-10">
          <div className="flex flex-wrap gap-2">
            {STACK_CHIPS.map((c) => (
              <span
                key={c}
                className={`${geistMono.className} rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70`}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/agents"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy-1"
            >
              ← Back to agents
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
