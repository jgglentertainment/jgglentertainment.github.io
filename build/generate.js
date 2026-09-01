/* Emits index.html from build/data.js.
   Every list in the design (nav, formats, FAQ, comparison rows, footer
   tiles, marquees) is rendered here at build time so the shipped page
   carries its full content without JavaScript; app.js only adds behaviour. */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const D = require('./data.js');

/* Кэш-бастинг: GitHub Pages отдаёт статику с max-age=600, поэтому после
   деплоя браузер может подставить старый CSS к новому HTML и сломать
   вёрстку. Версия в ссылке меняется вместе с содержимым файла. */
const ver = (rel) => crypto
  .createHash('sha1')
  .update(fs.readFileSync(path.join(__dirname, '..', 'public', rel)))
  .digest('hex')
  .slice(0, 8);

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- store buttons ----------
   Four sizes appear in the design; the shape is otherwise identical. */
const PILL = {
  compact: { pad: '8px 18px',  gap: '11px', apple: 17, play: 16, sub: '10px', name: '14px', upper: true,  bg: '' },
  footer:  { pad: '9px 18px',  gap: '12px', apple: 17, play: 16, sub: '10px', name: '14px', upper: true,  bg: '#0A0A0A', cls: true },
  large:   { pad: 'clamp(11px, 1.4vw, 14px) clamp(20px, 2.4vw, 30px)', gap: '16px', apple: 26, play: 24, sub: '14px', subPlay: '13px', name: 'clamp(17px, 2.2vw, 21px)', upper: true, bg: '#0A0A0A', stack: true },
  modal:   { pad: '13px 26px', gap: '14px', apple: 22, play: 21, sub: '13px', name: '19px', upper: false, bg: '#0A0A0A', stack: true }
};

function storePill(kind, variant, extraClass) {
  const v = PILL[variant];
  const isApple = kind === 'apple';
  const href = isApple ? D.APP_STORE : D.PLAY_STORE;
  const size = isApple ? v.apple : v.play;
  const icon = isApple ? 'assets/apple.svg' : 'assets/google-play.svg';
  const subText = isApple ? 'Download on the' : 'Get it on';
  const name = isApple ? 'App Store' : 'Google Play';
  const subSize = (!isApple && v.subPlay) ? v.subPlay : v.sub;
  const upper = !isApple && v.upper
    ? ' letter-spacing: 0.06em; text-transform: uppercase;' : '';
  const bg = v.bg ? ` background: ${v.bg};` : '';
  const stackStyle = v.stack
    ? 'display: flex; flex-direction: column; gap: 2px;'
    : 'display: flex; flex-direction: column;';
  const lh = v.stack ? '' : ' line-height: 1.2;';
  const nameColor = v.stack && variant === 'large' ? ' color: #F2F2F0;' : '';
  const subCls = v.cls ? ' class="st-sub"' : '';
  const nameCls = v.cls ? ' class="st-name"' : '';
  const cls = ['store-pill', extraClass].filter(Boolean).join(' ');
  const display = variant === 'compact' || variant === 'footer' ? 'inline-flex' : 'flex';

  return `<a class="${cls}" href="${href}" target="_blank" rel="noopener" style="display: ${display}; align-items: center; gap: ${v.gap}; padding: ${v.pad}; border: 1px solid #2A2825; border-radius: 999px;${bg} white-space: nowrap;${v.stack ? ' text-align: left;' : ''}">
  <img src="${icon}" alt="" width="${size}" height="${size}" style="width: ${size}px; height: ${size}px;">
  <span style="${stackStyle}">
    <span${subCls} style="font-size: ${subSize};${upper} color: #9A9793;${lh}">${subText}</span>
    <span${nameCls} style="font-size: ${v.name}; font-weight: 500; letter-spacing: -0.016em;${lh}${nameColor}">${name}</span>
  </span>
</a>`;
}

const storePair = (variant, wrapStyle, extraClass) =>
  `<div style="${wrapStyle}">
${storePill('apple', variant, extraClass)}
${storePill('google', variant, extraClass)}
</div>`;

/* ---------- header ---------- */
const navLinks = (mobile) => D.SECTIONS.map((s, i) => {
  const num = String(i + 1).padStart(2, '0');
  const numSpan = `<span class="nav-num" style="font-size: 12px; color: #4E4B48; font-variant-numeric: tabular-nums;">${num}</span>`;
  const label = esc(s.label);
  return mobile
    ? `<a class="nav-link nav-link-m" data-section="${s.id}" href="#${s.id}" style="display: flex; align-items: center; gap: 14px; padding: 15px 16px; border-radius: 18px; background: transparent; font-size: 19px; font-weight: 500; letter-spacing: -0.016em; color: #9A9793;">${numSpan}${label}</a>`
    : `<a class="nav-link" data-section="${s.id}" href="#${s.id}" style="display: flex; align-items: center; gap: 10px; padding: 8px 14px; border-radius: 999px; background: transparent; font-size: clamp(15px, 1.25vw, 18px); font-weight: 500; letter-spacing: -0.014em; color: #9A9793; white-space: nowrap;">${label}${numSpan}</a>`;
}).join('\n');

