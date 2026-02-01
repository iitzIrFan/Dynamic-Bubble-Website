/**
 * Premium Services Cards - Interactive Effects
 * Adds 3D tilt, particle effects, and smooth animations
 */

// Initialize all service card effects
function initServiceCards() {
    const cards = document.querySelectorAll('.service-detail-card');

    cards.forEach(card => {
        // Add shine element
        addShineEffect(card);

        // Add particle elements
        addParticles(card);

        // Add 3D tilt effect (desktop only)
        if (window.innerWidth >= 1024) {
            add3DTilt(card);
        }

        // Add entrance animation
        addEntranceAnimation(card);
    });
}

// Add shine effect element
function addShineEffect(card) {
    const shine = document.createElement('div');
    shine.className = 'shine';
    card.appendChild(shine);
}

// Add floating particles
function addParticles(card) {
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position and movement
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 50 + Math.random() * 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.left = `${50 + Math.random() * 40}%`;
        particle.style.top = `${20 + Math.random() * 60}%`;
        particle.style.animationDelay = `${Math.random() * 2}s`;

        card.appendChild(particle);
    }
}

// 3D Tilt Effect
function add3DTilt(card) {
    let bounds;

    function rotateToMouse(e) {
        bounds = card.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2
        };

        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

        // Calculate rotation
        const tiltX = (center.y / (bounds.height / 2)) * -10; // max 10 degrees
        const tiltY = (center.x / (bounds.width / 2)) * 10;

        card.style.setProperty('--tilt-x', `${tiltX}deg`);
        card.style.setProperty('--tilt-y', `${tiltY}deg`);
        card.classList.add('tilt-active');
    }

    function resetTilt() {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        setTimeout(() => {
            card.classList.remove('tilt-active');
        }, 100);
    }

    card.addEventListener('mouseenter', rotateToMouse);
    card.addEventListener('mousemove', rotateToMouse);
    card.addEventListener('mouseleave', resetTilt);
}

// Entrance Animation with Intersection Observer
function addEntranceAnimation(card) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(40px)';

                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(card);
}

// List items animation on card hover
function initListItemsAnimation() {
    const cards = document.querySelectorAll('.service-detail-card');

    cards.forEach(card => {
        const listItems = card.querySelectorAll('li');

        card.addEventListener('mouseenter', () => {
            listItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.05}s`;
            });
        });
    });
}

// Magnetic effect for cards
function initMagneticEffect() {
    const cards = document.querySelectorAll('.service-detail-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            // Subtle magnetic pull effect
            card.style.transform = `translateY(-12px) scale(1.02) translate(${deltaX * 5}px, ${deltaY * 5}px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Icon floating animation
function initIconAnimation() {
    const icons = document.querySelectorAll('.service-detail-header .card-icon');

    icons.forEach(icon => {
        // Add subtle floating animation
        let floatDirection = 1;
        let floatY = 0;

        setInterval(() => {
            if (!icon.matches(':hover')) {
                floatY += 0.5 * floatDirection;
                if (Math.abs(floatY) > 8) {
                    floatDirection *= -1;
                }
                icon.style.transform = `translateY(${floatY}px)`;
            }
        }, 50);
    });
}

// Parallax effect for card content
function initParallaxEffect() {
    const cards = document.querySelectorAll('.service-detail-card');

    window.addEventListener('scroll', () => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                card.querySelector('h4')?.style.setProperty('transform', `translateY(${rate * 0.02}px)`);
            }
        });
    });
}

// Ripple effect on click
function addRippleEffect() {
    const cards = document.querySelectorAll('.service-detail-card');

    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(155, 126, 222, 0.4) 0%, transparent 70%);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: rippleEffect 0.8s ease-out;
            `;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 800);
        });
    });

    // Add ripple animation
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes rippleEffect {
                from {
                    transform: scale(0);
                    opacity: 1;
                }
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize all effects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initServiceCards();
        initListItemsAnimation();
        // initMagneticEffect(); // Uncomment for magnetic effect
        initIconAnimation();
        // initParallaxEffect(); // Uncomment for parallax
        addRippleEffect();
    });
} else {
    initServiceCards();
    initListItemsAnimation();
    // initMagneticEffect(); // Uncomment for magnetic effect
    initIconAnimation();
    // initParallaxEffect(); // Uncomment for parallax
    addRippleEffect();
}

// Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initServiceCards,
        initListItemsAnimation,
        initMagneticEffect,
        initIconAnimation,
        initParallaxEffect,
        addRippleEffect
    };
}
