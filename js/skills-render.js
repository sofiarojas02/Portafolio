document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderEducation();
  renderCertifications();
});

function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container || typeof skillCategories === 'undefined') return;

  // Añadir título principal antes de las categorías
  container.innerHTML = `<h3>Habilidades</h3>` + skillCategories.map(category => `
    <div class="skill-category">
      <span class="category-label">${category.title.toUpperCase()}</span>
      <div class="skill-chips">
        ${category.chips.map(chip => `
          <span class="chip">${chip.icon}${chip.label}</span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderEducation() {
  const container = document.getElementById('education-container');
  if (!container || typeof educationItems === 'undefined') return;

  container.innerHTML = educationItems.map(item => `
    <div class="edu-item">
      <div class="edu-icon">${item.icon}</div>
      <div class="edu-details">
        <h4>${item.title}</h4>
        <p>${item.subtitle} · ${item.period}</p>
      </div>
    </div>
  `).join('');
}

function renderCertifications() {
  const container = document.getElementById('certifications-container');
  if (!container || typeof certificationGroups === 'undefined') return;

  // Renderiza todas las certificaciones recorriendo los grupos de proveedores
  container.innerHTML = certificationGroups.map(group => 
    group.items.map(cert => `
      <div class="edu-item">
        <div class="edu-icon">${cert.icon}</div>
        <div class="edu-details">
          <h4>${cert.title}</h4>
          <p>${cert.subtitle} · ${cert.period}</p>
        </div>
      </div>
    `).join('')
  ).join('');
}