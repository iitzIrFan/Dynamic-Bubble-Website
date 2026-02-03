/**
 * Premium Testimonial Cards - Interactive Effects
 * Adds shimmer, glow orbs, ripples, and enhanced animations
 */

// Initialize testimonial cards
function initTestimonialCards() {
    const testimonialCards = document.querySelectorAll('.card[style*="border-left: 4px solid"]');

    if (testimonialCards.length === 0) return;

    testimonialCards.forEach((card, index) => {
        // Add shimmer effect element
        addShimmerEffect(card);

        // Add glow orb
        addGlowOrb(card);

        // Add border gradient
        addBorderGradient(card);

        // Add ripple effect on click
        addRippleEffect(card);

        // Add entrance animation
        addEntranceAnimation(card, index);

        // Add confetti particles
        addConfettiParticles(card);

        // Enhanced star rating animation
        enhanceStarRating(card);
    });
}

// Add shimmer sweep effect
function addShimmerEffect(card) {
    const shimmer = document.createElement('div');
    shimmer.className = 'shimmer';
    card.appendChild(shimmer);
}

// Add floating glow orb
function addGlowOrb(card) {
    const orb = document.createElement('div');
    orb.className = 'glow-orb';

    // Random position
    orb.style.top = `${Math.random() * 60 + 20}%`;
    orb.style.left = `${Math.random() * 60 + 20}%`;

    card.appendChild(orb);
}

// Add animated border gradient
function addBorderGradient(card) {
    const borderGradient = document.createElement('div');
    borderGradient.className = 'border-gradient';
    card.appendChild(borderGradient);
}

// Add ripple effect on click
function addRippleEffect(card) {
    card.addEventListener('click', function (e) {
        const ripple = document.createElement('div');
        ripple.className = 'testimonial-ripple';

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 800);
    });
}

// Add staggered entrance animation using Intersection Observer
function addEntranceAnimation(card, index) {
    card.classList.add('reveal-animation');
    card.style.opacity = '0';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                }, index * 200); // Stagger by 200ms

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(card);
}

// Add confetti particles
function addConfettiParticles(card) {
    const confettiCount = 12;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        // Random starting position
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * 30}%`;

        // Random delay
        confetti.style.animationDelay = `${Math.random() * 2}s`;

        // Random color
        const colors = ['#FFD700', '#FFC107', '#FF9800', '#FF5722', '#9B7EDE'];
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];

        card.appendChild(confetti);
    }
}

// Enhance star rating with individual star animations
function enhanceStarRating(card) {
    const starContainer = card.querySelector('div:first-child');

    if (!starContainer || !starContainer.textContent.includes('⭐')) return;

    // Wrap each star in a span for individual animation
    const stars = starContainer.textContent.match(/⭐/g);
    if (!stars) return;

    const starText = starContainer.textContent;
    starContainer.innerHTML = '';

    stars.forEach((star, index) => {
        const starSpan = document.createElement('span');
        starSpan.textContent = star;
        starSpan.style.display = 'inline-block';
        starSpan.style.transition = 'transform 0.3s ease';
        starSpan.style.transitionDelay = `${index * 0.05}s`;
        starContainer.appendChild(starSpan);
    });

    // Animate stars on card hover
    card.addEventListener('mouseenter', () => {
        const starSpans = starContainer.querySelectorAll('span');
        starSpans.forEach((span, index) => {
            setTimeout(() => {
                span.style.transform = 'scale(1.3) rotate(72deg)';
            }, index * 50);
        });
    });

    card.addEventListener('mouseleave', () => {
        const starSpans = starContainer.querySelectorAll('span');
        starSpans.forEach((span, index) => {
            setTimeout(() => {
                span.style.transform = 'scale(1) rotate(0deg)';
            }, index * 50);
        });
    });
}

// 3D Tilt effect (optional, for desktop)
function add3DTiltToTestimonials() {
    if (window.innerWidth < 1024) return;

    const cards = document.querySelectorAll('.card[style*="border-left: 4px solid"]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // max 5 degrees
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `translateY(-16px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Particle cursor trail effect (optional)
function addCursorTrail() {
    const cards = document.querySelectorAll('.card[style*="border-left: 4px solid"]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';

            const rect = card.getBoundingClientRect();
            trail.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: linear-gradient(135deg, #C4B5FD, #9B7EDE);
                border-radius: 50%;
                pointer-events: none;
                left: ${e.clientX - rect.left}px;
                top: ${e.clientY - rect.top}px;
                opacity: 0.8;
                animation: trailFade 0.8s ease-out forwards;
                z-index: 100;
            `;

            card.appendChild(trail);

            setTimeout(() => trail.remove(), 800);
        });
    });

    // Add trail animation
    if (!document.getElementById('trail-animation')) {
        const style = document.createElement('style');
        style.id = 'trail-animation';
        style.textContent = `
            @keyframes trailFade {
                from {
                    opacity: 0.8;
                    transform: scale(1);
                }
                to {
                    opacity: 0;
                    transform: scale(0.3);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Quote mark animation
function animateQuoteMark() {
    const cards = document.querySelectorAll('.card[style*="border-left: 4px solid"]');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Enhance the quote mark animation (already handled in CSS)
            // This is a placeholder for additional JS-based animations if needed
        });
    });
}

// Testimonial text typing effect (optional)
function addTypingEffect() {
    const cards = document.querySelectorAll('.card[style*="border-left: 4px solid"]');

    cards.forEach(card => {
        const textElement = card.querySelector('p[style*="italic"]');
        if (!textElement) return;

        const originalText = textElement.textContent;

        card.addEventListener('mouseenter', function typeText() {
            // Remove the event listener so it only happens once
            card.removeEventListener('mouseenter', typeText);

            textElement.textContent = '';
            let index = 0;

            const typeInterval = setInterval(() => {
                if (index < originalText.length) {
                    textElement.textContent += originalText[index];
                    index++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 20);
        });
    });
}

// Initialize all effects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initTestimonialCards();
        add3DTiltToTestimonials();
        // addCursorTrail(); // Uncomment for cursor trail effect
        // addTypingEffect(); // Uncomment for typing effect (happens once per card)
    });
} else {
    initTestimonialCards();
    add3DTiltToTestimonials();
    // addCursorTrail(); // Uncomment for cursor trail effect
    // addTypingEffect(); // Uncomment for typing effect
}

// Re-initialize on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        add3DTiltToTestimonials();
    }, 250);
});

// Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initTestimonialCards,
        add3DTiltToTestimonials,
        addCursorTrail,
        addTypingEffect
    };
}
