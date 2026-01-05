document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Toggling Logic ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check LocalStorage or System Preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    // Toggle Click Event
    themeToggleBtn.addEventListener('click', () => {
        html.classList.toggle('dark');
        
        // Save preference
        if (html.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });


    // --- 2. Mobile Menu Logic ---
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    // Close menu when clicking a link
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    });


    // --- 3. Scroll Handling ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });


    // --- 4. Intersection Observer for Reveal Animations ---
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });


    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const formData = new FormData(contactForm);

            btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin mr-2"></i> Sending...';
            btn.disabled = true;

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(() => {
                btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Message Sent!';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane ml-2"></i>';
                    btn.disabled = false;
                }, 4000);
            })
            .catch(error => {
                alert("Error: " + error);
                btn.disabled = false;
            });
        });
    }
});