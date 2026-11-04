// Pages aimed at specific searches. Each reuses a tool with its own copy and presets.
import { PRIVATE, FREE, DEVICES } from './tools.mjs';

const imgSteps = (first) => [
  first,
  '<strong>Arrange the pages.</strong> Drag thumbnails or use the arrows to set the order.',
  '<strong>Convert.</strong> Click “Convert to PDF” — the file downloads straight to your device.'
];

function jpgUnder(kb, uses) {
  return {
    path: `/jpg-to-pdf-under-${kb}kb/`, widget: 'image', widgetOpts: { target: String(kb), margin: 0 },
    title: `JPG to PDF Under ${kb} KB – Convert & Reduce Size Free | PDFMint`,
    description: `Convert JPG or photos to a PDF under ${kb} KB for online forms. PDFMint automatically shrinks the file to fit. Free, no upload, no watermark.`,
    h1: `JPG to PDF Under ${kb} KB`, crumb: `JPG to PDF under ${kb} KB`,
    intro: `Many upload forms reject PDFs larger than ${kb} KB. Add your photos or scans below — the maximum size is already set to ${kb} KB, so the PDF is automatically compressed to fit.`,
    steps: imgSteps('<strong>Add your JPG photos or scans.</strong> Select files or use the camera.'),
    features: [[`Guaranteed under ${kb} KB`, `We try progressively smaller settings and stop at the sharpest version that is below ${kb} KB.`], PRIVATE, FREE, DEVICES],
    body: `<h2>Tips for staying under ${kb} KB</h2>
<ul><li>Crop photos to just the document before adding them — less background means more detail where it matters.</li>
<li>Take the photo in good light; dark, grainy photos compress badly.</li>
<li>Put fewer pages in each PDF. ${kb <= 100 ? 'At 100 KB, one or two pages give the most readable result.' : 'At 200 KB, up to three or four pages usually stay readable.'}</li></ul>
<p>${uses}</p>
<p>Already have a PDF that's too big? Use <a href="/compress-pdf-to-${kb}kb/">compress PDF to ${kb} KB</a>.</p>`,
    faqs: [
      [`Will the PDF really be under ${kb} KB?`, `In almost all cases, yes. If you add many large photos, the tool will tell you if it could not get under ${kb} KB while keeping them readable — then split them into two PDFs.`],
      ['Will the text in my document still be readable?', 'Yes for typical documents and ID cards. The tool keeps the highest quality that fits the limit.'],
      ['Is it free and private?', 'Yes. Everything happens in your browser and nothing is uploaded.']
    ],
    related: [kb === 100 ? '/jpg-to-pdf-under-200kb/' : '/jpg-to-pdf-under-100kb/', `/compress-pdf-to-${kb}kb/`, '/image-to-pdf/', '/aadhaar-card-to-pdf/']
  };
}

function compressTo(kb, label, note) {
  return {
    path: `/compress-pdf-to-${label.toLowerCase().replace(' ', '')}/`, widget: 'compress', widgetOpts: { target: String(kb) },
    title: `Compress PDF to ${label} – Reduce PDF Size Online Free | PDFMint`,
    description: `Reduce your PDF to ${label} or less in one click. Ideal for online forms and email limits. Free, private — the file never leaves your device.`,
    h1: `Compress PDF to ${label}`, crumb: `Compress PDF to ${label}`,
    intro: `Upload limit of ${label}? Drop your PDF below — the target is already set to ${label}, and PDFMint finds the best quality that fits.`,
    steps: [
      '<strong>Choose your PDF.</strong> Select or drop the file.',
      `<strong>Check the target.</strong> It is preset to ${label}; change it if your form needs something else.`,
      '<strong>Compress.</strong> Click “Compress PDF” and see the new size before it downloads.'
    ],
    features: [[`Fits ${label}`, `Progressively stronger settings are tried until the file is under ${label}.`], PRIVATE, FREE, DEVICES],
    body: `<h2>Why ${label}?</h2><p>${note}</p>
<h2>If it won't go small enough</h2>
<ul><li>Split long documents with <a href="/split-pdf/">Split PDF</a> and upload the parts separately, if allowed.</li>
<li>Delete blank or unnecessary pages with <a href="/delete-pdf-pages/">Delete PDF pages</a>.</li>
<li>For photos, start again from the images with <a href="/image-to-pdf/">Image to PDF</a> and a size limit.</li></ul>`,
    faqs: [
      [`How do I compress a PDF to ${label}?`, `Drop your PDF in the box above and click “Compress PDF”. The target is set to ${label}, so the result will be ${label} or smaller whenever possible.`],
      ['Will the PDF still be readable?', 'Yes for most documents. Very long PDFs squeezed into a small size lose sharpness, so split them if needed.'],
      ['Is my document uploaded?', 'No. Compression runs entirely in your browser.']
    ],
    related: ['/compress-pdf/', '/compress-pdf-to-100kb/', '/compress-pdf-to-200kb/', '/compress-pdf-to-500kb/', '/compress-pdf-to-1mb/'].filter((x) => !x.includes(label.toLowerCase().replace(' ', '')))
  };
}

