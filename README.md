# SEOUL KIMCHI Website - Next.js

Website giới thiệu và bán hàng cho thương hiệu Seoul Kimchi - Kim chi Hàn Quốc truyền thống từ 1968.

## 🚀 Công Nghệ

- **Next.js 14** - React framework cho production
- **React 18** - UI library
- **Tailwind CSS (CDN)** - Utility-first CSS framework
- **Font Awesome** - Icons
- **Google Analytics** - Tracking

## 📦 Cài Đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Start production server
npm start
```

## 📁 Cấu Trúc Project

```
├── components/          # React components
│   ├── Header.js       # Header navigation
│   ├── Footer.js       # Footer
│   ├── Layout.js       # Main layout wrapper
│   ├── ContactModal.js # Contact form modal
│   ├── ContactToggle.js# Contact button
│   └── ChatWidget.js   # AI Chatbot widget
├── pages/              # Next.js pages (routing)
│   ├── _app.js        # App wrapper
│   ├── _document.js   # Document wrapper
│   ├── index.js       # Homepage
│   ├── products.js    # Products page
│   ├── blog.js        # Blog page
│   ├── contact.js     # Contact page
│   ├── process.js     # Process page
│   └── certifications.js # Certifications page
├── data/              # Data files
│   └── products.js   # Products data
├── lib/               # Utilities
│   └── chatbot.js    # Chatbot logic
├── styles/            # Global styles
│   └── globals.css   # Global CSS
├── public/            # Static assets
│   └── image/         # Tất cả hình ảnh website (xem public/image/README.md)
├── scripts/           # Utility scripts
│   └── setup-image-folders.ps1  # Script thiết lập thư mục ảnh
├── next.config.js     # Next.js config
├── package.json       # Dependencies
└── netlify.toml       # Netlify deployment config
```

## 🎯 Tính Năng

- ✅ Responsive design (mobile-first)
- ✅ SEO optimized
- ✅ Product filtering & search
- ✅ Contact form with Netlify Forms
- ✅ AI Chatbot với responses thông minh
- ✅ Google Analytics tracking
- ✅ Accessibility (ARIA, semantic HTML)
- ✅ Fast page loads với static generation

## 📱 Pages

- `/` - Homepage với hero, stats, map
- `/products` - Danh sách sản phẩm với filter
- `/blog` - Blog posts
- `/contact` - Trang liên hệ
- `/process` - Quy trình sản xuất
- `/certifications` - Chứng nhận & tiêu chuẩn

## 🚢 Deploy

### Netlify

1. Push code lên GitHub
2. Kết nối repo với Netlify
3. Build settings tự động từ `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `out`

### Manual Deploy

```bash
npm run build
# Upload folder `out/` lên hosting
```

## 🔧 Development

### Thêm Product Mới

Chỉnh sửa `data/products.js`:

```javascript
{
  id: 'product-id',
  name: 'Tên sản phẩm',
  description: 'Mô tả',
  price: '100.000đ',
  image: 'URL hình ảnh',
  category: 'kimchi', // hoặc 'tteok', 'seasonings'
  badge: 'Bán Chạy' // optional
}
```

### Thêm Chatbot Response

Chỉnh sửa `lib/chatbot.js` - thêm pattern vào object `chatResponses`.

### Quản Lý Hình Ảnh

**📸 Tất cả hình ảnh được lưu trong `public/image/`**

**Hướng dẫn nhanh:**
1. Đọc `public/image/QUICK-START.md` - Hướng dẫn 3 bước
2. Đọc `public/image/README.md` - Hướng dẫn chi tiết đầy đủ

**Cấu trúc:**
- `public/image/banners/` - Banner website
- `public/image/products/` - Hình ảnh sản phẩm
- `public/image/blog/` - Hình ảnh blog
- `public/image/certificates/` - Chứng chỉ
- `public/image/process/` - Quy trình sản xuất
- `public/image/icons/` - Icons & favicon
- `public/image/backgrounds/` - Hình nền

**Component hỗ trợ:**
- `components/ProductImage.js` - Hiển thị ảnh sản phẩm
- `components/BlogImage.js` - Hiển thị ảnh blog
- `components/CertificateImage.js` - Hiển thị ảnh chứng chỉ
- `components/ProcessImage.js` - Hiển thị ảnh quy trình
- `components/Banner.js` - Hiển thị banner

Xem `components/README-IMAGES.md` để biết cách sử dụng components.

## 📝 Notes

- Sử dụng `output: 'export'` trong `next.config.js` để export static HTML
- Contact form sử dụng Netlify Forms (cần config trong Netlify dashboard)
- Chatbot hoạt động client-side với keyword matching
- Google Analytics ID: `G-HFEJTXEZ79`

## 📄 License

Copyright © 2025 SEOUL KIMCHI - Han Food Vina
