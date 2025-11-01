# Deploy lên Vercel với Upload Thực Sự

Hướng dẫn deploy website lên Vercel với tính năng upload file thực sự.

## 📋 Yêu Cầu

- Vercel account (free tier đủ dùng)
- GitHub repository
- Node.js 22+ (đã cấu hình trong `package.json`: `"engines": { "node": "22.x" }`)

## 🚀 Bước 1: Setup Vercel Blob Storage

### 1.1 Cài đặt package

```bash
npm install @vercel/blob
```

### 1.2 Tạo Vercel Blob Store

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project
3. Vào tab **Storage**
4. Click **Create Database**
5. Chọn **Blob**
6. Đặt tên store (VD: `seoul-kimchi-images`)
7. Copy **BLOB_READ_WRITE_TOKEN** (sẽ cần trong bước tiếp theo)

### 1.3 Cấu hình Environment Variables

Trong Vercel Dashboard:
1. Vào **Settings** > **Environment Variables**
2. Thêm biến môi trường:

```
BLOB_READ_WRITE_TOKEN=your_token_here
ADMIN_PASSWORD=your_admin_password
```

Hoặc tạo file `.env.local` cho development:

```bash
# .env.local
BLOB_READ_WRITE_TOKEN=your_token_here
ADMIN_PASSWORD=admin123
```

> ⚠️ **Lưu ý:** Không commit `.env.local` vào Git!

## 🔧 Bước 2: Cấu Hình Next.js

File `next.config.js` đã được cập nhật để:
- ✅ Bỏ `output: 'export'` (để enable API routes)
- ✅ Thêm domain Vercel Blob vào `images.remotePatterns`

## 📦 Bước 3: API Routes

Các API routes đã được tạo:

### Image Upload/Delete
- `POST /api/images/upload` - Upload hình ảnh
- `DELETE /api/images/delete` - Xóa hình ảnh
- `GET /api/images/list` - Danh sách hình ảnh

### Products CRUD
- `GET /api/products` - Lấy danh sách
- `POST /api/products` - Thêm mới
- `PUT /api/products` - Cập nhật
- `DELETE /api/products` - Xóa

### Blog CRUD
- `GET /api/blog` - Lấy danh sách
- `POST /api/blog` - Thêm mới
- `PUT /api/blog` - Cập nhật
- `DELETE /api/blog` - Xóa

## 🚀 Bước 4: Deploy lên Vercel

### Option 1: Deploy từ GitHub (Khuyến nghị)

1. Push code lên GitHub
2. Truy cập [Vercel Dashboard](https://vercel.com/new)
3. Click **Import Project**
4. Chọn repository
5. Vercel tự động detect Next.js
6. Thêm Environment Variables (nếu chưa có):
   - `BLOB_READ_WRITE_TOKEN`
   - `ADMIN_PASSWORD`
7. Click **Deploy**

### Option 2: Deploy bằng CLI

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

## ✅ Bước 5: Kiểm Tra

Sau khi deploy:

1. Truy cập `https://your-domain.vercel.app/admin/login`
2. Đăng nhập với mật khẩu đã set
3. Test upload hình ảnh
4. Test CRUD products/blog

## 🔐 Security

### Đổi Admin Password

Trước khi deploy production, đổi mật khẩu:

1. Tạo environment variable `ADMIN_PASSWORD` trong Vercel
2. Hoặc sửa `lib/adminAuth.js`:

```javascript
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
```

### API Authentication

Tất cả API routes đều có authentication check.

## 📊 Lưu Trữ Dữ Liệu

### Hình Ảnh
- Lưu trên **Vercel Blob Storage**
- Tự động optimize
- CDN delivery

### Products/Blog
- Hiện tại lưu trong file system (`data/products.js`)
- Có thể nâng cấp lên Vercel Postgres sau

## 💰 Pricing

### Vercel (Free Tier)
- ✅ Unlimited bandwidth
- ✅ 100GB storage
- ✅ Automatic deployments
- ✅ CDN included

### Vercel Blob
- ✅ Free: 1GB storage
- ✅ $0.15/GB/month sau đó
- ✅ Unlimited bandwidth

## 🔧 Troubleshooting

### Lỗi "BLOB_READ_WRITE_TOKEN is not defined"

- Kiểm tra environment variables trong Vercel
- Đảm bảo đã set trong Settings > Environment Variables
- Redeploy sau khi thêm env vars

### Upload không hoạt động

- Kiểm tra token có đúng không
- Kiểm tra Blob store đã tạo chưa
- Xem logs trong Vercel Dashboard

### Build failed

**Nếu gặp lỗi:** `Node.js Version "18.x" is discontinued`

**Giải pháp:**
1. ✅ Đảm bảo `package.json` có `"engines": { "node": "22.x" }`
2. ✅ Vào Vercel Dashboard > **Settings** > **General** > **Node.js Version** = `22.x` (hoặc `Auto`)
3. ✅ Redeploy project

**Hoặc nếu vẫn lỗi:**
- Xóa project trên Vercel và import lại
- Vercel sẽ tự động đọc `engines.node` từ `package.json`

- Kiểm tra Node.js version (cần 22+)
- Xem build logs trong Vercel Dashboard

## 📝 Next Steps

Sau khi deploy thành công:

1. ✅ Test upload hình ảnh
2. ✅ Test CRUD products/blog
3. ✅ Đổi admin password
4. ✅ Setup custom domain (nếu có)
5. ✅ Enable analytics (nếu cần)

## 🎉 Hoàn Thành!

Bây giờ bạn có:
- ✅ Upload file thực sự lên Vercel Blob
- ✅ API routes cho CRUD operations
- ✅ Authentication cho admin
- ✅ Dashboard quản lý đầy đủ

---

**Lưu ý:** Với static export (Netlify), bạn cần commit file vào Git. Với Vercel + API routes, bạn có thể upload trực tiếp qua dashboard!
