# JGGL Site V4

Implementation of the `JGGL Site V4.dc.html` design from Claude Design
(project `44350e7f-9687-4f83-92ee-ea05bb35d8ce`).

Static HTML/CSS/JS — no framework, no build toolchain beyond a single
Node script that renders the page from the content model.

## Layout

```
index.html          generated — do not edit by hand
styles.css          design tokens, layout, responsive rules
app.js              interaction layer
build/data.js       all site copy and content lists
build/generate.js   renders index.html from data.js
assets/             icons, logos, self-hosted fonts
```

## Editing

Copy and content lists live in `build/data.js`. After changing them:

```bash
npm run build
```

`index.html` is generated, so edits made directly to it are lost on the
next build. Structural or styling changes belong in `build/generate.js`
and `styles.css`.

## Why the page is pre-rendered

The design source drove every list (nav, formats, FAQ, comparison rows,
footer tiles, marquees) through a client-side template runtime. For a
marketing page that costs SEO and first paint, so the generator expands
those lists at build time and `app.js` only attaches behaviour. The page
reads correctly with JavaScript disabled.

## Design tokens

The source exposed four editable props; they are CSS custom properties
on `:root` in `styles.css`, at the design's default values:

| Token      | Value                       | Source prop  |
|------------|-----------------------------|--------------|
| `--accent` | `#FF6C19`                   | accent       |
| `--max`    | `1440px`                    | maxWidth     |
| `--sp`     | `clamp(72px, 11vw, 160px)`  | sectionGap   |
| `--r`      | `clamp(24px, 3vw, 40px)`    | cardRadius   |

## Assets

`assets/iconsax.js` is carried over unchanged from the design. It
registers two custom elements used throughout the markup:

- `<isax-icon name size stroke-width>` — Iconsax linear icons, inlined as SVG
- `<jggl-media url alt fit>` — image or video by file extension

Local assets (extracted from the design bundle): `apple.svg`,
`google-play.svg`, `jggl-mark.png`, `note.png`, and an Instrument Sans
woff2 subset in `assets/fonts/`.

`Scoutie Sans` is the brand face. It is not part of the design bundle, so
it stays first in the font stack and Instrument Sans is the fallback —
drop the files in and add an `@font-face` block to enable it.

Photography, product imagery and video still load from `https://jggl.ai`,
matching the design. Nothing else is fetched at runtime.

## Deviations from the design source

Two deliberate changes, both behavioural:

1. **Format dropdown dismissal.** The source only closed the dropdown via
   its own toggle. Clicking outside it or pressing Escape now closes it too.
2. **Accessibility.** Added `aria-expanded` / `aria-controls` on the FAQ
   and menu toggles, a labelled dialog, focus handling on modal open and
   close, and `prefers-reduced-motion` handling that disables the
   marquees, the conic border animation and scroll reveals.

Everything else — copy, spacing, colour, type scale, breakpoints, motion
curves and durations — is carried across unchanged.

## Single-file build

For sharing a preview where there is no server (and no network):

```bash
npm run standalone
```

Writes `dist/jggl-site-standalone.html` (~11.5 MB) with every stylesheet,
script, font, image and video inlined as data URIs. It first caches the
jggl.ai media into `build/.cache/`.

Two things differ from the shipped site, and apply *only* to this build:
assets are deduplicated into one map and applied by a small inline loader
(so this file needs JS to show its images, while `index.html` does not),
and `jggl-media` is patched to pick `<video>` from the data: MIME, since
a data URI has no file extension to test.

## Local preview

Any static server works:

```bash
python3 -m http.server 4321 --directory .
```
