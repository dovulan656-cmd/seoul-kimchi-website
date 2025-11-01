# 📸 HƯỚNG DẪN QUẢN LÝ HÌNH ẢNH - SEOUL KIMCHI

## 📁 Cấu Trúc Thư Mục

Tất cả hình ảnh của website được lưu tại thư mục `public/image/` với cấu trúc như sau:

```
public/image/
├── banners/           # Banner chính của website
│   ├── home-banner-1.jpg
│   ├── home-banner-2.jpg
│   ├── home-banner-3.jpg
│   ├── export-banner.jpg
│   ├── products-banner.jpg
│   ├── products-benefits-banner.jpg
│   └── blog-banner.jpg
│
├── products/          # Hình ảnh sản phẩm
│   ├── kimchi-cabbage-jar.png
│   ├── kimchi-radish.png
│   ├── kimchi-platter.png
│   ├── korean-spices.png
│   ├── tteokbokki-cheese.png
│   └── ...
│
├── blog/             # Hình ảnh blog posts
│   ├── kimchi-health-benefits.jpg
│   ├── kimchi-recipe.jpg
│   └── ...
│
├── certificates/     # Hình ảnh chứng chỉ/chứng nhận
│   ├── haccp-certificate.jpg
│   ├── food-safety-cert.jpg
│   └── ...
│
├── process/          # Hình ảnh quy trình sản xuất
│   ├── step-1-prepare.jpg
│   ├── step-2-salt.jpg
│   ├── step-3-rinse.jpg
│   ├── step-4-mix.jpg
│   ├── step-5-package.jpg
│   ├── step-6-ferment.jpg
│   └── ...
│
├── icons/            # Icons và favicon
│   ├── logo-seoul-kimchi.png
│   ├── favicon-32x32.svg
│   ├── favicon-16x16.svg
│   ├── icon-192x192.svg
│   ├── icon-512x512.svg
│   └── ...
│
└── backgrounds/      # Hình nền và pattern
    ├── kimchi-making-process.png
    ├── korean-pattern-bg.png
    └── ...
```

---

## 🚀 TỰ ĐỘNG TỐI ƯU VÀ NÂNG CẤP CHẤT LƯỢNG ẢNH

### ⚡ Tính Năng Tự Động

**✨ Hệ thống tự động tối ưu và nâng cấp chất lượng ảnh khi bạn thêm vào!**

Hệ thống sẽ tự động:
- ✅ **Resize** ảnh về kích thước tối ưu (tùy theo loại)
- ✅ **Nén** ảnh để giảm dung lượng (giảm 30-70% mà vẫn rõ nét)
- ✅ **Nâng cấp chất lượng**: Sharpening, tăng contrast, saturation
- ✅ **Chuyển đổi format**: Tự động tạo WebP (nếu phù hợp) + JPG fallback
- ✅ **Tối ưu riêng** cho từng loại ảnh (banner, sản phẩm, blog, v.v.)

### 📝 Cách Sử Dụng

#### 1️⃣ Chạy Tối Ưu Tất Cả Ảnh (Một Lần)

```bash
npm run optimize:all
```

Script sẽ tự động tối ưu tất cả ảnh trong `public/image/` theo cấu hình phù hợp.

#### 2️⃣ Tự Động Tối Ưu Khi Thêm Ảnh Mới (Watch Mode)

```bash
npm run optimize:watch
```

Script sẽ theo dõi thư mục và **tự động tối ưu** ngay khi bạn copy file ảnh mới vào.

**Lưu ý:** Để script chạy nền trong terminal riêng khi làm việc.

#### 3️⃣ Tối Ưu File Cụ Thể

```bash
npm run optimize:image public/image/products/my-image.jpg
```

### 🎨 Cấu Hình Tự Động Theo Loại Ảnh

