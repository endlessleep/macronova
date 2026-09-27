"""Refresh shared asset URLs after changes, so cached pages get current styles."""
from pathlib import Path
from hashlib import sha256
import re

root = Path(__file__).resolve().parent.parent
for page in root.glob('*.html'):
    original = page.read_text()
    updated = original
    for asset in ('assets/styles.css', 'assets/app.js'):
        version = sha256((root / asset).read_bytes()).hexdigest()[:12]
        pattern = re.escape(asset) + r'(?:\?v=[a-f0-9]+)?(?=["\'])'
        updated = re.sub(pattern, asset + '?v=' + version, updated)
    if updated != original:
        page.write_text(updated)
