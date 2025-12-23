// ===== DOM ELEMENTS =====
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const sections = document.querySelectorAll('section[id]');
const filterBtns = document.querySelectorAll('.projects__filter');
const projectCards = document.querySelectorAll('.project-card');

// ===== MOBILE NAV =====
navToggle?.addEventListener('click', () => navMenu.classList.add('show'));
navClose?.addEventListener('click', () => navMenu.classList.remove('show'));
navLinks.forEach(link => link.addEventListener('click', () => navMenu.classList.remove('show')));

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 50 
        ? '0 4px 30px rgba(0, 0, 0, 0.3)' 
        : 'none';
});

// ===== SCROLL SPY =====
function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link?.classList.add('active');
        } else {
            link?.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollActive);

// ===== PROJECT FILTERS =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== TERMINAL TYPING ANIMATION =====
const terminalLines = [
    { id: 'line1', text: '> Who is Omi Singh?', delay: 500 },
    { id: 'line2', text: '> Software Developer. Leader. Problem Solver.', delay: 1500 },
    { id: 'line3', text: 'First-year B.Tech Student at Sage University | Specializing in C++ & Full-Stack thinking.', delay: 3000 }
];

function typeText(element, text, speed = 50) {
    return new Promise(resolve => {
        let i = 0;
        const cursor = document.querySelector('.terminal__cursor');
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

async function runTerminalAnimation() {
    // Wait a bit before starting
    await new Promise(r => setTimeout(r, 500));
    
    // Hide cursor during command display
    const cursor = document.querySelector('.terminal__cursor');
    
    for (const line of terminalLines) {
        await new Promise(r => setTimeout(r, line.delay - (terminalLines.indexOf(line) > 0 ? terminalLines[terminalLines.indexOf(line) - 1].delay : 0)));
        const element = document.getElementById(line.id);
        if (element) {
            await typeText(element, line.text, line.id === 'line3' ? 30 : 50);
        }
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('.section').forEach(section => {
    if (section.id !== 'home') {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    }
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    runTerminalAnimation();
});

// ===== CSS KEYFRAMES VIA JS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
