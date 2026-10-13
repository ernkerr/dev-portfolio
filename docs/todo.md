# To do

When `design-redesign` is merged and you pull or merge it locally, the open items print
once in the terminal (see `.git/hooks/post-merge`). Check a box (`- [x]`) when it's done.

Step-by-step instructions: `~/Desktop/first-click-test/how-to-run-the-test.pdf`

## First-click test (Lyssna, free plan: 15 responses total)

Setup notes and screenshots: `~/Desktop/first-click-test/setup.md`

- [ ] Preview the 2026 test as a participant (app.lyssna.com/tests/xuyrtpgtyrcq/edit > Preview)
- [ ] 2025 baseline: Recruit > "Recruit with a link" > Create a link (app.lyssna.com/tests/qwew8yhovqal/edit), send to 4–5 people
- [ ] 2026 round one, once the homepage's first screen is close to final: if it changed, ask Claude to retake the screenshot first; then create the link and send to 4–5 people
- [ ] Bring the results (pass rate, time to click, heatmaps, job answers) to Claude for the case study's Results section
- [ ] 2026 round two after changing the site: 4–5 more people

## Before deploying

- [ ] Each time erinLLM's knowledge or rules changed: run `npm run dev`, then `npm run erinllm:check` in another terminal, and fix anything it fails on.
- [x] Set the review password on Vercel: Settings > Environment Variables, add `REVIEW_KEY` for Production with the same password you put in `.env.local`, then redeploy. Without it, `/review` can't sign anyone in on the live site, so you can't approve photos or read ErinLLM's questions.
- [x] Let visitors leave photos on the About page camera: in Vercel, add a Blob store to the project (Storage > Blob), and set a `REVIEW_KEY` environment variable to a password you choose. You sign in with it at `/review` to reach your review pages (`/about/review` for photos, `/erinllm/review` for ErinLLM's questions). Without them, the camera only shows your photos and says leaving photos isn't set up yet.
- [x] Turn on ErinLLM (free, no card): in Vercel, Settings > Environment Variables, add `GOOGLE_GENERATIVE_AI_API_KEY` (your Google AI Studio key, the same one as `GEMINI_API_KEY` in `~/code/blogger/.env`) for **Production, Preview and Development**. Development matters: `vercel env pull .env.local` replaces the whole file with what's on Vercel, so a key that's only in `.env.local` gets wiped (it happened on Oct 7). Never turn on billing for the key's Google Cloud project; without billing it stays free.
- [x] Rate-limit ErinLLM: in Vercel, open Firewall > Configure > New Rule. If `@vercel/firewall`, rate limit ID `erinllm`; Rate Limit, fixed window, 10 minutes, 20 requests; Then Default (429). Save, then Review Changes > Publish. In Settings > Environment Variables, check that system environment variables are exposed.
- [x] The Blob store above also keeps the questions people ask ErinLLM; read them at `/erinllm/review` after signing in at `/review`.
- [ ] The aquarium (`/fun/aquarium`) needs nothing new: it keeps fish in the same Blob store and checks them with the same Gemini key. To rate-limit it across servers too, add a second Firewall rule like ErinLLM's: rate limit ID `aquarium`, fixed window, 10 minutes, 10 requests. Every fish waits for you at `/fun/aquarium/review` until you let it in.

## Site

- [x] Swap the "In progress" placeholders in the redesign case study for real screenshots. The 2026 homepage shots in Results were retaken on October 9; if the homepage changes, ask Claude to retake them.
- [ ] Group Sing Along's design side shows "coming soon" for now (the page opens on the engineering side). Its draft and open questions are in `src/app/groupSingAlong/Design.tsx`.

## Live product sites

- [ ] groupsingalong.com (`~/code/sing-along/groupsingalong/src/app/page.tsx`): take out the 3 placeholder testimonials, the Testimonials nav link, and "Join thousands of families and friends who are already using Group Sing Along".
- [ ] Hearts Score Tracker's App Store description promises streaks and stats the app doesn't have: rewrite it with the next version.
- [x] Fix the site-wide link preview in `src/app/layout.tsx`: it still says "Software Engineer & Developer Content Creator" (finding 6 in the redesign case study)

## Gin Score Tracker case study

What Claude needs from you. Your local folder `~/projects/Apps/Gin Score Tracker` has the May 2025 App Store screenshots, screen recordings and icon variations, but none of these.

- [x] A scorecard for the top of Research: your Notes app screenshot is in.
- [x] One line on what the scorecard showed: it's the Notes screenshot's caption.
- [x] Live numbers for Results: App Store Connect API key made, and the 4 `ASC_` variables are in Vercel for Production and Development.
- [ ] Tick **Preview** on the 4 `ASC_` variables in Vercel (Settings > Environment Variables > Edit), so preview links show the numbers too.
- [ ] Turn on the Gin chart's automatic monthly save: in the project folder run `openssl rand -hex 32 | vercel env add CRON_SECRET production`, then redeploy. A daily cron job (`vercel.json`) saves each finished month to the Blob store so the chart never loses one; without the secret the job won't run.
- [x] Reflection's "Before a reviewer asks" box: taken off the page, by choice. Dark mode, AI credit and text scaling stay unmentioned.
- [ ] Optional: say whether to show the icon exploration in `Logo/variations of icon` (ChatGPT images from May 17 and 23, 2025). If yes, the case study should say they were AI-generated.

## OrderSync case study

The finished version is at `/orderSync` (`src/app/orderSync/Design.tsx`). The tabbed drafts are at `/orderSync/drafts`. Research notes and the stat check are in `docs/ordersync-research/`. James stays first name only.

- [x] What James said: his buyers don't want the wheel reinvented, so he wanted the site clean and expected, with nothing too innovative. It's in Research.
- [x] Mood board photos: logo directions (Feb 25, 2026) ending at the O, and the Pinterest boards (Apr 1), Founder Haiku poster (Mar 24) and type experiment (May 18) as the directions not taken.
- [x] The chrome logo renders were AI-generated. The mood board caption says so.
- [x] Business cards added to The system, with 14 directions not taken. James's surname, phone, email and the QR code are blurred for now.
- [ ] Re-export cards 1, 2, 7, 9, 11, 12, 13 and 14 (the order you sent them) with generic details, e.g. James Smith and a 555-0100 to 555-0199 number, and send them to swap in for the blurred ones.
- [ ] Confirm cards 1 and 2 are the ones you went with, and whether they were printed.
- [x] Results: PostHog drop-off chart (June 26 to October 8, 2026). There's no before: tracking started June 26 and finished bookings aren't tracked.
- [x] James's PostHog numbers can be public.
- [x] PostHog: 120 of the demo_click users never viewed a page (mostly Yahoo mobile ads on /edi-software), so the event likely fires on load, not on click. The page only uses the funnel numbers. Tell James: the edi_software_hero demo_click should fire in the click handler.
- [x] Check PostHog for `intro_confirmed`: it has 8 finished bookings from June 26 to October 9 (PostHog AI, run October 9). Results now says so.
- [ ] Tell James: 6 of the 8 `intro_confirmed` events come from sessions with no page view, so they can't be traced to a page; `booking_modal_opened` counts 143 people against about 50 booking clicks, so it likely fires without a click somewhere; and the homepage newsletter form has no event of its own.
- [x] Why the proof stats and testimonial from wireframe v3 didn't ship: cut the note instead (October 9).
- [ ] Reflection is drafted for you. Rewrite it in your words or approve it.
- [x] Trimmed to about 1,870 words with captions and tables (about 1,400 of running text). The full version is in commit 83e93d1.
- [x] One version at `/orderSync`, with methods, design principles and repo facts. Drafts kept at `/orderSync/drafts`.
