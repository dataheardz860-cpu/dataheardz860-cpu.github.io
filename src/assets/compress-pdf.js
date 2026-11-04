(function () {
  const P = PDFM, $ = (id) => document.getElementById(id);
  const st = $('status'), btn = $('go'), panel = $('panel');
  const LEVELS = { medium: [1.4, 0.7], strong: [1.1, 0.55], extreme: [0.8, 0.4] };
  // Tried in order until the file fits the target size.
  const LADDER = [[1.6, 0.8], [1.4, 0.7], [1.2, 0.62], [1.05, 0.55], [0.9, 0.48], [0.78, 0.42], [0.66, 0.36], [0.55, 0.3], [0.46, 0.25]];
  let file = null, bytes = null;

  async function add(files) {
    const f = files[0];
    if (!P.isPdf(f)) return P.status(st, 'Please choose a PDF file.', 'err');
    try {
      P.status(st, 'Reading PDF…');
      bytes = await P.bytes(f);
      const n = (await P.loadPdfLib(bytes)).getPageCount();
      file = f;
      $('info').textContent = f.name + ' — ' + n + ' page' + (n === 1 ? '' : 's') + ', ' + P.fmt(f.size);
      panel.classList.remove('hidden');
      P.status(st, '');
    } catch (e) { P.status(st, P.errMsg(e), 'err'); }
  }

  async function lossless() {
    const doc = await P.loadPdfLib(bytes);
    return doc.save({ useObjectStreams: true });
  }

  // Re-render each page as a JPEG at the given scale and quality.
  async function rasterize(pdf, scale, q, label) {
    const jsPDF = await P.jspdf();
    let out = null;
    for (let i = 1; i <= pdf.numPages; i++) {
      P.status(st, label + ' — page ' + i + ' of ' + pdf.numPages + '…');
      const page = await pdf.getPage(i);
      const vp = page.getViewport({ scale: 1 });
      const c = await P.renderPage(page, scale);
      const w = vp.width, h = vp.height, o = w > h ? 'l' : 'p';
      if (!out) out = new jsPDF({ unit: 'pt', format: [w, h], orientation: o, compress: true });
      else out.addPage([w, h], o);
      out.addImage(c.toDataURL('image/jpeg', q), 'JPEG', 0, 0, w, h, undefined, 'FAST');
      c.width = c.height = 0;
      page.cleanup();
    }
    return new Uint8Array(out.output('arraybuffer'));
  }

  async function compress() {
    if (!bytes) return;
    btn.disabled = true;
    const level = $('level').value;
    const target = Number($('target').value) * 1024;
    try {
      let result;
      let note = '';
      if (target) {
        result = await lossless();
        if (result.length > target) {
          const pdf = await P.openPdfjs(bytes);
          let best = result;
          for (let k = 0; k < LADDER.length; k++) {
            const r = await rasterize(pdf, LADDER[k][0], LADDER[k][1], 'Trying level ' + (k + 1) + ' of ' + LADDER.length);
            if (r.length < best.length) best = r;
            if (r.length <= target) break;
          }
          result = best;
          pdf.destroy();
        }
        if (result.length > target) note = ' We could not reach ' + P.fmt(target) + ' without making it unreadable — this is the smallest version. Try splitting the PDF into parts.';
      } else if (level === 'light') {
        P.status(st, 'Optimising…');
        result = await lossless();
      } else {
        const pdf = await P.openPdfjs(bytes);
        result = await rasterize(pdf, LEVELS[level][0], LEVELS[level][1], 'Compressing');
        pdf.destroy();
      }

      if (result.length >= file.size && !target) {
        P.status(st, 'This PDF is already well optimised (' + P.fmt(file.size) + '). Try a stronger level or a target size.', 'err');
        return;
      }
      if (result.length >= file.size) result = bytes;
      const saved = Math.max(0, Math.round((1 - result.length / file.size) * 100));
      P.download(result, P.base(file.name) + '_compressed.pdf');
      P.status(st, 'Done! ' + P.fmt(file.size) + ' → ' + P.fmt(result.length) + ' (' + saved + '% smaller).' + note, note ? 'err' : 'ok');
    } catch (e) {
      console.error(e);
      P.status(st, P.errMsg(e), 'err');
    } finally { btn.disabled = false; }
  }

  btn.addEventListener('click', compress);
  $('clear').addEventListener('click', () => { file = bytes = null; panel.classList.add('hidden'); P.status(st, ''); });
  P.wireDrop($('drop'), $('file'), add);
})();
