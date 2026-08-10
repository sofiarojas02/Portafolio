const skillCategories = [
  {
    title: 'Frontend',
    chips: [
      { icon: '⚛️', label: 'React.js' },
      { icon: '🟨', label: 'JavaScript ES6+' },
      { icon: '🌐', label: 'HTML5' },
      { icon: '🎨', label: 'CSS3' },
      { icon: '🎨', label: 'Bootstrap' },
      { icon: '📦', label: 'Redux' }
    ]
  },
  {
    title: 'Herramientas',
    chips: [
      { icon: '🔀', label: 'Git & GitHub' },
      { icon: '⚡', label: 'Axios' },
      { icon: '🧪', label: 'npm' },
      { icon: '💻', label: 'VS Code' }
    ]
  },
  {
    title: 'Metodologías',
    chips: [
      { icon: '📱', label: 'Responsive Design' },
      { icon: '♿', label: 'Accesibilidad' },
      { icon: '🔧', label: 'Clean Code' }
    ]
  }

  // Ejemplo de categoría nueva:
  // {
  //   title: 'Backend',
  //   chips: [
  //     { icon: '🟢', label: 'Node.js' },
  //     { icon: '🐘', label: 'PostgreSQL' }
  //   ]
  // }
];

const educationItems = [
  { icon: '🎓', title: 'TSU en Informática', subtitle: 'UPTM — Venezuela', period:'2026' }

  // Ejemplo de estudio nuevo:
  // { icon: '🎓', title: 'Ingeniería en Informática', subtitle: 'Universidad X — Venezuela' }
];

const certificationGroups = [
  {
    provider: 'Platzi',
    items: [
      { icon: '🖥️', title: 'Frontend Development', subtitle: 'Platzi — Certificación profesional', period: 2025},
      { icon: '⚛️', title: 'React.js ', subtitle: 'Platzi — Desarrollo frontend', period: '2026',},
      { icon: '🗃️', title: 'State Management en React', subtitle: 'Platzi — Gestión de estado profesional', period: '2026', },
      { icon: '🗂️', title: 'Curso de API REST con Javascript', subtitle: 'Platzi — Ejemplos con APIs reales',period: '2026',},
      { icon: '🔐', title: 'Typescript', subtitle: 'Platzi —TiposAvanzados y Funciones',period: '2026',}
    ]
  }

  // Ejemplo de grupo de certificaciones nuevo (por ejemplo, de otra plataforma):
  // {
  //   provider: 'freeCodeCamp',
  //   items: [
  //     { icon: '🏅', title: 'Responsive Web Design', subtitle: 'freeCodeCamp — Certificación', period: '2025' }
  //   ]
  // }
];
