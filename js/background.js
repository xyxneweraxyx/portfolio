const PALETTE = [
  [99,179,237],[129,199,212],[154,205,180],
  [183,148,244],[190,227,248],[214,188,250],[154,230,200],
];

const DEPTH_GROUPS = [
  { sizeRange:[350,520], speedRange:[0.18,0.30], opacityRange:[0.10,0.16], count:10 },
  { sizeRange:[180,340], speedRange:[0.38,0.55], opacityRange:[0.13,0.20], count:12 },
  { sizeRange:[ 60,160], speedRange:[0.70,1.10], opacityRange:[0.15,0.22], count:12 },
];

function rand(a,b){ return a+Math.random()*(b-a); }
function randInt(a,b){ return Math.floor(rand(a,b)); }

const layer    = document.getElementById('bubblesLayer');
const scroller = document.getElementById('scroller');

const bubbles = DEPTH_GROUPS.flatMap(({sizeRange,speedRange,opacityRange,count}) =>
  Array.from({length:count}, () => {
    const size    = rand(...sizeRange);
    const speed   = rand(...speedRange);
    const opacity = rand(...opacityRange);
    const blur    = Math.round(size*0.14);
    const [r,g,b] = PALETTE[randInt(0,PALETTE.length)];
    const el = document.createElement('div');
    el.className = 'bubble';
    el.style.cssText = `
      width:${size}px; height:${size}px;
      left:${rand(-8,90)}%;
      top:${rand(-5,600)}%;
      background:radial-gradient(circle at 38% 38%, rgba(${r},${g},${b},${opacity.toFixed(2)}), transparent 68%);
      filter:blur(${blur}px);
    `;
    layer.appendChild(el);
    return {el, speed};
  })
);

let currentY=0, targetY=0;
scroller.addEventListener('scroll', ()=>{ targetY=scroller.scrollTop; }, {passive:true});

const sections = document.querySelectorAll('.section');
const navDots  = document.querySelectorAll('.nav-dot');

function updateNav(){
  const scrollY=scroller.scrollTop, winH=window.innerHeight;
  let activeIdx=0;
  sections.forEach((sec,i)=>{ if(sec.offsetTop <= scrollY+winH/2) activeIdx=i; });
  navDots.forEach((dot,i)=>{ dot.classList.toggle('active', i===activeIdx); });
}
scroller.addEventListener('scroll', updateNav, {passive:true});

(function animate(){
  currentY += (targetY-currentY)*0.10;
  bubbles.forEach(({el,speed})=>{ el.style.transform=`translateY(${-currentY*speed}px)`; });
  requestAnimationFrame(animate);
})();
