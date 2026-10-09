# OrderSync May 2026 decisions: the research behind each one

Compiled 7 Oct 2026 for the OrderSync case study. This is a companion to `audience-research.md`. Sources marked **AR #n** were verified there and are reused here without re-checking. Every other URL below was opened on 7 Oct 2026. Where a publisher page blocks scripts, I say how I read the abstract instead.

**How to read this**
- Findings are close paraphrases, with the section name so you can pull exact wording from the source. There is one direct quote (decision 12).
- Strength labels match AR: **Peer-reviewed**, **Large survey**, **Vendor survey**, **Expert guidance** (NN/g, Baymard), plus **Principle** for named laws (Hick, von Restorff, Jakob).
- The same caveat applies as in AR. Nothing here sampled OrderSync's buyers. Most NN/g findings come from consumer usability tests; the peer-reviewed studies mostly used students or the general public. These sources support the decisions. They don't prove the decisions worked.
- Two items in AR postdate the May decisions: TrustRadius 2026 (published 15 Jul 2026) and Gartner's Oct 2026 Hype Cycle. You can cite them as support, but not as research you used in May.

**Two facts from `landscape.md` to get right before citing anything**
- The *before* page already used "One System for All Your Orders" as its headline. Decision 1 is more accurately "kept the literal headline and dropped the gradient text".
- The *before* page's first-screen logos were retailers, under "Processing orders from". If May replaced trading-partner logos with actual customers, say so. That is a credibility fix in its own right (see decision 4).

---

## 1. A literal hero headline, not abstract or hype

**Best sources**

1. **"Homepage Design: 5 Fundamental Principles"**, Huei-Hsin Wang, Nielsen Norman Group, 15 Mar 2024. https://www.nngroup.com/articles/homepage-design-principles/ (loads)
   - *Finding (Principle 2):* treat the homepage as an elevator pitch.
     - Guideline 2.2: use a tagline that says explicitly what the company does, and don't assume visitors know the brand.
     - Guideline 2.3: use words that resonate with users, not jargon or feature-driven language.
   - Many of the bad and good examples are industrial B2B homepages (oil and gas, steel, rail, mining), so this is closer to OrderSync's world than most NN/g articles.
   - *Supports:* a headline that names what OrderSync is for beats a category or hype line.
   - *Strength:* Expert guidance.
2. **"Concise, SCANNABLE, and Objective: How to Write for the Web"**, John Morkes & Jakob Nielsen, NN/g, 1 Jan 1997. https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/ (loads)
   - *Method (Study 3):* 51 web users, five versions of the same site with the same information, between subjects (about 10 per version).
   - *Finding:*
     - Stripping out promotional language ("marketese": exaggeration, subjective claims, boasting) raised the combined usability score by 27%.
     - Making the text concise, scannable *and* objective together raised it by 124%.
     - The authors' explanation: readers who stop to question promotional claims get distracted from the meaning.
   - *Supports:* a plain, factual headline instead of hype.
   - *Strength:* Empirical, but small and old.

**Also useful**
- Nielsen, "Top 10 Guidelines for Homepage Usability", 11 May 2002, https://www.nngroup.com/articles/top-ten-guidelines-for-homepage-usability/ (loads). Guideline 1: start with a one-sentence tagline that summarizes what the company does, especially if you're not famous.
- AR #5, Cicek, Gursoy & Lu (2024): lead with benefits, not "AI".
- `landscape.md`: 5 of 9 competitor headlines are literal about orders or order entry.

**Flags**
- **The objective-language result is weaker than "27%" suggests.**
  - For the objective version alone, only satisfaction was statistically significant. Task time, errors and memory pointed the same way but didn't reach significance.
  - The 27% is a composite score from about 10 people per group in 1997.
- **The headline doesn't fully meet NN/g's bar.** NN/g asks for a tagline that says explicitly what the company *does*.
  - "One System for All Your Orders" says what OrderSync is for, but not the job: reading POs and entering them into the ERP.
  - `landscape.md` codes it "literal (names orders, not the job)".
  - The subhead has to carry the job. Say that in the case study, rather than claiming the headline alone does it.

---

## 2. One primary CTA (Book a Call) in a sticky header; Sign In demoted to a text link

**Best sources**

1. **"Homepage Design: 5 Fundamental Principles"**, Wang, NN/g, 2024. URL above.
   - *Finding (guideline 4.2):*
     - Give top tasks visual prominence.
     - Avoid visual competition between homepage elements. Emphasizing everything leaves nothing prominent.
   - *Supports:* one filled button, not two competing ones.
   - *Strength:* Expert guidance.
