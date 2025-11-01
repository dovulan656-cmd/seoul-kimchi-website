# 🤖 TỰ ĐỘNG TỐI ƯU VÀ NÂNG CẤP CHẤT LƯỢNG ẢNH

## 🎯 Tính Năng

Hệ thống tự động tối ưu và nâng cấp chất lượng hình ảnh khi bạn thêm vào thư mục `public/image/`.

### ✨ Những Gì Được Tự Động:

1. **Resize thông minh**
   - Tự động resize về kích thước tối ưu theo loại ảnh
   - Giữ nguyên tỷ lệ khung hình
   - Không làm méo ảnh

2. **Nén tối ưu**
   - Giảm dung lượng 30-70% mà vẫn rõ nét
   - Tự động chọn compression level phù hợp
   - Tối ưu theo format (JPEG, PNG, WebP)

3. **Nâng cấp chất lượng**
   - **Sharpening**: Tăng độ sắc nét nhẹ
   - **Contrast**: Tăng độ tương phản
   - **Saturation**: Tăng độ bão hòa màu (cho sản phẩm/banner)
   - **Brightness**: Điều chỉnh độ sáng phù hợp

4. **Format optimization**
   - Tự động tạo WebP version (nhỏ hơn 30-50%)
   - Giữ JPG/PNG làm fallback
   - Progressive JPEG cho banner

---

## 📋 Cấu Hình Theo Loại Ảnh

### 🎨 Banners
```javascript
{
  maxWidth: 1400,
  quality: 85,
  format: 'jpeg',
  progressive: true,
  mozjpeg: true
}
```
- **Chất lượng**: 85% (cân bằng tốt)
- **Format**: Progressive JPEG
- **Đặc biệt**: MozJPEG encoding

### 📦 Products
```javascript
{
  maxWidth: 1200,
  quality: 90,
  format: 'auto',
  // Tăng độ sáng và saturation
}
```
- **Chất lượng**: 90% (cao hơn để sản phẩm rõ)
- **Format**: Auto (WebP + JPG)
- **Enhancement**: +5% brightness, +10% saturation

### 📝 Blog
```javascript
{
  maxWidth: 1600,
  quality: 85,
  format: 'auto'
}
```
- **Chất lượng**: 85%
- **Format**: Auto (WebP + JPG)

### 🏆 Certificates
```javascript
{
  maxWidth: 1600,
  quality: 95,
  format: 'auto'
}
```
- **Chất lượng**: 95% (cao nhất để đọc rõ chữ)
- **Format**: Auto

### ⚙️ Process
```javascript
{
  maxWidth: 1600,
  quality: 88,
  format: 'auto'
}
```
- **Chất lượng**: 88%

### 🎯 Icons
```javascript
{
  maxWidth: 512,
  quality: 100,
  format: 'auto',
  lossless: true
}
```
- **Chất lượng**: 100% (lossless)
- **Format**: Giữ nguyên (SVG/PNG)

### 🖼️ Backgrounds
```javascript
{
  maxWidth: 2000,
  quality: 85,
  format: 'auto'
}
```
- **Max width**: 2000px (lớn hơn vì là background)

---

## 🚀 Cách Sử Dụng

### 1. Tối Ưu Tất Cả Ảnh Hiện Có

```bash
npm run optimize:all
```

Script sẽ:
- Quét toàn bộ thư mục `public/image/`
- Tối ưu từng file theo cấu hình phù hợp
- Hiển thị thống kê (kích thước trước/sau, % giảm)

**Ví dụ output:**
```
🔄 Đang tối ưu: public/image/products/kimchi.jpg
   Loại: products, Kích thước: 1245.32 KB
   📐 Resize từ 3000x2000 về max 1200px
   ✅ Hoàn tất: kimchi.jpg
   📊 245.67 KB (giảm 80.3%)
```

### 2. Tự Động Tối Ưu Khi Thêm Ảnh Mới (Watch Mode)

```bash
npm run optimize:watch
```

