# PDFMint mobile app

The website is already a **Progressive Web App (PWA)**: it is installable, works offline, has app shortcuts, and on Android it appears in the **share sheet** (“Share → PDFMint” for photos and PDFs). The app store versions simply wrap this PWA, so every website update reaches the app automatically.

## Android (Google Play) — Trusted Web Activity

You need: the site live on HTTPS at your real domain, a Google Play developer account (one-time US$25), and Node.js + Java (Bubblewrap installs the Android SDK for you).

### Option A — PWABuilder (easiest, no command line)
1. Go to https://www.pwabuilder.com and enter your domain.
2. Choose **Package for stores → Android → Google Play**. Package ID: `com.yourdomain.pdfmint`.
3. Download the zip. It contains the `.aab` to upload, a signing key (**back it up — you can never replace it**), and an `assetlinks.json`.

### Option B — Bubblewrap CLI
```bash
npm install -g @bubblewrap/cli
```
```bash
bubblewrap init --manifest https://yourdomain.com/manifest.webmanifest
```
```bash
bubblewrap build
```
This produces `app-release-bundle.aab` and a signing keystore (**back it up**).

### Link the app to the site (removes the browser address bar)
1. Upload the `.aab` in Play Console. Open **Test and release → App integrity → App signing** and copy the **SHA-256 certificate fingerprint**.
2. Paste it into `src/config.mjs` → `android.sha256Fingerprint` (and set `android.packageName`).
3. Run `node src/build.mjs` and redeploy. This publishes `/.well-known/assetlinks.json`.

### Publishing notes
- Newer **personal** Play developer accounts must run a closed test with at least 12 testers for 14 days before releasing to production. Ask friends/family early.
- Store listing assets: use `site/icon-512.png` as the icon and `site/og-image.png` as a starting point for the feature graphic (1024×500). Take phone screenshots of Image to PDF, Merge, Compress and Sign.
- Category: **Productivity**. Data safety: “No data collected” is accurate while files are processed on-device and analytics/ads are off — update it if you enable Google Analytics, AdSense or the Word conversion server.

## iPhone / iPad
- Users can already install it: Safari → Share → **Add to Home Screen**.
- For the App Store you need a Mac with Xcode and an Apple Developer account (US$99/year). PWABuilder can generate an iOS project, or wrap the site with Capacitor. Apple may reject apps that are “just a website”, so highlight app-like features (camera scanning, share-to-app, offline use) in review notes.

## App-only ideas for later
- Native document edge detection and perspective correction for scans.
- “Recent files” list stored on the device.
- Home-screen widgets for Scan and Merge.
