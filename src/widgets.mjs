// HTML for each tool's interactive area. `t` = interface strings, `o` = page options.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function drop(t, { title, sub, btn, accept, multiple, camera }) {
  return `<div class="drop" id="drop" tabindex="0" role="button" aria-label="${esc(title)}">
  <strong>${title}</strong><span>${sub}</span>
  <div class="btns"><span class="btn">${btn}</span>${camera ? `<label class="btn ghost" data-input>${t.camera}<input type="file" id="camera" accept="image/*" capture="environment" hidden></label>` : ''}</div>
  <input type="file" id="file" accept="${accept}"${multiple ? ' multiple' : ''} hidden>
</div>`;
}

const opt = (v, label, sel) => `<option value="${v}"${String(sel) === String(v) ? ' selected' : ''}>${label}</option>`;
const status = '<p class="status" id="status" role="status" aria-live="polite"></p>';
const pdfDrop = (t) => drop(t, { title: t.pdfDrop, sub: t.pdfSub, btn: t.pdfBtn, accept: 'application/pdf,.pdf' });

export const widgets = {
  image: (t, o = {}) => `${drop(t, { title: t.imgDrop, sub: t.imgSub, btn: t.imgBtn, accept: 'image/*,.heic,.heif', multiple: true, camera: true })}
<div id="panel" class="hidden">
  <ul class="thumbs" id="list" aria-label="Selected images"></ul>
  <div class="options">
    <label>${t.pageSize}<select id="size">${opt('a4', 'A4', o.size || 'a4')}${opt('letter', 'US Letter', o.size)}${opt('legal', 'US Legal', o.size)}${opt('fit', t.sameAsImage, o.size)}</select></label>
    <label>${t.orientation}<select id="orient">${opt('auto', t.auto)}${opt('p', t.portrait)}${opt('l', t.landscape)}</select></label>
    <label>${t.margin}<select id="margin">${opt('0', t.none, o.margin ?? 10)}${opt('10', t.small, o.margin ?? 10)}${opt('20', t.large, o.margin ?? 10)}</select></label>
    <label>${t.quality}<select id="quality">${opt('0.95', t.high, 0.85)}${opt('0.85', t.balanced, 0.85)}${opt('0.65', t.smaller, 0.85)}</select></label>
    <label>${t.maxSize}<select id="target">${opt('', t.noLimit, o.target || '')}${opt('50', '50 KB', o.target)}${opt('100', '100 KB', o.target)}${opt('200', '200 KB', o.target)}${opt('300', '300 KB', o.target)}${opt('500', '500 KB', o.target)}${opt('1024', '1 MB', o.target)}${opt('2048', '2 MB', o.target)}</select></label>
  </div>
  <div class="actions"><button class="btn" id="convert" type="button">${t.toPdf}</button><button class="btn ghost" id="clear" type="button">${t.clear}</button></div>
</div>${status}`,

  word: (t, o = {}, cfg = {}) => `${drop(t, { title: t.wordDrop, sub: t.wordSub, btn: t.wordBtn, accept: '.docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword' })}
<div id="panel" class="hidden">
  <p style="margin:16px 0 0;font-weight:600">${t.preview}: <span id="fname"></span></p>
  <div class="preview-wrap" id="pwrap"><div class="doc" id="preview"></div></div>
  <div class="options">
    ${cfg.convertApi ? `<label>${t.mode}<select id="mode">${opt('local', t.modeLocal)}${opt('server', t.modeServer)}</select></label>` : ''}
    <label>${t.pageSize}<select id="size">${opt('a4', 'A4')}${opt('letter', 'US Letter')}</select></label>
    <label>${t.margin}<select id="margin">${opt('10', t.narrow, 20)}${opt('20', t.normal, 20)}${opt('25', t.wide, 20)}</select></label>
  </div>
  <div class="actions"><button class="btn" id="convert" type="button">${t.toPdf}</button><button class="btn ghost" id="clear" type="button">${t.another}</button></div>
</div>${status}`,

  merge: (t) => `${drop(t, { title: t.pdfsDrop, sub: t.pdfsSub, btn: t.pdfsBtn, accept: 'application/pdf,.pdf', multiple: true })}
<div id="panel" class="hidden">
  <ul class="thumbs" id="list" aria-label="PDF files to merge"></ul>
  <div class="actions" style="margin-top:18px"><button class="btn" id="go" type="button">${t.merge}</button><button class="btn ghost" id="clear" type="button">${t.clear}</button></div>
</div>${status}`,

  split: (t) => `${pdfDrop(t)}
<div id="panel" class="hidden">
  <p class="info" id="info"></p>
  <div class="options">
    <label>Split mode<select id="mode">${opt('range', 'Extract pages into one PDF')}${opt('ranges', 'Each range as a separate PDF')}${opt('each', 'Every page as a separate PDF')}${opt('n', 'Every N pages')}</select></label>
    <label id="rangeBox">Pages<input type="text" id="range" placeholder="e.g. 1-3, 5, 8-10"></label>
    <label id="nBox" class="hidden">Pages per file<input type="number" id="n" min="1" value="2"></label>
  </div>
  <div class="actions"><button class="btn" id="go" type="button">Split PDF</button><button class="btn ghost" id="clear" type="button">${t.another}</button></div>
</div>${status}`,

  compress: (t, o = {}) => `${pdfDrop(t)}
<div id="panel" class="hidden">
  <p class="info" id="info"></p>
  <div class="options">
    <label>${t.level}<select id="level">${opt('light', t.lvLight, o.target ? 'medium' : 'medium')}${opt('medium', t.lvMedium, 'medium')}${opt('strong', t.lvStrong)}${opt('extreme', t.lvExtreme)}</select></label>
    <label>${t.targetSize}<select id="target">${opt('', t.anySize, o.target || '')}${opt('100', '100 KB', o.target)}${opt('200', '200 KB', o.target)}${opt('300', '300 KB', o.target)}${opt('500', '500 KB', o.target)}${opt('1024', '1 MB', o.target)}${opt('2048', '2 MB', o.target)}</select></label>
  </div>
  <div class="actions"><button class="btn" id="go" type="button">${t.compress}</button><button class="btn ghost" id="clear" type="button">${t.another}</button></div>
</div>${status}`,

  pdf2img: (t, o = {}) => `${pdfDrop(t)}
<div id="panel" class="hidden">
  <p class="info" id="info"></p>
  <div class="options">
    <label>Image format<select id="format">${opt('jpg', 'JPG', o.format || 'jpg')}${opt('png', 'PNG', o.format)}</select></label>
    <label>Resolution<select id="dpi">${opt('96', 'Screen (96 DPI)', 150)}${opt('150', 'Standard (150 DPI)', 150)}${opt('300', 'Print (300 DPI)', 150)}</select></label>
    <label>Pages (optional)<input type="text" id="range" placeholder="All pages, or e.g. 1-3, 5"></label>
  </div>
  <div class="actions"><button class="btn" id="go" type="button">Convert to ${o.format === 'png' ? 'PNG' : 'images'}</button><button class="btn ghost" id="clear" type="button">${t.another}</button></div>
</div>${status}`,

  organize: (t) => `${pdfDrop(t)}
<div id="panel" class="hidden">
  <div class="bar"><button class="btn ghost small" type="button" id="rotL">↺ Rotate all left</button><button class="btn ghost small" type="button" id="rotR">↻ Rotate all right</button><button class="btn ghost small" type="button" id="reset">Reset</button></div>
  <ul class="thumbs" id="list" aria-label="Pages"></ul>
  <p class="note">Drag pages to reorder. ↺ ↻ rotate a page, × deletes it.</p>
  <div class="actions" style="margin-top:14px"><button class="btn" id="go" type="button">Save PDF</button><button class="btn ghost" id="clear" type="button">${t.another}</button></div>
</div>${status}`,

  pagenum: (t) => `${pdfDrop(t)}
<div id="panel" class="hidden">
  <p class="info" id="info"></p>
  <div class="options">
    <label>Position<select id="pos">${opt('bc', 'Bottom centre', 'bc')}${opt('br', 'Bottom right')}${opt('bl', 'Bottom left')}${opt('tc', 'Top centre')}${opt('tr', 'Top right')}${opt('tl', 'Top left')}</select></label>
    <label>Format<select id="fmt">${opt('n', '1, 2, 3', 'n')}${opt('page', 'Page 1')}${opt('of', '1 of 10')}${opt('pageof', 'Page 1 of 10')}</select></label>
    <label>Start at<input type="number" id="start" min="0" value="1"></label>
    <label>Font size<select id="fsize">${opt('9', '9', 11)}${opt('11', '11', 11)}${opt('14', '14', 11)}${opt('18', '18', 11)}</select></label>
    <label class="check"><input type="checkbox" id="skip"> Don't number the first page (cover)</label>
  </div>
  <div class="actions"><button class="btn" id="go" type="button">Add page numbers</button><button class="btn ghost" id="clear" type="button">${t.another}</button></div>
</div>${status}`,

  watermark: (t) => `${pdfDrop(t)}
<div id="panel" class="hidden">
  <p class="info" id="info"></p>
  <div class="options">
    <label style="flex-basis:100%">Watermark text<input type="text" id="text" value="CONFIDENTIAL" maxlength="80"></label>
    <label>Layout<select id="layout">${opt('center', 'Once, centred', 'center')}${opt('tile', 'Repeated (tiled)')}</select></label>
    <label>Angle<select id="angle">${opt('45', 'Diagonal', 45)}${opt('0', 'Horizontal', 45)}${opt('-45', 'Diagonal (other way)', 45)}</select></label>
    <label>Text size<select id="tsize">${opt('28', 'Small', 56)}${opt('56', 'Medium', 56)}${opt('90', 'Large', 56)}</select></label>
    <label>Opacity<select id="opacity">${opt('0.12', 'Faint', 0.25)}${opt('0.25', 'Light', 0.25)}${opt('0.45', 'Strong', 0.25)}</select></label>
    <label>Colour<input type="color" id="color" value="#d0021b"></label>
  </div>
  <div class="actions"><button class="btn" id="go" type="button">Add watermark</button><button class="btn ghost" id="clear" type="button">${t.another}</button></div>
</div>${status}`,

  sign: (t) => `${pdfDrop(t)}
<div id="panel" class="hidden">
  <h2 style="font-size:1.1rem;margin:20px 0 0">1. Create your signature</h2>
  <div class="tabs" role="tablist">
    <button type="button" role="tab" aria-selected="true" data-tab="draw">Draw</button>
    <button type="button" role="tab" aria-selected="false" data-tab="type">Type</button>
    <button type="button" role="tab" aria-selected="false" data-tab="upload">Upload image</button>
  </div>
  <div data-pane="draw"><canvas class="pad" id="pad" aria-label="Signature drawing area"></canvas>
    <div class="bar" style="justify-content:flex-start"><button class="btn ghost small" type="button" id="padClear">Clear drawing</button>
    <select id="ink" style="width:auto">${opt('#111111', 'Black ink')}${opt('#1a3fb0', 'Blue ink')}</select></div></div>
  <div data-pane="type" class="hidden"><div class="options" style="margin:0">
    <label>Your name<input type="text" id="typed" placeholder="Type your name" maxlength="40"></label>
    <label>Style<select id="font">${opt("'Dancing Script'", 'Flowing')}${opt("'Great Vibes'", 'Elegant')}${opt("'Caveat'", 'Handwritten')}</select></label></div></div>
  <div data-pane="upload" class="hidden"><input type="file" id="sigFile" accept="image/*"><p class="note" style="text-align:left">A photo of your signature on white paper works best — the white background is removed automatically.</p></div>
  <h2 style="font-size:1.1rem;margin:22px 0 0">2. Place it on the page</h2>
  <div class="options">
    <label>Page<select id="pageSel"></select></label>
    <label>Signature size<input type="range" id="sigSize" min="8" max="60" value="25"></label>
    <label class="check"><input type="checkbox" id="allPages"> Add to every page (e.g. initials)</label>
  </div>
  <p class="note">Tap or click on the page to place your signature, then drag to fine-tune.</p>
  <div class="stage" id="stage"><canvas id="pageCanvas"></canvas><img id="sig" class="sig hidden" alt="Your signature"></div>
  <div class="actions" style="margin-top:16px"><button class="btn" id="go" type="button">Sign &amp; download</button><button class="btn ghost" id="clear" type="button">${t.another}</button></div>
</div>${status}`,

  text: (t) => `<div class="field" style="margin-bottom:10px">Type or paste your text<textarea id="text" placeholder="Start typing, paste text, or open a .txt file…"></textarea></div>
<div class="bar" style="justify-content:flex-start;margin-top:0"><label class="btn ghost small">Open .txt file<input type="file" id="file" accept=".txt,text/plain" hidden></label></div>
<div class="options">
  <label>Font<select id="font">${opt('helvetica', 'Sans-serif (Helvetica)')}${opt('times', 'Serif (Times)')}${opt('courier', 'Monospace (Courier)')}</select></label>
  <label>Font size<select id="fsize">${opt('10', '10 pt', 12)}${opt('12', '12 pt', 12)}${opt('14', '14 pt', 12)}${opt('16', '16 pt', 12)}</select></label>
  <label>${t.pageSize}<select id="size">${opt('a4', 'A4')}${opt('letter', 'US Letter')}</select></label>
  <label>${t.margin}<select id="margin">${opt('36', t.narrow, 54)}${opt('54', t.normal, 54)}${opt('72', t.wide, 54)}</select></label>
</div>
<div class="actions"><button class="btn" id="go" type="button">${t.toPdf}</button></div>${status}`,

  html: (t) => `<div class="field" style="margin-bottom:10px">Paste HTML code<textarea id="html" placeholder="&lt;h1&gt;Hello&lt;/h1&gt;&lt;p&gt;Paste your HTML here…&lt;/p&gt;"></textarea></div>
<div class="bar" style="justify-content:flex-start;margin-top:0"><label class="btn ghost small">Open .html file<input type="file" id="file" accept=".html,.htm,text/html" hidden></label></div>
<div class="options">
  <label>${t.pageSize}<select id="size">${opt('a4', 'A4')}${opt('letter', 'US Letter')}</select></label>
  <label>${t.orientation}<select id="orient">${opt('portrait', t.portrait)}${opt('landscape', t.landscape)}</select></label>
  <label>${t.margin}<select id="margin">${opt('10', t.narrow, 15)}${opt('15', t.normal, 15)}${opt('25', t.wide, 15)}</select></label>
</div>
<div class="actions"><button class="btn" id="go" type="button">${t.toPdf}</button></div>${status}`
};

export const widgetScripts = {
  image: 'image-to-pdf.js', word: 'word-to-pdf.js', merge: 'merge-pdf.js', split: 'split-pdf.js',
  compress: 'compress-pdf.js', pdf2img: 'pdf-to-image.js', organize: 'organize-pdf.js',
  pagenum: 'page-numbers.js', watermark: 'watermark-pdf.js', sign: 'sign-pdf.js', text: 'text-to-pdf.js',
  html: 'html-to-pdf.js'
};
