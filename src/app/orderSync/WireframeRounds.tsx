import type { ReactNode } from "react";
import { inlineLink, label } from "@/components/site/prose";
import { ClosingCta, ErrorsCard, NewFaqs } from "./ShippedPieces";

// 3 homepage sections that changed between Erin's wireframes, each as the
// wireframes drew it, the research that changed it, and what shipped. The
// wireframe pieces are rebuilt from wireframe.html and wireframe-v2.html in
// the ordersync-static repo, in their own gray styles (#1a1a1a, #666,
// #e0e0e0 and system sans), not this site's tokens. Wireframe 1's third card
// had a stat under it that was never sourced, so it's left out. Wireframe 3
// kept wireframe 2's layout and only added notes. The research is checked in
// docs/ordersync-research/stat-check.md.

const WIRE_FONT = {
  fontFamily: "-apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif",
};

/** A piece of a wireframe, on the wireframe's white page. */
function Wire({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      style={WIRE_FONT}
      className="h-full border border-site-line bg-white p-6 text-[#1a1a1a]"
    >
      {children}
    </div>
  );
}

function WireCard({
  title,
  text,
  checks,
}: {
  title: string;
  text: string;
  checks: string[];
}) {
  return (
    <div className="rounded-lg border-[1.5px] border-[#e0e0e0] p-5">
      <p className="mb-1 text-[15px] font-semibold">{title}</p>
      <p className="mt-1.5 text-[12px] leading-normal text-[#666]">{text}</p>
      <ul className="mt-2.5">
        {checks.map((check) => (
          <li key={check} className="flex gap-2 py-1 text-[12px] text-[#555]">
            <span className="font-semibold text-[#999]">✓</span>
            {check}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WireCta({
  title,
  text,
  note,
}: {
  title: string;
  text: string;
  note: string;
}) {
  return (
    <div className="py-4 text-center">
      <p className="mb-1.5 text-[20px] font-semibold leading-snug">{title}</p>
      <p className="mx-auto max-w-[520px] text-[13px] leading-normal text-[#666]">
        {text}
      </p>
      <span className="mt-4 inline-block rounded-full bg-[#1a1a1a] px-6 py-2.5 text-[13px] font-semibold text-white">
        Book a Call →
      </span>
      <p className="mt-2 text-[11px] text-[#aaa]">{note}</p>
    </div>
  );
}

const OLD_FAQS = [
  "Can OrderSync process orders I receive by email or PDF?",
  "How does OrderSync integrate with my systems?",
  "What order formats are supported?",
  "Do I need to set up templates or code?",
];

const ADDED_FAQS = [
  "How long does it take to go live?",
  "Do I need an IT team to set this up?",
  "How is OrderSync different from SPS Commerce or traditional EDI?",
];

/** The wireframe's FAQ; the questions it added have the blue border it gave them. */
function WireFaq({ added = false }: { added?: boolean }) {
  const items = [
    ...OLD_FAQS.map((q) => ({ q, isNew: false })),
    ...(added ? ADDED_FAQS.map((q) => ({ q, isNew: true })) : []),
  ];
  return (
    <div className="flex flex-col gap-2">
      {items.map(({ q, isNew }) => (
        <div
          key={q}
          className={`flex items-center justify-between gap-3 rounded-lg border-[1.5px] px-4 py-3 text-[13px] font-medium ${
            isNew ? "border-[#bbdefb]" : "border-[#e0e0e0]"
          }`}
        >
          {q}
          <span className="text-[16px] text-[#aaa]">+</span>
        </div>
      ))}
    </div>
  );
}

function Source({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={inlineLink}
    >
      {children}
    </a>
  );
}

const CHANGES: {
  title: string;
  first: ReactNode;
  second: ReactNode;
  why: ReactNode;
  shipped: ReactNode;
}[] = [
  {
    title: "The third feature card",
    first: (
      <WireCard
        title="Stop Paying for Complexity"
        text="Legacy EDI providers charge per document, per connection, plus VAN fees. OrderSync is one platform, one price, every format."
        checks={[
          "No per-transaction fees",
          "No VAN middleman",
          "EDI + PDF + CSV + email in one system",
        ]}
      />
    ),
    second: (
      <WireCard
        title="Catch Errors Before They Cost You"
        text="AI validates every line against your catalog and partner rules."
        checks={[
          "Flags SKU, quantity, pricing mismatches",
          "Prevents chargeback triggers",
        ]}
      />
    ),
    why: (
      <>
        OrderSync’s customers already sold to big retailers, so what hurt them
        was mistakes, not price.{" "}
        <Source href="https://www.supplychaindive.com/news/walmart-on-time-in-full-87-suppliers/550083/">
          Walmart fines suppliers 3%
        </Source>{" "}
        of the cost of goods on every case that arrives late or incomplete.
      </>
    ),
    shipped: <ErrorsCard />,
  },
  {
    title: "The closing call to action",
    first: (
      <WireCta
        title="Ready to Simplify Order Processing?"
        text="One system for EDI, PDF, email, and spreadsheet orders. Book a demo to see how it works."
        note="No credit card required. Start in minutes."
      />
    ),
    second: (
      <WireCta
        title="Still Typing Orders Into Your ERP?"
        text="30-minute intro call. We’ll show you what automation looks like for your specific workflow."
        note="No credit card required. No commitment."
      />
    ),
    why: (
      <>
        Buyers describe the problem as typing. In{" "}
        <Source href="https://conexiom.com/blog/how-genpak-customer-service-team-repurposed-75-hours-of-their-week-with-sales-order-automation/">
          a Conexiom customer story
        </Source>
        , Genpak’s director of customer service described reps “rushing to key
        in a new order.” So the closing line asks about exactly that, and says
        what the call is.
      </>
    ),
    shipped: <ClosingCta />,
  },
  {
    title: "The FAQ",
    first: <WireFaq />,
    second: <WireFaq added />,
    why: (
      <>
        Reviews of SPS Commerce describe setups quoted in weeks that ran for
        months. One CEO’s{" "}
        <Source href="https://www.capterra.com/p/155593/SPS-Commerce/reviews/?page=3">
          2022 review
        </Source>{" "}
        is titled “They said it would be 6-8 weeks. It’s been 9 months. And
        we’re not done.” So the FAQ answers how long it takes to go live, along
        with IT and SPS Commerce.
      </>
    ),
    shipped: <NewFaqs />,
  },
];

/** Each change as wireframe 1, wireframe 2, the research, then what shipped. */
export default function WireframeRounds() {
  return (
    <div className="flex flex-col gap-16">
      {CHANGES.map((change) => (
        <div key={change.title} className="border-t border-site-line pt-6">
          <p className="font-serif text-column-title text-site-ink">
            {change.title}
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <p className={`${label} mb-3`}>Wireframe 1, not taken</p>
              <Wire>{change.first}</Wire>
            </div>
            <div className="flex flex-col">
              <p className={`${label} mb-3`}>Wireframe 2</p>
              <Wire>{change.second}</Wire>
            </div>
          </div>
          <div className="mt-6 max-w-measure">
            <p className={label}>Why it changed</p>
            <p className="mt-2 text-body-sm text-site-ink/80">{change.why}</p>
          </div>
          <p className={`${label} mb-3 mt-6`}>Shipped</p>
          {change.shipped}
        </div>
      ))}
    </div>
  );
}
