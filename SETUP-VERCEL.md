# 🚀 Setup Vercel Deployment với Upload Thực Sự

## ✅ Đã Cài Đặt

### Packages

```bash
✅ @vercel/blob - Vercel Blob Storage
✅ formidable - File upload handling
```

### Files Created

```
✅ pages/api/images/upload.js - Upload hình ảnh
✅ pages/api/images/delete.js - Xóa hình ảnh
✅ pages/api/products/index.js - CRUD products
✅ pages/api/blog/index.js - CRUD blog posts
✅ lib/apiClient.js - API client helper
✅ lib/adminAuth.js - Updated với env support
✅ next.config.js - Bỏ static export
✅ VERCEL-DEPLOY.md - Hướng dẫn chi tiết
✅ INSTALL-VERCEL.md - Quick setup guide
```

## 📋 Checklist Trước Khi Deploy

### 1. Tạo Vercel Blob Store

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project > **Storage** tab
3. Click **Create Database** > Chọn **Blob**
4. Đặt tên: `seoul-kimchi-images`
5. Copy **BLOB_READ_WRITE_TOKEN**

### 2. Thêm Environment Variables

Trong Vercel Dashboard > **Settings** > **Environment Variables**:

```
✅ BLOB_READ_WRITE_TOKEN = <token từ Blob store>
✅ ADMIN_PASSWORD = <mật khẩu admin> (optional, mặc định: admin123)
```

### 3. Deploy

```bash
# Option 1: Push lên GitHub và deploy qua Vercel Dashboard
git add .
git commit -m "Setup Vercel API routes"
git push

# Option 2: Deploy trực tiếp
vercel --prod
```

## 🎯 Cách Sử Dụng Sau Khi Deploy

### Upload Hình Ảnh

1. Đăng nhập `/admin/login`
2. Vào `/admin/images`
3. Chọn folder (products, banners, blog, etc.)
4. Click **Upload Hình Ảnh**
5. Chọn file và upload
6. Hình ảnh sẽ được lưu trên Vercel Blob Storage

### Quản Lý Products/Blog

1. Vào `/admin/products` hoặc `/admin/blog`
2. Thêm/Sửa/Xóa trực tiếp
3. Dữ liệu được lưu vào `data/products.js` hoặc `data/blog.js`
4. Tự động sync khi deploy

## 🔧 Cấu Trúc API

### Images API

- `POST /api/images/upload` - Upload file
  - Body: FormData với `file` và `folder`
  - Response: `{ url, pathname, size, uploadedAt }`

- `DELETE /api/images/delete?url=...` - Xóa file
  - Query: `url` (blob URL)
  - Response: `{ success: true }`

### Products API

- `GET /api/products` - Lấy danh sách
- `POST /api/products` - Thêm mới (body: product object)
- `PUT /api/products` - Cập nhật (body: product object với id)
- `DELETE /api/products?id=...` - Xóa (query: id)

### Blog API

- `GET /api/blog` - Lấy danh sách
- `POST /api/blog` - Thêm mới (body: post object)
- `PUT /api/blog` - Cập nhật (body: post object với id)
- `DELETE /api/blog?id=...` - Xóa (query: id)

## ⚠️ Lưu Ý Quan Trọng

1. **BLOB_READ_WRITE_TOKEN** là bắt buộc
   - Không có token = Upload không hoạt động
   - Thêm trong Vercel Environment Variables
   - Redeploy sau khi thêm

2. **Authentication**
   - Tất cả API routes đều check authentication
   - Session được encode trong Authorization header
   - Admin password nên đổi trước khi deploy production

3. **File Storage**
   - Hình ảnh lưu trên Vercel Blob (không phải Git)
   - Products/Blog lưu trong file system (sync với Git)
   - Cần commit thay đổi để sync

4. **Build Success**
   - ✅ API routes được build thành Dynamic routes (ƒ)
   - ✅ Pages vẫn static (○)
   - ✅ Ready for Vercel deployment

## 🎉 Kết Quả

Sau khi setup đúng:

- ✅ Upload hình ảnh thực sự lên Vercel Blob
- ✅ Xóa hình ảnh từ Vercel Blob
- ✅ CRUD products/blog qua API
- ✅ Dashboard hoạt động đầy đủ
- ✅ Authentication đảm bảo an toàn

---

**Xem chi tiết:** `VERCEL-DEPLOY.md`
