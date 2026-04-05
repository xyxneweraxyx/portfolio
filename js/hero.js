/**
 * hero.js — Section Hero
 * Gère la modale CV et le bouton Contact.
 */

// ── Modale CV ────────────────────────────────────────────────────────────────

const cvOverlay = document.getElementById('cvModalOverlay');
const cvClose   = document.getElementById('cvModalClose');
const btnCv     = document.getElementById('btnCv');

btnCv.addEventListener('click', () => {
  cvOverlay.classList.add('open');
});

cvClose.addEventListener('click', () => {
  cvOverlay.classList.remove('open');
});

cvOverlay.addEventListener('click', (e) => {
  if (e.target === cvOverlay) cvOverlay.classList.remove('open');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cvOverlay.classList.remove('open');
});

// ── Bouton Contact → scroll footer ──────────────────────────────────────────

const btnContact = document.getElementById('btnContact');
const scroller   = document.getElementById('scroller');
const footer     = document.getElementById('footer');

btnContact.addEventListener('click', () => {
  scroller.scrollTo({ top: footer.offsetTop, behavior: 'smooth' });
});
