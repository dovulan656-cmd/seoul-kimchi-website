/* Unit test for chatHistory buffering logic
   - Recreates chatHistory implementation (minimal) from chatbot.js
   - Uses a mock localStorage to count writes and verify batching
   Run: node scripts/test-chatHistory-unit.js
*/

(function(){
    // Mock localStorage
    const mockStore = {};
    const mockLocalStorage = {
        setItem: (k, v) => { mockStore[k] = v; },
        getItem: (k) => mockStore.hasOwnProperty(k) ? mockStore[k] : null,
        removeItem: (k) => { delete mockStore[k]; }
    };

    // Minimal debounce
    function debounce(fn, wait = 250) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    // Recreate chatHistory
    const chatHistory = {
        _buffer: [],
        _debouncedSave: null,
        saveMessage(message, sender) {
            this._buffer.push({ message, sender, timestamp: new Date().toISOString() });
            if (!this._debouncedSave) {
                this._debouncedSave = debounce(() => this._saveNow(), 300);
            }
            this._debouncedSave();
        },
        _saveNow() {
            const existing = this.getHistory();
            const merged = existing.concat(this._buffer);
            mockLocalStorage.setItem('chatHistory', JSON.stringify(merged));
            this._buffer = [];
        },
        getHistory() {
            const saved = mockLocalStorage.getItem('chatHistory');
            return saved ? JSON.parse(saved) : [];
        },
        clearHistory() { mockLocalStorage.removeItem('chatHistory'); this._buffer = []; }
    };

    // Spy on setItem
    let setItemCalls = 0;
    const origSet = mockLocalStorage.setItem;
    mockLocalStorage.setItem = (k, v) => { setItemCalls++; origSet(k, v); };

    // Test: rapid save 5 messages
    chatHistory.clearHistory();
    for (let i = 0; i < 5; i++) chatHistory.saveMessage('msg-'+i, 'user');

    // Immediately, no writes should have happened
    if (setItemCalls !== 0) {
        console.error('FAILED: expected 0 writes immediately, got', setItemCalls);
        process.exit(1);
    }

    // Wait for debounce to flush
    setTimeout(() => {
        if (setItemCalls === 0) {
            console.error('FAILED: expected at least 1 write after debounce, got 0');
            process.exit(1);
        }
        const stored = JSON.parse(mockLocalStorage.getItem('chatHistory'));
        if (!stored || stored.length !== 5) {
            console.error('FAILED: expected 5 messages stored, got', stored && stored.length);
            process.exit(1);
        }
        if (chatHistory._buffer.length !== 0) {
            console.error('FAILED: buffer not cleared after save');
            process.exit(1);
        }
        console.log('PASS: chatHistory batching works (setItemCalls=', setItemCalls, ')');
        process.exit(0);
    }, 650);
})();
