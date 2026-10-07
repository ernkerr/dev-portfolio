# OrderSync landscape: competitor homepages around May 18, 2026

Homepages as archived in the Wayback Machine just before Erin's May 18, 2026 research, captured at 1440x900 with Playwright. OrderSync's own "before" homepage was never archived on Wayback, so it comes from Erin's screenshots in the portfolio repo and the OrderSync source at commit `a56a6bd` (May 18, 2026).

**How complete this is.** I captured 13 sites. Six have usable styled first screens: OrderSync, TrueCommerce, Conexiom, Workist, Endeavor and Comena. Five rendered without styles, but their archived text could still be read: Cleo, Canals, Y Meadows, Order1 and Choco (Choco's headline only in part). Two were not captured at all: SPS Commerce and Orderful. Wayback rate-limited and then refused connections for most of the session, so each count below gives its own N.

Extra brands I picked (they read incoming orders and enter them into the ERP): **Choco** (food distributors), **Endeavor AI**, **Comena** (YC S25, German), **Y Meadows** and **Order1** (French). I left out Hyperbots, Leverage and OrderEase because they don't clearly do order entry.

## 1. Snapshots and files

All files are in this folder. Snapshot links use the toolbar-free `if_` form.

| Site | Group | Snapshot (exact timestamp) | Capture quality | Files |
| --- | --- | --- | --- | --- |
| OrderSync (before) | — | None on Wayback for the homepage. The only archived page is `/blog/ai-vs-edi-vs-api`, 20260328174801 | Full, from Erin's repo images, not Wayback | `ordersync-first.png`, `ordersync-full.png` |
| TrueCommerce | EDI network | [20260512124033](https://web.archive.org/web/20260512124033if_/https://www.truecommerce.com/) | Good. The main nav row didn't render. | `truecommerce-first.png`, `truecommerce-full.png` |
| Conexiom | AI order entry | [20260514190724](https://web.archive.org/web/20260514190724if_/https://conexiom.com/) | Good | `conexiom-first.png`, `conexiom-full.png` |
| Workist | AI order entry | [20260510051224](https://web.archive.org/web/20260510051224if_/https://www.workist.com/en) (`/en`, since the root redirects) | Good first screen; some lower images missing | `workist-first.png`, `workist-full.png` |
| Endeavor AI | AI order entry / supply-chain AI | [20260517085620](https://web.archive.org/web/20260517085620if_/https://www.endeavor.ai/) | Good first screen; everything below the hero blank | `endeavor-first.png`, `endeavor-full.png` |
| Comena | AI order entry | [20260514063646](https://web.archive.org/web/20260514063646if_/https://comena.ai/) | Good first screen, in German; webfont didn't load | `comena-first.png`, `comena-full.png` |
| Cleo | EDI network | [20260513030911](https://web.archive.org/web/20260513030911if_/https://www.cleo.com/) | Unstyled (CSS rate-limited); text only | `cleo-first.png`, `cleo-full.png` (unstyled) |
| Canals | AI order entry | [20260513195144](https://web.archive.org/web/20260513195144if_/https://www.canals.ai/) | Unstyled; headline from DOM | `canals-first.png`, `canals-full.png` (unstyled) |
| Y Meadows | AI order entry | [20260417033108](https://web.archive.org/web/20260417033108if_/https://ymeadows.com/) (last before May 18) | Unstyled; text from DOM | `ymeadows-first.png`, `ymeadows-full.png` (unstyled) |
| Order1 | AI order entry | [20260515042118](https://web.archive.org/web/20260515042118if_/https://www.order1.ai/) | Unstyled; French; text from DOM | `order1-first.png`, `order1-full.png` (unstyled) |
| Choco | AI order entry (food) | [20260516143816](https://web.archive.org/web/20260516143816if_/https://choco.com/us) | Not captured (429). Raw HTML only | `choco-*.png` show the 429 page |
| SPS Commerce | EDI network | [20260510114443](https://web.archive.org/web/20260510114443if_/https://www.spscommerce.com/) and [20260502001337](https://web.archive.org/web/20260502001337if_/https://www.spscommerce.com/) | **Not captured (Wayback too slow).** The May 10 snapshot's CSS was never archived (404). May 2 has CSS but timed out. | `sps-commerce-*.png` (unstyled May 10, mega-menu only) |
| Orderful | EDI network | [20260513015139](https://web.archive.org/web/20260513015139if_/https://www.orderful.com/) | Not captured. The archived app showed its own error page. | `orderful-*.png` (error page) |

## 2. Coded features

"Theme" is the background behind the hero headline. Hex values come from computed CSS (or, for OrderSync, the repo's CSS). Where the color is a photo, no hex is given. "u" = unknown.

| Site | Theme | Main colors | Decoration | Hero headline | Literal / abstract | "AI" in headline | Hero shows | Primary CTA | 2nd CTA | Logos 1st screen | Numbers 1st screen | Pricing | Free tools | Type | Feel |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| OrderSync (before) | light (dark section starts at the bottom edge) | ink #0E172B, body #64748B, purple #9333EA → cyan #06B6D4 | **Yes**: glowing purple/cyan orbs, gradient headline text, gradient glowing CTA, glass button | "One System for All Your Orders" | literal (names orders, not the job) | no (subhead: "Our AI agent reads, validates, and syncs…") | nothing (text + orbs) | Book a free intro call | yes: "Try Free EDI Inspector →" (code at May 2/18: "Try Free Tools") | yes: retailer logos, "Processing orders from" | no | no | **yes** (EDI Inspector) | Satoshi, geometric sans | glossy, gradient-heavy, generic AI startup |
| TrueCommerce | dark (white top bar) | navy #00112A / #002855, blue #1FB4FF, amber CTA #FFAA00 | **Yes**: navy→cyan gradient, big abstract swooshes | "Your Supply Chain: Integrated. Automated. Built to Scale." | abstract | no | abstract art | Book a Demo | no | no (just below) | no (stats just below) | nav link → request-pricing form; no prices | no (gated guide only) | Syne display sans + Manrope | corporate, polished, blue, enterprise |
| Conexiom | light (warm grey) | grey #F0EEEC, charcoal #303440, orange-red CTA #DC3A10 | No (flat; faint dot grid in card) | "Process every order accurately, in seconds." | literal | no | **product UI** (animated line-item fixes: "widget a → WIDGET-A", "$2450 → 2,450.00 USD") | Request demo | yes: Watch how it works | no (just below) | "Learning from 1B+ line items annually" | no | no | Inclusive Sans | calm, warm, plain, product-led |
| Workist | dark | navy #0B2B4F, mint CTA #5EEAD4, off-white #FAFBFB | **Yes**: hexagon line art + teal radial glow; 3D-style mascot lower down | "Automate order entry - from inbox to ERP within seconds" | literal | no | abstract art | Book a meeting | no | **yes** (Liebherr, pewag, Ledlenser…) | "150+ industry leaders trust Workist" | nav link "Pricing"; prices u | no | PP Pier Sans + Inter | dark, techy, tidy, friendly |
| Endeavor AI | mixed (full-bleed sky photo, white type) | sky photo, red CTA #ED353D, white | No (photo) | "The #1 AI Platform for Supply Chain" | abstract | **yes** | photo (red crane, building, clouds; no people) | Book a demo (work-email field) | no ("Get started" in nav) | no | "#1"; "customers doing $100B+ in annual sales" | no | no | **Kalice serif** + Inter/Geist | bright, confident, editorial, industrial |
| Comena | dark | deep blue blurred image, white #FFFFFF | **Yes**: blurred "soft light" tech background, frosted-glass nav | "Weniger Tippen, mehr Verkaufen. Automatisierte Auftragserfassung" (Less typing, more selling. Automated order entry) | literal | no ("KI Agenten" in subhead) | abstract art | Demo buchen | yes: So funktioniert's | u (label shown, logos didn't render) | no | no | no | Host Grotesk (fallback rendered) | dark, moody, minimal, startup |
| Cleo | u | u | u | "From Modern EDI to AI-native Orchestration. Cleo Has You Covered." | mixed | **yes** | u | u | u | u | u ("5,000+ customers" in nav copy) | nav link "Pricing" (/edi-pricing); prices u | no | Nunito Sans (per HTML) | u |
| Canals | u | u | u | "AI That Keeps Material Moving" | abstract | **yes** | u | u | u | u | u | no | no | u | u |
| Y Meadows | u | u | u | "Process 1000+ Orders / Without Typing a Single Line" | literal | no (subhead: "AI software that automatically reads customer orders and enters them into your ERP system.") | u | Schedule Live Demo | yes: Download Your "Success Roadmap" | u | in hero copy: "Cut processing time by 90+%", "1000+ Orders" | no | **yes** (ROI Calculator link) | Montserrat (per CSS) | u |
| Order1 | u | u | u | "Automatisez la saisie de vos commandes / devis grâce à l'IA" (Automate entry of your orders/quotes with AI) | literal | **yes** ("IA") | u | Réserver une démo / Démo personnalisée | u | u | in hero copy: "diviser par 10" (10x faster), "0€ setup" | no | no | u | u |
| Choco | u | u | u | "BE THE DISTRIBUTOR THAT …" (rest filled in by script). Title: "The Complete Growth Platform for Food Distributors" | u | u | u | u | u | u | u | link to /us/pricing; prices u | no | u | u |
| SPS Commerce | u | u | u | u (menu has "The Intelligent Supply Chain Network", "SPS MAX: Supply Chain Agentic AI") | u | u | u | u ("Contact Sales" in top bar) | u | u | u | u | u | Source Sans Pro (requested) | u |
| Orderful | u | u | u | u | u | u | u | u | u | u | u | u | u | u | u |

## 3. Counts per pattern

**Visual features.** N = 6 (OrderSync plus 5 competitors). Competitor-only counts are in brackets.

| Pattern | Count | Which |
| --- | --- | --- |
| Hero theme: dark | 3 of 6 [3 of 5] | TrueCommerce, Workist, Comena |
| Hero theme: light | 2 of 6 [1 of 5] | OrderSync, Conexiom |
| Hero theme: mixed (photo) | 1 of 6 [1 of 5] | Endeavor |
| Blue or navy is the main hero color | 4 of 6 [4 of 5] | TrueCommerce, Workist, Comena, Endeavor |
| Any decoration (gradients, glows, blur, abstract shapes) | 4 of 6 [3 of 5] | OrderSync, TrueCommerce, Workist, Comena |
| Soft glowing orbs or blurred light | 2 of 6 [1 of 5] | OrderSync, Comena |
| Gradient text in headline | 1 of 6 [0 of 5] | OrderSync |
| Glassmorphism | 2 of 6 [1 of 5] | OrderSync, Comena |
| 3D renders in hero | 0 of 6 | (Workist has a 3D-style mascot further down) |
| Hero shows product UI | 1 of 6 [1 of 5] | Conexiom |
| Hero shows abstract art | 3 of 6 [3 of 5] | TrueCommerce, Workist, Comena |
| Hero shows a photo | 1 of 6 [1 of 5] | Endeavor (machinery, no people) |
| Hero shows nothing but decoration | 1 of 6 [0 of 5] | OrderSync |
| Hero shows a diagram or people | 0 of 6 | — |
| Warm CTA color (amber, orange, red) | 3 of 6 [3 of 5] | TrueCommerce, Conexiom, Endeavor |
| Customer logos on first screen | 2 of 6 yes, 3 no, 1 unknown [1 of 5 yes] | Workist, OrderSync |
| Numbers/proof on first screen | 3 of 6 [3 of 5] | Conexiom (1B+ line items), Workist (150+ customers), Endeavor (#1, $100B+) |
| Serif headline | 1 of 6 [1 of 5] | Endeavor |

**Headlines.** N = 10 with a known headline (the 6 above, plus Cleo, Canals, Y Meadows and Order1). Competitors only: N = 9.

| Pattern | Count | Which |
| --- | --- | --- |
| Literal about the job (orders, order entry, EDI/ERP) | 6 of 10 [5 of 9] | OrderSync, Conexiom, Workist, Comena, Y Meadows, Order1 |
| Abstract or category/hype | 3 of 10 [3 of 9] | TrueCommerce, Endeavor, Canals |
| Mixed | 1 of 10 [1 of 9] | Cleo |
| Says "AI" in the headline | 4 of 10 [4 of 9] | Endeavor, Cleo, Canals, Order1 |
| Says "AI" among the 6 literal headlines | 1 of 6 | Order1 |
| Says "AI" among the 4 abstract/mixed headlines | 3 of 4 | Endeavor, Cleo, Canals |

**CTAs.** N = 8 with a known primary CTA (the 6 visual ones, plus Y Meadows and Order1).

| Pattern | Count | Which |
| --- | --- | --- |
| Primary CTA books a demo, meeting or call | 8 of 8 | everyone |
| Primary CTA says "demo" | 6 of 8 | TrueCommerce, Conexiom, Endeavor, Comena, Y Meadows, Order1 |
| Says "meeting" / "intro call" | 1 / 1 | Workist / OrderSync |
| Has a second CTA in the hero (N = 7 known) | 4 of 7 | OrderSync (free tool), Conexiom and Comena (how it works), Y Meadows (download) |

**Pricing and tools.** N = 11 whose links could be read (all but SPS and Orderful).

| Pattern | Count | Which |
| --- | --- | --- |
| "Pricing" link in nav or homepage | 4 of 11 | TrueCommerce (goes to a request form), Workist, Cleo, Choco |
| Prices shown on the homepage | 0 of 6 visually checked | — |
| Free tool linked from homepage | 2 of 11 | OrderSync (EDI Inspector), Y Meadows (ROI Calculator) |

**Grouping.** I don't think the data supports a solid incumbents-vs-startups split. Of the four EDI networks, only TrueCommerce could be fully coded and only Cleo's headline is known. SPS and Orderful weren't captured. The one hint: both incumbents with a known headline are abstract or mixed (TrueCommerce, Cleo; n = 2). Among AI order-entry tools, 6 of 8 headlines are literal. The two that aren't (Endeavor, Canals) sell themselves as broader supply-chain AI platforms.

## 4. Takeaways

1. **Everyone asks for a meeting; almost nobody offers anything else.** All 8 known primary CTAs book a demo, meeting or call, and 6 of 8 say "demo". OrderSync's "intro call" wording is the only one of its kind (1 of 8). Free tools are rare: 2 of 11 link one (OrderSync's EDI Inspector; Y Meadows' ROI calculator). OrderSync's is the only one in the hero.
2. **The order-entry tools talk about the job in plain words.** 6 of 10 known headlines are literal about orders or order entry ("Process every order accurately, in seconds", "Automate order entry - from inbox to ERP within seconds"). Only 4 of 10 put "AI" in the headline. Three of those four are the abstract or mixed ones ("The #1 AI Platform for Supply Chain", "AI That Keeps Material Moving", Cleo's "AI-native Orchestration"). Only 1 of the 6 literal headlines says AI (Order1).
3. **Almost no one shows the product up top.** Only 1 of 6 visually coded heroes shows product UI: Conexiom's animated line-item corrections. 3 of 6 use abstract art, 1 a stock-style photo, and OrderSync's showed nothing but orbs. No hero shows a diagram or people (0 of 6).
4. **Blue/dark is the default look; glowing orbs are not.** Blue or navy is the main hero color for 4 of 5 competitors, and 3 of 5 have dark heroes. Soft glowing orbs or blurred light appear on 2 of 6 (OrderSync before, Comena). Gradient headline text appears only on OrderSync (1 of 6). The only light, flat competitor is Conexiom (1 of 5), and it's also the one showing product UI. 3 of 6 use a warm (amber/orange/red) CTA color.
5. **Proof is light and prices are hidden.** Numbers appear on 3 of 6 first screens and logos on 2 of 6, with 1 unknown. No visually checked homepage shows prices (0 of 6). 4 of 11 have a "Pricing" link, and TrueCommerce's goes to a request form.

## 5. Caveats

- **Wayback rate limits.** Wayback returned 429s and then refused connections for long stretches. Several pages lost their CSS or images. I reran with throttling and a disk cache, but couldn't finish before wrapping up. That's why 7 of 13 sites have no styled first screen.
- **SPS Commerce:** not captured (Wayback too slow). The May 10, 2026 snapshot's CSS files were never archived (404), so it can't render styled. The May 2 snapshot (20260502001337) has its CSS archived (`front-page/main.css` captured 20260502012225) but timed out. A retry later should work.
- **Orderful:** the May 13 snapshot loads but the site's app shows "Error — Something went wrong" inside the archive. Nothing could be coded.
- **Choco:** the page request itself got a 429. Only the raw HTML was read, so the headline is partial ("BE THE DISTRIBUTOR THAT …", finished by script).
- **Cleo, Canals, Y Meadows, Order1:** rendered without styles. Text, links and the CTA wording come from the same snapshot's DOM/HTML; every visual field is "unknown". Y Meadows' "numbers" are in hero copy but their placement is unknown.
- **OrderSync** has no archived homepage on Wayback (only one blog post, March 28, 2026). Its row uses Erin's repo screenshots (`public/images/orderSync/before-hero.png`, `before-home.png`; a Next.js dev badge is visible, so they're local renders). Colors and fonts come from the OrderSync repo at commit `a56a6bd` (May 18, 2026). The screenshot's second CTA reads "Try Free EDI Inspector →", but the code at the May 2 and May 18 commits says "Try Free Tools". So the screenshot may come from a slightly different build.
- **Comena** is coded from the German page (the archived default). **Order1** is French. **Workist** is the `/en` page, because the root redirects there.
- **Endeavor:** sections below the hero rendered blank, so anything further down the page (pricing, tools, logos) is unseen. **TrueCommerce:** the main nav row didn't render (a white band under the top bar), though its links are in the DOM.
- **What the renders include:** live (non-archive) requests were blocked so only archived content appears, tracking scripts were blocked, and cookie banners were hidden with CSS. Nothing was clicked.
- **Small samples:** the visual counts are out of 6, so read them as a landscape snapshot, not statistics.
