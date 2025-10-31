// Minimal jsdom E2E sanity test for chatbot runtime
// This loads js/chatbot.js into a JSDOM window with small polyfills and checks for #chatWidget

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

(async () => {
    const root = path.resolve(__dirname, '..');
    const chatbotPath = path.join(root, 'js', 'chatbot.js');
    const chatbotCode = fs.readFileSync(chatbotPath, 'utf8');

    const dom = new JSDOM(`<!doctype html><html><head></head><body></body></html>`, {
        runScripts: 'dangerously',
        resources: 'usable'
    });

    const { window } = dom;

    // Minimal polyfills
    // localStorage
    (function () {
        const store = {};
        window.localStorage = {
            getItem: (k) => (k in store ? store[k] : null),
            setItem: (k, v) => { store[k] = String(v); },
            removeItem: (k) => { delete store[k]; }
        };
    })();

    // Audio stub
    window.Audio = function () {
        this.volume = 1;
        this.play = function () { return Promise.resolve(); };
        this.pause = function () {};
        this.src = '';
    };

    // basic requestIdleCallback
    window.requestIdleCallback = window.requestIdleCallback || function (cb) { return setTimeout(cb, 0); };

    // webkitSpeechRecognition stub
    window.webkitSpeechRecognition = function () {
        this.continuous = false;
        this.lang = 'vi-VN';
        this.start = () => { if (this.onstart) this.onstart(); };
        this.stop = () => { if (this.onend) this.onend(); };
        this.onresult = null;
        this.onerror = null;
        this.onstart = null;
        this.onend = null;
    };

    // navigator.clipboard
    window.navigator.clipboard = { writeText: async (t) => {} };

    // navigator.share stub (not available)
    window.navigator.share = undefined;

    // simple google maps placeholder
    window.google = window.google || {};
    window.google.maps = window.google.maps || {};

    // Attach a minimal console so logs show
    window.console = console;

    // Inject chatbot script
    const scriptEl = window.document.createElement('script');
    scriptEl.textContent = chatbotCode;
    window.document.head.appendChild(scriptEl);

    // Fire load event to trigger window.addEventListener('load', ...)
    window.dispatchEvent(new window.Event('load'));

    // Wait a short while for code to run and create elements
    await new Promise(resolve => setTimeout(resolve, 500));

    const widgets = window.document.querySelectorAll('#chatWidget');
    const count = widgets ? widgets.length : 0;

    if (count === 1) {
        console.log('PASS: chat widget created (count=', count, ')');
        process.exit(0);
    } else {
        console.error('FAIL: expected 1 chatWidget, found', count);
        // for debugging, dump outerHTML of body
        console.error('BODY HTML:\n', window.document.body.outerHTML);
        process.exit(2);
    }
})();
