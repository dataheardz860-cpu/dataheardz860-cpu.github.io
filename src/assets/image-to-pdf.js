(function () {
  const P = PDFM, $ = (id) => document.getElementById(id);
  const PX_TO_MM = 25.4 / 96;
  const st = $('status'), btn = $('convert'), panel = $('panel');
  const sizeSel = $('size'), orientSel = $('orient'), marginSel = $('margin'), qualitySel = $('quality'), targetSel = $('target');
  // Tried in order (longest side in px, JPEG quality) until the PDF fits the size limit.
  const LADDER = [[2400, 0.8], [2000, 0.72], [1600, 0.65], [1400, 0.58], [1200, 0.52], [1000, 0.46], [850, 0.4], [700, 0.35], [560, 0.3], [450, 0.26]];

  const L = P.list($('list'), {
    render(it, li, i) {
      li.innerHTML = '<div class="pic"><img alt=""></div><div class="name"></div>';
      const img = li.querySelector('img');
      img.src = it.url; img.alt = it.name;
      const n = li.querySelector('.name');
      n.textContent = i + 1 + '. ' + it.name; n.title = it.name;
    },
    onRemove(it) { URL.revokeObjectURL(it.url); },
    onChange(items) { panel.classList.toggle('hidden', !items.length); }
  });

  const loadImage = (url) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
  const isHeic = (f) => /hei[cf]/i.test(f.type) || /\.hei[cf]$/i.test(f.name);

  async function open(file) {
    let url = URL.createObjectURL(file);
    try { return { url, img: await loadImage(url) }; } catch (e) { URL.revokeObjectURL(url); if (!isHeic(file)) throw e; }
    P.status(st, 'Converting HEIC photo…');
    await P.load('heic2any');
    let out = await window.heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 });
    if (Array.isArray(out)) out = out[0];
    url = URL.createObjectURL(out);
    return { url, img: await loadImage(url) };
  }

  async function add(files) {
    P.load('jspdf').catch(() => {});
    let skipped = 0;
    const added = [];
    for (const f of files) {
      if (!f.type.startsWith('image/') && !isHeic(f)) { skipped++; continue; }
      try { const r = await open(f); added.push({ name: f.name, ...r }); } catch (e) { skipped++; }
    }
    L.add(added);
    if (skipped) P.status(st, skipped + ' file(s) skipped — not a supported image.', 'err');
    else P.status(st, L.items.length + ' image(s) ready. Drag to reorder.');
  }

  function toJpeg(img, maxSide, q) {
    let w = img.naturalWidth, h = img.naturalHeight;
    const s = Math.min(1, maxSide / Math.max(w, h));
    w = Math.max(1, Math.round(w * s)); h = Math.max(1, Math.round(h * s));
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    const url = c.toDataURL('image/jpeg', q);
    c.width = c.height = 0;
    return url;
  }

  async function build(maxSide, q, label) {
    const jsPDF = await P.jspdf();
    const size = sizeSel.value, margin = Number(marginSel.value), pref = orientSel.value;
    const items = L.items;
    let pdf = null;
    for (let i = 0; i < items.length; i++) {
      P.status(st, label + 'Adding image ' + (i + 1) + ' of ' + items.length + '…');
      await P.tick();
      const { img } = items[i];
      const w = img.naturalWidth, h = img.naturalHeight;
      let format, orient, m;
      if (size === 'fit') { format = [w * PX_TO_MM, h * PX_TO_MM]; orient = w > h ? 'l' : 'p'; m = 0; }
      else { format = size; orient = pref === 'auto' ? (w > h ? 'l' : 'p') : pref; m = margin; }
      if (!pdf) pdf = new jsPDF({ orientation: orient, unit: 'mm', format, compress: true });
      else pdf.addPage(format, orient);
      const pw = pdf.internal.pageSize.getWidth(), ph = pdf.internal.pageSize.getHeight();
      const r = Math.min((pw - 2 * m) / w, (ph - 2 * m) / h);
      const dw = w * r, dh = h * r;
      pdf.addImage(toJpeg(img, maxSide, q), 'JPEG', (pw - dw) / 2, (ph - dh) / 2, dw, dh, undefined, 'FAST');
    }
    return pdf.output('blob');
  }

  async function convert() {
    if (!L.items.length) return;
    btn.disabled = true;
    try {
      P.status(st, 'Loading PDF engine…');
      const target = Number(targetSel.value) * 1024;
      let blob, note = '';
      if (!target) {
        blob = await build(3000, Number(qualitySel.value), '');
      } else {
        for (let k = 0; k < LADDER.length; k++) {
          const b = await build(LADDER[k][0], LADDER[k][1], 'Fitting under ' + P.fmt(target) + ' (try ' + (k + 1) + ') — ');
          if (!blob || b.size < blob.size) blob = b;
          if (b.size <= target) break;
        }
        if (blob.size > target) note = ' Could not get under ' + P.fmt(target) + ' with ' + L.items.length + ' images while keeping them readable — try fewer images per PDF.';
      }
      const items = L.items;
      const name = items.length === 1 ? P.base(items[0].name) : 'images';
      P.download(blob, name + '.pdf');
      P.status(st, 'Done! ' + name + '.pdf — ' + items.length + ' page' + (items.length > 1 ? 's' : '') + ', ' + P.fmt(blob.size) + '.' + note, note ? 'err' : 'ok');
    } catch (e) {
      console.error(e);
      P.status(st, P.errMsg(e), 'err');
    } finally { btn.disabled = false; }
  }

  sizeSel.addEventListener('change', () => { const fit = sizeSel.value === 'fit'; orientSel.disabled = fit; marginSel.disabled = fit; });
  targetSel.addEventListener('change', () => { qualitySel.disabled = !!targetSel.value; });
  qualitySel.disabled = !!targetSel.value;
  $('clear').addEventListener('click', () => { L.clear(); P.status(st, ''); });
  btn.addEventListener('click', convert);
  P.wireDrop($('drop'), $('file'), add, [$('camera')]);
  P.takeShared().then((f) => f.length && add(f));
})();
