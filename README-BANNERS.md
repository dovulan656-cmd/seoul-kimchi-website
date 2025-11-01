# 📸 HƯỚNG DẪN THÊM BANNER VÀO WEBSITE

## 📁 Vị Trí Đặt File Banner

Đặt các file banner vào thư mục:
```
public/image/banners/
```

## 📋 Danh Sách Banner Cần Có

### 1. Homepage (`pages/index.js`)
- **`home-banner-1.jpg`** - Banner chính ở đầu trang (104x85cm hoặc 78x100cm)
- **`home-banner-2.jpg`** - Banner sản phẩm đa dạng (335x101cm)
- **`home-banner-3.jpg`** - Banner showcase kimchi (78x100cm)
- **`export-banner.jpg`** - Banner xuất khẩu/bán sỉ (78x100cm - Export theme)

### 2. Products Page (`pages/products.js`)
- **`products-banner.jpg`** - Banner đầu trang sản phẩm (104x97cm)
- **`products-benefits-banner.jpg`** - Banner lợi ích sức khỏe (78x100cm với thông tin benefits)

### 3. Blog Page (`pages/blog.js`)
- **`blog-banner.jpg`** - Banner đầu trang blog (tùy chọn)

## 🎨 Kích Thước Khuyến Nghị

Để tối ưu cho web, nên resize banner về:
- **Width:** 1200px - 1400px (tối đa)
- **Height:** Auto (giữ tỉ lệ)
- **Format:** JPG (cho ảnh phức tạp) hoặc WebP (cho tối ưu)
- **Quality:** 80-85% (cân bằng chất lượng và kích thước file)

## 📝 Cách Thêm Banner

1. **Đổi tên file banner theo đúng tên trong code:**
   - `home-banner-1.jpg`
   - `home-banner-2.jpg`
   - `home-banner-3.jpg`
   - `export-banner.jpg`
   - `products-banner.jpg`
   - `products-benefits-banner.jpg`
   - `blog-banner.jpg`

2. **Copy vào thư mục:**
   ```
   public/image/banners/
   ```

3. **Refresh browser** để xem banner mới

## 🔧 Tùy Chỉnh Banner

Nếu muốn thay đổi banner, chỉnh sửa trong:
- `pages/index.js` - Homepage banners
- `pages/products.js` - Products page banners
- `pages/blog.js` - Blog page banner

Thay đổi đường dẫn `src` trong component `<Banner>`:

```jsx
<Banner 
  src="/image/banners/ten-file-moi.jpg"
  alt="Mô tả banner"
/>
```

## 📐 Responsive

Banner component tự động:
- ✅ Responsive với mọi kích thước màn hình
- ✅ Lazy loading (trừ banner đầu tiên)
- ✅ Tối ưu hiển thị với border-radius và shadow

## 🎯 Lưu Ý

- Banner sẽ tự động fit vào container (max-width: 1200px)
- Giữ tỉ lệ ảnh gốc để hiển thị đẹp
- File size nên < 500KB để load nhanh

