// ============ CHATBOT.JS - SEOUL KIMCHI AI (FIXED) ============

// AI Responses Database
const chatResponses = {
    'language': 'vi',
    
    'track|theo dõi|đơn hàng|tracking': [
        '📦 THEO DÕI ĐƠN HÀNG:\nNhập mã đơn hàng (VD: SK12345)\nHoặc số điện thoại đặt hàng.',
        '🔍 Kiểm tra đơn hàng:\n1. Mã đơn\n2. SĐT\n3. Email\nChọn cách bạn muốn kiểm tra!'
    ],

    'gợi ý|recommend|suggestion': [
        '🎯 GỢI Ý CHO BẠN:\n1. Mới dùng: Kimchi Cải Thảo Cắt\n2. Cay nhẹ: Kimchi Củ Cải\n3. Ăn liền: Tteokbokki Cheese\nThích loại nào?',
        '👨‍🍳 TOP BÁN CHẠY:\n• Kimchi Cải Thảo\n• Tteokbokki Cheese\n• Ớt Bột Hàn Quốc\nMuốn tư vấn chi tiết?'
    ],
    
    'xem sản phẩm|sản phẩm gì': [
        '🌶️ Chúng tôi có 12 loại sản phẩm:\n• Kimchi Cải Thảo (145K)\n• Tteokbokki Cheese (110K)\n• Gia vị Hàn Quốc\nBạn quan tâm loại nào?',
        'Sản phẩm bán chạy nhất: Kimchi Cải Thảo Cắt 🥬\nGiá: 145K | 100% tự nhiên, HACCP'
    ],

    'giá|bao nhiêu|price': [
        '💰 Giá kim chi từ 65K-155K\n• Miễn phí vận chuyển từ 500K\n• Giảm 10% nếu mua từ 3 lọ\nBạn muốn biết sản phẩm nào cụ thể?',
        'Tteokbokki: 95-110K\nKimchi: 65-155K\nGia vị: 65-85K\nLiên hệ để biết khuyến mãi! 🎉'
    ],

    'giao hàng|ship|delivery': [
        '🚚 Giao toàn quốc 1-3 ngày\n• Miễn phí từ 500K\n• Hỗ trợ: GHN, GHTK, COD\n• Đóng gói cẩn thận, an toàn',
        'Địa chỉ giao của bạn là ở đâu? Tôi sẽ tính phí vận chuyển.'
    ],

    'liên hệ|phone|số điện thoại': [
        '☎️ 034 4100 374 (VN)\n📱 077 7358 188 (Korea)\n📧 hanfoodvinahjc@gmail.com\n🏢 B4/118M Tân Liêm, HCM\nGiờ: Thứ 2-7: 07:00-17:00',
        'Liên hệ tôi qua:\n• Chat: Nhắn ở đây\n• Phone: 034 4100 374\n• Email: hanfoodvinahjc@gmail.com'
    ],

    'sức khỏe|health|lợi ích': [
        '💪 Lợi Ích Kimchi:\n✅ Hỗ trợ tiêu hóa\n✅ Tăng miễn dịch\n✅ Giàu probiotics\n✅ Chống viêm\n✅ Bảo vệ tim mạch',
        'Kimchi có: Vitamin, Khoáng chất, Probiotics\nTốt cho: Đường ruột, Hệ miễn dịch, Cân nặng'
    ],

    'đặt hàng|order|mua': [
        '🛒 Cách đặt hàng:\n1️⃣ Chọn sản phẩm\n2️⃣ Gọi hoặc nhắn\n3️⃣ Xác nhận đơn\n4️⃣ Thanh toán\n5️⃣ Giao hàng\n\n📞 034 4100 374',
        'Bạn muốn đặt bao nhiêu sản phẩm? Tôi sẽ tính tiền cho bạn!'
    ],

    'bảo quản|storage': [
        '❄️ Bảo quản Kimchi:\n• Tủ lạnh 2-8°C: 2-3 tháng\n• Nhiệt độ phòng: 1 tháng\n• Dùng công cụ sạch\n• Không để gần thực ăn khác',
        'Để tủ lạnh ngăn mát, lọ đóng kín. Sẽ tươi 2-3 tháng!'
    ],

    'chứng nhận|haccp|certificate': [
        '🏆 Chứng nhận:\n✅ HACCP CODEX 2020\n✅ An toàn thực phẩm\n✅ QCVN 01:2011/BYT\nTất cả từ Bộ Y Tế!',
        '100% sản phẩm tự nhiên, không hóa chất tổng hợp'
    ],

    'chào|hello|xin chào': [
        'Xin chào! 👋 Mình là Seoul Bot\nHỗ trợ 24/7 - Có gì tôi có thể giúp?',
        'Chào bạn! 😊 Cần giúp gì không?'
    ],

    'cảm ơn|thanks|thank you': [
        'Không có gì! 😊 Còn gì khác tôi có thể giúp?',
        'Vui lòng! Hỗ trợ thêm bất kỳ lúc nào 💬'
    ],

    'tạm biệt|bye|goodbye': [
        'Tạm biệt! 👋 Cảm ơn đã ghé thăm Seoul Kimchi 🌶️',
        'Hẹn gặp bạn lần sau! 😊'
    ]
};

