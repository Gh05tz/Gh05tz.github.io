
const nav = document.getElementById('navbar');

window.onscroll = function() {
  
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';

function scrambleText(el) {
    const original = el.textContent.split('');
    el.textContent = '';

    const spans = original.map(ch => {
        const s = document.createElement('span');
        s.className = 'char';
        s.textContent = ch;
        el.appendChild(s);
        return s;
    });

    spans.forEach((span, i) => {
        if (span.textContent === ' ') return;
        let ticks = 0;
        const target = original[i];
        const settle = 8 + Math.floor(Math.random() * 6);

        setTimeout(() => {
            const iv = setInterval(() => {
                span.textContent = ticks >= settle
                    ? target
                    : CHARS[Math.floor(Math.random() * CHARS.length)];
                span.style.color = ticks >= settle ? '' : '#000000';
                if (ticks >= settle) clearInterval(iv);
                ticks++;
            }, 50);
        }, i * 40);
    });
}
scrambleText(document.getElementById('scramble-name'));


let width = window.innerWidth;
let height = window.innerHeight;

const circleClass =  document.querySelector(".balls");
circle = document.querySelector(".balls")
circleClass.addEventListener('click', (event) => {
  
  circle.classList.add('clicked');

  if (!circle.style.top) {
    circle.style.top = "0px";
  }

});

let circleHold = false;
circleClass.addEventListener('mousedown', (event) => {
    
    const isHovered = circle.matches(':hover');
    if(isHovered){
        circleHold = true;
    }
    
});
let mx = 0
let my = 0
document.addEventListener('mousemove', (event) => {

  mx = event.clientX;
  my = event.clientY;

});
circleClass.addEventListener('mouseup',(event) =>{
    circleHold = false
});

function isAtBottom(element) {
  
  const  rect = element.getBoundingClientRect();
  return rect.bottom >= (window.innerHeight || document.documentElement.clientHeight);
}
let vx = 0;

function animateCircle() {
    let circleTop = parseInt(circle.style.top) || 0;
    const rect = circle.getBoundingClientRect();
    if(circleHold){
        vx = 0;
        circleTop = (my-50);
        circle.style.top = circleTop+"px";
        circle.style.left = (mx-50) + "px";
    }else{
        vx = Math.abs(vx) <= 0.5 ? 0 : vx;
        if (circle.classList.contains('clicked')) {
            
            vx += 1;
            circleTop += vx;
            
            const bottom = window.innerHeight;
            if (rect.bottom >= bottom && vx > 0) {
                circleTop = bottom - rect.height;
                vx = -Math.abs(vx) * 0.5;
                if (Math.abs(vx) < 1) {
                    vx = 0;
                }
            }
            circle.style.top = circleTop + "px";

    }}

    requestAnimationFrame(animateCircle);
}

requestAnimationFrame(animateCircle);

window.addEventListener('scroll', () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const percentage = (scrolled / scrollableHeight) * 100;

  console.log(`Scroll Percentage: ${Math.round(percentage)}%`);
});


