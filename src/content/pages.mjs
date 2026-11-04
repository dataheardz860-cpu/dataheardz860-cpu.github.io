// Home, Hindi home, guides index and trust pages.
import { sizeTools } from './registry.mjs';

const card = (i) => `<a class="card" href="${i.path}"><div class="ico">${i.ico}</div><h3>${i.name}</h3><p>${i.desc}</p></a>`;
const article = (inner) => `<article class="content" style="margin-top:28px">${inner}</article>`;
const updated = 'November 2026';

export const plainPages = [
  {
    path: '/', alternates: { en: '/', hi: '/hi/' },
    title: 'PDFMint – Free PDF Tools: JPG & Word to PDF, Merge, Compress',
    description: 'Free online PDF tools that run on your device: convert images and Word to PDF, merge, split, compress, sign and watermark PDFs. No upload, no sign-up.',
    body: ({ toolGroups, guides }) => `<section class="hero"><h1>Free PDF Tools – Fast, Simple &amp; Private</h1>
<p>Convert, merge, compress and sign PDFs in seconds. Everything runs in your browser, so your files never leave your device.</p></section>
<div id="tools">${toolGroups.map((g) => `<h2 class="group-title">${g.name}</h2><section class="grid">${g.items.map(card).join('')}</section>`).join('')}</div>
<article class="content">
<h2>Popular for online forms</h2>
<ul class="related">${sizeTools.map(([h, n]) => `<li><a href="${h}">${n}</a></li>`).join('')}</ul>
<h2>Why choose PDFMint?</h2>
<ul class="features">
<li><strong>Your files stay private</strong>Conversion happens on your device. We never upload, see or store your documents.</li>
<li><strong>Completely free</strong>No account, no watermark, no trial and no file limits.</li>
<li><strong>Fast</strong>No waiting for uploads — PDFs are created instantly.</li>
<li><strong>Install as an app</strong>Add PDFMint to your home screen and use it like an app, even offline.</li>
</ul>
<h2>Guides</h2>
<ul>${guides.map((g) => `<li><a href="${g.path}">${g.h1}</a></li>`).join('')}</ul>
<h2>Frequently asked questions</h2>
<details><summary>Is PDFMint really free?</summary><p>Yes. All tools are free to use with no sign-up and no watermark.</p></details>
<details><summary>Do you keep my files?</summary><p>No. Files are processed in your browser and are never sent to our servers.</p></details>
<details><summary>Does PDFMint work offline?</summary><p>Yes. After your first visit, install PDFMint from your browser menu (“Install app” or “Add to Home screen”) and the tools you've opened keep working offline.</p></details>
</article>`,
    schema: ({ D, cfg }) => [
      { '@type': 'WebSite', name: cfg.siteName, url: D + '/', inLanguage: ['en', 'hi'] },
      { '@type': 'Organization', name: cfg.siteName, url: D + '/', logo: D + '/icon-512.png', email: cfg.email }
    ]
  },
  {
    path: '/hi/', lang: 'hi', alternates: { en: '/', hi: '/hi/' },
    title: 'PDFMint – मुफ़्त PDF टूल: फोटो से PDF, Word से PDF, PDF छोटा करें',
    description: 'मुफ़्त ऑनलाइन PDF टूल जो आपके डिवाइस पर चलते हैं: फोटो और Word को PDF में बदलें, PDF जोड़ें और छोटा करें। कोई अपलोड नहीं, कोई साइन-अप नहीं।',
    body: ({ hiTools, hiExtra }) => `<section class="hero"><h1>मुफ़्त PDF टूल – तेज़, आसान और सुरक्षित</h1>
<p>फोटो और Word फ़ाइल को PDF में बदलें, PDF जोड़ें और छोटा करें। सब कुछ आपके ब्राउज़र में होता है — फ़ाइलें आपके डिवाइस से बाहर नहीं जातीं।</p></section>
<section class="grid" id="tools">${hiTools.concat(hiExtra).map(([h, n]) => `<a class="card" href="${h}"><div class="ico">PDF</div><h2>${n}</h2></a>`).join('')}</section>
<article class="content"><h2>सभी टूल (English)</h2><p>PDF को साइन करना, वॉटरमार्क, पेज नंबर, PDF से JPG और भी कई टूल <a href="/" hreflang="en">English वेबसाइट</a> पर उपलब्ध हैं।</p>
<h2>PDFMint क्यों?</h2><ul class="features"><li><strong>100% सुरक्षित</strong>फ़ाइलें किसी सर्वर पर अपलोड नहीं होतीं।</li><li><strong>बिल्कुल मुफ़्त</strong>कोई अकाउंट या वॉटरमार्क नहीं।</li><li><strong>ऐप की तरह</strong>ब्राउज़र मेन्यू से “Add to Home screen” करें।</li></ul></article>`
  },
  {
    path: '/guides/',
    title: 'PDF Guides – How to Convert, Compress, Merge & Sign PDFs | PDFMint',
    description: 'Simple, practical guides for everyday PDF tasks: reducing file size, converting photos on your phone, merging, signing and more.',
    body: ({ guides }) => `<nav class="crumbs"><a href="/">Home</a> › Guides</nav>
<section class="hero"><h1>PDF Guides</h1><p>Practical, step-by-step help for everyday PDF jobs.</p></section>
<section class="grid">${guides.map((g) => `<a class="card" href="${g.path}"><h2>${g.h1}</h2><p>${g.description}</p></a>`).join('')}</section>`
  },
  {
    path: '/about/',
    title: 'About PDFMint – Free, Private PDF Tools',
    description: 'PDFMint makes free PDF tools that run entirely in your browser, so your documents stay private. Learn how and why we built it.',
    body: ({ cfg }) => article(`<h1>About ${cfg.siteName}</h1>
<p>${cfg.siteName} is a set of free PDF tools built around one idea: <strong>your documents should never have to leave your device</strong>.</p>
<p>Most online PDF converters upload your files to their servers. That's a real concern when the files are ID cards, bank statements, contracts or medical reports. ${cfg.siteName} does the work inside your own web browser instead, using modern open-source libraries. It is faster (no upload or download wait), it works offline once installed, and nobody — including us — can see your files.</p>
<h2>What you can do</h2>
<p>Convert images, Word documents, text and HTML to PDF; turn PDFs into JPG or PNG; merge, split, compress, rotate and reorder pages; and sign, watermark or number your documents.</p>
<h2>How it's free</h2>
<p>Because the work happens on your device, running ${cfg.siteName} costs very little. We may show a small number of ads to cover hosting. We will never sell your data — we don't have it.</p>
<h2>Open-source thanks</h2>
<p>${cfg.siteName} is built with pdf-lib, PDF.js (Mozilla), jsPDF, Mammoth, html2pdf.js, JSZip and heic2any.</p>
<p>Questions or suggestions? <a href="/contact/">Contact us</a>.</p>`)
  },
  {
    path: '/contact/',
    title: 'Contact PDFMint',
    description: 'Get in touch with the PDFMint team for questions, feedback, bug reports or feature requests.',
    body: ({ cfg }) => article(`<h1>Contact us</h1>
<p>We'd love to hear from you — whether it's a bug, a feature idea, or a tool you wish existed.</p>
<p><strong>Email:</strong> <a href="mailto:${cfg.email}">${cfg.email}</a></p>
<p>When reporting a problem, please tell us which tool you used, your device and browser, and what happened. <strong>Please don't email confidential documents</strong> — describe the issue instead.</p>
<p>We usually reply within two working days.</p>`)
  },
  {
    path: '/privacy/',
    title: 'Privacy Policy | PDFMint',
    description: 'PDFMint privacy policy. Your files are processed in your browser and are never uploaded to our servers.',
    body: ({ cfg }) => article(`<h1>Privacy Policy</h1>
<p><em>Last updated: ${updated}</em></p>
<h2>Your files</h2>
<p>All ${cfg.siteName} tools process files locally in your web browser. The documents and images you select are not uploaded to, stored on, or viewed by our servers.${cfg.convertApi ? ` <strong>Exception:</strong> if you choose “Exact layout (secure server)” in Word to PDF, your document is sent over an encrypted connection to our conversion server, converted, returned to you, and deleted immediately. It is not stored or viewed.` : ''}</p>
<h2>Information we collect</h2>
<p>Our hosting provider keeps standard server logs (such as IP address, browser type and pages requested) for security and performance.${cfg.plausibleDomain ? ' We use Plausible Analytics, which counts visits without cookies and without collecting personal data.' : ''}${cfg.gaMeasurementId ? ' We use Google Analytics to understand how the site is used; it may set cookies. You can opt out with the Google Analytics opt-out browser add-on.' : ''}</p>
${cfg.adsenseClient ? `<h2>Advertising</h2><p>We show ads through Google AdSense. Google and its partners may use cookies to show ads based on your visits to this and other sites. You can manage personalised ads at <a href="https://adssettings.google.com" rel="nofollow">Google Ads Settings</a>. Learn more at <a href="https://policies.google.com/technologies/ads" rel="nofollow">How Google uses information from sites that use its services</a>.</p>` : ''}
<h2>Third-party code</h2>
<p>Conversion libraries are loaded from public content delivery networks (cdnjs by Cloudflare and jsDelivr), and the Sign PDF tool loads fonts from Google Fonts. These providers may log basic request information such as your IP address.</p>
<h2>Local storage</h2>
<p>If you install ${cfg.siteName} as an app, your browser stores the site's code for offline use. Files shared to the app from your phone are kept only until the tool opens them.</p>
<h2>Children</h2>
<p>${cfg.siteName} does not knowingly collect personal information from anyone, including children.</p>
<h2>Changes and contact</h2>
<p>We'll update this page if anything changes. Questions? Email <a href="mailto:${cfg.email}">${cfg.email}</a>.</p>`)
  },
  {
    path: '/terms/',
    title: 'Terms of Use | PDFMint',
    description: 'Terms of use for PDFMint\'s free online PDF tools: acceptable use, no-warranty terms, electronic signatures and contact details.',
    body: ({ cfg }) => article(`<h1>Terms of Use</h1>
<p><em>Last updated: ${updated}</em></p>
<p>By using ${cfg.siteName} you agree to these terms.</p>
<h2>Using the tools</h2>
<p>${cfg.siteName} is free for personal and commercial use. You are responsible for the files you process and for making sure you have the right to use, modify and share them. Don't use ${cfg.siteName} for anything illegal, including forging documents or signatures.</p>
<h2>No warranty</h2>
<p>The tools are provided “as is”. We work hard to make them reliable, but we can't guarantee that every file will convert perfectly. Always check the result before relying on it, and keep your original files.</p>
<h2>Limitation of liability</h2>
<p>To the extent permitted by law, ${cfg.siteName} is not liable for any loss or damage arising from use of the tools.</p>
<h2>Electronic signatures</h2>
<p>The Sign PDF tool adds a visual signature image. Whether it is legally valid for a particular document depends on your local laws and the recipient's requirements.</p>
<h2>Changes</h2>
<p>We may update these terms; continued use means you accept the updated terms. Contact: <a href="mailto:${cfg.email}">${cfg.email}</a>.</p>`)
  },
  {
    path: '/404.html', noindex: true,
    title: 'Page not found | PDFMint',
    description: 'The page you were looking for does not exist.',
    body: ({ toolGroups }) => `<section class="hero"><h1>Page not found</h1><p>Sorry, that page doesn't exist. Try one of our tools:</p></section>
<section class="grid">${toolGroups[0].items.slice(0, 2).concat(toolGroups[2].items.slice(0, 3)).map(card).join('')}</section>`
  },
  {
    path: '/offline/', noindex: true,
    title: 'You are offline | PDFMint',
    description: 'You are offline.',
    body: `<section class="hero"><h1>You're offline</h1><p>This page hasn't been saved for offline use yet. Tools you've opened before still work — try <a href="/image-to-pdf/">Image to PDF</a>, <a href="/merge-pdf/">Merge PDF</a> or <a href="/compress-pdf/">Compress PDF</a>.</p></section>`
  }
];
