// ============ PRODUCTS.JS - SEOUL KIMCHI (FIXED) ============

// Product Database
const products = [
    {
        id: 'kimchi-1',
        name: 'Kim Chi Cải Thảo',
        description: 'Kim chi cải thảo truyền thống, được làm từ bắp cải Hàn Quốc và gia vị nhập khẩu',
        price: '145.000đ',
        image: 'https://images.unsplash.com/photo-1588776814546-dab58ccc0b6c?w=400&h=300&fit=crop',
        category: 'kimchi',
        badge: 'Bán Chạy'
    },
    {
        id: 'tteok-1',
        name: 'Tteokbokki Phô Mai',
        description: 'Bánh gạo Hàn Quốc với sốt phô mai đặc biệt, cay ngọt vừa phải',
        price: '110.000đ',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
        category: 'tteok',
        badge: 'Mới'
    },
    {
        id: 'kimchi-2',
        name: 'Kim Chi Củ Cải',
        description: 'Kim chi củ cải giòn ngọt, vị cay nhẹ phù hợp cho người mới ăn',
        price: '125.000đ',
        image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&h=300&fit=crop',
        category: 'kimchi'
    },
    {
        id: 'spice-1',
        name: 'Bột Ớt Hàn Quốc',
        description: 'Ớt bột Gochugaru chính hiệu Hàn Quốc, thích hợp làm kim chi và gia vị',
        price: '85.000đ',
        image: 'https://images.unsplash.com/photo-1583623733237-4d5764e9c681?w=400&h=300&fit=crop',
        category: 'seasonings'
    },
    {
        id: 'kimchi-3',
        name: 'Kim Chi Ớt Chuông',
        description: 'Kim chi ớt chuông tươi, ít cay, ngọt tự nhiên. An toàn cho trẻ em',
        price: '130.000đ',
        image: 'https://images.unsplash.com/photo-1588776814546-dab58ccc0b6c?w=400&h=300&fit=crop',
        category: 'kimchi'
    },
    {
        id: 'tteok-2',
        name: 'Tteokbokki Cay Truyền Thống',
        description: 'Bánh gạo Hàn Quốc với sốt cay truyền thống, vị cay đậm đà',
        price: '95.000đ',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
        category: 'tteok'
    },
    {
        id: 'spice-2',
        name: 'Tương Ớt Gochujang',
        description: 'Tương ớt đỏ Hàn Quốc nguyên bản, vị cay ngọt đặc trưng',
        price: '75.000đ',
        image: 'https://images.unsplash.com/photo-1583623733237-4d5764e9c681?w=400&h=300&fit=crop',
        category: 'seasonings'
    },
    {
        id: 'kimchi-4',
        name: 'Kim Chi Tổng Hợp',
        description: 'Mix nhiều loại rau, cân bằng dinh dưỡng. Hương vị đa dạng',
        price: '155.000đ',
        image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&h=300&fit=crop',
        category: 'kimchi',
        badge: 'Premium'
    },
    {
        id: 'tteok-3',
        name: 'Tteokbokki Hải Sản',
        description: 'Bánh gạo với hải sản tươi ngon, hương vị biển cả',
        price: '120.000đ',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
        category: 'tteok'
    },
    {
        id: 'spice-3',
        name: 'Bột Tỏi Sấy Khô',
        description: 'Bột tỏi Hàn Quốc nguyên chất, dùng cho kim chi và nấu ăn',
        price: '65.000đ',
        image: 'https://images.unsplash.com/photo-1583623733237-4d5764e9c681?w=400&h=300&fit=crop',
        category: 'seasonings'
    },
    {
        id: 'kimchi-5',
        name: 'Kim Chi Cà Rốt',
        description: 'Kim chi từ cà rốt tươi, giàu Vitamin A, vị ngọt thanh',
        price: '115.000đ',
        image: 'https://images.unsplash.com/photo-1588776814546-dab58ccc0b6c?w=400&h=300&fit=crop',
        category: 'kimchi'
    },
    {
        id: 'combo-1',
        name: 'Combo Gia Đình (3 Lọ)',
        description: 'Combo 3 lọ kim chi các loại, tiết kiệm 15%',
        price: '399.000đ',
        image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&h=300&fit=crop',
        category: 'kimchi',
        badge: 'Tiết Kiệm'
    }
];

