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