#!/bin/bash
# Calculadolar — copia la app web de la raíz a native/www para que Capacitor la empaque
# y le agrega native.js (anuncios), que solo existe dentro de la app de tienda.
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(dirname "$HERE")"
rm -rf "$HERE/www"
mkdir -p "$HERE/www"
cp "$ROOT/index.html" "$ROOT/manifest.webmanifest" "$ROOT"/icon-*.png "$ROOT/calculadolar_logo_negro.svg" "$HERE/www/"
cp "$HERE/native.js" "$HERE/www/"
python3 - "$HERE/www/index.html" <<'PY'
import sys
p = sys.argv[1]; s = open(p).read()
assert s.count('</body>') == 1
s = s.replace('</body>', '<script src="native.js"></script>\n</body>')
open(p, 'w').write(s)
PY
echo "www listo: $(du -sh "$HERE/www" | cut -f1)"
