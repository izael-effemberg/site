'use strict';

window.initCarousels = function () {

  /* --- Brand Partnerships Carousel --- */
  (function () {
    const track   = document.getElementById('bp-track');
    const dotsEl  = document.getElementById('bp-dots');
    const counter = document.getElementById('bp-counter');
    const btnPrev = document.getElementById('bp-prev');
    const btnNext = document.getElementById('bp-next');
    if (!track) return;

    const slides = Array.from(track.children);
    const total  = slides.length;
    const GAP    = 24;
    let current  = 0;

    function visibleCount() {
      if (window.innerWidth >= 1200) return 3;
      if (window.innerWidth >= 900)  return 2;
      return 1;
    }

    function maxIdx() { return Math.max(0, total - visibleCount()); }

    function buildDots() {
      dotsEl.innerHTML = '';
      for (let i = 0; i <= maxIdx(); i++) {
        const d = document.createElement('button');
        d.className = 'ig-dot' + (i === current ? ' active' : '');
        d.setAttribute('aria-label', 'Post ' + (i + 1));
        d.addEventListener('click', function () { goTo(i); });
        dotsEl.appendChild(d);
      }
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIdx()));
      const slideW = slides[0].offsetWidth;
      track.style.transform = 'translateX(-' + (current * (slideW + GAP)) + 'px)';
      dotsEl.querySelectorAll('.ig-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
      counter.textContent = (current + 1) + ' / ' + total;
      btnPrev.disabled = current === 0;
      btnNext.disabled = current >= maxIdx();
    }

    btnPrev.addEventListener('click', function () { goTo(current - 1); });
    btnNext.addEventListener('click', function () { goTo(current + 1); });

    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        buildDots();
        goTo(Math.min(current, maxIdx()));
      }, 120);
    });

    buildDots();
    goTo(0);
  }());

  /* --- Media Carousel --- */
  (function () {
    const track   = document.getElementById('media-track');
    const dotsEl  = document.getElementById('media-dots');
    const counter = document.getElementById('media-counter');
    const btnPrev = document.getElementById('media-prev');
    const btnNext = document.getElementById('media-next');
    if (!track) return;

    const pages = Array.from(track.children);
    const total = pages.length;
    let current = 0;

    function buildDots() {
      dotsEl.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const d = document.createElement('button');
        d.className = 'media-dot' + (i === current ? ' active' : '');
        d.setAttribute('aria-label', 'Página ' + (i + 1));
        d.addEventListener('click', function () { goTo(i); });
        dotsEl.appendChild(d);
      }
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, total - 1));
      track.style.transform = 'translateX(-' + (current * pages[0].offsetWidth) + 'px)';
      dotsEl.querySelectorAll('.media-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
      counter.textContent = (current + 1) + ' / ' + total;
      btnPrev.disabled = current === 0;
      btnNext.disabled = current >= total - 1;
    }

    btnPrev.addEventListener('click', function () { goTo(current - 1); });
    btnNext.addEventListener('click', function () { goTo(current + 1); });

    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { goTo(current); }, 120);
    });

    buildDots();
    goTo(0);
  }());

  /* --- Instagram Carousel --- */
  (function () {
    const track   = document.getElementById('ig-track');
    const dotsEl  = document.getElementById('ig-dots');
    const counter = document.getElementById('ig-counter');
    const btnPrev = document.getElementById('ig-prev');
    const btnNext = document.getElementById('ig-next');
    if (!track) return;

    const slides = Array.from(track.children);
    const total  = slides.length;
    const GAP    = 24;
    let current  = 0;

    function visibleCount() {
      if (window.innerWidth >= 1200) return 3;
      if (window.innerWidth >= 900)  return 2;
      return 1;
    }

    function maxIdx() { return Math.max(0, total - visibleCount()); }

    function buildDots() {
      dotsEl.innerHTML = '';
      const steps = maxIdx() + 1;
      for (let i = 0; i < steps; i++) {
        const d = document.createElement('button');
        d.className = 'ig-dot' + (i === current ? ' active' : '');
        d.setAttribute('aria-label', 'Post ' + (i + 1));
        d.addEventListener('click', function () { goTo(i); });
        dotsEl.appendChild(d);
      }
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIdx()));

      /* Pixel-based: measure actual slide width at runtime */
      const slideW = slides[0].offsetWidth;
      track.style.transform = 'translateX(-' + (current * (slideW + GAP)) + 'px)';

      dotsEl.querySelectorAll('.ig-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });

      counter.textContent = (current + 1) + ' / ' + total;
      btnPrev.disabled = current === 0;
      btnNext.disabled = current >= maxIdx();
    }

    btnPrev.addEventListener('click', function () { goTo(current - 1); });
    btnNext.addEventListener('click', function () { goTo(current + 1); });

    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        buildDots();
        goTo(Math.min(current, maxIdx()));
      }, 120);
    });

    buildDots();
    goTo(0);
  }());

  /* --- Media Content Carousel (mc) --- */
  (function () {
    var track    = document.getElementById('mc-track');
    var overflow = document.getElementById('mc-overflow');
    var dotsEl   = document.getElementById('mc-dots');
    var counter  = document.getElementById('mc-counter');
    var btnPrev  = document.getElementById('mc-prev');
    var btnNext  = document.getElementById('mc-next');
    if (!track || !overflow) return;

    var slides     = Array.from(track.querySelectorAll('.mc-slide'));
    var total      = slides.length;
    var current    = 0;
    var GAP        = 24;
    var resizeTimer;

    if (!total) return;

    function buildDots() {
      dotsEl.innerHTML = '';
      for (var i = 0; i < total; i++) {
        var d = document.createElement('button');
        d.className = 'mc-dot' + (i === current ? ' active' : '');
        d.setAttribute('aria-label', 'Item ' + (i + 1));
        (function (idx) { d.addEventListener('click', function () { goTo(idx); }); }(i));
        dotsEl.appendChild(d);
      }
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, total - 1));
      var slideW = slides[0].offsetWidth;
      track.style.transform = 'translateX(-' + (current * (slideW + GAP)) + 'px)';
      dotsEl.querySelectorAll('.mc-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
      if (counter) counter.textContent = (current + 1) + ' / ' + total;
      if (btnPrev) btnPrev.disabled = current === 0;
      if (btnNext) btnNext.disabled = current >= total - 1;
    }

    if (btnPrev) btnPrev.addEventListener('click', function () { goTo(current - 1); });
    if (btnNext) btnNext.addEventListener('click', function () { goTo(current + 1); });

    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { goTo(current); }, 120);
    });

    buildDots();
    goTo(0);
  }());

  /* --- Content Carousel --- */
  (function () {
    var track    = document.getElementById('cc-track');
    var overflow = document.getElementById('cc-overflow');
    var dotsEl   = document.getElementById('cc-dots');
    var counter  = document.getElementById('cc-counter');
    var btnPrev  = document.getElementById('cc-prev');
    var btnNext  = document.getElementById('cc-next');
    if (!track || !overflow) return;

    var slides     = Array.from(track.children);
    var total      = slides.length;
    var current    = 0;
    var resizeTimer;

    if (!total) return;

    function setSizes() {
      var w = overflow.offsetWidth;
      slides.forEach(function (s) { s.style.width = w + 'px'; });
    }

    function buildDots() {
      dotsEl.innerHTML = '';
      for (var i = 0; i < total; i++) {
        var d = document.createElement('button');
        d.className = 'cc-dot' + (i === current ? ' active' : '');
        d.setAttribute('aria-label', 'Conteúdo ' + (i + 1));
        (function (idx) { d.addEventListener('click', function () { goTo(idx); }); }(i));
        dotsEl.appendChild(d);
      }
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, total - 1));
      track.style.transform = 'translateX(-' + (current * overflow.offsetWidth) + 'px)';
      dotsEl.querySelectorAll('.cc-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
      if (counter) counter.textContent = (current + 1) + ' / ' + total;
      if (btnPrev) btnPrev.disabled = current === 0;
      if (btnNext) btnNext.disabled = current >= total - 1;
    }

    if (btnPrev) btnPrev.addEventListener('click', function () { goTo(current - 1); });
    if (btnNext) btnNext.addEventListener('click', function () { goTo(current + 1); });

    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { setSizes(); goTo(current); }, 120);
    });

    setSizes();
    buildDots();
    goTo(0);
  }());

  /* --- Audience Carousel --- */
  (function () {
    var tabs     = Array.from(document.querySelectorAll('.aud-tab'));
    var track    = document.getElementById('aud-track');
    var overflow = document.getElementById('aud-overflow');
    if (!track || !tabs.length || !overflow) return;

    var slides     = Array.from(track.children);
    var current    = 0;
    var heights    = [];
    var resizeTimer;

    function setSizes() {
      var w = overflow.offsetWidth;
      slides.forEach(function (s) { s.style.width = w + 'px'; });
      /* With align-items:flex-start each slide has its natural height — measure now */
      heights = slides.map(function (s) { return s.offsetHeight; });
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, tabs.length - 1));
      track.style.transform = 'translateX(-' + (current * overflow.offsetWidth) + 'px)';
      tabs.forEach(function (tab, i) { tab.classList.toggle('active', i === current); });
      if (heights[current]) overflow.style.height = heights[current] + 'px';
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { goTo(i); });
    });

    /* Touch swipe */
    var startX = 0;
    overflow.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    overflow.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 48) goTo(current + (dx < 0 ? 1 : -1));
    }, { passive: true });

    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { setSizes(); goTo(current); }, 120);
    });

    setSizes();
    /* Set initial height without transition, then enable for subsequent clicks */
    if (heights[0]) overflow.style.height = heights[0] + 'px';
    requestAnimationFrame(function () {
      overflow.style.transition = 'height 0.42s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    goTo(0);
  }());

};
