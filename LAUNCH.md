# Launch & ranking playbook

Ranking is earned over months, not set in code. The site is technically ready; this is the work that moves it up Google.

## Week 0 — before going live
- [ ] Pick a brand + domain. Short, easy to spell, ideally `.com` or `.in`. Then replace **PDFMint** and the domain in `src/config.mjs` (brand name also appears in `src/content/*.mjs` text — search and replace).
- [ ] Set `email` to a real inbox (Zoho Mail or Cloudflare Email Routing are free).
- [ ] Deploy (see README), connect the domain, check `https://yourdomain.com/sitemap.xml` loads.
- [ ] Test every tool on a real Android phone and an iPhone.

## Week 1 — get indexed
- [ ] **Google Search Console**: add the domain property, verify (DNS or put the code in `googleVerification`), submit `sitemap.xml`, then use **URL Inspection → Request indexing** for the home page and the top 10 tools.
- [ ] **Bing Webmaster Tools**: import from Search Console (also feeds DuckDuckGo, Yahoo, ChatGPT search).
- [ ] Turn on analytics: `plausibleDomain` (no cookie banner needed) or `gaMeasurementId`.
- [ ] Run https://pagespeed.web.dev on the home page and a tool page — aim for 90+ on mobile.

## Weeks 1–4 — first links and users
Directory and launch listings (each is a real link and real visitors):
- [ ] AlternativeTo — list as an alternative to iLovePDF, Smallpdf, Sejda.
- [ ] Product Hunt launch (Tuesday–Thursday). Tagline idea: *“Free PDF tools that never upload your files.”*
- [ ] SaaSHub, Futurepedia-style tool directories, “There's An AI/Tool For That” type lists, free-tools roundups.
- [ ] Reddit: answer real questions in r/pdf, r/Students, r/IndiaTech, r/androidapps — help first, link only when relevant. Never spam.
- [ ] Quora: answer “how to reduce PDF size to 100 KB”, “how to convert photo to PDF on phone”, etc.
- [ ] YouTube Shorts / Instagram Reels: 30-second “how to make a PDF under 100 KB for exam forms” videos. This audience is huge in India.

Short listing description you can paste:
> PDFMint is a free set of PDF tools — image to PDF, Word to PDF, merge, split, compress (even to an exact size like 100 KB), sign and watermark. Everything runs in your browser, so files are never uploaded. No sign-up, no watermark, works on phones and installs as an app.

## Months 1–6 — content that ranks
Realistic targets for a new site are **long-tail searches** with clear intent. Pages already built for these:

| Search | Page |
|---|---|
| jpg to pdf under 100 kb / 200 kb | `/jpg-to-pdf-under-100kb/`, `/jpg-to-pdf-under-200kb/` |
| compress pdf to 100 kb / 200 kb / 500 kb / 1 mb | `/compress-pdf-to-…/` |
| aadhaar card to pdf | `/aadhaar-card-to-pdf/` |
| heic to pdf | `/heic-to-pdf/` |
| resume to pdf | `/resume-to-pdf/` |
| photo se pdf kaise banaye / pdf ka size kaise kam kare | `/hi/…` pages |

Next pages to add (one or two a week, each with genuinely useful, unique text):
- jpg to pdf under 50 kb, 300 kb, 500 kb · compress pdf to 50 kb, 300 kb, 2 mb
- pan card to pdf · passport photo to pdf · marksheet to pdf · signature to pdf (for exam forms)
- More Hindi pages (sign, split, pdf to jpg), then Marathi, Bengali, Tamil, Telugu
- Guides answering real questions: “why is my PDF rejected by the portal”, “how to upload documents for <popular exam> form” (keep instructions accurate and updated)

## Ongoing
- Every month in Search Console → Performance: find queries where you rank 8–20 and improve those pages (better intro, a FAQ for that exact question, internal links from related pages).
- Reply to user emails; turn common questions into FAQs or guides.
- Earn links: write a genuinely useful guide (e.g. a table of document size limits for common Indian application portals, checked and dated) that others want to cite.
- Don't buy links or publish auto-generated pages in bulk — that's the fastest way to get penalised.

## Money (when traffic is steady, ~1,000+ visits/day)
- Apply for **Google AdSense** with About, Contact, Privacy and Terms in place (already built). Set `adsenseClient` in config; `ads.txt` is generated automatically. Use Auto ads at a light density so tools stay usable.
- If you serve visitors from the EU/UK with personalised ads, Google requires a certified consent banner (CMP) — AdSense offers one in its Privacy & messaging section.
- Later: optional paid features (batch processing, OCR, exact Word conversion without limits).

## Honest expectations
For head terms like “word to pdf” or “jpg to pdf”, the top results belong to sites with 10+ years of history and millions of backlinks. Expect long-tail and Hindi pages to start getting traffic in 2–4 months, and the bigger keywords to become possible only after a year or more of steady content and links.
