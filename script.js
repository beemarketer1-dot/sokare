document.addEventListener('DOMContentLoaded', () => {

    // --- DROPDOWN MENU TOGGLE ---
    const menuBtn = document.getElementById('menuBtn');
    const dropdownNav = document.getElementById('dropdownNav');

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownNav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdownNav.contains(e.target) && e.target !== menuBtn) {
            dropdownNav.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });

    // Close dropdown after selecting a link and handle smooth scrolling
    document.querySelectorAll('.glass-dropdown a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            dropdownNav.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

    // --- CUSTOM SELECT DROPDOWN LOGIC ---
    const customSelectWrapper = document.querySelector('.custom-select-wrapper');
    if (customSelectWrapper) {
        const customSelect = customSelectWrapper.querySelector('.custom-select');
        const customOptions = customSelectWrapper.querySelector('.custom-options');
        const hiddenInput = customSelectWrapper.querySelector('#service');
        const triggerText = customSelectWrapper.querySelector('.custom-select-trigger');
        const optionsList = customSelectWrapper.querySelectorAll('.custom-option');

        // Toggle dropdown
        customSelect.addEventListener('click', (e) => {
            e.stopPropagation();
            customSelect.classList.toggle('open');
            customOptions.classList.toggle('open');
        });

        // Select an option
        optionsList.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = option.getAttribute('data-value');
                const text = option.textContent;

                // Update hidden input
                hiddenInput.value = value;
                
                // Update trigger text and style
                triggerText.textContent = text;
                triggerText.classList.add('has-value');

                // Update active state on options
                optionsList.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                // Close dropdown
                customSelect.classList.remove('open');
                customOptions.classList.remove('open');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!customSelectWrapper.contains(e.target)) {
                customSelect.classList.remove('open');
                customOptions.classList.remove('open');
            }
        });
    }

    // --- WHATSAPP FORM SUBMISSION ---
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Get the selected department from the custom dropdown
            let department = 'Not specified';
            const triggerText = document.querySelector('.custom-select-trigger');
            if (triggerText && triggerText.classList.contains('has-value')) {
                department = triggerText.textContent;
            }
            
            // Format the WhatsApp message
            const whatsappNumber = '917559074714';
            
            let text = `Hello Sokare Health,\nI would like to get in touch.\n\n`;
            text += `*Name:* ${name}\n`;
            text += `*Phone:* ${phone}\n`;
            text += `*Service Required:* ${department}\n`;
            text += `*Message:* ${message}`;

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

            window.open(whatsappUrl, '_blank');
        });
    }
    // --- SERVICE CARD WHATSAPP REDIRECTION ---
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.cursor = 'pointer'; // Ensure it looks clickable
        card.addEventListener('click', () => {
            const serviceName = card.querySelector('h4').textContent;
            const whatsappNumber = '917559074714';
            const text = `Hello Sokare Health,\nI would like to book an appointment for ${serviceName}.`;
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // --- SCROLL ANIMATIONS (Intersection Observer) ---
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve to run animation only once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    // --- ANIMATED CURSOR LOGIC ---
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');
    
    if (cursor && cursorFollower) {
        // Only run on devices with a fine pointer (mice)
        if (window.matchMedia("(pointer: fine)").matches) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            });

            // Add hover effect for clickable elements
            const clickables = document.querySelectorAll('a, button, input, textarea, .custom-option, .service-card, .dept-card, .feature-card, .custom-select');
            clickables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorFollower.classList.add('hover');
                });
                el.addEventListener('mouseleave', () => {
                    cursorFollower.classList.remove('hover');
                });
            });
        }
    }
    // --- HERO SECTION GLOW ---
    const heroSection = document.getElementById('hero');
    const heroGlow = document.querySelector('.hero-glow');

    if (heroSection && heroGlow && window.matchMedia("(pointer: fine)").matches) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            heroGlow.style.left = `${x}px`;
            heroGlow.style.top = `${y}px`;
        });
    }
});

// --- BASIC SECURITY DETERRENTS ---
// Disable Right-Click Context Menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable Common Developer Tools Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Disable F12
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
    }
    // Disable Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
        e.preventDefault();
    }
    // Disable Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
        e.preventDefault();
    }
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
        e.preventDefault();
    }
    // Disable Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
        e.preventDefault();
    }
});
