# OrderSync redesign: research behind the audience decisions

Compiled 7 Oct 2026 for the OrderSync case study. Every source below was opened and checked. Where a page blocks scripts (Gartner, Taylor & Francis, TrustRadius), I read it in a real browser or through Gartner's own origin server and say so.

**Strength labels**
- **Peer-reviewed**: controlled study in a journal or conference
- **Large survey**: hundreds to thousands of respondents, published methods
- **Vendor survey**: a company surveying buyers about its own market
- **Expert guidance**: NN/g articles, analyst predictions, regulators

**A caveat that applies to everything here.** No study below sampled the actual OrderSync audience: ops managers, owners and procurement leads at food distributors, wholesalers and oil-and-gas suppliers. The lab studies mostly used students and the general public. The B2B surveys mostly used software and tech buyers. Use these sources as support for the design choices, not proof that they worked. Proof would be OrderSync's own numbers (demo bookings, bounce rate) or a five-second test with real prospects.

---

## Tier 1: Peer-reviewed studies

### 1. Tuch, Presslaber, Stöcklin, Opwis & Bargas-Avila (2012): simple and familiar company websites make the best first impression

- **Citation:** Tuch, A. N., Presslaber, E. E., Stöcklin, M., Opwis, K., & Bargas-Avila, J. A. (2012). The role of visual complexity and prototypicality regarding first impression of websites: Working towards understanding aesthetic judgments. *International Journal of Human-Computer Studies*, 70(11), 794–811. https://doi.org/10.1016/j.ijhcs.2012.06.003
- **URLs (both load):**
  - Google Research page: https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/
  - Free preprint PDF: https://research.google.com/pubs/archive/38315.pdf
  - Plain-language Google blog post (Bargas-Avila, 29 Aug 2012): https://www.research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/
- **Method:**
  - Stimuli were screenshots of real **company homepages**. They were the most-visited sites in chemicals, energy, accounting, aerospace and defense, automotive, biotech/pharma and financial services: B2B-heavy industries.
  - A pre-study of 267 people rated 270 sites on visual complexity ("VC") and prototypicality ("PT"). PT was rated on the statement "This website looks like a typical company website".
  - From those ratings the authors picked 120 sites, 20 in each of 6 VC × PT cells. The abstract says 119.
  - A separate check (n = 86) confirmed participants didn't know the sites or brands.
- **Participants and exposure times:**
  - Study 1: n = 59, mostly psychology undergraduates at the University of Basel (45 women; ages 18–62, mean 25.4). Screenshots shown for 50, 500 or 1000 ms, between subjects.
  - Study 2: n = 82 (ages 16–63, mean 27.3). Screenshots shown for 17, 33 or 50 ms.
  - Nobody in either study had design training.
- **Finding:**
  - Both factors affected beauty ratings within 50 ms, and even at 17 ms.
  - At the shortest exposures complexity mattered more than prototypicality. With longer viewing, prototypicality became as influential as complexity.
  - Both effects were very large: Study 1 partial η² was .58 for VC and .81 for PT; Study 2 was .52 and .55.
  - Low-complexity, high-prototypicality sites were rated most beautiful. High-complexity, low-prototypicality sites were rated worst.
  - Sites low in prototypicality were judged unattractive whether they were simple or complex.
- **Short quote (conclusion):** "Users prefer websites with low visual complexity and high prototypicality."
- **Supports:**
  - The conventional navy-and-white layout. It looks like what a business site is expected to look like.
  - Removing the gradients, glowing orbs and glassmorphism. That lowers visual complexity and moves the page back toward the prototype.
  - Dropping the "out there" directions. Atypical designs lost even when they were simple.
- **Strength:** Peer-reviewed, two controlled experiments, very large effects. This is the strongest single source for the case study.
- **Caveats:**
  - It measures **perceived beauty only**, not trust or conversion.
  - Participants were young Swiss students looking at screenshots, not buyers using a live site. The authors list "passive viewing", demographics and website type as limitations.
  - The study used 2010 company sites. What counts as "typical" changes over time.
  - **Fix to the brief:** 119 is the number of screenshots in the abstract, not participants. The participant counts are 59 and 82.

### 2. Lindgaard, Fernandes, Dudek & Brown (2006): visual appeal is judged in about 50 ms

