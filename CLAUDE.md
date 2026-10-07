# erinkerr.me

Erin Kerr's portfolio. Next.js 15 (App Router), Tailwind 3, TypeScript.

## Design system

Build UI with the design tokens in `tailwind.config.ts` (colors also in `src/app/globals.css`). This applies to new pages and everything in the 2026 edition: home, Fun, About, case studies and `/design-system`.

- Don't use Tailwind's default palette (`blue-500`, `gray-600`, `white`, `black`), hex values, or arbitrary sizes, spacing, radii or shadows (`text-[15px]`, `shadow-[…]`) when a token covers it.
- If a design needs a value no token has, add a token to `tailwind.config.ts` rather than hardcoding it, and say so.
- Reuse the components in `src/components/site/` before writing new markup.
- See every token rendered at `/design-system` (`src/app/design-system/page.tsx`).

### Color

Use `site-*` with any color utility (`bg-`, `text-`, `border-`, `outline-`, `ring-`, opacity modifiers like `/80`).

| Token | Designer side | Engineer side | Use |
| --- | --- | --- | --- |
| `site-paper` | `#FAFCFD` | `#0F172A` | Page background |
| `site-ink` | `#0F172A` | `#FAFCFD` | Headlines, names, strong text |
| `site-muted` | `#66727F` | `#A7B1BD` | Labels, meta, dates, captions, inactive nav |
| `site-line` | `#E3E8EE` | `#3D4A5C` | 1px hairlines |
| `site-blue` | `#001AFF` | `#A5B1FF` | The brand blue |

- `site-ink` is the cool navy from the 2025 site; on the engineer side it becomes the page background.
- `site-blue` is the brand blue (shared with Cyber Goose) and only ever an accent. Use it for the active nav item, erinLLM in the header, Get in touch, link and title hover, focus and highlighted text (`::selection` in globals.css). One or two blue things per screen, never a large fill, never `blue-*`.
- Body copy is `text-site-ink/80`, short column text `text-site-ink/75`, bold lead-ins `font-medium text-site-ink`.
- The engineer side swaps every `site-*` value automatically (`:root:has([data-side="engineer"])` in globals.css) on pages that render the switch. Don't write `dark:` variants for these colors.
- Project tiles may use the project's own brand color as their background (`bg` on a `TileItem`).

### Fonts

- `font-serif` is Newsreader: headlines, section headlines, quotes, tile titles. Weight 400 only; emphasis is italic, never bold.
- `font-sans` is Geist: running text. Pages inside `SiteShell` already get it.
- `font-mono` is Geist Mono: labels, nav, dates. Code inside text uses the `Code` component.

### Type scale

| Class | Font | Size / line height | Use |
| --- | --- | --- | --- |
| `text-display-sm md:text-display` | serif | 40 → 56 / 1.08, −0.02em | One per page: hero or case-study title |
| `text-section-sm md:text-section` | serif | 30 → 40 / 1.12, −0.015em | Case-study section headline |
| `text-subhead` | serif | 26 / 1.375 | H3, pull quote |
| `text-column-title` | serif | 19 / 1.375 | Titles in `Columns` |
| `text-tile-title` | serif | 17 / 1.375 | Tile titles |
| `text-lead-sm md:text-lead` | sans | 19 → 21 / 1.6 | Opening paragraph |
| `text-body` | sans | 16 / 1.7 | Running text |
| `text-body-sm` | sans | 15 / 1.65 | Columns text, tables, Facts |
| `text-caption` | sans | 13 / 1.625 | Captions, small notes |
| `text-label` | mono, `uppercase` | 12, 0.06em | Eyebrows, tile meta, table heads, footer |
| `text-nav` | mono, `uppercase` | 13, 0.04em | Header, erinLLM, Get in touch |
| `text-date` | mono | 13 | Years in the experience list |

Keep running text, captions and section headlines within `max-w-measure`.

### Space and layout

