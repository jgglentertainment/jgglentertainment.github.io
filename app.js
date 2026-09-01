/* Behaviour for the JGGL site.
   Ports the interaction logic from the design source's component class:
   scroll reveals, the hero format picker and typewriter, the FAQ
   accordion, scroll spy, the mobile menu and the download modal. */

(function () {
  'use strict';

  var ACCENT = 'var(--accent)';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Kept in step with build/data.js — only the fields the runtime needs. */
  var FORMATS = [
    { label: 'Text',  icon: 'message-text', ph: 'Draft a launch note for the autumn campaign',      media: 'assets/media/one-assistant.webp' },
    { label: 'Music', icon: 'musicnote',    ph: 'Write a synthwave track with cloned vocals',       media: 'assets/media/studio-sound.webp' },
    { label: 'Image', icon: 'gallery',      ph: 'Build a moodboard for an autumn campaign',         media: 'assets/media/authors-grid.webp' },
    { label: 'Video', icon: 'video',        ph: 'Assemble a reel from the track and three stills',  media: 'assets/media/feed-mockup-mobile.webp' },
    { label: 'Voice', icon: 'microphone-2', ph: 'Read the caption in my cloned voice',              media: 'assets/media/voice-cloning.webp' },
    { label: 'Ads',   icon: 'trend-up',     ph: 'Promote this post to a 25–34 audience',            media: 'assets/media/web3-globe.webp' }
  ];

  var SECTIONS = ['ecosystem', 'pipeline', 'category', 'faq', 'get-started'];
  var SECTION_LABELS = { 'ecosystem': 'Ecosystem', 'pipeline': 'Pipeline', 'category': 'Category', 'faq': 'FAQ', 'get-started': 'Get started' };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------- scroll reveals ---------------- */

  function initReveals() {
    var els = $$('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var d = parseInt(e.target.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { e.target.classList.add('is-revealed'); }, d * 80);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    els.forEach(function (el) { io.observe(el); });

    /* Safety net: nothing stays invisible if the observer never fires. */
    setTimeout(function () {
      els.forEach(function (el) { el.classList.add('is-revealed'); });
    }, 2200);
  }

  /* ---------------- hero: format picker + typewriter ---------------- */

  function initHero() {
    var toggle = $('[data-fmt-toggle]');
    var menu = $('[data-fmt-menu]');
    var chev = $('[data-chev]');
    var activeIcon = $('[data-active-icon]');
    var activeLabel = $('[data-active-label]');
    var heroMedia = $('[data-hero-media]');
    var composer = $('[data-composer]');
    var ghost = $('[data-ghost]');
    var typed = $('[data-typed]');
    if (!toggle || !menu) return;

    var current = 2;
    var menuOpen = false;
    var live = true;
    var timer = null;

    function setMenu(open) {
      menuOpen = open;
      menu.style.display = open ? 'flex' : 'none';
      if (chev) chev.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
      toggle.setAttribute('aria-expanded', String(open));
    }

    function paint() {
      $$('.fmt-option', menu).forEach(function (b) {
        var on = parseInt(b.getAttribute('data-fmt'), 10) === current;
        b.style.background = on ? '#1D1B19' : 'transparent';
        b.style.color = on ? '#F2F2F0' : '#9A9793';
        var ic = $('.fmt-ic', b);
        if (ic) ic.style.color = on ? ACCENT : '#56534F';
      });
      $$('.thumb').forEach(function (t) {
        var on = parseInt(t.getAttribute('data-fmt'), 10) === current;
        var ring = $('.thumb-ring', t);
        var label = $('.thumb-label', t);
        if (ring) ring.style.borderColor = on ? ACCENT : 'transparent';
        if (label) label.style.color = on ? '#F2F2F0' : '#8B8884';
      });
      var f = FORMATS[current];
      if (activeLabel) activeLabel.textContent = f.label;
      if (activeIcon) activeIcon.innerHTML = '<isax-icon name="' + f.icon + '" size="16"></isax-icon>';
      if (heroMedia) {
        heroMedia.setAttribute('url', f.media);
        heroMedia.setAttribute('alt', f.label);
      }
    }

    function write(s) { if (typed) typed.textContent = s; }

    function stopTyping() {
      if (!live) return;
      live = false;
      clearTimeout(timer);
      if (ghost) ghost.style.display = 'none';
    }

    function startTyping() {
      if (!live) return;
      var target = FORMATS[current].ph;
      clearTimeout(timer);
      if (reduceMotion) { write(target); return; }
      var i = 0;
      write('');
      function erase() {
        i -= 1;
        write(target.slice(0, Math.max(0, i)));
        timer = i > 0 ? setTimeout(erase, 18) : setTimeout(type, 500);
      }
      function type() {
        i += 1;
        write(target.slice(0, i));
        timer = i < target.length ? setTimeout(type, 42) : setTimeout(erase, 2400);
      }
      timer = setTimeout(type, 320);
    }

    function pick(i) {
      clearTimeout(timer);
      current = i;
      setMenu(false);
      paint();
      startTyping();
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setMenu(!menuOpen);
    });

    $$('.fmt-option', menu).forEach(function (b) {
      b.addEventListener('click', function () { pick(parseInt(b.getAttribute('data-fmt'), 10)); });
    });
    $$('.thumb').forEach(function (t) {
      t.addEventListener('click', function () { pick(parseInt(t.getAttribute('data-fmt'), 10)); });
    });

    /* Dismissing the dropdown by clicking away / pressing Escape is added
       here; the source left it open until the toggle was pressed again. */
    document.addEventListener('click', function (e) {
      if (menuOpen && !menu.contains(e.target) && e.target !== toggle) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOpen) setMenu(false);
    });

    if (composer) {
      composer.addEventListener('focus', stopTyping);
      composer.addEventListener('input', stopTyping);
      composer.addEventListener('blur', function (e) {
        if ((e.target.value || '').trim()) return;
        live = true;
        if (ghost) ghost.style.display = 'flex';
        startTyping();
      });
    }

    paint();
    startTyping();

    return { stopTyping: stopTyping };
  }

  /* ---------------- FAQ accordion ---------------- */

  function initFaq() {
    var rows = $$('.faq-row');
    var open = 0;

    function paint() {
      rows.forEach(function (row, i) {
        var on = i === open;
        var btn = $('.faq-toggle', row);
        var num = $('.faq-num', row);
        var q = $('.faq-q', row);
        var plus = $('.faq-plus', row);
        var panel = $('.faq-panel', row);
        row.style.borderColor = on ? 'rgba(255,108,25,0.34)' : '#1E1E1E';
        row.style.background = on ? 'rgba(255,108,25,0.07)' : '#0F0F0F';
        row.style.boxShadow = on ? 'inset 3px 0 0 0 ' + ACCENT : 'none';
        if (num) num.style.color = on ? ACCENT : '#56534F';
        if (q) q.style.color = on ? '#F2F2F0' : '#C7C4C0';
        if (plus) {
          plus.style.color = on ? ACCENT : '#9A9793';
          plus.style.borderColor = on ? 'rgba(255,108,25,0.45)' : '#262626';
          plus.style.transform = on ? 'rotate(45deg)' : 'rotate(0deg)';
        }
        if (panel) {
          panel.style.maxHeight = on ? '640px' : '0px';
          panel.style.opacity = on ? '1' : '0';
        }
        if (btn) btn.setAttribute('aria-expanded', String(on));
      });
    }

    rows.forEach(function (row, i) {
      var btn = $('.faq-toggle', row);
      if (!btn) return;
      btn.addEventListener('click', function () {
        open = open === i ? -1 : i;
        paint();
      });
    });
  }

  /* ---------------- nav: scroll spy, smooth scroll, burger ---------------- */

  function initNav() {
    var current = SECTIONS[0];
    var label = $('[data-current-section]');
    var burger = $('[data-burger]');
    var panel = $('[data-burger-panel]');
    var burgerOpen = false;

    function paintNav() {
      $$('.nav-link').forEach(function (a) {
        var on = a.getAttribute('data-section') === current;
        var num = $('.nav-num', a);
        a.style.background = on ? '#1A1917' : 'transparent';
        a.style.color = on ? '#F2F2F0' : '#9A9793';
        if (num) num.style.color = on ? '#77746F' : '#4E4B48';
      });
      if (label) label.textContent = SECTION_LABELS[current] || '';
    }

    function setBurger(open) {
      burgerOpen = open;
      if (panel) {
        panel.style.maxHeight = open ? '520px' : '0px';
        panel.style.opacity = open ? '1' : '0';
      }
      if (burger) {
        burger.setAttribute('aria-expanded', String(open));
        var top = $('[data-bar="top"]', burger);
        var mid = $('[data-bar="mid"]', burger);
        var bot = $('[data-bar="bot"]', burger);
        if (top) top.style.transform = open ? 'translateY(6.6px) rotate(45deg)' : 'none';
        if (mid) mid.style.opacity = open ? '0' : '1';
        if (bot) bot.style.transform = open ? 'translateY(-6.6px) rotate(-45deg)' : 'none';
      }
    }

    if (burger) burger.addEventListener('click', function () { setBurger(!burgerOpen); });

    /* Anchor links scroll with the sticky header's height subtracted. */
    $$('a[href^="#"]').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var id = href.slice(1);
      if (!id || SECTIONS.indexOf(id) < 0) return;
      a.addEventListener('click', function (e) {
        var el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 96,
          behavior: reduceMotion ? 'auto' : 'smooth'
        });
        current = id;
        paintNav();
        if (burgerOpen) setBurger(false);
      });
    });

    var raf = 0;
    function spy() {
      var cur = SECTIONS[0];
      SECTIONS.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) cur = id;
      });
      if (cur !== current) { current = cur; paintNav(); }
    }
    window.addEventListener('scroll', function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(spy);
    }, { passive: true });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900 && burgerOpen) setBurger(false);
    }, { passive: true });

    paintNav();
    spy();
  }

  /* ---------------- download modal ---------------- */

  function initModal(hero) {
    var overlay = $('[data-modal]');
    if (!overlay) return;
    var panel = $('[data-modal-panel]', overlay);
    var closeT = null;
    var lastFocus = null;

    function onKey(e) {
      if (e.key === 'Escape') close();
    }

    function open() {
      lastFocus = document.activeElement;
      if (hero && hero.stopTyping) hero.stopTyping();
      clearTimeout(closeT);
      overlay.style.display = 'flex';
      requestAnimationFrame(function () {
        overlay.style.opacity = '1';
        if (panel) { panel.style.opacity = '1'; panel.style.transform = 'translateY(0) scale(1)'; }
      });
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
      var closeBtn = $('[data-close-modal]', overlay);
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      overlay.style.opacity = '0';
      if (panel) { panel.style.opacity = '0'; panel.style.transform = 'translateY(26px) scale(0.985)'; }
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      clearTimeout(closeT);
      closeT = setTimeout(function () { overlay.style.display = 'none'; }, 420);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    $$('[data-open-modal]').forEach(function (b) { b.addEventListener('click', open); });
    $$('[data-close-modal]', overlay).forEach(function (b) { b.addEventListener('click', close); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  }

  function init() {
    initReveals();
    var hero = initHero();
    initFaq();
    initNav();
    initModal(hero);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
