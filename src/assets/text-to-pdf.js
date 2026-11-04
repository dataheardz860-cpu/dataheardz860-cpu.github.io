(function () {
  const P = PDFM, $ = (id) => document.getElementById(id);
  const st = $('status'), btn = $('go');
  let name = 'document';

  $('file').addEventListener('change', async () => {
    const f = $('file').files[0];
    if (!f) return;
    $('text').value = await f.text();
    name = P.base(f.name);
    $('file').value = '';
    P.status(st, 'Loaded ' + f.name);
  });

  // Standard PDF fonts only cover Latin text; other scripts are rendered by the browser instead.
  const latinOnly = (s) => !P.complexScript(s);

  async function viaJsPdf(text) {
    const jsPDF = await P.jspdf();
    const size = Number($('fsize').value), m = Number($('margin').value);
    const doc = new jsPDF({ unit: 'pt', format: $('size').value });
    doc.setFont($('font').value, 'normal');
    doc.setFontSize(size);
    const pw = doc.internal.pageSize.getWidth(), ph = doc.internal.pageSize.getHeight();
    const lines = doc.splitTextToSize(text.replace(/\t/g, '    '), pw - 2 * m);
    const lh = size * 1.45;
    let y = m + size;
    lines.forEach((line) => {
      if (y > ph - m) { doc.addPage(); y = m + size; }
      doc.text(line, m, y);
      y += lh;
    });
    return doc.output('blob');
  }

  async function viaBrowser(text) {
    const mm = Number($('margin').value) * 25.4 / 72;
    const width = ($('size').value === 'letter' ? 215.9 : 210) - 2 * mm;
    const fam = { helvetica: 'Arial, "Nirmala UI", sans-serif', times: '"Times New Roman", "Nirmala UI", serif', courier: '"Courier New", monospace' }[$('font').value];
    const holder = document.createElement('div');
    holder.style.cssText = 'position:fixed;left:-10000px;top:0';
    const el = document.createElement('div');
    el.style.cssText = 'width:' + width + 'mm;white-space:pre-wrap;word-wrap:break-word;color:#111;background:#fff;line-height:1.45;font-family:' + fam + ';font-size:' + $('fsize').value + 'pt';
    el.textContent = text;
    holder.appendChild(el);
    document.body.appendChild(holder);
    try {
      return await P.htmlToPdf(el, { margin: mm, format: $('size').value, avoid: [] });
    } finally { holder.remove(); }
  }

  btn.addEventListener('click', async () => {
    const text = $('text').value;
    if (!text.trim()) return P.status(st, 'Type or paste some text first.', 'err');
    btn.disabled = true;
    try {
      P.status(st, 'Creating PDF…');
      const blob = latinOnly(text) ? await viaJsPdf(text) : await viaBrowser(text);
      P.download(blob, name + '.pdf');
      P.status(st, 'Done! ' + name + '.pdf (' + P.fmt(blob.size) + ') has been downloaded.', 'ok');
    } catch (e) {
      console.error(e);
      P.status(st, P.errMsg(e), 'err');
    } finally { btn.disabled = false; }
  });
})();
