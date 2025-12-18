// Hamburger menu toggle
const ham = document.querySelector('.hamburger');
const menu = document.querySelector('nav ul');

// --- FIX START ---
function closeMenu() {
    // 1. Remove the 'show' class to hide the menu
    menu.classList.remove('show');
    // 2. Set aria-expanded to 'false' for accessibility
    ham.setAttribute('aria-expanded', 'false');
}

ham.addEventListener('click', () => {
    const expanded = ham.getAttribute('aria-expanded') === 'true';
    ham.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('show');
});

// New: Close menu when a navigation link is clicked
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
// --- FIX END ---


// Dark mode toggle
const modeBtn = document.querySelector('.mode');
modeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    modeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    localStorage.setItem('darkMode', isDark);
});

// Restore dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    modeBtn.setAttribute('aria-label', 'Switch to light mode');
}

// Carousel functionality
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let autoSlideInterval;

function showSlide(index) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

document.getElementById('next').addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

document.getElementById('prev').addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

startAutoSlide();

// Pause carousel on hover
carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
carousel.addEventListener('mouseleave', startAutoSlide);

// Countdown timer for flash sale
function updateTimer() {
    const timerEl = document.getElementById('timer');
    let time = 9000;
    
    const interval = setInterval(() => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        timerEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        time--;
        
        if (time < 0) {
            clearInterval(interval);
            timerEl.textContent = 'Sale Ended';
        }
    }, 1000);
}

updateTimer();

// Product and category interactions
document.querySelectorAll('.product, .cat-item').forEach(item => {
    item.addEventListener('click', () => {
        console.log('Navigation triggered');
        // Add actual navigation logic here
    });
    
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.1s';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});