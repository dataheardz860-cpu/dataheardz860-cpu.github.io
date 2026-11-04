// Every tool page, grouped — drives the home page grid, footer and related links.
export const toolGroups = [
  {
    name: 'Convert to PDF',
    items: [
      { path: '/image-to-pdf/', name: 'Image to PDF', ico: 'IMG', desc: 'JPG, PNG, WEBP and HEIC photos to one PDF.' },
      { path: '/word-to-pdf/', name: 'Word to PDF', ico: 'DOC', desc: 'Convert DOCX documents with a live preview.' },
      { path: '/scan-to-pdf/', name: 'Scan to PDF', ico: 'CAM', desc: 'Use your phone camera to scan documents.' },
      { path: '/jpg-to-pdf/', name: 'JPG to PDF', ico: 'JPG', desc: 'Combine JPG photos into a single PDF.' },
      { path: '/png-to-pdf/', name: 'PNG to PDF', ico: 'PNG', desc: 'Screenshots and graphics to PDF.' },
      { path: '/heic-to-pdf/', name: 'HEIC to PDF', ico: 'HEIC', desc: 'iPhone photos straight to PDF.' },
      { path: '/text-to-pdf/', name: 'Text to PDF', ico: 'TXT', desc: 'Type or paste text and save it as PDF.' },
      { path: '/html-to-pdf/', name: 'HTML to PDF', ico: 'HTML', desc: 'Turn HTML code into a printable PDF.' }
    ]
  },
  {
    name: 'Convert from PDF',
    items: [
      { path: '/pdf-to-jpg/', name: 'PDF to JPG', ico: 'JPG', desc: 'Save every PDF page as a JPG image.' },
      { path: '/pdf-to-png/', name: 'PDF to PNG', ico: 'PNG', desc: 'High-quality PNG images from PDF pages.' }
    ]
  },
  {
    name: 'Organise & optimise',
    items: [
      { path: '/merge-pdf/', name: 'Merge PDF', ico: 'MRG', desc: 'Combine several PDFs into one file.' },
      { path: '/split-pdf/', name: 'Split PDF', ico: 'SPL', desc: 'Split one PDF into many files.' },
      { path: '/extract-pages-from-pdf/', name: 'Extract PDF pages', ico: 'EXT', desc: 'Save just the pages you need.' },
      { path: '/compress-pdf/', name: 'Compress PDF', ico: 'ZIP', desc: 'Reduce PDF file size, even to a target.' },
      { path: '/organize-pdf/', name: 'Organise PDF', ico: 'ORG', desc: 'Reorder, rotate and delete pages.' },
      { path: '/rotate-pdf/', name: 'Rotate PDF', ico: 'ROT', desc: 'Fix sideways or upside-down pages.' },
      { path: '/delete-pdf-pages/', name: 'Delete PDF pages', ico: 'DEL', desc: 'Remove pages you don\'t need.' }
    ]
  },
  {
    name: 'Edit & sign',
    items: [
      { path: '/sign-pdf/', name: 'Sign PDF', ico: 'SIGN', desc: 'Draw, type or upload your signature.' },
      { path: '/watermark-pdf/', name: 'Watermark PDF', ico: 'WM', desc: 'Stamp text like CONFIDENTIAL on pages.' },
      { path: '/add-page-numbers-to-pdf/', name: 'Add page numbers', ico: '123', desc: 'Number pages in any position.' }
    ]
  }
];

export const sizeTools = [
  ['/jpg-to-pdf-under-50kb/', 'JPG to PDF under 50 KB'],
  ['/jpg-to-pdf-under-100kb/', 'JPG to PDF under 100 KB'],
  ['/jpg-to-pdf-under-200kb/', 'JPG to PDF under 200 KB'],
  ['/jpg-to-pdf-under-500kb/', 'JPG to PDF under 500 KB'],
  ['/compress-pdf-to-50kb/', 'Compress PDF to 50 KB'],
  ['/compress-pdf-to-100kb/', 'Compress PDF to 100 KB'],
  ['/compress-pdf-to-200kb/', 'Compress PDF to 200 KB'],
  ['/compress-pdf-to-300kb/', 'Compress PDF to 300 KB'],
  ['/compress-pdf-to-500kb/', 'Compress PDF to 500 KB'],
  ['/compress-pdf-to-1mb/', 'Compress PDF to 1 MB'],
  ['/aadhaar-card-to-pdf/', 'Aadhaar card to PDF'],
  ['/pan-card-to-pdf/', 'PAN card to PDF'],
  ['/resume-to-pdf/', 'Resume to PDF']
];

// Extra Hindi pages (shown on the Hindi home page, not in the top menu).
export const hiExtra = [
  ['/hi/jpg-to-pdf-under-100kb/', 'फोटो से 100 KB PDF'],
  ['/hi/compress-pdf-to-100kb/', 'PDF को 100 KB करें']
];

export const hiTools = [
  ['/hi/image-to-pdf/', 'JPG से PDF'],
  ['/hi/word-to-pdf/', 'Word से PDF'],
  ['/hi/compress-pdf/', 'PDF छोटा करें'],
  ['/hi/merge-pdf/', 'PDF जोड़ें']
];
