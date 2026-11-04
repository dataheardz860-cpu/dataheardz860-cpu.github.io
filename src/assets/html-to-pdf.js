(function () {
  const P = PDFM, $ = (id) => document.getElementById(id);
  const st = $('status'), btn = $('go');
  let name = 'page';

  $('file').addEventListener('change', async () => {
    const f = $('file').files[0];
    if (!f) return;
    $('html').value = await f.text();
    name = P.base(f.name);
    $('file').value = '';
    P.status(st, 'Loaded ' + f.name);
  });

  // Strip scripts and event handlers before rendering.
  function clean(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('script,iframe,object,embed,link,meta,base,form').forEach((n) => n.remove());
    doc.querySelectorAll('*').forEach((el) => {
      [...el.attributes].forEach((a) => {
        if (/^on/i.test(a.name) || /^\s*javascript:/i.test(a.value)) el.removeAttribute(a.name);
      });
    });
    const styles = [...doc.querySelectorAll('style')].map((s) => s.outerHTML).join('');
    return styles + doc.body.innerHTML;
  }

  btn.addEventListener('click', async () => {
    const html = $('html').value;
    if (!html.trim()) return P.status(st, 'Paste some HTML first.', 'err');
    btn.disabled = true;
    const holder = document.createElement('div');
    try {
      P.status(st, 'Creating PDF…');
      await P.load('html2pdf');
      const m = Number($('margin').value);
      const land = $('orient').value === 'landscape';
      const pw = $('size').value === 'letter' ? (land ? 279.4 : 215.9) : (land ? 297 : 210);
      holder.style.cssText = 'position:fixed;left:-10000px;top:0';
      const el = document.createElement('div');
      el.style.cssText = 'width:' + (pw - 2 * m) + 'mm;background:#fff;color:#111;font-family:Arial,"Nirmala UI",sans-serif;font-size:12pt;line-height:1.5';
      el.innerHTML = clean(html);
      holder.appendChild(el);
      document.body.appendChild(holder);
      const blob = await P.htmlToPdf(el, { margin: m, format: $('size').value, orientation: $('orient').value, avoid: ['img', 'tr', 'h1', 'h2', 'h3'] });
      P.download(blob, name + '.pdf');
      P.status(st, 'Done! ' + name + '.pdf has been downloaded.', 'ok');
    } catch (e) {
      console.error(e);
      P.status(st, P.errMsg(e), 'err');
    } finally {
      holder.remove();
      btn.disabled = false;
    }
  });
})();
