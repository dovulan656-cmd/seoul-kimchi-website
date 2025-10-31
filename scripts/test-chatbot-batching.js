/* Automated test for chatHistory batching
   - Uses jsdom to load chatbot.js in a DOM environment
   - Calls chatHistory.saveMessage multiple times quickly
   - Verifies localStorage.chatHistory is written (batched) after debounce

   Run: node scripts/test-chatbot-batching.js
*/

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

(async () => {
    const root = path.resolve(__dirname, '..');
    const chatbotPath = path.join(root, 'js', 'chatbot.js');
    // Read the original chatbot script content unmodified
    const scriptContent = fs.readFileSync(chatbotPath, 'utf8');

    // Minimal HTML with required elements
    const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Test Chatbot</title>
</head>
<body>
    <div id="chatMessages"></div>
    <input id="chatInput" />
    <button id="sendButton">Send</button>
    <button id="voiceBtn">Voice</button>
    <script>
    // Provide a localStorage binding for scripts that reference it as a bare identifier
    (function(){
        const _store = {};
        if (!window.localStorage) {
            window.localStorage = {
                getItem(k){ return _store.hasOwnProperty(k) ? _store[k] : null },
                setItem(k,v){ _store[k] = String(v) },
                removeItem(k){ delete _store[k] },
                clear(){ for (const k in _store) delete _store[k] }
            };
        }
        // Ensure 'localStorage' is available as an unqualified identifier in the script scope
        var localStorage = window.localStorage;
    })();
    </script>
    <script>
    ${scriptContent}
    </script>
</body>
</html>`;

    // Create JSDOM and execute scripts
    // Provide a beforeParse hook to ensure browser globals like localStorage exist
    const dom = new JSDOM(html, {
        runScripts: 'dangerously',
        resources: 'usable',
        beforeParse(window) {
            // polyfill localStorage if not present
            try {
                if (!window.localStorage) {
                    const _store = {};
                    window.localStorage = {
                        getItem: (k) => _store.hasOwnProperty(k) ? _store[k] : null,
                        setItem: (k, v) => { _store[k] = String(v); },
                        removeItem: (k) => { delete _store[k]; },
                        clear: () => { for (const k in _store) delete _store[k]; }
                    };
                }
            } catch (e) {
                // ignore
            }

            // Prevent auto-run of load handlers registered by the script during parsing.
            // We'll manually initialize after the script has loaded.
            window.addEventListener = function() { /* noop for test */ };
        }
    });
    const { window } = dom;

    // Wait briefly to allow inline scripts to execute in jsdom
    await new Promise(resolve => setTimeout(resolve, 250));

    // Use addChatMessage (a function declaration) to exercise the internal chatHistory.saveMessage
    if (typeof window.addChatMessage !== 'function') {
        console.error('addChatMessage not found on window. Test cannot proceed.');
        process.exit(2);
    }

    // Ensure DOM caching runs so addChatMessage finds #chatMessages
    try { if (typeof window.cacheDOM === 'function') window.cacheDOM(); } catch (e) {}

    // Debug: check localStorage availability
    console.log('DEBUG: typeof window.localStorage =', typeof window.localStorage);

    // Clear any existing storage
    if (window.localStorage && typeof window.localStorage.removeItem === 'function') {
        window.localStorage.removeItem('chatHistory');
    } else {
        console.warn('DEBUG: window.localStorage not available, continuing (will fail if chatbot expects it)');
    }

    // Rapidly add 5 user messages
    for (let i = 0; i < 5; i++) {
        // call as user message, not HTML
        window.addChatMessage(`msg-${i}`, 'user');
    }

    // Immediately after pushes, localStorage should still be empty (buffered)
    const immediate = window.localStorage.getItem('chatHistory');
    console.log('Immediate localStorage.chatHistory:', immediate);

    // Wait for debounced save (chatHistory._debouncedSave uses 1000ms)
    await new Promise(resolve => setTimeout(resolve, 1400));

    // Now localStorage should contain the merged messages
    const after = window.localStorage.getItem('chatHistory');
    console.log('After debounce localStorage.chatHistory:', after);

    if (!after) {
        console.error('FAILED: localStorage.chatHistory was not written after debounce');
        process.exit(1);
    }

    const parsed = JSON.parse(after);
    if (parsed.length !== 5) {
        console.error(`FAILED: expected 5 messages in storage, got ${parsed.length}`);
        process.exit(1);
    }

    // Also ensure buffer cleared
    if (window.chatHistory && window.chatHistory._buffer && window.chatHistory._buffer.length !== 0) {
        console.error('FAILED: chatHistory._buffer not cleared after save');
        process.exit(1);
    }

    console.log('PASS: chatHistory batching behavior works as expected');
    process.exit(0);
})();
