/* script.js - Dr. Vamshi Adouth Faculty Website */

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = currentYear;
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    const toggleBodyScroll = (isExpanded) => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            toggleBodyScroll(!isExpanded);
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                toggleBodyScroll(false);
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (navLinks.classList.contains('active') && !navToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            toggleBodyScroll(false);
        }
    });

    // Active Navigation Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const updateActiveNav = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add a small offset to account for sticky header
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
    // Trigger once on load
    updateActiveNav();
});
