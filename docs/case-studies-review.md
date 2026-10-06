# Case studies: what to review

The design sides of 4 case studies were drafted overnight on October 5–6, 2026, each in its own commit so it can be edited or reverted on its own. Every page has open questions in its dashed "In progress" boxes. The details are below.

Each case study:

- Opens with a live demo rebuilt from the app's own code.
- Follows the shape the hired designers used: overview, problem, design decisions, results, reflection.
- Uses your own words from the old project pages wherever they fit.

| Case study | Commit | Live demo at the top |
| --- | --- | --- |
| [Group Sing Along](http://localhost:3000/groupSingAlong) | `acea1f1` | Pick a song on the host's phone; the singer's phone follows. Each phone's − / + text size works. |
| [Carpoolio](http://localhost:3000/carpoolio) | `6d6743c` | Tap seats on the car to fill them; the badge counts down to "Full." |
| [Gin Score Tracker](http://localhost:3000/ginScoreTracker) | `1b12650` | Score a hand. A second demo puts version 1.0 and the fixed version side by side. |
| [Hearts Score Tracker](http://localhost:3000/heartsScoreTracker) | `9af707c` | Enter a round, give someone the Queen of Spades, shoot the moon, and win. |

The screenshots were rebuilt by running each app's code at old commits with sample data, or come from your own archive and App Store screenshots. The research notes, with a source for every claim, are in the session scratchpad (`research/`).

## Claims elsewhere on the site that the research contradicts

These weren't changed. They're your call.

1. **Homepage, Carpoolio tile: "4.9★ App Store."** No source found anywhere. The only outside record is a cached Belgian App Store page saying the app "has not received enough ratings or reviews to display an overview." An App Store Connect screenshot would settle it. If you can't get one, consider "4 App Store releases."
2. **Homepage, Carpoolio tile: "from first sketch to acquisition."** No sketches were found; the earliest artifact is a coded prototype from October 2, 2024. The sale (January 21, 2026) was of the name only, and the app was taken down. The case study says exactly that.
3. **Homepage, Group Sing Along tile: "~155 active users."** No source in the code; it first appears in your EliseAI interview notes from April 2026. The tile's art is the landing page's mock card, which shows "12 members" and a bold "current line." The app never highlighted a line, and web rooms are capped at 3 people since December 2025.
4. **Homepage, Hearts tile icon** (`icon2.png`, the crowned jester) isn't the live App Store icon, which is the fanned cards.
5. **Group Sing Along engineering side** says it uses "Vercel Postgres (via Prisma)" and that "the first user to join became the conductor." There's no database: late joiners get the song from the host's phone. And the person who creates the group is the host. Its `group.jpg` and `thumbnail.jpg` are AI-generated.
6. **Hearts engineering side: "my third shipped mobile app."** Under your App Store name, Hearts was the second release, after Gin.
7. **Live product sites:**
   - groupsingalong.com and the old carpoolio.co landing page both have placeholder testimonials, and Group Sing Along says "Join thousands of families."
   - Gin's App Store description says "Spades Premium."
   - Hearts' App Store description promises streaks and stats that don't exist.

## Open questions, by case study

### Group Sing Along

- Where does "about 155 active users" come from: Google Analytics or Vercel, which metric, and when?
- Why did lyrics move from text in the app to opening a lyrics site in January 2026? Since then, the − / + buttons on the web don't resize the lyrics.
- Was the iOS app ever submitted? The case study calls it "built, not released."
- Is the 3-person room limit on the web (since December 2025) intentional? There's no way to upgrade on the web.
- Any real moment you saw it used, with a photo that isn't AI-generated?

### Carpoolio

- The 4.9★ rating (above). Usage: 23 accounts by December 2025, 2 of them yours. Publish that or not?
- The case study quotes your own texts to friends: "kind of like Partiful but for trips/festivals/weddings/winetasting" and "I hate the hassle." Keep or cut?
- The why behind the wizard, the seat slider becoming 13 buttons, and opening seats to every rider.
- Who is "James" in the code comment "from James: sign into google"? It matters if the case study says you built it alone.
- 2 suggested reflection lines sit in an In progress box. Keep them only if they're true for you.

### Gin Score Tracker

- The App Store shows 5.0 from 5 ratings, but the 1-star review is still listed. Is "5.0" fair to quote?
- Why are text scaling (Dynamic Type) and dark mode off? A design reviewer will ask.
- How do you want to credit AI help? Commits since June 2026, including the paywall fix, were co-written with Claude Code.
- Any App Store Connect numbers (downloads, Premium conversions) you'd publish?
- Is reviewer "James. D" (on Gin and Hearts) someone you know? Neither case study quotes him.

### Hearts Score Tracker

- What made you redesign round entry the same day? Did you play a round with the first draft?
- How to credit the 2026 family work: every Spades commit and most of Canasta's have Claude co-authors. The 2025 Gin and Hearts work has none.
- The design tokens added to the shared base in January 2026 aren't used yet. Is that a planned next step?

## Licensing to check before going live

- **Fonts not used on the site**, because their licenses are unclear: Roca and Garet (Group Sing Along), LicensePlate, Neuropol and Britanica (Carpoolio), and "Card Characters" (the score trackers). The demos use Google fonts instead (Bricolage Grotesque and Inter, Gruppo, Space Mono).
- **Carpoolio's car drawings** are third-party ("Design by All-free-download.com") and show real car brand names. The demo draws its own simple car, and the case study says the app's drawings were free illustrations.
