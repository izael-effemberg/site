'use strict';

const SECTIONS = [
  'hero',
  'sobre',
  'executivo',
  'midia',
  'redes',
  'servicos',
  'contato',
  'footer'
];

async function loadSections() {
  const main = document.getElementById('page-content');
  if (!main) return;

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
    console.error('Section loading failed:', err);
    return;
  }

  // Inicializar tudo após seções estarem no DOM
  initPage();

  // Re-processar embeds do Instagram se o script já tiver carregado
  if (window.instgrm) {
    window.instgrm.Widgets.load();
  }
}

function initPage() {
  // Dark mode toggle
  const toggle = document.getElementById('mode-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const body = document.body;
      body.dataset.mode = body.dataset.mode === 'ink' ? 'light' : 'ink';
    });
  }

  // Scroll reveal via IntersectionObserver
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.sec, .hero, .cta-block').forEach(el => {
    el.classList.add('appear');
    io.observe(el);
  });

  // Inicializar todos os carrosséis — chamar as funções de main.js
  if (typeof window.initCarousels === 'function') {
    window.initCarousels();
  }
}

document.addEventListener('DOMContentLoaded', loadSections);
