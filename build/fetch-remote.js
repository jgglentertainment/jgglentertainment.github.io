/* Downloads the jggl.ai media the standalone build inlines into
   build/.cache/. Only needed before `npm run standalone`; the normal
   site loads this media from jggl.ai at runtime. */

const fs = require('fs');
const path = require('path');
const https = require('https');

const CACHE = path.join(__dirname, '.cache');
const INDEX = path.join(__dirname, '..', 'public', 'index.html');

const html = fs.readFileSync(INDEX, 'utf8');
const app = fs.readFileSync(path.join(__dirname, '..', 'public', 'app.js'), 'utf8');
const urls = [...new Set([
  ...(html.match(/https:\/\/jggl\.ai\/[^"' )]+/g) || []),
  ...(app.match(/https:\/\/jggl\.ai\/[^'"]+/g) || [])
])].filter((u) => /\.(webp|png|svg|webm|mp4)$/.test(u));

fs.mkdirSync(CACHE, { recursive: true });

const get = (url, dest) => new Promise((resolve, reject) => {
  https.get(url, (res) => {
    if (res.statusCode !== 200) { res.resume(); return reject(new Error(url + ' -> ' + res.statusCode)); }
    const chunks = [];
    res.on('data', (c) => chunks.push(c));
    res.on('end', () => { fs.writeFileSync(dest, Buffer.concat(chunks)); resolve(Buffer.concat(chunks).length); });
  }).on('error', reject);
});

(async () => {
  let fetched = 0, cached = 0;
  for (const url of urls) {
    const dest = path.join(CACHE, url.replace('https://jggl.ai/', '').replace(/\//g, '__'));
    if (fs.existsSync(dest)) { cached++; continue; }
    const n = await get(url, dest);
    console.log('fetched', (n / 1024).toFixed(0) + 'K', url);
    fetched++;
  }
  console.log(fetched + ' fetched, ' + cached + ' already cached, ' + urls.length + ' total');
})().catch((e) => { console.error(e.message); process.exit(1); });
