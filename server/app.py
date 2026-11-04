"""PDFMint exact-layout Word → PDF server (LibreOffice). Standard library only.

POST /convert   body = the .docx/.doc/.odt/.rtf file, header X-Filename = original name
GET  /          health check
Files are converted in a temporary folder and deleted immediately afterwards.
"""
import os
import shutil
import subprocess
import tempfile
import urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = int(os.environ.get('PORT', '8080'))
ALLOWED_ORIGINS = [o.strip() for o in os.environ.get('ALLOWED_ORIGINS', 'https://yourdomain.com').split(',') if o.strip()]
MAX_BYTES = int(os.environ.get('MAX_MB', '25')) * 1024 * 1024
TIMEOUT = int(os.environ.get('TIMEOUT_SECONDS', '90'))
EXTENSIONS = {'.docx', '.doc', '.odt', '.rtf'}


class Handler(BaseHTTPRequestHandler):
    def cors(self):
        origin = self.headers.get('Origin', '')
        if origin in ALLOWED_ORIGINS:
            self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Vary', 'Origin')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'X-Filename, Content-Type')

    def reply(self, code, body, ctype='text/plain; charset=utf-8'):
        data = body if isinstance(body, bytes) else body.encode()
        self.send_response(code)
        self.cors()
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_OPTIONS(self):
        self.send_response(204)
        self.cors()
        self.end_headers()

    def do_GET(self):
        self.reply(200, 'ok')

    def do_POST(self):
        if self.path != '/convert':
            return self.reply(404, 'Not found')
        length = int(self.headers.get('Content-Length') or 0)
        if length <= 0:
            return self.reply(400, 'No file received.')
        if length > MAX_BYTES:
            return self.reply(413, f'File is too large (max {MAX_BYTES // 1048576} MB).')
        name = os.path.basename(urllib.parse.unquote(self.headers.get('X-Filename', 'document.docx')))
        ext = os.path.splitext(name)[1].lower()
        if ext not in EXTENSIONS:
            return self.reply(415, 'Unsupported file type.')

        work = tempfile.mkdtemp(prefix='pdfm-')
        try:
            src = os.path.join(work, 'input' + ext)
            with open(src, 'wb') as f:
                remaining = length
                while remaining:
                    chunk = self.rfile.read(min(remaining, 1 << 20))
                    if not chunk:
                        break
                    f.write(chunk)
                    remaining -= len(chunk)
            profile = 'file://' + os.path.join(work, 'profile')  # separate profile → safe parallel runs
            cmd = ['soffice', f'-env:UserInstallation={profile}', '--headless', '--norestore',
                   '--convert-to', 'pdf', '--outdir', work, src]
            subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=TIMEOUT, check=False)
            out = os.path.join(work, 'input.pdf')
            if not os.path.exists(out):
                return self.reply(422, 'Could not convert this document.')
            with open(out, 'rb') as f:
                self.reply(200, f.read(), 'application/pdf')
        except subprocess.TimeoutExpired:
            self.reply(504, 'Conversion took too long.')
        except FileNotFoundError:
            self.reply(500, 'LibreOffice (soffice) is not installed on the server.')
        finally:
            shutil.rmtree(work, ignore_errors=True)

    def log_message(self, fmt, *args):  # no file names in logs
        pass


if __name__ == '__main__':
    print(f'PDFMint converter on :{PORT}, allowed origins: {ALLOWED_ORIGINS}')
    ThreadingHTTPServer(('0.0.0.0', PORT), Handler).serve_forever()