// Filter and Display Products
function filterProducts(category) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    // Update filter button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const isActive = btn.dataset.filter === category;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
    });

    // Filter products
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);

    // Render products
    grid.innerHTML = filtered.map(product => `
        <article class="product-card group" data-category="${product.category}">
            <div class="product-img relative overflow-hidden">
                <img 
                    src="${product.image}" 
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}'"
                    class="w-full h-full object-cover transition-transform group-hover:scale-110"
                >
                ${product.badge ? `<span class="badge absolute top-3 right-3">${product.badge}</span>` : ''}
            </div>
            <div class="product-content p-4 flex flex-col flex-1">
                <h3 class="product-name text-lg font-bold text-gray-900 mb-2">${product.name}</h3>
                <p class="product-desc text-sm text-gray-600 mb-3 flex-1">${product.description}</p>
                <div class="product-price text-2xl font-bold text-red-600 mb-3">${product.price}</div>
                <button 
                    onclick="orderProduct('${product.id}')" 
                    class="btn-primary bg-red-600 text-white px-4 py-3 rounded-lg w-full font-bold hover:bg-red-700 transition-colors"
                >
                    <i class="fas fa-shopping-cart mr-2"></i>Đặt Hàng
                </button>
            </div>
        </article>
    `).join('');
}

// Handle Order
function orderProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showToast('❌ Không tìm thấy sản phẩm');
        return;
    }

    // Try to open chatbot and send order message
    try {
        // Method 1: Via chat toggle button
        const chatToggle = document.getElementById('chatToggle');
        if (chatToggle) {
            chatToggle.click();
        }

        // Method 2: Direct message send
        setTimeout(() => {
            const chatInput = document.getElementById('chatInput');
            if (chatInput && window.sendChatMessage) {
                chatInput.value = `Tôi muốn đặt ${product.name} với giá ${product.price}`;
                window.sendChatMessage();
                showToast('✅ Đã thêm vào giỏ hàng!');
            } else {
                // Fallback: Direct contact
                showToast('📞 Gọi 034 4100 374 để đặt hàng');
            }
        }, 300);
    } catch (error) {
        console.error('Order error:', error);
        // Fallback to phone
        if (confirm(`Đặt hàng ${product.name} - ${product.price}\n\nGọi ngay: 034 4100 374?`)) {
            window.location.href = 'tel:0344100374';
        }
    }
}

// Toast notification helper
function showToast(msg) {
    if (window.showToast) {
        window.showToast(msg);
        return;
    }
    
    // Fallback toast
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
    toast.textContent = msg;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
}

// Search Products
function searchProducts(query) {
    if (!query || query.trim() === '') {
        filterProducts('all');
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
    
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-bold text-gray-700 mb-2">Không tìm thấy sản phẩm</h3>
                <p class="text-gray-500">Thử từ khóa khác hoặc gọi 034 4100 374 để được tư vấn</p>
            </div>
        `;
        return;
    }
    
    // Reuse the render logic
    grid.innerHTML = filtered.map(product => `
        <article class="product-card group" data-category="${product.category}">
            <div class="product-img relative overflow-hidden">
                <img src="${product.image}" alt="${product.name}" loading="lazy" class="w-full h-full object-cover transition-transform group-hover:scale-110">
                ${product.badge ? `<span class="badge absolute top-3 right-3">${product.badge}</span>` : ''}
            </div>
            <div class="product-content p-4 flex flex-col flex-1">
                <h3 class="product-name text-lg font-bold text-gray-900 mb-2">${product.name}</h3>
                <p class="product-desc text-sm text-gray-600 mb-3 flex-1">${product.description}</p>
                <div class="product-price text-2xl font-bold text-red-600 mb-3">${product.price}</div>
                <button onclick="orderProduct('${product.id}')" class="btn-primary bg-red-600 text-white px-4 py-3 rounded-lg w-full font-bold hover:bg-red-700 transition-colors">
                    <i class="fas fa-shopping-cart mr-2"></i>Đặt Hàng
                </button>
            </div>
        </article>
    `).join('');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    filterProducts('all');
    
    // Setup search if search input exists
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchProducts(e.target.value);
        });
    }
});

// Export for global use
window.filterProducts = filterProducts;
window.orderProduct = orderProduct;
window.searchProducts = searchProducts;

console.log('✅ Products Module Loaded (FIXED)');