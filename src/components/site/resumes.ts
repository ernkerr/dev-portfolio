// My resumes (public/resume), each leading with a different side of my work.
// They're copies of the general ones career-ops builds
// (output/cv-erin-kerr-site-*.pdf), the same ones my email agent attaches.
export const RESUMES = {
  designer: "/resume/erin-kerr-resume-designer.pdf",
  designEngineer: "/resume/erin-kerr-resume-design-engineer.pdf",
  engineer: "/resume/erin-kerr-resume-engineer.pdf",
};

// The footer menu's choices. `side` is the switch side each one matches, so
// the menu can mark it; the design engineer one matches neither.
export const RESUME_CHOICES = [
  { label: "Designer", side: "designer", href: RESUMES.designer },
  { label: "Design engineer", side: null, href: RESUMES.designEngineer },
  { label: "Engineer", side: "engineer", href: RESUMES.engineer },
];
