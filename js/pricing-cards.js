/**
 * Premium Pricing Cards - Interactive Effects
 * Adds particles, shine, badges, and 3D tilt
 */

// Initialize pricing cards
function initPricingCards() {
    const pricingCards = document.querySelectorAll('.card[style*="background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))"]');

    if (pricingCards.length === 0) return;

    pricingCards.forEach((card, index) => {
        // Add shine effect
        addShineEffect(card);

        // Add floating particles
        addFloatingParticles(card);

        // Add price badge
        addPriceBadge(card);

        // Add 3D tilt (desktop only)
        if (window.innerWidth >= 1024) {
            add3DTilt(card);
        }

        // Add entrance animation
        addEntranceAnimation(card, index);

        // Enhance list items
        enhanceListItems(card);
    });
}

// Add shine sweep effect
function addShineEffect(card) {
    const shine = document.createElement('div');
    shine.className = 'pricing-shine';
    card.appendChild(shine);
}

// Add floating particles
function addFloatingParticles(card) {
    const particleCount = 10;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'pricing-particle';

        // Random size
        const size = 4 + Math.random() * 8;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random starting position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random movement
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 30 + Math.random() * 40;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.animationDelay = `${Math.random() * 2}s`;

        card.appendChild(particle);
    }
}

// Add price badge
function addPriceBadge(card) {
    const heading = card.querySelector('h3');
    if (!heading) return;

    // Extract icon from heading (emoji at start)
    const text = heading.textContent;
    const emojiMatch = text.match(/^([\u{1F300}-\u{1F9FF}])/u);

    if (emojiMatch) {
        const badge = document.createElement('div');
        badge.className = 'pricing-badge';
        badge.textContent = emojiMatch[1];
        badge.setAttribute('aria-hidden', 'true');
        card.appendChild(badge);
    }
}

// 3D Tilt effect on mouse move
function add3DTilt(card) {
    let bounds;

    function tiltCard(e) {
        bounds = card.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2
        };

        const rotateX = ((center.y / (bounds.height / 2)) * -8); // max 8 degrees
        const rotateY = ((center.x / (bounds.width / 2)) * 8);

        card.style.transform = `translateY(-20px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function resetTilt() {
        card.style.transform = '';
    }

    card.addEventListener('mouseenter', tiltCard);
    card.addEventListener('mousemove', tiltCard);
    card.addEventListener('mouseleave', resetTilt);
}

// Entrance animation with Intersection Observer
function addEntranceAnimation(card, index) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(60px) scale(0.9)';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(card);
}

// Enhance list items with staggered animations
function enhanceListItems(card) {
    const listItems = card.querySelectorAll('li');

    listItems.forEach((item, index) => {
        // Remove text checkmark if present
        item.textContent = item.textContent.replace(/^[✓✔︎]+\s*/, '');

        // Add hover effect for individual items
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(12px)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
}

// Add sparkle effect on button hover
function addButtonSparkles() {
    const pricingCards = document.querySelectorAll('.card[style*="background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))"]');

    pricingCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (!button) return;

        button.addEventListener('mouseenter', function () {
            createSparkles(this);
        });
    });
}

function createSparkles(button) {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            const rect = button.getBoundingClientRect();
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;

            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #FFD700, transparent);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: sparkleFade 0.8s ease-out forwards;
                z-index: 100;
            `;

            button.style.position = 'relative';
            button.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 800);
        }, i * 100);
    }
}

// Add sparkle animation CSS
if (!document.getElementById('sparkle-animation')) {
    const style = document.createElement('style');
    style.id = 'sparkle-animation';
    style.textContent = `
        @keyframes sparkleFade {
            from {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            to {
                opacity: 0;
                transform: scale(2) translateY(-30px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Magnetic cursor effect
function addMagneticEffect() {
    const pricingCards = document.querySelectorAll('.card[style*="background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))"]');

    pricingCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (!button) return;

        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// Ripple effect on card click
function addRippleEffect() {
    const pricingCards = document.querySelectorAll('.card[style*="background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))"]');

    pricingCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Don't trigger if clicking the button
            if (e.target.closest('.btn')) return;

            const ripple = document.createElement('div');
            ripple.className = 'pricing-ripple';

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: pricing-rippleExpand 0.8s ease-out;
            `;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 800);
        });
    });

    // Add ripple animation
    if (!document.getElementById('pricing-ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'pricing-ripple-animation';
        style.textContent = `
            @keyframes pricing-rippleExpand {
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

// Floating badge animation enhancement
function enhanceBadgeAnimation() {
    const badges = document.querySelectorAll('.pricing-badge');

    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function () {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'badgePulse 2s ease-in-out infinite';
                this.style.transform = 'scale(1.2) rotate(15deg)';
            }, 10);
        });

        badge.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
}

// Initialize all effects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initPricingCards();
        addButtonSparkles();
        addMagneticEffect();
        addRippleEffect();
        enhanceBadgeAnimation();
    });
} else {
    initPricingCards();
    addButtonSparkles();
    addMagneticEffect();
    addRippleEffect();
    enhanceBadgeAnimation();
}

// Re-initialize on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Re-add 3D tilt for desktop if needed
        if (window.innerWidth >= 1024) {
            const pricingCards = document.querySelectorAll('.card[style*="background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))"]');
            pricingCards.forEach(card => add3DTilt(card));
        }
    }, 250);
});

// Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initPricingCards,
        addButtonSparkles,
        addMagneticEffect,
        addRippleEffect
    };
}
