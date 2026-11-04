(function () {
  const P = PDFM, $ = (id) => document.getElementById(id);
  const st = $('status'), btn = $('go'), panel = $('panel');
  let file = null, bytes = null, count = 0;

  async function add(files) {
    const f = files[0];
    if (!P.isPdf(f)) return P.status(st, 'Please choose a PDF file.', 'err');
    try {
      P.status(st, 'Reading PDF…');
      bytes = await P.bytes(f);
      const pdf = await P.openPdfjs(bytes);
      count = pdf.numPages;
      pdf.destroy();
      file = f;
      $('info').textContent = f.name + ' — ' + count + ' page' + (count === 1 ? '' : 's');
      panel.classList.remove('hidden');
      P.status(st, '');
    } catch (e) { P.status(st, P.errMsg(e), 'err'); }
  }

  async function convert() {
    if (!bytes) return;
    let idx;
    try {
      idx = $('range').value.trim() ? P.parseRanges($('range').value, count) : Array.from({ length: count }, (_, i) => i);
    } catch (e) { return P.status(st, e.message, 'err'); }
    btn.disabled = true;
    const png = $('format').value === 'png';
    const ext = png ? 'png' : 'jpg';
    const scale = Number($('dpi').value) / 72;
    try {
      const pdf = await P.openPdfjs(bytes);
      const name = P.base(file.name);
      const out = [];
      for (let k = 0; k < idx.length; k++) {
        P.status(st, 'Converting page ' + (idx[k] + 1) + ' (' + (k + 1) + ' of ' + idx.length + ')…');
        const page = await pdf.getPage(idx[k] + 1);
        const c = await P.renderPage(page, scale);
        out.push([name + '_page' + (idx[k] + 1) + '.' + ext, await P.canvasBlob(c, png ? 'image/png' : 'image/jpeg', 0.92)]);
        c.width = c.height = 0;
        page.cleanup();
      }
      pdf.destroy();
      if (out.length === 1) {
        P.download(out[0][1], out[0][0]);
      } else {
        P.status(st, 'Packing ZIP file…');
        const JSZip = await P.jszip();
        const zip = new JSZip();
        out.forEach(([n, b]) => zip.file(n, b));
        P.download(await zip.generateAsync({ type: 'blob' }), name + '_' + ext + '.zip', 'application/zip');
      }
      P.status(st, 'Done! ' + out.length + ' image' + (out.length === 1 ? '' : 's') + ' downloaded' + (out.length > 1 ? ' as a ZIP file.' : '.'), 'ok');
    } catch (e) {
      console.error(e);
      P.status(st, P.errMsg(e), 'err');
    } finally { btn.disabled = false; }
  }

  btn.addEventListener('click', convert);
  $('clear').addEventListener('click', () => { file = bytes = null; panel.classList.add('hidden'); P.status(st, ''); });
  P.wireDrop($('drop'), $('file'), add);
})();