const header = `<header style="position: sticky; top: 12px; z-index: 40; max-width: var(--max); margin: 0 auto; padding-top: 12px;">
  <div class="d-only">
    <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 10px 24px; min-height: 66px; padding: 10px 12px 10px 22px; border: 1px solid #1E1E1E; border-radius: 32px; background: rgba(15,15,15,0.88); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);">
      <nav style="flex: 1 1 auto; min-width: 0; display: flex; align-items: center; flex-wrap: wrap; gap: 4px;">
${navLinks(false)}
      </nav>
      <div style="flex: none; margin-left: auto; display: flex; align-items: center; gap: 10px;">
${storePill('apple', 'compact')}
${storePill('google', 'compact')}
      </div>
    </div>
  </div>

  <div class="m-only">
    <div style="display: flex; justify-content: center;">
      <div style="display: inline-flex; align-items: center; gap: 14px; padding: 7px 7px 7px 22px; border: 1px solid #1E1E1E; border-radius: 999px; background: rgba(15,15,15,0.92); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);">
        <span data-current-section style="font-size: 16px; color: #9A9793; white-space: nowrap;">${esc(D.SECTIONS[0].label)}</span>
        <button data-burger aria-label="Menu" aria-expanded="false" style="flex: none; width: 44px; height: 44px; border-radius: 999px; border: 1px solid #26241F; background: #121110; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; padding: 0;">
          <span data-bar="top" style="display: block; width: 17px; height: 1.6px; background: #F2F2F0; border-radius: 2px; transition: transform .35s cubic-bezier(.2,.7,.2,1);"></span>
          <span data-bar="mid" style="display: block; width: 17px; height: 1.6px; background: #F2F2F0; border-radius: 2px; transition: opacity .25s ease;"></span>
          <span data-bar="bot" style="display: block; width: 17px; height: 1.6px; background: #F2F2F0; border-radius: 2px; transition: transform .35s cubic-bezier(.2,.7,.2,1);"></span>
        </button>
      </div>
    </div>
    <div data-burger-panel style="overflow: hidden; max-height: 0px; opacity: 0; transition: max-height .5s cubic-bezier(.2,.7,.2,1), opacity .35s ease;">
      <div style="margin-top: 10px;">
        <div style="border: 1px solid #1E1E1E; border-radius: 28px; background: rgba(15,15,15,0.97); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); padding: 10px;">
${navLinks(true)}
          <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 10px; padding: 14px 8px 6px; margin-top: 6px; border-top: 1px solid #1A1A1A;">
${storePill('apple', 'compact')}
${storePill('google', 'compact')}
          </div>
        </div>
      </div>
    </div>
  </div>
</header>`;

/* ---------- hero ---------- */
const fmt = D.FORMATS[D.DEFAULT_FORMAT];

const formatMenu = D.FORMATS.map((f, i) => {
  const on = i === D.DEFAULT_FORMAT;
  return `<button class="fmt-option" data-fmt="${i}" style="display: flex; align-items: center; gap: 12px; width: 100%; font-family: inherit; font-size: 15px; padding: 10px 12px; border-radius: 12px; cursor: pointer; background: ${on ? '#1D1B19' : 'transparent'}; color: ${on ? '#F2F2F0' : '#9A9793'}; border: 0; text-align: left;">
  <span class="fmt-ic" style="color: ${on ? 'var(--accent)' : '#56534F'}; display: flex;"><isax-icon name="${f.icon}" size="16"></isax-icon></span>${esc(f.label)}
</button>`;
}).join('\n');

const thumbs = D.THUMBS.map((i) => {
  const f = D.FORMATS[i];
  const on = i === D.DEFAULT_FORMAT;
  return `<button class="thumb" data-fmt="${i}" style="display: flex; flex-direction: column; gap: 5px; padding: 0; background: none; border: 0; cursor: pointer; font-family: inherit;">
  <span class="thumb-ring" style="position: relative; display: block; border-radius: 9px; overflow: hidden; aspect-ratio: 1 / 1; width: 100%; min-height: 0; background: #060606; border: 1.5px solid ${on ? 'var(--accent)' : 'transparent'}; transition: border-color .3s ease;">
    <jggl-media url="${f.media}" alt="${esc(f.label)}" fit="cover" style="position: absolute; inset: 0;"></jggl-media>
  </span>
  <span class="thumb-label" style="font-size: 11px; color: ${on ? '#F2F2F0' : '#8B8884'}; text-align: center; transition: color .3s ease;">${esc(f.label)}</span>
</button>`;
}).join('\n');

