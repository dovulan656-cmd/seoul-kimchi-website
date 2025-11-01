# 📝 Deployment Notes

## 🚀 Vercel Deployment (Recommended)

**Website đã được cấu hình cho Vercel với API routes và upload thực sự.**

### Setup:
1. ✅ Bỏ `output: 'export'` trong `next.config.js` (để enable API routes)
2. ✅ API routes đã được tạo cho upload/CRUD
3. ✅ Vercel Blob Storage integration
4. ✅ Node.js 22.x

### Deploy:
- Push lên GitHub
- Import vào Vercel Dashboard
- Add Environment Variables (BLOB_READ_WRITE_TOKEN, ADMIN_PASSWORD)
- Deploy!

**Xem chi tiết:** `VERCEL-DEPLOY.md` và `SETUP-VERCEL.md`

---

## ⚠️ Netlify Deployment

**Website hiện tại KHÔNG tương thích với Netlify static export.**

### Vấn đề:
- Website đã bỏ `output: 'export'` để enable API routes cho Vercel
- Khi bỏ `output: 'export'`, Next.js không tạo folder `out/` nữa
- Netlify đang cấu hình `publish = "out"` nhưng folder này không tồn tại
- **Error:** `Deploy directory 'out' does not exist`

### ✅ Đã Fix:

1. ✅ Tạo `next.config.netlify.js` - Config riêng cho Netlify với `output: 'export'`
2. ✅ Tạo script `build:netlify` - Build với config riêng
3. ✅ Update `netlify.toml` - Sử dụng `build:netlify` và `publish = "out"`

### Cách Sử Dụng:

#### Nếu Deploy Lên Vercel (Khuyến nghị):
- **Bỏ qua hoặc xóa `netlify.toml`**
- Website sẽ build và deploy trên Vercel
- API routes và upload hoạt động đầy đủ

#### Nếu Deploy Static Lên Netlify:

1. Build với config riêng:
```bash
npm run build:netlify
```

2. Deploy folder `out/` lên Netlify

3. Hoặc để Netlify tự động:
   - Netlify sẽ chạy `npm run build:netlify`
   - Publish folder `out/`

**⚠️ Lưu ý:** 
- Với static export, API routes và upload **KHÔNG hoạt động**
- Chỉ có thể deploy static HTML/CSS/JS
- Admin dashboard sẽ chỉ hoạt động với localStorage (không có API)

---

## 📋 Recommendation

### ✅ Khuyến nghị: **Chỉ deploy lên Vercel**

**Vercel hỗ trợ:**
- ✅ Next.js API routes native
- ✅ Serverless functions
- ✅ Vercel Blob Storage integration
- ✅ Upload file thực sự
- ✅ CRUD operations qua API
- ✅ Admin dashboard đầy đủ tính năng

**Netlify static export:**
- ✅ Static HTML/CSS/JS
- ✅ CDN delivery
- ❌ API routes (cần serverless functions riêng)
- ❌ Upload file thực sự
- ❌ Dynamic server-side operations
- ❌ Admin dashboard API

---

## 🎯 Kết Luận

**Nếu bạn muốn:**
- ✅ Upload hình ảnh thực sự → **Deploy lên Vercel**
- ✅ API routes hoạt động → **Deploy lên Vercel**
- ✅ Admin dashboard đầy đủ → **Deploy lên Vercel**

**Nếu bạn chỉ cần:**
- ✅ Static website → **Có thể deploy lên Netlify** (nhưng mất API routes)
- ✅ Chỉ xem website → **Cả 2 đều được**

**Khuyến nghị cuối:** Nếu đã setup Vercel với upload, chỉ cần deploy lên Vercel. Bỏ hoặc comment `netlify.toml` nếu không dùng.
