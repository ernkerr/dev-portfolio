# OrderSync business cards: the research behind each choice

Compiled 8 Oct 2026 for the business-card part of the OrderSync case study. It's a companion to `may-decisions-research.md` (MD) and `audience-research.md` (AR). I opened every URL below on 8 Oct 2026. Where a publisher blocked the page, I say where I read the abstract instead (OpenAlex, PubMed, IDEAS/RePEc, the CTAN bibliography). The DOI links resolve, but they land on paywalled publisher pages.

**How to read this**
- Strength labels match AR and MD: **Peer-reviewed**, **Large survey**, **Vendor survey**, **Expert guidance** (NN/g), **Principle**. I've added **Regulatory**, **Government study** and **Classic book**.
- Almost nothing studies business cards directly. The evidence comes from print ads, web pages, lab legibility tests and QR-code survey research, and most of the samples are consumers or students. These sources support the decisions. They don't prove the card works.
- Quotes are exact. Everything else is a close paraphrase.

**What I measured on the card**
These come from Erin's exports in `public/images/orderSync/cards/` (`final-front`, `final-back`, both 1050 × 600 px, read as a 3.5 × 2 in card at 300 dpi). Check them against the print file.

| Element | Size on the card | Approx. type size |
| --- | --- | --- |
| Name (serif, navy side) | cap height ≈ 5.3 mm | ≈ 22 pt |
| "Founder" (serif) | cap height ≈ 2.1 mm | ≈ 9 pt |
| Website (serif) | x-height ≈ 1.4 mm | ≈ 8–9 pt |
| BOOK NOW (sans caps, rotated 90°) | cap height ≈ 2.4 mm | ≈ 10 pt |
| QR code | ≈ 13 × 13 mm | n/a |
| Chrome cursor | ≈ 8 × 10 mm | n/a |

- **Color.** The back's text in the export is near-white (`#F8FCFF`) on navy (`#0F172B`), about **17:1**. It isn't light gray. The front is dark type on `#EFEFEF`, about 16–18:1.
- **The QR code looks inverted** (light modules on navy) in the export. It's blurred, so this is an inference: the blurred blocks are darker at the edges than in the middle, which fits a navy quiet zone. A dark-on-white code would be lightest at the edges. Check the print file.

---

## 1. Carrying the website's colors and style onto the card

**Best sources**

1. **"Consistency in the Omnichannel Experience"**, Kim Flaherty, Nielsen Norman Group, 16 Oct 2016. https://www.nngroup.com/articles/omnichannel-consistency/ (loads)
   - *Finding:* Visual design is one of 3 areas where consistency matters across channels.
     - "A consistent visual story across each channel can go a long way toward making an organization appear buttoned up, unified, and fully integrated to their customers."
     - "Users crave consistency and companies that can provide consistent experiences across channels will quickly earn users' trust and build credibility."
   - Its good example, Nespresso, carries the same look through to the physical package at the door. Its bad example, Marriott, warns that visual inconsistency "might signal different functionality, flows, or offerings" and can "reflect poorly on the brand".
   - *Supports:* The card and the booking page it links to should look like one company, so the jump from paper to site feels continuous.
   - *Strength:* Expert guidance. It rests on NN/g's omnichannel user research, but the article reports no numbers.
2. **Lee & Labroo (2004)**, "The Effect of Conceptual and Perceptual Fluency on Brand Evaluation", *Journal of Marketing Research* 41(2), 151–165. https://doi.org/10.1509/jmkr.41.2.151.28665 (abstract read on OpenAlex)
   - *Finding:* "advertising exposures enhance the ease with which consumers recognize and process a brand. In turn, this increased perceptual fluency leads to consumers having more favorable attitudes toward the brand." Three experiments.
   - *Supports:* This is the mechanism. If the card looks like the site, each one counts as an earlier exposure to the other.
   - *Strength:* Peer-reviewed lab experiments. The studies are about ad exposures, not cards. Treating a look-alike in another medium as a repeat exposure is my inference.

**Also useful**
- Edell & Keller (1989), "The Information Processing of Coordinated Media Campaigns", *JMR* 26(2), 149–163, https://doi.org/10.1177/002224378902600202 (abstract on OpenAlex). When people heard a radio ad that reused a TV ad's audio, they "appeared to replay mentally the video from the television ad". Brand judgments were as positive as seeing the TV ad again. Different media, and old, but it's the classic evidence that a coordinated cue in one medium brings back the other.

