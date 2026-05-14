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

  // Duplo rAF garante que o browser fez ao menos um layout pass
  // antes de medir offsetWidth nos carrosséis
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initPage();
      loadInstagramEmbed();
    });
  });
}

function loadInstagramEmbed() {
  if (window.instgrm) {
    // embed.js já carregou — re-processa os blockquotes recém inseridos
    window.instgrm.Widgets.load();
  } else {
    // embed.js ainda não carregou — injeta agora que as seções estão no DOM
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.instagram.com/embed.js';
    document.body.appendChild(s);
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