const hero = `<section class="hero-grid" style="padding: clamp(56px, 8vw, 108px) 0 0;">
  <div class="hero-copy" data-reveal>
    <h1 style="margin: 0; font-size: clamp(36px, 6.4vw, 76px); line-height: 0.98; font-weight: 500; letter-spacing: -0.036em; max-width: 17ch; text-wrap: pretty;">One assistant. Every format. <span style="color: var(--accent);">One workflow.</span></h1>
    <p style="margin: 24px 0 0; font-size: clamp(17px, 2.2vw, 20px); line-height: 1.58; color: #9A9793; max-width: 46ch; text-wrap: pretty;">A single assistant replaces a dozen services: text, images, music, video, voice and advertising are produced and distributed in one workflow.</p>
  </div>

  <div class="hero-composer" data-reveal style="position: relative;">
      <div class="shine" style="position: relative; border-radius: 24px; padding: clamp(18px, 2.4vw, 26px); display: flex; flex-direction: column; gap: clamp(24px, 3vw, 40px); min-height: 190px;">
        <div style="position: relative;">
          <div data-ghost style="position: absolute; inset: 0; pointer-events: none; display: flex; align-items: flex-start; font-size: 20px; line-height: 1.4; letter-spacing: -0.018em; color: #8B8884;">
            <span data-typed></span>
          </div>
          <textarea data-composer rows="3" placeholder="" aria-label="Describe what you want to create" style="display: block; width: 100%; min-height: 84px; resize: none; border: 0; outline: none; background: transparent; font-family: inherit; font-size: 20px; line-height: 1.4; letter-spacing: -0.018em; color: #F2F2F0; padding: 0; caret-color: var(--accent);"></textarea>
        </div>
        <div class="composer-actions" style="margin-top: auto; display: flex; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div class="fmt-wrap" style="position: relative;">
            <button data-fmt-toggle aria-haspopup="true" aria-expanded="false" style="display: flex; align-items: center; gap: 10px; font-family: inherit; font-size: 15px; padding: 11px 18px; border-radius: 999px; cursor: pointer; background: #171614; color: #F2F2F0; border: 1px solid #2A2825;">
              <span data-active-icon style="color: var(--accent); display: flex;"><isax-icon name="${fmt.icon}" size="16"></isax-icon></span>
              <span data-active-label>${esc(fmt.label)}</span>
              <span data-chev style="color: #77746F; font-size: 12px; transform: rotate(0deg); transition: transform .3s ease; display: inline-block;">▾</span>
            </button>
            <div data-fmt-menu role="menu" style="position: absolute; bottom: calc(100% + 10px); left: 0; z-index: 20; min-width: 210px; padding: 8px; border: 1px solid #262421; border-radius: 18px; background: #121110; box-shadow: 0 18px 48px rgba(0,0,0,0.6); display: none; flex-direction: column; gap: 2px;">
${formatMenu}
            </div>
          </div>
          <span style="font-size: 16px; color: #8B8884;">One engine — every format</span>
          <button class="send-btn" data-open-modal aria-label="Send to the assistant" style="margin-left: auto; width: 62px; height: 62px; padding: 0; border: 0; background: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex: none; transition: transform .3s cubic-bezier(.2,.7,.2,1);">
            <img src="assets/media/jggl-send.webp" alt="" width="62" height="62" style="width: 62px; height: 62px; object-fit: contain;">
          </button>
        </div>
      </div>
    </div>

  <div class="hero-media" data-reveal data-delay="1" style="position: relative; height: 100%; min-height: clamp(300px, 52vw, 480px);">
    <div style="position: absolute; inset: 0; border-radius: 24px; overflow: hidden; background: #060606;">
      <jggl-media data-hero-media url="${fmt.media}" alt="${esc(fmt.label)}" fit="cover"></jggl-media>
    </div>
    <div class="hero-thumbs" style="position: absolute; z-index: 2; left: 50%; transform: translateX(-50%); bottom: 16px; border: 1px solid #262421; border-radius: 15px; background: rgba(15,15,15,0.94); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); padding: 8px;">
${thumbs}
    </div>
  </div>
</section>`;

/* ---------- store CTA band + stats marquee ---------- */
const ctaBand = `<section style="padding: 60px 0 0; display: flex; flex-direction: column; align-items: center; text-align: center;">
${storePair('large', 'display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;')}
</section>`;

/* Doubled so the -50% keyframe loops without a seam. */
const marqueeItems = D.MARQUEE.concat(D.MARQUEE).map((m) =>
  `<span style="display: flex; align-items: baseline; gap: clamp(20px, 3vw, 40px); padding-right: clamp(20px, 3vw, 40px); white-space: nowrap;">
  <span style="display: flex; align-items: baseline; gap: 14px;">
    <span style="font-size: clamp(22px, 3.4vw, 30px); font-weight: 500; letter-spacing: -0.03em; color: var(--accent);">${esc(m.v)}</span>
    <span style="font-size: clamp(14px, 2vw, 17px); color: #8B8884;">${esc(m.t)}</span>
  </span>
  <span style="width: 1px; height: 26px; background: #232323; display: block; align-self: center;"></span>
</span>`).join('\n');

const marquee = `<section style="padding: 56px 0 0;" aria-hidden="true">
  <div class="fade" style="border-top: 1px solid #1E1E1E; border-bottom: 1px solid #1E1E1E; overflow: hidden; padding: 22px 0;">
    <div class="marquee-track">
${marqueeItems}
    </div>
  </div>
</section>`;

/* ---------- ecosystem ---------- */
const products = D.PRODUCTS.map((p, i) =>
  `<a class="product-card" data-reveal data-delay="${i}" href="#${p.route}" style="display: flex; flex-direction: column; border: 1px solid #1E1E1E; border-radius: var(--r); background: #0F0F0F; padding: 16px; cursor: pointer; transition: opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1), border-color .35s ease;">
  <div style="border-radius: 20px; background: ${p.bg}; aspect-ratio: 1 / 1; width: 100%; overflow: hidden;">
    <jggl-media url="${p.media}" alt="${esc(p.alt)}" fit="${p.fit}"></jggl-media>
  </div>
  <div style="padding: 26px 12px 12px;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="color: var(--accent); display: flex;"><isax-icon name="${p.icon}" size="19"></isax-icon></span>
      <h3 style="margin: 0; font-size: 26px; font-weight: 500; letter-spacing: -0.022em;">${esc(p.title)}</h3>
    </div>
    <p style="margin: 16px 0 22px; font-size: 16.5px; line-height: 1.7; color: #8B8884; text-wrap: pretty;">${esc(p.text)}</p>
${p.meta.map((m) => `    <div style="display: flex; justify-content: space-between; gap: 16px; padding: 11px 0; border-top: 1px solid #1A1A1A; font-size: 14px;">
      <span style="color: #56534F;">${esc(m.k)}</span>
      <span style="color: #C7C4C0; text-align: right;">${esc(m.v)}</span>
    </div>`).join('\n')}
  </div>
</a>`).join('\n');