| Loại Ảnh | Max Width | Quality | Format | Tính Năng Đặc Biệt |
|----------|-----------|---------|--------|-------------------|
| **Banners** | 1400px | 85% | JPEG | Progressive, MozJPEG |
| **Products** | 1200px | 90% | Auto | WebP + JPG, Tăng độ sáng |
| **Blog** | 1600px | 85% | Auto | WebP + JPG |
| **Certificates** | 1600px | 95% | Auto | Chất lượng cao để đọc rõ |
| **Process** | 1600px | 88% | Auto | WebP + JPG |
| **Icons** | 512px | 100% | Auto | Lossless, giữ nguyên format |
| **Backgrounds** | 2000px | 85% | Auto | WebP + JPG |

### 🔧 Tối Ưu Thủ Công

**Tính năng tự động tối ưu trong build đã được tắt.**

Để tối ưu ảnh, bạn cần chạy thủ công:
- `npm run optimize:all` - Tối ưu tất cả ảnh
- `npm run optimize:watch` - Tự động tối ưu khi thêm ảnh mới

---

## 🔄 CÁCH THAY THẾ HÌNH ẢNH

### 📋 Bước 1: Copy Ảnh Vào Thư Mục

**Không cần chuẩn bị gì - chỉ cần copy file vào!**

Hệ thống sẽ tự động:
1. Resize về kích thước phù hợp
2. Nén để giảm dung lượng
3. Nâng cấp chất lượng (sharpening, contrast, saturation)
4. Tạo WebP version (nếu phù hợp)

**Banner (banners/):**
- **Kích thước:** Width 1200px - 1400px (tối đa)
- **Định dạng:** JPG (cho ảnh phức tạp) hoặc WebP (tối ưu hơn)
- **Chất lượng:** 80-85%
- **Tỷ lệ:** Tùy theo loại banner (xem chi tiết bên dưới)

**Sản phẩm (products/):**
- **Kích thước:** 800px - 1200px (width)
- **Định dạng:** PNG (nền trong suốt) hoặc JPG
- **Tỷ lệ:** 4:3 hoặc 16:9
- **Nền:** Trong suốt hoặc nền trắng sạch

**Blog (blog/):**
- **Kích thước:** 1200px - 1600px (width)
- **Định dạng:** JPG hoặc WebP
- **Tỷ lệ:** 16:9 (landscape) hoặc 1:1 (square)

**Chứng chỉ (certificates/):**
- **Kích thước:** 1200px - 1600px (width)
- **Định dạng:** JPG hoặc PNG
- **Tỷ lệ:** 4:3 (khuyến nghị)

**Quy trình (process/):**
- **Kích thước:** 1200px - 1600px (width)
- **Định dạng:** JPG
- **Tỷ lệ:** 16:9 (landscape) hoặc 2:3 (portrait)

**Icons:**
- **Kích thước:** Theo yêu cầu (32x32, 192x192, 512x512...)
- **Định dạng:** SVG (khuyến nghị) hoặc PNG
- **Nền:** Trong suốt

#### 🛠️ Công Cụ Tối Ưu Hóa Ảnh