- **Citation:** Lindgaard, G., Fernandes, G., Dudek, C., & Brown, J. (2006). Attention web designers: You have 50 milliseconds to make a good first impression! *Behaviour & Information Technology*, 25(2), 115–126. https://doi.org/10.1080/01449290500330448
- **URL:** https://www.tandfonline.com/doi/abs/10.1080/01449290500330448. It blocks scripts but loads in a normal browser; I read the abstract there.
- **Method and finding:** The paper has three studies.
  - Studies 1 and 2 showed homepages for 500 ms, twice.
  - Study 3 compared 500 ms with 50 ms.
  - Visual-appeal ratings correlated highly between viewings and between the 50 ms and 500 ms conditions. Tuch et al.'s review table reports r ≈ .97–.98.
  - Sample sizes, as listed in Tuch et al.'s table: 22 participants and 100 sites; 31 and 50; 40 and 50.
- **Short quote (abstract):** "visual appeal can be assessed within 50 ms".
- **Follow-up:** Lindgaard, Dudek, Sen, Sumegi & Noonan (2011), *ACM TOCHI* 18(1), https://doi.org/10.1145/1959022.1959023. It found that 50 ms judgments of trustworthiness and usability were also driven mostly by visual appeal. I checked the citation through Crossref; the ACM page blocks scripts.
- **Supports:** The look has to read as credible before anyone reads a word. That is the reason to lead with a calm, conventional page.
- **Strength:** Peer-reviewed and widely replicated, but the original samples are small.
- **Caveats:**
  - It measures how consistently people judge appeal. It doesn't say which designs win; Tuch answers that.
  - The "stable" result is a correlation of mean ratings across participants, not proof that each person's impression is fixed.
  - It is a 2006 consumer sample.

### 3. Reinecke et al. (2013): complexity drives first impressions, and people over 45 liked simpler pages more

- **Citation:** Reinecke, K., Yeh, T., Miratrix, L., Mardiko, R., Zhao, Y., Liu, J., & Gajos, K. Z. (2013). Predicting users' first impressions of website aesthetics with a quantification of perceived visual complexity and colorfulness. *Proc. CHI 2013*, 2049–2058. https://doi.org/10.1145/2470654.2481281
- **URL:** https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf (free PDF; loads)
- **Method:**
  - Online studies with 548 volunteers in total rated 450 websites.
  - The appeal study had 242 volunteers, ages 16–70, from 34 countries. Each screenshot was shown for 500 ms.
- **Finding:**
  - Appeal dropped sharply for highly complex sites, and slightly for sites that were *too* plain.
  - Colorfulness mattered much less than complexity.
  - Participants older than 45 liked low-complexity sites more than other age groups did.
  - Participants with a PhD were most put off by high colorfulness.
- **Supports:**
  - A clean, low-complexity page for an audience of owners and senior ops staff, who probably skew older.
  - The "slightly too plain" dip is a caution. Simple is not the same as empty.
- **Strength:** Peer-reviewed, but exploratory.
- **Caveats:**
  - Volunteers were recruited online, with small numbers per demographic group.
  - The age finding is one interaction effect, not a dedicated study.
  - The OrderSync audience's age is my assumption, not data.

### 4. Hekkert, Snelders & van Wieringen (2003): "Most advanced, yet acceptable"

- **Citation:** Hekkert, P., Snelders, D., & van Wieringen, P. C. W. (2003). 'Most advanced, yet acceptable': Typicality and novelty as joint predictors of aesthetic preference in industrial design. *British Journal of Psychology*, 94(1), 111–124. https://doi.org/10.1348/000712603762842147
- **URL:** DOI checked through Crossref. Study summary: https://www.jimdavies.org/summaries/HekkertSneldersVanwieringen2003.html
- **Finding:**
  - People preferred designs that were both typical and novel.
  - The two qualities pull against each other: novelty helped only while it didn't make the product atypical.
  - Tuch et al. (2012) cite this to explain why prototypicality matters.
- **Supports:** One distinctive element, the chrome "Book a Call" button, on an otherwise typical page. A little novelty adds interest without costing typicality.
- **Strength:** Peer-reviewed.
- **Caveats:**
  - The stimuli were physical products (sanders, phones, kettles, cars), not websites.
  - Participants were mostly Delft students.
  - Use it as a framing idea, not evidence about web pages.

### 5. Cicek, Gursoy & Lu (2024): the word "AI" in a product description lowered purchase intent

