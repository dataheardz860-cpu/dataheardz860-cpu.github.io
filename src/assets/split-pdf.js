(function () {
  const P = PDFM, $ = (id) => document.getElementById(id);
  const st = $('status'), btn = $('go'), panel = $('panel'), mode = $('mode');
  let file = null, bytes = null, count = 0;

  function syncMode() {
    const m = mode.value;
    $('rangeBox').classList.toggle('hidden', m === 'each' || m === 'n');
    $('nBox').classList.toggle('hidden', m !== 'n');
  }
  mode.addEventListener('change', syncMode);

  async function add(files) {
    const f = files[0];
    if (!P.isPdf(f)) return P.status(st, 'Please choose a PDF file.', 'err');
    try {
      P.status(st, 'Reading PDF…');
      bytes = await P.bytes(f);
      count = (await P.loadPdfLib(bytes)).getPageCount();
      file = f;
      $('info').textContent = f.name + ' — ' + count + ' page' + (count === 1 ? '' : 's') + ', ' + P.fmt(f.size);
      $('range').placeholder = 'e.g. 1-' + Math.min(3, count) + (count > 4 ? ', 5' : '');
      panel.classList.remove('hidden');
      P.status(st, '');
    } catch (e) { P.status(st, P.errMsg(e), 'err'); }
  }

  function groups() {
    const m = mode.value;
    if (m === 'range') return [P.parseRanges($('range').value, count)];
    if (m === 'ranges') {
      return $('range').value.split(',').filter((s) => s.trim()).map((part) => P.parseRanges(part, count));
    }
    const n = m === 'each' ? 1 : Math.max(1, parseInt($('n').value, 10) || 1);
    const out = [];
    for (let i = 0; i < count; i += n) out.push(Array.from({ length: Math.min(n, count - i) }, (_, k) => i + k));
    return out;
  }

  const label = (g) => {
    if (g.length === 1) return 'page' + (g[0] + 1);
    const contiguous = g.every((p, i) => i === 0 || p === g[i - 1] + 1);
    return contiguous ? 'pages' + (g[0] + 1) + '-' + (g[g.length - 1] + 1) : 'selected-pages';
  };

  async function split() {
    if (!bytes) return;
    let gs;
    try { gs = groups(); } catch (e) { return P.status(st, e.message, 'err'); }
    if (mode.value === 'ranges' && !gs.length) return P.status(st, 'Enter page ranges, e.g. 1-3, 4-6', 'err');
    btn.disabled = true;
    try {
      const { PDFDocument } = await P.pdflib();
      const src = await PDFDocument.load(bytes);
      const name = P.base(file.name);
      const outputs = [];
      for (let i = 0; i < gs.length; i++) {
        P.status(st, 'Creating file ' + (i + 1) + ' of ' + gs.length + '…');
        await P.tick();
        const doc = await PDFDocument.create();
        (await doc.copyPages(src, gs[i])).forEach((p) => doc.addPage(p));
        outputs.push([name + '_' + label(gs[i]) + '.pdf', await doc.save()]);
      }
      if (outputs.length === 1) {
        P.download(outputs[0][1], outputs[0][0]);
      } else {
        P.status(st, 'Packing ZIP file…');
        const JSZip = await P.jszip();
        const zip = new JSZip();
        outputs.forEach(([n, b]) => zip.file(n, b));
        P.download(await zip.generateAsync({ type: 'blob' }), name + '_split.zip', 'application/zip');
      }
      P.status(st, 'Done! ' + (outputs.length === 1 ? outputs[0][0] : outputs.length + ' PDF files (in a ZIP)') + ' downloaded.', 'ok');
    } catch (e) {
      console.error(e);
      P.status(st, P.errMsg(e), 'err');
    } finally { btn.disabled = false; }
  }

  btn.addEventListener('click', split);
  $('clear').addEventListener('click', () => { file = bytes = null; panel.classList.add('hidden'); P.status(st, ''); });
  syncMode();
  P.wireDrop($('drop'), $('file'), add);
})();
