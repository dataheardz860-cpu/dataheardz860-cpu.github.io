# Exact-layout Word → PDF server (optional)

The website converts Word files **in the browser** by default (private, free, but complex layouts can shift and text in the PDF is not selectable).
This small server uses **LibreOffice** to produce an exact copy with real, selectable text, and adds support for old `.doc`, `.odt` and `.rtf` files.

When `convertApi` is set in `src/config.mjs`, the Word to PDF page shows a **Conversion mode** option:
“In your browser (private)” (default) or “Exact layout (secure server)”. The privacy page updates automatically to explain the server mode.

## Deploy on Render (free tier works to start)

1. Put this project on GitHub.
2. In Render: **New → Web Service → your repo**, Root directory `server`, Runtime **Docker**.
3. Environment variables:
   - `ALLOWED_ORIGINS` = `https://yourdomain.com,https://www.yourdomain.com`
   - optional `MAX_MB` (default 25), `TIMEOUT_SECONDS` (default 90)
4. Deploy, then open `https://<your-service>.onrender.com/` — it should say `ok`.
5. Set `convertApi: 'https://<your-service>.onrender.com'` in `src/config.mjs`, rebuild and redeploy the site.

Free Render services sleep when idle, so the first conversion after a quiet period can take ~1 minute. A paid instance (or Fly.io / Google Cloud Run / a small VPS) avoids that. Any host that runs Docker works.

## Run locally

```bash
docker build -t pdfmint-convert server
docker run -p 8080:8080 -e ALLOWED_ORIGINS=http://localhost:8765 pdfmint-convert
```

## Privacy

Files are written to a temporary folder, converted, returned and deleted in the same request. File names are not logged.