export const landingPages = [
  {
    path: '/jpg-to-pdf/', widget: 'image',
    title: 'JPG to PDF – Convert JPG to PDF Free, No Upload | PDFMint',
    description: 'Convert JPG to PDF free in seconds. Combine many photos into one PDF, set A4 size and even a max file size like 100 KB. No upload, no watermark, no sign-up.',
    h1: 'JPG to PDF Converter', crumb: 'JPG to PDF',
    intro: 'Combine one or many JPG photos into a single PDF. Reorder pages, pick A4 or Letter, and set a maximum file size for upload forms — your photos never leave your device.',
    steps: imgSteps('<strong>Select your JPG files.</strong> Pick one or many — you can add more later, or tap “Use camera” on your phone.'),
    stepsTitle: 'How to convert JPG to PDF',
    features: [PRIVATE, FREE, ['Set a size limit', 'Choose 100 KB, 200 KB or 1 MB and the PDF is shrunk automatically to fit online forms.'], ['Original colours', 'JPG photos keep their colours and sharpness at “High” quality.'], ['No app needed', 'Works in Chrome, Safari, Edge and Firefox on phone or computer.'], DEVICES],
    featuresTitle: 'Why convert JPG to PDF with PDFMint?',
    body: `<h2>JPG to PDF on your phone</h2>
<p><strong>Android:</strong> open this page in Chrome, tap <em>Select images</em> and choose photos from your gallery (tap and hold to select several), or tap <em>Use camera</em> to photograph pages directly. The PDF is saved to your <em>Downloads</em> folder.</p>
<p><strong>iPhone:</strong> open this page in Safari and tap <em>Select images → Photo Library</em>. iPhone photos are often HEIC rather than JPG — that's fine, they are converted automatically. The PDF goes to the <em>Files</em> app (Downloads).</p>
<h2>JPG to PDF on Windows or Mac</h2>
<p>No software to install: drag JPG files from File Explorer or Finder straight into the box above. Windows can also “Microsoft Print to PDF” and Mac Preview can export to PDF, but neither lets you control the file size or merge many photos as easily.</p>
<h2>Which settings should I use?</h2>
<div class="table-wrap"><table>
<tr><th>You're making…</th><th>Page size</th><th>Margin</th><th>Max file size</th></tr>
<tr><td>Exam or job application upload</td><td>A4</td><td>Small</td><td>100–200 KB (check the form)</td></tr>
<tr><td>ID card or certificate copy</td><td>A4</td><td>Small</td><td>200 KB</td></tr>
<tr><td>Photo album or portfolio</td><td>Same as image</td><td>None</td><td>No limit, “High” quality</td></tr>
<tr><td>Notes or receipts for printing</td><td>A4 or Letter</td><td>Small</td><td>1 MB</td></tr>
</table></div>
<p>Need a strict limit? Use <a href="/jpg-to-pdf-under-100kb/">JPG to PDF under 100 KB</a> or <a href="/jpg-to-pdf-under-200kb/">under 200 KB</a>, where the limit is preset.</p>
<h2>Tips for a clear, small PDF</h2>
<ul><li>Crop photos to just the document before adding them.</li><li>Take photos in daylight, holding the phone straight above the page.</li><li>Put pages in order before converting — drag the thumbnails or use the arrows.</li><li>If the PDF is still too big, split it into two files or remove blank pages.</li></ul>
<h2>JPG vs JPEG</h2><p>They are the same format — “JPEG” is the full name and “.jpg” is the shorter file extension. Both work here. For PNG screenshots use <a href="/png-to-pdf/">PNG to PDF</a>; for iPhone photos use <a href="/heic-to-pdf/">HEIC to PDF</a>. To go the other way, use <a href="/pdf-to-jpg/">PDF to JPG</a>.</p>`,
    faqs: [
      ['Can I convert multiple JPGs into one PDF?', 'Yes. Select all of them at once; each image becomes one page, in the order you choose.'],
      ['How do I make a JPG to PDF under 100 KB?', 'Set “Maximum file size” to 100 KB before clicking Convert. PDFMint lowers the resolution and quality step by step until the PDF fits.'],
      ['Is it safe to convert ID cards and certificates here?', 'Yes. Conversion happens in your browser and your photos are never uploaded to any server.'],
      ['Will the PDF have a watermark?', 'No. PDFMint never adds watermarks, and there is no sign-up or limit.'],
      ['Can I convert JPG to PDF without an app?', 'Yes. It works in any modern mobile or desktop browser — nothing to install.'],
      ['How many JPGs can I put in one PDF?', 'There is no fixed limit. Dozens of photos work fine; very large batches depend on your device\'s memory.']
    ],
    related: ['/jpg-to-pdf-under-100kb/', '/jpg-to-pdf-under-200kb/', '/png-to-pdf/', '/heic-to-pdf/', '/pdf-to-jpg/', '/merge-pdf/', '/compress-pdf/']
  },
  {
    path: '/png-to-pdf/', widget: 'image',
    title: 'PNG to PDF – Convert PNG Screenshots to PDF Free | PDFMint',
    description: 'Convert PNG images and screenshots to PDF for free. Transparent backgrounds become white for clean printing. No upload, no watermark.',
    h1: 'PNG to PDF Converter', crumb: 'PNG to PDF',
    intro: 'Turn PNG screenshots, diagrams and graphics into a PDF. Transparent areas become white so the PDF prints cleanly.',
    steps: imgSteps('<strong>Select your PNG files.</strong> Screenshots, charts, designs — any PNG.'),
    features: [PRIVATE, FREE, ['Transparency handled', 'See-through areas are filled with white.'], ['Keep screenshots sharp', 'Choose “Same as image” page size to avoid any resizing.']],
    faqs: [['Will my PNG lose quality?', 'Choose “High” quality to keep screenshots crisp. The “Same as image” page size keeps the original dimensions.'], ['Can I mix PNG and JPG?', 'Yes. You can combine any supported image types in one PDF.']],
    related: ['/jpg-to-pdf/', '/pdf-to-png/', '/image-to-pdf/', '/merge-pdf/']
  },
  {
    path: '/heic-to-pdf/', widget: 'image',
    title: 'HEIC to PDF – Convert iPhone Photos to PDF Free | PDFMint',
    description: 'Convert HEIC and HEIF photos from your iPhone to PDF free, on any device — even Windows and Android. No upload, no app needed.',
    h1: 'HEIC to PDF Converter', crumb: 'HEIC to PDF',
    intro: 'iPhones save photos as HEIC, which many websites don\'t accept. Convert HEIC photos straight to PDF here — it works on Windows, Android and Mac.',
    steps: imgSteps('<strong>Select your HEIC photos.</strong> Files ending in .heic or .heif.'),
    features: [PRIVATE, FREE, ['No settings change', 'No need to switch your iPhone camera to “Most Compatible”.'], DEVICES],
    body: '<h2>What is HEIC?</h2><p>HEIC (High Efficiency Image Container) is the default photo format on iPhones since iOS 11. It saves space but isn\'t supported everywhere, so converting to PDF (or JPG) makes your photos easy to share and upload.</p>',
    faqs: [['Why does HEIC conversion take a moment?', 'On non-Apple devices, HEIC is decoded in your browser, which takes a second or two per photo.'], ['Is it private?', 'Yes. Photos are decoded and converted on your device.']],
    related: ['/jpg-to-pdf/', '/image-to-pdf/', '/scan-to-pdf/']
  },
  {
    path: '/scan-to-pdf/', widget: 'image', widgetOpts: { margin: 0 },
    title: 'Scan to PDF – Scan Documents with Your Phone Camera Free | PDFMint',
    description: 'Scan documents to PDF using your phone camera — no app needed. Take photos of each page and save them as one PDF. Free and private.',
    h1: 'Scan Documents to PDF', crumb: 'Scan to PDF',
    intro: 'No scanner? Use your phone camera. Tap “Use camera”, photograph each page, and download them as one PDF — no app to install.',
    steps: [
      '<strong>Tap “Use camera”.</strong> Photograph the first page; repeat for each page.',
      '<strong>Check the order.</strong> Reorder or remove pages as needed.',
      '<strong>Save as PDF.</strong> Tap “Convert to PDF”.'
    ],
    features: [PRIVATE, FREE, ['No app needed', 'Works in your phone\'s browser. Install it to your home screen for one-tap access.'], ['Size limits', 'Set a maximum size like 200 KB for upload forms.']],
    body: `<h2>Tips for better scans</h2>
<ul><li>Place the document on a dark, flat surface in good daylight.</li><li>Hold the phone directly above the page, not at an angle.</li><li>Turn off flash to avoid glare on glossy paper.</li><li>Fill the frame with the page so the text is as large as possible.</li></ul>`,
    faqs: [['Do I need to install an app?', 'No. It works in Chrome, Safari and other mobile browsers. You can optionally “Add to Home screen” to use it like an app.'], ['Can I scan multiple pages?', 'Yes. Tap “Use camera” again for each page; they are added in order.']],
    related: ['/image-to-pdf/', '/jpg-to-pdf-under-200kb/', '/compress-pdf/', '/sign-pdf/']
  },
  jpgUnder(100, 'A 100 KB limit is common on exam registration, scholarship and recruitment portals for uploading certificates, ID proof and signatures.'),
  jpgUnder(200, 'A 200 KB limit is common for uploading documents such as mark sheets, caste or income certificates and address proof to online applications.'),
  compressTo(100, '100 KB', 'Exam, recruitment and government application portals often set a 100 KB limit per document. This is a small budget, so one or two pages give the best quality.'),
  compressTo(200, '200 KB', 'A 200 KB limit is common for certificates and supporting documents. Most single-page and two-page scans fit comfortably with good readability.'),
  compressTo(500, '500 KB', 'Many job portals, banks and insurance sites allow 500 KB per upload — enough for several clearly readable pages.'),
  compressTo(1024, '1 MB', 'A 1 MB limit is typical for resumes, project reports and email-friendly sharing. Most documents fit with almost no visible loss in quality.'),
  {
    path: '/pdf-to-png/', widget: 'pdf2img', widgetOpts: { format: 'png' },
    title: 'PDF to PNG – Convert PDF Pages to PNG Images Free | PDFMint',
    description: 'Convert PDF pages to high-quality PNG images for free. Lossless, up to 300 DPI, all pages or selected ones. No upload needed.',
    h1: 'PDF to PNG Converter', crumb: 'PDF to PNG',
    intro: 'Save PDF pages as lossless PNG images — ideal for diagrams, text-heavy pages and design work where every detail matters.',
    steps: ['<strong>Choose a PDF.</strong> Select or drop your file.', '<strong>Pick resolution and pages.</strong> 300 DPI for print, 150 DPI for screens.', '<strong>Download.</strong> One page saves as PNG; several come in a ZIP.'],
    features: [PRIVATE, FREE, ['Lossless', 'PNG keeps every pixel sharp — no JPG artefacts.'], ['Choose pages', 'Convert all pages or a range.']],
    faqs: [['PNG or JPG — which is better?', 'PNG is sharper for text and graphics; JPG is smaller for photos. Use <a href="/pdf-to-jpg/">PDF to JPG</a> if file size matters.']],
    related: ['/pdf-to-jpg/', '/png-to-pdf/', '/split-pdf/']
  },
  {
    path: '/rotate-pdf/', widget: 'organize',
    title: 'Rotate PDF – Rotate PDF Pages Free & Save Permanently | PDFMint',
    description: 'Rotate PDF pages left or right and save them permanently. Rotate all pages or just one. Free, private and works on phone and desktop.',
    h1: 'Rotate PDF Pages', crumb: 'Rotate PDF',
    intro: 'Fix sideways or upside-down pages. Rotate the whole document or individual pages, then save — the rotation is permanent.',
    steps: ['<strong>Open your PDF.</strong> Page thumbnails appear.', '<strong>Rotate.</strong> Use “Rotate all” or the ↺ ↻ buttons on single pages.', '<strong>Save.</strong> Click “Save PDF”.'],
    features: [PRIVATE, FREE, ['Single or all pages', 'Rotate just the scanned page that came out sideways.'], ['No quality loss', 'Rotation is lossless; text stays selectable.']],
    faqs: [['Will the rotation stay when I open the PDF elsewhere?', 'Yes. The rotation is saved into the PDF file itself.'], ['Can I also delete or reorder pages?', 'Yes — the same tool lets you drag pages and delete them.']],
    related: ['/organize-pdf/', '/delete-pdf-pages/', '/merge-pdf/']
  },
  {
    path: '/delete-pdf-pages/', widget: 'organize',
    title: 'Delete PDF Pages – Remove Pages from PDF Free | PDFMint',
    description: 'Remove unwanted pages from a PDF for free. See thumbnails, delete pages with one click, and save. No upload, no watermark.',
    h1: 'Delete Pages from PDF', crumb: 'Delete PDF pages',
    intro: 'Remove blank, duplicate or private pages from any PDF. See every page, click × on the ones you don\'t want, and save.',
    steps: ['<strong>Open your PDF.</strong> Thumbnails of every page appear.', '<strong>Delete pages.</strong> Click × under each page you want to remove.', '<strong>Save.</strong> Click “Save PDF” to download the shorter file.'],
    features: [PRIVATE, FREE, ['See before you delete', 'Thumbnails make sure you remove the right pages.'], ['Lossless', 'The pages you keep are untouched.']],
    faqs: [['Can I undo a deletion?', 'Yes — click “Reset” to start over before saving. Your original file is never changed.'], ['Can I extract pages instead?', 'Yes, use <a href="/split-pdf/">Split PDF</a> to pull out a range of pages.']],
    related: ['/split-pdf/', '/organize-pdf/', '/rotate-pdf/', '/compress-pdf/']
  },
  {
    path: '/resume-to-pdf/', widget: 'word',
    title: 'Resume to PDF – Convert Your CV (Word) to PDF Free | PDFMint',
    description: 'Convert your resume or CV from Word (DOCX) to PDF for job applications. Free, private, no watermark. Tips for an ATS-friendly PDF resume.',
    h1: 'Convert Your Resume to PDF', crumb: 'Resume to PDF',
    intro: 'Recruiters and job portals prefer PDF resumes because they look the same everywhere. Convert your Word CV below — free and private.',
    steps: ['<strong>Select your resume.</strong> Your .docx CV from Word or Google Docs.', '<strong>Check the preview.</strong> Make sure everything looks right.', '<strong>Download.</strong> Click “Convert to PDF”.'],
    features: [PRIVATE, FREE, ['No watermark', 'A clean, professional PDF.'], DEVICES],
    body: `<h2>Resume PDF tips</h2>
<ul><li><strong>Name the file well:</strong> e.g. <code>Priya-Sharma-Resume.pdf</code>, not <code>final_v3.pdf</code>.</li>
<li><strong>Keep it simple for ATS:</strong> applicant tracking systems read simple single-column layouts best. Avoid text boxes and images of text.</li>
<li><strong>Need selectable text?</strong> Many ATS systems read the text in your PDF. For the most reliable result, export from Word with “File › Save as › PDF” — or use this tool for a quick, clean copy.</li>
<li><strong>Size limits:</strong> if a portal rejects large files, use <a href="/compress-pdf-to-1mb/">compress PDF to 1 MB</a>.</li></ul>`,
    faqs: [['Should I send my resume as PDF or Word?', 'PDF, unless the employer asks for Word. A PDF keeps your layout identical on every device.'], ['How do I add certificates to my resume PDF?', 'Convert both to PDF, then combine them with <a href="/merge-pdf/">Merge PDF</a>.']],
    related: ['/word-to-pdf/', '/merge-pdf/', '/compress-pdf-to-1mb/', '/sign-pdf/']
  },
  {
    path: '/aadhaar-card-to-pdf/', widget: 'image', widgetOpts: { target: '200', margin: 10 },
    title: 'Aadhaar Card to PDF – Front & Back on One Page Free | PDFMint',
    description: 'Convert Aadhaar card photos (front and back) into one PDF under 200 KB for online forms. Free and private — your ID never leaves your phone.',
    h1: 'Aadhaar Card to PDF', crumb: 'Aadhaar card to PDF',
    intro: 'Photograph the front and back of your Aadhaar card and turn them into one small PDF for KYC and application forms. Your ID is processed only on your device.',
    steps: ['<strong>Add both sides.</strong> Use the camera or select photos of the front and back.', '<strong>Check the order.</strong> Front first, then back.', '<strong>Convert.</strong> The size limit is preset to 200 KB — change it if your form asks for something else.'],
    features: [['Your ID stays private', 'Nothing is uploaded — important for identity documents.'], FREE, ['Small file', 'Automatically fits common 100–200 KB upload limits.'], DEVICES],
    body: `<h2>Keep your ID copy safe</h2>
<p>When sharing ID copies, it's good practice to add a note such as “For KYC at XYZ bank only” with <a href="/watermark-pdf/">Watermark PDF</a>, so the copy can't easily be reused elsewhere. The official e-Aadhaar PDF can be downloaded from UIDAI's website; this tool is for turning photos or scans of your physical card into a PDF.</p>
<p>The same steps work for PAN card, voter ID, driving licence and passport copies.</p>`,
    faqs: [['Is it safe to convert my Aadhaar here?', 'Yes. The photos are converted inside your browser and are never sent to any server.'], ['Can I put front and back on the same page?', 'Each photo becomes one page. To fit both on one page, take a single photo of both sides placed next to each other.']],
    related: ['/jpg-to-pdf-under-100kb/', '/watermark-pdf/', '/scan-to-pdf/', '/compress-pdf-to-200kb/']
  }
];