const sectionHead = (kicker, heading, blurb, headMax) =>
  `<div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 48px;">
  <span style="font-size: 18px; font-weight: 500; letter-spacing: -0.014em; color: var(--accent);">${kicker}</span>
  <h2 data-reveal style="margin: 20px 0 0; font-size: clamp(28px, 5.2vw, 56px); line-height: 1.08; font-weight: 500; letter-spacing: -0.028em; max-width: ${headMax}; text-wrap: pretty;">${heading}</h2>
${blurb ? `  <p style="margin: 20px 0 0; font-size: clamp(16px, 2.1vw, 19px); line-height: 1.62; color: #9A9793; max-width: 62ch; text-wrap: pretty;">${blurb}</p>` : ''}
</div>`;

const ecosystem = `<section id="ecosystem" style="padding: var(--sp) 0 0; scroll-margin-top: 110px;">
${sectionHead('Ecosystem', 'Two products.&nbsp; One integrated ecosystem.', '', '26ch')}
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
${products}
  </div>
</section>`;

/* ---------- pipeline bento ---------- */
const replacedChips = D.REPLACED.map((r) =>
  `<span style="padding: 6px 14px; border: 1px solid #262626; border-radius: 999px; font-size: 13px; color: #9A9793;">${esc(r)}</span>`).join('\n');

const cardBase = 'border: 1px solid #1E1E1E; border-radius: var(--r); background: #0F0F0F;';
const kicker = (icon, text) =>
  `<span style="display: flex; align-items: center; gap: 12px; font-size: 18px; font-weight: 500; letter-spacing: -0.014em; color: var(--accent);"><isax-icon name="${icon}" size="18"></isax-icon>${text}</span>`;

const pipeline = `<section id="pipeline" style="padding: var(--sp) 0 0; scroll-margin-top: 110px;">
${sectionHead('Pipeline', 'Proprietary infrastructure.&nbsp; Compounding margin.', 'The advantage is infrastructural rather than conversational: cost per generation is 2–3× lower than the GPT API under production load.', '28ch')}
  <div class="bento">
    <div data-reveal class="b7" style="display: flex; flex-direction: column; ${cardBase} padding: 16px;">
      <div style="padding: 20px 16px 26px;">
${kicker('magicpen', 'Guided production')}
        <h3 style="margin: 20px 0 14px; font-size: clamp(24px, 2.2vw, 33px); font-weight: 500; letter-spacing: -0.024em; line-height: 1.2; max-width: 26ch; text-wrap: pretty;">From idea to publication, without a perfect prompt</h3>
        <p style="margin: 0; font-size: 17px; line-height: 1.72; color: #8B8884; max-width: 52ch; text-wrap: pretty;">The assistant proposes what to create and which audience to address, which extends authorship across the entire user base.</p>
      </div>
      <div style="margin-top: auto; border-radius: 20px; background: #060606; height: clamp(220px, 34vw, 400px); width: 100%; overflow: hidden;">
        <jggl-media url="assets/media/authors-grid.webp" alt="Authorship across the user base" fit="cover"></jggl-media>
      </div>
    </div>

    <div data-reveal data-delay="1" class="b5" style="display: flex; flex-direction: column; justify-content: space-between; gap: 32px; min-height: 300px; ${cardBase} padding: clamp(24px, 3vw, 36px);">
${kicker('flash', 'Faster on generations')}
      <div style="font-size: clamp(52px, 5.6vw, 88px); line-height: 0.9; letter-spacing: -0.042em; color: var(--accent); font-weight: 500;">2.5×</div>
      <p style="margin: 0; font-size: 17px; line-height: 1.72; color: #8B8884; text-wrap: pretty;">Measured against GPT-5.2 on the same generation tasks. Response speed approximately doubled after the architecture rework.</p>
    </div>

    <div data-reveal data-delay="2" class="b5" style="${cardBase} padding: clamp(24px, 3vw, 36px); display: flex; flex-direction: column; justify-content: space-between; gap: 32px; min-height: 300px;">
${kicker('chart-2', 'Output quality')}
      <div style="display: flex; gap: 24px;">
        <div style="flex: 1;">
          <div style="font-size: clamp(40px, 4.2vw, 66px); line-height: 0.9; letter-spacing: -0.042em; color: var(--accent); font-weight: 500;">13s</div>
          <div style="margin-top: 14px; font-size: 14px; letter-spacing: -0.01em; color: #56534F;">Text to image</div>
        </div>
        <div style="width: 1px; background: #1E1E1E;"></div>
        <div style="flex: 1;">
          <div style="font-size: clamp(40px, 4.2vw, 66px); line-height: 0.9; letter-spacing: -0.042em; color: #F2F2F0; font-weight: 500;">90%</div>
          <div style="margin-top: 14px; font-size: 14px; letter-spacing: -0.01em; color: #56534F;">Created in-app</div>
        </div>
      </div>
      <p style="margin: 0; font-size: 17px; line-height: 1.72; color: #8B8884; text-wrap: pretty;">13 seconds against 28 on average, at 60% against 70% blind preference. More than 90% of published content is original work.</p>
    </div>

    <div data-reveal data-delay="3" class="b4" style="display: flex; flex-direction: column; ${cardBase} padding: clamp(24px, 3vw, 32px);">
${kicker('layer', 'One assistant')}
      <h3 style="margin: 28px 0 14px; font-size: 26px; font-weight: 500; letter-spacing: -0.02em; line-height: 1.26; text-wrap: pretty;">Every role, one dialogue</h3>
      <p style="margin: 0; font-size: 16.5px; line-height: 1.72; color: #8B8884; text-wrap: pretty;">Covers the functions previously split between Midjourney, Suno, ChatGPT, a video editor and an advertising dashboard.</p>
      <div style="margin-top: auto; padding-top: 32px; display: flex; flex-wrap: wrap; gap: 8px;">
${replacedChips}
      </div>
    </div>

    <div data-reveal data-delay="4" class="b8 split" style="${cardBase} padding: 16px;">
      <div style="align-self: stretch; display: flex; flex-direction: column; justify-content: space-between; gap: 32px; padding: 26px 20px;">
${kicker('musicnote', 'Music studio')}
        <div>
          <div style="font-size: clamp(44px, 4.6vw, 70px); line-height: 0.9; letter-spacing: -0.042em; color: #F2F2F0; font-weight: 500;">43%</div>
          <div style="margin-top: 14px; font-size: 14px; letter-spacing: -0.01em; color: #56534F;">Faster than Suno</div>
        </div>
        <p style="margin: 0; font-size: 16.5px; line-height: 1.72; color: #8B8884; text-wrap: pretty;">A finished track is assembled 42.9% faster than in Suno. In direct comparisons with AceStep, tracks are preferred in up to 90% of cases. Users can clone their own voice or generate an instrumental.</p>
      </div>
      <div style="border-radius: 20px; background: #060606; height: 100%; min-height: clamp(220px, 30vw, 340px); width: 100%; overflow: hidden;">
        <jggl-media url="assets/media/studio-sound.webp" alt="Music studio in the JGGL App" fit="cover"></jggl-media>
      </div>
    </div>
  </div>
</section>`;

