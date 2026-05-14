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

};
