// Interactive Features for Enhanced User Experience

// Global variables for testimonials 
let currentTestimonialSet = 0;
const testimonialsData = [
    {
        name: "Sarah Johnson",
        title: "QA Engineer at Microsoft",
        rating: 5.0,
        photo: "portfolio/img/reviews/sarah_johnson.jpg",
        review: "Vignesh's Playwright course helped me transition from manual testing to automation. The hands-on approach and real-world examples made all the difference.",
        badges: ["Career Growth", "Playwright Expert"]
    },
    {
        name: "Mike Chen", 
        title: "SDET at Google",
        rating: 5.0,
        photo: "portfolio/img/reviews/mike_chen.jpg",
        review: "The Selenium framework course was exactly what I needed. Vignesh's industry experience shows in every lesson. Got promoted within 6 months!",
        badges: ["Promotion", "Selenium Expert"]
    },
    {
        name: "Aisha Patel",
        title: "Test Lead at Amazon",
        rating: 5.0,
        photo: "portfolio/img/reviews/aisha_patel.jpg",
        review: "Best investment in my career! The corporate training session for our team was exceptional. Clear explanations and practical examples.",
        badges: ["Team Training", "Leadership"]
    },
    {
        name: "David Kumar",
        title: "Senior QA Engineer at Netflix",
        rating: 4.8,
        photo: "portfolio/img/reviews/david_kumar.jpg",
        review: "Amazing course structure! Vignesh breaks down complex concepts into digestible pieces. The practice labs were incredibly helpful.",
        badges: ["Skill Upgrade", "Cypress Expert"]
    },
    {
        name: "Lisa Wong",
        title: "Senior QA at Adobe", 
        rating: 4.8,
        photo: "portfolio/img/reviews/lisa_wong.jpg",
        review: "The API testing course was comprehensive and well-structured. Helped me advance from mid-level to senior QA role within 8 months. Highly recommend!",
        badges: ["Skill Enhancement", "Senior Role"]
    }
];

// Global function to load testimonials
function loadTestimonials() {
    console.log('🔍 loadTestimonials called');
    const containers = document.querySelectorAll('#testimonials-container');
    
    if (containers.length === 0) {
        console.error('❌ No testimonials containers found!');
        return;
    }
    
    console.log(`✅ Found ${containers.length} testimonials containers, updating all`);
    // Clear loading spinner from all containers first
    containers.forEach(container => {
        container.innerHTML = '';
    });
    window.showTestimonialSet(0);
}

