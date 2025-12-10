// Nevervale Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.demo-placeholder').forEach(el => {
        observer.observe(el);
    });

    // Lore Tab Functionality
    const loreTabs = document.querySelectorAll('.lore-tab');
    const loreTabContents = document.querySelectorAll('.lore-tab-content');

    loreTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs and content
            loreTabs.forEach(t => t.classList.remove('active'));
            loreTabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Load More Functionality
    const initialPosts = 6;
    const postsPerLoad = 3;
    const allPosts = document.querySelectorAll('.update-post');
    const loadMoreContainer = document.getElementById('load-more-container');
    const loadMoreBtn = document.getElementById('load-more-btn');

    let visiblePosts = initialPosts;

    function showPosts() {
        allPosts.forEach((post, index) => {
            if (index < visiblePosts) {
                post.style.display = 'flex';
            } else {
                post.style.display = 'none';
            }
        });

        // Hide button if all posts are visible
        if (visiblePosts >= allPosts.length) {
            loadMoreContainer.style.display = 'none';
        } else {
            loadMoreContainer.style.display = 'flex';
        }
    }

    // Initialize
    showPosts();

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visiblePosts += postsPerLoad;
            showPosts();
        });
    }


    // Newsletter form submission (Google Sheets)
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.querySelector('.email-input');
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwi9-oJ181NPYej57kK5YrXO8Mtukd6PBImFkUlitIfqMqcbITZdABzli4pDEjLzqoMQg/exec';
    const COOLDOWN_MS = 60000; // 1 minute cooldown
    let formLoadTime = Date.now();

    // Load persisted state from localStorage
    let lastSubmitTime = parseInt(localStorage.getItem('nv_lastSubmit') || '0');
    let hasSubscribed = localStorage.getItem('nv_subscribed') === 'true';

    if (newsletterForm) {
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');

        // If already subscribed, disable form on page load
        if (hasSubscribed) {
            submitBtn.textContent = 'Subscribed!';
            submitBtn.disabled = true;
            emailInput.disabled = true;
        }

        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Anti-spam: Check if already subscribed
            if (hasSubscribed) {
                showNotification('You have already subscribed!', 'error');
                return;
            }

            // Anti-spam: Check honeypot field (bots fill this, humans don't see it)
            const honeypot = newsletterForm.querySelector('input[name="website"]');
            if (honeypot && honeypot.value) {
                // Bot detected - silently fail
                showNotification('Thank you for subscribing!', 'success');
                return;
            }

            // Anti-spam: Check if form was submitted too quickly after page load (less than 3 seconds)
            if (Date.now() - formLoadTime < 3000) {
                showNotification('Please wait a moment before subscribing.', 'error');
                return;
            }

            // Anti-spam: Check cooldown (1 minute between attempts) - persists across refresh
            const timeSinceLastSubmit = Date.now() - lastSubmitTime;
            if (lastSubmitTime > 0 && timeSinceLastSubmit < COOLDOWN_MS) {
                const secondsLeft = Math.ceil((COOLDOWN_MS - timeSinceLastSubmit) / 1000);
                showNotification(`Please wait ${secondsLeft} seconds before trying again.`, 'error');
                return;
            }

            const email = emailInput.value.trim();

            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            lastSubmitTime = Date.now();
            localStorage.setItem('nv_lastSubmit', lastSubmitTime.toString());

            // Submit to Google Sheets
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'email=' + encodeURIComponent(email)
            })
            .then(() => {
                showNotification('Thank you for subscribing! We\'ll keep you updated.', 'success');
                emailInput.value = '';
                // Disable form permanently after successful subscription
                hasSubscribed = true;
                localStorage.setItem('nv_subscribed', 'true');
                submitBtn.textContent = 'Subscribed!';
                submitBtn.disabled = true;
                emailInput.disabled = true;
            })
            .catch(() => {
                showNotification('Something went wrong. Please try again.', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Simple notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2D5016' : '#e74c3c'};
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            z-index: 10000;
            font-family: 'Inter', sans-serif;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

});

// Add simple CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);
