// ========================================
// PORTFOLIO SITE · Shared Functionality
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ========================================
    // MOBILE NAV TOGGLE
    // ========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ========================================
    // PROJECTS PAGE · Dynamic Project Cards
    // ========================================
    const projectsContainer = document.getElementById('projectsContainer');

    if (projectsContainer) {
        const projects = [
            {
                id: 1,
                title: 'E-commerce Platform',
                description: 'A full-featured online store with cart, payments, and admin dashboard built with React and Node.js.',
                icon: '🛒',
                tags: ['React', 'Node.js', 'MongoDB'],
                category: 'web'
            },
            {
                id: 2,
                title: 'Task Management App',
                description: 'A collaborative task management tool with real-time updates, drag-and-drop, and team workspaces.',
                icon: '✅',
                tags: ['JavaScript', 'Firebase', 'CSS'],
                category: 'web'
            },
            {
                id: 3,
                title: 'Weather Dashboard',
                description: 'A real-time weather app with live API data, 7-day forecast, and interactive maps.',
                icon: '🌤️',
                tags: ['API', 'JavaScript', 'CSS'],
                category: 'web'
            },
            {
                id: 4,
                title: 'Fitness Tracker',
                description: 'A mobile-first fitness app for tracking workouts, nutrition, and progress with charts and analytics.',
                icon: '💪',
                tags: ['React Native', 'Node.js', 'PostgreSQL'],
                category: 'mobile'
            },
            {
                id: 5,
                title: 'Portfolio Website',
                description: 'A modern, responsive portfolio site with dynamic projects, contact form, and smooth animations.',
                icon: '🎨',
                tags: ['HTML', 'CSS', 'JavaScript'],
                category: 'design'
            },
            {
                id: 6,
                title: 'Analytics Dashboard',
                description: 'A data visualization dashboard with live charts, metrics, and customizable widgets.',
                icon: '📊',
                tags: ['React', 'D3.js', 'Python'],
                category: 'web'
            }
        ];

        let currentFilter = 'all';

        function renderProjects(filter = 'all') {
            const filtered = filter === 'all' 
                ? projects 
                : projects.filter(p => p.category === filter);

            projectsContainer.innerHTML = '';

            if (filtered.length === 0) {
                projectsContainer.innerHTML = `
                    <div class="empty-message" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                        <p style="font-size: 1.1rem;">No projects found for this category.</p>
                    </div>
                `;
                return;
            }

            filtered.forEach((project, index) => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.style.animationDelay = `${index * 0.08}s`;
                card.innerHTML = `
                    <div class="project-image">${project.icon}</div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                        </div>
                        <a href="#" class="project-link">View Project →</a>
                    </div>
                `;
                projectsContainer.appendChild(card);
            });
        }

        renderProjects('all');

        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                renderProjects(currentFilter);
            });
        });
    }

    // ========================================
    // CONTACT FORM · Client-side Validation
    // ========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');
        const formStatus = document.getElementById('formStatus');

        function showError(input, message) {
            const errorEl = input.closest('.form-group').querySelector('.error-message');
            input.classList.add('error');
            if (errorEl) {
                errorEl.textContent = message || 'This field is required';
                errorEl.classList.remove('hidden');
            }
        }

        function hideError(input) {
            const errorEl = input.closest('.form-group').querySelector('.error-message');
            input.classList.remove('error');
            if (errorEl) {
                errorEl.classList.add('hidden');
            }
        }

        function clearErrors() {
            document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => el.classList.remove('error'));
        }

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validateField(input) {
            const value = input.value.trim();
            if (input.id === 'email') {
                if (!value || !validateEmail(value)) {
                    showError(input, 'Please enter a valid email address');
                    return false;
                }
            } else {
                if (!value) {
                    showError(input);
                    return false;
                }
            }
            hideError(input);
            return true;
        }

        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            if (input) {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                input.addEventListener('input', function() {
                    if (this.classList.contains('error')) {
                        validateField(this);
                    }
                });
            }
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            clearErrors();
            formStatus.className = 'form-status hidden';
            formStatus.textContent = '';

            const isNameValid = validateField(nameInput);
            const isEmailValid = validateField(emailInput);
            const isSubjectValid = validateField(subjectInput);
            const isMessageValid = validateField(messageInput);

            if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
                const firstError = document.querySelector('.form-group input.error, .form-group textarea.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.textContent = '✅ Thank you! Your message has been sent successfully.';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';

                setTimeout(() => {
                    formStatus.className = 'form-status hidden';
                }, 5000);
            }, 1500);
        });
    }

    console.log('🚀 Portfolio site loaded successfully!');
});