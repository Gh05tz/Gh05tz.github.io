
const nav = document.getElementById('navbar');
const welcome = document.querySelector('.welcome');
window.onscroll = function() {
  
  if (window.scrollY > 950) {
    nav.classList.add('scrolled');
    welcome.style.visibility = "hidden";
  } else {
    nav.classList.remove('scrolled');

    welcome.style.visibility = "visible";
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
                span.style.color = ticks >= settle ? '' : '#C7F9CC;';
                if (ticks >= settle) clearInterval(iv);
                ticks++;
            }, 50);
        }, i * 40);
    });
}
scrambleText(document.getElementById('scramble-name'));

/*
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


*/
class Skill {
    constructor(skill, percent) {
        this.skill = skill;
        this.percent = percent;
    }
}

const skills = [
  // Programming Languages
  new Skill("Python", 90),
  new Skill("JavaScript", 70),
  new Skill("Java", 35),

  // Web Development
  new Skill("Frontend Development (HTML, CSS)", 64),
  new Skill("Responsive Web Design", 80),
  new Skill("UI/UX Design Fundamentals", 70),
  new Skill("DOM Manipulation", 75),
  new Skill("CSS Animations & Transitions", 75),

  // Programming Concepts
  new Skill("Object-Oriented Programming (OOP)", 65),
  new Skill("Algorithms & Problem Solving", 75),



  // Tools & Technologies
  new Skill("Git & GitHub", 85),
  new Skill("VS Code", 80),
  new Skill("Database Management", 60)
];

const skillContainer = document.getElementById('Skill-List');




function getSkillLevel(score) {

    if (score >= 85) return "Advanced";
    if (score >= 65) return "Proficient";
    if (score >= 40) return "Intermediate";
    if (score >= 25) return "Basic";
    return "Beginner";
}
skills.forEach(skill => {
    const skillDiv = document.createElement('div');
    skillDiv.innerHTML = `
    <li>
        <svg width="200" height="110" viewBox="0 0 200 110">
            <path d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none" stroke="#1a3a4a" stroke-width="12"/>
            <path d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none" stroke="#C7F9CC" stroke-width="12" stroke-linecap="round"
                  stroke-dasharray="251" stroke-dashoffset="251"/>
            <text x="100" y="90" text-anchor="middle" fill="#C7F9CC" font-size="24">
                ${getSkillLevel(skill.percent)}
            </text>
        </svg>
        <h5>${skill.skill}</h5>
    </li>`;
    skillContainer.appendChild(skillDiv);

    const path = skillDiv.querySelectorAll('path')[1];
    const offset = 251 - (251 * skill.percent / 100);
    path.style.transition = "stroke-dashoffset 1.5s ease";
    path.style.strokeDashoffset = offset;
});


const wrapper = document.querySelector('.accomplishment-wrapper');
const track = document.querySelector('.accomplishment-track');

window.addEventListener('scroll', () => {
    const rect = wrapper.getBoundingClientRect();

    const progress = -rect.top / (wrapper.offsetHeight - window.innerHeight);
    const clamped = Math.min(Math.max(progress, 0), 1);

    const cardWidth = track.children[0].offsetWidth;
    const centerOffset = (window.innerWidth / 2) - (cardWidth / 2);
    const scrollDistance = track.scrollWidth - window.innerWidth;

    track.style.transform = `translateX(${centerOffset - (clamped * (scrollDistance + centerOffset))}px)`;
});