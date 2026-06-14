/* ─── Auto-scale: fit plan-pre text to container width ──────────────────────
   FIX: fitPre now iterates ALL .plan-pre / .business-area pairs (not just first)
   FIX: floor raised from 7px to 11px — text stays readable, area stays scrollable
─────────────────────────────────────────────────────────────────────────── */
(function () {
  /* ── fitPre — FIX: handle every section, not just the first ── */
  function fitPre() {
    var pres  = document.querySelectorAll('.plan-pre');
    var areas = document.querySelectorAll('.business-area');

    pres.forEach(function (pre, i) {
      var area = areas[i];
      if (!pre || !area) return;

      pre.style.fontSize = '16px';
      void pre.offsetWidth; /* force reflow */

      var cs    = window.getComputedStyle(area);
      var avail = area.clientWidth
                  - parseFloat(cs.paddingLeft  || '0')
                  - parseFloat(cs.paddingRight || '0');
      var natW  = pre.scrollWidth;

      if (natW > 0 && avail > 0) {
        /* FIX: floor raised to 11px — unreadable text is worse than scrolling */
        var scaled = 16 * (avail / natW);
        pre.style.fontSize = (scaled >= 11 ? scaled : 11) + 'px';
        /* If even 11px is too wide, business-area's overflow-x:auto takes over */
      }
    });
  }

  function fitAll() { fitPre(); }

  /* Run once DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fitAll);
  } else {
    fitAll();
  }

  /* Re-run after Google Fonts load */
  var fontsReady = (document.fonts && document.fonts.ready)
    ? document.fonts.ready
    : Promise.resolve();
  fontsReady.then(fitAll);

  /* Debounced resize / orientation handler */
  var _resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(fitAll, 60);
  });
  window.addEventListener('orientationchange', function () {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(fitAll, 120);
  });
})();

/* ─── Scroll-reveal ── */
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  els.forEach(function (el) { observer.observe(el); });
})();

