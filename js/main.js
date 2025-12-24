import WaterEffect from './WaterEffect.js';
import VideoManager from './VideoManager.js';
import LanguageManager from './LanguageManager.js';

class TylaWebsite {
    constructor() {
        this.waterEffect = null;
        this.videoManager = null;
        this.languageManager = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.initWaterEffect();
        this.initVideoManager();
        this.initLanguageManager();
        this.initScrollAnimations();
        this.initSmoothScroll();
        this.initHeaderScroll();
    }

    initWaterEffect() {
        const canvas = document.getElementById('waterDropCanvas');
        if (canvas) {
            this.waterEffect = new WaterEffect(canvas);
        }
    }

    initVideoManager() {
        this.videoManager = new VideoManager();
    }

    initLanguageManager() {
        this.languageManager = new LanguageManager();
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.award-item, .social-card');
        animatedElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initHeaderScroll() {
        const header = document.querySelector('.header');
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
    }
}

new TylaWebsite();
