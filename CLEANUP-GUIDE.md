# 🧹 HƯỚNG DẪN DỌN DẸP CODEBASE

## ✅ Đã Xử Lý

### 1. **Hardcoded Values** - ✅ Đã fix
- **File mới**: `lib/config.js` - Centralized configuration
- **Đã refactor**: `components/Layout.js` - Sử dụng `GA_ID` từ config
- **Cách dùng**: Import từ `lib/config.js` cho tất cả constants

### 2. **Error Boundary** - ✅ Đã fix
- **File mới**: `components/ErrorBoundary.js` - React Error Boundary
- **Đã tích hợp**: `pages/_app.js` - Wrap toàn bộ app
- **Tính năng**: 
  - Hiển thị UI lỗi thân thiện
  - Reload button
  - Link về trang chủ
  - Chi tiết lỗi trong development mode

---

## 📋 Cần Xử Lý Thủ Công

### 1. **Image Folder Duplication**

**Vấn đề**: Có cả `image/` (root) và `public/image/`

**Kiểm tra**:
- `public/image/` - ✅ Đang được dùng bởi Next.js
- `image/` - ❓ Có thể là legacy từ Eleventy

**Giải pháp**:

**Bước 1**: Kiểm tra xem `image/` có đang được dùng không:
```bash
# Tìm references đến image/ (không phải public/image/)
grep -r "image/products" --exclude-dir=node_modules .
grep -r "image/icons" --exclude-dir=node_modules .
```

**Bước 2**: Nếu không còn dùng, có thể:
```bash
# Option 1: Xóa nếu chắc chắn không dùng
# rm -rf image/

# Option 2: Archive vào thư mục backup
# mkdir -p archive
# mv image archive/image-legacy
```

**Bước 3**: Đảm bảo tất cả ảnh đã ở trong `public/image/`:
- Đã có script `scripts/setup-image-folders.ps1` để copy
- Chạy lại nếu cần: `powershell -File scripts/setup-image-folders.ps1`

**Lưu ý**: 
- Chỉ xóa sau khi đã kiểm tra kỹ
- Backup trước khi xóa
- Đảm bảo không có reference nào đến `image/` trong code Next.js

---

### 2. **HTML Files (Eleventy Legacy)**

**Vấn đề**: Có nhiều `.html` files ở root (từ Eleventy)

**Files**:
- `index.html`
- `products.html`
- `blog.html`
- `contact.html`
- `about.html`
- `blog-post-*.html`

**Giải pháp**:

**Option A: Giữ lại (nếu cần fallback)**
- Nếu đang chạy cả Eleventy và Next.js
- Giữ để có static HTML fallback

**Option B: Archive (khuyên dùng)**
```bash
# Tạo thư mục archive
mkdir -p archive/eleventy-legacy

# Di chuyển HTML files
mv *.html archive/eleventy-legacy/
mv _includes archive/eleventy-legacy/
mv .eleventy.js archive/eleventy-legacy/
mv partials archive/eleventy-legacy/
```

**Option C: Xóa (nếu chắc chắn không dùng)**
- Chỉ xóa nếu hoàn toàn chuyển sang Next.js
- Backup trước khi xóa

**Kiểm tra**:
```bash
# Kiểm tra xem có reference nào đến HTML files không
grep -r "\.html" --exclude-dir=node_modules --exclude-dir=out --exclude-dir=archive .
```

---

### 3. **Refactor Phone Number và GA ID**

**Đã tạo**: `lib/config.js` với constants

**Cần refactor** trong các files:

1. **Components**:
   - `components/Header.js` - Thay hardcoded phone
   - `components/Footer.js` - Thay hardcoded phone
   - `components/ContactModal.js` - Thay hardcoded phone

2. **Pages**:
   - `pages/index.js` - Thay hardcoded phone
   - `pages/products.js` - Thay hardcoded phone
   - `pages/contact.js` - Thay hardcoded phone

3. **Lib**:
   - `lib/chatbot.js` - Thay hardcoded phone, email

**Cách refactor**:
```javascript
// Thay vì:
const phone = '034 4100 374';

// Dùng:
import { CONTACT, getPhoneLink } from '../lib/config';
// Sau đó dùng: CONTACT.phoneDisplay, getPhoneLink()
```

**Script để tìm tất cả occurrences**:
```bash
# Find all phone number occurrences
grep -rn "034.*4100.*374\|0344100374" --exclude-dir=node_modules .
```

---

## 🔄 Migration Script (Tùy chọn)

Tạo script để tự động refactor (nếu cần):

```javascript
// scripts/refactor-constants.js
// Có thể tạo script để tự động thay thế hardcoded values
// Tuy nhiên, nên làm thủ công để đảm bảo chính xác
```

---

## ✅ Checklist Dọn Dẹp

### Image Folder
- [ ] Kiểm tra references đến `image/` (không phải `public/image/`)
- [ ] Đảm bảo tất cả ảnh đã copy sang `public/image/`
- [ ] Backup thư mục `image/` cũ
- [ ] Xóa hoặc archive `image/` (nếu không dùng)

### HTML Files
- [ ] Kiểm tra references đến HTML files
- [ ] Quyết định: Giữ, Archive, hay Xóa
- [ ] Backup trước khi xóa
- [ ] Cập nhật documentation nếu cần

### Constants Refactoring
- [ ] Refactor `components/Header.js`
- [ ] Refactor `components/Footer.js`
- [ ] Refactor `components/ContactModal.js`
- [ ] Refactor `pages/index.js`
- [ ] Refactor `pages/products.js`
- [ ] Refactor `pages/contact.js`
- [ ] Refactor `lib/chatbot.js`
- [ ] Test tất cả pages sau khi refactor

---

## 📝 Notes

- **Không urgent**: Các vấn đề này không ảnh hưởng đến production
- **Có thể làm từng bước**: Không cần làm hết một lúc
- **Backup trước**: Luôn backup trước khi xóa files/folders
- **Test kỹ**: Test sau mỗi bước refactor

---

**Cập nhật**: Đã fix Error Boundary và Config constants. Còn image folder và HTML files cần quyết định thủ công.