- **Citation:** Cicek, M., Gursoy, D., & Lu, L. (2024, online; 2025 print). Adverse impacts of revealing the presence of "Artificial Intelligence (AI)" technology in product and service descriptions on purchase intentions: The mediating role of emotional trust and the moderating role of perceived risk. *Journal of Hospitality Marketing & Management*, 34(1), 1–23. https://doi.org/10.1080/19368623.2024.2368040
- **URLs:**
  - Abstract: https://www.tandfonline.com/doi/full/10.1080/19368623.2024.2368040. It blocks scripts but I read it in a browser.
  - WSU press release (30 Jul 2024): https://news.wsu.edu/press-release/2024/07/30/using-the-term-artificial-intelligence-in-product-descriptions-reduces-purchase-intentions/
- **Method:** Six experiments. Per WSU, "more than 1,000 adults in the U.S." saw identical descriptions with or without the term "artificial intelligence". Products included TVs, cars, customer service and refrigerators.
- **Finding:**
  - Including "AI" lowered purchase intention.
  - Lower emotional trust explained the effect.
  - The effect was stronger for high-risk products. WSU's examples are expensive electronics, medical devices and financial services.
- **Lead author's advice (WSU release):** "Focus on describing the features or benefits and avoid the AI buzzwords."
- **Supports:** Leading with what OrderSync does (reads purchase orders and enters them into the ERP) rather than leading with "AI". An ERP integration is a high-risk purchase for a distributor.
- **Strength:** Peer-reviewed, six experiments.
- **Caveats:** US consumers, not business buyers. G2's 2025 survey (Tier 2) shows business buyers *do* want AI features. So the lesson is to describe the outcome, not to hide the AI.

### 6. Aesthetics and usability: the effect is real but one-directional

- **Kurosu & Kashimura (1995)**, "Apparent usability vs. inherent usability," *CHI '95 Conference Companion*, 292–293. https://doi.org/10.1145/223355.223680
  - Summarized by NN/g (Kate Moran, "The Aesthetic-Usability Effect," 3 Feb 2024): https://www.nngroup.com/articles/aesthetic-usability-effect/
  - 252 participants rated 26 ATM layouts. Perceived ease of use tracked visual appeal more closely than it tracked actual ease of use.
  - NN/g's own caution is that a pretty design earns forgiveness for minor usability problems only, not large ones.
- **Tuch, Roth, Hornbæk, Opwis & Bargas-Avila (2012)**, "Is beautiful really usable?" *Computers in Human Behavior*, 28(5), 1596–1607. https://doi.org/10.1016/j.chb.2012.03.024
  - Google blog summary (14 May 2012): https://www.research.google/blog/is-beautiful-usable-what-is-the-influence-of-beauty-and-usability-on-reactions-to-a-product/
  - 80 participants used one of four versions of an online clothing shop: high or low beauty × high or low usability.
  - **Beauty did not change perceived usability. Poor usability made people rate the shop as *less* beautiful afterwards**, through frustration.
- **Supports:** Polish alone won't carry a page that's hard to scan. Making the page direct and easy to scan is what protects the impression of quality.
- **Complicates:** Don't claim "looks better = works better" as settled. The best evidence says usability shapes perceived beauty at least as much as the other way round.
- **Strength:** Both are peer-reviewed. Kurosu & Kashimura is a two-page 1995 short paper with a Japanese sample. Tuch et al. is a stronger, controlled experiment.

### 7. Sillence, Briggs, Fishwick & Harris (2004): design gets a site rejected; content gets it trusted

- **Citation:** Sillence, E., Briggs, P., Fishwick, L., & Harris, P. (2004). Trust and mistrust of online health sites. *Proc. CHI 2004*, 663–670. https://doi.org/10.1145/985692.985776
- **URL:** https://hci.rwth-aachen.de/materials/conferences/CHI2004/1p663.pdf (loads)
- **Method:** 15 women facing a menopause treatment decision searched for health advice over four weeks.
- **Finding:**
  - Design comments made up 94% of the reasons given for quickly rejecting or mistrusting a site. Content made up 6%.
  - "Complex, busy layout" was one of the named rejection factors. So was "corporate look and feel".
  - Content factors dominated the reasons for *trusting* a site.
- **Supports:**
  - A busy layout gets a site dismissed before its content is read. That backs removing visual noise.
  - It also backs the staged view: the look clears the first filter, then direct content earns trust.