**Flags**
- **The card carries the site's colors and chrome rule, not its type.** The site's headings are Satoshi with Inter for text (`ordersync-static`: `tailwind.config.ts`, and `DESIGN-SYSTEM.md`, "clean navy + white, Satoshi headings"). The card uses a typewriter face and a serif. In the case study, say "the same colors and the same chrome rule", or explain why the card has its own type.
- **The call-to-action wording differs.** The site's button is "Book a Call". The card says "BOOK NOW" (see decision 2).
- **NN/g's own caveat:** "it's vital for organizations to understand when it's okay to compromise consistency in order to provide an appropriately optimized experience on each channel." Print and phone cameras have needs the site doesn't, such as a dark-on-light QR code and larger reversed type (decisions 2 and 6).
- **Don't call navy a trust color.** Labrecque & Milne (2012), "Exciting red and competent blue", is the usual citation. AR #8 already rates it weak: consumers rated made-up logos, and color psychology is a shaky field.

---

## 2. A labeled QR code (BOOK NOW) as the card's one call to action

**Best sources**

1. **"13 QR-Code Usability Guidelines"**, Tanner Kohler, NN/g, 9 Feb 2024. https://www.nngroup.com/articles/qr-code-guidelines/ (loads)
   - *Guideline 1, Tell users what a QR code does:*
     - "QR codes have no information scent by themselves. They tell users nothing about where they lead or what will happen when they are scanned. … Without contextual information, QR codes are not trustworthy or enticing."
     - "Information telling users what will happen if they scan the code should be as clear and visually prominent as the code itself."
     - Show the URL next to the code if people should remember the site or might use a laptop without a camera.
   - *Guideline 4:* deep-link to the page the code promises, not a generic homepage.
   - *Supports:* A visible label and a code that opens the booking page directly. Printing www.ordersync.io nearby also helps.
   - *Strength:* Expert guidance. NN/g gives no method for these guidelines.
2. **Hupp, Schroeder, West, Leissou & Weir (2025)**, "Who chooses a QR code over a URL to access a web screener in a national probability survey of older adults, and the impact on data quality", *Survey Methods: Insights from the Field*, https://doi.org/10.13094/SMIF-2025-00003. Page: https://surveyinsights.org/?p=20208 (loads)
   - *Method:* The 2022 recruitment mailing for the Health and Retirement Study, a national probability sample. Every letter carried both a QR code and a URL.
   - *Finding:*
     - Of 1,468 households who completed the screener online, 917 (62%) used the QR code and 551 (38%) the URL.
     - URL users were older: 46% were 57 or over, against 21% of QR users.
     - Their literature review: studies found "significantly more web completes" when a letter carried both a URL and a QR code (Marlar & Schreiner 2024), and a QR code on its own "could be detrimental".
   - *Supports:* Most people will scan, but keep a typed address next to the code for older buyers. Many owners and ops managers at distributors are in that older group.
   - *Strength:* Peer-reviewed, open access, large probability sample. Caveats:
     - It's about survey letters, not sales.
     - The "both beats one" result comes from the studies they cite, not their own data.

**Also useful**
- **Rivas, Peterson, Schulzetenberg & Wang (2024)**, U.S. Census Bureau Research Report RSM2024-05. https://www.census.gov/library/working-papers/2024/adrm/rsm2024-05.html; PDF https://www2.census.gov/library/working-papers/2024/adrm/cbsm/rsm2024-05.pdf (both load; read in full)
  - *Method:* 20 iPhone users, ages 18–66 (mean 29.9), tested in 2022.
  - *Finding:* All 20 scanned the code successfully, in 12.4 seconds on average, and all rated it "extremely easy".
  - *Caveats:* Every participant was already experienced with QR codes. They worried that "older people" and "non-tech-savvy people" would struggle, and suggested labeling the code "QR code".
  - *Strength:* Government study, small and young.
- **YouGov (28 Jun 2021)**, "Are QR codes leaving older Americans behind?" https://business.yougov.com/content/36657-qr-codes-leaving-older-americans-behind (loads)
  - *Method:* 1,200 US adults online, weighted to be nationally representative.
  - *Finding:* Share who had clicked on a marketing-related QR code, by age: 54% (18–29), 48% (30–44), **44% (45–64)**, 31% (65+). The article gives no time window for this figure.
  - 14% find QR codes difficult to use, rising to 20% of people 65 and over.
  - *Strength:* Large survey, consumers, from 2021.
- **FTC consumer alert**, Alvaro Puig, "Scammers hide harmful links in QR codes to steal your information", 6 Dec 2023. https://consumer.ftc.gov/consumer-alerts/2023/12/scammers-hide-harmful-links-qr-codes-steal-your-information (loads)
  - It tells people to check the URL before opening it, and: "Don't scan a QR code in an email or text message you weren't expecting — especially if it urges you to act immediately."
  - A card James hands over in person is the trusted case, but a visible, recognizable domain still helps.
