# JGGL Site

Marketing site for JGGL Entertainment Limited.

Static HTML/CSS/JS — no framework, no bundler. The only build step is one
Node script that renders `public/index.html` from a content model.

Live: https://jgglentertainment.github.io/

## Layout

```
public/index.html        generated — do not edit by hand
public/styles.css        design tokens, layout, responsive rules
public/app.js            interaction layer
public/assets/           icons, logos, self-hosted fonts
build/data.js            all site copy and content lists
build/generate.js        renders public/index.html from data.js
build/standalone.js      optional single-file build (everything inlined)
build/fetch-remote.js    caches jggl.ai media for the standalone build
```

## Editing

Copy and content lists live in `build/data.js`. After changing them:

```bash
npm run build
```

`public/index.html` is generated, so edits made directly to it are lost on
the next build. Structural changes belong in `build/generate.js`, styling in
`public/styles.css`, behaviour in `public/app.js`.

## Why the page is pre-rendered

The original design drove every list (nav, formats, FAQ, comparison rows,
footer tiles, marquees) through a client-side template runtime. For a
marketing page that costs SEO and first paint, so the generator expands those
lists at build time and `app.js` only attaches behaviour. The page reads
correctly with JavaScript disabled.

## Design tokens

Four values from the original design, as CSS custom properties on `:root`
in `public/styles.css`:

| Token      | Value                       |
|------------|-----------------------------|
| `--accent` | `#FF6C19`                   |
| `--max`    | `1440px`                    |
| `--sp`     | `clamp(72px, 11vw, 160px)`  |
| `--r`      | `clamp(24px, 3vw, 40px)`    |

## Assets

`public/assets/iconsax.js` registers two custom elements used throughout the
markup:

- `<isax-icon name size stroke-width>` — Iconsax linear icons, inlined as SVG
- `<jggl-media url alt fit>` — image or video, chosen by file extension

Local assets: `apple.svg`, `google-play.svg`, `jggl-mark.png`, `note.png`,
and an Instrument Sans woff2 subset in `public/assets/fonts/`.

`Scoutie Sans` is the brand face. It is not bundled, so it stays first in the
font stack with Instrument Sans as the fallback.

Photography, product imagery and video load from `https://jggl.ai` at
runtime. Nothing else is fetched.

## Local preview

```bash
python3 -m http.server 4321 --directory public
```

## Deploying

See [DEPLOY.md](DEPLOY.md).
