# 🚀 HƯỚNG DẪN NHANH - THAY HÌNH ẢNH

## ⚡ 2 Bước Đơn Giản (Tự Động Tối Ưu!)

### ✨ **Tin Tốt:** Hệ thống tự động tối ưu và nâng cấp chất lượng ảnh!

Bạn chỉ cần copy file vào - hệ thống sẽ tự động:
- Resize về kích thước tối ưu
- Nén để giảm dung lượng (30-70%)
- Nâng cấp chất lượng (sharpening, contrast, saturation)
- Tạo WebP version (nếu phù hợp)

### 1️⃣ Copy Ảnh Vào Thư Mục
- **Không cần resize** - hệ thống tự động resize
- **Không cần nén** - hệ thống tự động nén
- Đặt tên file: chữ thường, dùng dấu gạch ngang (ví dụ: `kimchi-cabbage.jpg`)

### 2️⃣ Tối Ưu Ảnh (Tự Động)

**Cách 1: Tối ưu ngay sau khi copy:**
```bash
npm run optimize:all
```

**Cách 2: Tự động tối ưu khi thêm ảnh mới (khuyên dùng):**
```bash
npm run optimize:watch
```
Mở terminal riêng, chạy lệnh trên, sau đó copy ảnh - sẽ tự động tối ưu!

**Lưu ý:** Khi chạy `npm run build`, ảnh sẽ tự động được tối ưu.

### 3️⃣ Nếu Đổi Tên File → Cập Nhật Code

**Tìm file có chứa đường dẫn ảnh:**
- Nhấn `Ctrl+Shift+F` trong VS Code
- Tìm tên file cũ
- Thay bằng tên file mới

**Ví dụ:**
```jsx
// Cũ
src="/image/products/kimchi-old.png"

// Mới
src="/image/products/kimchi-new.png"
```

---

## ✅ Checklist

- [ ] File đã copy vào đúng thư mục
- [ ] Đã chạy `npm run optimize:all` hoặc `optimize:watch`
- [ ] Tên file đúng chuẩn (chữ thường, dấu gạch ngang)
- [ ] Nếu đổi tên → đã cập nhật code
- [ ] Refresh browser (Ctrl+F5)
- [ ] Kiểm tra trên mobile

**✨ Lưu ý:** Không cần resize/nén thủ công - hệ thống tự động làm!

---

## 📋 Đường Dẫn Thường Dùng

| Vị Trí | Đường Dẫn Code |
|--------|---------------|
| Banner trang chủ | `/image/banners/home-banner-1.jpg` |
| Ảnh sản phẩm | `/image/products/kimchi-cabbage.png` |
| Ảnh blog | `/image/blog/post-image.jpg` |
| Chứng chỉ | `/image/certificates/haccp-cert.jpg` |
| Quy trình | `/image/process/step-1.jpg` |

---

## ⚠️ Lưu Ý

**Nếu thay file cùng tên:**
- ✅ Không cần sửa code
- Chỉ copy file mới vào là xong

**Nếu đổi tên file:**
- ⚠️ Phải cập nhật code (tìm và thay đường dẫn)

---

📖 **Xem hướng dẫn chi tiết:** [README.md](./README.md)

