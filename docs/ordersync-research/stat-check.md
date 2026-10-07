# OrderSync research stat check

Checked 2026-10-07 against `git show bfe0798:DESIGN.md` and `git show bfe0798:wireframe-v3.html` in `/Users/ern/code/ordersync/ordersync-static` (both committed 2026-05-18).

Verdicts:
- **VERIFIED**: the source says this.
- **CLOSE**: the source says something near it. The correct number or wording is given.
- **WRONG**: the source says something different.
- **UNVERIFIED**: I couldn't find the original source.

Source wording below is paraphrased unless the exact words matter. Wayback Machine note: during this check the Internet Archive was partly offline and rate-limited. Where a capture from around May 2026 exists, its URL is given. Otherwise the value is today's (2026-10-07) and is marked as such.

---

## 1. Priority stats

| # | Claim in DESIGN.md / wireframe | Verdict | What the original source says | Source |
|---|---|---|---|---|
| 1a | TrustRadius 2024: 86% shortlisted a product they'd already heard of | **CLOSE** | 86% is **enterprise buyers only**. Of all buyers who made a shortlist, **78%** picked products they'd heard of before starting research (p. 5). The wireframe's "86% of buyers" is wrong as worded. | [TrustRadius 2024 B2B Buying Disconnect PDF](https://go.trustradius.com/rs/827-FOI-687/images/2024%20B2B%20Buying%20Disconnect%20Year%20of%20the%20Brand%20Crisis.pdf), p. 5 |
| 1b | 71% purchased their first choice | **VERIFIED** | Once the shortlist was made, 71% went with their first choice and 12% chose something else (p. 5). | same PDF, p. 5 |
| 1c | n=2,164 | **VERIFIED** | 2,164 verified **technology buyers** (people involved in a software or hardware purchase in the past year), surveyed March 2024. A separate survey of 243 vendors ran in April 2024 (p. 26). TrustRadius and Pavilion published it in June 2024 (press release dated June 10, 2024). | same PDF, p. 26; [media kit](https://solutions.trustradius.com/2024-b2b-disconnect-media-kit/) (Wayback capture listed: [20260617](https://web.archive.org/web/20260617192952/https://solutions.trustradius.com/2024-b2b-disconnect-media-kit/)) |
| 1d | Shortlists of only 2–3 products | **CLOSE** | **Most shortlists (63%)** have 2–3 products, and 96% have five or fewer (p. 5). It is not an average. | same PDF, p. 5 |
| 1e | 87% of purchases done within 6 months | **VERIFIED** | 87% of buyers finished within six months; for enterprise buyers it's 65% (p. 7). | same PDF, p. 7 |
| 1f | "Buyers use reviews to validate a decision already made" | **CLOSE** | The report says buyers usually go with their first choice and do research to justify the decision to the wider buying group. It doesn't single out reviews. | same PDF, p. 5 |
| 2 | 75% of POs still arrive via email or fax (Leverage AI) | **UNVERIFIED** | Not found on lvrg.ai (Leverage's purchase-order automation page) or lleverage.ai, or anywhere else as worded. The nearest is a "Statista 2023" figure, seen only second-hand in an OroCommerce blog (which blocked fetching): nearly 75% of B2B professionals still *placed* orders by phone, email or fax. That's a different claim and I didn't check it. Don't use this one. | [lvrg.ai/purchase-order-automation](https://lvrg.ai/purchase-order-automation) (no such stat) |
| 3a | Parseur 2025 (n=500): 27.2% feel they lack authority to implement automation | **VERIFIED** | 27.2% of respondents feel the decision to implement automation isn't within their role. Survey: 500 U.S. professionals, run by Parseur with QuestionPro in July 2025. They are **employees, not buyers**, so the wireframe's "27% of buyers" is wrong as worded. | [Parseur report](https://parseur.com/blog/manual-data-entry-report) (live page was republished 2026-09-08). Original capture with the same numbers: [Wayback 2025-08-04](https://web.archive.org/web/20250804165123/https://parseur.com/blog/manual-data-entry-report) |
| 3b | 46.2% have never used automation tools | **VERIFIED** | 46.2% have never used tools to automate data entry or extraction, and another 8.2% aren't sure. | same |
| 3c | 96.5% of automation users report significant workload reduction | **VERIFIED** | 96.5%, among companies using automation. It appears only in the Key Takeaways box. The body gives no base count, so it's a percentage of an unknown subset of the 500. | same |
| 3d | 56% burnout | **VERIFIED** | 56% of employees experience burnout from repetitive (data) tasks. | same |
| 3e | 9+ hours/week | **VERIFIED** | On average, more than 9 hours a week moving data from emails, PDFs, spreadsheets and scans into systems. | same |
| 4a | G2 2025: 29% start research via ChatGPT rather than Google | **CLOSE** | The survey statement is that they start research with **AI search more often than Google**: 29%. That isn't "rather than", and it isn't ChatGPT specifically (G2's press release adds "platforms like ChatGPT"). n=1,169 B2B decision makers, surveyed April 2025, published May 14, 2025. | [G2 2025 Buyer Behavior Report PDF](https://learn.g2.com/hubfs/G2-2025-Buyer-Behavior-Report-AI-Always-Included.pdf), p. 22; [G2 press page](https://company.g2.com/news/buyer-behavior-in-2025) |
| 4b | AI chatbots (17%) and review sites (15%) are the top shortlist influences | **VERIFIED** | Among sources that influence vendor shortlisting, GenAI chatbots are 17.1% and software review sites 15.1%, the top two. Next are vendor site 12.8% and vendor salesperson 8.8%. | same PDF, p. 26 |
| 4c | Nearly 8 in 10 say AI search changed how they research; nearly 2 in 3 want vendor contact late; committees shrinking from 5–8 to 3–4 | **VERIFIED** | 79%. Nearly two out of three, up 17 points year over year. 3–4 members, compared with the traditional 5–8. | same PDF, p. 22; G2 press page |
| 5a | SPS Commerce on Capterra: 4.2/5 from about 490 reviews | **CLOSE** | On 2026-05-14, Capterra listed SPS at **4.2 (497)**. Today it shows 4.2 (527), with the page last updated 2026-09-28. | [Wayback 2026-05-14, Capterra EDI category](https://web.archive.org/web/20260514010159/https://www.capterra.com/edi-software/); live: [capterra.com/p/155593/SPS-Commerce](https://www.capterra.com/p/155593/SPS-Commerce/) |
| 5b | "79% negative sentiment on pricing" (and "#1 complaint: 79% negative reviews on price") | **CLOSE / misread** | The figure comes from Capterra's AI **Pros and Cons** section. Each topic shows "X% negative reviews out of N", where N is the number of reviews that mention the topic. Today SPS's topic **High and confusing pricing structure** shows **78% negative out of 73 reviews**. In May 2026 it was very likely 79% of a similar small base, but there's no SPS product-page capture to confirm. It does **not** mean 79% of reviews are negative about price. Overall review sentiment on the same page is 82% positive, 9% neutral, 9% negative. | [capterra.com/p/155593/SPS-Commerce](https://www.capterra.com/p/155593/SPS-Commerce/) ("Pros and Cons" → Expand to view all), today's value |
| 5c | "61% negative sentiment on support quality" | **WRONG label** | Capterra's 61% is attached to **Frequent errors and unclear troubleshooting** (61% negative out of 97), not support. SPS's Customer Service score on the same page is 4.1/5 (506 ratings). | same, today's value |
| 5d | Quote: "They said it would be 6-8 weeks. It's been 9 months. And we're not done." — Jennifer N., CEO, Consumer Goods | **VERIFIED** (small fixes) | This is the **headline (title) of a 1-star review**. It matches word for word, but the source has no final period. Reviewer: Jennifer N., **CEO & Founder**, Consumer Goods, used it 6–12 months. Review dated **August 2, 2022**, so it is not recent. The review body says the same thing in different words. | [Capterra SPS reviews, page 3](https://www.capterra.com/p/155593/SPS-Commerce/reviews/?page=3) (sorted by "most helpful"; position may shift) |
| 6a | TrueCommerce on Capterra: 4.3/5, ~501 reviews | **CLOSE (count wrong)** | In May 2026: **4.3 (535)**. That is on the 2026-05-14 EDI category capture, and the product page (last updated 2026-05-19, captured 2026-07-10) also shows 535. Today: 4.3 (537). | [Wayback 2026-05-14](https://web.archive.org/web/20260514010159/https://www.capterra.com/edi-software/); [Wayback 2026-07-10 product page](https://web.archive.org/web/20260710103816/https://www.capterra.com/p/122910/TrueCommerce-EDI-Solutions/) |
| 6b | TrueCommerce: "Top complaint is also pricing (46% of negative mentions)" | **CLOSE / misread** | Capterra's topic **High and unpredictable costs** shows **46% negative reviews out of 61**: 46% of the reviews that mention cost are negative. It isn't 46% of negative mentions, and nothing shows it's the top complaint (Frequent technical difficulties is 57–58% negative). The same figure is on the July 2026 capture and today. | same Wayback product page; live [capterra.com/p/122910](https://www.capterra.com/p/122910/TrueCommerce-EDI-Solutions/) |
| 6c | TrueCommerce quote: "Nearly 14 months without conducting a single live transaction while being billed monthly" | **CLOSE** (paraphrase) | The meaning is right, but the wording differs. The source sentence says it has been nearly 14 months with no live transaction yet, while they've been billed monthly for the subscription (the original has the typo "billing use"). Reviewer: **Howie F., CFO, Wholesale**, 1 star, **Sept 1, 2022**. Use the exact text or mark it as a paraphrase. | [Capterra TrueCommerce reviews, page 4](https://www.capterra.com/p/122910/TrueCommerce-EDI-Solutions/reviews/?page=4) |
| 6d | Conexiom on Capterra: 4.7/5, 44 reviews | **VERIFIED** | 4.7 (44) on 2026-04-15, and still 4.7 (44) today (page last updated 2026-09-28). | [Wayback 2026-04-15](https://web.archive.org/web/20260415001441/https://www.capterra.com/p/205134/Conexiom/) |
| 7 | Walmart OTIF chargeback: 3% of cost of goods for non-compliant cases | **VERIFIED** as you worded it, but **DESIGN.md wording is WRONG in two places** | Walmart fines **3% of the cost of goods sold (COGS) of the non-compliant cases**, assessed monthly. DESIGN.md's Key Numbers table ("3% of PO value") and the segment copy ("Walmart chargebacks: 3% of PO value") are wrong: it's not the whole PO. Walmart's own policy document sits behind supplier login (Retail Link). The best public sources are a Walmart spokesperson quoted by Supply Chain Dive and the supplier guides. | [Supply Chain Dive, Mar 8 2019 (Walmart spokesperson)](https://www.supplychaindive.com/news/walmart-on-time-in-full-87-suppliers/550083/); [SPS Commerce supplier guide](https://www.spscommerce.com/community/articles/holding-3rd-parties-accountable-for-otif-fines); [8th & Walton](https://www.8thandwalton.com/blog/walmart-otif) |
| 8a | Logistics Management 2025: 52% still mostly or all manual in order fulfillment | **VERIFIED** (with caveats) | 52% mostly or all manual (up from 43% the year before), 42% mixed. Caveats: this is Peerless Research Group's **2025 Automation Solutions Study**, n=**139** people involved in **materials handling**. "Order fulfillment" here means warehouse and DC operations (pick, pack, store), **not order entry**. By Bridget McCrea, Feb 1, 2025. The **2026** edition (Jan 1, 2026, before your doc) is titled "Warehouse automation ticks upward" and doesn't repeat the 52% figure. So "and going UP" rests on a single year-over-year change and may be out of date. | [Logistics Management](https://www.logisticsmgmt.com/article/2025_automation_survey_diving_deep_into_the_warehouse_automation_trends); [Wayback 2025-05-03](https://web.archive.org/web/20250503121932/https://www.logisticsmgmt.com/article/2025_automation_survey_diving_deep_into_the_warehouse_automation_trends) |
| 8b | 4% "highly automated" (down from 10%) | **VERIFIED** | 4% say these processes are highly automated, down from 10% in the 2024 survey. Same caveats as 8a. | same |
| 9 | Manual order entry costs $21+ per order vs. under $6 automated (Conexiom, OrderEase) | **WRONG** (attribution and framing) | The original is **APQC, 2016** ("Cutting the Costs of Sales Order Processing", Mary Driscoll, sponsored by Esker). Average cost per sales order: **bottom performers** on traditional (paper, fax, email) channels **$21.00**, and bottom performers on new digital channels **$6.00**. Top performers: $7.00 vs. $2.00. Medians: $12.60 vs. $4.00 (N=755/758). So $21 is the worst-performer average, not a floor ("$21+"), and $6 is not "under $6". The data is about 10 years old, and the source is not Conexiom or OrderEase. Fair use: "APQC found the worst performers spend $21 per sales order on paper channels vs. $6 on digital ones." | [APQC/Esker PDF](https://cloud.esker.com/fm/others/K03319_Sales%20Order%20Processing_2016_Esker%203.pdf), Figure 2, pp. 2–3; also restated in [APQC 2017 survey](https://cloud.esker.com/fm/others/APQC-Survey-Automating-the-Sales-Order-Entry-Process-2017.pdf) |
| 10 | SPS Commerce BBB: 23 complaints in 3 years, 5 in the last 12 months (as of May 2026) | **UNVERIFIED for May 2026** | There's no 2026 Wayback capture of the BBB profile (latest is 2022). **Today** BBB shows **16 total complaints in the last 3 years** and **3 complaints closed in the last 12 months**. Note BBB's 12-month figure counts complaints *closed*, not filed. Both counts move on a rolling window, so 23/5 in May 2026 is plausible but can't be confirmed. The four complaints described in DESIGN.md do match (details below). | [BBB SPS Commerce complaints](https://www.bbb.org/us/mn/minneapolis/profile/computer-software-developers/sps-commerce-0704-96061635/complaints), today's value |

### BBB complaints described in DESIGN.md (all on the live BBB page)

| Claim | Verdict | Notes |
|---|---|---|
| March 2026: unauthorized contract, no services delivered, platform never accessed, $11,216 principal + $3,735 fees | **VERIFIED** | Filed 03/06/2026. Exact figures: $11,216.25 principal and $3,735.01 interest and fees. The complaint also cites a $4,985 cancellation fee. The DESIGN.md quote fragments are close paraphrases, not exact quotes. |
| Feb 2026: told they needed the platform but were exempt; billed 3 months after cancelling | **VERIFIED** | Filed 02/25/2026. A small Whole Foods supplier; the amount in collections was $135. |
| Jan 2026: "No onboarding occurred, no connection was activated" | **VERIFIED** | Filed 01/08/2026. BBB redacts one word (likely "EDI") before the word connection. |
| June 2025: duplicate documents charged twice, $6,059 disputed | **VERIFIED** | Filed 06/16/2025. Exact claim: $6,059.52 ($93 plus $5,966.52). |

---

## 2. Quotes the coordinator added

| Quote | Verdict | Source |
|---|---|---|
| "We were dealing with 240 customers per week, all through email. Our team of four couldn't cope anymore…" — EJ, Lynas Foodservice | **VERIFIED** (one small edit) | From **Choco** (the OrderAgent AI vendor), in its article "OrderAgent: The AI Order Processing Engine That's Powering the Future of Food Distribution", dated 11/17/2025. It matches word for word, except DESIGN.md drops "with Choco" after "going live". Attribution on the page is "EJ – Lynas Foodservice", with no surname or title. It's a vendor marketing testimonial, not an independent review. [choco.com article](https://choco.com/us/stories/suppliers/orderagent-the-ai-order-processing-engine-thats-powering-the-future-of-food-distribution); [Wayback 2026-05-16](https://web.archive.org/web/20260516140051/https://choco.com/us/stories/suppliers/orderagent-the-ai-order-processing-engine-thats-powering-the-future-of-food-distribution) |
| "CSRs were constantly struggling with the push and pull of rushing to key in a new order, and then dealing with customer inquiries about existing ones." — Darlene Bardin, Genpak | **VERIFIED** | Matches word for word. Darlene Bardin, **Director of Customer Service**, Genpak, in Conexiom's "Customer of the Month" case study, March 17, 2022, by Pierce Smith. DESIGN.md calls it "(from Conexiom reviews)"; it's actually a **vendor case study**. [conexiom.com blog](https://conexiom.com/blog/how-genpak-customer-service-team-repurposed-75-hours-of-their-week-with-sales-order-automation/); [Wayback 2026-06-15](https://web.archive.org/web/20260615075055/https://conexiom.com/blog/how-genpak-customer-service-team-repurposed-75-hours-of-their-week-with-sales-order-automation/) |
| Does "nightmare" appear in the cited competitor reviews? | **Yes, for SPS and TrueCommerce. Not found for Conexiom.** | **SPS (Capterra):** Jim D., Owner, Consumer Goods, 2 stars, May 4, 2023, says the 3PL/SPS integration was a nightmare. Tehila M., CEO, Food & Beverages, Nov 30, 2023, writes it with a typo ("anightmare"). Another review mentions vendors who had "nightmares" implementing an integrated XML solution. **TrueCommerce (Capterra):** Keith E., IT Director, Apr 24, 2021, calls follow-up projects a nightmare; another 1-star review (2019) calls label-making a nightmare. **Conexiom (Capterra, 44 reviews):** no match found. So the "nightmare" in Key Insight #4 is real buyer language. |

---

## 3. Other quotes in DESIGN.md I checked along the way (all Capterra, SPS Commerce)

| Quote in DESIGN.md | Verdict | Notes |
|---|---|---|
| "We spend more man hours on inputting orders than before, with no advantage for using SPS" | **CLOSE** (paraphrase) | The source has more man hours than ever before (with the original's typo "then"), and no advantage for us using the SPS. Tom S., General Sales Manager, Food Production, 1 star, **Feb 15, 2019**. Use the exact text or mark it as a paraphrase. ([reviews page 9](https://www.capterra.com/p/155593/SPS-Commerce/reviews/?page=9)) |
| "They are crooks. Do not use." — Miranda C., Treasurer, Wholesale | **CLOSE** | It's the review title, with a dash rather than a period. The reviewer gave **4 stars** overall, so don't present it as a 1-star review. Aug 26, 2021. She says she's being charged for services she never used ("never delivered" in DESIGN.md is a slight shift). |
| "Sub-par integrations, unresponsive customer service, heinous billing practices" — Jessica K., VP, Medical Devices | **VERIFIED** | Review title, word for word. Jessica K., Vice President, 2 stars, July 19, 2021. |
| "30 minutes to process a simple order on their platform" | **VERIFIED** (one reviewer) | Andrew M., EVP, Industrial Automation, 3 stars, Dec 3, 2020. It's one person's experience, not a measured figure. |
| "Average email response: 9 days" | **VERIFIED** (one reviewer) | Tehila M., CEO, Food & Beverages, Nov 30, 2023, says emails take an average of 9 days to get a response. It's one person's experience. |
| "Advertised $20/mo, actual TCO $50K–$100K+/year" (Capterra reviews, Extensiv) | **UNVERIFIED** (TCO) | $20/month starting price: **VERIFIED** on Capterra. The $50K–$100K+ TCO: not found in Extensiv's SPS help pages (they list $900–$1,500 setup per connection) or in reviews. One reviewer (Cesar D., 2020) says SPS's recommendation cost them over $50,000, but that's one anecdote, not TCO. |

---

## 4. Spot check: "Key Numbers for Landing Page Copy"

| Stat | Cited source | Verdict | Notes |
|---|---|---|---|
| $21+ per order manual vs. under $6 automated | Conexiom, OrderEase | **WRONG** | See #9 above. It's APQC 2016 bottom-performer averages ($21 vs. $6). |
| 15–25% error rate on manually processed orders | APQC, Leverage AI | **UNVERIFIED** | Not found. Conexiom cites APQC for a **1%–3%** manual order entry error rate. Drop it, or replace it with the APQC 1–3% figure via Conexiom. |
| CSRs spend 20–40% of their time on manual data entry | Bizowie, LooperBuy | **CLOSE** (weak) | It's a Conexiom blog claim (customer service and inside sales reps spend 20–40% of their time on manual order handling), with no underlying study. Not found on Bizowie. It's a vendor assertion. |
| $53 average cost to fix a single order error | "Industry benchmark" | **UNVERIFIED** | No source found. Other vendors quote anything from $25 to $250, all unsourced. Drop it. |
| 70–80% cost reduction with order automation | NAW, Conexiom | **UNVERIFIED** (weak) | Only vendor marketing ("up to 80%") and a single customer case study (70%). No NAW source found. |
| 80–90% time reduction per order (8 min to under 60 sec) | Bizowie | **UNVERIFIED** | Not found. Conexiom's blog claims an 80%+ reduction in order entry time, which is a vendor claim. |
| Walmart OTIF chargeback: 3% of PO value | Walmart supplier standards | **WRONG** | It's 3% of COGS of the **non-compliant cases**, not of PO value. See #7. |
| Target ASN errors: $0.75/carton, $100 minimum | Target compliance docs | **CLOSE** (secondary) | Confirmed in supplier guides (SPS Commerce, SupplyPike) describing Target's 2025 ASN Accuracy metric. Target's own document is behind its Partners Online login. [SupplyPike](https://help.supplypike.com/en/articles/10770865-asn-accuracy) |
| SPS real TCO $50K–$100K+/yr vs. advertised $20/mo | Capterra reviews, Extensiv | **UNVERIFIED** (TCO) | See section 3. |
| 75% of POs still arrive via email or fax | Leverage AI | **UNVERIFIED** | See #2. |
| Food distribution net margin: 2.9% median | WifiTalents | **WRONG** (and weak source) | IFDA, the foodservice distributors' trade association, says the **median net profit margin of a foodservice distribution business was 1.8% in 2025**. Its earlier productivity study gave a median of 1.7% pre-tax. WifiTalents is a content-farm stat page. [IFDA Industry Facts](https://www.ifdaonline.org/?p=1262) |
| 27,500 food distribution companies in the US | Disfold, Vertical IQ | **UNVERIFIED** (weak) | Not found. Disfold-type pages give other counts (e.g. 55,953). These are aggregator or paywalled sources. |
| 400,000+ wholesale distributors in the US | First Research | **UNVERIFIED** | First Research profiles are paywalled. I didn't check it against Census data. |

## 5. Spot check: "Manual Data Entry Statistics (2024–2025 surveys)"

| Metric | Cited source | Verdict | Notes |
|---|---|---|---|
| ~12 minutes per order (manual) | Conexiom | **CLOSE** | It appears in a hypothetical "quick math exercise" in Conexiom's blog, not a measured benchmark. [Conexiom blog](https://conexiom.com/blog/the-real-cost-of-manual-order-entry-in-b2b-operations) |
| 7–8 minutes per 40-line order (food distribution) | Choco/IFDA | **CLOSE** | The claim is **Choco's**, not IFDA's: the Choco article says a 40-line order can take seven to eight minutes, with no study cited. |
| CSR time on manual handling 20–40% | Conexiom | **VERIFIED** (as a Conexiom claim) | Vendor claim with no underlying data. |
| 9+ hours/week; 56% burnout; 50.4% say manual entry causes costly errors or delays; 46.2% never used automation; 27.2% lack authority; 96.5% workload reduction | Parseur 2025 | **VERIFIED** | See #3. |
| Top docs entered manually: work orders 34%, POs 32%, sales orders 30% | Parseur 2025 | **CLOSE** | Work orders are 34.4%; POs (32%) and sales orders (30%) are exact. |
| Departments most affected: Operations 13.6%, Sales 13.4% | Parseur 2025 | **WRONG** | These are each department's **share of survey respondents** (Parseur's "Annex: who's affected"), not a measure of who is most affected. |
| 52% mostly or all manual; 4% highly automated (down from 10%) | Logistics Mgmt 2025 | **VERIFIED** (with caveats) | Warehouse fulfillment, not order entry; n=139. See #8. |
| Manual entry error rate 1–4% per field | APQC | **CLOSE / UNVERIFIED** | Conexiom quotes APQC for 1%–3% per **order** (not per field). The 1–4% range matches DocuClipper's blog (1% typical, up to 4% unverified), not APQC. I didn't find an APQC original. |
| Automated error rate 0.01–0.04% | DocuClipper | **UNVERIFIED** (weak) | It's on DocuClipper's (a vendor) data-entry-statistics blog page, with no primary study. |
| Humans make ~100x more errors | DocuClipper | **UNVERIFIED** (weak) | This is arithmetic on the two DocuClipper numbers above. |
| Cost per error to fix ~$53 | "Industry benchmark" | **UNVERIFIED** | See section 4. |

---

## Notes

1. **Safe to use as is, with the link:** TrustRadius 71%, n=2,164 and 87%; G2 17.1% and 15.1%; Parseur 27.2%, 46.2%, 96.5%, 56% and 9+ hours; LM 52% and 4% (if described as warehouse/fulfillment); Conexiom 4.7 (44); the Jennifer N., Darlene Bardin and Lynas quotes (restore "with Choco"); Jessica K.'s title; the four BBB complaint summaries.
2. **Use the corrected number or wording:**
   - TrustRadius: 78% of all buyers, or 86% of enterprise buyers.
   - TrustRadius: "most shortlists have 2–3 products".
   - G2: "29% start research with AI search more often than Google".
   - SPS on Capterra: 4.2 (497) as of May 2026.
   - TrueCommerce on Capterra: 4.3 (535) as of May 2026.
   - Walmart: 3% of COGS on non-compliant cases.
   - The $21/$6 figures: credit APQC (2016) and call them worst-performer averages.
3. **Drop, or find a real source:**
   - 75% of POs via email or fax.
   - The 15–25% error rate.
   - $53 per error.
   - 70–80% cost reduction.
   - 8 min to under 60 sec.
   - SPS TCO $50K–$100K+.
   - The 2.9% margin (IFDA says 1.8%).
   - 27,500 and 400,000+ company counts.
   - DocuClipper error rates.
   - The "61% negative on support" label (Capterra attaches 61% to errors and troubleshooting).
4. **How Capterra's sentiment percentages work:** the "X% negative" topic figures are Capterra's AI-generated summaries. They cover only the reviews that mention that topic (SPS pricing: 73 reviews; TrueCommerce costs: 61), and Capterra regenerates them over time. If used, say "of the 73 Capterra reviews that mention pricing, 78% are negative (Capterra AI summary, Oct 2026)", or leave them out.
5. **Review dates:** most of the harshest SPS quotes are from 2019–2023, and the Jennifer N. review is from August 2022. Dating them in the case study ("a 2022 Capterra review") keeps them honest.
6. **Not checked (outside the two tables):**
   - Chargeback table rows other than Walmart and Target.
   - $5B+ chargebacks.
   - $4.41 per $1 chargeback cost.
   - 26% can't quantify losses.
   - The Gartner 2028 prediction.
   - The competitor-table figures (SPS $751M revenue, Conexiom "16 of top 20", etc.).
   - Market-size numbers.
   - The Kirby Risk/Canals.ai and Caraway/Orderful quotes.
   - IFDA 2025 56/52/48%: seen only as cited by Choco; the IFDA report itself wasn't checked.