/* ---------- category comparison ---------- */
const brandFilter = (b) => b.invert
  ? 'invert(1) brightness(2.6) grayscale(1)'
  : 'grayscale(1) brightness(2.4)';

const GRID_COLS = 'display: grid; grid-template-columns: minmax(0, 1.7fr) repeat(6, minmax(0, 1fr)); align-items: center;';

const tableHead = `<div style="${GRID_COLS} border-bottom: 1px solid #1A1A1A;">
  <div style="padding: clamp(14px, 2vw, 20px) clamp(14px, 2.4vw, 26px); font-size: 14px; letter-spacing: -0.01em; color: #56534F;">Capability</div>
  <div style="padding: clamp(14px, 2vw, 20px) 6px; display: flex; justify-content: center;">
    <img src="assets/jggl-mark.png" alt="JGGL" width="34" height="34" style="width: 34px; height: 34px; object-fit: contain; transform: scale(1.35);">
  </div>
${D.BRANDS.map((b) => `  <div style="padding: clamp(14px, 2vw, 20px) 6px; display: flex; justify-content: center;">
    <jggl-media url="${b.src}" alt="${esc(b.alt)}" fit="contain" style="height: 18px; width: 26px; opacity: 0.65; filter: ${brandFilter(b)};"></jggl-media>
  </div>`).join('\n')}
</div>`;

const cellStyle = 'padding: clamp(18px, 2.4vw, 24px) 6px; text-align: center; font-size: clamp(13px, 1.7vw, 16px); text-wrap: pretty;';

const tableRows = D.ROWS.map((r) => `<div class="trow" style="${GRID_COLS} border-bottom: 1px solid #141414;">
  <div style="padding: clamp(18px, 2.4vw, 24px) clamp(14px, 2.4vw, 26px);">
    <div style="font-size: clamp(15px, 1.9vw, 18px); letter-spacing: -0.018em; color: #E6E3DF; text-wrap: pretty;">${esc(r.cap)}</div>
    <div style="margin-top: 6px; font-size: clamp(13px, 1.6vw, 15px); color: #6E6B67; text-wrap: pretty;">${esc(r.note)}</div>
  </div>
  <div style="${cellStyle} color: var(--accent);">${esc(r.v1)}</div>
${[r.v2, r.v3, r.v4, r.v5, r.v6].map((v) => `  <div style="${cellStyle} color: #6E6B67;">${esc(v)}</div>`).join('\n')}
</div>`).join('\n');

