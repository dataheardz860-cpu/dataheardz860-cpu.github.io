// Main tool pages (English).
export const PRIVATE = ['100% private', 'Files are processed inside your browser. Nothing is uploaded to any server.'];
export const FREE = ['Free, no watermark', 'No account, no watermark, no daily limits and no paywall.'];
export const DEVICES = ['Works on any device', 'Android, iPhone, Windows, Mac or Linux — all you need is a browser.'];
export const FAST = ['Instant', 'No waiting for uploads or downloads, so even big files are quick.'];

const pdfFaqs = (thing) => [
  [`Is it safe to ${thing} here?`, 'Yes. Your PDF never leaves your device — all processing happens in your browser, so nobody (including us) can see your file.'],
  ['Is it free?', 'Yes, completely free with no sign-up, no watermark and no limits on how many files you process.'],
  ['Does it work with password-protected PDFs?', 'No. Remove the password first (open the PDF with its password and save or print a copy without one), then try again.']
];

export const toolPages = [
  {
    path: '/image-to-pdf/', widget: 'image',
    alternates: { en: '/image-to-pdf/', hi: '/hi/image-to-pdf/' },
    title: 'Image to PDF Converter – JPG, PNG, HEIC to PDF Free | PDFMint',
    description: 'Convert JPG, PNG, WEBP and HEIC images to PDF for free. Combine photos into one PDF, set a max file size like 100 KB. No sign-up, no watermark, no upload.',
    h1: 'Image to PDF Converter', crumb: 'Image to PDF',
    intro: 'Turn photos, scans and screenshots into one PDF in seconds. Set page size, margins and even a maximum file size — free, no watermark, and your images never leave your device.',
    steps: [
      '<strong>Add your images.</strong> Click “Select images”, drag files into the box, or tap “Use camera” on your phone.',
      '<strong>Arrange the pages.</strong> Drag the thumbnails, or use the arrow buttons, to set the order.',
      '<strong>Pick your settings.</strong> Choose A4, Letter or the original image size, margins, quality — or a maximum file size such as 100 KB.',
      '<strong>Download your PDF.</strong> Click “Convert to PDF” and the file is saved to your device.'
    ],
    features: [PRIVATE, FREE, ['Merge many photos', 'Combine dozens of pictures, scans or screenshots into one tidy PDF.'], ['Hit size limits', 'Pick 100 KB, 200 KB or 500 KB and we automatically shrink the PDF to fit upload forms.'], ['iPhone HEIC support', 'HEIC photos are converted automatically — no need to change camera settings.'], DEVICES],
    body: `<h2>Supported image formats</h2>
<p>You can convert <a href="/jpg-to-pdf/">JPG and JPEG</a>, <a href="/png-to-pdf/">PNG</a>, WEBP, GIF, BMP and <a href="/heic-to-pdf/">HEIC/HEIF</a> photos from iPhones. Transparent areas in PNGs are filled with white so they print cleanly, and each image is centred and scaled to fit the page without stretching or cropping.</p>
<h2>Common uses</h2>
<p>People use the image to PDF converter to submit scanned documents for job, college and government applications, combine receipts for expense claims, turn photos of handwritten notes into one study file, or send ID card scans — like an <a href="/aadhaar-card-to-pdf/">Aadhaar card</a> — in the PDF format that websites ask for. If a form has a size limit, use the <a href="/jpg-to-pdf-under-100kb/">JPG to PDF under 100 KB</a> setting.</p>`,
    faqs: [
      ['Is this image to PDF converter free?', 'Yes. It is 100% free with no sign-up, no watermark and no daily limits.'],
      ['Are my images uploaded to a server?', 'No. The conversion happens entirely inside your browser, so your images never leave your device.'],
      ['Can I combine multiple images into one PDF?', 'Yes. Add as many images as you like; each becomes a page in a single PDF, in the order you choose.'],
      ['How do I make the PDF smaller than 100 KB?', 'Set “Maximum file size” to 100 KB before converting. PDFMint automatically lowers the image resolution and quality until the PDF fits.'],
      ['Does it work on mobile?', 'Yes. It works in any modern browser on Android and iPhone, and you can scan documents directly with the “Use camera” button.']
    ],
    related: ['/merge-pdf/', '/compress-pdf/', '/scan-to-pdf/', '/pdf-to-jpg/', '/word-to-pdf/']
  },
  {
    path: '/word-to-pdf/', widget: 'word',
    alternates: { en: '/word-to-pdf/', hi: '/hi/word-to-pdf/' },
    title: 'Word to PDF Converter – Convert DOCX to PDF Free Online | PDFMint',
    description: 'Convert Word documents (DOCX) to PDF free online. Preview before you download. No sign-up, no watermark, and your file stays on your device.',
    h1: 'Word to PDF Converter', crumb: 'Word to PDF',
    intro: 'Convert Word documents (.docx) to PDF online for free. Preview your file, then download — no sign-up, no watermark, and nothing is uploaded.',
    steps: [
      '<strong>Select your Word document.</strong> Click “Select Word file” or drag a .docx file into the box.',
      '<strong>Check the preview.</strong> Your document appears instantly so you can confirm the content is right.',
      '<strong>Download the PDF.</strong> Choose A4 or Letter and a margin, then click “Convert to PDF”.'
    ],
    features: [PRIVATE, FREE, ['Preview first', 'See the result before downloading so there are no surprises.'], DEVICES],
    body: `<h2>When should you save a Word file as PDF?</h2>
<p>A PDF looks the same on every screen and printer and can't be accidentally edited. That makes it the best format for <a href="/resume-to-pdf/">CVs and resumes</a>, cover letters, assignments, invoices and contracts. Many job portals, universities and government sites only accept PDF uploads.</p>
<h2>What formatting is kept?</h2>
<p>Headings, paragraphs, bold, italic, underline, bulleted and numbered lists, tables, links and embedded images are converted. Very complex layouts — text boxes, multi-column pages, headers, footers and unusual fonts — may look slightly different. For a pixel-perfect copy of a complex layout, use “File › Save as › PDF” in Microsoft Word, or read our guide on <a href="/guides/word-to-pdf-without-losing-formatting/">converting Word to PDF without losing formatting</a>.</p>`,
    faqs: [
      ['Is the Word to PDF converter free?', 'Yes, completely free. No account, no watermark and no limits.'],
      ['Is my Word document uploaded anywhere?', 'No. In the default mode your document is converted inside your browser and never sent to a server.'],
      ['Can I convert old .doc files?', 'Open the .doc file in Word, Google Docs or LibreOffice and save it as .docx first, then convert it here.'],
      ['Will my formatting be kept?', 'Headings, paragraphs, bold, italics, lists, tables and images are kept. Complex layouts such as text boxes, columns, headers and footers may look different.'],
      ['Can I convert Word to PDF on my phone?', 'Yes. Open this page in your phone\'s browser, select the .docx file and download the PDF.']
    ],
    related: ['/image-to-pdf/', '/text-to-pdf/', '/merge-pdf/', '/compress-pdf/', '/sign-pdf/']
  },
  {
    path: '/merge-pdf/', widget: 'merge',
    alternates: { en: '/merge-pdf/', hi: '/hi/merge-pdf/' },
    title: 'Merge PDF – Combine PDF Files into One, Free & Private | PDFMint',
    description: 'Merge PDF files online for free. Combine multiple PDFs into one document in the order you want. No upload, no watermark, no sign-up.',
    h1: 'Merge PDF Files', crumb: 'Merge PDF',
    intro: 'Combine two or more PDFs into a single document. Drag to set the order, click merge, done — your files never leave your device.',
    steps: [
      '<strong>Add your PDFs.</strong> Select or drop two or more PDF files.',
      '<strong>Set the order.</strong> Drag the files, or use the arrows, so they appear in the order you want.',
      '<strong>Merge.</strong> Click “Merge PDF” and your combined file downloads instantly.'
    ],
    features: [PRIVATE, FREE, ['Keeps quality', 'Pages are copied exactly — text stays sharp and selectable, nothing is re-compressed.'], FAST],
    body: `<h2>Why merge PDFs?</h2>
<p>Merging is the easiest way to send one tidy file instead of many attachments: combine a CV with certificates, join scanned pages of a form, put monthly statements in one file, or collect chapters of a report. If the combined file is too big to email, run it through <a href="/compress-pdf/">Compress PDF</a> afterwards. Need to merge photos instead? Use <a href="/image-to-pdf/">Image to PDF</a>.</p>`,
    faqs: [
      ['How many PDFs can I merge?', 'There is no fixed limit. Very large files depend on your device\'s memory, but dozens of normal documents merge in seconds.'],
      ['Will merging reduce the quality?', 'No. Pages are copied as they are, so text, images and links keep their original quality.'],
      ...pdfFaqs('merge PDFs').slice(0, 1),
      ['Can I merge PDFs on my phone?', 'Yes. It works in Chrome, Safari and other mobile browsers.']
    ],
    related: ['/split-pdf/', '/compress-pdf/', '/organize-pdf/', '/image-to-pdf/', '/add-page-numbers-to-pdf/']
  },
  {
    path: '/split-pdf/', widget: 'split',
    title: 'Split PDF – Extract Pages from PDF Free Online | PDFMint',
    description: 'Split a PDF into multiple files or extract specific pages, free. Choose page ranges, every page, or every N pages. Private — no upload needed.',
    h1: 'Split PDF', crumb: 'Split PDF',
    intro: 'Extract the pages you need, or split one PDF into many smaller files. Pick page ranges like “1-3, 7” — everything happens on your device.',
    steps: [
      '<strong>Choose a PDF.</strong> Select or drop the file you want to split.',
      '<strong>Pick a split mode.</strong> Extract selected pages into one PDF, save each range separately, split every page, or every N pages.',
      '<strong>Download.</strong> One file downloads directly; several files are packed into a ZIP.'
    ],
    features: [PRIVATE, FREE, ['Flexible ranges', 'Use ranges like 1-3, 5, 8-10 — or “8-” to mean page 8 to the end.'], ['Lossless', 'Pages are copied exactly, with no loss of quality.']],
    body: `<h2>Examples</h2>
<div class="table-wrap"><table><tr><th>You type</th><th>You get</th></tr>
<tr><td><code>1-3</code></td><td>Pages 1, 2 and 3</td></tr>
<tr><td><code>2, 5, 9</code></td><td>Pages 2, 5 and 9</td></tr>
<tr><td><code>10-</code></td><td>Page 10 to the last page</td></tr>
<tr><td><code>1-5, 6-10</code> with “Each range as a separate PDF”</td><td>Two files: pages 1-5 and pages 6-10</td></tr></table></div>
<p>To remove pages instead of extracting them, use <a href="/delete-pdf-pages/">Delete PDF pages</a>.</p>`,
    faqs: [['Can I extract just one page?', 'Yes. Type the page number, e.g. 4, and click Split PDF.'], ...pdfFaqs('split PDFs')],
    related: ['/merge-pdf/', '/delete-pdf-pages/', '/organize-pdf/', '/compress-pdf/']
  },
  {
    path: '/compress-pdf/', widget: 'compress',
    alternates: { en: '/compress-pdf/', hi: '/hi/compress-pdf/' },
    title: 'Compress PDF – Reduce PDF File Size Online Free | PDFMint',
    description: 'Compress PDF files to reduce size for email and upload forms. Choose a level or a target like 100 KB, 200 KB or 1 MB. Free, private, no upload.',
    h1: 'Compress PDF', crumb: 'Compress PDF',
    intro: 'Make PDFs small enough for email, WhatsApp and online forms. Pick a compression level — or a target size like 100 KB — and PDFMint does the rest, right on your device.',
    steps: [
      '<strong>Choose a PDF.</strong> Select or drop the file you want to shrink.',
      '<strong>Pick a level or target size.</strong> “Recommended” suits most files. If a form has a limit, choose it under “Target size”.',
      '<strong>Download.</strong> You will see the before and after size, and the smaller PDF downloads automatically.'
    ],
    features: [PRIVATE, FREE, ['Target sizes', 'Need under 100 KB, 200 KB or 1 MB? Pick it and we find the best quality that fits.'], ['Great for scans', 'Scanned documents and photo-heavy PDFs usually shrink by 50–90%.']],
    body: `<h2>How PDF compression works here</h2>
<p><strong>Light</strong> re-saves the PDF more efficiently and keeps text selectable — good for PDFs that are already mostly text. <strong>Recommended, Strong and Extreme</strong> re-draw each page as an optimised image, which gives much bigger savings on scans and photo-heavy files. Text in these modes becomes part of the image, so it can still be read and printed but not selected or searched.</p>
<p>Popular targets: <a href="/compress-pdf-to-100kb/">compress PDF to 100 KB</a>, <a href="/compress-pdf-to-200kb/">200 KB</a>, <a href="/compress-pdf-to-500kb/">500 KB</a> and <a href="/compress-pdf-to-1mb/">1 MB</a>. For tips, read <a href="/guides/how-to-reduce-pdf-file-size/">how to reduce PDF file size</a>.</p>`,
    faqs: [
      ['How much smaller will my PDF be?', 'Scanned and photo PDFs usually shrink by 50–90%. Text-only PDFs are already small and may only shrink a little.'],
      ['Will the text still be readable?', 'Yes. “Recommended” keeps documents clear. “Extreme” is for when the size limit matters more than sharpness.'],
      ['Can I compress a PDF to exactly 100 KB?', 'Choose 100 KB as the target size. PDFMint tries progressively stronger settings and stops at the best quality that fits under 100 KB.'],
      ...pdfFaqs('compress PDFs').slice(0, 1)
    ],
    related: ['/compress-pdf-to-100kb/', '/compress-pdf-to-200kb/', '/merge-pdf/', '/split-pdf/', '/image-to-pdf/']
  },
  {
    path: '/pdf-to-jpg/', widget: 'pdf2img', widgetOpts: { format: 'jpg' },
    title: 'PDF to JPG – Convert PDF Pages to Images Free | PDFMint',
    description: 'Convert PDF to JPG images online for free. Save every page or selected pages as high-quality JPGs, up to 300 DPI. No upload, no watermark.',
    h1: 'PDF to JPG Converter', crumb: 'PDF to JPG',
    intro: 'Save each page of a PDF as a JPG image — perfect for sharing on WhatsApp, social media or slides. Choose the resolution and which pages to convert.',
    steps: [
      '<strong>Choose a PDF.</strong> Select or drop your file.',
      '<strong>Pick format and quality.</strong> 150 DPI suits screens; 300 DPI is best for printing.',
      '<strong>Download.</strong> A single page saves as a JPG; several pages download together as a ZIP.'
    ],
    features: [PRIVATE, FREE, ['Up to 300 DPI', 'Crisp, print-quality images from every page.'], ['Choose pages', 'Convert all pages or just the ones you need, e.g. 1-3, 5.']],
    body: `<h2>JPG or PNG?</h2><p>JPG files are smaller and ideal for photos and sharing. If your PDF has fine text, line drawings or you need lossless quality, use <a href="/pdf-to-png/">PDF to PNG</a> instead.</p>`,
    faqs: [['How do I convert only one page?', 'Type the page number in “Pages”, e.g. 3, before converting.'], ...pdfFaqs('convert PDFs')],
    related: ['/pdf-to-png/', '/image-to-pdf/', '/split-pdf/', '/compress-pdf/']
  },
  {
    path: '/organize-pdf/', widget: 'organize',
    title: 'Organise PDF – Reorder, Rotate & Delete PDF Pages Free | PDFMint',
    description: 'Rearrange PDF pages, rotate them and delete the ones you don\'t need — all in one free, private tool. See page thumbnails and drag to reorder.',
    h1: 'Organise PDF Pages', crumb: 'Organise PDF',
    intro: 'See every page as a thumbnail, then drag to reorder, rotate sideways scans and delete pages you don\'t need. Save a fresh PDF in one click.',
    steps: [
      '<strong>Open a PDF.</strong> Thumbnails of every page appear.',
      '<strong>Edit the pages.</strong> Drag to reorder, use ↺ ↻ to rotate, and × to delete.',
      '<strong>Save.</strong> Click “Save PDF” to download your edited document.'
    ],
    features: [PRIVATE, FREE, ['Visual editing', 'Page thumbnails make it easy to see exactly what you are changing.'], ['Lossless', 'Pages keep their original quality and selectable text.']],
    body: '<p>Only need one job done? Try <a href="/rotate-pdf/">Rotate PDF</a> or <a href="/delete-pdf-pages/">Delete PDF pages</a>.</p>',
    faqs: pdfFaqs('edit PDFs'),
    related: ['/rotate-pdf/', '/delete-pdf-pages/', '/split-pdf/', '/merge-pdf/']
  },
  {
    path: '/sign-pdf/', widget: 'sign',
    extraHead: '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Dancing+Script:wght@600&family=Great+Vibes&display=swap">',
    title: 'Sign PDF – Add Your Signature to a PDF Free | PDFMint',
    description: 'Sign PDF documents online for free. Draw, type or upload your signature and place it anywhere on the page. Private — your document is never uploaded.',
    h1: 'Sign PDF Online', crumb: 'Sign PDF',
    intro: 'Add your signature to any PDF in under a minute. Draw it with your finger or mouse, type your name, or upload a photo of your signature — then place it exactly where it belongs.',
    steps: [
      '<strong>Open your PDF.</strong> Select the document you need to sign.',
      '<strong>Create your signature.</strong> Draw it, type it in a handwriting style, or upload a photo (the white background is removed automatically).',
      '<strong>Place and download.</strong> Tap the page where the signature goes, adjust the size, then click “Sign & download”.'
    ],
    features: [PRIVATE, FREE, ['Three ways to sign', 'Draw, type or upload — whatever suits you.'], ['Initials on every page', 'Tick “Add to every page” to initial each page at once.']],
    body: `<h2>Is an electronic signature legally valid?</h2>
<p>In many countries a simple electronic signature like this is accepted for everyday documents such as offer letters, rental agreements and forms. Some documents — for example certain government, court or property papers — may require a certified digital signature or a wet-ink signature. If you are unsure, check with the organisation that asked you to sign. This tool adds a visual signature; it does not add a cryptographic digital certificate.</p>`,
    faqs: [
      ['Can I sign a PDF on my phone?', 'Yes. Draw your signature with your finger, then tap the page to place it.'],
      ['Is my signature stored anywhere?', 'No. Your signature and document stay in your browser and are gone when you close the page.'],
      ...pdfFaqs('sign PDFs').slice(1)
    ],
    related: ['/watermark-pdf/', '/add-page-numbers-to-pdf/', '/merge-pdf/', '/word-to-pdf/']
  },
  {
    path: '/watermark-pdf/', widget: 'watermark',
    title: 'Add Watermark to PDF – Free Online Text Watermark | PDFMint',
    description: 'Add a text watermark like CONFIDENTIAL, DRAFT or your name to every page of a PDF. Choose size, angle, colour and opacity. Free and private.',
    h1: 'Add a Watermark to PDF', crumb: 'Watermark PDF',
    intro: 'Stamp “CONFIDENTIAL”, “DRAFT”, “COPY” or your own text across every page. Choose the angle, colour, size and opacity — or tile it across the page.',
    steps: [
      '<strong>Open your PDF.</strong> Select the file to watermark.',
      '<strong>Type your watermark.</strong> Pick layout, angle, size, opacity and colour.',
      '<strong>Download.</strong> Click “Add watermark” and the watermarked PDF downloads.'
    ],
    features: [PRIVATE, FREE, ['Any language', 'Watermarks work in English, Hindi and every other script.'], ['Tiled mode', 'Repeat the watermark across the whole page to discourage copying.']],
    body: '<p>Common watermarks: CONFIDENTIAL, DRAFT, SAMPLE, COPY, “For verification only”, or your name and date when sharing ID documents.</p>',
    faqs: [['Can I add my name as a watermark on ID copies?', 'Yes. Type something like “Only for bank KYC – 12 Nov” to reduce the risk of misuse of your ID copy.'], ...pdfFaqs('watermark PDFs')],
    related: ['/sign-pdf/', '/add-page-numbers-to-pdf/', '/compress-pdf/', '/merge-pdf/']
  },
  {
    path: '/add-page-numbers-to-pdf/', widget: 'pagenum',
    title: 'Add Page Numbers to PDF – Free Online | PDFMint',
    description: 'Add page numbers to a PDF in seconds. Choose the position, style (1, Page 1, 1 of 10), starting number and skip the cover page. Free and private.',
    h1: 'Add Page Numbers to PDF', crumb: 'Add page numbers',
    intro: 'Number the pages of any PDF — bottom, top, left, right or centre. Choose “1”, “Page 1” or “Page 1 of 10” and skip the cover if you like.',
    steps: [
      '<strong>Open your PDF.</strong> Select the document.',
      '<strong>Choose the style.</strong> Pick position, format, starting number and font size.',
      '<strong>Download.</strong> Click “Add page numbers”.'
    ],
    features: [PRIVATE, FREE, ['Skip the cover', 'Start numbering on page 2 for reports and theses.'], ['Text stays sharp', 'Numbers are added as real text; the rest of the PDF is untouched.']],
    faqs: pdfFaqs('add page numbers'),
    related: ['/merge-pdf/', '/watermark-pdf/', '/organize-pdf/', '/sign-pdf/']
  },
  {
    path: '/text-to-pdf/', widget: 'text',
    title: 'Text to PDF – Convert TXT or Typed Text to PDF Free | PDFMint',
    description: 'Type, paste or open a .txt file and save it as a PDF. Choose font, size and margins. Supports Hindi and other languages. Free, no sign-up.',
    h1: 'Text to PDF Converter', crumb: 'Text to PDF',
    intro: 'Paste notes, code, letters or a .txt file and get a clean, printable PDF. Works with English, Hindi and other languages.',
    steps: [
      '<strong>Add your text.</strong> Type, paste, or open a .txt file.',
      '<strong>Choose the look.</strong> Pick font, size, page size and margins.',
      '<strong>Download.</strong> Click “Convert to PDF”.'
    ],
    features: [PRIVATE, FREE, ['All languages', 'Hindi, Marathi, Tamil, Arabic and more are rendered correctly.'], ['Selectable text', 'English text stays real, searchable text in the PDF.']],
    faqs: [['Does it support Hindi text?', 'Yes. Text in Hindi and other non-Latin scripts is rendered with your device\'s fonts so it displays correctly.'], ['Is there a length limit?', 'No fixed limit — long documents simply become more pages.']],
    related: ['/word-to-pdf/', '/html-to-pdf/', '/merge-pdf/']
  },
  {
    path: '/html-to-pdf/', widget: 'html',
    title: 'HTML to PDF – Convert HTML Code to PDF Free | PDFMint',
    description: 'Paste HTML or open an .html file and convert it to a PDF. Supports CSS styles, tables and images. Free and private, no upload.',
    h1: 'HTML to PDF Converter', crumb: 'HTML to PDF',
    intro: 'Paste HTML (with CSS) or open an .html file and turn it into a PDF — handy for invoices, email templates and reports.',
    steps: [
      '<strong>Add HTML.</strong> Paste code or open an .html file.',
      '<strong>Pick page options.</strong> Page size, orientation and margins.',
      '<strong>Download.</strong> Click “Convert to PDF”.'
    ],
    features: [PRIVATE, FREE, ['CSS support', 'Inline and &lt;style&gt; CSS is applied, including tables and colours.'], ['Safe', 'Scripts in the HTML are removed before rendering.']],
    faqs: [['Can I convert a live website URL?', 'Not directly — browsers block reading other sites. Open the page, use your browser\'s “Save page as” to get the HTML, then open it here. Or use the browser\'s Print › Save as PDF.'], ['Are external images included?', 'Images are included when the hosting site allows it (CORS). Embedded base64 images always work.']],
    related: ['/text-to-pdf/', '/word-to-pdf/', '/merge-pdf/']
  }
];
