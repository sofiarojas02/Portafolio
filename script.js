// ===== NAVBAR AL HACER SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// ===== SVGs reutilizados en cada tarjeta de proyecto =====
const demoIconSvg = `<svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

const codeIconSvg = `<svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`;

// ===== Construye una tarjeta de proyecto a partir de un objeto =====
function createProjectCard(project, index) {
  const card = document.createElement('div');
  card.className = 'project-card reveal' + (index > 0 ? ' reveal-d' + Math.min(index, 3) : '');
  card.addEventListener('click', () => window.open(project.demoUrl, '_blank'));

  card.innerHTML = `
    <div class="project-thumb">${project.emoji}</div>
    <div class="project-info">
      <p class="project-type">${project.type}</p>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="card_info--details">
        <h6>${project.techTitle}</h6>
        <ul>
          ${project.techInfo.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div class="project-tags">
        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
      </div>
      <div class="project-links">
        <a href="${project.demoUrl}" target="_blank" class="project-link">
          ${demoIconSvg}
          Demo en vivo
        </a>
        <a href="${project.codeUrl}" target="_blank" class="project-link">
          ${codeIconSvg}
          Código
        </a>
      </div>
    </div>
  `;

  // Evita que el clic en los links dispare también el onclick de la tarjeta
  card.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => e.stopPropagation());
  });

  return card;
}

// ===== Pinta todos los proyectos dentro de #projectsGrid =====
function renderProjects(projectList) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  projectList.forEach((project, index) => {
    grid.appendChild(createProjectCard(project, index));
  });
}

renderProjects(projects); // 'projects' viene de projects-data.js

// ===== Pinta las categorías de habilidades =====
function renderSkillCategories(categories) {
  const container = document.getElementById('skillsCategories');
  container.innerHTML = '';

  categories.forEach((category, index) => {
    const catDiv = document.createElement('div');
    catDiv.className = 'skills-category reveal' + (index > 0 ? ' reveal-d' + Math.min(index, 3) : '');

    catDiv.innerHTML = `
      <p class="skills-cat-title">${category.title}</p>
      <div class="skills-chips">
        ${category.chips.map(chip => `<div class="skill-chip">${chip.icon} ${chip.label}</div>`).join('')}
      </div>
    `;

    container.appendChild(catDiv);
  });
}

// ===== Pinta los estudios =====
function renderEducation(items) {
  const container = document.getElementById('educationList');
  container.innerHTML = items.map(item => `
    <div class="cert-item" style="margin-bottom: 25px;">
      <div class="cert-icon">${item.icon}</div>
      <div class="cert-info">
        <strong>${item.title}</strong>
        <span>${item.subtitle} · ${item.period}</span>
      </div>
    </div>
  `).join('');
}

// ===== Pinta las certificaciones, agrupadas por plataforma =====
function renderCertifications(groups) {
    const container = document.getElementById('certificationsList');
    container.innerHTML = groups.map(group => `
    ${group.items.map(item => `
      <div class="cert-item">
        <div class="cert-icon">${item.icon}</div>
        <div class="cert-info">
          <strong>${item.title} </strong>
          <span>${item.subtitle} · ${item.period}</span>
        </div>
      </div>
    `).join('')}
  `).join('');
}

renderSkillCategories(skillCategories); // viene de skills-data.js
renderEducation(educationItems);        // viene de skills-data.js
renderCertifications(certificationGroups); // viene de skills-data.js

// ===== ANIMACIÓN DE REVEAL AL HACER SCROLL =====
// Importante: esto va DESPUÉS de renderProjects(), para que también
// observe las tarjetas que se acaban de crear dinámicamente.
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));