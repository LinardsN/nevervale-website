// Tiny Farm RPG Website JavaScript

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
    document.querySelectorAll('.screenshot-item, .demo-placeholder').forEach(el => {
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

    // Updates Pagination Functionality
    const postsPerPage = 4;
    const allPosts = document.querySelectorAll('.update-post');
    const pagination = document.getElementById('pagination');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');

    let currentPage = 1;
    const totalPages = Math.ceil(allPosts.length / postsPerPage);

    function showPage(page) {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        allPosts.forEach((post, index) => {
            if (index >= startIndex && index < endIndex) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });

        // Update pagination info
        pageInfo.textContent = `Page ${page} of ${totalPages}`;

        // Update button states
        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === totalPages;
    }

    // Only show pagination if more than 4 posts
    if (allPosts.length > postsPerPage) {
        pagination.style.display = 'flex';
        showPage(1);

        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
                // Scroll to updates section
                document.getElementById('updates').scrollIntoView({ behavior: 'smooth' });
            }
        });

        nextBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
                // Scroll to updates section
                document.getElementById('updates').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Read More button functionality
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const updateText = this.previousElementSibling;
            updateText.classList.toggle('expanded');

            if (updateText.classList.contains('expanded')) {
                this.textContent = 'Read Less';
            } else {
                this.textContent = 'Read More';
            }
        });
    });

    // Newsletter form submission (Google Sheets)
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.querySelector('.email-input');
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx8svX0Ll74lVA-_eYGWjcnx04JGMAjCHWETjlfr5nrA4NvFVOB2HYSHArtTVWdSHw7GA/exec';
    let formLoadTime = Date.now();

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Anti-spam: Check honeypot field (bots fill this, humans don't see it)
            const honeypot = newsletterForm.querySelector('input[name="website"]');
            if (honeypot && honeypot.value) {
                // Bot detected - silently fail
                showNotification('Thank you for subscribing!', 'success');
                return;
            }

            // Anti-spam: Check if form was submitted too quickly (less than 3 seconds)
            if (Date.now() - formLoadTime < 3000) {
                showNotification('Please wait a moment before subscribing.', 'error');
                return;
            }

            const email = emailInput.value.trim();

            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

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
            })
            .catch(() => {
                showNotification('Something went wrong. Please try again.', 'error');
            })
            .finally(() => {
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
