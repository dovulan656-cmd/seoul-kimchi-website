// ============ UTILS.JS - SHARED UTILITIES ============

// ============ PERFORMANCE UTILITIES ============

/**
 * Debounce function - delays execution until after wait time
 * @param {Function} fn - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
function debounce(fn, wait = 250) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            fn.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function - limits execution frequency
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Limit in ms
 * @returns {Function} Throttled function
 */
function throttle(fn, limit = 200) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Request Idle Callback with fallback
 */
const requestIdleCallback = window.requestIdleCallback || 
    function(cb) { return setTimeout(cb, 200); };

const cancelIdleCallback = window.cancelIdleCallback || 
    function(id) { clearTimeout(id); };

// ============ DOM UTILITIES ============

/**
 * Query selector with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Element|null}
 */
function $(selector, context = document) {
    try {
        return context.querySelector(selector);
    } catch (error) {
        console.error('Invalid selector:', selector, error);
        return null;
    }
}

/**
 * Query selector all with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {NodeList}
 */
function $$(selector, context = document) {
    try {
        return context.querySelectorAll(selector);
    } catch (error) {
        console.error('Invalid selector:', selector, error);
        return [];
    }
}

/**
 * Create element with attributes
 * @param {string} tag - HTML tag
 * @param {Object} attrs - Attributes object
 * @param {string|Element} content - Content
 * @returns {Element}
 */
function createElement(tag, attrs = {}, content = '') {
    const el = document.createElement(tag);
    
    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'className') {
            el.className = value;
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                el.dataset[dataKey] = dataValue;
            });
        } else if (key.startsWith('on') && typeof value === 'function') {
            el.addEventListener(key.substring(2).toLowerCase(), value);
        } else {
            el.setAttribute(key, value);
        }
    });
    
    if (typeof content === 'string') {
        el.innerHTML = content;
    } else if (content instanceof Element) {
        el.appendChild(content);
    }
    
    return el;
}

// ============ STRING UTILITIES ============

/**
 * Escape HTML to prevent XSS
 * @param {string} str - String to escape
 * @returns {string}
 */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Truncate string with ellipsis
 * @param {string} str - String to truncate
 * @param {number} length - Max length
 * @returns {string}
 */
function truncate(str, length = 100) {
    if (!str || str.length <= length) return str;
    return str.substring(0, length).trim() + '...';
}

/**
 * Slugify string for URLs
 * @param {string} str - String to slugify
 * @returns {string}
 */
function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/-+/g, '-'); // Remove multiple -
}

// ============ NUMBER UTILITIES ============

/**
 * Format number as currency (VND)
 * @param {number} amount - Amount to format
 * @returns {string}
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

/**
 * Format large numbers (1000 -> 1K)
 * @param {number} num - Number to format
 * @returns {string}
 */
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// ============ DATE UTILITIES ============

/**
 * Format date to Vietnamese format
 * @param {Date|string} date - Date to format
 * @returns {string}
 */
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

/**
 * Get relative time (e.g., "2 giờ trước")
 * @param {Date|string} date - Date to compare
 * @returns {string}
 */
function getRelativeTime(date) {
    const d = new Date(date);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000); // seconds
    
    if (diff < 60) return 'Vừa xong';
    if (diff < 3600) return Math.floor(diff / 60) + ' phút trước';
    if (diff < 86400) return Math.floor(diff / 3600) + ' giờ trước';
    if (diff < 2592000) return Math.floor(diff / 86400) + ' ngày trước';
    return formatDate(d);
}

// ============ STORAGE UTILITIES ============

/**
 * Safe localStorage get
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if not found
 * @returns {*}
 */
function getStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Storage get error:', error);
        return defaultValue;
    }
}

/**
 * Safe localStorage set
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success
 */
function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Storage set error:', error);
        return false;
    }
}

/**
 * Safe localStorage remove
 * @param {string} key - Storage key
 */
function removeStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Storage remove error:', error);
    }
}

// ============ VALIDATION UTILITIES ============

/**
 * Validate email
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validate Vietnamese phone number
 * @param {string} phone - Phone to validate
 * @returns {boolean}
 */
function isValidPhone(phone) {
    const cleaned = phone.replace(/\s/g, '');
    const regex = /^(\+84|84|0)[0-9]{9,10}$/;
    return regex.test(cleaned);
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean}
 */
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// ============ ASYNC UTILITIES ============

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry async function
 * @param {Function} fn - Async function to retry
 * @param {number} retries - Number of retries
 * @param {number} delay - Delay between retries (ms)
 * @returns {Promise}
 */
async function retry(fn, retries = 3, delay = 1000) {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0) throw error;
        await sleep(delay);
        return retry(fn, retries - 1, delay);
    }
}

// ============ ARRAY UTILITIES ============

/**
 * Chunk array into smaller arrays
 * @param {Array} arr - Array to chunk
 * @param {number} size - Chunk size
 * @returns {Array}
 */
function chunk(arr, size) {
    return Array.from(
        { length: Math.ceil(arr.length / size) },
        (_, i) => arr.slice(i * size, i * size + size)
    );
}

/**
 * Remove duplicates from array
 * @param {Array} arr - Array to dedupe
 * @returns {Array}
 */
function unique(arr) {
    return [...new Set(arr)];
}

/**
 * Shuffle array randomly
 * @param {Array} arr - Array to shuffle
 * @returns {Array}
 */
function shuffle(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ============ COPY TO CLIPBOARD ============

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>}
 */
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.left = '-999999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return true;
        }
    } catch (error) {
        console.error('Copy to clipboard failed:', error);
        return false;
    }
}

// ============ EXPORT ============

// Export all utilities to window for global access
const Utils = {
    debounce,
    throttle,
    requestIdleCallback,
    cancelIdleCallback,
    $,
    $$,
    createElement,
    escapeHtml,
    truncate,
    slugify,
    formatCurrency,
    formatNumber,
    formatDate,
    getRelativeTime,
    getStorage,
    setStorage,
    removeStorage,
    isValidEmail,
    isValidPhone,
    isValidUrl,
    sleep,
    retry,
    chunk,
    unique,
    shuffle,
    copyToClipboard
};

// Export to window
if (typeof window !== 'undefined') {
    window.Utils = Utils;
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}

console.log('✅ Utils Module Loaded');