- **Complicates:** For this consumer audience, a "corporate look" counted *against* a site. "Conventional" has to mean conventional *for the audience*. OrderSync's business audience expects a business-like site, but that is the client's read plus Tuch's company-site data, not this study.
- **Strength:** Peer-reviewed but qualitative, with n = 15.
- **Misquote warning:** the "94% of first impressions are design-related" statistic often seen online comes from this table. It is 94% of *rejection comments* from 15 women on health sites, not first impressions in general. Don't use it.

### 8. Labrecque & Milne (2012), "Exciting red and competent blue": keep the color claim modest

- **Citation:** Labrecque, L. I., & Milne, G. R. (2012). Exciting red and competent blue: The importance of color in marketing. *Journal of the Academy of Marketing Science*, 40(5), 711–727. https://doi.org/10.1007/s11747-010-0245-y
- **URL:** https://link.springer.com/article/10.1007/s11747-010-0245-y (abstract loads; full text is paywalled)
- **What I could verify:**
  - Four studies. Study 1 maps hues onto Aaker's brand-personality dimensions. Study 2 tests saturation and value. Study 3 tests effects on brand personality and purchase intent. Study 4 tests likability and familiarity.
  - Participants rated **fictitious logos** in a between-subjects design. Each finding was replicated with a second logo.
  - The title reflects the headline result that blue mapped to competence and red to excitement. Secondary sources say blue was linked to competence traits such as reliable, secure, intelligent and corporate.
  - I could **not** verify sample sizes or effect sizes. The paper and the author's 2010 UMass dissertation are both behind access controls.
- **How strong is color psychology?** Elliot (2015), "Color and psychological functioning: a review of theoretical and empirical work," *Frontiers in Psychology*, 6, 368. https://doi.org/10.3389/fpsyg.2015.00368 (open access; loads)
  - Elliot calls the field "at a nascent stage of development".
  - He describes the empirical work as fraught with methodological problems: underpowered samples, no experimenter blinding, poorly specified colors.
  - He warns that underpowered studies overestimate effects.
- **Supports (weakly):** Navy reads as competent and dependable. That matches common association, and this paper is the most-cited source for it.
- **Strength:** Peer-reviewed, but consumer samples rating made-up brand logos. Effects of a single hue are context-dependent and the wider literature is shaky.
- **Recommendation:** Don't make navy a research-backed decision in the case study. If anything, say the brief already pointed to navy and white (the client's "nothing fancy"). Navy is also a conventional business color, which loops back to Tuch's prototypicality. If you cite Labrecque & Milne, hedge it in one clause.

---

## Tier 2: Large surveys and field studies

### 9. Fogg et al., Stanford Persuasive Technology Lab (2002/2003): "design look" was the most-mentioned credibility cue, but experts cared about content

- **Citation (paper):** Fogg, B. J., Soohoo, C., Danielson, D. R., Marable, L., Stanford, J., & Tauber, E. R. (2003). How do users evaluate the credibility of Web sites? A study with over 2,500 participants. *Proc. DUX 2003*. https://doi.org/10.1145/997078.997097
- **URLs (both load):**
  - Summary: https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility
  - Full 2002 report PDF: https://advocacy.consumerreports.org/wp-content/uploads/2013/05/stanfordPTL.pdf
- **Method:**
  - 2,684 people each compared two live sites in one of 10 categories: e-commerce, entertainment, finance, health, news, nonprofit, opinion/review, search engines, sports, travel. Then they wrote comments.
  - Participants were recruited through 10 nonprofits, with a $5 donation per completion. Average age 39.9.
- **Finding:**
  - "Design look" appeared in **46.1% of comments**, more than any other category. Information structure and information focus came next.
  - Design-look comments were most frequent for finance sites (54.6%), then search engines (52.6%), travel (50.5%) and e-commerce (46.2%).
- **Short quote (summary page):** the "design look" was "mentioned most frequently, being present in 46.1 percent of the comments".
- **Companion study (complicates):** Stanford, J., Tauber, E. R., Fogg, B. J., & Marable, L. (2002). *Experts vs. Online Consumers: A Comparative Credibility Study of Health and Finance Web Sites.* Consumer WebWatch. https://advocacy.consumerreports.org/wp-content/uploads/2013/05/expert-vs-online-consumers.pdf (loads)
  - 15 experts (8 health, 7 finance) rated the same sites.
  - 54.6% of consumer comments on finance sites were about design look, against **16.4%** of finance-expert comments.
  - Finance experts relied most on the scope and focus of the information (40.3%), then company motive (35.8%) and information bias (29.9%).
