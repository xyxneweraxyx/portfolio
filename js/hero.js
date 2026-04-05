const cvOverlay  = document.getElementById('cvModalOverlay');
const cvClose    = document.getElementById('cvModalClose');
const btnCv      = document.getElementById('btnCv');
const btnContact = document.getElementById('btnContact');
const footer     = document.getElementById('footer');

btnCv.addEventListener('click', ()=> cvOverlay.classList.add('open'));
cvClose.addEventListener('click', ()=> cvOverlay.classList.remove('open'));
cvOverlay.addEventListener('click', (e)=>{ if(e.target===cvOverlay) cvOverlay.classList.remove('open'); });
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') cvOverlay.classList.remove('open'); });

btnContact.addEventListener('click', ()=>{
  document.getElementById('scroller').scrollTo({top: footer.offsetTop, behavior:'smooth'});
});
