"use client";

import ProjectTemplate from "@/components/ProjectTemplate";

export default function Blogger() {
  return (
    <div>
      <ProjectTemplate
        title="Blogger"
        description={
          <>
            An AI writing companion that turns keyword research into an SEO
            content plan (pillars + clusters) and publish-ready blog posts.
            <br />
            <br />
            Blogger is a full-stack web app for planning, generating, editing,
            and publishing SEO content. It helps you go from a messy list of
            keywords to a structured topical map, then produces drafts you can
            refine in a rich text editor and push to multiple platforms.
            <br />
            <br />
            Key features include AI keyword generation and clustering, pillar
            creation, subtopic and blog idea generation with intent
            classification, full HTML draft generation with inline AI editing,
            autosave, and exports (Markdown, HTML, WordPress XML). One-click
            publishing supports WordPress, Shopify, Dev.to, Hashnode, LinkedIn,
            and custom webhooks, with optional SEO internal linking via
            automatic pillar-link injection at publish time.
          </>
        }
        type="Web App"
        stack={[
          "Next.js",
          "React",
          "TypeScript",
          "PostgreSQL",
          "Drizzle",
          "Gemini AI",
        ]}
        link="https://www.automateblogging.com/"
        img="/images/blogger/blogger-main.png"
        purpose={
          <>
            The goal was to compress the entire SEO workflow — research,
            strategy, writing, and distribution — into one tool, while keeping a{" "}
            <strong>human-in-the-loop</strong> editing experience.
            <br />
            <br />
            Instead of generating one-off posts, the product is oriented around
            building <strong>topical authority</strong>: pillars, supporting
            articles, and internal links. The idea is that a single tool should
            handle the full pipeline from keyword collection to published
            content, without bouncing between spreadsheets, AI chat windows, and
            CMS dashboards.
          </>
        }
        stackexp={
          <>
            The frontend is built with <strong>Next.js 15</strong>,{" "}
            <strong>React 19</strong>, and <strong>TypeScript</strong> using a
            single repo for both UI and API routes. Styling uses{" "}
            <strong>Tailwind</strong> with <strong>shadcn/ui</strong> and{" "}
            <strong>Radix</strong> primitives for accessible, rapid UI
            development.
            <br />
            <br />
            Data is stored in <strong>PostgreSQL</strong> with{" "}
            <strong>Drizzle ORM</strong> for type-safe SQL and lightweight
            runtime. The content graph models pillars, keywords, subclusters,
            and blogs as explicit relationships rather than flat lists.
            <br />
            <br />
            AI generation uses <strong>Gemini</strong> via the Google Generative
            AI SDK, with structured prompts (JSON/HTML) and defensive parsing to
            handle non-deterministic outputs. The editor uses{" "}
            <strong>TipTap</strong> for WYSIWYG editing with{" "}
            <strong>UploadThing</strong> for image uploads.
            <br />
            <br />
            Publishing adapters handle per-platform formatting and API calls,
            with credentials encrypted at rest using{" "}
            <strong>AES-256-GCM</strong>. Auth, billing, and email use{" "}
            <strong>Better Auth</strong>, <strong>Stripe</strong>, and{" "}
            <strong>Resend</strong> respectively.
          </>
        }
        stackimg="/next.png"
        stackimg2="/react.png"
        stackimg3="/vercel.png"
        stackImages
        img2="/images/blogger/blogger-editor.png"
        img3="/images/blogger/blogger-integrations.png"
        problems={
          <>
            <strong>LLM output isn&apos;t reliable by default.</strong> I
            enforced structured prompts (JSON/HTML), added extraction fallbacks,
            and designed flows that fail softly — users can regenerate or edit
            rather than hitting a dead end.
            <br />
            <br />
            <strong>SEO strategy is hierarchical, not linear.</strong> Modeling
            data as pillars, keywords, subclusters, and blogs required building
            multiple canvas views (table, board, tree) so users can navigate at
            different zoom levels rather than scrolling through flat lists.
            <br />
            <br />
            <strong>Publishing is messy across platforms.</strong> Each platform
            has different formatting requirements and API quirks. I implemented
            adapter modules per platform, tracked publish history, and used
            &quot;update if already published&quot; logic to avoid duplicate
            posts.
            <br />
            <br />
            <strong>Internal linking matters for topical authority.</strong> I
            added optional pillar link injection to strengthen content clusters
            without requiring manual linking across every article.
          </>
        }
        img4="/images/blogger/blogger-canvas.png"
        lessons={
          <>
            Content systems work best when they&apos;re{" "}
            <strong>opinionated about structure</strong> (pillars and clusters)
            but still <strong>editable at every step</strong>. Forcing a
            hierarchy helps users think strategically, but locking them into it
            kills adoption.
            <br />
            <br />
            Treat the LLM as an unreliable dependency:{" "}
            <strong>
              validate, parse defensively, and design retryable UX
            </strong>
            . Every generation step needs a graceful fallback, not just an error
            message.
            <br />
            <br />
            Integrations need audit trails. A durable{" "}
            <strong>publish history</strong> and idempotent updates prevent
            support nightmares when something goes wrong with a third-party API.
            <br />
            <br />
            Storing HTML is convenient for publishing, but it forces you to
            think about{" "}
            <strong>
              sanitization, rendering safety, and portability
            </strong>{" "}
            early — not as an afterthought.
          </>
        }
      />
    </div>
  );
}