const narrowCards = D.ROWS.map((r) => {
  const cells = [{ jggl: true, v: r.v1 }].concat(
    D.BRANDS.map((b, i) => ({ jggl: false, brand: b, v: [r.v2, r.v3, r.v4, r.v5, r.v6][i] }))
  );
  return `<div class="cmp-card" style="border-radius: 20px; background: #0A0A0A; padding: 22px 20px;">
  <div style="font-size: 19px; letter-spacing: -0.018em; color: #E6E3DF; text-wrap: pretty;">${esc(r.cap)}</div>
  <div style="margin-top: 6px; font-size: 15px; color: #6E6B67; text-wrap: pretty;">${esc(r.note)}</div>
  <div style="margin-top: 18px; display: flex; flex-direction: column;">
${cells.map((c) => `    <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 11px 0; border-top: 1px solid #161616;">
      <span style="display: flex; align-items: center; gap: 10px; min-width: 0;">
        ${c.jggl
          ? `<img src="assets/jggl-mark.png" alt="JGGL" width="30" height="30" style="width: 30px; height: 30px; object-fit: contain; transform: scale(1.35);">`
          : `<jggl-media url="${c.brand.src}" alt="${esc(c.brand.alt)}" fit="contain" style="height: 16px; width: 24px; opacity: 0.65; filter: ${brandFilter(c.brand)};"></jggl-media>`}
      </span>
      <span style="font-size: 15px; color: ${c.jggl ? 'var(--accent)' : '#6E6B67'}; text-align: right;">${esc(c.v)}</span>
    </div>`).join('\n')}
  </div>
</div>`;
}).join('\n');

const cmpDots = D.ROWS.map((r, i) =>
  `        <button class="cmp-dot${i === 0 ? ' is-active' : ''}" data-cmp-go="${i}"` +
  ` aria-label="Show: ${esc(r.cap)}"${i === 0 ? ' aria-current="true"' : ''}></button>`).join('\n');

const category = `<section id="category" style="padding: var(--sp) 0 0; scroll-margin-top: 110px;">
  <div style="${cardBase} padding: clamp(10px, 1.2vw, 16px);">
    <div style="padding: clamp(24px, 3vw, 32px) clamp(14px, 2vw, 24px) clamp(26px, 3.4vw, 36px); text-align: center;">
      <span style="font-size: 18px; font-weight: 500; letter-spacing: -0.014em; color: var(--accent);">Category</span>
      <h2 data-reveal style="margin: 20px auto 0; font-size: clamp(27px, 5vw, 52px); line-height: 1.1; font-weight: 500; letter-spacing: -0.028em; max-width: 24ch; text-wrap: pretty;">No direct equivalent.&nbsp; Both layers in one product.</h2>
      <p style="margin: 20px auto 0; font-size: clamp(16px, 2vw, 18px); line-height: 1.65; color: #9A9793; max-width: 64ch; text-wrap: pretty;">Instagram and TikTok provide distribution without generation. Midjourney and Suno provide generation without distribution. JGGL operates the full create–publish–promote cycle.</p>
    </div>
    <div class="t-wide" style="border-radius: 20px; background: #0A0A0A; overflow: hidden;">
${tableHead}
${tableRows}
    </div>
    <div class="t-narrow">
      <div class="cmp-rail" tabindex="0" role="group" aria-label="Capability comparison, ${D.ROWS.length} cards">
${narrowCards}
      </div>
      <div class="cmp-dots">
${cmpDots}
      </div>
    </div>
  </div>
</section>`;

/* ---------- FAQ ---------- */
const faq = `<section id="faq" style="padding: var(--sp) 0 0; scroll-margin-top: 110px;">
${sectionHead('Questions', 'Product, technology&nbsp; and economics.', '', '26ch')}
  <div style="display: flex; flex-direction: column; gap: 12px;">
${D.FAQ.map((f, i) => {
  const on = i === 0;
  return `<div class="faq-row${on ? ' is-open' : ''}" style="border: 1px solid ${on ? 'rgba(255,108,25,0.34)' : '#1E1E1E'}; border-radius: 24px; background: ${on ? 'rgba(255,108,25,0.07)' : '#0F0F0F'}; box-shadow: ${on ? 'inset 3px 0 0 0 var(--accent)' : 'none'}; overflow: hidden; transition: border-color .35s ease, background .35s ease, box-shadow .35s ease;">
  <button class="faq-toggle" data-faq="${i}" aria-expanded="${on}" aria-controls="faq-panel-${i}" style="width: 100%; display: flex; align-items: flex-start; gap: clamp(12px, 1.6vw, 22px); padding: clamp(20px, 2.6vw, 28px); background: none; border: 0; cursor: pointer; text-align: left; font-family: inherit; color: #F2F2F0;">
    <span class="faq-num" style="font-size: 14px; letter-spacing: -0.01em; color: ${on ? 'var(--accent)' : '#56534F'}; padding-top: 8px; flex: none; transition: color .3s ease;">${String(i + 1).padStart(2, '0')}</span>
    <span class="faq-q" style="flex: 1; font-size: clamp(18px, 2.9vw, 26px); line-height: 1.34; letter-spacing: -0.022em; color: ${on ? '#F2F2F0' : '#C7C4C0'}; transition: color .3s ease; text-wrap: pretty;">${esc(f.q)}</span>
    <span class="faq-plus" aria-hidden="true" style="flex: none; width: 34px; height: 34px; border-radius: 999px; border: 1px solid ${on ? 'rgba(255,108,25,0.45)' : '#262626'}; display: flex; align-items: center; justify-content: center; font-size: 19px; line-height: 1; color: ${on ? 'var(--accent)' : '#9A9793'}; transform: ${on ? 'rotate(45deg)' : 'rotate(0deg)'}; transition: transform .45s cubic-bezier(.2,.7,.2,1), color .3s ease, border-color .3s ease;">+</span>
  </button>
  <div class="faq-panel" id="faq-panel-${i}" style="overflow: hidden; max-height: ${on ? '640px' : '0px'}; opacity: ${on ? 1 : 0}; transition: max-height .6s cubic-bezier(.2,.7,.2,1), opacity .45s ease;">
    <p style="margin: 0; padding: 0 clamp(20px, 2.6vw, 28px) clamp(22px, 3vw, 30px) clamp(20px, 4.4vw, 62px); font-size: clamp(16px, 2vw, 18px); line-height: 1.74; color: #8B8884; max-width: 88ch; text-wrap: pretty;">${esc(f.a)}</p>
  </div>