Script sẽ:
- Theo dõi thư mục `public/image/`
- Tự động tối ưu khi phát hiện file mới
- Chạy nền liên tục

**Cách dùng:**
1. Mở terminal riêng
2. Chạy `npm run optimize:watch`
3. Copy file ảnh vào thư mục
4. Script tự động tối ưu!

**Ví dụ output:**
```
👀 Đang theo dõi thư mục: public/image
📸 Ảnh mới sẽ được tự động tối ưu...

📥 Phát hiện file mới: products/new-product.jpg
🔄 Đang tối ưu: public/image/products/new-product.jpg
   ✅ Đã tối ưu xong!
```

### 3. Tối Ưu File Cụ Thể

```bash
npm run optimize:image public/image/products/my-image.jpg
```

### 4. Tự Động Trong Build

**Không cần làm gì!** 

Khi chạy `npm run build`, script sẽ tự động tối ưu tất cả ảnh trước khi build.

---

## 📊 Kết Quả

### Trước Khi Tối Ưu:
- File: `kimchi.jpg` (3000x2000px, 2.5 MB)
- Load time: ~5 giây (3G)
- Quality: Tốt nhưng quá lớn

### Sau Khi Tối Ưu:
- File: `kimchi.jpg` (1200x800px, 245 KB) 
- File: `kimchi.webp` (1200x800px, 180 KB) - tự động tạo
- Load time: ~0.8 giây (3G)
- Quality: Rõ nét, tối ưu
- **Giảm**: 92% dung lượng!

---

## ⚙️ Cấu Hình Nâng Cao

### Thay Đổi Cấu Hình

Chỉnh sửa `scripts/optimize-image.js`:

```javascript
const optimizationConfig = {
  products: {
    maxWidth: 1200,    // Thay đổi kích thước
    quality: 90,       // Thay đổi chất lượng (1-100)
    format: 'auto',    // 'auto', 'jpeg', 'png', 'webp'
    // ...
  }
};
```

### Tắt Tự Động Trong Build

Nếu không muốn tự động optimize khi build, chỉnh `package.json`:

```json
{
  "scripts": {
    "build": "next build"  // Bỏ "npm run optimize:all &&"
  }
}
```

---

## 🔍 Kiểm Tra

### Xem Kích Thước File

Sau khi optimize, kiểm tra:
- File size giảm đáng kể
- Chất lượng vẫn tốt (so sánh bằng mắt)
- WebP version được tạo (nếu phù hợp)

### Debug

Nếu gặp lỗi, kiểm tra:
1. Đã cài `sharp`: `npm install`
2. File có đúng format không (.jpg, .png, .webp)
3. Có đủ quyền ghi file không

---

## 💡 Tips

1. **Chạy watch mode khi làm việc**
   - Mở terminal riêng với `npm run optimize:watch`
   - Copy ảnh vào là tự động optimize

2. **Backup file gốc** (nếu cần)
   - Copy file gốc ra nơi khác trước khi optimize
   - Hoặc sử dụng `optimize:image` với option backup

3. **Kiểm tra trên mobile**
   - Sau khi optimize, test trên mobile
   - Đảm bảo ảnh vẫn rõ và load nhanh

---

## ❓ FAQ

**Q: File có bị thay thế không?**
A: Có, file gốc sẽ được thay thế bằng file đã optimize. Nếu muốn giữ bản gốc, backup trước.

**Q: Tại sao file nhỏ hơn nhưng vẫn rõ?**
A: Do thuật toán compression thông minh và format WebP hiệu quả hơn JPEG/PNG.

**Q: Có thể tối ưu SVG không?**
A: Không, SVG đã là vector format tối ưu rồi. Script sẽ bỏ qua file SVG.

**Q: Mất bao lâu để optimize?**
A: Tùy số lượng và kích thước file. Thường 1-5 giây/file.

---

**Lần cập nhật:** Script tự động tối ưu đã được tích hợp vào hệ thống!

