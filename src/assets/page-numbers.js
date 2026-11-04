(function () {
  const P = PDFM, $ = (id) => document.getElementById(id);
  const st = $('status'), btn = $('go'), panel = $('panel');
  let file = null, bytes = null;

  async function add(files) {
    const f = files[0];
    if (!P.isPdf(f)) return P.status(st, 'Please choose a PDF file.', 'err');
    try {
      bytes = await P.bytes(f);
      const n = (await P.loadPdfLib(bytes)).getPageCount();
      file = f;
      $('info').textContent = f.name + ' — ' + n + ' page' + (n === 1 ? '' : 's');
      panel.classList.remove('hidden');
      P.status(st, '');
    } catch (e) { P.status(st, P.errMsg(e), 'err'); }
  }

  async function run() {
    if (!bytes) return;
    btn.disabled = true;
    try {
      const { StandardFonts, rgb } = await P.pdflib();
      const doc = await P.loadPdfLib(bytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pos = $('pos').value, fmt = $('fmt').value;
      const size = Number($('fsize').value);
      const skip = $('skip').checked;
      const start = parseInt($('start').value, 10) || 0;
      const pages = doc.getPages();
      const last = start + pages.length - 1 - (skip ? 1 : 0);
      const margin = 28;
      pages.forEach((page, i) => {
        if (skip && i === 0) return;
        const n = start + i - (skip ? 1 : 0);
        const text = fmt === 'page' ? 'Page ' + n : fmt === 'of' ? n + ' of ' + last : fmt === 'pageof' ? 'Page ' + n + ' of ' + last : String(n);
        const box = page.getCropBox();
        const tw = font.widthOfTextAtSize(text, size);
        const x = pos[1] === 'l' ? box.x + margin : pos[1] === 'r' ? box.x + box.width - margin - tw : box.x + (box.width - tw) / 2;
        const y = pos[0] === 't' ? box.y + box.height - margin - size : box.y + margin;
        page.drawText(text, { x, y, size, font, color: rgb(0.15, 0.15, 0.15) });
      });
      const data = await doc.save();
      P.download(data, P.base(file.name) + '_numbered.pdf');
      P.status(st, 'Done! Page numbers added.', 'ok');
    } catch (e) {
      console.error(e);
      P.status(st, P.errMsg(e), 'err');
    } finally { btn.disabled = false; }
  }

  btn.addEventListener('click', run);
  $('clear').addEventListener('click', () => { file = bytes = null; panel.classList.add('hidden'); P.status(st, ''); });
  P.wireDrop($('drop'), $('file'), add);
})();
