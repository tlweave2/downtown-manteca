// Downtown Manteca Interactive Features

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(10,43,48,0.95) 0%, rgba(3,88,71,0.95) 100%)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #0a2b30 0%, #035847 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.attraction-card, .event-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects for event cards
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects for attraction cards
document.querySelectorAll('.attraction-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.matches('a')) {
            const learnMore = this.querySelector('.learn-more');
            if (learnMore) {
                learnMore.click();
            }
        }
    });
});

// Logo animation on page load
document.addEventListener('DOMContentLoaded', function() {
    const heroLogo = document.querySelector('.hero-logo-img');
    if (heroLogo) {
        setTimeout(() => {
            heroLogo.style.animation = 'logoFloat 3s ease-in-out infinite';
        }, 1000);
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-open');
}

// Add resize listener for responsive behavior
window.addEventListener('resize', function() {
    // Adjust hero height on mobile
    const hero = document.querySelector('.hero');
    if (window.innerWidth <= 768) {
        hero.style.minHeight = '70vh';
    } else {
        hero.style.minHeight = '100vh';
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in effect for main content
    setTimeout(() => {
        document.querySelector('main').style.opacity = '1';
        document.querySelector('main').style.transform = 'translateY(0)';
    }, 500);
    
    // Initialize all interactive elements
    console.log('Downtown Manteca website loaded successfully!');
});