</div>`;
}).join('\n')}
  </div>
</section>`;

/* ---------- get started ---------- */
const getStarted = `<section id="get-started" style="padding: var(--sp) 0 96px; scroll-margin-top: 110px;">
  <div data-reveal>
    <div style="padding: 0 clamp(20px, 3vw, 40px) clamp(48px, 7vw, 88px); display: flex; flex-direction: column; align-items: center; text-align: center;">
      <video class="gs-media" src="assets/media/jin-icon-3d.mp4" autoplay muted loop playsinline aria-hidden="true"></video>
      <span style="font-size: 18px; font-weight: 500; letter-spacing: -0.014em; color: var(--accent);">Get started</span>
      <h2 style="margin: 22px 0 0; font-size: clamp(30px, 5.6vw, 62px); line-height: 1.04; font-weight: 500; letter-spacing: -0.032em; max-width: 20ch; text-wrap: pretty;">Create. Publish. <span style="color: var(--accent);">Reach your audience.</span></h2>
      <p style="margin: 24px 0 0; font-size: clamp(17px, 2.2vw, 20px); line-height: 1.6; color: #9A9793; max-width: 48ch; text-wrap: pretty;">A social network where publishing is available to every user. Free for the first 100,000 accounts.</p>
${storePair('large', 'margin: 40px 0 0; display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;')}
    </div>
  </div>
</section>`;

/* ---------- footer ---------- */
const tickerItems = D.TICKER.concat(D.TICKER).map((t, i) =>
  `<span style="display: flex; align-items: center; gap: clamp(20px, 3vw, 40px); padding-right: clamp(20px, 3vw, 40px); font-size: clamp(26px, 5.6vw, 76px); line-height: 1; letter-spacing: -0.036em; color: ${i % 3 === 2 ? 'var(--accent)' : '#F2F2F0'}; white-space: nowrap;">
  ${esc(t)}<img src="assets/note.png" alt="" width="72" height="72" style="width: clamp(24px, 4.4vw, 68px); height: auto; flex: none;">
</span>`).join('\n');

const tileLinks = (t) => {
  const items = t.kind === 'sections'
    ? D.SECTIONS.map((s) => ({ label: s.label, href: '#' + s.id }))
    : (t.items || []);
  const external = t.kind === 'links' && t.title === 'Legal';
  return `<div style="display: flex; flex-direction: column; gap: 10px;">
${items.map((i) => `    <a href="${i.href}"${external ? ' target="_blank" rel="noopener"' : ''}${t.kind === 'sections' ? ' data-scroll' : ''} style="font-size: 16px; color: #A5A29E;">${esc(i.label)}</a>`).join('\n')}
  </div>`;
};

const footerTiles = [0, 2].map((k) => `<div class="f-pair">
${D.TILES.slice(k, k + 2).map((t) => `  <div class="f-tile" style="padding: clamp(28px, 3vw, 40px) clamp(24px, 2.6vw, 36px); border-left: 1px solid #1E1E1E; border-bottom: 1px solid #1E1E1E; margin-left: -1px; display: flex; flex-direction: column; gap: 20px;">
    <span style="display: flex; align-items: center; gap: 11px; font-size: 18px; font-weight: 500; letter-spacing: -0.014em; color: var(--accent);"><isax-icon name="${t.icon}" size="18"></isax-icon>${esc(t.title)}</span>
${t.kind === 'download'
  ? storePair('footer', 'display: flex; flex-direction: column; align-items: flex-start; gap: 10px;', 'f-store').replace('<div style=', '<div class="f-stores" style=')
  : tileLinks(t)}
  </div>`).join('\n')}
</div>`).join('\n');

const footer = `<footer style="max-width: var(--max); margin: 0 auto 48px; ${cardBase} overflow: hidden;">
  <a class="ticker-link" href="${D.APP_STORE}" target="_blank" rel="noopener" aria-label="Download the JGGL App" style="display: block; padding: clamp(22px, 3.4vw, 46px) 0; border-bottom: 1px solid #1E1E1E; overflow: hidden; color: #F2F2F0; transition: background .3s ease;">
    <div class="ticker-track">
${tickerItems}
    </div>
  </a>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 520px), 1fr)); border-top: 1px solid #1E1E1E;">
${footerTiles}
  </div>
  <div class="legal">
    <span style="font-size: 14px; color: #56534F;">© 2026 JGGL Entertainment Limited</span>
    <span class="legal-links">
      <a href="https://s3.us-east-1.amazonaws.com/aws-jggl-main-prod-s3-jggl-bucket/docs/privacy-policy.pdf" target="_blank" rel="noopener" style="color: #56534F;">Privacy Policy</a>
      <a href="https://s3.us-east-1.amazonaws.com/aws-jggl-main-prod-s3-jggl-bucket/docs/terms-of-use.pdf" target="_blank" rel="noopener" style="color: #56534F;">Terms of Use</a>
    </span>
  </div>
</footer>`;

