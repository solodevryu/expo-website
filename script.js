// --- Custom Cursor Glow Follower ---
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    }
});

// --- Canvas Particles Effect ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const colors = ['#A855F7', '#D8B4FE', '#F0ABFC'];

// Resize setup
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle Blueprints
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + canvas.height; // Start down low
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * -1 - 0.2; // Slow floating upwards
        this.speedX = Math.random() * 0.5 - 0.25;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        // Reset if it goes off top
        if (this.y < 0) {
            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        // Simple ambient blur/glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }
}

// Build ecosystem
function initParticles() {
    particlesArray = [];
    const count = Math.min(60, window.innerWidth / 20); // Scale down on tiny viewports
    for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles();

// Animation Loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// --- Gallery Lightbox Controls ---
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");

function openLightbox(imageSrc, captionText) {
    lightbox.style.display = "flex";

    lightboxImage.src = imageSrc;
    lightboxCaption.textContent = captionText;
}

function closeLightbox() {
    lightbox.style.display = "none";
}

// --- Scroll Reveal Animations ---
const revealElements = document.querySelectorAll('.section-reveal');
const revealOnScroll = () => {
    const triggerBottom = (window.innerHeight / 5) * 4;
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Run once immediately to check elements visible on initial pageload
revealOnScroll();

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});