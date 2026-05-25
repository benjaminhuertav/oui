/* ============================================================
   PROJECT DATA
   To add images: place files in images/<project-folder>/
   and update the coverImage / gallery paths below.
   ============================================================ */
const PROJECTS = [
  {
    title:       'Marine Serre',
    client:      'Marine Serre',
    role:        'Art Direction — Creative Campaign & Social Media',
    year:        '2023',
    type:        'Art Direction',
    description: 'Creative campaign and social media direction for Marine Serre’s 2023 collection. Development of the visual language across digital platforms and editorial touchpoints, reinforcing the house’s upcycled-luxury aesthetic.',
    coverImage:  null, /* 'images/marine-serre-2023/cover.jpg' */
    gallery:     [null, null, null]
  },
  {
    title:       'Marine Serre',
    client:      'Marine Serre',
    role:        'Graphic Designer — Branding & Motion',
    year:        '2024',
    type:        'Branding & Motion',
    description: 'Branding evolution and motion design for Marine Serre’s 2024 visual identity. Extension of the house aesthetic into dynamic formats, from key visual treatments to animated brand assets.',
    coverImage:  null, /* 'images/marine-serre-2024/cover.jpg' */
    gallery:     [null, null, null]
  },
  {
    title:       'Yves Saint-Laurent',
    client:      'YSL Beauty',
    role:        'Graphic Designer',
    year:        '2023',
    type:        'Graphic Design',
    description: 'Graphic design for Yves Saint-Laurent, maintaining the house’s iconic visual standards across campaign materials and brand communications.',
    coverImage:  null, /* 'images/ysl-2023/cover.jpg' */
    gallery:     [null, null]
  },
  {
    title:       'Mouty',
    client:      'Mouty',
    role:        'Art Director & Content Creator',
    year:        '2024',
    type:        'Art Direction',
    description: 'Full art direction and content creation for Mouty. From initial concept and casting to on-set direction and post-production — building a cohesive visual universe for the emerging French menswear label.',
    coverImage:  'images/mouty/mouty-1.jpg',
    gallery:     [
      'images/mouty/mouty-1.jpg',
      'images/mouty/mouty-2.jpg',
      'images/mouty/mouty-3.jpg',
      'images/mouty/mouty-4.jpg',
      'images/mouty/mouty-5.jpg'
    ]
  },
  {
    title:       'Glacier Optics',
    client:      'Glacier Optics',
    role:        'Art Director & Graphic Designer',
    year:        '2025',
    type:        'Art Direction',
    description: 'Art direction and graphic design for Glacier Optics, creating a distinctive visual identity rooted in Alpine clarity and precision optical craftsmanship.',
    coverImage:  null, /* 'images/glacier-optics/cover.jpg' */
    gallery:     [null, null, null]
  },
  {
    title:       'Bon Esprit / Mint & Trax',
    client:      'Bon Esprit / Mint & Trax Magazine',
    role:        'Art Direction Assistant',
    year:        '2022',
    type:        'Editorial',
    description: 'Art direction assistance for Bon Esprit and Mint & Trax Magazine. Supporting the creative vision across editorial layouts, cover concepts, and visual storytelling.',
    coverImage:  null, /* 'images/bon-esprit/cover.jpg' */
    gallery:     [null, null]
  },
  {
    title:       'BVLGARI',
    client:      'BVLGARI',
    role:        'Integrated PR & Influence Campaign',
    year:        '2024',
    type:        'Campaign Strategy',
    description: 'Master’s thesis project developing an integrated PR and influence strategy for BVLGARI. Exploring the convergence of heritage luxury brand codes and contemporary influence architecture within a global campaign framework.',
    coverImage:  null, /* 'images/bvlgari/cover.jpg' */
    gallery:     [null, null, null]
  }
];

/* ============================================================
   CURSOR
   ============================================================ */
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

/* ============================================================
   NAVIGATION — scroll state
   ============================================================ */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 48);
}, { passive: true });

/* ============================================================
   RENDER PROJECT CARDS
   ============================================================ */
function cardImage(src, title) {
  if (src) {
    return `<img
      src="${src}"
      alt="${title}"
      loading="lazy"
      onerror="this.parentElement.classList.add('img-error')"
    >`;
  }
  return `<div class="ph-fill"><span class="ph-label">${title}</span></div>`;
}

function renderCards() {
  const grid = document.getElementById('projectsGrid');

  grid.innerHTML = PROJECTS.map((p, i) => `
    <article
      class="project-card reveal"
      data-idx="${i}"
      tabindex="0"
      role="button"
      aria-label="Open project: ${p.title}, ${p.year}"
      style="transition-delay:${i * 55}ms"
    >
      <div class="project-thumb">
        ${cardImage(p.coverImage, p.title)}
        <div class="project-overlay">
          <span class="project-overlay-type">${p.type}</span>
        </div>
      </div>
      <div class="project-foot">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-byline">${p.client}&ensp;&mdash;&ensp;${p.year}</p>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click',   () => openModal(+card.dataset.idx));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(+card.dataset.idx);
      }
    });
  });
}

/* ============================================================
   MODAL
   ============================================================ */
const modal        = document.getElementById('modal');
const modalBg      = document.getElementById('modalBg');
const modalClose   = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');
let   lastFocused  = null;

function galleryItem(src, title, idx) {
  const inner = src
    ? `<img src="${src}" alt="${title} — image ${idx + 1}" loading="lazy">`
    : `<div class="gallery-ph">Image ${idx + 1}</div>`;
  return `<div class="gallery-item">${inner}</div>`;
}

function openModal(idx) {
  const p = PROJECTS[idx];
  lastFocused = document.activeElement;

  modalContent.innerHTML = `
    <div class="modal-header">
      <h2 class="modal-project-title" id="modalTitle">${p.title}</h2>
      <div class="modal-tags">
        <span class="modal-tag"><strong>Client</strong>&ensp;${p.client}</span>
        <span class="modal-tag"><strong>Role</strong>&ensp;${p.role}</span>
        <span class="modal-tag"><strong>Year</strong>&ensp;${p.year}</span>
      </div>
    </div>
    <div class="modal-rule"></div>
    <div class="modal-gallery">
      ${p.gallery.map((src, i) => galleryItem(src, p.title, i)).join('')}
    </div>
    <p class="modal-desc">${p.description}</p>
  `;

  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

modalClose.addEventListener('click', closeModal);
modalBg.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

/* ============================================================
   INTERSECTION OBSERVER — scroll reveal
   ============================================================ */
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('in-view');
    io.unobserve(el);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderCards();

  /* observe project cards (rendered above) */
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* observe static about / contact elements */
  const staggerTargets = [
    '.bio',
    '.info-block',
    '.contact-heading',
    '.contact-links'
  ];
  staggerTargets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 60}ms`;
      io.observe(el);
    });
  });
});
