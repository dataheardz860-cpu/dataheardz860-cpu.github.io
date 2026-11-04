// PDFMint static site generator.  Usage:  node src/build.mjs   → writes ./site
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import cfg from './config.mjs';
import { strings } from './i18n.mjs';
import { widgets, widgetScripts } from './widgets.mjs';
import { toolGroups, hiTools, sizeTools } from './content/registry.mjs';
import { toolPages } from './content/tools.mjs';
import { landingPages } from './content/landings.mjs';
import { hiPages } from './content/hi.mjs';
import { guides } from './content/guides.mjs';
import { plainPages } from './content/pages.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(SRC, '..', 'site');
const D = cfg.domain.replace(/\/$/, '');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (s) => String(s).replace(/<[^>]+>/g, '');
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

// ── assets & version hash ───────────────────────────────────────────────────
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(path.join(SRC, 'assets'), path.join(OUT, 'assets'), { recursive: true });
fs.cpSync(path.join(SRC, 'static'), OUT, { recursive: true });
const hash = crypto.createHash('sha1');
for (const f of fs.readdirSync(path.join(SRC, 'assets')).sort()) hash.update(fs.readFileSync(path.join(SRC, 'assets', f)));
const VER = hash.digest('hex').slice(0, 8);
const asset = (f) => `/assets/${f}?v=${VER}`;

// ── shared chrome ───────────────────────────────────────────────────────────
function header(p, t) {
  const home = p.lang === 'hi' ? '/hi/' : '/';
  const nav = p.lang === 'hi'
    ? hiTools.map(([href, name]) => [href, name])
    : [['/image-to-pdf/', 'Image to PDF'], ['/word-to-pdf/', 'Word to PDF'], ['/merge-pdf/', 'Merge'], ['/compress-pdf/', 'Compress']];
  nav.push([home + '#tools', t.allTools]);
  const alt = p.alternates && (p.lang === 'hi' ? p.alternates.en : p.alternates.hi);
  return `<header class="site-header"><div class="wrap">
<a class="logo" href="${home}"><img src="/icon.svg" alt="" width="28" height="28">${cfg.siteName}</a>
<nav class="nav" aria-label="Main">${nav.map(([h, n]) => `<a href="${h}"${h === p.path ? ' aria-current="page"' : ''}>${n}</a>`).join('')}${alt ? `<a class="lang" href="${alt}" hreflang="${p.lang === 'hi' ? 'en' : 'hi'}">${p.lang === 'hi' ? 'English' : 'हिंदी'}</a>` : ''}</nav>
</div></header>`;
}

function footer(p, t) {
  // Footer titles are plain text (not headings) so each page's heading outline stays about its own topic.
  const cols = toolGroups.map((g) => `<div><p class="foot-title">${g.name}</p><ul>${g.items.map((i) => `<li><a href="${i.path}">${i.name}</a></li>`).join('')}</ul></div>`).join('');
  return `<footer class="site-footer"><div class="wrap">
<div class="foot-cols">${cols}
<div><p class="foot-title">${t.guides}</p><ul>${guides.slice(0, 5).map((g) => `<li><a href="${g.path}">${g.short}</a></li>`).join('')}<li><a href="/guides/">All guides</a></li></ul></div>
<div><p class="foot-title">${cfg.siteName}</p><ul><li><a href="/about/">${t.about}</a></li><li><a href="/contact/">${t.contact}</a></li><li><a href="/privacy/">${t.privacy}</a></li><li><a href="/terms/">${t.terms}</a></li><li><a href="/hi/">हिंदी</a></li></ul></div>
</div>
<p class="copy">© <span data-year>2026</span> ${cfg.siteName}. ${t.footerLine}</p>
</div></footer>`;
}

function tracking() {
  let s = '';
  if (cfg.plausibleDomain) s += `<script defer data-domain="${esc(cfg.plausibleDomain)}" src="https://plausible.io/js/script.js"></script>\n`;
  if (cfg.gaMeasurementId) s += `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(cfg.gaMeasurementId)}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(cfg.gaMeasurementId)}');</script>\n`;
  if (cfg.adsenseClient) s += `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(cfg.adsenseClient)}" crossorigin="anonymous"></script>\n`;
  if (cfg.googleVerification) s += `<meta name="google-site-verification" content="${esc(cfg.googleVerification)}">\n`;
  return s;
}

