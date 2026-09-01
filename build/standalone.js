/* Builds a single self-contained HTML file: every stylesheet, script,
   image, video and font inlined, nothing fetched at runtime. Used for
   sharing a preview where no server (and no network) is available.

   Assets are deduplicated into one map and applied to elements by a small
   inline loader — several assets are referenced many times, and inlining
   each occurrence separately more than doubled the file. This is the only
   build that needs JS to show its images; the shipped site (public/index.html)
   still renders fully without it. */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'public');
const OUT = path.join(__dirname, '..', 'dist');

const MIME = {
  '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.webm': 'video/webm', '.mp4': 'video/mp4', '.woff2': 'font/woff2'
};

const dataUri = (file) => {
  const mime = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
  return 'data:' + mime + ';base64,' + fs.readFileSync(file).toString('base64');
};

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
let css = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
const iconsax = fs.readFileSync(path.join(ROOT, 'assets/iconsax.js'), 'utf8');
let app = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

/* ---- asset map: one entry per unique file ---- */
const KEYS = new Map();
const ASSETS = {};
function key(rel) {
  const abs = path.resolve(ROOT, rel);
  if (!KEYS.has(abs)) {
    const k = 'a' + KEYS.size;
    KEYS.set(abs, k);
    ASSETS[k] = dataUri(abs);
  }
  return KEYS.get(abs);
}

/* ---- fonts inlined straight into the stylesheet ---- */
css = css.replace(/url\("(assets\/fonts\/[^"]+)"\)/g,
  (_, rel) => 'url("' + dataUri(path.join(ROOT, rel)) + '")');

/* ---- every asset reference in the markup points at a map key ----
   src= for <img>/<video>, url= for <jggl-media>, href= for the favicons.
   Cache-busting query strings are stripped before resolving on disk. */
html = html.replace(
  /(src|href|url)="(assets\/[^"]+\.(?:png|svg|webp|mp4|webm))(\?v=[a-f0-9]+)?"/g,
  (_, attr, rel) => attr + '="" data-a="' + key(rel) + '"');

/* app.js carries the hero media paths too. */
for (const rel of [...new Set(app.match(/assets\/media\/[^'"]+/g) || [])]) {
  if (fs.existsSync(path.resolve(ROOT, rel))) {
    app = app.split(rel).join('__ASSET__' + key(rel));
  }
}

/* jggl-media picks <video> vs <img> from the file extension, which a
   data: URI has none of — teach it to read the data: MIME instead. */
const patchedIconsax = iconsax.replace(
  '/\\.(webm|mp4)$/.test(url)',
  '/\\.(webm|mp4)$|^data:video\\//.test(url)'
);
if (patchedIconsax === iconsax) {
  console.error('jggl-media video test not found — aborting rather than shipping broken video');
  process.exit(1);
}

/* Runs after the markup is parsed and before app.js, so elements get
   their real sources before the first paint. */
const loader = `
(function () {
  var A = window.__A;
  document.querySelectorAll('[data-a]').forEach(function (el) {
    var v = A[el.getAttribute('data-a')];
    if (!v) return;
    el.setAttribute(el.tagName === 'JGGL-MEDIA' ? 'url' : 'src', v);
  });
  window.__resolveAsset = function (u) {
    return (u && u.indexOf('__ASSET__') === 0) ? (A[u.slice(9)] || u) : u;
  };
})();`;

const head = html.slice(0, html.indexOf('<body>'));
const desc = (head.match(/name="description" content="([^"]*)"/) || [, ''])[1];

let body = html.slice(html.indexOf('<body>') + 6, html.lastIndexOf('</body>'));
body = body.replace(/<script[^>]*><\/script>/g, '');

const out = [
  '<title>JGGL Site V4</title>',
  '<meta name="description" content="' + desc + '">',
  '<style>', css, '</style>',
  body.trim(),
  '<script>window.__A=' + JSON.stringify(ASSETS) + ';</script>',
  '<script>', loader, '</script>',
  '<script>', patchedIconsax, '</script>',
  '<script>', app, '</script>'
].join('\n');

fs.mkdirSync(OUT, { recursive: true });
const dest = path.join(OUT, 'jggl-site-standalone.html');
fs.writeFileSync(dest, out);
console.log('wrote', dest);
console.log('size', (Buffer.byteLength(out) / 1048576).toFixed(2), 'MB');
console.log('unique assets inlined:', KEYS.size);