- **Online:** [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
- **Desktop:** Photoshop, GIMP, ImageOptim
- **Command line:** `imagemin`, `sharp`

---

### 📝 Bước 2: Đặt Tên File Đúng Chuẩn

**Quy tắc đặt tên:**
- ✅ Sử dụng chữ thường
- ✅ Dùng dấu gạch ngang `-` thay vì khoảng trắng
- ✅ Không dùng ký tự đặc biệt (trừ `-` và `_`)
- ✅ Định dạng: `.jpg`, `.png`, `.webp`, `.svg`

**Ví dụ tốt:**
- `kimchi-cabbage-jar.png` ✅
- `step-1-prepare-ingredients.jpg` ✅
- `haccp-certificate-2024.jpg` ✅

**Ví dụ sai:**
- `Kimchi Cabbage Jar.png` ❌ (có khoảng trắng và chữ hoa)
- `ảnh sản phẩm 1.jpg` ❌ (có dấu tiếng Việt)
- `image (1).jpg` ❌ (có ký tự đặc biệt)

---

### 📂 Bước 3: Chọn Thư Mục Phù Hợp

| Loại Ảnh | Thư Mục | Đường Dẫn Trong Code |
|----------|---------|---------------------|
| Banner trang chủ | `banners/` | `/image/banners/home-banner-1.jpg` |
| Ảnh sản phẩm | `products/` | `/image/products/kimchi-cabbage-jar.png` |
| Ảnh blog | `blog/` | `/image/blog/kimchi-health.jpg` |
| Chứng chỉ | `certificates/` | `/image/certificates/haccp-cert.jpg` |
| Quy trình | `process/` | `/image/process/step-1.jpg` |
| Icons | `icons/` | `/image/icons/logo-seoul-kimchi.png` |
| Hình nền | `backgrounds/` | `/image/backgrounds/kimchi-making.png` |

---

### 💾 Bước 4: Copy File Vào Thư Mục

**Cách 1: Sử dụng File Explorer (Windows)**
1. Mở thư mục chứa ảnh mới
2. Copy file (Ctrl+C)
3. Đi đến: `C:\Users\Admin\Documents\GitHub\seoul-kimchi-website\public\image\[thư mục phù hợp]`
4. Paste file (Ctrl+V)
5. Nếu thay thế file cũ, chọn "Replace" khi được hỏi

**Cách 2: Sử dụng Terminal/Command Line**
```bash
# Ví dụ: Copy ảnh sản phẩm mới
copy "C:\path\to\new-product.jpg" "public\image\products\kimchi-new-product.jpg"

# Hoặc di chuyển file
move "C:\path\to\new-product.jpg" "public\image\products\kimchi-new-product.jpg"
```

**Cách 3: Drag & Drop trong VS Code**
1. Mở VS Code
2. Kéo file ảnh vào thư mục phù hợp trong sidebar
3. Xác nhận copy

---

### 🔧 Bước 5: Cập Nhật Code (Nếu Cần)

#### Thay Banner

Nếu thay thế banner với **TÊN FILE MỚI**, cần cập nhật trong các file:

**Trang chủ (`pages/index.js`):**
```jsx
<Banner 
  src="/image/banners/ten-file-moi.jpg"  // ← Thay đổi ở đây
  alt="Banner mới"
/>
```

**Trang sản phẩm (`pages/products.js`):**
```jsx
<Banner 
  src="/image/banners/products-banner-moi.jpg"  // ← Thay đổi ở đây
  alt="Banner sản phẩm"
/>
```

#### Thay Ảnh Sản Phẩm

Nếu thay đổi tên file ảnh sản phẩm, cập nhật trong `data/products.js`:
```js
{
  id: 'kimchi-1',
  name: 'Kim Chi Cải Thảo',
  image: '/image/products/kimchi-cabbage-new.png',  // ← Thay đổi ở đây
  // ...
}
```

Hoặc trong component:
```jsx
<ProductImage
  src="/image/products/kimchi-cabbage-new.png"  // ← Thay đổi ở đây
  alt="Kim Chi Cải Thảo"
/>
```

#### Thay Ảnh Blog

```jsx
<BlogImage
  src="/image/blog/blog-post-new.jpg"  // ← Thay đổi ở đây
  alt="Bài viết mới"
/>
```

#### Thay Ảnh Chứng Chỉ

```jsx
<CertificateImage
  src="/image/certificates/certificate-new.jpg"  // ← Thay đổi ở đây
  alt="Chứng chỉ mới"
  title="HACCP 2024"
/>
```

#### Thay Ảnh Quy Trình

```jsx
<ProcessImage
  src="/image/process/step-1-new.jpg"  // ← Thay đổi ở đây
  alt="Bước 1"
  stepNumber="1"
  stepTitle="Chuẩn Bị Nguyên Liệu"
/>
```

---

### ⚠️ Lưu Ý Quan Trọng

#### ✅ Nếu Thay Thế File Cũ (Giữ Nguyên Tên)
- **Không cần** sửa code
- Chỉ cần copy file mới vào và **ghi đè** file cũ
- Refresh browser để xem kết quả

#### 🔄 Nếu Đổi Tên File
- **Phải** cập nhật đường dẫn trong code (xem Bước 5)
- Hoặc sử dụng tên file cũ cho file mới

#### 🗑️ Xóa File Không Dùng
- Nếu chắc chắn file không còn được sử dụng, có thể xóa để tiết kiệm dung lượng
- Kiểm tra trước bằng cách tìm tên file trong toàn bộ project

---

## 📋 DANH SÁCH FILE BANNER YÊU CẦU

### 🏠 Homepage (`pages/index.js`)
| Tên File | Kích Thước Khuyến Nghị | Vị Trí |
|----------|------------------------|--------|
| `home-banner-1.jpg` | 1200x850px | Banner chính đầu trang |
| `home-banner-2.jpg` | 1200x600px | Banner sản phẩm đa dạng |
| `home-banner-3.jpg` | 1200x850px | Banner showcase kimchi |
| `export-banner.jpg` | 1200x850px | Banner xuất khẩu/bán sỉ |

### 📦 Products Page (`pages/products.js`)
| Tên File | Kích Thước Khuyến Nghị | Vị Trí |
|----------|------------------------|--------|
| `products-banner.jpg` | 1200x900px | Banner đầu trang |
| `products-benefits-banner.jpg` | 1200x850px | Banner lợi ích sức khỏe |

### 📝 Blog Page (`pages/blog.js`)
| Tên File | Kích Thước Khuyến Nghị | Vị Trí |
|----------|------------------------|--------|
| `blog-banner.jpg` | 1200x600px | Banner đầu trang (tùy chọn) |

---

## 🎨 KIỂM TRA SAU KHI THAY ẢNH

1. **Build và chạy website:**
   ```bash
   npm run dev
   ```

2. **Kiểm tra trong browser:**
   - Mở trang có ảnh vừa thay
   - Nhấn Ctrl+F5 (hard refresh) để xóa cache
   - Kiểm tra ảnh có hiển thị đúng không
   - Kiểm tra trên mobile (responsive)

3. **Kiểm tra Console:**
   - Mở DevTools (F12)
   - Tab Console: Không có lỗi 404 cho file ảnh
   - Tab Network: File ảnh load thành công

4. **Kiểm tra Performance:**
   - Tab Network: File size hợp lý (< 500KB cho banner)
   - Tab Lighthouse: Score tốt cho Performance

---

## 🚀 TIPS & TRICKS

### 💡 Tối Ưu Hóa Nhanh

**Trước khi upload:**
- Resize về kích thước thực tế cần dùng
- Nén ảnh (TinyPNG, Squoosh)
- Chọn định dạng phù hợp:
  - **JPG:** Ảnh có nhiều màu, gradient
  - **PNG:** Ảnh có nền trong suốt, logo
  - **WebP:** Tốt nhất cho web (nếu browser hỗ trợ)

### 🔍 Tìm File Ảnh Đang Được Sử Dùng

**Sử dụng VS Code:**
1. Nhấn Ctrl+Shift+F (Find in Files)
2. Nhập tên file ảnh
3. Xem kết quả trong toàn bộ project

**Sử dụng Terminal:**
```bash
# Tìm file trong code
grep -r "image-name.jpg" .
```

### 📱 Test Responsive

Sau khi thay ảnh, kiểm tra trên:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

---

## ❓ FAQ

**Q: Tôi thay ảnh nhưng vẫn thấy ảnh cũ?**
A: Nhấn Ctrl+F5 để hard refresh, hoặc xóa browser cache.

**Q: Ảnh bị mờ/không sắc nét?**
A: Kiểm tra:
- Kích thước ảnh có đủ lớn không (>= kích thước hiển thị)
- Ảnh có bị nén quá nhiều không (giảm quality)
- Format ảnh có phù hợp không

**Q: Ảnh load chậm?**
A: 
- Giảm kích thước file (< 200KB)
- Sử dụng WebP format
- Enable lazy loading (đã có sẵn trong components)

**Q: Làm sao biết file ảnh nào đang được dùng?**
A: Sử dụng "Find in Files" (Ctrl+Shift+F) trong VS Code để tìm tên file.

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề khi thay ảnh:
1. Kiểm tra tên file có đúng không
2. Kiểm tra đường dẫn trong code có khớp không
3. Kiểm tra file có tồn tại trong thư mục đúng không
4. Xem Console (F12) để tìm lỗi cụ thể

---

**Lần cập nhật cuối:** $(date)