- **Huei-Hsin Wang, "Homepage Design: 5 Fundamental Principles", NN/g, 15 Mar 2024**, guideline 4.2. https://www.nngroup.com/articles/homepage-design-principles/ (loads)
  - "Avoid visual competition among your homepage elements — if everything is emphasized, nothing stands out."
  - This backs having one call to action on the card, as on the site.

**Flags**
- **"BOOK NOW" names the action but not what gets booked.**
  - NN/g asks the label to say what happens when you scan.
  - The site's button says "Book a Call".
  - "BOOK A CALL" would be more specific and would match the site (decision 1). This is a suggestion, not a fix the research demands.
- **The code is probably too small.**
  - At about 13 mm, it's above the official 1 cm minimum but below NN/g's "Aim for a minimum size of 2 cm x 2 cm (0.8 inches x 0.8 inches) for best results."
  - NN/g's rule of thumb is 1 cm of code per 10 cm of scanning distance. A card is scanned from close up, so 13 mm can work.
  - Test it with a few phones in dim light, and keep the encoded URL short so the code has fewer modules.
- **It may be inverted.** NN/g guideline 6, "Do Not Invert QR-Code Colors": "Most cameras on updated phones and tablets can scan QR codes with inverted colors, but not all scanning technology … can do so."
  - Phones are mostly fine.
  - The safe version is dark modules on a light tile with a quiet zone.
- **Corner placement (minor).** NN/g guideline 12 warns against putting a code "off to the side or down in the corner". On a card that fits in one glance, this matters little.
- **The rotated label (minor).** Yu, Park, Gerold & Legge (2010), *Journal of Vision* 10(2):21, https://pmc.ncbi.nlm.nih.gov/articles/PMC2921212/ (loads): horizontal text was read 81% faster than text rotated 90°. That was measured on continuous reading, so for two words the cost is small.
- **Vendor number to avoid.** Adobe Express (2025), https://www.adobe.com/express/learn/blog/business-card-design-tips (loads), says a QR code "could increase the likelihood of being contacted by 69%".
  - That figure comes from reactions to mockups in a SurveyMonkey survey of 790 consumers and 210 business owners.
  - Adobe sells card design, so this is a vendor survey of stated intent. Don't cite the 69%.
- **Not verified.** eMarketer's forecasts (about 99.5 million US smartphone QR scanners by 2025) are widely repeated, but every eMarketer page returned 403.
- **Older evidence cuts the other way.** Before the pandemic, QR use was low. The Census paper cites Marlar (2018): only 4% of respondents chose the QR code, using 2017 data. Use post-2020 figures.

---

## 3. Chrome on one small element only

**Best sources**

1. **Von Restorff Effect**, Laws of UX (Jon Yablonski). https://lawsofux.com/von-restorff-effect/ (loads)
   - *Finding:* "when multiple similar objects are present, the one that differs from the rest is most likely to be remembered."
   - Takeaway: "Use restraint when placing emphasis on visual elements to avoid them competing with one another."
   - It comes from Hedwig von Restorff's 1933 study of memory for word lists.
   - *Strength:* Principle.
2. **Wolfe & Horowitz (2017)**, "Five factors that guide attention in visual search", *Nature Human Behaviour* 1, 0058. https://pmc.ncbi.nlm.nih.gov/articles/PMC9879335/ (loads)
   - *Finding:* An item with a unique basic feature, such as color, "pops out". But it only pops out if it differs from its neighbors. Their example is a purple item that is "not particularly salient even though it is the only other item in that shade of purple; its neighbors are close enough in color that the differences in color do not attract attention."
   - They also note: "Elements like arrows direct attention even if they, themselves do not pop-out."
   - *Supports:* One metallic object on flat navy and white is a unique feature. Add more chrome and each piece pulls less attention.
   - *Strength:* Peer-reviewed review of lab visual-search research.

**Also useful**
- Kelley Gordon, "Visual Hierarchy in UX: Definition", NN/g, 17 Jan 2021, https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ (loads): "If everything is contrasted, then nothing stands out."
- OrderSync's own design-system sheet (18 May 2026), as quoted in the case study: "Chrome is an accent, not a personality. … Never for backgrounds or large surfaces." The card follows the site's rule (decision 1). This is internal, not research.
- Hommel, Pratt, Colzato & Godijn (2001), "Symbolic Control of Visual Attention", *Psychological Science* 12(5), 360–365. https://doi.org/10.1111/1467-9280.00367 (abstract read on OpenAlex; open copy listed at https://research.vu.nl/en/publications/f8a44bfe-68a2-4913-bfc8-40e8df9baef2, loads). Arrows and direction words shifted attention even when they were irrelevant to the task.

