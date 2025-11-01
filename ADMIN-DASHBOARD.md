# Admin Dashboard - SEOUL KIMCHI Website

Dashboard quản lý nội dung và hình ảnh cho website Seoul Kimchi.

## 🚀 Truy Cập

**URL:** `/admin/login`

**Mật khẩu mặc định:** `admin123`

> ⚠️ **Lưu ý:** Vui lòng đổi mật khẩu trong `lib/adminAuth.js` trước khi deploy production!

## 📋 Tính Năng

### 1. 🖼️ Quản Lý Hình Ảnh (`/admin/images`)

- **Upload hình ảnh:** Upload nhiều file cùng lúc
- **Chọn thư mục:** Products, Banners, Blog, Certificates, Process, Icons, Backgrounds
- **Xem danh sách:** Grid view với preview
- **Xóa hình ảnh:** Xóa hình ảnh đã upload
- **Lưu tạm thời:** Dữ liệu lưu trong localStorage

**Lưu ý:** 
- Hình ảnh upload được lưu trong localStorage (client-side)
- Cần export và lưu vào `public/image/` sau khi upload
- Vì website sử dụng static export, không có server để upload file thực sự

### 2. 📦 Quản Lý Sản Phẩm (`/admin/products`)

- **Thêm sản phẩm:** Form đầy đủ thông tin
- **Sửa sản phẩm:** Click edit để chỉnh sửa
- **Xóa sản phẩm:** Xóa sản phẩm không cần thiết
- **Export JSON:** Export dữ liệu ra file JSON
- **Xem danh sách:** Table view với đầy đủ thông tin

**Các trường:**
- Tên sản phẩm
- Mô tả
- Giá (VD: 145.000đ)
- URL hình ảnh
- Danh mục (Kimchi, Tteokbokki, Gia Vị)
- Badge (tùy chọn: Bán Chạy, Mới, Premium...)

**Cách sử dụng:**
1. Thêm/sửa sản phẩm trong dashboard
2. Export JSON
3. Copy dữ liệu vào `data/products.js`
4. Rebuild website

### 3. 📝 Quản Lý Blog Posts (`/admin/blog`)

- **Thêm bài viết:** Form tạo bài viết mới
- **Sửa bài viết:** Chỉnh sửa thông tin bài viết
- **Xóa bài viết:** Xóa bài viết
- **Export JSON:** Export dữ liệu ra file JSON
- **Chọn emoji:** Emoji picker cho bài viết

**Các trường:**
- Tiêu đề
- Mô tả ngắn
- Ngày đăng
- Slug (URL)
- Emoji

**Cách sử dụng:**
1. Thêm/sửa bài viết trong dashboard
2. Export JSON
3. Copy dữ liệu vào `pages/blog.js` hoặc file data riêng
4. Rebuild website

### 4. 📊 Dashboard Tổng Quan (`/admin`)

- **Thống kê:** Số lượng sản phẩm, hình ảnh, bài viết
- **Hướng dẫn:** Quick start guide
- **Navigation:** Menu điều hướng nhanh

## 🔐 Authentication

### Đổi Mật Khẩu

Sửa file `lib/adminAuth.js`:

```javascript
const ADMIN_PASSWORD = 'your-new-password'; // Thay đổi mật khẩu ở đây
```

### Session Management

- Session được lưu trong localStorage
- Thời hạn: 24 giờ
- Tự động logout khi hết hạn

## 📦 Cấu Trúc Files

```
├── lib/
│   └── adminAuth.js          # Authentication logic
├── components/
│   └── admin/
│       └── AdminLayout.js    # Layout component cho admin
└── pages/
    └── admin/
        ├── login.js          # Trang đăng nhập
        ├── index.js          # Dashboard tổng quan
        ├── images.js         # Quản lý hình ảnh
        ├── products.js       # Quản lý sản phẩm
        └── blog.js           # Quản lý blog posts
```

## 💾 Lưu Trữ Dữ Liệu

**Vì website sử dụng static export (Next.js `output: 'export'`), dữ liệu chỉ được lưu tạm thời trong localStorage.**

### Cách Lưu Dữ Liệu Thực Sự:

1. **Sản Phẩm:**
   - Export JSON từ dashboard
   - Copy vào `data/products.js`
   - Commit và push lên Git
   - Rebuild website

2. **Blog Posts:**
   - Export JSON từ dashboard
   - Copy vào `pages/blog.js` hoặc tạo file data riêng
   - Commit và push lên Git
   - Rebuild website

3. **Hình Ảnh:**
   - Upload hình ảnh qua dashboard (lưu URL)
   - Copy file thực sự vào `public/image/[folder]/`
   - Commit và push lên Git
   - Rebuild website

## 🔧 Development

### Chạy Development Server

```bash
npm run dev
```

Truy cập: `http://localhost:3000/admin/login`

### Build Production

```bash
npm run build
```

Dashboard sẽ được build như các pages khác.

## ⚠️ Lưu Ý Quan Trọng

1. **Static Export:** Website sử dụng static export, không có server API
2. **Client-Side Storage:** Dữ liệu chỉ lưu trong localStorage
3. **Manual Sync:** Cần export và copy dữ liệu vào source code
4. **Authentication:** Đổi mật khẩu trước khi deploy production
5. **Security:** Dashboard không có server-side validation

## 🎨 UI/UX Features

- ✅ Responsive design
- ✅ Dark mode support (theo theme website)
- ✅ Toast notifications
- ✅ Modal forms
- ✅ Image preview
- ✅ Drag & drop ready (có thể thêm sau)
- ✅ Export functionality

## 🚀 Roadmap

- [ ] Server-side API integration (nếu chuyển sang dynamic mode)
- [ ] Real file upload (cần backend server)
- [ ] Image optimization integration
- [ ] Drag & drop upload
- [ ] Batch operations
- [ ] Search & filter
- [ ] Image editor (crop, resize)
- [ ] Backup & restore

## 📝 Changelog

### v1.0.0 (Initial Release)
- ✅ Authentication system
- ✅ Image management
- ✅ Product management
- ✅ Blog management
- ✅ Dashboard overview
- ✅ Export functionality

---

**Lưu ý:** Dashboard này được thiết kế cho static export. Nếu muốn có tính năng upload file thực sự hoặc server-side API, cần:
1. Thay đổi `next.config.js` để bỏ `output: 'export'`
2. Tạo API routes trong `pages/api/`
3. Setup backend server hoặc sử dụng services như Cloudinary, AWS S3
