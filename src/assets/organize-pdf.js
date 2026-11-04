(function () {
  const P = PDFM, $ = (id) => document.getElementById(id);
  const st = $('status'), btn = $('go'), panel = $('panel');
  let file = null, bytes = null, original = [];

  const L = P.list($('list'), {
    actions: [['l', '↺', 'Rotate left'], ['r', '↻', 'Rotate right']],
    render(it, li) {
      li.innerHTML = '<div class="pic"><img alt=""></div><div class="name"></div>';
      const img = li.querySelector('img');
      img.src = it.thumb;
      img.alt = 'Page ' + (it.index + 1);
      img.style.transform = 'rotate(' + it.rot + 'deg)';
      li.querySelector('.name').textContent = 'Page ' + (it.index + 1) + (it.rot % 360 ? ' · ' + (((it.rot % 360) + 360) % 360) + '°' : '');
    },
    onAction(a, it) { it.rot += a === 'l' ? -90 : 90; },
    onChange(items) { btn.disabled = !items.length; }
  });

  async function add(files) {
    const f = files[0];
    if (!P.isPdf(f)) return P.status(st, 'Please choose a PDF file.', 'err');
    try {
      P.status(st, 'Reading PDF…');
      bytes = await P.bytes(f);
      await P.loadPdfLib(bytes); // checks for password protection
      const pdf = await P.openPdfjs(bytes);
      file = f;
      L.clear();
      panel.classList.remove('hidden');
      const items = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        P.status(st, 'Loading page ' + i + ' of ' + pdf.numPages + '…');
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale: 1 });
        const c = await P.renderPage(page, Math.min(1, 220 / Math.max(vp.width, vp.height)));
        items.push({ index: i - 1, rot: 0, thumb: c.toDataURL('image/jpeg', 0.7) });
        page.cleanup();
      }
      pdf.destroy();
      original = items.map((x) => ({ ...x }));
      L.add(items);
      P.status(st, pdf.numPages + ' pages loaded.');
    } catch (e) { console.error(e); P.status(st, P.errMsg(e), 'err'); }
  }

  async function save() {
    const items = L.items;
    if (!items.length) return P.status(st, 'Keep at least one page.', 'err');
    btn.disabled = true;
    try {
      P.status(st, 'Saving…');
      const { PDFDocument, degrees } = await P.pdflib();
      const src = await PDFDocument.load(bytes);
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, items.map((x) => x.index));
      pages.forEach((p, k) => {
        const r = (((p.getRotation().angle + items[k].rot) % 360) + 360) % 360;
        p.setRotation(degrees(r));
        out.addPage(p);
      });
      const data = await out.save();
      P.download(data, P.base(file.name) + '_edited.pdf');
      P.status(st, 'Done! Saved ' + items.length + ' page' + (items.length === 1 ? '' : 's') + ' (' + P.fmt(data.length) + ').', 'ok');
    } catch (e) {
      console.error(e);
      P.status(st, P.errMsg(e), 'err');
    } finally { btn.disabled = false; }
  }

  $('rotL').addEventListener('click', () => { L.items.forEach((x) => { x.rot -= 90; }); L.render(); });
  $('rotR').addEventListener('click', () => { L.items.forEach((x) => { x.rot += 90; }); L.render(); });
  $('reset').addEventListener('click', () => { L.clear(); L.add(original.map((x) => ({ ...x }))); });
  btn.addEventListener('click', save);
  $('clear').addEventListener('click', () => { L.clear(); file = bytes = null; panel.classList.add('hidden'); P.status(st, ''); });
  P.wireDrop($('drop'), $('file'), add);
})();
