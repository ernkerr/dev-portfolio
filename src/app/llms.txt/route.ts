import { CASE_STUDIES } from "@/data/caseStudies";
import { IN_MY_WORDS } from "@/lib/erinllm/knowledge";

export const dynamic = "force-static";

const baseUrl = "https://erinkerr.me";

export function GET() {
  const caseStudies = CASE_STUDIES.map(
    ({ name, slug, title }) => `- [${name}](${baseUrl}/${slug}): ${title}`,
  ).join("\n");

  const body = `# Erin Kerr

Erin Kerr is a product and UI/UX designer who engineers. She designs and
ships web apps, mobile apps, and developer tools, and writes about the
process on her blog at ${baseUrl}.

## Case studies

${caseStudies}

## Pages

- [Work](${baseUrl}): the case studies
- [Fun](${baseUrl}/fun): side projects, small tools and apps
- [About](${baseUrl}/about)
- [Blog](${baseUrl}/blog)
- [Agents](${baseUrl}/agents)
- [Archive](${baseUrl}/archive): every past version of the site, kept as it was

Also see Erin's creator portfolio at https://erin-codes.com.

## In Erin's words

What erinLLM, the AI on her site, knows about her: her resume, what she's
looking for, how she works and stories she tells. Written as Erin.

${IN_MY_WORDS.replace(/^## /gm, "### ")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
