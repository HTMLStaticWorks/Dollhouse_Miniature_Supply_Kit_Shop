/* 
  Dollhouse Miniature Supply & Kit Shop
  Main JS
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Toggle ---
    const darkModeToggles = document.querySelectorAll('.dark-mode-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        updateToggleIcons();
    }

    darkModeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            updateToggleIcons();
        });
    });

    function updateToggleIcons() {
        darkModeToggles.forEach(toggle => {
            const icon = toggle.querySelector('i');
            if (body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // --- RTL Toggle ---
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const html = document.documentElement;

    if (localStorage.getItem('dir') === 'rtl') {
        html.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            html.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    });

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }

    // --- Sticky Header ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .section-title, .hero-content').forEach(el => {
        observer.observe(el);
    });

    // --- Back to Top ---
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Form Validations ---
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // --- Gallery Category Filtering ---
    const galleryBtns = document.querySelectorAll('.gallery-category-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    if (galleryBtns.length > 0 && galleryCards.length > 0) {
        galleryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                galleryBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                galleryCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || filter === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