- `px-gutter` (24px) on page sides at every width; `max-w-page` (1600px) for header, main and footer; `h-header` (64px).
- `max-w-measure` (40rem) for reading width; `max-w-article` (56rem) for a case-study column.
- Between case-study sections: `gap-section-sm md:gap-section`. Above the footer: `mt-section`.
- Smaller steps use Tailwind's scale: `3` art to title and figure to caption, `6` between blocks in a section and tile columns, `8` between Columns and Facts items, `10` between tiles and above an H3.

### Shapes and depth

- Everything is square (no `rounded-*`) with `border border-site-line` hairlines. Only the switch, its knob and status dots are `rounded-full`; app icons on tiles are `rounded-app-icon`, and phone screenshots in case studies are `rounded-phone-screen`.
- Hierarchy comes from hairlines and type, not shadows. Shadows only on floating things: `shadow-knob`, `shadow-float` (with `ring-1 ring-black/5`), `shadow-switch`.

### Interaction

- Put `focusRing` (from `src/components/site/links.ts`) on every link and control.
- Links in text use `inlineLink` from `prose.tsx`. Hover turns things `site-blue`.
- The switch moves on `duration-300 ease-switch`. Tile art zooms to `scale-[1.03]` over 500ms. Always add `motion-reduce:` fallbacks.

### Components (`src/components/site/`)

- `SiteShell`: page frame with `SiteHeader` and footer. `CaseStudyArticle`: case-study layout with the pinned section list. `CaseStudy`: design/engineering sides of a case study.
- `prose.tsx`: `P`, `Lead`, `H3`, `List`, `Code`, `Columns`, `Figure`, `Caption`, `Table`, `Facts`, `Stats` (a project's headline numbers in serif, each with a note on what it counts), `Quote`, `InProgress`, plus the `label` and `inlineLink` class strings.
- `LivePhone`: a live app demo laid out at real phone size and scaled to fit. Pass `device` to draw the whole phone (body, side buttons, Dynamic Island, status bar) in the fixed `device-*` colors, so a demo reads as a phone, not a screenshot.
- `appStudy.tsx`: figures for the app case studies: `BrandField` and `Screens` (screens on the project's brand color), `Review` (a real user's words) and `BuildNote` (a pointer to the engineering side).
- `Tile`: project tile. Thumbnails are a brand-colored field with one thing on it (app icon, logo or one UI component), never a page screenshot.
- `SideSwitch` + `SideContext`: the designer/engineer switch and its state.
- `erinllm/`: erinLLM, the chat bot in the header (the only thing in its top right) that answers questions about me. Its panel is `w-chat` (26rem) from 768px. What it knows is `src/lib/erinllm/knowledge.ts`; add facts that aren't on the site to its "In my own words" list. Its API is `src/app/api/erinllm`, and the questions people ask are at `/erinllm/review`.
- Review pages (`/about/review`, `/erinllm/review`) are only for me: each calls `requireSignIn` (`src/app/review/guard.ts`), and their APIs check `reviewing()` (`src/lib/serverStore.ts`). I sign in at `/review` with `REVIEW_KEY`. `src/middleware.ts` doesn't run in this project (the top-level `pages/` folder means Next never picks it up), so don't put protection there.

### Voice

First person and plain ("I'm Erin, a product designer who engineers."). Short literal labels: Work, Fun, About. Tile meta is the project, then one true fact: `Carpoolio • 5★ App Store`. Every number must be true. No emoji; `✦` is the only ornament, before erinLLM, Ask erinLLM and Get in touch. The bot is always written erinLLM.

### Not part of this system

- The OrderSync navy (`navy-1`–`navy-4`), the `accent` gradient, `.dot-grid` and `.shine-on-hover` belong to the OrderSync case study only.
- The `room-*` colors belong to the About page's room illustration (`src/app/about/Room.tsx`) only.
- The `tank-*` colors belong to the Fun page's aquarium (`src/app/fun/aquarium/`) only.
- `src/app/archive/` holds frozen past editions of the site. Don't restyle them.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
