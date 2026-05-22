'use strict';

const SECTIONS = [
  'hero',
  'sobre',
  'executivo',
  'creator',
  'servicos',
  'trajetoria',
  'temas',
  'midia',
  'redes',
  'contato',
  'footer'
];

async function loadSections() {
  const main = document.getElementById('page-content');
  if (!main) {
    initPage();
    loadInstagramEmbed();
    return;
  }

  // Se as seções já estão inline no HTML, apenas inicializa
  if (main.children.length > 0) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initPage();
        loadInstagramEmbed();
      });
    });
    return;
  }

  // Carregamento dinâmico (servidor HTTP)
  try {
    const htmlParts = await Promise.all(
      SECTIONS.map(name =>
        fetch(`sections/${name}.html`).then(r => {
          if (!r.ok) throw new Error(`Failed to load sections/${name}.html`);
          return r.text();
        })
      )
    );
    main.innerHTML = htmlParts.join('\n');
  } catch (err) {
    console.warn('Carregamento dinâmico falhou, tentando individualmente:', err);
    const parts = await Promise.all(
      SECTIONS.map(name =>
        fetch(`sections/${name}.html`)
          .then(r => r.ok ? r.text() : '')
          .catch(() => '')
      )
    );
    const combined = parts.join('\n');
    if (combined.trim()) {
      main.innerHTML = combined;
    }
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initPage();
      loadInstagramEmbed();
    });
  });
}

function loadInstagramEmbed() {
  if (window.instgrm) {
    window.instgrm.Widgets.load();
  } else {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.instagram.com/embed.js';
    document.body.appendChild(s);
  }
}

function initPage() {
  const toggle = document.getElementById('mode-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const body = document.body;
      body.dataset.mode = body.dataset.mode === 'ink' ? 'light' : 'ink';
    });
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.sec, .hero, .cta-block').forEach(el => {
    el.classList.add('appear');
    io.observe(el);
  });

  if (typeof window.initCarousels === 'function') {
    window.initCarousels();
  }
}

document.addEventListener('DOMContentLoaded', loadSections);
