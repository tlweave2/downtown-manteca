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
document.querySelectorAll('.story-card, .contact-info, .contact-form-container, .link-card').forEach(card => {
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

// Contact form enhancements
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const fileInput = document.querySelector('#attachments');
    const attachmentCount = document.querySelector('.form-group small');
    
    // File input handling
    if (fileInput && attachmentCount) {
        fileInput.addEventListener('change', function() {
            const fileCount = this.files.length;
            attachmentCount.textContent = `Attachments (${fileCount})`;
        });
    }
    
    // Form submission handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = this.querySelector('.btn-send');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                attachmentCount.textContent = 'Attachments (0)';
            }, 2000);
        });
    }
});

// Newsletter form handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            const emailInput = this.querySelector('input[type="email"]');
            
            // Add loading state
            submitBtn.textContent = 'Signing up...';
            submitBtn.disabled = true;
            
            // Simulate newsletter signup (replace with actual handling)
            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

// Enhanced hover effects for link cards
document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
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

// Form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
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
        hero.style.minHeight = 'auto';
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in effect for main content
    setTimeout(() => {
        const main = document.querySelector('main');
        if (main) {
            main.style.opacity = '1';
            main.style.transform = 'translateY(0)';
        }
    }, 500);
    
    // Initialize all interactive elements
    console.log('Downtown Manteca website loaded successfully!');
});
