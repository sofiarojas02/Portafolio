const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
 
  // Toggle menu on hamburger click
  hamburger.onclick = function() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  };
 
  // Close menu when a link is clicked
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.onclick = function() {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    };
  });
 
  // Close menu when clicking outside
  document.onclick = function(event) {
    if (!event.target.closest('nav')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  };



  //Projects
  document.addEventListener('DOMContentLoaded', () => {
  const projectsGrid = document.querySelector('.projects-grid');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!projectsGrid) return;

  // Renderizar tarjetas
  projectsGrid.innerHTML = '';
  projects.forEach((project) => {
    const tagsHTML = project.tags
      .map((tag) => `<span class="tech-tag">${tag}</span>`)
      .join('');

    const card = document.createElement('div');
    card.className = 'project-card';

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

    const links = card.querySelectorAll('.project-link');
    links.forEach((link) => {
      link.addEventListener('click', (e) => e.stopPropagation());
    });

    projectsGrid.appendChild(card);
  });

  // Lógica del Carrusel Responsive
  let currentIndex = 0;

  function getVisibleCards() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }

  function updateCarousel() {
    const cards = document.querySelectorAll('.project-card');
    if (cards.length === 0) return;

    const visibleCards = getVisibleCards();
    const maxIndex = cards.length - visibleCards;

    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const containerWidth = document.querySelector('.projects-container').offsetWidth;
    const gap = 24; // 1.5rem de gap en CSS
    
    // Cálculo preciso del desplazamiento según el contenedor
    const cardWidth = (containerWidth - gap * (visibleCards - 1)) / visibleCards;
    const moveAmount = (cardWidth + gap) * currentIndex;

    projectsGrid.style.transform = `translateX(-${moveAmount}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

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

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
});