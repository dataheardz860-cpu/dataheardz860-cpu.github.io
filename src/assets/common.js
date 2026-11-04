// Shared helpers for every PDFMint tool. Heavy libraries load only when needed.
(function () {
  const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/';
  const LIBS = {
    jspdf: CDN + 'jspdf/2.5.1/jspdf.umd.min.js',
    pdflib: CDN + 'pdf-lib/1.17.1/pdf-lib.min.js',
    pdfjs: CDN + 'pdf.js/3.11.174/pdf.min.js',
    pdfjsWorker: CDN + 'pdf.js/3.11.174/pdf.worker.min.js',
    jszip: CDN + 'jszip/3.10.1/jszip.min.js',
    mammoth: CDN + 'mammoth/1.6.0/mammoth.browser.min.js',
    html2pdf: CDN + 'html2pdf.js/0.10.1/html2pdf.bundle.min.js',
    heic2any: 'https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js'
  };
  const loaded = {};

  function load(key) {
    const src = LIBS[key] || key;
    if (!loaded[src]) {
      loaded[src] = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.crossOrigin = 'anonymous';
        s.onload = resolve;
        s.onerror = () => { delete loaded[src]; reject(new Error('Could not load a required component. Check your internet connection and try again.')); };
        document.head.appendChild(s);
      });
    }
    return loaded[src];
  }

  async function pdfjs() {
    await load('pdfjs');
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = LIBS.pdfjsWorker;
    return window.pdfjsLib;
  }
  async function pdflib() { await load('pdflib'); return window.PDFLib; }
  async function jspdf() { await load('jspdf'); return window.jspdf.jsPDF; }
  async function jszip() { await load('jszip'); return window.JSZip; }

  async function openPdfjs(bytes) {
    const lib = await pdfjs();
    return lib.getDocument({ data: bytes.slice() }).promise; // slice: pdf.js detaches the buffer
  }

  async function renderPage(page, scale) {
    const vp = page.getViewport({ scale });
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.floor(vp.width));
    c.height = Math.max(1, Math.floor(vp.height));
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
    // 'print' intent avoids requestAnimationFrame, so rendering keeps going in background tabs.
    await page.render({ canvasContext: ctx, viewport: vp, intent: 'print' }).promise;
    return c;
  }

  // Render an element (already attached to the page) to a PDF blob.
  // Non-Latin scripts (Hindi etc.) use the browser's own text rendering so letters join correctly.
  const complexScript = (s) => /[^\u0000-ɏḀ-ỿ -⁯₠-⃏℀-⅏\s]/.test(s);
  async function htmlToPdf(el, o) {
    await load('html2pdf');
    const scale = Math.max(0.5, Math.min(2, 30000 / Math.max(1, el.scrollHeight))); // stay under canvas size limits
    const run = (fo) => window.html2pdf().set({
      margin: o.margin, image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale, useCORS: true, backgroundColor: '#ffffff', foreignObjectRendering: fo },
      jsPDF: { unit: 'mm', format: o.format, orientation: o.orientation || 'portrait' },
      pagebreak: { mode: ['css', 'legacy'], avoid: o.avoid || ['p', 'li', 'img', 'tr', 'h1', 'h2', 'h3'] }
    }).from(el).outputPdf('blob');
    if (complexScript(el.textContent)) {
      try { return await run(true); } catch (e) { console.warn('Native text rendering unavailable, using fallback', e); }
    }
    return run(false);
  }

  function canvasBlob(c, type, q) {
    return new Promise((res) => c.toBlob(res, type, q));
  }

  function status(el, msg, kind) {
    el.textContent = msg || '';
    el.className = 'status' + (kind ? ' ' + kind : '');
  }

  function download(data, name, type) {
    const blob = data instanceof Blob ? data : new Blob([data], { type: type || 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }

  function fmt(b) {
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
    return (b / 1048576).toFixed(2) + ' MB';
  }
  const base = (n) => n.replace(/\.[^.]+$/, '');
  const tick = () => new Promise((r) => setTimeout(r, 0));
  const isPdf = (f) => f.type === 'application/pdf' || /\.pdf$/i.test(f.name);
  const bytes = async (f) => new Uint8Array(await f.arrayBuffer());

  function errMsg(e) {
    const n = (e && (e.name || '')) + ' ' + (e && e.message || '');
    if (/Password|Encrypt/i.test(n)) return 'This PDF is password-protected. Remove the password first, then try again.';
    if (/Invalid PDF|InvalidPDF|No PDF header|Failed to parse/i.test(n)) return 'This file does not look like a valid PDF.';
    return (e && e.message) || 'Something went wrong. Please try again.';
  }

  // Load a PDF with pdf-lib, giving a clear error for protected files.
  async function loadPdfLib(data) {
    const { PDFDocument } = await pdflib();
    const doc = await PDFDocument.load(data, { ignoreEncryption: true });
    if (doc.isEncrypted) { const e = new Error('Encrypted'); e.name = 'PasswordException'; throw e; }
    return doc;
  }

  function wireDrop(zone, input, onFiles, extraInputs) {
    zone.addEventListener('click', (e) => {
      if (e.target.closest('[data-input]')) return;
      if (e.target !== input) input.click();
    });
    zone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); }
    });
    [input].concat(extraInputs || []).forEach((inp) => {
      inp.addEventListener('change', () => { if (inp.files.length) onFiles(Array.from(inp.files)); inp.value = ''; });
    });
    ['dragenter', 'dragover'].forEach((t) => zone.addEventListener(t, (e) => { e.preventDefault(); zone.classList.add('over'); }));
    ['dragleave', 'drop'].forEach((t) => zone.addEventListener(t, (e) => { e.preventDefault(); zone.classList.remove('over'); }));
    zone.addEventListener('drop', (e) => { if (e.dataTransfer.files.length) onFiles(Array.from(e.dataTransfer.files)); });
  }

  // Sortable list with move / remove buttons and drag-and-drop.
  function list(ul, opts) {
    let items = [];
    let drag = null;
    const extra = opts.actions || [];
    function render() {
      ul.innerHTML = '';
      items.forEach((it, i) => {
        const li = document.createElement('li');
        li.draggable = true;
        li.dataset.i = i;
        opts.render(it, li, i);
        const ctl = document.createElement('div');
        ctl.className = 'ctl';
        const btns = extra.concat([['-1', '←', 'Move earlier'], ['1', '→', 'Move later'], ['x', '×', 'Remove']]);
        btns.forEach(([a, label, aria]) => {
          const b = document.createElement('button');
          b.type = 'button'; b.dataset.a = a; b.textContent = label; b.setAttribute('aria-label', aria); b.title = aria;
          ctl.appendChild(b);
        });
        li.appendChild(ctl);
        ul.appendChild(li);
      });
      if (opts.onChange) opts.onChange(items);
    }
    ul.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-a]');
      if (!b) return;
      const i = Number(b.closest('li').dataset.i);
      const a = b.dataset.a;
      if (a === 'x') { const [r] = items.splice(i, 1); if (opts.onRemove) opts.onRemove(r); }
      else if (a === '-1' || a === '1') {
        const j = i + Number(a);
        if (j < 0 || j >= items.length) return;
        [items[i], items[j]] = [items[j], items[i]];
      } else if (opts.onAction) opts.onAction(a, items[i], i);
      render();
    });
    ul.addEventListener('dragstart', (e) => {
      const li = e.target.closest('li'); if (!li) return;
      drag = Number(li.dataset.i); li.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', ''); } catch (_) {}
    });
    ul.addEventListener('dragend', () => { drag = null; ul.querySelectorAll('.dragging').forEach((x) => x.classList.remove('dragging')); });
    ul.addEventListener('dragover', (e) => { if (drag !== null) e.preventDefault(); });
    ul.addEventListener('drop', (e) => {
      if (drag === null) return;
      e.preventDefault(); e.stopPropagation();
      const t = e.target.closest('li'); if (!t) return;
      const to = Number(t.dataset.i);
      if (to === drag) return;
      const [m] = items.splice(drag, 1);
      items.splice(to, 0, m);
      drag = null;
      render();
    });
    return {
      get items() { return items; },
      add(arr) { items.push(...arr); render(); },
      clear() { items.forEach((r) => opts.onRemove && opts.onRemove(r)); items = []; render(); },
      render
    };
  }

  // "1-3, 5, 8-" → zero-based page indexes
  function parseRanges(str, max) {
    const out = [];
    for (const part of String(str).split(',')) {
      const p = part.trim();
      if (!p) continue;
      let a, b;
      const m = p.match(/^(\d*)\s*-\s*(\d*)$/);
      if (m) { a = m[1] ? +m[1] : 1; b = m[2] ? +m[2] : max; }
      else if (/^\d+$/.test(p)) { a = b = +p; }
      else throw new Error('"' + p + '" is not a valid page range. Use a format like 1-3, 5');
      if (a < 1 || b > max || a > b) throw new Error('Pages must be between 1 and ' + max + ' ("' + p + '")');
      for (let i = a; i <= b; i++) out.push(i - 1);
    }
    if (!out.length) throw new Error('Enter the pages you want, e.g. 1-3, 5');
    return out;
  }

  // Files shared to the installed app (Android share sheet) arrive via the service worker.
  async function takeShared() {
    if (!/[?&]shared=1/.test(location.search) || !('caches' in window)) return [];
    const c = await caches.open('pdfm-shared');
    const files = [];
    for (const req of await c.keys()) {
      const r = await c.match(req);
      const b = await r.blob();
      files.push(new File([b], decodeURIComponent(r.headers.get('x-name') || 'file'), { type: b.type }));
    }
    await caches.delete('pdfm-shared');
    history.replaceState(null, '', location.pathname);
    return files;
  }

  window.PDFM = {
    LIBS, load, pdfjs, pdflib, jspdf, jszip, openPdfjs, renderPage, canvasBlob, loadPdfLib, htmlToPdf, complexScript,
    status, download, fmt, base, tick, isPdf, bytes, errMsg, wireDrop, list, parseRanges, takeShared,
    config: window.PDFM_CONFIG || {}
  };

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
})();
