/**
 * timeline.js
 * - Courbes de Bézier entre nodes (passe derrière les titres de catégorie)
 * - Modale dynamique
 */

// ── Courbes ──────────────────────────────────────────────────────────────────

function drawCurves() {
  const svg    = document.getElementById('timelineSvg');
  const nodes  = document.querySelectorAll('.tl-node');
  const inner  = document.getElementById('timelineInner');
  if (!svg || nodes.length < 2) return;

  svg.innerHTML = '';

  const innerRect = inner.getBoundingClientRect();
  const scrollEl  = document.getElementById('scroller');
  const scrollTop = scrollEl.scrollTop;

  for (let i = 0; i < nodes.length - 1; i++) {
    const thumbA = nodes[i].querySelector('.tl-thumb');
    const thumbB = nodes[i + 1].querySelector('.tl-thumb');
    const rA = thumbA.getBoundingClientRect();
    const rB = thumbB.getBoundingClientRect();

    // Centre bas de A, centre haut de B — en coordonnées relatives à inner
    const x1 = rA.left + rA.width  / 2 - innerRect.left;
    const y1 = rA.bottom + scrollTop   - (innerRect.top + scrollTop);
    const x2 = rB.left + rB.width  / 2 - innerRect.left;
    const y2 = rB.top  + scrollTop     - (innerRect.top + scrollTop);

    const dy = Math.abs(y2 - y1);
    const tension = dy * 0.5;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'timeline-curve');
    path.setAttribute('d',
      `M${x1},${y1} C${x1},${y1 + tension} ${x2},${y2 - tension} ${x2},${y2}`
    );
    svg.appendChild(path);
  }
}

window.addEventListener('resize', drawCurves);
setTimeout(drawCurves, 150);

// ── Modale ───────────────────────────────────────────────────────────────────

const tlOverlay = document.getElementById('tlModalOverlay');
const tlClose   = document.getElementById('tlModalClose');

function openTlModal(index) {
  const node   = document.querySelectorAll('.tl-node')[index];
  const title  = node.dataset.title;
  const date   = node.dataset.date;
  const desc   = node.dataset.desc;
  const skills = node.dataset.skills.split(',').filter(Boolean);
  const links  = node.dataset.links ? node.dataset.links.split('|').filter(Boolean) : [];

  document.getElementById('tlModalTitle').textContent = title;
  document.getElementById('tlModalDate').textContent  = date;
  document.getElementById('tlModalText').textContent  = desc;

  // Tags
  document.getElementById('tlModalTags').innerHTML =
    skills.map(s => `<span class="tl-modal-tag">${s.trim()}</span>`).join('');

  // Liens
  const linksEl = document.getElementById('tlModalLinks');
  if (links.length) {
    linksEl.innerHTML = links.map(l => {
      const [label, url] = l.split('::');
      return `<a href="${url}" target="_blank" class="tl-modal-link">↗ ${label.trim()}</a>`;
    }).join('');
  } else {
    linksEl.innerHTML = '<span class="tl-modal-no-links">No links available</span>';
  }

  tlOverlay.classList.add('open');
}

tlClose.addEventListener('click',  () => tlOverlay.classList.remove('open'));
tlOverlay.addEventListener('click', (e) => { if (e.target === tlOverlay) tlOverlay.classList.remove('open'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') tlOverlay.classList.remove('open'); });
