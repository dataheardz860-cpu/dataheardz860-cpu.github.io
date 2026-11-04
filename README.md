# PDFMint — free, private PDF tools

A static website (no backend needed) with 19 PDF tools, 45 SEO pages (English + Hindi), guides, and an installable app (PWA). All conversions run in the visitor's browser.

## Folder layout

| Path | What it is |
|---|---|
| `src/config.mjs` | **Edit first:** site name, domain, email, analytics, AdSense, Word server, Android app |
| `src/content/` | All page text: `tools.mjs` (main tools), `landings.mjs` (search-targeted pages), `hi.mjs` (Hindi), `guides.mjs`, `pages.mjs` (home, about, privacy…) , `registry.mjs` (tool list) |
| `src/widgets.mjs` | The interactive area of each tool |
| `src/assets/` | CSS and one JavaScript file per tool |
| `src/static/` | Icons and social share image (copied as-is) |
| `src/build.mjs` | Generator → writes the finished site to `site/` |
| `site/` | **Generated — this is what you deploy.** Don't edit by hand. |
| `server/` | Optional exact-layout Word → PDF server (LibreOffice, Docker) |
| `app/` | How to publish to Google Play / App Store |
| `LAUNCH.md` | SEO, launch and growth checklist |

## Build and preview

```bash
node src/build.mjs
```
```bash
python -m http.server 8765 -d site
```
Then open http://localhost:8765. Requires Node.js 18+ (no npm packages needed).

## Deploy (free)

**Cloudflare Pages** (recommended — fast in India and worldwide):
1. Push this folder to a GitHub repository.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repo.
3. Build command: `node src/build.mjs` · Output directory: `site`.
4. Add your custom domain under the project's **Custom domains** tab.

**Netlify** works the same way (build command `node src/build.mjs`, publish directory `site`). Both read the generated `_headers` file for caching and security headers.

## Add a new page

- New search-targeted page for an existing tool → add an object to `src/content/landings.mjs` (copy an existing one, change `path`, `title`, `description`, `h1`, `intro`, `faqs`). Add it to `registry.mjs` if it should appear on the home page.
- New tool → add a widget in `widgets.mjs`, its script in `src/assets/`, map it in `widgetScripts`, then add the page in `tools.mjs` and `registry.mjs`.
- Rebuild. The sitemap, footer links and service worker update automatically.

## Libraries (loaded from CDN only when a tool is used)

pdf-lib 1.17.1 · PDF.js 3.11.174 · jsPDF 2.5.1 · Mammoth 1.6.0 · html2pdf.js 0.10.1 · JSZip 3.10.1 · heic2any 0.0.4

## Known limits

- Browser Word conversion keeps headings, lists, tables and images but not complex layouts; its PDF text isn't selectable. Deploy `server/` for exact output.
- Compress “Recommended/Strong/Extreme” turn pages into images (text not selectable); “Light” keeps text but saves less.
- Password-protected PDFs aren't supported (protect/unlock would need a server-side tool such as qpdf).
- On Hindi pages, the progress/status messages are still in English.
- Sign PDF and page numbers assume pages are not rotated in the original file.