function shell(p, body, schema = []) {
  const t = strings[p.lang] || strings.en;
  const url = D + p.path;
  const alts = p.alternates
    ? Object.entries(p.alternates).map(([l, h]) => `<link rel="alternate" hreflang="${l}" href="${D + h}">`).join('\n') +
      `\n<link rel="alternate" hreflang="x-default" href="${D + (p.alternates.en || p.path)}">`
    : '';
  const scripts = (p.scripts || []).map((s) => `<script src="${asset(s)}" defer></script>`).join('\n');
  return `<!doctype html>
<html lang="${p.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
${p.noindex ? '<meta name="robots" content="noindex,follow">' : `<link rel="canonical" href="${url}">\n<meta name="robots" content="index,follow,max-image-preview:large">`}
${alts}
<meta name="theme-color" content="#e5322d">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta property="og:type" content="${p.ogType || 'website'}">
<meta property="og:site_name" content="${cfg.siteName}">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${D}/og-image.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:locale" content="${p.lang === 'hi' ? 'hi_IN' : 'en_US'}">
<meta name="twitter:card" content="summary_large_image">
${p.scripts && p.scripts.length > 1 ? '<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>' : ''}
${p.extraHead || ''}
<link rel="stylesheet" href="${asset('style.css')}">
${schema.length ? ld({ '@context': 'https://schema.org', '@graph': schema }) : ''}
${tracking()}</head>
<body>
${header(p, t)}
<main class="wrap">
${body}
</main>
${footer(p, t)}
<script>window.PDFM_CONFIG=${JSON.stringify({ convertApi: cfg.convertApi || '' })}</script>
<script src="${asset('common.js')}" defer></script>
${scripts}
</body>
</html>
`;
}

function crumbs(list) {
  return {
    html: `<nav class="crumbs" aria-label="Breadcrumb">${list.map(([n, h], i) => (i < list.length - 1 ? `<a href="${h}">${n}</a> › ` : n)).join('')}</nav>`,
    schema: { '@type': 'BreadcrumbList', itemListElement: list.map(([n, h], i) => ({ '@type': 'ListItem', position: i + 1, name: strip(n), item: D + h })) }
  };
}

