/* Builds a single self-contained HTML file: every stylesheet, script,
   image, video and font inlined, nothing fetched at runtime. Used for
   sharing a preview where no server (and no network) is available.

   Assets are deduplicated into one map and applied to elements by a small
   inline loader — several assets (the footer note, the store badges) are
   referenced many times, and inlining each occurrence separately more
   than doubled the file. This is the only build that needs JS to show its
   images; the shipped site (index.html) still renders fully without it.

   Remote media is cached in build/.cache/ — run `npm run fetch-remote`
   first, or this reports what is missing and stops. */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'public');
const OUT = path.join(__dirname, '..', 'dist');
const CACHE = path.join(__dirname, '.cache');

const MIME = {
  '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.webm': 'video/webm', '.mp4': 'video/mp4', '.woff2': 'font/woff2'
};

const dataUri = (file) => {
  const mime = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
  return 'data:' + mime + ';base64,' + fs.readFileSync(file).toString('base64');
};

const cacheName = (url) => url.replace('https://jggl.ai/', '').replace(/\//g, '__');

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
let css = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
const iconsax = fs.readFileSync(path.join(ROOT, 'assets/iconsax.js'), 'utf8');
let app = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

/* ---- asset map: one entry per unique file ---- */
const KEYS = new Map();      // absolute path -> key
const ASSETS = {};           // key -> data URI
function key(file) {
  const abs = path.resolve(file);
  if (!KEYS.has(abs)) {
    const k = 'a' + KEYS.size;
    KEYS.set(abs, k);
    ASSETS[k] = dataUri(abs);
  }
  return KEYS.get(abs);
}

/* ---- verify the remote cache ---- */
const remote = [...new Set(html.match(/https:\/\/jggl\.ai\/[^"' )]+/g) || [])];
const missing = remote.filter((u) => !fs.existsSync(path.join(CACHE, cacheName(u))));
if (missing.length) {
  console.error('Missing from build/.cache — run `npm run fetch-remote`:');
  missing.forEach((u) => console.error('  ' + u));
  process.exit(1);
}

/* ---- fonts: inlined directly, only a handful of references ---- */
css = css.replace(/url\("(assets\/fonts\/[^"]+)"\)/g,
  (_, rel) => 'url("' + dataUri(path.join(ROOT, rel)) + '")');

/* ---- markup: point every asset reference at a map key ---- */
html = html.replace(/(src|href)="(assets\/[^"]+\.(?:png|svg))"/g,
  (_, attr, rel) => attr + '="" data-a="' + key(path.join(ROOT, rel)) + '"');

html = html.replace(/(src|url)="(https:\/\/jggl\.ai\/[^"]+)"/g,
  (_, attr, url) => attr + '="" data-a="' + key(path.join(CACHE, cacheName(url))) + '"');

/* app.js swaps hero media by URL, so it needs the map too. */
for (const url of [...new Set(app.match(/https:\/\/jggl\.ai\/[^'"]+/g) || [])]) {
  const f = path.join(CACHE, cacheName(url));
  if (fs.existsSync(f)) app = app.split(url).join('__ASSET__' + key(f));
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
  // app.js refers to hero media by map key.
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
  '<script>', app.replace(/__ASSET__(a\d+)/g, (m) => m), '</script>'
].join('\n');

const dest = path.join(OUT, 'jggl-site-standalone.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, out);
console.log('wrote', dest);
console.log('size', (Buffer.byteLength(out) / 1048576).toFixed(2), 'MB');
console.log('unique assets inlined:', KEYS.size, '(from', remote.length, 'remote +', 'local)');