2. **"Utility Navigation: What It Is and How to Design It"**, Susan Farrell, NN/g, 4 Oct 2015. https://www.nngroup.com/articles/utility-navigation/ (loads)
   - *Finding:*
     - Sign in is a utility, a secondary action.
     - Utilities can get a less prominent visual treatment, as long as they stay where convention puts them (usually top right) so people can find them when needed.
   - *Supports:* demoting Sign In to a text link in the top right, rather than removing it. Existing customers can still find it.
   - *Strength:* Expert guidance.

**Also useful**
- **"Sticky Headers: 5 Ways to Make Them Better"**, Page Laubheimer, NN/g, 4 Apr 2021. https://www.nngroup.com/articles/sticky-headers/ (loads)
  - Sticky headers make header elements more discoverable and more likely to be used.
  - But they cost screen space on every page, especially on mobile.
  - They should be small and opaque. Translucent headers hurt readability.
- **"Scrolling and Attention"**, Therese Fessenden, NN/g, 15 Apr 2018. https://www.nngroup.com/articles/scrolling-and-attention/ (loads)
  - Eyetracking with 120 participants and 130,000+ fixations: 57% of viewing time was above the fold, and 74% in the first two screenfuls.
  - NN/g recommends keeping major CTAs above the fold.
  - A sticky header keeps Book a Call in view at every scroll depth. That last step is my inference, not NN/g's claim.
- **"Button Design: Best Practices for Optimal UI Buttons"**, Christian Holst, Baymard Institute, 15 Dec 2021. https://baymard.com/learn/button-design (loads)
  - Use color to make the primary button stand out from the other buttons.
  - When a page has more than one button, make the primary one more prominent.
  - Users often don't read button labels; they go by color and placement.
- **Hick's Law**, Laws of UX (Jon Yablonski). https://lawsofux.com/hicks-law/ (loads)
  - Decision time grows with the number and complexity of choices.
  - One of its takeaways is to highlight the recommended option.
