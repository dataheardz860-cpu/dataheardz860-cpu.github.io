(function () {
  const P = PDFM, $ = (id) => document.getElementById(id);
  const st = $('status'), btn = $('go'), panel = $('panel');

  const L = P.list($('list'), {
    render(it, li) {
      li.innerHTML = '<div class="fileicon">PDF</div><div class="name"></div><div class="meta"></div>';
      li.querySelector('.name').textContent = it.name;
      li.querySelector('.name').title = it.name;
      li.querySelector('.meta').textContent = it.pages + ' page' + (it.pages === 1 ? '' : 's') + ' · ' + P.fmt(it.size);
    },
    onChange(items) {
      panel.classList.toggle('hidden', !items.length);
      btn.disabled = items.length < 2;
    }
  });

  async function add(files) {
    P.status(st, 'Reading files…');
    const added = [];
    const problems = [];
    for (const f of files) {
      if (!P.isPdf(f)) { problems.push(f.name + ' is not a PDF'); continue; }
      try {
        const bytes = await P.bytes(f);
        const doc = await P.loadPdfLib(bytes);
        added.push({ name: f.name, size: f.size, bytes, pages: doc.getPageCount() });
      } catch (e) { problems.push(f.name + ': ' + P.errMsg(e)); }
    }
    L.add(added);
    if (problems.length) P.status(st, problems.join(' · '), 'err');
    else P.status(st, L.items.length < 2 ? 'Add at least one more PDF to merge.' : L.items.length + ' files ready. Drag to change the order.');
  }

  async function merge() {
    const items = L.items;
    if (items.length < 2) return;
    btn.disabled = true;
    try {
      const { PDFDocument } = await P.pdflib();
      const out = await PDFDocument.create();
      for (let i = 0; i < items.length; i++) {
        P.status(st, 'Merging file ' + (i + 1) + ' of ' + items.length + '…');
        await P.tick();
        const src = await PDFDocument.load(items[i].bytes);
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      const bytes = await out.save();
      P.download(bytes, 'merged.pdf');
      P.status(st, 'Done! merged.pdf (' + out.getPageCount() + ' pages, ' + P.fmt(bytes.length) + ') has been downloaded.', 'ok');
    } catch (e) {
      console.error(e);
      P.status(st, P.errMsg(e), 'err');
    } finally {
      btn.disabled = L.items.length < 2;
    }
  }

  btn.addEventListener('click', merge);
  $('clear').addEventListener('click', () => { L.clear(); P.status(st, ''); });
  P.wireDrop($('drop'), $('file'), add);
  P.takeShared().then((f) => f.length && add(f));
})();
