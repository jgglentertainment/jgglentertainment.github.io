// Iconsax (Vuesax, iconsax.io) — linear set, subset baked in as SVG bodies.
(function () {
  var ICONS = {
    "flash": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.5\" d=\"M9.32 13.28h3.09v7.2c0 1.06 1.32 1.56 2.02.76l7.57-8.6c.66-.75.13-1.92-.87-1.92h-3.09v-7.2c0-1.06-1.32-1.56-2.02-.76l-7.57 8.6c-.65.75-.12 1.92.87 1.92zM8.5 4h-7M7.5 20h-6M4.5 12h-3\"/>",
    "magicpen": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M3.5 20.5c.83.83 2.17.83 3 0l13-13c.83-.83.83-2.17 0-3-.83-.83-2.17-.83-3 0l-13 13c-.83.83-.83 2.17 0 3zM18.01 8.99l-3-3\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8.5 2.44L10 2l-.44 1.5L10 5l-1.5-.44L7 5l.44-1.5L7 2l1.5.44zM4.5 8.44L6 8l-.44 1.5L6 11l-1.5-.44L3 11l.44-1.5L3 8l1.5.44zM19.5 13.44L21 13l-.44 1.5L21 16l-1.5-.44L18 16l.44-1.5L18 13l1.5.44z\"/>",
    "message-text": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M16 2H8C4 2 2 4 2 8v13c0 .55.45 1 1 1h13c4 0 6-2 6-6V8c0-4-2-6-6-6z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.5\" d=\"M7 9.5h10M7 14.5h7\"/>",
    "musicnote": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M7.97 22a4 4 0 100-8 4 4 0 000 8zM11.97 18V4M14.61 2.11l4.42 1.47c1.07.36 1.95 1.57 1.95 2.7v1.17c0 1.53-1.18 2.38-2.63 1.9l-4.42-1.47c-1.07-.36-1.95-1.57-1.95-2.7V4c-.01-1.52 1.18-2.38 2.63-1.89z\"/>",
    "video": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M12.53 20.42H6.21c-3.16 0-4.21-2.1-4.21-4.21V7.79c0-3.16 1.05-4.21 4.21-4.21h6.32c3.16 0 4.21 1.05 4.21 4.21v8.42c0 3.16-1.06 4.21-4.21 4.21z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M19.52 17.1l-2.78-1.95V8.84l2.78-1.95c1.36-.95 2.48-.37 2.48 1.3v7.62c0 1.67-1.12 2.25-2.48 1.29zM11.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z\"/>",
    "microphone-2": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M12 15.5c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4S8 3.79 8 6v5.5c0 2.21 1.79 4 4 4z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M4.35 9.65v1.7C4.35 15.57 7.78 19 12 19c4.22 0 7.65-3.43 7.65-7.65v-1.7M10.61 6.43c.9-.33 1.88-.33 2.78 0M11.2 8.55c.53-.14 1.08-.14 1.61 0M12 19v3\"/>",
    "global": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M8 3h1a28.424 28.424 0 000 18H8M15 3a28.424 28.424 0 010 18\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M3 16v-1a28.424 28.424 0 0018 0v1M3 9a28.424 28.424 0 0118 0\"/>",
    "shield-tick": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M10.49 2.23L5.5 4.11c-1.15.43-2.09 1.79-2.09 3.01v7.43c0 1.18.78 2.73 1.73 3.44l4.3 3.21c1.41 1.06 3.73 1.06 5.14 0l4.3-3.21c.95-.71 1.73-2.26 1.73-3.44V7.12c0-1.23-.94-2.59-2.09-3.02l-4.99-1.87c-.85-.31-2.21-.31-3.04 0z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M9.05 11.87l1.61 1.61 4.3-4.3\"/>",
    "chart-2": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M15.5 18.5c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2s-2 .9-2 2v9a2 2 0 002 2zM8.5 18.5c1.1 0 2-.9 2-2V13c0-1.1-.9-2-2-2s-2 .9-2 2v3.5a2 2 0 002 2z\"/>",
    "coin": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M18.5 12.65v3.7c0 3.12-2.91 5.65-6.5 5.65s-6.5-2.53-6.5-5.65v-3.7C5.5 15.77 8.41 18 12 18s6.5-2.23 6.5-5.35z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M18.5 7.65c0 .91-.25 1.75-.69 2.47C16.74 11.88 14.54 13 12 13c-2.54 0-4.74-1.12-5.81-2.88-.44-.72-.69-1.56-.69-2.47 0-1.56.73-2.97 1.9-3.99C8.58 2.63 10.2 2 12 2c1.8 0 3.42.63 4.6 1.65 1.17 1.03 1.9 2.44 1.9 4z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M18.5 7.65v5c0 3.12-2.91 5.35-6.5 5.35s-6.5-2.23-6.5-5.35v-5C5.5 4.53 8.41 2 12 2c1.8 0 3.42.63 4.6 1.65 1.17 1.03 1.9 2.44 1.9 4z\"/>",
    "people": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M18 7.16a.605.605 0 00-.19 0 2.573 2.573 0 01-2.48-2.58c0-1.43 1.15-2.58 2.58-2.58a2.58 2.58 0 012.58 2.58A2.589 2.589 0 0118 7.16zM16.97 14.44c1.37.23 2.88-.01 3.94-.72 1.41-.94 1.41-2.48 0-3.42-1.07-.71-2.6-.95-3.97-.71M5.97 7.16c.06-.01.13-.01.19 0a2.573 2.573 0 002.48-2.58C8.64 3.15 7.49 2 6.06 2a2.58 2.58 0 00-2.58 2.58c.01 1.4 1.11 2.53 2.49 2.58zM7 14.44c-1.37.23-2.88-.01-3.94-.72-1.41-.94-1.41-2.48 0-3.42 1.07-.71 2.6-.95 3.97-.71M12 14.63a.605.605 0 00-.19 0 2.573 2.573 0 01-2.48-2.58c0-1.43 1.15-2.58 2.58-2.58a2.58 2.58 0 012.58 2.58c-.01 1.4-1.11 2.54-2.49 2.58zM9.09 17.78c-1.41.94-1.41 2.48 0 3.42 1.6 1.07 4.22 1.07 5.82 0 1.41-.94 1.41-2.48 0-3.42-1.59-1.06-4.22-1.06-5.82 0z\"/>",
    "send-2": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M7.4 6.32l8.49-2.83c3.81-1.27 5.88.81 4.62 4.62l-2.83 8.49c-1.9 5.71-5.02 5.71-6.92 0l-.84-2.52-2.52-.84c-5.71-1.9-5.71-5.01 0-6.92zM10.11 13.65l3.58-3.59\"/>",
    "box": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M3.17 7.44L12 12.55l8.77-5.08M12 21.61v-9.07\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M9.93 2.48L4.59 5.45c-1.21.67-2.2 2.35-2.2 3.73v5.65c0 1.38.99 3.06 2.2 3.73l5.34 2.97c1.14.63 3.01.63 4.15 0l5.34-2.97c1.21-.67 2.2-2.35 2.2-3.73V9.18c0-1.38-.99-3.06-2.2-3.73l-5.34-2.97c-1.15-.64-3.01-.64-4.15 0z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M17 13.24V9.58L7.51 4.1\"/>",
    "monitor": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M6.44 2h11.11C21.11 2 22 2.89 22 6.44v6.33c0 3.56-.89 4.44-4.44 4.44H6.44C2.89 17.22 2 16.33 2 12.78V6.44C2 2.89 2.89 2 6.44 2zM12 17.22V22M2 13h20M7.5 22h9\"/>",
    "sound": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M3 8.25v7.5M7.5 5.75v12.5M12 3.25v17.5M16.5 5.75v12.5M21 8.25v7.5\"/>",
    "gallery": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M9 10a2 2 0 100-4 2 2 0 000 4zM2.67 18.95l4.93-3.31c.79-.53 1.93-.47 2.64.14l.33.29c.78.67 2.04.67 2.82 0l4.16-3.57c.78-.67 2.04-.67 2.82 0L22 13.9\"/>",
    "layer": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M13.01 2.92l5.9 2.62c1.7.75 1.7 1.99 0 2.74l-5.9 2.62c-.67.3-1.77.3-2.44 0l-5.9-2.62c-1.7-.75-1.7-1.99 0-2.74l5.9-2.62c.67-.3 1.77-.3 2.44 0z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M3 11c0 .84.63 1.81 1.4 2.15l6.79 3.02c.52.23 1.11.23 1.62 0l6.79-3.02c.77-.34 1.4-1.31 1.4-2.15\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M3 16c0 .93.55 1.77 1.4 2.15l6.79 3.02c.52.23 1.11.23 1.62 0l6.79-3.02c.85-.38 1.4-1.22 1.4-2.15\"/>",
    "cpu": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M9.6 20h4.8c4 0 5.6-1.6 5.6-5.6V9.6c0-4-1.6-5.6-5.6-5.6H9.6C5.6 4 4 5.6 4 9.6v4.8c0 4 1.6 5.6 5.6 5.6z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M10.5 17h3c2.5 0 3.5-1 3.5-3.5v-3C17 8 16 7 13.5 7h-3C8 7 7 8 7 10.5v3C7 16 8 17 10.5 17zM8.01 4V2M12 4V2M16 4V2M20 8h2M20 12h2M20 16h2M16 20v2M12.01 20v2M8.01 20v2M2 8h2M2 12h2M2 16h2\"/>",
    "star": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M15.39 5.21l1.41 2.82c.19.39.7.76 1.13.84l2.55.42c1.63.27 2.01 1.45.84 2.63l-1.99 1.99c-.33.33-.52.98-.41 1.45l.57 2.46c.45 1.94-.59 2.7-2.3 1.68l-2.39-1.42c-.43-.26-1.15-.26-1.58 0l-2.39 1.42c-1.71 1.01-2.75.26-2.3-1.68l.57-2.46c.11-.46-.08-1.11-.41-1.45L6.7 11.92c-1.17-1.17-.79-2.35.84-2.63l2.55-.42c.43-.07.94-.45 1.13-.84l1.41-2.82c.75-1.53 1.99-1.53 2.76 0zM8 5H2M5 19H2M3 12H2\"/>",
    "lock": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M6 10V8c0-3.31 1-6 6-6s6 2.69 6 6v2M17 22H7c-4 0-5-1-5-5v-2c0-4 1-5 5-5h10c4 0 5 1 5 5v2c0 4-1 5-5 5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15.996 16h.01M11.995 16h.01M7.995 16h.008\"/>",
    "sticker": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M21.93 12.86c-.02.19-.05.37-.1.55A5.96 5.96 0 0017.97 12c-3.31 0-6 2.69-6 6 0 1.47.53 2.82 1.41 3.86-.18.05-.36.08-.55.1-.85.08-1.72.04-2.62-.11-4.11-.7-7.42-4.03-8.1-8.15A10.01 10.01 0 0113.67 2.14c4.12.68 7.45 3.99 8.15 8.1.15.9.19 1.77.11 2.62z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M21.83 13.41c-.14.49-.4.93-.77 1.3l-6.38 6.38c-.37.37-.81.63-1.3.77A5.96 5.96 0 0111.97 18c0-3.31 2.69-6 6-6 1.47 0 2.82.53 3.86 1.41z\"/>",
    "trend-up": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M16.5 9.5l-4.2 4.2-1.6-2.4-3.2 3.2\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M14.5 9.5h2v2\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z\"/>",
    "timer": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M15.24 2H8.76C5 2 4.71 5.38 6.74 7.22l10.52 9.56C19.29 18.62 19 22 15.24 22H8.76C5 22 4.71 18.62 6.74 16.78l10.52-9.56C19.29 5.38 19 2 15.24 2z\"/>",
    "profile-2user": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M9.16 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 01-4.27-4.43C4.56 3.99 6.54 2 9 2a4.435 4.435 0 01.16 8.87zM16.41 4c1.94 0 3.5 1.57 3.5 3.5 0 1.89-1.5 3.43-3.37 3.5a1.13 1.13 0 00-.26 0M4.16 14.56c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.74-1.83-7.25-1.83-10.01 0zM18.34 20c.72-.15 1.4-.44 1.96-.87 1.56-1.17 1.56-3.1 0-4.27-.55-.42-1.22-.7-1.93-.86\"/>",
    "speaker": "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.5\" d=\"M9 22h6c3 0 4-1 4-4V6c0-3-1-4-4-4H9C6 2 5 3 5 6v12c0 3 1 4 4 4z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.5\" d=\"M12 18a3 3 0 100-6 3 3 0 000 6zM12 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z\"/>"
  };

  if (window.customElements && !customElements.get('isax-icon')) {
    class IsaxIcon extends HTMLElement {
      static get observedAttributes() { return ['name', 'size']; }
      constructor() { super(); this.attachShadow({ mode: 'open' }); }
      connectedCallback() { this.render(); }
      attributeChangedCallback() { this.render(); }
      render() {
        if (!this.shadowRoot) return;
        var name = this.getAttribute('name');
        var size = this.getAttribute('size') || '20';
        var body = ICONS[name];
        var sw = this.getAttribute('stroke-width') || '1.8';
        var css = ':host{display:inline-flex;align-items:center;justify-content:center;width:' + size +
          'px;height:' + size + 'px;flex:none;line-height:0}svg{display:block}svg *{stroke-width:' + sw + '}';
        this.shadowRoot.innerHTML = '<style>' + css + '</style>' + (body
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size +
            '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + sw +
            '" aria-hidden="true">' + body + '</svg>'
          : '');
      }
    }
    customElements.define('isax-icon', IsaxIcon);
  }

  if (window.customElements && !customElements.get('jggl-media')) {
    class JgglMedia extends HTMLElement {
      static get observedAttributes() { return ['url', 'alt', 'fit']; }
      constructor() { super(); this.attachShadow({ mode: 'open' }); }
      connectedCallback() { this.render(); }
      attributeChangedCallback() { this.render(); }
      render() {
        if (!this.shadowRoot) return;
        var url = this.getAttribute('url'); if (window.__resolveAsset) url = window.__resolveAsset(url);
        var alt = this.getAttribute('alt') || '';
        var fit = this.getAttribute('fit') || 'cover';
        var css = ':host{display:flex;align-items:center;justify-content:center;width:100%;height:100%;overflow:hidden}' +
          (fit === 'contain'
            ? 'img,video{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;image-rendering:auto}'
            : 'img,video{display:block;width:100%;height:100%;object-fit:cover;object-position:center}');
        if (!url || url.indexOf('{{') === 0) { this.shadowRoot.innerHTML = '<style>' + css + '</style>'; return; }
        var tag = /\.(webm|mp4)$/.test(url)
          ? '<video src="' + url + '" autoplay muted loop playsinline></video>'
          : '<img src="' + url + '" alt="' + alt.replace(/"/g, '&quot;') + '" decoding="async" />';
        this.shadowRoot.innerHTML = '<style>' + css + '</style>' + tag;
      }
    }
    customElements.define('jggl-media', JgglMedia);
  }
})();
