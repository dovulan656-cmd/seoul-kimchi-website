# 🚀 HƯỚNG DẪN CHẠY PROJECT

## Bước 1: Mở PowerShell tại Root Directory

**QUAN TRỌNG:** Phải mở PowerShell tại thư mục gốc của project:
```
C:\Users\Admin\Documents\GitHub\seoul-kimchi-website
```

### Cách 1: Mở PowerShell rồi cd vào project
```powershell
cd C:\Users\Admin\Documents\GitHub\seoul-kimchi-website
```

### Cách 2: Mở trực tiếp từ File Explorer
1. Mở File Explorer
2. Đi đến: `C:\Users\Admin\Documents\GitHub\seoul-kimchi-website`
3. Click vào thanh địa chỉ, gõ: `powershell` và Enter
   (hoặc Shift + Right-click → "Open PowerShell window here")

## Bước 2: Cài Đặt Dependencies

Trong PowerShell, chạy:
```powershell
npm install
```

Chờ đến khi hoàn tất (sẽ tải về các packages: next, react, react-dom, etc.)

## Bước 3: Chạy Development Server

Sau khi `npm install` xong, chạy:
```powershell
npm run dev
```

Bạn sẽ thấy output như:
```
   ▲ Next.js 14.x.x
   - Local:        http://localhost:3000
   - Ready in xxx ms
```

## Bước 4: Mở Browser

Mở trình duyệt và vào: **http://localhost:3000**

---

## 📝 Các Lệnh Khác

### Build cho Production
```powershell
npm run build
```
Output sẽ ở trong folder `out/`

### Start Production Server (sau khi build)
```powershell
npm start
```

### Kiểm tra lỗi linting
```powershell
npm run lint
```

---

## ⚠️ Lưu Ý

1. **Phải chạy từ root directory** (nơi có file `package.json`)
2. **Node.js phải được cài đặt** (version 18.x theo package.json)
3. **Nếu gặp lỗi**, kiểm tra:
   - Đã `cd` vào đúng thư mục chưa?
   - Đã chạy `npm install` chưa?
   - Node.js version đúng chưa? (`node -v`)

---

## 🔍 Kiểm Tra Node Version

```powershell
node -v
```

Nên là version 18.x.x (ví dụ: v18.17.0)

Nếu không đúng, cài Node.js 18 từ: https://nodejs.org/

