(function () {
  const P = PDFM, $ = (id) => document.getElementById(id);
  const st = $('status'), btn = $('go'), panel = $('panel');
  const pad = $('pad'), stage = $('stage'), pageCanvas = $('pageCanvas'), sigEl = $('sig');
  let file = null, bytes = null, pdf = null, tab = 'draw';
  let sig = null;              // { url, ratio }
  let pos = { x: 0.7, y: 0.85 }; // centre of signature, as a fraction of the page
  let uploaded = null;

  // ── signature pad ──
  const pctx = pad.getContext('2d');
  let drawing = false, drawn = false, last = null;
  function sizePad() {
    const r = window.devicePixelRatio || 1;
    const keep = drawn ? pad.toDataURL() : null;
    pad.width = pad.clientWidth * r; pad.height = pad.clientHeight * r;
    if (keep) { const i = new Image(); i.onload = () => pctx.drawImage(i, 0, 0, pad.width, pad.height); i.src = keep; }
  }
  function pt(e) { const b = pad.getBoundingClientRect(); return [(e.clientX - b.left) * pad.width / b.width, (e.clientY - b.top) * pad.height / b.height]; }
  pad.addEventListener('pointerdown', (e) => { drawing = true; last = pt(e); pad.setPointerCapture(e.pointerId); });
  pad.addEventListener('pointermove', (e) => {
    if (!drawing) return;
    const p = pt(e);
    pctx.strokeStyle = $('ink').value;
    pctx.lineWidth = 2.6 * (window.devicePixelRatio || 1);
    pctx.lineCap = pctx.lineJoin = 'round';
    pctx.beginPath(); pctx.moveTo(last[0], last[1]); pctx.lineTo(p[0], p[1]); pctx.stroke();
    last = p; drawn = true;
  });
  ['pointerup', 'pointercancel'].forEach((t) => pad.addEventListener(t, () => { if (drawing) { drawing = false; refresh(); } }));
  $('padClear').addEventListener('click', () => { pctx.clearRect(0, 0, pad.width, pad.height); drawn = false; refresh(); });

  // Crop transparent edges so the signature can be sized precisely.
  function trim(c) {
    const ctx = c.getContext('2d');
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let x0 = c.width, y0 = c.height, x1 = -1, y1 = -1;
    for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
      if (d[(y * c.width + x) * 4 + 3] > 10) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    if (x1 < 0) return null;
    const pad2 = 6;
    x0 = Math.max(0, x0 - pad2); y0 = Math.max(0, y0 - pad2); x1 = Math.min(c.width - 1, x1 + pad2); y1 = Math.min(c.height - 1, y1 + pad2);
    const o = document.createElement('canvas');
    o.width = x1 - x0 + 1; o.height = y1 - y0 + 1;
    o.getContext('2d').drawImage(c, x0, y0, o.width, o.height, 0, 0, o.width, o.height);
    return { url: o.toDataURL('image/png'), ratio: o.height / o.width };
  }

  function typedSig() {
    const name = $('typed').value.trim();
    if (!name) return null;
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    const font = '120px ' + $('font').value + ', cursive';
    ctx.font = font;
    c.width = Math.ceil(ctx.measureText(name).width) + 60; c.height = 200;
    ctx.font = font; ctx.fillStyle = $('ink').value; ctx.textBaseline = 'middle';
    ctx.fillText(name, 30, 100);
    return trim(c);
  }

  function uploadSig(img) {
    const c = document.createElement('canvas');
    const s = Math.min(1, 1200 / img.naturalWidth);
    c.width = img.naturalWidth * s; c.height = img.naturalHeight * s;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, c.width, c.height);
    const id = ctx.getImageData(0, 0, c.width, c.height), d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      const lum = 0.3 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2];
      if (lum > 200) d[i + 3] = 0; else if (lum > 150) d[i + 3] = Math.round(d[i + 3] * (200 - lum) / 50);
    }
    ctx.putImageData(id, 0, 0);
    return trim(c);
  }

  function refresh() {
    sig = tab === 'draw' ? (drawn ? trim(pad) : null) : tab === 'type' ? typedSig() : uploaded;
    if (!sig) { sigEl.classList.add('hidden'); return; }
    sigEl.src = sig.url;
    sigEl.classList.remove('hidden');
    placeOverlay();
  }

  function placeOverlay() {
    if (!sig) return;
    const W = stage.clientWidth, H = stage.clientHeight;
    const w = (Number($('sigSize').value) / 100) * W, h = w * sig.ratio;
    sigEl.style.width = w + 'px';
    sigEl.style.left = (pos.x * W - w / 2) + 'px';
    sigEl.style.top = (pos.y * H - h / 2) + 'px';
  }

  document.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => {
    tab = b.dataset.tab;
    document.querySelectorAll('[data-tab]').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    document.querySelectorAll('[data-pane]').forEach((x) => x.classList.toggle('hidden', x.dataset.pane !== tab));
    if (tab === 'draw') sizePad();
    refresh();
  }));
  if (document.fonts) ['Dancing Script', 'Great Vibes', 'Caveat'].forEach((f) => document.fonts.load("120px '" + f + "'").then(() => { if (tab === 'type') refresh(); }).catch(() => {}));
  $('typed').addEventListener('input', refresh);
  $('font').addEventListener('change', refresh);
  $('ink').addEventListener('change', refresh);
  $('sigSize').addEventListener('input', placeOverlay);
  $('sigFile').addEventListener('change', () => {
    const f = $('sigFile').files[0];
    if (!f) return;
    const img = new Image();
    img.onload = () => { uploaded = uploadSig(img); URL.revokeObjectURL(img.src); refresh(); };
    img.src = URL.createObjectURL(f);
  });

  // ── placing on the page ──
  stage.addEventListener('click', (e) => {
    if (e.target === sigEl || !sig) return;
    const b = stage.getBoundingClientRect();
    pos = { x: (e.clientX - b.left) / b.width, y: (e.clientY - b.top) / b.height };
    placeOverlay();
  });
  let dragOff = null;
  sigEl.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    const b = stage.getBoundingClientRect();
    dragOff = [(e.clientX - b.left) / b.width - pos.x, (e.clientY - b.top) / b.height - pos.y];
    sigEl.setPointerCapture(e.pointerId);
  });
  sigEl.addEventListener('pointermove', (e) => {
    if (!dragOff) return;
    const b = stage.getBoundingClientRect();
    pos = { x: Math.min(1, Math.max(0, (e.clientX - b.left) / b.width - dragOff[0])), y: Math.min(1, Math.max(0, (e.clientY - b.top) / b.height - dragOff[1])) };
    placeOverlay();
  });
  ['pointerup', 'pointercancel'].forEach((t) => sigEl.addEventListener(t, () => { dragOff = null; }));

  async function showPage(n) {
    const page = await pdf.getPage(n);
    const vp = page.getViewport({ scale: 1 });
    const c = await P.renderPage(page, Math.min(2.5, (stage.clientWidth * (window.devicePixelRatio || 1)) / vp.width));
    pageCanvas.width = c.width; pageCanvas.height = c.height;
    pageCanvas.getContext('2d').drawImage(c, 0, 0);
    placeOverlay();
  }
  $('pageSel').addEventListener('change', () => showPage(Number($('pageSel').value)));
  window.addEventListener('resize', () => { placeOverlay(); });

  async function add(files) {
    const f = files[0];
    if (!P.isPdf(f)) return P.status(st, 'Please choose a PDF file.', 'err');
    try {
      P.status(st, 'Opening PDF…');
      bytes = await P.bytes(f);
      await P.loadPdfLib(bytes);
      if (pdf) pdf.destroy();
      pdf = await P.openPdfjs(bytes);
      file = f;
      $('pageSel').innerHTML = Array.from({ length: pdf.numPages }, (_, i) => '<option value="' + (i + 1) + '">Page ' + (i + 1) + '</option>').join('');
      if (pdf.numPages > 1) { $('pageSel').value = String(pdf.numPages); }
      panel.classList.remove('hidden');
      sizePad();
      await showPage(Number($('pageSel').value));
      P.status(st, 'Create your signature, then tap the page where it should go.');
    } catch (e) { console.error(e); P.status(st, P.errMsg(e), 'err'); }
  }

  async function save() {
    if (!bytes) return;
    if (!sig) return P.status(st, 'Create your signature first (draw, type or upload).', 'err');
    btn.disabled = true;
    try {
      const doc = await P.loadPdfLib(bytes);
      const png = await doc.embedPng(sig.url);
      const frac = Number($('sigSize').value) / 100;
      const pages = doc.getPages();
      const targets = $('allPages').checked ? pages : [pages[Number($('pageSel').value) - 1]];
      targets.forEach((page) => {
        const b = page.getCropBox();
        const w = frac * b.width, h = w * sig.ratio;
        page.drawImage(png, { x: b.x + pos.x * b.width - w / 2, y: b.y + b.height - pos.y * b.height - h / 2, width: w, height: h });
      });
      const data = await doc.save();
      P.download(data, P.base(file.name) + '_signed.pdf');
      P.status(st, 'Done! Your signed PDF has been downloaded.', 'ok');
    } catch (e) {
      console.error(e);
      P.status(st, P.errMsg(e), 'err');
    } finally { btn.disabled = false; }
  }

  btn.addEventListener('click', save);
  $('clear').addEventListener('click', () => { file = bytes = null; panel.classList.add('hidden'); P.status(st, ''); });
  P.wireDrop($('drop'), $('file'), add);
})();
