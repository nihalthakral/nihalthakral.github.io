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

/* ─── Profile Card — Auto-calculations ─────────────────────────────
   Birthdate     : 14 October 2007
   Comp Learning : 4th class (~2017) — 12th class at 18, so 4th = 8 yrs before = 2017
   App / SW Dev  : COVID-19 Lockdown March 2020
──────────────────────────────────────────────────────────────────── */
(function() {
  var now   = new Date();

  // ── Age ──────────────────────────────────────────────────────────
  var birth = new Date(2007, 9, 14); // 14 Oct 2007 (month index 9)
  var age   = now.getFullYear() - birth.getFullYear();
  if (now < new Date(now.getFullYear(), 9, 14)) age--;
  var elAge = document.getElementById('prof-age');
  if (elAge) elAge.textContent = age + ' years old';

  // ── Computer Learning (started 4th class ≈ 2017) ─────────────────
  var compStart = new Date(2017, 0, 1);
  var compYrs   = Math.floor((now - compStart) / (365.25 * 24 * 3600 * 1000));
  var elComp = document.getElementById('prof-comp');
  if (elComp) elComp.textContent = compYrs + '+ years';

  // ── App / Software Dev (COVID lockdown March 24, 2020) ───────────
  var appStart = new Date(2020, 2, 24);
  var appYrs   = Math.floor((now - appStart) / (365.25 * 24 * 3600 * 1000));
  var elApp = document.getElementById('prof-app');
  if (elApp) elApp.textContent = appYrs + '+ years';
})();

/* ─── Touch / Click Image Zoom ──────────────────────────────────────────────
   Har image par zoom-in karta hai EXCEPT me.png
──────────────────────────────────────────────────────────────────────────── */
(function () {
  var overlay  = document.getElementById('img-zoom-overlay');
  var bigImg   = document.getElementById('img-zoom-big');
  var closeBtn = document.getElementById('img-zoom-close');

  /* me.png ko zoom se bahar rakhna hai */
  function isExcluded(img) {
    var src = (img.getAttribute('src') || '').toLowerCase();
    return src === 'me.png' || src.endsWith('/me.png');
  }

  /* Sab images ko zoomable class do (except me.png) */
  function initZoom() {
    var imgs = document.querySelectorAll('img');
    imgs.forEach(function (img) {
      if (isExcluded(img)) return;
      img.classList.add('zoomable');
      img.addEventListener('click', openZoom);
    });
  }

  function openZoom(e) {
    var img = e.currentTarget;
    bigImg.src = img.src;
    bigImg.alt = img.alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeZoom() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    bigImg.src = '';
  }

  /* Close on overlay background click */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === closeBtn) closeZoom();
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeZoom();
  });

  /* Init after DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initZoom);
  } else {
    initZoom();
  }
})();
