// ============ MAIN.JS - SEOUL KIMCHI (FIXED) ============

// ============ PAGE NAVIGATION ============
function goto(page) {
    document.querySelectorAll('.page-section').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    
    const section = document.getElementById(page);
    if (section) {
        section.classList.add('active');
        section.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                'page_title': page,
                'page_location': window.location.href + '#' + page
            });
        }
    }
}

// ============ DOM CACHE ============
const MAIN_DOM = {
    contactForm: null,
    mobileMenu: null,
    backToTop: null,
    productGrid: null
};

function cacheDOM() {
    MAIN_DOM.contactForm = document.getElementById('contactFormModal');
    MAIN_DOM.mobileMenu = document.getElementById('mobileMenu');
    MAIN_DOM.backToTop = document.getElementById('backToTop');
    MAIN_DOM.productGrid = document.getElementById('productGrid');
}

// ============ MOBILE MENU ============
function toggleMenu() {
    const menu = MAIN_DOM.mobileMenu || document.getElementById('mobileMenu');
    const menuBtn = document.getElementById('menuBtn');
    
    if (menu) {
        const isActive = menu.classList.toggle('active');
        if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', isActive);
        }
    }
}

// ============ CONTACT MODAL ============
function openContactModal() {
    const modal = MAIN_DOM.contactModal || document.getElementById('contactModal');
    const toggle = MAIN_DOM.contactToggle || document.getElementById('contactToggle');
    
    if (modal) {
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'true');
        }
        
        // Focus first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input, textarea');
            if (firstInput) firstInput.focus();
        }, 100);
    }
}

function closeContactModal() {
    const modal = MAIN_DOM.contactModal || document.getElementById('contactModal');
    const toggle = MAIN_DOM.contactToggle || document.getElementById('contactToggle');
    
    if (modal) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
    }
}

// ============ FORM VALIDATION ============
function validateForm(form) {
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;
    let firstInvalid = null;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        
        if (!value) {
            isValid = false;
            input.classList.add('border-red-500');
            if (!firstInvalid) firstInvalid = input;
        } else {
            input.classList.remove('border-red-500');
            
            // Email validation
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    if (!firstInvalid) firstInvalid = input;
                }
            }
            
            // Phone validation (Vietnam format)
            if (input.type === 'tel') {
                const phoneRegex = /^(\+84|84|0)[0-9]{9,10}$/;
                if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    if (!firstInvalid) firstInvalid = input;
                }
            }
        }
    });
    
    if (!isValid && firstInvalid) {
        firstInvalid.focus();
        showToast('❌ Vui lòng điền đầy đủ thông tin hợp lệ');
    }
    
    return isValid;
}

// ============ NOTIFICATIONS ============
let toastContainer = null; // Declare globally to ensure it's created once

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999999;
        max-width: 400px;
    `;
    document.body.appendChild(container);
    return container;
}

function showToast(msg, type = 'info') {
    if (!toastContainer) {
        toastContainer = createToastContainer();
    }
    const toast = document.createElement('div');
    
    const iconClass = type === 'success' ? 'fa-check-circle text-green-500' : 
                     type === 'error' ? 'fa-exclamation-circle text-red-500' : 
                     'fa-info-circle text-blue-500';
    
    toast.className = 'toast bg-white shadow-lg rounded-lg p-4 mb-3 flex items-center gap-3 animate-slideIn';
    toast.innerHTML = `
        <i class="fas ${iconClass} text-xl"></i>
        <span class="flex-1">${msg}</span>
        <button onclick="this.parentElement.remove()" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// ============ SCROLL TO TOP ============
function setupBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            btn.classList.remove('hidden');
        } else {
            btn.classList.add('hidden');
        }
    };
    
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============ SMOOTH SCROLL ============
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === 'javascript:void(0)') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============ LAZY LOADING IMAGES ============
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

// ============ KEYBOARD SHORTCUTS ============
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K: Open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('productSearch');
            if (searchInput) searchInput.focus();
        }
        
        // Escape: Close modals
        if (e.key === 'Escape') {
            closeContactModal();
        }
    });
}