- **Supports:**
  - A clean, professional look is the first credibility filter for most people. That backs removing the decorative effects.
  - The expert data supports making the page **direct and specific**. OrderSync's buyers are experts in their own operations; they will judge substance once the page has passed the first look.
- **Strength:** Large field study (2,684), but not peer-reviewed in a journal. DUX is a conference.
- **Caveats:**
  - Consumers, recruited through charities; the authors say it isn't a representative sample.
  - The data is from 2002.
  - The 46.1% is a share of **comments**, not people. The report's executive summary says "nearly half of all consumers", which is looser. Cite it as comments.
  - The expert panel is only 15 people.

### 10. CEB (now Gartner) with Google and Motista, "From Promotion to Emotion" (2013): B2B buyers carry personal risk

- **Citation:** CEB Marketing Leadership Council, in partnership with Google and Motista (2013). *From Promotion to Emotion: Connecting B2B Customers to Brands.* The Corporate Executive Board Company.
- **URLs:**
  - Full whitepaper PDF on a third-party mirror (loads): https://betaisthenewnormal.com/wp-content/uploads/2018/09/CEB_Google_promotion-emotion-whitepaper-full_beta_2018.pdf
  - **The original Think with Google page no longer exists.** thinkwithgoogle.com/…/promotion-emotion-b2b/ now redirects to business.google.com/us/think/. Cite the report, not that URL.
- **Method:** Survey of **3,000 B2B buyers across 36 brands and 7 categories**, plus interviews with 50 B2B marketing organizations.
- **Finding:**
  - B2B purchase stakeholders fear three personal risks: losing time and effort if the purchase goes poorly, losing **credibility** if they recommended it, and losing their **job** if they were responsible for a failed purchase.
  - The more personal risks a purchase carries, the more buyers attach to brands that "can provide value and eliminate risk".
  - Across commercial outcomes, personal value had about twice the impact of business value (a 42.6% vs 21.4% increase).
  - Only about 14% of buyers saw enough difference between brands' business value to pay extra for it.
- **Supports:**
  - A design that reads as safe, established and low-risk. This audience has been burned by legacy vendors on billing and implementation time, and a flashy site would add perceived risk.
  - Copy that speaks to the buyer's personal stakes: time saved, no surprises, an easy implementation.
