/* ============================================================
   PublishPro CI - JavaScript Principal
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // --- Navbar scroll effect ---
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile menu toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // --- Intersection Observer for animations ---
    const animateElements = document.querySelectorAll('.feature-card, .template-card, .pricing-card, .testimonial-card, .payment-card');
    
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            observer.observe(el);
        });
    }

    // --- Stats counter animation ---
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const targetNumber = parseInt(text.replace(/[^0-9]/g, ''));
                    
                    if (!isNaN(targetNumber)) {
                        animateCounter(target, targetNumber, text.includes('+') ? '+' : '');
                    }
                    statObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => statObserver.observe(el));
    }

    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = Math.ceil(target / 60);
        const duration = 2000;
        const stepTime = Math.floor(duration / 60);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current + suffix;
        }, stepTime);
    }

    // --- Contact form handler ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = '✅ Message envoyé !';
                submitBtn.style.background = '#27AE60';
                submitBtn.style.borderColor = '#27AE60';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // --- Pricing CTA buttons ---
    document.querySelectorAll('.pricing-card .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const plan = this.closest('.pricing-card').querySelector('h3').textContent;
            
            // Create WhatsApp URL with pre-filled message
            const message = encodeURIComponent(
                `Bonjour ! Je suis intéressé par le plan ${plan} de PublishPro CI. `
            );
            
            // Try WhatsApp first, fallback to showing contact info
            window.open(`https://wa.me/2250707070707?text=${message}`, '_blank');
        });
    });

    console.log('🚀 PublishPro CI - Landing page loaded successfully!');
});
