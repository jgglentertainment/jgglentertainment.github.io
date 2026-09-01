/* Content model for the JGGL site, transcribed from the design source
   `JGGL Site V4.dc.html`. Editing copy happens here, then `npm run build`. */

const APP_STORE = 'https://apps.apple.com/us/app/jggl-ai-social-network/id6739490240';
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=ai.jggl.app';

const FORMATS = [
  { label: 'Text',  icon: 'message-text',  ph: 'Draft a launch note for the autumn campaign',   media: 'assets/media/one-assistant.webp' },
  { label: 'Music', icon: 'musicnote',     ph: 'Write a synthwave track with cloned vocals',    media: 'assets/media/studio-sound.webp' },
  { label: 'Image', icon: 'gallery',       ph: 'Build a moodboard for an autumn campaign',      media: 'assets/media/authors-grid.webp' },
  { label: 'Video', icon: 'video',         ph: 'Assemble a reel from the track and three stills', media: 'assets/media/feed-mockup-mobile.webp' },
  { label: 'Voice', icon: 'microphone-2',  ph: 'Read the caption in my cloned voice',           media: 'assets/media/voice-cloning.webp' },
  { label: 'Ads',   icon: 'trend-up',      ph: 'Promote this post to a 25–34 audience',         media: 'assets/media/web3-globe.webp' }
];

/* Which formats get a thumbnail under the hero media — all of them, in
   the order they appear in FORMATS. */
const THUMBS = [0, 1, 2, 3, 4, 5];

/* Index of the format selected on first paint. */
const DEFAULT_FORMAT = 2;

const MARQUEE = [
  { v: '2.5×', t: 'faster on generations' },
  { v: '13s',  t: 'text to image' },
  { v: '90%',  t: 'original content' },
  { v: '43%',  t: 'faster music assembly' },
  { v: '1',    t: 'assistant, every format' }
];

const REPLACED = ['Midjourney', 'Suno', 'ChatGPT', 'Video editor', 'Ads dashboard'];

const BRANDS = [
  { src: 'assets/media/brands/instagram.svg',  alt: 'Instagram' },
  { src: 'assets/media/brands/tiktok.svg',     alt: 'TikTok' },
  { src: 'assets/media/brands/midjourney.svg', alt: 'Midjourney', invert: true },
  { src: 'assets/media/brands/suno.svg',       alt: 'Suno' },
  { src: 'assets/media/brands/openai.svg',     alt: 'OpenAI' }
];

const PRODUCTS = [
  {
    title: 'JGGL App', icon: 'monitor', route: '/app', fit: 'cover', bg: '#060606',
    text: 'A social network combining a 360 Feed, a messenger and AI tools. Music, video, voice and advertising are produced through a single AI-powered chat.',
    media: 'assets/media/feed-mockup-mobile.webp', alt: 'JGGL App 360 Feed',
    meta: [{ k: 'Status', v: 'Available now' }, { k: 'Platforms', v: 'iOS · Android' }, { k: 'Release', v: 'v1.0.9' }]
  },
  {
    title: 'JGGL Buddy', icon: 'speaker', route: '/buddy', fit: 'cover', bg: '#060606',
    text: 'A device built for direct interaction: a 360° holographic dome, an AI avatar and a marketplace of personalities.',
    media: 'assets/media/buddy.webm', alt: 'JGGL Buddy device',
    meta: [{ k: 'Status', v: 'In development' }, { k: 'Form factor', v: 'Speaker · 360° dome' }, { k: 'Market', v: '$15.6B → $65B by 2034' }]
  }
];

/* v1 is JGGL; v2..v6 line up with BRANDS in order. */
const ROWS = [
  { cap: 'AI generation across formats', note: 'Text, image, music, video and voice', v1: 'All formats', v2: '—',      v3: '—',      v4: 'Single format', v5: 'Single format', v6: 'Text only' },
  { cap: 'Distribution surface',         note: 'A feed for published work',           v1: '360 Feed',    v2: 'Static', v3: 'Static', v4: '—',             v5: '—',             v6: '—' },
  { cap: 'End-to-end production cycle',  note: 'Create, publish and promote in one flow', v1: 'Single flow', v2: '—',  v3: '—',      v4: '—',             v5: '—',             v6: '—' }
];

const FAQ = [
  { q: 'What is JGGL?', a: 'JGGL is an AI-first social network that combines a feed, music, short video and messaging in a single application. One assistant supports the process from idea through publication and promotion, without separate services such as ChatGPT, Midjourney, Suno or an advertising dashboard. The resulting create–publish–promote cycle requires both proprietary generation and a proprietary feed.' },
  { q: 'How does JGGL differ from existing social networks and AI tools?', a: 'Instagram and TikTok provide an audience without production tools. Suno and Midjourney provide production tools without an audience. JGGL combines both layers: more than 90% of content is created inside the application. The underlying pipeline is 2.5× faster than GPT-5.2 on generations and 2–3× cheaper than the GPT API under production load, which represents both a product and a margin advantage.' },
  { q: 'How does the AI assistant work, and why does it matter commercially?', a: 'The assistant operates as a producer rather than a prompt interface: it proposes what to create, how to refine it and which audience to address. A single dialogue covers text, image, music and video generation, publication and advertising. This extends potential authorship from a professional minority to the entire user base, and with it the monetisable audience.' },
  { q: 'How does JGGL generate revenue?', a: 'Through three streams. Generations: paid and bonus credits for AI content, including images, video, music and voice cloning, with post and caption text excluded from limits. JGGL Ads: promotion of posts and profiles inside the platform, launched in chat rather than through a separate dashboard. Ecosystem: JGGL Buddy hardware, an avatar marketplace, subscriptions and accessories.' },
  { q: 'What is JGGL Buddy and how does it connect to the application?', a: 'JGGL Buddy is an AI companion device: a speaker with a 360° holographic display. Content created in the JGGL App appears on the dome, and posts, tracks and scenarios can be produced by voice, without a screen. The two devices operate as a single product. The smart-speaker market is projected to grow from $15.6B to $65B by 2034, with limited competition in this segment.' }
];

const TICKER = ['Create.', 'Publish.', 'Reach your audience.'];

const SECTIONS = [
  { id: 'ecosystem',   label: 'Ecosystem' },
  { id: 'pipeline',    label: 'Pipeline' },
  { id: 'category',    label: 'Category' },
  { id: 'faq',         label: 'FAQ' },
  { id: 'get-started', label: 'Get started' }
];

const TILES = [
  { title: 'Sections', icon: 'layer',       kind: 'sections' },
  { title: 'Download', icon: 'send-2',      kind: 'download' },
  { title: 'Legal',    icon: 'shield-tick', kind: 'links', items: [
    { label: 'Privacy Policy', href: 'https://s3.us-east-1.amazonaws.com/aws-jggl-main-prod-s3-jggl-bucket/docs/privacy-policy.pdf' },
    { label: 'Terms of Use',   href: 'https://s3.us-east-1.amazonaws.com/aws-jggl-main-prod-s3-jggl-bucket/docs/terms-of-use.pdf' }
  ] },
  { title: 'Contact',  icon: 'message-text', kind: 'links', items: [{ label: 'support@jggl.ai', href: 'mailto:support@jggl.ai' }] }
];

module.exports = {
  APP_STORE, PLAY_STORE, FORMATS, THUMBS, DEFAULT_FORMAT, MARQUEE, REPLACED,
  BRANDS, PRODUCTS, ROWS, FAQ, TICKER, SECTIONS, TILES
};
