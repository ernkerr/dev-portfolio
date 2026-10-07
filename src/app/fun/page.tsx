import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { FieldNotesMark } from "@/components/site/thumbs";
import { GROUPS as QUEST_GROUPS } from "./quests";
import SideQuests, { type QuestGroup } from "./SideQuests";

export const metadata: Metadata = {
  title: "Fun",
  description:
    "Erin Kerr's side quests: minigames, tools, apps, web apps and skills for Claude Code.",
  alternates: { canonical: "/fun" },
};

// Hand-built thumbnails, by quest name. They stay out of quests.ts so it
// stays plain data.
const NODES: Record<string, React.ReactNode> = {
  "Field Notes": <FieldNotesMark />,
};

const GROUPS: QuestGroup[] = QUEST_GROUPS.map((group) => ({
  ...group,
  quests: group.quests.map((quest) =>
    NODES[quest.name] ? { ...quest, node: NODES[quest.name] } : quest,
  ),
}));

export default function FunPage() {
  return (
    <SiteShell>
      <section className="pb-16 pt-16 md:pt-20">
        <h1 className="font-serif text-display-sm md:text-display">
          My silly little side quests
        </h1>
        <p className="mt-6 max-w-measure text-body text-site-ink/75">
          Building my own projects is where I fell in love with programming and
          design. These are the small ones, kept here because they were fun to
          make.
        </p>
      </section>

      <SideQuests groups={GROUPS} />
    </SiteShell>
  );
}
