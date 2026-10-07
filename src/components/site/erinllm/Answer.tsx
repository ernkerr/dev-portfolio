"use client";

import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { inlineLink } from "@/components/site/prose";

// An answer's text, which can have paragraphs, "- " lists, **bold** and
// [links](/path). Only those, so no markdown library: anything else shows
// as written. Links go to the site, https or mailto, nowhere else.

const INLINE = /\[([^\]\n]+)\]\(([^)\s]+)\)|\*\*([^*\n]+)\*\*/g;
const LIST_ITEM = /^\s*(?:[-*•]|\d+[.)])\s+/;

const safeHref = (href: string) =>
  (href.startsWith("/") && !href.startsWith("//")) ||
  /^(https?:|mailto:)/i.test(href);

function inline(text: string, onFollow?: () => void): ReactNode[] {
  const out: ReactNode[] = [];
  let at = 0;
  for (const match of text.matchAll(INLINE)) {
    const i = match.index ?? 0;
    if (i > at) out.push(text.slice(at, i));
    const [, linkText, href, bold] = match;
    if (bold) out.push(<strong key={i}>{bold}</strong>);
    else if (!safeHref(href)) out.push(linkText);
    else if (href.startsWith("/"))
      out.push(
        <Link key={i} href={href} className={inlineLink} onClick={onFollow}>
          {linkText}
        </Link>,
      );
    else
      out.push(
        <a
          key={i}
          href={href}
          className={inlineLink}
          {...(href.startsWith("mailto:")
            ? {}
            : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {linkText}
        </a>,
      );
    at = i + match[0].length;
  }
  if (at < text.length) out.push(text.slice(at));
  return out;
}

export default function Answer({
  text,
  onFollow,
}: {
  text: string;
  /** Called when a link to a page on the site is followed */
  onFollow?: () => void;
}) {
  // Runs of list lines become lists; other lines, paragraphs
  const blocks: { list: boolean; lines: string[] }[] = [];
  for (const raw of text.trim().split("\n")) {
    const line = raw.replace(/^#{1,6}\s+/, "");
    if (!line.trim()) {
      blocks.push({ list: false, lines: [] });
      continue;
    }
    const list = LIST_ITEM.test(line);
    const last = blocks.at(-1);
    if (last && last.list === list && last.lines.length)
      last.lines.push(list ? line.replace(LIST_ITEM, "") : line);
    else
      blocks.push({ list, lines: [list ? line.replace(LIST_ITEM, "") : line] });
  }

  return (
    <div className="space-y-3">
      {blocks
        .filter((b) => b.lines.length)
        .map((block, b) =>
          block.list ? (
            <ul key={b} className="list-disc space-y-1 pl-5">
              {block.lines.map((line, l) => (
                <li key={l}>{inline(line, onFollow)}</li>
              ))}
            </ul>
          ) : (
            <p key={b}>
              {block.lines.map((line, l) => (
                <Fragment key={l}>
                  {l > 0 && <br />}
                  {inline(line, onFollow)}
                </Fragment>
              ))}
            </p>
          ),
        )}
    </div>
  );
}