**Flags**
- **The thing that stands out is a decoration.**
  - Isolation makes the odd item the one people notice and remember. Here that's the cursor, not the name or the QR code.
  - NN/g's hierarchy advice is to emphasize the most important element.
  - That's fine if the goal is a memorable mark. Just don't claim the chrome draws people to the call to action.
- **The cursor points off the card.**
  - It points up and slightly right, toward the top-right corner. Arrows steer attention the way they point (Hommel 2001; Wolfe & Horowitz 2017).
  - Pointed toward the name or the QR code, it would do some work.
  - This is design judgment drawn from lab findings, not a finding about cards.
- **Von Restorff measured memory for list items.** Applying it to a card is an analogy. MD #3 gives the same caveat.

---

## 4. Typeface personality: a typewriter face on one side, a serif on the other

**Best sources**

1. **Brumberger (2003)**, "The Rhetoric of Typography: The Persona of Typeface and Text", *Technical Communication* 50(2), 206–223. The publisher page (Ingenta) returned 403. I read the abstract in the CTAN typography bibliography: https://mirrors.mit.edu/CTAN/bibliography/bibtex/contrib/bestpapers/typography.bib (loads)
   - *Finding:* "The studies discussed here provide strong empirical support for the notion that readers ascribe personality attributes both to typefaces and to text passages."
   - A secondary summary adds detail: Connie Malamed, Understanding Graphics, https://understandinggraphics.com/?p=459 (loads).
     - Participants grouped 15 typefaces into Elegance, Directness and Friendliness.
     - Arial and Garamond, a serif, fell in Directness.
     - I couldn't verify where Courier landed.
   - *Supports:* Readers do read personality into type, so both faces send a message.
   - *Strength:* Peer-reviewed, student samples, typefaces shown on paper.
2. **Shaikh (2007)**, *Psychology of Onscreen Type: Investigations Regarding Typeface Personality, Appropriateness, and Impact on Document Perception*, PhD dissertation, Wichita State University. https://soar.wichita.edu/items/17c0dfdf-9ae9-40a7-88ef-70e86a4b47e7; PDF https://soar.wichita.edu/server/api/core/bitstreams/58c1da24-7d63-4571-991a-1acc4b533f9e/content (loads; read the relevant chapters)
   - *Method:* Study 1 had 379 people rate 40 typefaces on 15 scales.
   - *Findings:*
     - **Courier New**, the standard typewriter face, "is perceived as the extreme on many scales: masculine, hard, stiff, ugly, cheap, bad, passive, sad, weak, cool, and old" (p. 72).
     - All three monospaced faces "were seen as very potent and not evaluative" (p. 95).
     - Serif and sans serif faces "were viewed as neutral on all factors" (p. 95).
     - In Study 3, using an inappropriate typeface hurt how readers judged the author's ethos.
   - *Supports:* A serif is a safe, neutral choice for the name.
   - *Cuts against:* A Courier-style face reads as hard, plain and old, and unattractive.
   - *Strength:* Dissertation (Shaikh later co-authored peer-reviewed work on it). Online convenience sample; fonts rated on screen.
3. **Doyle & Bottomley (2006)**, "Dressed for the Occasion: Font-Product Congruity in the Perception of Logotype", *Journal of Consumer Psychology* 16(2), 112–123. https://doi.org/10.1207/s15327663jcp1602_2 (abstract read on OpenAlex)
   - *Finding:* Whether a font seems right for a product depends partly on whether the two match in potency and activity.
   - "These differences are also evident when participants choose a company to call on the basis of ads similar to those found in the Yellow Pages."
   - *Supports:* The face should suit what OrderSync sells. And font choice changed which company people picked to call from a printed listing, the closest thing to a business card in this literature.
   - *Strength:* Peer-reviewed, consumers.

**Also useful**
- Hazlett, Larson, Shaikh & Chaparro (2013), "Two studies on how a typeface congruent with content can enhance onscreen communication", *Information Design Journal* 20(3), 207–219. PDF hosted by Microsoft Research: https://microsoft.com/en-us/research/uploads/prod/2021/06/Hazlett-Larson-Shaikh-Chaparo-2013-two-studies-on-how-a-typeface-congruent-with-content-can-enhance-onscreen-communication.pdf (loads)
  - Readers pick up a typeface's personality almost instantly.
  - It summarizes Shaikh, Chaparro & Fox (2006): 561 people rated 20 fonts, and the ratings clustered by family, including a monospace family.
  - It also summarizes Shaikh (2007): with an appropriate typeface, a company looked "more professional and the content as more believable".
  - The 2006 original was published on usabilitynews.org, which now belongs to an unrelated site, so cite it through this paper.
