# 📸 Hướng Dẫn Sử Dụng Image Components

Dự án Seoul Kimchi đã có 4 component chuyên dụng để hiển thị hình ảnh cho các mục đích khác nhau.

## 📦 Components

### 1. `ProductImage.js` - Hình ảnh Sản phẩm

Component dùng để hiển thị hình ảnh sản phẩm với badge, overlay và hiệu ứng hover.

**Cách sử dụng:**
```jsx
import ProductImage from '../components/ProductImage';

<ProductImage
  src="/image/products/kimchi-cabbage-jar.png"
  alt="Kim Chi Cải Thảo"
  badge="Bán Chạy"
  priority={false}
  showOverlay={true}
/>
```

**Props:**
- `src` (required): Đường dẫn đến hình ảnh
- `alt` (optional): Text mô tả hình ảnh (mặc định: 'Sản phẩm Seoul Kimchi')
- `badge` (optional): Text badge hiển thị trên ảnh (vd: 'Bán Chạy', 'Mới')
- `priority` (optional): true để load ảnh ngay, false để lazy load (mặc định: false)
- `className` (optional): CSS class tùy chỉnh
- `style` (optional): Inline styles
- `showOverlay` (optional): Hiển thị overlay "Giao hàng nhanh" khi hover (mặc định: true)
- `onHover` (optional): Callback function khi hover

**Thư mục ảnh:** `public/image/products/` (đường dẫn trong code: `/image/products/`)

---

### 2. `BlogImage.js` - Hình ảnh Blog

Component dùng để hiển thị hình ảnh trong blog posts, hỗ trợ cả thumbnail và full-size.

**Cách sử dụng:**
```jsx
import BlogImage from '../components/BlogImage';

// Thumbnail trong danh sách blog
<BlogImage
  src="/image/blog/kimchi-health-benefits.jpg"
  alt="Lợi ích sức khỏe của Kimchi"
  thumbnail={true}
/>

// Ảnh full-size trong bài viết
<BlogImage
  src="/image/blog/kimchi-recipe.jpg"
  alt="Công thức làm Kimchi"
  priority={true}
/>
```

**Props:**
- `src` (required): Đường dẫn đến hình ảnh
- `alt` (optional): Text mô tả hình ảnh (mặc định: 'Blog Seoul Kimchi')
- `priority` (optional): true để load ảnh ngay (mặc định: false)
- `thumbnail` (optional): true cho thumbnail, false cho full-size (mặc định: false)
- `className` (optional): CSS class tùy chỉnh
- `style` (optional): Inline styles

**Thư mục ảnh:** `public/image/blog/` (đường dẫn trong code: `/image/blog/`)

---

### 3. `CertificateImage.js` - Hình ảnh Chứng chỉ

Component dùng để hiển thị hình ảnh chứng nhận/chứng chỉ với khả năng download.

**Cách sử dụng:**
```jsx
import CertificateImage from '../components/CertificateImage';

<CertificateImage
  src="/image/certificates/haccp-certificate.jpg"
  alt="Chứng nhận HACCP"
  title="HACCP CODEX 2020"
  downloadable={true}
  priority={false}
/>
```

**Props:**
- `src` (required): Đường dẫn đến hình ảnh chứng chỉ
- `alt` (optional): Text mô tả (mặc định: 'Chứng nhận Seoul Kimchi')
- `title` (optional): Tiêu đề hiển thị dưới ảnh
- `priority` (optional): true để load ảnh ngay (mặc định: false)
- `downloadable` (optional): Hiển thị nút download (mặc định: false)
- `className` (optional): CSS class tùy chỉnh
- `style` (optional): Inline styles

**Thư mục ảnh:** `public/image/certificates/` (đường dẫn trong code: `/image/certificates/`)

---

### 4. `ProcessImage.js` - Hình ảnh Quy trình

Component dùng để hiển thị hình ảnh quy trình sản xuất với số bước và tiêu đề.

