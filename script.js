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

class Skill {
    constructor(skill, percent) {
        this.skill = skill;
        this.percent = percent;
    }
}

const skills = [
 
  new Skill("Python", 90),
  new Skill("JavaScript", 70),
  new Skill("Java", 35),

  new Skill("Frontend Development (HTML, CSS)", 64),
  new Skill("Responsive Web Design", 80),
  new Skill("UI/UX Design Fundamentals", 70),
  new Skill("DOM Manipulation", 75),
  new Skill("CSS Animations & Transitions", 75),

  new Skill("Object-Oriented Programming (OOP)", 65),
  new Skill("Algorithms & Problem Solving", 75),

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
    if (window.innerWidth <= 600) return; 

    const rect = wrapper.getBoundingClientRect();

    const progress = -rect.top / (wrapper.offsetHeight - window.innerHeight);
    const clamped = Math.min(Math.max(progress, 0), 1);

    const cardWidth = track.children[0].offsetWidth;
    const centerOffset = (window.innerWidth / 2) - (cardWidth / 2);
    const scrollDistance = track.scrollWidth - window.innerWidth;

    track.style.transform = `translateX(${centerOffset - (clamped * (scrollDistance + centerOffset))}px)`;
});

window.addEventListener('resize', () => {
    if (window.innerWidth <= 600) {
        track.style.transform = 'none';
    }
});


const bgfill = document.getElementById('bgfill');
const projectsSection = document.getElementById('projects');
const projects = document.querySelectorAll('.project');
let current_color = "red";
const projectColors = [
'#ffffff',
  '#ffffff',
  ' #ffffff',
  
];

function getColor(i) {
  return projectColors[i % projectColors.length];
}
const sectionObserver = new IntersectionObserver(
  ([entry]) => {
    bgfill.style.opacity = entry.isIntersecting ? '1' : '0';
  },
  { threshold: 0.01 }
);
sectionObserver.observe(projectsSection);
window.addEventListener('scroll', () => {
    const mid = window.innerHeight / 1.5;
    let closestIndex = 0;
    let closestDist = Infinity;

    projects.forEach((p, i) => {
        const rect = p.getBoundingClientRect();
        const pMid = rect.top + rect.height / 2;
        const dist = Math.abs(pMid - mid);
        if (dist < closestDist) {
            closestDist = dist;
            closestIndex = i;
        }
    });

    const lastProject = projects[projects.length - 1];
    const lastRect = lastProject.getBoundingClientRect();

    if (lastRect.bottom < 0) {
        bgfill.style.backgroundColor = 'white';
    } else {
        bgfill.style.backgroundColor = getColor(closestIndex);
    }
});

bgfill.style.backgroundColor = getColor(0);
bgfill.style.opacity = '0';



const roles = ["Algorithms", "Web Design", "Game Development", "Artist"];

const cycleRoles = () => {
    const el = document.getElementById("role-tag");
    let index = 0;

    const setRole = () => {
        el.classList.remove("visible");

        setTimeout(() => {
            el.textContent = `<${roles[index]}>`;
            el.classList.add("visible");
            index = (index + 1) % roles.length;
        }, 400);
    };

    setRole();
    setInterval(setRole, 2500);
};

cycleRoles();


const terminalLines = [
    { text: "whoami",                           type: "cmd"   },
    { text: "Keegan Jones  //  Gh05tz",         type: "val"   },
    { text: "",                                  type: "gap"   },
    { text: "cat skills.txt",                   type: "cmd"   },
    { text: "Python · JavaScript · Java",       type: "val"   },
    { text: "HTML · CSS · Pygame",              type: "val"   },
    { text: "",                                  type: "gap"   },
    { text: "cat passions.txt",                 type: "cmd"   },
    { text: "Game Dev · Web Design · Pixel Art",type: "val"   },
    { text: "",                                  type: "gap"   },
    { text: "status --check",                   type: "cmd"   },
    { text: "Available for work",            type: "val"   },
];

const runTerminal = () => {
    const body = document.getElementById("terminal-body");
    let i = 0;

    const cursor = document.createElement("span");
    cursor.className = "t-cursor";

    const typeLine = () => {
        if (i >= terminalLines.length) {
            body.appendChild(cursor);
            return;
        }

        const { text, type } = terminalLines[i++];
        const line = document.createElement("div");
        line.className = "t-line";

        if (type === "gap") {
            body.appendChild(line);
            setTimeout(typeLine, 200);
            return;
        }

        const prefix = type === "cmd"
            ? `<span class="t-key">❯ </span><span class="t-cmd">`
            : `<span class="t-muted">  </span><span class="t-val">`;

        let charIndex = 0;
        line.innerHTML = prefix + "</span>";
        body.appendChild(line);

        const span = line.querySelector(type === "cmd" ? ".t-cmd" : ".t-val");

        const typeChar = () => {
            if (charIndex < text.length) {
                span.textContent += text[charIndex++];
                body.scrollTop = body.scrollHeight;
                setTimeout(typeChar, 35);
            } else {
                setTimeout(typeLine, type === "cmd" ? 400 : 150);
            }
        };

        typeChar();
    };

    typeLine();
};

runTerminal();