- Henderson, Giese & Cote (2004), "Impression Management using Typeface Design", *Journal of Marketing* 68(4), 60–72. https://doi.org/10.1509/jmkg.68.4.60.42736 (abstract on OpenAlex). Typeface design drives impressions such as "pleasing, engaging, reassuring, prominent".

**Flags**
- **The typewriter side needs a stated reason.**
  - Shaikh's Courier New ratings (hard, stiff, cheap, old) cut against it if the goal is premium.
  - But Shaikh's Study 2 offers another reading. High potency made Courier New a predicted good fit for a hammer ad, and the best fit for "insulation" (pp. 123–124, 131). These are industrial, utilitarian products.
  - For distributors and industrial suppliers, a typed, utilitarian look can fit (Doyle & Bottomley).
  - Say what it's meant to evoke, for example typed purchase orders. That's a design rationale, not a finding.
- **The card's face isn't Courier New.** It's heavier and inked, so the Courier New ratings may not carry over.
- **Typefaces may not change how the words read.** Shaikh (2007, p. 271) reports that Brumberger found typeface personality had no significant effect on the perceived personality of text passages. Shaikh quotes her: "visual personality of the text did not have a large impact on the readers' perception of its verbal personality."
  - Shaikh's own later study disagreed.
  - Shaikh cites p. 230, which falls in Brumberger's companion article (pp. 224–231), so I'm not sure which article the quote is from.
- **There's no good evidence that a serif builds trust.** Shaikh found serifs neutral. The popular Errol Morris "Baskerville" experiment (NYT, 2012) was informal, and I didn't verify it. Leave it out.

---

## 5. Minimal information, clear hierarchy, plenty of empty space

**Best sources**

1. **"Visual Hierarchy in UX: Definition"**, Kelley Gordon, NN/g, 17 Jan 2021. https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ (loads)
   - *Finding:*
     - "Make the most important element biggest."
     - "Use no more than 3 sizes — small, medium, and large."
     - "Limit how many elements are big to a maximum of 2".
     - "Let it breathe. An element that has more space around it will be perceived as one group and thus will receive more attention."
   - *Supports:* Name, then title, then contact, set in about three sizes (≈22, ≈10 and ≈9 pt on the navy side), with space around the name.
   - *Strength:* Expert guidance.
2. **Pieters & Wedel (2004)**, "Attention Capture and Transfer in Advertising: Brand, Pictorial, and Text-Size Effects", *Journal of Marketing* 68(2), 36–50. https://doi.org/10.1509/jmkg.68.2.36.27794 (abstract read on OpenAlex)
   - *Method:* 1,363 print ads, eye-tracked with more than 3,600 consumers.
   - *Finding:* "The text element best captures attention in direct proportion to its surface size."
   - *Supports:* Making the name the largest text puts attention there.
   - *Strength:* Peer-reviewed and large. The data are magazine ads, not cards.

**Also useful**
- Olsen, Pracejus & O'Guinn (2012), "Print advertising: White space", *Journal of Business Research* 65(6), 855–860. https://ideas.repec.org/a/eee/jbrese/v65y2012i6p855-860.html (loads)
  - A survey of 31 ad-agency creative directors.
  - Their reasons for white-space ads included "to focus attention on the product and the brand name" and "to convey brand prestige".
  - This is practitioners' intent, not consumers' reaction.
- Pracejus, O'Guinn & Olsen (2013), *International Journal of Research in Marketing* 30(3), 211–218. https://ideas.repec.org/a/eee/ijrema/v30y2013i3p211-218.html (loads)
  - "The use of white space in advertising communicates specific meanings to consumers."
  - Three studies support a rhetorical explanation (white space carries learned meanings) over an economic-signaling one, and the meanings differ across cultures.
- AR #1, Tuch et al. (2012): simple, typical-looking company websites made the best first impression.