**Cách sử dụng:**
```jsx
import ProcessImage from '../components/ProcessImage';

<ProcessImage
  src="/image/process/prepare-ingredients.jpg"
  alt="Chuẩn bị nguyên liệu"
  stepNumber="1"
  stepTitle="Chuẩn Bị Nguyên Liệu"
  orientation="landscape"
  priority={false}
/>
```

**Props:**
- `src` (required): Đường dẫn đến hình ảnh
- `alt` (optional): Text mô tả (mặc định: 'Quy trình sản xuất Seoul Kimchi')
- `stepNumber` (optional): Số bước hiển thị trên badge (vd: "1", "2")
- `stepTitle` (optional): Tiêu đề bước hiển thị dưới ảnh
- `priority` (optional): true để load ảnh ngay (mặc định: false)
- `orientation` (optional): 'landscape' (16:9) hoặc 'portrait' (2:3) (mặc định: 'landscape')
- `className` (optional): CSS class tùy chỉnh
- `style` (optional): Inline styles

**Thư mục ảnh:** `public/image/process/` hoặc `public/image/backgrounds/` (đường dẫn trong code: `/image/process/` hoặc `/image/backgrounds/`)

---

## 🎨 Tính năng chung

Tất cả các component đều có:
- ✅ **Lazy loading**: Tự động lazy load ảnh (trừ khi `priority={true}`)
- ✅ **Error handling**: Hiển thị placeholder đẹp khi ảnh không tải được
- ✅ **Hover effects**: Hiệu ứng hover mượt mà
- ✅ **Responsive**: Tự động responsive trên mọi thiết bị
- ✅ **Accessibility**: Hỗ trợ alt text và aria labels

## 📁 Cấu trúc thư mục ảnh

**⚠️ QUAN TRỌNG:** Tất cả hình ảnh được lưu trong `public/image/` (không phải `image/` ở root)

```
public/image/
├── banners/           # Banner website
│   ├── home-banner-1.jpg
│   ├── products-banner.jpg
│   └── ...
├── products/          # Ảnh sản phẩm
│   ├── kimchi-cabbage-jar.png
│   ├── kimchi-radish.png
│   └── ...
├── blog/              # Ảnh blog
│   ├── kimchi-health.jpg
│   └── ...
├── certificates/      # Ảnh chứng chỉ
│   ├── haccp-cert.jpg
│   └── ...
├── process/           # Ảnh quy trình
│   ├── step-1.jpg
│   └── ...
├── icons/             # Icons & favicon
│   ├── logo-seoul-kimchi.png
│   └── ...
└── backgrounds/       # Hình nền
    ├── kimchi-making-process.png
    └── ...
```

**📖 Xem hướng dẫn chi tiết:** `public/image/README.md`

## 💡 Ví dụ sử dụng trong Pages

### Trong `pages/products.js`:
```jsx
import ProductImage from '../components/ProductImage';

{products.map((product) => (
  <article className="product-card">
    <ProductImage
      src={product.image}
      alt={product.name}
      badge={product.badge}
    />
    {/* ... */}
  </article>
))}
```

### Trong `pages/blog.js`:
```jsx
import BlogImage from '../components/BlogImage';

<BlogImage
  src="/image/blog/post-image.jpg"
  alt="Tiêu đề bài viết"
  thumbnail={true}
/>
```

### Trong `pages/certifications.js`:
```jsx
import CertificateImage from '../components/CertificateImage';

<CertificateImage
  src="/image/certificates/haccp.jpg"
  alt="Chứng nhận HACCP"
  title="HACCP CODEX 2020"
  downloadable={true}
/>
```

### Trong `pages/process.js`:
```jsx
import ProcessImage from '../components/ProcessImage';

<ProcessImage
  src="/image/process/step-1.jpg"
  alt="Bước 1: Chuẩn bị nguyên liệu"
  stepNumber="1"
  stepTitle="Chuẩn Bị Nguyên Liệu"
/>
```

---

## 🔧 Tùy chỉnh

Bạn có thể tùy chỉnh style bằng:
- `className`: Thêm CSS classes
- `style`: Inline styles (object)
- Sửa trực tiếp trong component nếu cần thay đổi toàn bộ