// ============ FORM HANDLING ============
function setupContactForm() {
    const form = MAIN_DOM.contactForm || document.getElementById('contactFormModal');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm(form)) return;
        
        const formData = {
            name: form.querySelector('[name="name"]')?.value?.trim(),
            email: form.querySelector('[name="email"]')?.value?.trim(),
            phone: form.querySelector('[name="phone"]')?.value?.trim(),
            subject: form.querySelector('[name="subject"]')?.value?.trim(),
            type: form.querySelector('[name="type"]')?.value,
            message: form.querySelector('[name="message"]')?.value?.trim()
        };
        
        // Show loading
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn?.textContent;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đang gửi...';
        }
        
        try {
            // Simulate API call (replace with real endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Form submitted:', formData);
            
            showToast('✅ Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ sớm.', 'success');
            form.reset();
            closeContactModal();
            
            // Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'generate_lead', {
                    'event_category': 'contact',
                    'event_label': formData.type
                });
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showToast('❌ Có lỗi xảy ra. Vui lòng thử lại hoặc gọi: 034 4100 374', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    });
}

// ============ ANALYTICS ============
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// ============ INITIALIZE ============
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌶️ Seoul Kimchi Website Loading...');
    
    // Cache DOM elements
    cacheDOM();
    
    // Setup features
    setupBackToTop();
    setupSmoothScroll();
    setupLazyLoading();
    setupKeyboardShortcuts();
    setupContactForm();
    
    // Setup event listeners for navigation links (header, mobile, footer)
    document.querySelectorAll('a[data-section-id]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section-id');
            goto(sectionId);
            if (MAIN_DOM.mobileMenu && MAIN_DOM.mobileMenu.classList.contains('active')) {
                toggleMenu(); // Close mobile menu after navigation
            }
        });
    });

    // Setup event listener for logo
    const logoBrand = document.querySelector('.logo-brand[data-section-id="home"]');
    if (logoBrand) {
        logoBrand.addEventListener('click', (e) => {
            e.preventDefault();
            goto('home');
        });
    }

    // Setup event listener for mobile menu button
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    // Setup event listeners for contact modal
    const contactNavLink = document.getElementById('contactNavLink');
    if (contactNavLink) {
        contactNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            openContactModal();
        });
    }

    const contactNavLinkMobile = document.getElementById('contactNavLinkMobile');
    if (contactNavLinkMobile) {
        contactNavLinkMobile.addEventListener('click', (e) => {
            e.preventDefault();
            openContactModal();
            toggleMenu(); // Close mobile menu after opening modal
        });
    }

    const heroContactBtn = document.getElementById('heroContactBtn');
    if (heroContactBtn) {
        heroContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openContactModal();
        });
    }

    const footerContactLink = document.getElementById('footerContactLink');
    if (footerContactLink) {
        footerContactLink.addEventListener('click', (e) => {
            e.preventDefault();
            openContactModal();
        });
    }

    // Setup contact modal close button
    const closeBtn = document.getElementById('closeContactModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeContactModal);
    }
    
    // Setup contact toggle button
    const contactToggle = document.getElementById('contactToggle');
    if (contactToggle) {
        contactToggle.addEventListener('click', openContactModal);
    }
    
    // Close modal on outside click
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeContactModal();
            }
        });
    }

    // Setup product filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = button.getAttribute('data-filter');
            // Assuming filterProducts function exists in js/products.js
            if (typeof filterProducts === 'function') {
                filterProducts(filter);
            }
        });
    });
    
    // Set current year in footer
    const yearElements = document.querySelectorAll('#currentYear');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const menu = MAIN_DOM.mobileMenu;
        const menuBtn = document.getElementById('menuBtn');
        
        if (menu && menuBtn && 
            !menu.contains(e.target) && 
            !menuBtn.contains(e.target) &&
            menu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Handle initial hash deep link (e.g., /#products)
    const initialHash = (window.location.hash || '').replace('#', '').trim();
    if (initialHash) {
        const target = document.getElementById(initialHash);
        if (target) {
            goto(initialHash);
        }
    }

    // React to manual hash changes
    window.addEventListener('hashchange', () => {
        const hash = (window.location.hash || '').replace('#', '').trim();
        if (hash) {
            const target = document.getElementById(hash);
            if (target) goto(hash);
        }
    });

    console.log('✅ Seoul Kimchi Website Loaded (FIXED)');
});

// ============ EXPORT GLOBALS ============
window.goto = goto;
window.toggleMenu = toggleMenu;
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;
window.showToast = showToast;
window.trackEvent = trackEvent;
// Assuming filterProducts is defined in products.js and needs to be global
// window.filterProducts = filterProducts; 

// ============ ANIMATIONS ============
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .animate-slideIn {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);
