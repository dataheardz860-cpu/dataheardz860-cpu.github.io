(function () {
  const P = PDFM, $ = (id) => document.getElementById(id);
  const st = $('status'), btn = $('convert'), panel = $('panel'), preview = $('preview');
  const api = (P.config.convertApi || '').replace(/\/$/, '');
  const modeSel = $('mode');
  let file = null;

  async function add(files) {
    const f = files[0];
    const isDocx = /\.docx$/i.test(f.name), isDoc = /\.doc$/i.test(f.name);
    if (!isDocx && !isDoc) return P.status(st, 'Please choose a Word file (.docx).', 'err');
    if (isDoc && !api) return P.status(st, 'Old .doc files are not supported. Open it in Word or Google Docs and “Save as” .docx first.', 'err');
    file = f;
    $('fname').textContent = f.name;
    panel.classList.remove('hidden');
    if (isDoc) {
      modeSel.value = 'server';
      modeSel.disabled = true;
      $('pwrap').classList.add('hidden');
      return P.status(st, '.doc files are converted on our secure server. Click Convert to PDF.');
    }
    if (modeSel) modeSel.disabled = false;
    $('pwrap').classList.remove('hidden');
    try {
      P.status(st, 'Reading document…');
      P.load('html2pdf').catch(() => {});
      await P.load('mammoth');
      const result = await window.mammoth.convertToHtml({ arrayBuffer: await f.arrayBuffer() });
      preview.innerHTML = result.value || '<p><em>(This document appears to be empty.)</em></p>';
      P.status(st, 'Preview ready. Check it, then click Convert to PDF.');
    } catch (e) {
      console.error(e);
      P.status(st, 'Could not read this file. Is it a valid .docx document?', 'err');
    }
  }

  async function viaServer() {
    P.status(st, 'Uploading securely and converting…');
    const res = await fetch(api + '/convert', { method: 'POST', headers: { 'X-Filename': encodeURIComponent(file.name) }, body: file });
    if (!res.ok) throw new Error((await res.text().catch(() => '')) || 'Server conversion failed (' + res.status + ')');
    return res.blob();
  }

  async function viaBrowser() {
    P.status(st, 'Creating PDF…');
    const margin = Number($('margin').value);
    const holder = document.createElement('div');
    holder.style.cssText = 'position:fixed;left:-10000px;top:0;';
    const page = document.createElement('div');
    page.className = 'doc';
    page.style.width = ($('size').value === 'letter' ? 215.9 : 210) - 2 * margin + 'mm';
    page.innerHTML = preview.innerHTML;
    holder.appendChild(page);
    document.body.appendChild(holder);
    try {
      return await P.htmlToPdf(page, { margin, format: $('size').value });
    } finally { holder.remove(); }
  }

  async function convert() {
    if (!file) return;
    btn.disabled = true;
    try {
      const blob = modeSel && modeSel.value === 'server' ? await viaServer() : await viaBrowser();
      const name = P.base(file.name) + '.pdf';
      P.download(blob, name);
      P.status(st, 'Done! ' + name + ' (' + P.fmt(blob.size) + ') has been downloaded.', 'ok');
    } catch (e) {
      console.error(e);
      P.status(st, P.errMsg(e), 'err');
    } finally { btn.disabled = false; }
  }

  $('clear').addEventListener('click', () => { file = null; preview.innerHTML = ''; panel.classList.add('hidden'); P.status(st, ''); });
  btn.addEventListener('click', convert);
  P.wireDrop($('drop'), $('file'), add);
})();
