// Custom JavaScript for Paint Guard Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'var(--secondary-color)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.backgroundColor = 'var(--secondary-color)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
    
    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements and observe them
    const elementsToAnimate = document.querySelectorAll('.about-section .col-md-4');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Close offcanvas when clicking outside
    document.addEventListener('click', function(e) {
        const offcanvas = document.querySelector('#offcanvasMenu');
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
        
        if (offcanvasInstance && offcanvasInstance._isShown) {
            if (!offcanvas.contains(e.target) && !e.target.closest('.menu-toggle')) {
                offcanvasInstance.hide();
            }
        }
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Form validation (if contact form is added later)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        return isValid;
    }
    
    // Add hover effects for better UX
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Preload images for better performance
    function preloadImages() {
        const images = [
        
            'assets/img/product-colour-size.png',
            'assets/img/logo.png'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const offcanvas = document.querySelector('#offcanvasMenu');
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
            
            if (offcanvasInstance && offcanvasInstance._isShown) {
                offcanvasInstance.hide();
            }
        }
    });
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll handler
    const debouncedScrollHandler = debounce(function() {
        // Additional scroll-based functionality can be added here
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
});

// Google Analytics (replace with your tracking ID)
// gtag('config', 'GA_TRACKING_ID');

// Schema.org structured data for SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Paint Guard",
    "brand": {
        "@type": "Brand",
        "name": "LFJ Plastics Ltd"
    },
    "description": "Premium paint protection solutions available in different colors and sizes",
    "manufacturer": {
        "@type": "Organization",
        "name": "LFJ Plastics Ltd"
    }
};

// Add structured data to page
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);