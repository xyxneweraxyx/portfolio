/**
 * animations.js
 * Fade-in from bottom au scroll pour Skills et Timeline.
 * Utilise IntersectionObserver — zéro impact sur les performances.
 */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Une seule fois suffit
    }
  });
}, {
  root: document.getElementById('scroller'),
  threshold: 0.15,
});

// Skills — les cartes apparaissent en cascade
document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.classList.add('fade-up');
  card.style.transitionDelay = `${i * 60}ms`;
  observer.observe(card);
});

// Skills — le titre
const skillsTitle = document.querySelector('.skills-title');
if (skillsTitle) {
  skillsTitle.classList.add('fade-up');
  observer.observe(skillsTitle);
}

// Timeline — chaque node
document.querySelectorAll('.tl-node').forEach((node, i) => {
  node.classList.add('fade-up');
  node.style.transitionDelay = `${i * 80}ms`;
  observer.observe(node);
});

// Timeline — les titres de catégorie
document.querySelectorAll('.tl-category').forEach(cat => {
  cat.classList.add('fade-up');
  observer.observe(cat);
});

// Timeline — le titre principal
const tlHeading = document.querySelector('#timeline h2');
if (tlHeading) {
  tlHeading.classList.add('fade-up');
  observer.observe(tlHeading);
}