/* ---------- download modal ---------- */
const modal = `<div data-modal class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title" style="position: fixed; inset: 0; z-index: 200; display: none; align-items: center; justify-content: center; padding: 32px 24px; background: rgba(4,4,4,0.72); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); opacity: 0; transition: opacity .4s cubic-bezier(.2,.7,.2,1);">
  <div data-modal-panel class="modal-panel" style="position: relative; width: min(780px, 100%); max-height: 100%; border: 1px solid #262421; border-radius: 32px; background: #0C0C0C; overflow: hidden auto; box-shadow: 0 40px 120px rgba(0,0,0,0.72); transform: translateY(26px) scale(0.985); opacity: 0; transition: opacity .5s cubic-bezier(.2,.7,.2,1), transform .5s cubic-bezier(.2,.7,.2,1);">
    <span aria-hidden="true" style="position: absolute; z-index: 1; left: -10%; top: 30%; width: 60%; height: 70%; background: radial-gradient(circle, rgba(255,108,25,0.16), rgba(255,108,25,0) 68%); pointer-events: none;"></span>
    <button class="modal-close" data-close-modal aria-label="Close" style="position: absolute; z-index: 4; top: 22px; right: 22px; width: 42px; height: 42px; border-radius: 999px; border: 1px solid #262421; background: rgba(10,10,10,0.55); backdrop-filter: blur(16px) saturate(1.2); -webkit-backdrop-filter: blur(16px) saturate(1.2); color: #E4E1DD; font-family: inherit; font-size: 17px; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: color .3s ease, border-color .3s ease, background .3s ease;">✕</button>
    <div class="modal-grid" style="position: relative; z-index: 2; display: flex; flex-direction: column;">
      <div class="modal-art" style="position: relative; height: 300px; overflow: hidden; display: flex; align-items: flex-start; justify-content: center; background: #080808;">
        <img src="assets/media/feed-mockup.webp" alt="JGGL App on iPhone" style="width: 100%; max-width: none; display: block; transform: translateY(-4%);">
        <span aria-hidden="true" style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(12,12,12,0) 38%, #0C0C0C 100%); pointer-events: none;"></span>
      </div>
      <div class="modal-copy" style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 24px; padding: 8px clamp(28px, 5vw, 72px) clamp(44px, 5vw, 60px);">
        <span style="display: inline-flex; align-items: center; gap: 9px; padding: 8px 16px; border: 1px solid rgba(255,108,25,0.32); border-radius: 999px; font-size: 15px; font-weight: 500; letter-spacing: -0.01em; color: var(--accent); white-space: nowrap;"><isax-icon name="magicpen" size="15" stroke-width="2.1"></isax-icon>Free to download</span>
        <h2 id="modal-title" style="margin: 0; font-size: clamp(28px, 3.2vw, 46px); line-height: 1.08; font-weight: 500; letter-spacing: -0.032em; max-width: 19ch; text-wrap: pretty;">The full AI pipeline runs in the JGGL App</h2>
        <p style="margin: 0; font-size: clamp(16px, 1.3vw, 20px); line-height: 1.6; color: #8B8884; max-width: 46ch; text-wrap: pretty;">Images, music, video and voice. Download it, and the request you just typed will be waiting for you in chat.</p>
${storePair('modal', 'display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;').replace('<div style=', '<div class="modal-cta" style=')}
      </div>
    </div>
  </div>
</div>`;

/* ---------- document ---------- */
const DESC = 'A single assistant replaces a dozen services: text, images, music, video, voice and advertising are produced and distributed in one workflow.';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>JGGL — One assistant. Every format. One workflow.</title>
<meta name="description" content="${esc(DESC)}">
<meta name="theme-color" content="#0A0A0A">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png?v=${ver('assets/favicon-32.png')}">
<link rel="icon" type="image/png" sizes="192x192" href="assets/favicon-192.png?v=${ver('assets/favicon-192.png')}">
<link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png?v=${ver('assets/apple-touch-icon.png')}">
<meta property="og:type" content="website">
<meta property="og:title" content="JGGL — One assistant. Every format. One workflow.">
<meta property="og:description" content="${esc(DESC)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="assets/fonts/instrument-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="styles.css?v=${ver('styles.css')}">
<script src="assets/iconsax.js?v=${ver('assets/iconsax.js')}" defer></script>
<script src="app.js?v=${ver('app.js')}" defer></script>
</head>
<body>
<div style="position: relative; min-height: 100vh; background: #0A0A0A; padding: 0 clamp(14px, 2vw, 24px);">

${header}

<main style="max-width: var(--max); margin: 0 auto;">
${hero}

${ctaBand}

${marquee}

${ecosystem}

${pipeline}

${category}

${faq}

${getStarted}
</main>

${footer}

${modal}
</div>
</body>
</html>
`;

const out = path.join(__dirname, '..', 'public', 'index.html');
fs.writeFileSync(out, html);
console.log('wrote', out, '—', html.length, 'bytes');