- `landscape.md`: 8 of 8 known competitor primary CTAs book a demo, meeting or call. One meeting CTA is the category convention (Jakob's Law, AR #15).
- AR #11a, Gartner (2025): buyers prefer to research alone, but want a person for the "does it fit our needs" question. That is what Book a Call is for.

**Flags**
- **Hick's Law is a loose fit.** Hick (1952) measured reaction times to lights mapped to keys. Two buttons isn't a choice-overload problem.
  - The choice-overload literature is contested:
    - Scheibehenne, Greifeneder & Todd (2010), *Journal of Consumer Research* 37(3), 409–425, https://doi.org/10.1086/651235: a meta-analysis of 63 conditions (N = 5,036) found a mean effect of about zero.
    - Chernev, Böckenholt & Goodman (2015), *Journal of Consumer Psychology* 25(2), 333–358, https://doi.org/10.1016/j.jcps.2014.08.002: a meta-analysis of 99 observations (N = 7,202) found overload only under specific conditions, such as complex sets, hard tasks and unclear preferences.
    - I read both abstracts through OpenAlex; the DOIs resolve to the publishers.
  - **Make the visual-hierarchy argument (Wang, Baymard), not the overload argument.**
- **Baymard's evidence is about e-commerce checkout**, with consumers.
- **Buyers want to delay sales contact.**
  - G2 2025 (AR #13): nearly 2 in 3 buyers prefer to engage sales later.
  - Nielsen (2006, below): busy people avoid sales calls unless they already believe the vendor has what they want.
  - An always-visible Book a Call is fine. It just can't be the only way to get answers; decisions 5 and 6 cover that.
- **The sticky header costs space on small phones.** Keep it short.

---

## 3. Chrome styling only on Book a Call (isolation / von Restorff effect)

**Best sources**

1. **Von Restorff Effect**, Laws of UX (Jon Yablonski). https://lawsofux.com/von-restorff-effect/ (loads)
   - *Finding:* among similar items, the one that differs is the one most likely to be remembered. The origin is Hedwig von Restorff's 1933 memory study of word lists.
   - *Takeaways:*
     - Make key actions visually distinctive.
     - Use restraint, so emphasized items don't compete or get mistaken for ads.
     - Don't rely on color alone.
   - *Supports:* one distinctive treatment, on one button.
   - *Strength:* Principle.
2. **"Visual Hierarchy in UX: Definition"**, Kelley Gordon, NN/g, 17 Jan 2021. https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ (loads)
   - *Finding:*
     - Hierarchy comes from the contrast between an element and its surroundings, not from the color itself.
     - Limit the number of contrast variations; when everything contrasts, nothing stands out.
   - *Supports:* chrome works *because* nothing else on the page uses it.
   - *Strength:* Expert guidance.

**Also useful**
- AR #4, Hekkert et al. (2003), "Most advanced, yet acceptable": a typical design with one touch of novelty.
- Baymard (2021) above: color as the cue that marks the primary button.

**Flags (some cut against)**
- **Von Restorff measured recall of list items, not clicks or attention on web pages.** The UX use is an analogy. Cite it as a principle, not as evidence that the button converts.
- **Banner blindness: distinctive styling can backfire.**
  - Source: "Banner Blindness Revisited: Users Dodge Ads on Mobile and Desktop", Kara Pernice, NN/g, 22 Apr 2018. https://www.nngroup.com/articles/banner-blindness-old-and-new-findings/ (loads)
  - Users skip anything that looks like an ad, and ad-like visual treatment is one of the triggers.
  - NN/g warns that making content look different from the rest of the site to raise its salience often has the opposite effect.
  - A metallic finish is a flashy treatment. Keep it on a conventionally shaped button in the conventional header and hero slots, which is what the design does.
- **Contrast.** WCAG 2.1 SC 1.4.3, https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html (loads), requires 4.5:1 for text.
  - On a metallic gradient, check the label against the lightest part of the button, not the average.
  - The page lists insufficient contrast over background images as a known failure (F83).
- **Tension with decision 7.** Chrome is itself a decorative gradient. The defensible line is "one decorative treatment, on the one thing that matters".

---

## 4. Real customer logos directly under the hero

**Best sources**

1. **"Social Proof in the User Experience"**, Jen Cardello, NN/g, 19 Oct 2014. https://www.nngroup.com/articles/social-proof-ux/ (loads)
   - *Finding:* people use others' behavior to guide their own. Showing that others, especially people the visitor recognizes, use a product reduces decision uncertainty.
   - *Supports:* logos of distributors and suppliers the buyer recognizes.
   - *Strength:* Expert guidance.
2. **"Scrolling and Attention"** (Fessenden, NN/g, 2018), URL above, plus **Wang (2024) guideline 3.1**.
   - *Finding:* most viewing time is spent near the top. Wang adds that what sits above the fold decides whether people keep scrolling, so put the most important content as high as possible.
   - *Supports:* putting proof directly under the hero rather than further down.
   - *Strength:* Expert guidance, based on eyetracking.

**Also useful**
- AR #10, CEB/Google (2013): B2B buyers attach to brands that reduce their personal risk. Recognizable peers already using the product are a direct answer to "will this burn me like the last vendor?" (my inference).

**Flags**
- **No study I found tests customer-logo strips on B2B sites.** Cardello's article is about ratings, shares and reviews, not logos. Logos are an application of the general principle.
- **Company-hosted proof gets read skeptically.** Harley 2016 (AR #16) found that people trust external sources more than content on the company's own site, and read on-site testimonials with suspicion. Logos are company-hosted proof, and they work best alongside a presence on review sites. In G2 2025 (stat-check 4b), review sites are a top-two shortlist influence, at 15.1%.
- **Too few or unknown logos can backfire.** Cardello's main caution is that social proof backfires when it signals that too few people approve.
- **Unverified claim, don't use.** Several 2026 blog posts (e.g. pravinkumar.co) cite an "NN/g 2026 B2B trust signals" study: 5–7 logos read as a credible roster, 12+ as a wall. I found no such article on nngroup.com.
- **Lead only: Terho & Jalkala (2017).** "Customer reference marketing: Conceptualization, measurement and link to selling performance", *Industrial Marketing Management* 64, 175–186, https://doi.org/10.1016/j.indmarman.2017.01.005.
  - The DOI is verified through Crossref, but the publisher and university pages blocked me, so I couldn't read the abstract.
  - It is about firms' whole reference programs, not website logos.
- **Retailer logos on the before page.** If the before page's retailer logos were trading partners rather than customers, the switch to real customers is the more honest proof. Harley's "comprehensive, correct and current" factor backs that.

---

## 5. An FAQ that answers objections (setup time, needing IT, how it differs from the incumbent) before asking for a call

**Best sources**

1. **"FAQs Still Deliver Great Value"**, Susan Farrell, NN/g, 21 Dec 2014. https://www.nngroup.com/articles/faqs-deliver-value/ (loads)
   - *Finding:* prospects read FAQs to judge the company before buying. Good FAQs answer their unspoken questions:
     - Can I dismiss my concerns before spending money?
     - Do the answers sound frank or like hype?
     - Does it admit the known limitations?
   - Your salespeople already know the presales questions.
   - Questions must be real and in visitors' own wording. Made-up questions are a long-standing mistake.
   - *Supports:* an FAQ built from the objections buyers actually raise.
   - *Strength:* Expert guidance.
2. **"B2B Usability"**, Jakob Nielsen, NN/g, 31 May 2006. https://www.nngroup.com/articles/b2b-usability/ (loads)
   - *Method:* 55 business users in one-on-one usability tests (79 participants in total across methods).
   - *Finding:*
     - Users are very reluctant to fill in lead forms, and a vendor has to establish credibility before people will hand over contact details.
     - Information available without registration must be complete enough for users to judge whether the product fits their situation, including how it integrates with their existing systems.
   - *Supports:* answering setup time and "do we need IT" before the Book a Call ask.
   - *Strength:* Qualitative, real business users, 2006.

**Also useful**
- Harley 2016 (AR #16): sites that left out basic information were ruled out almost immediately, and participants often went to FAQ pages to find it.
- Wang (2024) guideline 2.3: show how you differ from competitors. That backs the "how it differs from the incumbent" answer.
- AR #10, CEB (2013): setup time and IT dependence are exactly the personal risks (time, credibility, job) that buyers fear.
- AR #11a, Gartner (2025): 61% of buyers prefer a rep-free experience.

**Flags (one cuts against)**
- **Pricing is buyers' top question.**
  - Nielsen (2006): pricing ranked first of 28 information types.
  - Harley (2016): show transparent price ranges rather than forcing a quote request.
  - TrustRadius 2026 (AR #14): transparent pricing is buyers' #1 wish.
  - If the FAQ doesn't address pricing, it leaves that question open.
  - `landscape.md` shows 0 of 6 competitors put prices on the homepage. That is the category convention, but the research cuts against it. Say why in the case study (quote-based pricing, the client's call).
- **Farrell's test is that the objections come from real buyers.** Say where they came from: sales calls, Capterra reviews (stat-check has the verified quotes), the client.

---

## 6. Free tools as a low-commitment "try it first" path

**Best sources**

1. **"B2B Usability"**, Nielsen, NN/g, 2006. URL above.
   - *Finding:* NN/g recommends moving more information outside registration barriers, so prospects can use it during early research. Credibility has to come before contact details.
   - *Supports:* an ungated tool that lets a buyer see OrderSync's competence before talking to anyone.
   - *Strength:* Qualitative, real business users.
2. **"Homepage Design: 5 Fundamental Principles"**, Wang, NN/g, 2024, guideline 5.4, plus **Harley 2016** (AR #16).
   - *Finding:*
     - Wang: follow the reciprocity principle and offer value before asking visitors for anything.
     - Harley: gating content, or asking for information before giving any value, breaks trust.
   - *Supports:* a free tool that gives value first.
   - *Strength:* Expert guidance.

**Also useful**
- **Foot-in-the-door.** Freedman & Fraser (1966), "Compliance without pressure: The foot-in-the-door technique", *Journal of Personality and Social Psychology* 4(2), 195–202. https://doi.org/10.1037/h0023552
  - I read the abstract through OpenAlex; PsycNET didn't render.
  - Two field experiments: people who agreed to a small request were more likely to agree to a larger one later.
  - Use it as framing: trying a free tool is the small yes, and booking a call is the larger one.
- AR #14, TrustRadius 2026: free trials and demos were among buyers' most influential resources.
- AR #11a, Gartner 2025: a rep-free preference.
- `landscape.md`: only 2 of 11 competitors link a free tool, and OrderSync's is the only one in the hero. That makes it a differentiator, not a convention.

**Flags (one cuts against)**
- **Foot-in-the-door is conditional and can backfire.**
  - Burger (1999), "The Foot-in-the-Door Compliance Procedure: A Multiple-Process Analysis and Review", *Personality and Social Psychology Review* 3(4), 303–325, https://doi.org/10.1207/s15327957pspr0304_2: several processes are involved, and the technique sometimes fails or even lowers compliance.
  - Chartrand, Pinckert & Burger (1999), "When manipulation backfires", *Journal of Applied Social Psychology* 29(1), 211–221, https://doi.org/10.1111/j.1559-1816.1999.tb01382.x (abstract read on Scholars@Duke and OpenAlex): when the **same requester asked the big favor immediately**, compliance fell *below* the control group.
  - *Implication:* don't follow tool use with an instant hard "Book a Call" push. Let the tool stand on its own.
- **A side tool is a weaker analog than a free trial.** TrustRadius's "free trial" means trying the product itself. A side tool (the EDI Inspector) shows competence, but it doesn't test OrderSync on the buyer's own orders.
- **No source measures the conversion.** Nothing I found measures free-tool-to-meeting conversion in B2B. OrderSync's own analytics would.
- **Timing.** TrustRadius 2026 postdates May.

---

## 7. Removing decorative gradients, glowing orbs and glassmorphism for a calmer, conventional layout

**Best sources**

1. **AR #1, Tuch et al. (2012)**, *IJHCS*. Real company homepages were rated most beautiful when low in visual complexity and high in prototypicality, within 17–50 ms. This is still the strongest single source.
2. **"10 Usability Heuristics for User Interface Design"**, Jakob Nielsen, NN/g, 24 Apr 1994 (last reviewed 30 Jan 2024). https://www.nngroup.com/articles/ten-usability-heuristics/ (loads)
   - *Finding (heuristic #8, Aesthetic and Minimalist Design):* every extra unit of information competes with the relevant ones and lowers their visibility. NN/g adds that this doesn't mean flat design; it means keeping the visuals focused on the essentials and on users' main goals.
   - *Supports:* decoration that carries no information takes attention away from the headline and the CTA.
   - *Strength:* Expert guidance, the most cited heuristic set in UX.

**Also useful**
- **Wang (2024), Principle 5.**
  - Use simple, standard homepage designs. People spend most of their time on other sites (Jakob's Law).
  - Minimize motion.
  - Colorful animated blocks on an industrial homepage (Jacobs) could be mistaken for ads.
- AR #16, NN/g on glassmorphism (2024): readability problems. Laubheimer (2021, above) adds that translucent sticky headers have low contrast and should be opaque.
- AR #3, Reinecke et al. (2013), and AR #7, Sillence et al. (2004): busy layouts get rejected.
- **Kuric, Demcak, Krajcovic & Nguyen (2023)**, "Cognitive abilities and visual complexity impact first impressions in five-second testing", *Behaviour & Information Technology* 43(13), 3209–3236. https://doi.org/10.1080/0144929X.2023.2272747
  - Open access, but Taylor & Francis blocks scripts; I read the abstract through Semantic Scholar and OpenAlex.
  - Visually complex pages shown briefly were linked to trouble identifying the page's purpose.
- `landscape.md`:
  - OrderSync was the only one of 6 sites with gradient headline text.
  - It was the only hero showing nothing but decoration.
  - 4 of 6 sites had some decoration, so decoration itself was common in the category.

**Flags**
- **Calm can't mean bland.**
  - Reinecke found appeal dips slightly for pages that are *too* plain.
  - "The Aesthetic-Usability Effect", Kate Moran, NN/g, 3 Feb 2024, https://www.nngroup.com/articles/aesthetic-usability-effect/ (loads): attractive designs earn forgiveness for minor usability problems.
  - Frame the change as polished and quiet, not stripped.
- **Judge "conventional" against the category too.** In `landscape.md`, 4 of 5 competitors use blue or navy and 3 of 5 have dark heroes. Tuch measured typicality against company websites in general.
- **Kuric et al. is abstract-only.** I didn't see the sample size.

---

## 8. Copy in buyers' own words ("Still Typing Orders Into Your ERP?")

**Best sources**

1. **Nielsen's heuristic #2, Match Between the System and the Real World.** Same URL as decision 7.
   - *Finding:* use the words, phrases and concepts users know, not internal jargon. NN/g's tip: user research is how you find users' own terms.
   - *Supports:* writing in the buyer's vocabulary (typing orders, the ERP) rather than the vendor's (EDI orchestration, AI agents).
   - *Strength:* Expert guidance.
2. **"FAQs Still Deliver Great Value"**, Farrell, NN/g, 2014. URL above.
   - *Finding:* people search for their problem, not your solution, so match visitors' vocabulary and phrasing.
   - *Supports:* a problem-first headline in the buyer's words.
   - *Strength:* Expert guidance.

**Also useful**
- **Lai & Farbrot (2014)**, "What makes you click? The effect of question headlines on readership in computer-mediated communication", *Social Influence* 9(4), 289–299. https://doi.org/10.1080/15534510.2013.847859
  - I read the abstract through OpenAlex; the T&F page blocks scripts.
  - Two field experiments: question headlines drew more readers than statements.
  - Questions that refer to the reader did best, ahead of rhetorical questions.
  - The effect varied by topic.
  - *Strength:* Peer-reviewed.
- "Information Scent: How Users Decide Where to Go Next", Raluca Budiu, NN/g, 2 Feb 2020, https://www.nngroup.com/articles/information-scent/ (loads): jargon and too-sophisticated words get ignored.
- Wang (2024) guideline 2.3: speak the users' language and avoid business terminology.
- Nielsen (2006), B2B Usability: even specialist audiences can't be assumed to know industry jargon.

**Flags**
- **Lai & Farbrot measured readership, not bookings.** They measured clicks on headlines in online communications, not a hero headline's effect on demo bookings.
  - "Still Typing Orders Into Your ERP?" refers to the reader, which is the version that did best.
  - It also reads close to rhetorical, which did worse.
  - Present it as supporting, not proving.
- **Say where the words came from.** The heuristic only holds if the words really are the buyers'. Name the source: sales calls, Capterra reviews, the client.

---

## 9. A design system with named color tokens and shared components

**Best sources**

1. **"Maintain Consistency and Adhere to Standards (Usability Heuristic #4)"**, Rachel Krause, NN/g, 10 Jan 2021. https://www.nngroup.com/articles/consistency-and-standards/ (loads)
   - *Finding:* when sites follow standards, users know what to expect, learn faster and get less confused. A design system helps a team keep things consistent, so users find each page familiar.
   - *Supports:* every page built from the same tokens and components.
   - *Strength:* Expert guidance.
2. **"Design Systems 101"**, Therese Fessenden, NN/g, 11 Apr 2021 (last reviewed 27 Aug 2026). https://www.nngroup.com/articles/design-systems-101/ (loads)
   - *Finding:*
     - The main benefits are reusable components, so designs can be repeated quickly, and visual consistency across pages and teams.
     - The costs are maintenance and teaching people to use the system.
   - *Strength:* Expert guidance.

**Also useful**
- **"Measuring the value of design systems"**, Clancy Slack, Figma, 19 Dec 2019. https://www.figma.com/blog/measuring-the-value-of-design-systems/ (loads)
  - Figma's own designers finished a design task 34% faster with a relevant design system than with old files.

**Flags**
- **The evidence is about team speed and consistency, not buyer behavior.** I found nothing linking tokens to trust or bookings. Frame the decision as "every page stays consistent as the site grows", not as a conversion lever.
- **The Figma study is weak evidence.**
  - It's a vendor study of Figma's own team, and the sample size isn't stated.
  - The author calls 34% a best case, because the system exactly fit the task.
- **The payoff is small for a few screens.** NN/g notes this. A marketing site with a handful of pages is that case. The stronger argument is consistency across future pages (tools, comparisons, guides).

---

## 10. Keeping a light/dark mode toggle as a user preference

**Best source**

1. **"Dark Mode vs. Light Mode: Which Is Better?"**, Raluca Budiu, NN/g, 2 Feb 2020. https://www.nngroup.com/articles/dark-mode/ (loads)
   - *Finding:*
     - For people with normal vision, light mode (dark text on a light background) gives better performance most of the time.
     - NN/g doesn't recommend dark as the default for general audiences.
     - It does strongly recommend letting users switch, for three reasons: a possible long-term myopia link with light mode, some low-vision users do better in dark mode, and some people simply prefer it.
   - It reviews Piepenbrock et al. (2013), Dobres et al. (2017), Aleman et al. (2018) and Legge et al. (1985).
   - *Supports:* keeping the toggle, with light as the default.
   - *Strength:* Expert guidance, summarizing peer-reviewed work.

**Also useful**
- Heuristic #7, Flexibility and Efficiency of Use (same URL as decision 7). One tip is to let users customize how the product works.

**Flags (cuts against how much it matters)**
- **People rarely switch modes on sites they seldom visit.** The same article says people rarely change defaults and are unlikely to switch modes on an arbitrary website. The option matters most for sites people use often and for long-form reading.
  - A marketing site that buyers visit a few times is the weak case.
  - The stronger move is to follow the operating system's setting, which NN/g recommends. Keep the toggle as a quiet secondary control, with light as the default.
- **The myopia study is tiny.** Aleman et al. (2018) had 7 participants.

---

## 11. Clear navigation labels ("Blog" renamed "Resources")

**Best sources**

1. **"Menu-Design Checklist: 17 UX Guidelines"**, Page Laubheimer, NN/g, 7 Jun 2024. https://www.nngroup.com/articles/menu-design/ (loads)
   - *Finding (guideline 7):* use clear, specific, familiar labels; avoid made-up words, internal jargon and abstract categories; use terms that describe the content.
   - *Supports:* renaming a label that no longer described its contents.
   - *Strength:* Expert guidance.
2. **"Information Scent: How Users Decide Where to Go Next"**, Budiu, NN/g, 2020. URL above.
   - *Finding:* the link label is the most important part of information scent, and it should be a short, accurate description of the destination. People skip labels that don't match their goal.
   - *Supports:* "Blog" was inaccurate once guides and comparisons sat behind it, so buyers looking for a comparison wouldn't click it.
   - *Strength:* Expert guidance.

**Also useful**
- "Top 10 Information Architecture (IA) Mistakes", Nielsen, NN/g, 10 May 2009, https://www.nngroup.com/articles/top-10-ia-mistakes/ (loads). Mistake #10, made-up menu options: plain, familiar words help users choose correctly.

**Flags (cuts against "Resources")**
- **NN/g names "Resources" itself as a generic label.**
  - Source: "Bad Intranet Navigation Labels: 3 Workarounds", Kathryn Whitenton, NN/g, 11 May 2014, https://www.nngroup.com/articles/fixing-bad-intranet-navigation/ (loads).
  - It names "Resources" as a generic label with low information scent: users aren't sure what's behind it, so they hesitate to click.
  - Its fix is a dropdown that previews the subcategories.
- **So the rename fixed one problem and kept another.** It fixed accuracy, but the new label is generic. A dropdown listing Guides, Comparisons and Blog, or a more specific label, answers NN/g's point. If the menu already previews its contents, say so in the case study.
- **Context.** The article is about intranets, but the information-scent point carries over.

---

## 12. A measurement plan pairing each homepage section with the visitor's question ("Does this solve my problem?" at 0–3 s)

**Best sources**

1. **Rodden, Hutchinson & Fu (Google), "Measuring the User Experience on a Large Scale: User-Centered Metrics for Web Applications"**, *Proc. CHI 2010*, 2395–2398. https://doi.org/10.1145/1753326.1753687
   - Page: https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/ (loads). Free PDF: https://research.google.com/pubs/archive/36299.pdf (loads; read in full).
   - *Finding:*
     - The paper introduces the HEART framework and the Goals–Signals–Metrics process.
     - A metric is only useful if it is tied to a goal. Teams name the goal, then the signals that would show success, then the metrics.
     - It was used on more than 20 Google products.
   - *Supports:* "section → visitor's question → what would show it's answered" is the same goal-first structure. Cite it as the method behind the plan.
   - *Strength:* Peer-reviewed (CHI short paper), practitioner method.
2. **"How Long Do Users Stay on Web Pages?"**, Jakob Nielsen, NN/g, 11 Sep 2011. https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/ (loads)
   - *Finding:*
     - Based on Microsoft Research dwell-time data (Liu et al.: 205,873 pages, more than 2 billion dwell times).
     - Users are most likely to leave in the first 10 seconds, and they often leave within 10–20 seconds.
     - Nielsen's advice is to "clearly communicate your value proposition within 10 seconds".
   - *Supports:* a measurement plan that front-loads the "does this solve my problem?" question.
   - *Strength:* Expert analysis of a very large log dataset.

**Also useful**
- AR #2, Lindgaard et al. (2006), and AR #1, Tuch et al. (2012): visual appeal is judged within 50 ms.
- Kuric et al. (2023), decision 7: five-second tests depend on page complexity and viewers' cognitive ability; complex pages need longer before people can say what the page is for.

**Flags**
- **No source gives "0–3 seconds" for "Does this solve my problem?".**
  - The 50 ms studies measure visual appeal, not whether someone has understood the offer.
  - Nielsen's window is 10 seconds.
  - Present the time bands as a hypothesis the plan will test, for example with a five-second or first-click test, not as a research finding.
- **HEART was built for high-traffic products.**
  - A B2B site with few visitors won't produce stable per-section signals.
  - Tests with real prospects will carry more weight than analytics.
  - The Lyssna tests noted in `docs/todo.md` would be that evidence.

---

## Leads I dropped or couldn't verify

1. **"NN/g 2026 B2B trust signals study" (5–7 logos credible, 12+ a wall).** It appears only in 2026 marketing blogs. I found no such article on nngroup.com. Don't use it.
2. **Terho & Jalkala (2017) and Jalkala & Salminen (2009), *Industrial Marketing Management*.**
   - Both exist (DOIs 10.1016/j.indmarman.2017.01.005 and 10.1016/j.indmarman.2008.04.009), and both are B2B customer-reference research.
   - Every copy I tried was blocked, so I couldn't read either abstract.
   - They are about reference programs and reference pages in general, not logos under a hero. Use them only after reading them.
3. **Hunt (1995), "The subtlety of distinctiveness: What von Restorff really did"**, *Psychonomic Bulletin & Review* 2(1), 105–112, https://doi.org/10.3758/BF03214414. The DOI is verified, but Springer's cookie wall blocked the text. Not needed; Laws of UX already says the original finding was about memory.
4. **Gronier (2016), "Measuring the first impression: testing the validity of the 5 second test"**, *Journal of Usability Studies* 12(1). The PDF and landing pages wouldn't load. Kuric et al. (2023) covers the same ground.
5. **Two NN/g URLs often given by AI tools 404:**
   - `/articles/banner-blindness-revisited/`. The real one is `/articles/banner-blindness-old-and-new-findings/`.
   - `/articles/jakobs-law-internet-ux/`. Jakob's Law is a video at `/videos/jakobs-law-internet-ux/`; the article is `/articles/end-of-web-design/`.

---

## Summary table

| # | Decision | Best source | One-line support |
| --- | --- | --- | --- |
| 1 | Literal hero headline | Wang, NN/g, "Homepage Design: 5 Fundamental Principles" (2024), https://www.nngroup.com/articles/homepage-design-principles/ | The homepage tagline should say plainly what the company does; Morkes & Nielsen (1997) found objective copy beat promotional copy. |
| 2 | One primary CTA, sticky; Sign In as a text link | Farrell, NN/g, "Utility Navigation" (2015), https://www.nngroup.com/articles/utility-navigation/, with Wang (2024) guideline 4.2 | Sign in is a secondary utility that can be visually demoted if it stays top right, and top tasks need prominence without competition. |
| 3 | Chrome only on Book a Call | Von Restorff Effect, Laws of UX, https://lawsofux.com/von-restorff-effect/, with Gordon, NN/g, "Visual Hierarchy in UX" (2021) | The one item that differs stands out, but only if emphasis is used with restraint. Caution: banner blindness (Pernice 2018). |
| 4 | Real customer logos under the hero | Cardello, NN/g, "Social Proof in the User Experience" (2014), https://www.nngroup.com/articles/social-proof-ux/ | Showing that recognizable others use a product reduces decision uncertainty. Caution: company-hosted proof is read skeptically (Harley 2016). |
| 5 | FAQ answering objections before the ask | Farrell, NN/g, "FAQs Still Deliver Great Value" (2014), https://www.nngroup.com/articles/faqs-deliver-value/ | Prospects judge a vendor by whether its FAQs let them dismiss their concerns before spending money. Caution: no pricing answer. |
| 6 | Free tools as a try-first path | Nielsen, NN/g, "B2B Usability" (2006), https://www.nngroup.com/articles/b2b-usability/ | B2B buyers resist lead forms, and vendors must earn credibility before asking for contact. Foot-in-the-door is weak framing that can backfire. |
| 7 | Remove gradients, orbs, glass | Tuch et al. (2012), *IJHCS* (AR #1), https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/ | Simple, typical company sites got the best first impressions within 50 ms; heuristic #8 says extra visuals compete with what matters. |
| 8 | Copy in buyers' words | Nielsen, heuristic #2, NN/g, https://www.nngroup.com/articles/ten-usability-heuristics/ | Use users' own words, not internal jargon; question headlines aimed at the reader drew more readers (Lai & Farbrot 2014). |
| 9 | Design system with tokens and components | Krause, NN/g, "Consistency and Standards" (2021), https://www.nngroup.com/articles/consistency-and-standards/ | Consistency makes a site predictable and easier to learn, and a design system is how teams keep it. The evidence is about consistency, not conversion. |
| 10 | Light/dark toggle | Budiu, NN/g, "Dark Mode vs. Light Mode" (2020), https://www.nngroup.com/articles/dark-mode/ | Light is better as the default, but let users switch. Caution: few switch modes on rarely visited sites, so follow the OS setting. |
| 11 | Clear nav labels (Blog → Resources) | Laubheimer, NN/g, "Menu-Design Checklist" (2024), https://www.nngroup.com/articles/menu-design/ | Labels should describe their content. Caution: NN/g calls "Resources" generic and low-scent, so preview its subcategories (Whitenton 2014). |
| 12 | Section-by-question measurement plan | Rodden, Hutchinson & Fu, Google HEART / Goals–Signals–Metrics, CHI 2010, https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/ | Metrics only mean something when tied to a stated goal. Caution: no source backs "0–3 s"; Nielsen's window is 10 s. |