- **Strength:** Large survey (n = 3,000), but a vendor-produced marketing study with proprietary methods (Motista's "emotional connection" scoring).
- **Caveats:**
  - Published in 2013.
  - The sample is large-enterprise B2B brands, not small distributors.
  - The often-repeated B2B-vs-B2C "emotional connection" percentages are only in a chart I couldn't read as text. **Don't quote a specific B2B-vs-B2C number.**
  - Note the tension: the report argues for *more* emotional messaging. The emotional lever it describes is reassurance about personal risk, not visual excitement.

### 11. Gartner on B2B buying: self-directed, overloaded, risk-averse

**a. 61% of B2B buyers prefer a rep-free buying experience (press release, 25 Jun 2025)**
- **URL:** https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience. It blocks scripts; I confirmed it loads in a browser and read the full text through Gartner's origin server.
- **Method:** Survey of **632 B2B buyers**, August–September 2024.
- **Finding:**
  - 61% prefer an overall rep-free buying experience.
  - 73% actively avoid suppliers who send irrelevant outreach.
  - 69% report inconsistencies between a supplier's website and what its sellers say.
  - **But** for tasks like judging whether a product fits their company's needs, buyers prefer seller input.
- **Supports:**
  - A page that answers the basic questions on its own (what it does, who it's for, how it works) and is easy to scan.
  - One clear "Book a Call" for the moment that needs a human: "will this work with our ERP and our orders?"
- **Strength:** Large survey, from an analyst firm.
- **Caveats:** The press release doesn't give industry or company-size breakdowns. Gartner sells sales advisory services built on this framing.

**b. Buyers spend only about 17% of their buying time meeting suppliers**
- **URL:** Gartner's "New B2B Buying Journey" page no longer exists; it now redirects. Archived copy (loads): https://web.archive.org/web/20230601194233/https://www.gartner.com/en/sales/insights/b2b-buying-journey
- **Finding:**
  - The archived page says that when B2B buyers are considering a purchase, they spend only 17% of that time meeting potential suppliers. With several suppliers in play, any one rep may get 5–6%.
  - The typical buying group for a complex solution involves 6–10 decision makers.
- **Caveat:** The widely quoted "27% researching independently online" figure is only in an infographic on that page. I couldn't confirm it as text, so I'd use 17% only. The page gives no sample size or date.

**c. Less information, designed to make buying easier (press release, 10 Oct 2018)**
- **URL:** https://www.gartner.com/en/newsroom/press-releases/2018-10-10-gartner-says-b2b-brands-need-to-rethink-their-content-marketing-strategy (read in a browser)
- **Finding:**
  - The most successful marketers focus "on providing less information, specifically designed to make buying easier."
  - Gartner's Brent Adamson: customers who receive helpful information that eases the purchase are "three times as likely to buy the bigger, more expensive option, with less regret."
- **Companion (17 Sep 2019):** https://www.gartner.com/en/newsroom/press-releases/2019-09-17-gartner-says-the-biggest-challenge-in-b2b-sales-today
  - Customers who are confident in the information they find, and who feel little skepticism toward sales claims, make bigger purchase decisions.
  - 89% of customers report encountering high-quality information, and the overload makes them settle for smaller decisions.
- **Supports:** A page that is direct and easy to scan, rather than one that piles on claims.
- **Strength:** Analyst research summarized in press releases. Methods and sample sizes are not given in the release.

### 12. Nielsen Norman Group, B2B website usability (2006 study; report now in its 3rd edition)

- **Citation:** Nielsen, J. (31 May 2006). B2B Usability. Nielsen Norman Group. https://www.nngroup.com/articles/b2b-usability/ (loads)
  - Current report page: https://www.nngroup.com/reports/b2b-websites-usability/ (3rd edition, 188 guidelines, paid)
- **Method:**
  - 79 participants: VPs, business owners, engineers, buyers and admins, mostly aged 30–59, from companies of 1–35 up to 3,500+ employees.
  - 12 focus groups, 55 one-on-one usability sessions, site visits at 7 companies. 179 B2B sites tested.
- **Finding:**
  - Users completed tasks 58% of the time on B2B sites, against 66% on mainstream sites.
  - Users ranked **pricing** the most important of 28 information types, scoring it 29% higher than product availability, which came second.
  - Incomplete product descriptions caused "much skepticism".
  - Even specialist audiences can't be assumed to know industry jargon.
- **Short quote:** "The most user-hostile element of most B2B sites is a complete lack of pricing information."
- **Supports:** Direct, plain content that answers business questions quickly.
- **Complicates (a possible gap):** The research is consistent that business buyers want pricing up front. TrustRadius 2026 (below) also has transparent pricing as buyers' #1 wish, four years running. If the OrderSync page hides pricing behind "Book a Call", the case study should say why: the client's choice, quote-based pricing, or something else.
- **Strength:** Qualitative and observational, but with real business users. It's from 2006.

### 13. G2 2025 Buyer Behavior Report: business buyers want AI, but want it proven

- **URL:** https://company.g2.com/news/buyer-behavior-in-2025 (loads)
- **Method:** Online survey of **1,169 B2B decision-makers** in North America, EMEA and APAC, April 2025.
- **Finding:**
  - More than two-thirds of respondents, and 88% of self-described "power users", said they'd pay a premium for AI functionality.
  - Four in five reported positive returns on AI software.
  - About 8 in 10 face stricter IT, security, legal and compliance reviews for AI software.
  - Nearly two in three prefer engaging salespeople only later in the journey.
- **Complicates:** Business buyers are not anti-AI. The skepticism is about **unproven** AI. Don't frame the audience as hating AI; frame them as wary of hype.
- **Strength:** Vendor survey. G2 sells software reviews.
- **Caveats:** Software buyers, likely tech-forward. That is different from food-distribution ops managers.

### 14. TrustRadius 2026 B2B Buying Disconnect: vendor marketing ranks last; buyers pick safe, established products

- **URL:** https://www.trustradius.com/blog/beyond-the-hype (Katie Allison, 15 Jul 2026). It blocks scripts; I read it in a browser.
- **Method:** Online survey, January 2026: **1,862 technology buyers** and 444 vendors, with a $10 gift card.
- **Finding:**
  - Of the resources buyers consulted, **vendor marketing collateral ranked last**.
  - The most influential resources were free trials, demos, prior experience, user reviews and peers.
  - 47% trust online resources less than they used to; only 11% trust them more.
  - 66% bought an established, leading product and 21% a niche product for their segment.
  - "Picking the safest option" rose slightly as a reason to buy. The report gives no exact percentage in the text.
  - Transparent pricing was the #1 thing buyers wished vendors would change, for the fourth year running.
  - 75% of buyers who bought an AI tool said it met expectations. VPs were less satisfied than individual contributors (59% vs 81%).
- **Supports:**
  - Not leaning on marketing polish.
  - A page that looks established and safe, since most buyers buy the safe option.
- **Strength:** Vendor survey. TrustRadius sells reviews.
- **Caveats:** Tech buyers, mostly Millennial and Gen Z, by the report's own account.

---

## Tier 3: Expert guidance, analyst opinion and regulatory signals

### 15. Jakob's Law (NN/g)

- **Citation:** Nielsen, J. (22 Jul 2000). End of Web Design. Nielsen Norman Group. https://www.nngroup.com/articles/end-of-web-design/ (loads). Also as a 2-minute video (18 Aug 2017): https://www.nngroup.com/videos/jakobs-law-internet-ux/
- **Statement (verbatim):** "Users spend most of their time on other sites."
- **Explanation:** The article goes on to say that users therefore prefer your site to work the same way as all the other sites they already know.
- **Supporting data point:** Whitenton, K. (10 Jul 2016). Centered Logos Hurt Website Navigation. https://www.nngroup.com/articles/centered-logos/ (loads)
  - 50 users on 14 fashion-retail sites.
  - Users were 6 times as likely to fail to get home in one click when the logo was centered rather than top-left.
- **Supports:** The conventional layout: top-left logo, standard nav, expected section order. Familiar patterns cost users nothing to learn.
- **Strength:** The law itself is expert guidance, a principle rather than a study. The centered-logo test is a small quantitative study with consumers.

### 16. NN/g on trust signals and glassmorphism

- **Harley, A. (8 May 2016). Trustworthiness in Web Design: 4 Credibility Factors.** https://www.nngroup.com/articles/trustworthy-design/ (loads)
  - Design quality is the first of four factors. NN/g says the site must be well organized and use an appropriate color scheme and imagery.
  - Typos and broken links "quickly degrade credibility".
  - Upfront disclosure, such as pricing, is another factor.
  - Based on a small qualitative usability study in Singapore, with consumers comparing services.
  - Expert guidance plus qualitative research.
- **Brown, M. (7 Jun 2024). Glassmorphism: Definition and Best Practices.** https://www.nngroup.com/articles/glassmorphism/ (loads)
  - Overused glassmorphism causes readability problems: text too light or dark, backgrounds too busy.
  - NN/g recommends using it sparingly.
  - Supports removing the glass effects. Expert guidance, not a study.

### 17. "AI washing" is a recognized problem

- **Gartner (25 Jun 2025)**, "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027." https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (read through Gartner's origin server)
  - Names "agent washing": rebranding assistants, RPA and chatbots as agentic AI.
  - Estimates **only about 130 of the thousands of agentic AI vendors are real**.
  - A January 2025 poll of 3,412 webinar attendees found 19% had made significant agentic-AI investments and 42% conservative ones.
- **Gartner (1 Oct 2026)**, "The Latest Gartner Hype Cycle for Artificial Intelligence Puts Control Ahead of Capability." https://www.gartner.com/en/articles/hype-cycle-for-artificial-intelligence
  - Concerns about GenAI have shifted from model capability "to application reliability and return on investment."
- **U.S. SEC (18 Mar 2024)**, press release 2024-36. https://www.sec.gov/newsroom/press-releases/2024-36 (loads)
  - First enforcement actions for "AI washing": two investment advisers, $400,000 in penalties in total.
  - Chair Gensler: "Such AI washing hurts investors."
- **Supports:** The context for a buyer who has heard AI promises before. Leading with a concrete job (reads POs, enters orders into your ERP) is the antidote to vague "AI-powered" claims.
- **Strength:**
  - The Gartner pieces are analyst opinion and estimates, not buyer surveys.
  - The SEC actions are regulatory fact, but about financial advisers, not software vendors.
  - None of these directly measures distributors' skepticism. The client's own read of the audience is the primary evidence there.

---

## Leads that didn't hold up, or that I'd drop

1. **"Tuch et al. had 119 participants."** Wrong. 119 is the number of screenshots in the abstract; 120 were used. Participants were 59 (Study 1) and 82 (Study 2). The Google Research page summary that some sites repeat mixes this up.
2. **"46.1% of people judge credibility by design" (Fogg).** Say "46.1% of comments". Also pair it with the expert finding (16.4% for finance experts) so the claim isn't overstated.
3. **Labrecque & Milne as proof that navy builds trust.** Not supportable as stated. The paper is about brand-personality ratings of made-up logos by consumers, the full text is paywalled, and color psychology is a weak field (Elliot 2015). Keep it to a hedged clause, or leave it out.
4. **Think with Google URL for "From Promotion to Emotion."** Dead; it now redirects to business.google.com. Cite the CEB report by name. A specific "B2B buyers are X% more emotionally connected than B2C" number couldn't be verified as text; don't use one.
5. **"B2B buyers choose the safe option."** It's directionally supported:
   - CEB 2013 on personal risk.
   - TrustRadius 2026: "safest option" rising, and 87% buying a leader or niche specialist.
   - Neither gives a clean, citable percentage for "chose the safe option".
   - The often-cited HBR piece (Schmidt, Adamson & Bird, "Making the Consensus Sale," *HBR*, March 2015): purchase likelihood falls from 81% with one decision-maker to 31% with six or more, and groups settle on the lowest common denominator. It is paywalled, and I could only see it quoted secondhand. **Not verified at source; don't cite numbers from it.**
6. **"27% of B2B buying time is independent online research" (Gartner).** Only in an image on an archived page. Use the 17% figure, which is in the text.
7. **"94% of first impressions are design-related."** A misquote of Sillence et al. (2004): 15 women, health sites, rejection comments. Drop it.
8. **Forrester's "19% of business buyers were less confident because AI produced inaccurate results" (Buyers' Journey Survey 2025).** I only found it through Digital Commerce 360 (28 Oct 2025). It concerns AI tools buyers used for research, not vendors' AI claims, so it doesn't back the AI-washing point. Drop it.

---

## The 4 to 6 findings I'd actually put in the case study

1. **Simple, typical company sites win the first impression.** Tuch et al. (2012), *IJHCS*. Lab participants rated real company homepages, many from B2B industries, most beautiful when they were low in visual complexity and looked like a typical company site, and the effect showed up within 17–50 ms. https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/
   - *Backs:* removing the gradients, orbs and glass, and choosing a conventional layout over the "out there" directions. Both lower complexity and raise typicality, the two things that predicted a good first impression.

2. **Most people judge credibility by the look first; experts judge by the substance.** Fogg et al. (2002), Stanford, 2,684 people: "design look" was the most common credibility cue, in 46.1% of comments. In the companion study, finance experts mentioned it in only 16.4% of comments and focused on the information itself. https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility
   - *Backs:* a clean, professional look to pass the first filter, then direct, specific content for buyers who know their own operations.

3. **B2B buyers carry personal risk.** CEB with Google and Motista (2013), 3,000 B2B buyers: buyers fear losing time, credibility and even their job over a bad purchase, and attach to brands that reduce that risk. https://betaisthenewnormal.com/wp-content/uploads/2018/09/CEB_Google_promotion-emotion-whitepaper-full_beta_2018.pdf
   - *Backs:* a calm, conventional design that reads as safe and established, for an audience already burned by a legacy vendor.

4. **Buyers research alone and want less, clearer information, then a person for the fit question.** Gartner (2025), 632 B2B buyers: 61% prefer a rep-free buying experience, but want seller input to judge whether a product fits their needs. Gartner (2018): buyers who get helpful information that eases the purchase are three times as likely to buy the bigger option with less regret. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience
   - *Backs:* a direct, easy-to-scan page that answers questions on its own, with one "Book a Call" as the single accent for the moment a human is needed.

5. **Saying "AI" can lower trust, especially on risky purchases.** Cicek, Gursoy & Lu (2024), six experiments with more than 1,000 US adults: adding "artificial intelligence" to a product description lowered purchase intent through lower emotional trust, more so for high-risk products. https://www.tandfonline.com/doi/full/10.1080/19368623.2024.2368040
   - *Backs:* describing what OrderSync does (reads purchase orders, enters them into the ERP) instead of selling "AI". Caveat to state: it's a consumer study, and G2 2025 shows business buyers do want AI when it's proven.

*Optional sixth, for the chrome button:* Hekkert et al. (2003), "Most advanced, yet acceptable" (https://doi.org/10.1348/000712603762842147). People prefer designs that are typical with a touch of novelty, so long as the novelty doesn't make the design atypical. The study used physical products, not websites, so present it as framing.