// Utilities
const rIC = window.requestIdleCallback || function (cb) { return setTimeout(cb, 200); };

function debounce(fn, wait = 250) {
    let t;
    return function (...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

// DOM Cache
const DOM = {
    chatMessages: null,
    chatInput: null,
    sendButton: null,
    voiceBtn: null
};

function cacheDOM() {
    DOM.chatMessages = document.getElementById('chatMessages');
    DOM.chatInput = document.getElementById('chatInput');
    DOM.sendButton = document.getElementById('sendButton');
    DOM.voiceBtn = document.getElementById('voiceBtn');
}

// Ensure chat widget exists
function ensureChatWidgetExists() {
    try {
        if (document.getElementById('chatWidget')) return;

        const wrapper = document.createElement('div');
        wrapper.id = 'chatWidget';
        wrapper.style.cssText = `
            position: fixed !important;
            right: 32px !important;
            bottom: 32px !important;
            width: 360px !important;
            max-width: 90vw !important;
            background: white !important;
            border-radius: 12px !important;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
            z-index: 999999 !important;
            display: none !important;
            overflow: hidden !important;
        `;
        
        wrapper.innerHTML = `
            <div id="chatPanel" class="flex flex-col h-96 bg-white">
                <div class="flex items-center justify-between p-4 border-b bg-red-600 text-white">
                    <div class="font-semibold">Seoul Bot 🌶️</div>
                    <div class="flex items-center gap-2">
                        <button id="voiceBtn" aria-label="Voice input" class="p-2 hover:bg-red-700 rounded-full transition-colors">
                            <i class="fas fa-microphone"></i>
                        </button>
                        <button id="closeChat" aria-label="Close chat" class="p-2 hover:bg-red-700 rounded-full transition-colors">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div id="chatMessages" class="flex-1 p-4 overflow-auto bg-gray-50"></div>
                <div class="p-3 border-t bg-white">
                    <div class="flex gap-2">
                        <input id="chatInput" class="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Nhập tin nhắn..." />
                        <button id="sendButton" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(wrapper);

        // Toggle functionality
        const panel = wrapper;
        const toggle = document.getElementById('chatToggle');
        const closeBtn = document.getElementById('closeChat');

        function showPanel() {
            panel.style.display = 'flex';
            toggle?.setAttribute('aria-expanded', 'true');
            setTimeout(() => {
                const input = document.getElementById('chatInput');
                input?.focus();
            }, 100);
        }

        function hidePanel() {
            panel.style.display = 'none';
            toggle?.setAttribute('aria-expanded', 'false');
        }

        toggle?.addEventListener('click', () => {
            if (panel.style.display === 'none' || !panel.style.display) {
                showPanel();
            } else {
                hidePanel();
            }
        });

        closeBtn?.addEventListener('click', hidePanel);

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && panel.style.display === 'flex') {
                hidePanel();
            }
        });

    } catch (err) {
        console.error('Chat widget error:', err);
    }
}

// Chat History
const chatHistory = {
    _buffer: [],
    _debouncedSave: null,

    saveMessage(message, sender) {
        try {
            this._buffer.push({ message, sender, timestamp: new Date().toISOString() });
            if (!this._debouncedSave) {
                this._debouncedSave = debounce(() => this._saveNow(), 1000);
            }
            this._debouncedSave();
        } catch (error) {
            console.error('Error saving chat:', error);
        }
    },

    _saveNow() {
        try {
            const existing = this.getHistory();
            const merged = existing.concat(this._buffer);
            localStorage.setItem('seoulkimchi_chatHistory', JSON.stringify(merged));
            this._buffer = [];
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },

    getHistory() {
        try {
            const saved = localStorage.getItem('seoulkimchi_chatHistory');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            return [];
        }
    },

    clearHistory() {
        try {
            localStorage.removeItem('seoulkimchi_chatHistory');
            this._buffer = [];
        } catch (error) {
            console.error('Error clearing history:', error);
        }
    }
};

// Match keywords
function matchKeywords(userMessage) {
    try {
        const lowerMsg = userMessage.toLowerCase();
        
        for (const [keywords, responses] of Object.entries(chatResponses)) {
            if (keywords === 'language') continue;
            
            const patterns = keywords.split('|');
            if (patterns.some(p => lowerMsg.includes(p.toLowerCase()))) {
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        
        return `Tôi chưa hiểu rõ. 🤔\n\nCâu hỏi phổ biến:\n1️⃣ Xem sản phẩm\n2️⃣ Kiểm tra giá\n3️⃣ Theo dõi đơn hàng\n4️⃣ Gợi ý món ngon\n\nHoặc gọi 034 4100 374 để được hỗ trợ trực tiếp!`;
    } catch (err) {
        console.error('matchKeywords error:', err);
        return null;
    }
}

// Send message
function sendChatMessage() {
    const input = DOM.chatInput || document.getElementById('chatInput');
    const message = input ? input.value.trim() : '';

    if (!message) return;

    addChatMessage(message, 'user');
    if (input) input.value = '';
    
    // Show typing
    const messagesDiv = DOM.chatMessages || document.getElementById('chatMessages');
    if (messagesDiv) {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.className = 'flex gap-2 mb-3';
        typingDiv.innerHTML = `
            <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                <i class="fas fa-robot text-xs"></i>
            </div>
            <div class="bg-gray-200 rounded-lg px-4 py-2 text-sm">
                <span class="animate-pulse">●</span>
                <span class="animate-pulse">●</span>
                <span class="animate-pulse">●</span>
            </div>
        `;
        messagesDiv.appendChild(typingDiv);
    }
    
    setTimeout(() => {
        document.getElementById('typingIndicator')?.remove();
        const response = matchKeywords(message);
        if (response) addChatMessage(response, 'bot');
    }, 800);
}

// Add message
function addChatMessage(text, sender) {
    const messagesDiv = DOM.chatMessages || document.getElementById('chatMessages');
    if (!messagesDiv) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'flex justify-end gap-2 mb-3' : 'flex gap-2 mb-3';
    
    if (sender === 'user') {
        msgDiv.innerHTML = `
            <div class="bg-red-600 text-white rounded-lg p-3 max-w-xs text-sm shadow">
                ${escapeHtml(text)}
                <div class="text-xs opacity-75 mt-1 text-right">${new Date().toLocaleTimeString()}</div>
            </div>
        `;
    } else {
        msgDiv.innerHTML = `
            <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <i class="fas fa-robot text-xs"></i>
            </div>
            <div class="bg-white border rounded-lg p-3 max-w-xs text-sm shadow">
                ${escapeHtml(text)}
                <div class="text-xs text-gray-500 mt-1">${new Date().toLocaleTimeString()}</div>
            </div>
        `;
    }
    
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    chatHistory.saveMessage(text, sender);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Setup
function setupChatListeners() {
    const input = DOM.chatInput || document.getElementById('chatInput');
    const sendBtn = DOM.sendButton || document.getElementById('sendButton');
    
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendChatMessage);
    }
}

// Toast notification
function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 999999;
        animation: slideIn 0.3s ease;
    `;
    toast.innerHTML = `<div class="flex items-center gap-2">${msg}</div>`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize
window.addEventListener('load', () => {
    ensureChatWidgetExists();
    cacheDOM();
    setupChatListeners();
    
    // Welcome message
    setTimeout(() => {
        addChatMessage('Xin chào! 👋 Tôi là Seoul Bot. Cần giúp gì không?', 'bot');
    }, 500);
});

// Export for global use
window.sendChatMessage = sendChatMessage;
window.showToast = showToast;

console.log('✅ Seoul Kimchi Chatbot Loaded (FIXED)');