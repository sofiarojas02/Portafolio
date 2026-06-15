const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
navbar.classList.toggle('scrolled', window.scrollY > 10);
});

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
});
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));