// Helper function to generate star ratings
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star text-warning"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
    
    // Add empty stars to make 5 total
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star text-warning"></i>';
    }
    
    return starsHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    
    // Credential Animation Enhancement
    const credentialItems = document.querySelectorAll('.credential-item');
    credentialItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animated');
        }, (index + 1) * 300 + 800); // Trigger shimmer after each item appears
    });

    // Enhanced Navigation on Scroll - Hide brand row when scrolling
    const navbarWrapper = document.querySelector('.navbar-wrapper');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbarWrapper.classList.add('scrolled');
        } else {
            navbarWrapper.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Enhanced Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Floating Contact Button
    function addFloatingContact() {
        const floatingContact = document.createElement('a');
        floatingContact.href = 'mailto:vigneshonlinetutor@gmail.com';
        floatingContact.className = 'floating-contact';
        floatingContact.innerHTML = '<i class="fas fa-envelope"></i>';
        floatingContact.setAttribute('data-tooltip', 'Contact Me');
        floatingContact.setAttribute('aria-label', 'Contact via email');
        document.body.appendChild(floatingContact);
    }
    
    // Only add floating contact if not on corporate training page (which has its own form)
    if (!window.location.pathname.includes('corporate-training')) {
        addFloatingContact();
    }
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                
                // Special handling for progress bars
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, 200);
                    }
                }
                
                // Special handling for stats counters
                if (entry.target.classList.contains('stats-item')) {
                    animateCounter(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.wow, .skill-item, .stats-item').forEach(el => {
        observer.observe(el);
    });
    
    // Counter Animation for Stats
    function animateCounter(element) {
        const numberElement = element.querySelector('h2, h3');
        if (!numberElement) return;
        
        const text = numberElement.textContent;
        
        // Handle decimal numbers like 4.7+
        if (text.includes('.')) {
            const number = parseFloat(text.replace(/[^\d.]/g, ''));
            if (isNaN(number)) return;
            
            const suffix = text.replace(/[\d.]/g, '');
            const duration = 2000;
            const steps = 60;
            const increment = number / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                numberElement.textContent = current.toFixed(1) + suffix;
            }, duration / steps);
        } else {
            // Handle whole numbers like 7000+, 10+
            const number = parseInt(text.replace(/\D/g, ''));
            if (isNaN(number)) return;
            
            const suffix = text.replace(/[\d]/g, '');
            const duration = 2000;
            const steps = 60;
            const increment = number / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                numberElement.textContent = Math.floor(current) + suffix;
            }, duration / steps);
        }
    }
    
    // Enhanced Form Interactions (for all forms)
    document.querySelectorAll('form').forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Add floating labels effect
            if (input.type !== 'checkbox' && input.type !== 'radio') {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
                
                // Check if already has value on page load
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
            }
        });
    });
    
    // Enhanced Button Interactions
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Enhanced Loading States
    function showLoading() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay show';
        loadingOverlay.innerHTML = `
            <div class="text-center">
                <div class="loader"></div>
                <p class="mt-3 text-muted">Loading...</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
        return loadingOverlay;
    }
    
    function hideLoading(overlay) {
        if (overlay) {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        }
    }
    
    // Page Transition Effects
    window.addEventListener('beforeunload', function() {
        document.body.style.opacity = '0.5';
    });
    
    // Lazy Loading for Images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // Enhanced Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals/overlays
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal, .loading-overlay').forEach(el => {
                el.classList.remove('show');
            });
        }
        
        // Tab key enhancement for accessibility
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse click
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Performance Optimizations
    let ticking = false;
    
    function updateOnScroll() {
        // Throttle scroll events
        if (!ticking) {
            requestAnimationFrame(function() {
                // Update any scroll-dependent animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll);
    
    // Error Handling for Failed Requests
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.error);
        // Could add user-friendly error notifications here
    });
    
    // Service Worker Registration (for future PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment when service worker is ready
            // navigator.serviceWorker.register('/sw.js');
        });
    }
    
    // Load testimonials after DOM is ready
    console.log('🚀 Checking for testimonials container...');
    setTimeout(() => {
        loadTestimonials();
    }, 100);
    
    console.log('Interactive features loaded successfully! 🚀');
});

// Global function to show testimonials (accessible from onclick)
window.showTestimonialSet = function(setIndex) {
    const containers = document.querySelectorAll('#testimonials-container');
    
    if (containers.length === 0) {
        console.error('❌ Cannot show testimonials: no containers found!');
        return;
    }
    
    const testimonialsPerSet = 3;
    const startIndex = setIndex * testimonialsPerSet;
    const endIndex = Math.min(startIndex + testimonialsPerSet, testimonialsData.length);
    const currentTestimonials = testimonialsData.slice(startIndex, endIndex);
    
    console.log(`✅ Showing testimonials ${startIndex + 1} to ${endIndex} of ${testimonialsData.length}`);
    
    const testimonialsHtml = `
        <div class="row">
            ${currentTestimonials.map((testimonial, index) => `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="testimonial-card h-100">
                        <div class="d-flex align-items-center mb-3">
                            <div class="mr-3">
                                <img src="${testimonial.photo}" 
                                     class="rounded-circle shadow-sm" 
                                     alt="${testimonial.name}"
                                     style="width: 50px; height: 50px; object-fit: cover;"
                                     onerror="this.src='https://via.placeholder.com/50x50/007bff/ffffff?text=${testimonial.name.charAt(0)}'">
                            </div>
                            <div>
                                <h6 class="mb-0 font-weight-bold">${testimonial.name}</h6>
                                <small class="text-primary font-weight-500">${testimonial.title}</small>
                            </div>
                        </div>
                        <div class="mb-3">
                            ${generateStars(testimonial.rating)}
                            <span class="ml-2 text-muted small">(${testimonial.rating} Rating)</span>
                        </div>
                        <p class="text-muted">"${testimonial.review}"</p>
                        <div class="mt-3">
                            ${testimonial.badges.map((badge, badgeIndex) => {
                                const colors = ['badge-primary', 'badge-success', 'badge-info', 'badge-warning'];
                                const colorClass = colors[badgeIndex % colors.length];
                                return `<span class="badge ${colorClass} mr-1 mb-1">${badge}</span>`;
                            }).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="d-flex justify-content-between align-items-center mt-4">
            <button class="btn btn-outline-primary" id="prevTestimonials" ${setIndex === 0 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left mr-2"></i>Previous
            </button>
            
            <div class="testimonial-indicators">
                ${Array.from({length: Math.ceil(testimonialsData.length / testimonialsPerSet)}, (_, i) => `
                    <button class="btn btn-sm ${i === setIndex ? 'btn-primary' : 'btn-outline-primary'} mx-1" 
                            onclick="showTestimonialSet(${i})">${i + 1}</button>
                `).join('')}
            </div>
            
            <button class="btn btn-outline-primary" id="nextTestimonials" 
                    ${endIndex >= testimonialsData.length ? 'disabled' : ''}>
                Next<i class="fas fa-chevron-right ml-2"></i>
            </button>
        </div>
    `;
    
    // Update all containers with the same content
    containers.forEach(container => {
        container.innerHTML = testimonialsHtml;
    });
    currentTestimonialSet = setIndex;
    
    // Add event listeners for navigation (only need to do this once)
    const prevBtn = document.getElementById('prevTestimonials');
    const nextBtn = document.getElementById('nextTestimonials');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentTestimonialSet > 0) {
                showTestimonialSet(currentTestimonialSet - 1);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxSets = Math.ceil(testimonialsData.length / testimonialsPerSet);
            if (currentTestimonialSet < maxSets - 1) {
                showTestimonialSet(currentTestimonialSet + 1);
            }
        });
    }
    
    console.log('✅ Testimonials displayed with navigation');
};

// Backup testimonial loading for immediate execution
(function() {
    console.log('🚀 Script loaded, setting up backup testimonial loading...');
    
    // Backup loading with multiple attempts
    setTimeout(() => {
        console.log('🔄 Backup attempt to load testimonials...');
        loadTestimonials();
    }, 500);
    
    setTimeout(() => {
        console.log('🔄 Final backup attempt to load testimonials...');
        loadTestimonials();
    }, 1500);
})();

// Helper function to generate badges
function generateBadges(badges) {
    const badgeColors = [
        'badge-primary', 'badge-success', 'badge-info', 
        'badge-warning', 'badge-danger', 'badge-secondary'
    ];
    
    return badges.map((badge, index) => {
        const colorClass = badgeColors[index % badgeColors.length];
        return `<span class="badge ${colorClass} mr-1 mb-1">${badge}</span>`;
    }).join('');
}

// CSS for ripple effect
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.keyboard-navigation *:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style); 