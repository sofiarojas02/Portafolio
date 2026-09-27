document.addEventListener('DOMContentLoaded', () => {
  const projectsGrid = document.querySelector('.projects-grid');
  const projectsContainer = document.querySelector('.projects-container');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!projectsGrid || !projectsContainer) return;

  projectsGrid.innerHTML = '';

  // Renderizar tarjetas
  projects.forEach((project) => {
    const tagsHTML = project.tags
      .map((tag) => `<span class="tech-tag">${tag}</span>`)
      .join('');

    const card = document.createElement('div');
    card.className = 'project-card';

    // Hacer que toda la tarjeta reaccione al clic hacia la demo del proyecto
    card.addEventListener('click', () => {
      window.open(project.demoUrl, '_blank');
    });

    card.innerHTML = `
      <div class="project-emoji">${project.emoji}</div>
      <div class="project-info">
        <p class="project-type">${project.type}</p>
        <h3>${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          <h5>Tecnologías</h5>
          <div class="tech-list">${tagsHTML}</div>
        </div>
        <div class="project-links">
          <a href="${project.demoUrl}" target="_blank" class="project-link demo-link">Ver Demo</a>
          <a href="${project.codeUrl}" target="_blank" class="project-link code-link">Código</a>
        </div>
      </div>
    `;

    // Evitar que el clic en los botones inferiores dispare el clic general de la tarjeta
    const links = card.querySelectorAll('.project-link');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });

    projectsGrid.appendChild(card);
  });

  // ==================== VARIABLES DEL CARRUSEL ====================
  let currentIndex = 0;
  let isMobile = window.innerWidth <= 768;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  // ==================== FUNCIONES HELPER ====================
  function getVisibleCards() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function isMobileView() {
    return window.innerWidth <= 768;
  }

  // ==================== ACTUALIZAR CARRUSEL ====================
  function updateCarousel() {
    const cards = document.querySelectorAll('.project-card');
    if (cards.length === 0) return;

    isMobile = isMobileView();

    if (isMobile) {
      // En móvil, usar scroll nativo (no transform)
      projectsContainer.scrollLeft = 0;
      // Los botones están ocultos en móvil
    } else {
      // En desktop, usar transform
      const visibleCards = getVisibleCards();
      const maxIndex = Math.max(0, cards.length - visibleCards);

      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      const gap = 24;
      const cardWidth = cards[0].getBoundingClientRect().width;
      const moveAmount = (cardWidth + gap) * currentIndex;

      projectsGrid.style.transform = `translateX(-${moveAmount}px)`;

      // Actualizar estado de botones
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
    }
  }

  // ==================== LÓGICA DEL CARRUSEL EN DESKTOP ====================
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      const visibleCards = getVisibleCards();
      if (currentIndex < projects.length - visibleCards) {
        currentIndex++;
        updateCarousel();
      }
    });
  }

  // ==================== SOPORTE TÁCTIL (SWIPE) PARA MÓVIL ====================
  let touchStartX = 0;
  let touchEndX = 0;

  projectsContainer.addEventListener(
    'touchstart',
    (e) => {
      if (isMobileView()) {
        touchStartX = e.changedTouches[0].screenX;
      }
    },
    false
  );

  projectsContainer.addEventListener(
    'touchend',
    (e) => {
      if (isMobileView()) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }
    },
    false
  );

  function handleSwipe() {
    const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe izquierda - siguiente
        scrollToNextCard();
      } else {
        // Swipe derecha - anterior
        scrollToPrevCard();
      }
    }
  }

  function scrollToPrevCard() {
    const cards = document.querySelectorAll('.project-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 16; // gap en móvil
    const scrollAmount = cardWidth + gap;
    const currentScroll = projectsContainer.scrollLeft;

    if (currentScroll > 0) {
      projectsContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  }

  function scrollToNextCard() {
    const cards = document.querySelectorAll('.project-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 16;
    const scrollAmount = cardWidth + gap;
    const maxScroll =
      projectsGrid.offsetWidth - projectsContainer.offsetWidth;
    const currentScroll = projectsContainer.scrollLeft;

    if (currentScroll < maxScroll) {
      projectsContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  }

  // ==================== ACTUALIZAR AL CAMBIAR TAMAÑO ====================
  window.addEventListener('resize', () => {
    currentIndex = 0;
    updateCarousel();
  });

  // Inicializar carrusel
  updateCarousel();
});