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

  // Draw the text on a canvas so any language/script works, then embed as PNG.
  function textImage(text, color) {
    const px = 160;
    const font = 'bold ' + px + 'px system-ui, "Segoe UI", "Nirmala UI", Arial, sans-serif';
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    ctx.font = font;
    const w = Math.ceil(ctx.measureText(text).width) + 20;
    c.width = w; c.height = Math.ceil(px * 1.35);
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 10, c.height / 2);
    return { url: c.toDataURL('image/png'), ratio: c.height / c.width };
  }

  async function run() {
    if (!bytes) return;
    const text = $('text').value.trim();
    if (!text) return P.status(st, 'Type the watermark text first.', 'err');
    btn.disabled = true;
    try {
      const { degrees } = await P.pdflib();
      const doc = await P.loadPdfLib(bytes);
      const img = textImage(text, $('color').value);
      const png = await doc.embedPng(img.url);
      const size = Number($('tsize').value);
      const angle = Number($('angle').value);
      const opacity = Number($('opacity').value);
      const tile = $('layout').value === 'tile';
      const th = (angle * Math.PI) / 180, cos = Math.cos(th), sin = Math.sin(th);
      const h = size * 1.35, w = h / img.ratio;
      const place = (page, cx, cy) => page.drawImage(png, {
        x: cx - (w / 2) * cos + (h / 2) * sin,
        y: cy - (w / 2) * sin - (h / 2) * cos,
        width: w, height: h, rotate: degrees(angle), opacity
      });
      doc.getPages().forEach((page) => {
        const b = page.getCropBox();
        if (!tile) return place(page, b.x + b.width / 2, b.y + b.height / 2);
        const stepX = w * 1.3 + 40, stepY = h * 4;
        for (let y = b.y - stepY; y < b.y + b.height + stepY; y += stepY) {
          for (let x = b.x - stepX; x < b.x + b.width + stepX; x += stepX) place(page, x, y);
        }
      });
      const data = await doc.save();
      P.download(data, P.base(file.name) + '_watermarked.pdf');
      P.status(st, 'Done! Watermark added to every page.', 'ok');
    } catch (e) {
      console.error(e);
      P.status(st, P.errMsg(e), 'err');
    } finally { btn.disabled = false; }
  }

  btn.addEventListener('click', run);
  $('clear').addEventListener('click', () => { file = bytes = null; panel.classList.add('hidden'); P.status(st, ''); });
  P.wireDrop($('drop'), $('file'), add);
})();
