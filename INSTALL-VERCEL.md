# Cài Đặt Cho Vercel Deployment

## 📦 Packages Đã Cài Đặt

```bash
npm install @vercel/blob formidable
```

- `@vercel/blob` - Vercel Blob Storage để lưu file
- `formidable` - Xử lý file upload trong API routes

## 🔧 Cấu Hình

### 1. Next.js Config (`next.config.js`)

Đã bỏ `output: 'export'` để enable API routes:
```javascript
// Removed: output: 'export'
// Added: Vercel Blob domain to images.remotePatterns
```

### 2. Environment Variables

**Cần thêm trong Vercel Dashboard:**

1. `BLOB_READ_WRITE_TOKEN` - Token từ Vercel Blob Store
2. `ADMIN_PASSWORD` (optional) - Mật khẩu admin, mặc định: `admin123`

**Cách lấy BLOB_READ_WRITE_TOKEN:**

1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project > **Storage** tab
3. Tạo **Blob** store
4. Copy token từ store settings

### 3. API Routes

Đã tạo các API routes:

- `POST /api/images/upload` - Upload hình ảnh
- `DELETE /api/images/delete` - Xóa hình ảnh  
- `GET /api/products` - Lấy products
- `POST /api/products` - Thêm product
- `PUT /api/products` - Cập nhật product
- `DELETE /api/products` - Xóa product
- `GET /api/blog` - Lấy blog posts
- `POST /api/blog` - Thêm blog post
- `PUT /api/blog` - Cập nhật blog post
- `DELETE /api/blog` - Xóa blog post

## 🚀 Deploy Steps

### 1. Push Code Lên GitHub

```bash
git add .
git commit -m "Add Vercel API routes for upload"
git push
```

### 2. Deploy Trên Vercel

1. Vào [Vercel Dashboard](https://vercel.com/new)
2. Import GitHub repository
3. Add Environment Variables:
   - `BLOB_READ_WRITE_TOKEN` = `your_token`
   - `ADMIN_PASSWORD` = `your_password` (optional)
4. Click **Deploy**

### 3. Tạo Blob Store

Sau khi deploy lần đầu:

1. Vào project > **Storage** tab
2. Click **Create Database**
3. Chọn **Blob**
4. Đặt tên: `seoul-kimchi-images`
5. Copy **BLOB_READ_WRITE_TOKEN**
6. Vào **Settings** > **Environment Variables**
7. Thêm `BLOB_READ_WRITE_TOKEN`
8. Redeploy project

## ✅ Test

Sau khi deploy:

1. Truy cập `https://your-domain.vercel.app/admin/login`
2. Đăng nhập
3. Test upload hình ảnh
4. Test CRUD products/blog

## 🔐 Security Notes

- Tất cả API routes đều có authentication check
- Session được encode trong Authorization header
- Admin password nên đổi trước khi deploy production

## 📝 Files Changed

- `next.config.js` - Bỏ static export
- `package.json` - Thêm dependencies
- `lib/adminAuth.js` - Support env variables
- `lib/apiClient.js` - New API client
- `pages/api/` - New API routes

## ⚠️ Important

**Bạn cần:**

1. ✅ Tạo Vercel Blob Store
2. ✅ Add `BLOB_READ_WRITE_TOKEN` environment variable
3. ✅ (Optional) Add `ADMIN_PASSWORD` environment variable
4. ✅ Redeploy sau khi thêm env vars

Sau đó dashboard sẽ hoạt động với upload thực sự!
