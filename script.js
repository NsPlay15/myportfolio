// Initialisation de Particles.js
document.addEventListener('DOMContentLoaded', function() {
    // Animation du header au chargement
    setTimeout(() => {
        document.querySelector('.header-content').classList.add('visible');
    }, 500);
});

// Gestion du défilement smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Gestion de la navbar et des animations au scroll
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
let lastScroll = 0;

// Fonction pour vérifier si un élément est visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Gestion du scroll
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Gestion de la navbar
    if (currentScroll <100) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }

    // Animation des sections
    sections.forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('visible');
        }
    });

    lastScroll = currentScroll;
});