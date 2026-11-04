// Helpful articles. Real, useful guides build topical authority and earn links.
export const guides = [
  {
    path: '/guides/how-to-reduce-pdf-file-size/', short: 'Reduce PDF file size',
    title: 'How to Reduce PDF File Size (Without Losing Quality) – 7 Ways | PDFMint',
    description: 'Seven practical ways to make a PDF smaller for email and upload forms — from quick compression to fixing the cause. Works on phone and PC.',
    h1: 'How to Reduce PDF File Size: 7 Practical Ways', published: '2026-11-04', updated: '2026-11-04', minutes: 6,
    body: `<p>A PDF that's too large gets bounced by email, rejected by upload forms and takes ages to open on a phone. The good news: most oversized PDFs are big for one of a few simple reasons, and each has a quick fix.</p>
<h2>Why is my PDF so big?</h2>
<p>In most cases the culprit is <strong>images</strong>. A single phone photo can be 3–5 MB, so a 10-page document made from photos easily reaches 30 MB or more. Other causes are embedded fonts, high-resolution scans (600 DPI when 150 would do), and files that were saved many times with leftover data.</p>
<h2>1. Use an online compressor</h2>
<p>The fastest fix is a compressor such as <a href="/compress-pdf/">PDFMint Compress PDF</a>. Pick “Recommended” for a good balance, or set a <strong>target size</strong> like <a href="/compress-pdf-to-200kb/">200 KB</a> if a form has a strict limit. Scanned and photo-based PDFs typically shrink by 50–90%.</p>
<h2>2. Start from smaller images</h2>
<p>If you are building a PDF from photos, it's better to shrink the images <em>before</em> they go into the PDF. <a href="/image-to-pdf/">Image to PDF</a> has a “Maximum file size” option that does this automatically.</p>
<h2>3. Scan at the right resolution</h2>
<p>For documents you'll read on screen or upload, 150 DPI in greyscale is usually plenty. 300 DPI is only needed for printing photos or fine print. Halving the DPI cuts file size to roughly a quarter.</p>
<h2>4. Remove pages you don't need</h2>
<p>Blank pages, duplicate pages and cover sheets add weight. Remove them with <a href="/delete-pdf-pages/">Delete PDF pages</a>.</p>
<h2>5. Split the document</h2>
<p>If a portal accepts several uploads, <a href="/split-pdf/">split the PDF</a> into parts that each fit the limit.</p>
<h2>6. Export again from the original</h2>
<p>If you have the original Word or PowerPoint file, export to PDF again and choose “Minimum size” or “Optimise for online publishing”. This keeps text sharp and selectable.</p>
<h2>7. Use “Print to PDF” as a last resort</h2>
<p>Printing a PDF to a new PDF (Ctrl/Cmd + P › Save as PDF) sometimes strips hidden data. Results vary, so compare the size afterwards.</p>
<h2>Quick reference</h2>
<div class="table-wrap"><table><tr><th>Situation</th><th>Best fix</th></tr>
<tr><td>Form says “max 100 KB”</td><td><a href="/compress-pdf-to-100kb/">Compress to 100 KB</a></td></tr>
<tr><td>PDF made from phone photos</td><td>Re-create with Image to PDF and a size limit</td></tr>
<tr><td>Text-only PDF is large</td><td>Re-export from Word, or “Light” compression</td></tr>
<tr><td>Still too big at lowest quality</td><td>Split into parts or remove pages</td></tr></table></div>`,
    faqs: [['Does compressing a PDF reduce quality?', 'Strong compression lowers image sharpness. “Recommended” settings keep documents clearly readable while removing most of the excess size.'], ['Can I compress a PDF on my phone?', 'Yes. PDFMint works in mobile browsers and nothing is uploaded.']],
    related: ['/compress-pdf/', '/compress-pdf-to-100kb/', '/split-pdf/', '/image-to-pdf/']
  },
  {
    path: '/guides/convert-photo-to-pdf-on-phone/', short: 'Photo to PDF on phone',
    title: 'How to Convert a Photo to PDF on Android & iPhone (Free) | PDFMint',
    description: 'Step-by-step: turn photos into a PDF on Android or iPhone without installing an app. Plus tips for sharp, small scans that upload forms accept.',
    h1: 'How to Convert a Photo to PDF on Your Phone', published: '2026-11-04', updated: '2026-11-04', minutes: 5,
    body: `<p>You don't need a scanner — or even an app — to turn photos into a PDF. Here's how to do it on any phone in under a minute.</p>
<h2>On Android or iPhone (any browser)</h2>
<ol><li>Open <a href="/image-to-pdf/">PDFMint Image to PDF</a> in Chrome or Safari.</li>
<li>Tap <strong>Select images</strong> to choose photos from your gallery, or <strong>Use camera</strong> to photograph pages directly.</li>
<li>Put the pages in order using the arrow buttons.</li>
<li>If you're uploading to a form with a size limit, set <strong>Maximum file size</strong> (for example 200 KB).</li>
<li>Tap <strong>Convert to PDF</strong>. The file saves to your Downloads (Android) or Files app (iPhone).</li></ol>
<p>Tip: tap your browser menu and choose <strong>Add to Home screen</strong> or <strong>Install app</strong> to open PDFMint like an app next time.</p>
<h2>iPhone built-in options</h2>
<p>iPhones can also make PDFs without any website: in the <strong>Files</strong> app, long-press a photo and choose <em>Quick Actions › Create PDF</em>, or in <strong>Notes</strong> use the camera button › <em>Scan Documents</em>. These are handy but don't let you control the file size.</p>
<h2>Android built-in options</h2>
<p>On most Android phones you can open a photo, tap <em>Print</em> and choose <em>Save as PDF</em>. Google Drive's <em>Scan</em> button also creates PDFs. Again, size control is limited.</p>
<h2>Tips for sharp, readable scans</h2>
<ul><li>Use daylight and avoid shadows from your phone or hand.</li><li>Hold the phone parallel to the page.</li><li>Crop out the background before converting.</li><li>Turn off flash on glossy paper.</li></ul>`,
    faqs: [['Where is the PDF saved on my phone?', 'Android: usually the Downloads folder. iPhone: in the Files app, under Downloads (or where you chose to save).'], ['Is it safe for ID documents?', 'Yes. PDFMint converts photos on your phone; nothing is uploaded.']],
    related: ['/image-to-pdf/', '/scan-to-pdf/', '/jpg-to-pdf-under-100kb/', '/aadhaar-card-to-pdf/']
  },
  {
    path: '/guides/word-to-pdf-without-losing-formatting/', short: 'Word to PDF formatting',
    title: 'How to Convert Word to PDF Without Losing Formatting | PDFMint',
    description: 'Fonts changed? Layout shifted? Learn why Word-to-PDF formatting breaks and the most reliable ways to keep your document looking exactly right.',
    h1: 'How to Convert Word to PDF Without Losing Formatting', published: '2026-11-04', updated: '2026-11-04', minutes: 5,
    body: `<p>Few things are more frustrating than a perfectly laid-out document that comes out of a converter with shifted tables and strange fonts. Here's why it happens and how to avoid it.</p>
<h2>Why formatting changes</h2>
<ul><li><strong>Missing fonts.</strong> If the converter doesn't have your font, it substitutes another with different widths, so lines wrap differently.</li>
<li><strong>Complex layout features.</strong> Text boxes, floating images, multiple columns, headers and footers are interpreted differently by different programs.</li>
<li><strong>Different page size.</strong> A document set to US Letter converted onto A4 (or vice versa) reflows.</li></ul>
<h2>Most reliable: export from Word itself</h2>
<p>In Microsoft Word choose <em>File › Save As › PDF</em> (or <em>File › Export › Create PDF/XPS</em>). Word uses its own layout engine, so the PDF matches exactly. Tick “Embed fonts” in options if you use unusual fonts. In Google Docs use <em>File › Download › PDF</em>.</p>
<h2>Quick online conversion</h2>
<p>When you don't have Word — for example on a phone — <a href="/word-to-pdf/">PDFMint Word to PDF</a> converts .docx files in your browser and shows a preview first. It handles headings, lists, tables and images well; complex layouts may differ slightly, so check the preview.</p>
<h2>Checklist before converting</h2>
<ol><li>Set the correct paper size (A4 or Letter) in Word.</li><li>Use common fonts (Calibri, Arial, Times New Roman) if you'll convert elsewhere.</li><li>Avoid text boxes for main content; use normal paragraphs and tables.</li><li>Anchor images “in line with text” instead of floating.</li><li>Always open the PDF and check every page before sending.</li></ol>`,
    faqs: [['Why does my PDF have different fonts?', 'The converter didn\'t have your font and used a substitute. Export from Word with fonts embedded, or use a common font.'], ['Can I convert .doc files?', 'Save them as .docx in Word or Google Docs first, then convert.']],
    related: ['/word-to-pdf/', '/resume-to-pdf/', '/compress-pdf/']
  },
  {
    path: '/guides/how-to-merge-pdf-files/', short: 'Merge PDF files',
    title: 'How to Merge PDF Files into One (Free, on Phone or PC) | PDFMint',
    description: 'Combine several PDFs into one document in the right order — free, without Adobe Acrobat. Works on Windows, Mac, Android and iPhone.',
    h1: 'How to Merge PDF Files into One', published: '2026-11-04', updated: '2026-11-04', minutes: 4,
    body: `<p>Job applications, visa forms and expense claims often ask for “a single PDF”. Here's how to combine your files in a couple of minutes, for free.</p>
<h2>Step by step</h2>
<ol><li>Open <a href="/merge-pdf/">PDFMint Merge PDF</a>.</li><li>Select all the PDFs you want to combine (hold Ctrl or Cmd to pick several on a computer).</li><li>Drag them into the right order — for example CV first, then certificates.</li><li>Click <strong>Merge PDF</strong>. Your combined file downloads as <code>merged.pdf</code>.</li></ol>
<h2>Have photos as well as PDFs?</h2>
<p>Convert the photos first with <a href="/image-to-pdf/">Image to PDF</a>, then merge everything together.</p>
<h2>After merging</h2>
<ul><li>File too big? Run it through <a href="/compress-pdf/">Compress PDF</a>.</li><li>Need page numbers? Use <a href="/add-page-numbers-to-pdf/">Add page numbers</a>.</li><li>Wrong page order or a sideways scan? Fix it in <a href="/organize-pdf/">Organise PDF</a>.</li></ul>
<h2>Merging without a website</h2>
<p>On a Mac, open the first PDF in Preview, show thumbnails, and drag other PDFs into the sidebar. On Windows there's no built-in merge tool, which is why a browser-based tool is the easiest option.</p>`,
    faqs: [['Does merging reduce quality?', 'No. Pages are copied exactly as they are.'], ['Is there a file limit?', 'No fixed limit; very large files depend on your device\'s memory.']],
    related: ['/merge-pdf/', '/compress-pdf/', '/organize-pdf/', '/image-to-pdf/']
  },
  {
    path: '/guides/how-to-sign-a-pdf-without-printing/', short: 'Sign a PDF without printing',
    title: 'How to Sign a PDF Without Printing It (Free, Any Device) | PDFMint',
    description: 'Sign PDF documents electronically without printing and scanning. Draw, type or upload your signature on phone or computer — free.',
    h1: 'How to Sign a PDF Without Printing It', published: '2026-11-04', updated: '2026-11-04', minutes: 4,
    body: `<p>Printing a document just to sign it, then scanning it back, wastes time and paper. You can add your signature directly to the PDF instead.</p>
<h2>Step by step</h2>
<ol><li>Open <a href="/sign-pdf/">PDFMint Sign PDF</a> and select your document.</li>
<li>Create your signature: <strong>draw</strong> it with your finger or mouse, <strong>type</strong> your name in a handwriting style, or <strong>upload</strong> a photo of your signature on white paper.</li>
<li>Choose the page (the last page is selected automatically) and tap where the signature should go. Drag to adjust and use the slider to resize.</li>
<li>Click <strong>Sign &amp; download</strong>.</li></ol>
<h2>Tips for a natural-looking signature</h2>
<ul><li>Sign on white paper with a dark pen, photograph it in good light and use the Upload option — it looks the most authentic.</li><li>Keep the signature roughly the width of the signature line.</li><li>For contracts, tick “Add to every page” to add your initials to each page.</li></ul>
<h2>Is it legally valid?</h2>
<p>Simple electronic signatures are widely accepted for everyday agreements, but rules vary by country and document type. Some official documents require a certified digital signature (for example, a DSC in India) or a handwritten signature. When in doubt, ask the organisation that requested it.</p>`,
    faqs: [['Can I sign on my phone?', 'Yes — drawing with your finger works well.'], ['Is my signature saved?', 'No. It exists only in your browser while the page is open.']],
    related: ['/sign-pdf/', '/watermark-pdf/', '/merge-pdf/']
  }
];
