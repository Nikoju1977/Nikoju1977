"""Build the offline single-file version from audited local web assets.

Hashes in the CSP allow only these exact inlined scripts and stylesheet.
"""
from pathlib import Path
import hashlib
import base64
import re

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / 'web'
html = (WEB/'index.html').read_text(encoding='utf-8')
css = (WEB/'styles.css').read_text(encoding='utf-8')
engine = (WEB/'engine.js').read_text(encoding='utf-8')
app = (WEB/'app.js').read_text(encoding='utf-8')
for link in (r'\s*<link rel="stylesheet" href="styles.css">',r'\s*<link rel="manifest" href="manifest.webmanifest">',r'\s*<link rel="icon" href="icon.svg" type="image/svg\+xml">'):
    html = re.sub(link,'',html)
html = html.replace('  <script src="engine.js" defer></script>', '')
html = html.replace('  <script src="app.js" defer></script>', '')
def csp_hash(payload):
    return "'sha256-"+base64.b64encode(hashlib.sha256(payload.encode('utf-8')).digest()).decode('ascii')+"'"
csp = ("default-src 'none'; script-src " + csp_hash(engine) + ' ' + csp_hash(app) +
       '; style-src ' + csp_hash(css) +
       "; img-src data:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'")
html = re.sub(r'<meta http-equiv="Content-Security-Policy" content="[^"]+">',
              f'<meta http-equiv="Content-Security-Policy" content="{csp}">', html)
html = html.replace('</head>', '<style>'+css+'</style>\n</head>')
html = html.replace('</body>', '<script>'+engine+'</script>\n<script>'+app+'</script>\n</body>')
output = ROOT / 'MEDGUARD_AI_Autonome.html'
output.write_text(html, encoding='utf-8')
print(f'Created {output}, {output.stat().st_size} bytes')