**Flags**
- **"Less" isn't automatically better at grabbing attention.** Pieters, Wedel & Batra (2010), "The Stopping Power of Advertising", *Journal of Marketing* 74(5), 48–60, https://doi.org/10.1509/jmkg.74.5.048 (abstract on OpenAlex): across 249 ads, dense clutter ("feature complexity") hurt attention to the brand and liking of the ad, but a more elaborate creative design ("design complexity") *helped* attention to the ad and liking. A card handed over in person already has the person's attention, so this matters less.
- **Don't list what white space means to consumers.** I could read only the abstracts of Pracejus et al. Cite "communicates specific meanings" and the creative directors' "prestige", nothing more specific.
- **A vendor finding leans slightly against the navy side.** In the Adobe Express mockup survey, 54% chose white backgrounds as most trustworthy. The card has a light side, and this is low-weight evidence.

---

## 6. Print legibility: type size and contrast, especially light text on navy

**Best sources**

1. **Legge & Bigelow (2011)**, "Does print size matter for reading? A review of findings from vision science and typography", *Journal of Vision* 11(5):8. https://pmc.ncbi.nlm.nih.gov/articles/PMC3428264/ (loads; read in full)
   - *Finding:*
     - "a consensus value for the critical print size for normally sighted readers is 0.2° x-height". Below that size, reading slows sharply.
     - "At a viewing distance of 40 cm (16 inches), Times New Roman type … is equivalent to a physical body size of 9 point."
     - Their conversion of Tinker's data shows a "significant decline at 0.15° (x-height = 1.09 mm, 8 point body)".
   - *On the card:* The website line has an x-height of about 1.44 mm, which is about 0.21° at 40 cm. That's right at the critical size.
   - *Supports:* About 9 pt is the floor for this text, not a comfortable size. Don't go smaller.
   - *Strength:* Peer-reviewed review, but for readers with normal vision.
2. **Miles A. Tinker, *Legibility of Print***, Iowa State University Press, 1963. https://gwern.net/doc/design/typography/1963-tinker-legibilityofprint.pdf (loads; read chapters 9 and 11)
   - *Black vs. white print (p. 130):* Black on white was read 10.5% faster than white on black, and 77.7% of readers rated black on white more legible. This is Paterson & Tinker, 1931.
   - *Serifs reversed out (pp. 134–135):* In Taylor's distance study, white serif type (Scotch Roman) was 22–27% less legible than black at 6–14 pt. A light sans (Kabel Light) was about equal at 10 and 14 pt. "in the white on black arrangement, it is the type with serifs that is subject to the greatest blurring from irradiation."
   - *Problems add up (pp. 165, 168):* At 8 pt, white on black cut legibility by about 20%. Tinker's advice is to avoid not only "combinations of non-optimal printing arrangements" but also "combinations of marginal arrangements".
   - *Supports:* This is the print-specific evidence. Small serif type reversed out of navy stacks three marginal factors at once.
   - *Strength:* Classic book. The studies are 1930s–1960s and measured continuous reading.

**Also useful**
- Dobres, Chahine, Reimer, Gould, Mehler & Coughlin (2016), *Ergonomics* 59(10), 1377–1391. https://pmc.ncbi.nlm.nih.gov/articles/PMC5213401/ (loads)
  - Black-on-white text was readable at glance times 38.6% shorter than white-on-black.
  - Thresholds rose with age, from about 70 ms at 20 to 126 ms at 65.
  - Screen-based.
- Piepenbrock, Mayr, Mund & Buchner (2013), "Positive display polarity is advantageous for both younger and older adults", *Ergonomics* 56(7), 1116–1124. https://doi.org/10.1080/00140139.2013.790485 (abstract on OpenAlex). Screen-based.
- WCAG 2.2, Understanding SC 1.4.3. https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html (loads)
  - 4.5:1 compensates for about 20/40 vision, "commonly reported as typical visual acuity of elders at roughly age 80".
  - 7:1 compensates for about 20/80.
  - It's a web standard, used here as a proxy for print.
- Reber & Schwarz (1999), "Effects of perceptual fluency on judgments of truth", *Consciousness and Cognition* 8(3), 338–342. https://doi.org/10.1006/ccog.1999.0386 (abstract read via PubMed)
  - Statements printed in easy-to-read colors were judged true above chance. Moderately visible ones were judged at chance.
  - So legibility also touches credibility. It's a small lab study.

**What this means for the card**
- **Contrast is fine in the exports.**
  - Navy side: near-white on navy, about 17:1.
  - Light side: dark type on light gray, about 16–18:1.
- **If you change the text to light gray, stay at 7:1 or above** on `#0F172B` (WCAG formula, screen values):

  | Text color | Contrast on `#0F172B` |
  | --- | --- |
  | `#FFFFFF` | 17.8:1 |
  | `#D1D5DB` | 12.1:1 |
  | `#9CA3AF` | 7.0:1 |
  | `#7B8594` | 4.8:1 |
  | `#6B7280` | 3.7:1 (fails 4.5:1) |

  Printed navy and paper won't match these screen values, so proof a physical card.
