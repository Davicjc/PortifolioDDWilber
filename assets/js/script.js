/* =============================================
   DENNIS WILBER - PORTFOLIO FUTURISTA
   JavaScript - Animações e Interações
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização
    initLoader();
    initCursor();
    initParticles();
    initNavigation();
    initScrollEffects();
    initCounters();
    initFormHandling();
    initSkillMeters();
    initAOS();
    setCurrentYear();
});

/* =============================================
   LOADER
   ============================================= */
function initLoader() {
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 1500);
    });
}

/* =============================================
   CURSOR PERSONALIZADO
   ============================================= */
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    // Verificar se é dispositivo touch
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        // Cursor principal
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Seguidor
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Efeito hover em links e botões
    const interactiveElements = document.querySelectorAll('a, button, .stat-card, .expertise-card, .timeline-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'scale(1.5)';
            follower.style.opacity = '0.3';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.opacity = '0.5';
        });
    });
}

/* =============================================
   PARTÍCULAS
   ============================================= */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 15) + 's';
        container.appendChild(particle);
    }
}

/* =============================================
   NAVEGAÇÃO
   ============================================= */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Header scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    });
    
    // Smooth scroll para links
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
}

/* =============================================
   SCROLL EFFECTS
   ============================================= */
function initScrollEffects() {
    // Parallax no hero
    const heroVisual = document.querySelector('.hero-visual');
    const heroGradient = document.querySelector('.hero-gradient');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(calc(-50% + ${scrollY * 0.1}px))`;
        }
        
        if (heroGradient) {
            heroGradient.style.transform = `scale(${1 + scrollY * 0.0005})`;
        }
    });
}

/* =============================================
   CONTADORES ANIMADOS
   ============================================= */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const update = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        };
        
        update();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

/* =============================================
   SKILL METERS
   ============================================= */
function initSkillMeters() {
    const meters = document.querySelectorAll('.meter-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.getPropertyValue('--width');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    meters.forEach(meter => observer.observe(meter));
}

/* =============================================
   FORMULÁRIO
   ============================================= */
function initFormHandling() {
    const form = document.getElementById('contactForm');
    
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simular envio
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Preparar dados para WhatsApp
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        const whatsappMessage = encodeURIComponent(
            `*Nova mensagem do portfólio*\n\n` +
            `*Nome:* ${name}\n` +
            `*Email:* ${email}\n` +
            `*Assunto:* ${subject}\n` +
            `*Mensagem:* ${message}`
        );
        
        // Abrir WhatsApp
        window.open(`https://wa.me/5534996884444?text=${whatsappMessage}`, '_blank');
        
        // Resetar formulário
        form.reset();
        submitBtn.innerHTML = '<span>Mensagem Enviada!</span><i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

/* =============================================
   AOS - ANIMATE ON SCROLL
   ============================================= */
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

/* =============================================
   ANO ATUAL
   ============================================= */
function setCurrentYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/* =============================================
   EFEITOS EXTRAS
   ============================================= */

// Magnetic buttons effect
document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Tilt effect on cards
document.querySelectorAll('.expertise-card, .stat-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Typing effect para hero (opcional - adiciona dinamismo)
const heroDesc = document.querySelector('.hero-desc');
if (heroDesc) {
    const text = heroDesc.innerHTML;
    heroDesc.style.opacity = '1';
}

// Glow follow effect
document.querySelectorAll('.expertise-card').forEach(card => {
    const glow = card.querySelector('.card-glow');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (glow) {
            glow.style.left = x - rect.width + 'px';
            glow.style.top = y - rect.height + 'px';
        }
    });
});

// Console easter egg
console.log('%c🚀 Dennis Wilber - Portfolio', 'font-size: 24px; font-weight: bold; color: #ff6b35;');
console.log('%cDesenvolvido com paixão e dedicação', 'font-size: 14px; color: #888;');
