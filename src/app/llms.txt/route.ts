import { CASE_STUDIES } from "@/data/caseStudies";

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
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
