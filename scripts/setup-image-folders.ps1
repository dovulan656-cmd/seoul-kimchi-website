# Script tạo cấu trúc thư mục image và di chuyển file
# Chạy: .\scripts\setup-image-folders.ps1

Write-Host "📸 Thiết lập cấu trúc thư mục hình ảnh..." -ForegroundColor Cyan

$basePath = Join-Path $PSScriptRoot ".."
$publicImagePath = Join-Path $basePath "public\image"
$oldImagePath = Join-Path $basePath "image"

# Tạo các thư mục cần thiết
$folders = @("banners", "products", "blog", "certificates", "process", "icons", "backgrounds")

foreach ($folder in $folders) {
    $folderPath = Join-Path $publicImagePath $folder
    if (-not (Test-Path $folderPath)) {
        New-Item -ItemType Directory -Path $folderPath -Force | Out-Null
        Write-Host "✅ Đã tạo thư mục: $folder" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  Thư mục đã tồn tại: $folder" -ForegroundColor Yellow
    }
}

# Di chuyển file từ image/ sang public/image/ (nếu có)
Write-Host "`n🔄 Kiểm tra và di chuyển file từ image/ sang public/image/..." -ForegroundColor Cyan

if (Test-Path $oldImagePath) {
    $mapping = @{
        "products" = "products"
        "icons" = "icons"
        "backgrounds" = "backgrounds"
    }
    
    foreach ($key in $mapping.Keys) {
        $sourcePath = Join-Path $oldImagePath $key
        $destPath = Join-Path $publicImagePath $mapping[$key]
        
        if (Test-Path $sourcePath) {
            $files = Get-ChildItem -Path $sourcePath -File -ErrorAction SilentlyContinue
            if ($files.Count -gt 0) {
                Write-Host "📦 Tìm thấy $($files.Count) file trong $key/" -ForegroundColor Yellow
                foreach ($file in $files) {
                    $destFile = Join-Path $destPath $file.Name
                    if (-not (Test-Path $destFile)) {
                        Copy-Item -Path $file.FullName -Destination $destFile -Force
                        Write-Host "  ✅ Đã copy: $($file.Name)" -ForegroundColor Green
                    } else {
                        Write-Host "  ℹ️  Đã tồn tại: $($file.Name)" -ForegroundColor Gray
                    }
                }
            }
        }
    }
}

Write-Host "`n✨ Hoàn tất! Cấu trúc thư mục đã được thiết lập." -ForegroundColor Green
Write-Host "📖 Xem hướng dẫn tại: public\image\README.md" -ForegroundColor Cyan

