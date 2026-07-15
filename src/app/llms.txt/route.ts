import { allProjects } from "@/data/projects";

export const dynamic = "force-static";

const baseUrl = "https://erinkerr.me";

export function GET() {
  const projectLines = allProjects
    .filter((project) => project.link && project.link !== "#")
    .map((project) => {
      const link = project.link.startsWith("/")
        ? `${baseUrl}${project.link}`
        : project.link;
      return `- [${project.title}](${link}): ${project.shortDescription}`;
    })
    .join("\n");

  const body = `# Erin Kerr

Erin Kerr is a self-taught software engineer and developer content creator
building in public. She ships web apps, mobile apps, and developer tools,
and writes about the process on her blog at ${baseUrl}.

## Projects

${projectLines}

## Pages

- [Home](${baseUrl})
- [About](${baseUrl}/about)
- [Projects](${baseUrl}/projects)
- [Agents](${baseUrl}/agents)
- [Blog](${baseUrl}/blog)
- [Contact](${baseUrl}/contact)

Also see Erin's creator portfolio at https://erin-codes.com.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