const faqHtml = (faqs, t) => faqs.length ? `<h2>${t.faq}</h2>` + faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('') : '';
const faqSchema = (faqs) => ({ '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) });

function allToolsByPath() {
  const m = {};
  toolGroups.forEach((g) => g.items.forEach((i) => { m[i.path] = i.name; }));
  hiTools.forEach(([h, n]) => { m[h] = n; });
  sizeTools.forEach(([h, n]) => { m[h] = n; });
  return m;
}
const names = allToolsByPath();

function toolPage(p) {
  const t = strings[p.lang] || strings.en;
  const home = p.lang === 'hi' ? '/hi/' : '/';
  const c = crumbs([[t.home, home], [p.crumb || p.h1, p.path]]);
  const w = widgets[p.widget](t, p.widgetOpts || {}, cfg);
  const features = p.features || [];
  const body = `${c.html}
<section class="hero"><h1>${p.h1}</h1><p>${p.intro}</p></section>
<section class="tool" aria-label="${esc(strip(p.h1))}">
${w}
</section>
<article class="content">
${p.steps ? `<h2>${p.stepsTitle || t.howTo}</h2><ol class="steps">${p.steps.map((s) => `<li>${s}</li>`).join('')}</ol>` : ''}
${features.length ? `<h2>${p.featuresTitle || t.why}</h2><ul class="features">${features.map(([a, b]) => `<li><strong>${a}</strong>${b}</li>`).join('')}</ul>` : ''}
${p.body || ''}
${faqHtml(p.faqs || [], t)}
${p.related ? `<h2>${t.related}</h2><ul class="related">${p.related.map((h) => `<li><a href="${h}">${names[h] || h}</a></li>`).join('')}</ul>` : ''}
</article>`;
  const schema = [
    {
      '@type': 'WebApplication', name: strip(p.h1), url: D + p.path, description: p.description,
      applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript',
      inLanguage: p.lang, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@type': 'Organization', name: cfg.siteName, url: D + '/' }
    },
    c.schema
  ];
  if (p.faqs && p.faqs.length) schema.push(faqSchema(p.faqs));
  const scripts = [widgetScripts[p.widget]];
  return shell({ ...p, scripts }, body, schema);
}

function guidePage(g) {
  const t = strings.en;
  const c = crumbs([[t.home, '/'], [t.guides, '/guides/'], [g.short, g.path]]);
  const body = `${c.html}
<article class="content" style="margin-top:20px">
<h1>${g.h1}</h1>
<p class="byline">By the ${cfg.siteName} team · Updated ${new Date(g.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · ${g.minutes} min read</p>
${g.body}
${faqHtml(g.faqs || [], t)}
${g.related ? `<h2>Tools mentioned</h2><ul class="related">${g.related.map((h) => `<li><a href="${h}">${names[h] || h}</a></li>`).join('')}</ul>` : ''}
</article>`;
  const schema = [
    {
      '@type': 'Article', headline: g.h1, description: g.description, datePublished: g.published, dateModified: g.updated,
      mainEntityOfPage: D + g.path, image: D + '/og-image.png',
      author: { '@type': 'Organization', name: cfg.siteName, url: D + '/about/' },
      publisher: { '@type': 'Organization', name: cfg.siteName, logo: { '@type': 'ImageObject', url: D + '/icon-512.png' } }
    },
    c.schema
  ];
  if (g.faqs && g.faqs.length) schema.push(faqSchema(g.faqs));
  return shell({ ...g, lang: 'en', ogType: 'article' }, body, schema);
}

function plainPage(p) {
  const t = strings[p.lang || 'en'];
  const body = typeof p.body === 'function' ? p.body({ cfg, t, toolGroups, guides, hiTools }) : p.body;
  return shell({ lang: 'en', ...p }, body, p.schema ? p.schema({ D, cfg }) : []);
}

// ── write pages ─────────────────────────────────────────────────────────────
const pages = [];
function write(p, html) {
  const file = p.path.endsWith('.html') ? path.join(OUT, p.path) : path.join(OUT, p.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  pages.push(p);
}
const all = [...toolPages, ...landingPages, ...hiPages];
const seen = new Set();
for (const p of all) {
  if (seen.has(p.path)) throw new Error('Duplicate path ' + p.path);
  seen.add(p.path);
  write(p, toolPage({ lang: 'en', ...p }));
}
for (const g of guides) write(g, guidePage(g));
for (const p of plainPages) write({ lang: 'en', ...p }, plainPage(p));

// ── sitemap, robots, manifest, sw, headers ──────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
const sm = pages.filter((p) => !p.noindex).map((p) => {
  const alts = p.alternates ? Object.entries(p.alternates).map(([l, h]) => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${D + h}"/>`).join('') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${D + p.alternates.en}"/>` : '';
  return `  <url>\n    <loc>${D + p.path}</loc>\n    <lastmod>${p.updated || today}</lastmod>${alts}\n  </url>`;
});
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sm.join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${D}/sitemap.xml\n`);

const manifest = {
  id: '/', name: `${cfg.siteName} – Free PDF Converter`, short_name: cfg.siteName,
  description: 'Convert, merge, compress and sign PDFs on your device. Free and private.',
  start_url: '/?source=pwa', scope: '/', display: 'standalone', background_color: '#f7f8fb', theme_color: '#e5322d',
  categories: ['productivity', 'utilities'],
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }
  ],
  shortcuts: [
    { name: 'Image to PDF', url: '/image-to-pdf/', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
    { name: 'Merge PDF', url: '/merge-pdf/', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
    { name: 'Compress PDF', url: '/compress-pdf/', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
    { name: 'Scan to PDF', url: '/scan-to-pdf/', icons: [{ src: '/icon-192.png', sizes: '192x192' }] }
  ],
  share_target: {
    action: '/share-target/', method: 'POST', enctype: 'multipart/form-data',
    params: { files: [{ name: 'files', accept: ['image/*', 'application/pdf', '.pdf'] }] }
  }
};
fs.writeFileSync(path.join(OUT, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2));

const core = ['/', '/offline/', asset('style.css'), asset('common.js'), '/icon.svg', '/icon-192.png',
  ...toolPages.map((p) => p.path), ...Object.values(widgetScripts).map(asset)];
const sw = fs.readFileSync(path.join(SRC, 'sw.template.js'), 'utf8')
  .replace('__VERSION__', VER)
  .replace('__CORE__', JSON.stringify([...new Set(core)]));
fs.writeFileSync(path.join(OUT, 'sw.js'), sw);

fs.writeFileSync(path.join(OUT, '_headers'), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(self), microphone=(), geolocation=()
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/sw.js
  Cache-Control: no-cache
`);

if (cfg.adsenseClient) fs.writeFileSync(path.join(OUT, 'ads.txt'), `google.com, ${cfg.adsenseClient.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);
if (cfg.android.sha256Fingerprint) {
  fs.mkdirSync(path.join(OUT, '.well-known'), { recursive: true });
  fs.writeFileSync(path.join(OUT, '.well-known', 'assetlinks.json'), JSON.stringify([{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: { namespace: 'android_app', package_name: cfg.android.packageName, sha256_cert_fingerprints: [cfg.android.sha256Fingerprint] }
  }], null, 2));
}

console.log(`Built ${pages.length} pages into ${path.relative(process.cwd(), OUT) || OUT} (assets v${VER})`);
if (cfg.domain.includes('yourdomain.com')) console.log('⚠  Set your real domain in src/config.mjs before deploying.');