- **The weak spot is the small serif lines on the navy side.**
  - "Founder", the phone number and the URL are about 9 pt serif reversed out of navy. That's small size, reversed polarity and serifs at once, which is Tinker's "combination of marginal arrangements".
  - Options:
    - Set those lines in a sans (BOOK NOW already is).
    - Go up to 10–11 pt.
    - Use a slightly heavier weight.
  - Many of the buyers are owners and ops managers over 45 (see the Dobres age effect).
- **Caveats:**
  - Most of this evidence measures reading paragraphs, not a phone number.
  - The polarity studies with modern samples are screen-based.

---

## 7. Leaving off absolute claims like "Zero Errors"

**Best sources**

1. **Morkes & Nielsen (1997)**, "Concise, SCANNABLE, and Objective: How to Write for the Web", NN/g. https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/ (loads)
   - *Method:* 51 users, five versions of one site, about 10 per version.
   - *Finding:* The objective version scored 27% higher on usability than the promotional control. The objective version was the one with no "exaggeration, subjective claims, and boasting".
   - The authors' explanation: "Web users wonder about credibility, and questioning the credibility of promotional statements may distract users from processing the meaning."
   - *Supports:* Taglines like "Zero Manual Entry. Zero Errors." and "Scale Your Orders, Not Your Workload." are the kind of copy that makes readers question the claim.
   - *Strength:* Empirical but small, web, 1997. For the objective version alone, only satisfaction was statistically significant. The other measures pointed the same way.
2. **Goldberg & Hartwick (1990)**, "The Effects of Advertiser Reputation and Extremity of Advertising Claim on Advertising Effectiveness", *Journal of Consumer Research* 17(2), 172–179. https://doi.org/10.1086/208547 (abstract on OpenAlex)
   - The abstract shows that reputation and claim extremity interacted.
   - The direction comes from Hornikx (2010; see Flags): extreme claims persuaded more for a high-reputation brand, and "less extreme claims were more persuasive than extreme claims when the brand was introduced as a low-reputation brand."
   - *Supports:* A startup most buyers haven't heard of is the low-reputation case.
   - *Strength:* Peer-reviewed, consumer lab, fictitious brand.
3. **FTC on advertising claims.**
   - *Policy Statement Regarding Advertising Substantiation* (1984). https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation (loads). Advertisers must have "a reasonable basis for advertising claims before they are disseminated". This applies to "objective assertions about the item or service".
   - *Evolv Technologies* (press release, 26 Nov 2024). https://www.ftc.gov/news-events/news/press-releases/2024/11/ftc-takes-action-against-evolv-technologies-deceiving-users-about-its-ai-powered-security-screening (loads). The FTC alleged Evolv "deceptively advertised that its Evolv Express scanners would detect all weapons". That's an absolute accuracy claim about AI, made to institutional buyers.
   - *Operation AI Comply* (25 Sep 2024). https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes (loads). It includes DoNotPay's "generate perfectly valid legal documents".
   - *Supports:* "Zero Errors" is an objective, absolute claim about an AI product. It would need evidence that the tool never makes mistakes, and it can't have that.
   - *Strength:* Regulatory.

**Also useful**
- Kamins & Marks (1987), "Advertising Puffery: The Impact of Using Two-Sided Claims on Product Attitude and Purchase Intention", *Journal of Advertising* 16(4), 6–15. https://doi.org/10.1080/00913367.1987.10673090 (abstract on OpenAlex)
  - After a product trial that contradicted the ad, a one-sided ad with heavy puffery "led to post-trial ratings which declined significantly".
  - For OrderSync, one misread PO line in a pilot breaks a "Zero Errors" promise.
- Oliver (1980), "A Cognitive Model of the Antecedents and Consequences of Satisfaction Decisions", *JMR* 17(4), 460–469. https://doi.org/10.1177/002224378001700405 (abstract on OpenAlex). Satisfaction depends on expectations and whether they're disconfirmed. It's the standard model behind that point.
- AR #17 covers "AI washing" (Gartner, SEC). AR #5 covers Cicek et al. (2024): the word "AI" lowered trust on risky purchases.

**Flags**
- **Absolute wording on its own may not hurt.** Jos Hornikx, "Variations of standpoint explicitness in advertising: an experimental study on probability markers", ISSA Proceedings 2010. https://rozenbergquarterly.com/issa-proceedings-2010-variations-of-standpoint-explicitness-in-advertising-an-experimental-study-on-probability-markers/ (loads)
  - With 137 Dutch adults, hedges ("usually", "in most cases") and pledges ("always", "absolutely") were equally persuasive, whatever the brand's reputation.
  - That matches earlier studies (Berney-Reddish & Areni 2005, 2006; Hornikx et al. 2008).
  - So don't argue that absolute words lose persuasion. The stronger case is that OrderSync can't back the claim, and that one error breaks the promise (Kamins & Marks).
