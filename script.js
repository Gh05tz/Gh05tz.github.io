
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
scrambleText(document.getElementById('scramble-sub'));
scrambleText(document.getElementById('scramble-title'));
document.getElementById('scramble-name').addEventListener('mouseenter', function() {
    scrambleText(this);
});