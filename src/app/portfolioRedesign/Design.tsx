import SiteShell from "@/components/site/SiteShell";
import CaseStudyArticle, {
  type CaseStudySection,
} from "@/components/site/CaseStudyArticle";
import AffinityMap from "@/components/affinity-map/AffinityMap";

const SECTIONS: CaseStudySection[] = [
  { id: "overview", title: "Overview" },
  { id: "problem", title: "Problem" },
  { id: "goal", title: "Goal" },
  { id: "process", title: "Process" },
  { id: "research", title: "Research", content: <AffinityMap /> },
  { id: "exploration", title: "Exploration" },
  { id: "prototyping-and-testing", title: "Prototyping & testing" },
  { id: "design-decisions", title: "Design decisions" },
  { id: "results", title: "Results" },
  { id: "reflection", title: "Reflection" },
];

export default function Design() {
  return (
    <SiteShell>
      <CaseStudyArticle title="Portfolio Redesign" sections={SECTIONS} />
    </SiteShell>
  );
}