- **One FTC page is gone.** The FTC's Feb 2023 blog post "Keep your AI claims in check" now returns 404. The press releases and the 1984 policy statement still load. Enforcement priorities change; the substantiation rule is long-standing.
- **The two dropped taglines differ.** "Scale Your Orders, Not Your Workload." is subjective puffery. The FTC says such claims "receive less attention" (Advertising FAQs, https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business, loads). It's weaker on the legal argument and only covered by Morkes & Nielsen.

---

## Leads I dropped or couldn't verify

1. **eMarketer QR-scanner forecasts** (83.4 million in 2022 to 99.5 million in 2025). Every eMarketer page returned 403.
2. **Eisend (2006)**, "Two-sided advertising: A meta-analysis", *IJRM* 23(2), 187–198. Elsevier blocked the abstract, and OpenAlex and Crossref have none. Not used.
3. **Hunt (1995)**, "What von Restorff really did". Springer's cookie wall blocked it again (as in MD).
4. **Shaikh, Chaparro & Fox (2006)** original article. The usabilitynews.org domain now hosts an unrelated site. Cited through Hazlett et al. (2013) and Shaikh (2007).
5. **Errol Morris's Baskerville experiment** (NYT, 2012). Not checked, and it's informal. Left out.
6. **RNIB Clear Print** (12 pt minimum). I found it only in council documents that quote it, and a 12-pt minimum doesn't fit business cards. Left out.

---

## Summary table

| # | Decision | Best source | One-line support | URL |
| --- | --- | --- | --- | --- |
| 1 | Carry the site's colors and style onto the card | Flaherty, NN/g, "Consistency in the Omnichannel Experience" (2016) | A consistent visual story across channels makes a company look "buttoned up" and earns trust. Caution: the card shares the site's colors and chrome rule, not its typefaces. | https://www.nngroup.com/articles/omnichannel-consistency/ |
| 2 | Labeled QR code as the one call to action | Kohler, NN/g, "13 QR-Code Usability Guidelines" (2024) | Unlabeled codes are "not trustworthy or enticing", so say what scanning does and link straight to it. Caution: aim for 2 cm, don't invert, and consider "Book a Call". | https://www.nngroup.com/articles/qr-code-guidelines/ |
| 2b | Keep the URL beside the code | Hupp et al., *Survey Methods: Insights from the Field* (2025) | In a national sample, 62% used the QR code and 38% the URL, and URL users skewed older. | https://surveyinsights.org/?p=20208 |
| 3 | Chrome on one small element | Wolfe & Horowitz, *Nature Human Behaviour* (2017), with the von Restorff effect (Laws of UX) | A unique feature pops out only when nothing near it shares it. Caution: what stands out is a decoration, and the arrow points off the card. | https://pmc.ncbi.nlm.nih.gov/articles/PMC9879335/ |
| 4 | Typewriter face plus a serif | Shaikh, PhD dissertation, Wichita State (2007), with Doyle & Bottomley (2006) | Readers attribute personality to type, and fit with the product matters. Caution: Courier New rated hard, stiff, cheap and old, while serifs rated neutral. | https://soar.wichita.edu/items/17c0dfdf-9ae9-40a7-88ef-70e86a4b47e7 |
| 5 | Minimal content, name largest, white space | Gordon, NN/g, "Visual Hierarchy in UX" (2021) | Make the most important element biggest, use no more than 3 sizes, and let it breathe. Pieters & Wedel (2004): attention to text grows with its size. | https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ |
| 6 | Print legibility of small light text on navy | Tinker, *Legibility of Print* (1963), with Legge & Bigelow (2011) | White on black reads 10.5% slower, serifs suffer most when reversed, and 0.2° x-height (about 9 pt) is the floor. The card's 9-pt reversed serif lines sit at that floor. | https://gwern.net/doc/design/typography/1963-tinker-legibilityofprint.pdf |
| 7 | Leave off "Zero Errors" | FTC Policy Statement on Advertising Substantiation, with Morkes & Nielsen (1997) and Goldberg & Hartwick (1990) | Objective claims need a reasonable basis, promotional copy invites doubt, and low-reputation brands do better with less extreme claims. Caution: hedges and pledges tested equally persuasive (Hornikx 2010). | https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation |
