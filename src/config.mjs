// ─── Edit this file, then run:  node src/build.mjs ───────────────────────────
export default {
  siteName: 'PDFMint',
  // Your real domain, no trailing slash. Used for canonical URLs, sitemap, schema.
  domain: 'https://mypdfmint.in',
  email: 'help@mypdfmint.in',

  // Analytics (leave empty to disable)
  plausibleDomain: '',        // e.g. 'yourdomain.com'  (privacy-friendly, no cookie banner needed)
  gaMeasurementId: 'G-RJ7R7SEN8Z',        // e.g. 'G-XXXXXXXXXX'   (Google Analytics 4)

  // Google AdSense publisher id, e.g. 'ca-pub-1234567890123456' (empty = no ads)
  adsenseClient: 'ca-pub-6110667896545300',

  // Optional server for exact-layout Word → PDF (see server/README.md).
  // e.g. 'https://pdfmint-convert.onrender.com'  (empty = browser-only mode)
  convertApi: '',

  // Google Search Console verification code (content of the meta tag), optional
  googleVerification: '8ew3pwXCKYcqJQaAYNsm28CKDbpaqy-Pca4nFcXKrZs',

  // Android app (Trusted Web Activity) — fill after building the app, see app/README.md
  android: {
    packageName: 'in.mypdfmint.app',
    sha256Fingerprint: '' // from Play Console → App integrity → App signing key
  }
};
