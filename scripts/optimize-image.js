/**
 * Script tự động tối ưu và nâng cấp chất lượng hình ảnh
 * Sử dụng: node scripts/optimize-image.js [đường-dẫn-file]
 * Hoặc: npm run optimize:image
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Cấu hình tối ưu theo loại ảnh
const optimizationConfig = {
  banners: {
    maxWidth: 1400,
    quality: 85,
    format: 'jpeg',
    progressive: true,
    mozjpeg: true
  },
  products: {
    maxWidth: 1200,
    quality: 90,
    format: 'auto', // Giữ nguyên format nếu là PNG, chuyển sang WebP nếu là JPG
    lossless: false
  },
  blog: {
    maxWidth: 1600,
    quality: 85,
    format: 'auto'
  },
  certificates: {
    maxWidth: 1600,
    quality: 95, // Chứng chỉ cần chất lượng cao để đọc rõ
    format: 'auto',
    lossless: false
  },
  process: {
    maxWidth: 1600,
    quality: 88,
    format: 'auto'
  },
  icons: {
    maxWidth: 512,
    quality: 100, // Icons cần chất lượng cao
    format: 'auto',
    lossless: true
  },
  backgrounds: {
    maxWidth: 2000,
    quality: 85,
    format: 'auto'
  }
};

/**
 * Xác định loại ảnh dựa trên đường dẫn
 */
function getImageType(filePath) {
  const normalizedPath = path.normalize(filePath).replace(/\\/g, '/');
  const parts = normalizedPath.split('/');
  
  // Tìm thư mục image type
  const imageIndex = parts.indexOf('image');
  if (imageIndex !== -1 && imageIndex < parts.length - 1) {
    const type = parts[imageIndex + 1];
    if (optimizationConfig[type]) {
      return type;
    }
  }
  
  // Mặc định: banners nếu không xác định được
  return 'banners';
}

/**
 * Nâng cấp chất lượng ảnh: sharpening, contrast, saturation
 */
async function enhanceImage(image, type) {
  let enhanced = image;
  
  // Áp dụng sharpening nhẹ để tăng độ sắc nét
  enhanced = enhanced.sharpen({
    sigma: 1,
    flat: 1,
    jagged: 2
  });
  
  // Điều chỉnh contrast và saturation theo loại ảnh
  if (type === 'products' || type === 'banners') {
    enhanced = enhanced.modulate({
      brightness: 1.05,  // Tăng độ sáng nhẹ
      saturation: 1.1,    // Tăng độ bão hòa màu
      hue: 0
    });
  }
  
  return enhanced;
}

/**
 * Tối ưu một file ảnh
 */
async function optimizeImage(filePath, options = {}) {
  try {
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      console.log(`⚠️  ${filePath} không phải là file`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      console.log(`⏭️  Bỏ qua ${filePath} (không phải ảnh)`);
      return;
    }

    // Bỏ qua SVG và file đã được optimize (có suffix -optimized)
    if (ext === '.svg' || filePath.includes('-optimized')) {
      console.log(`⏭️  Bỏ qua ${filePath}`);
      return;
    }

    const imageType = getImageType(filePath);
    const config = optimizationConfig[imageType];
    
    console.log(`\n🔄 Đang tối ưu: ${filePath}`);
    console.log(`   Loại: ${imageType}, Kích thước: ${(stats.size / 1024).toFixed(2)} KB`);

    // Đọc metadata để kiểm tra kích thước
    const metadata = await sharp(filePath).metadata();
    const originalSize = stats.size;
    
    let image = sharp(filePath);
    
    // Resize nếu quá lớn
    if (metadata.width > config.maxWidth) {
      console.log(`   📐 Resize từ ${metadata.width}x${metadata.height} về max ${config.maxWidth}px`);
      image = image.resize(config.maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Nâng cấp chất lượng
    image = await enhanceImage(image, imageType);
    
    // Xử lý theo format
    let outputBuffer;
    const outputPath = options.backup ? filePath.replace(/(\.[^.]+)$/, '-optimized$1') : filePath;
    const outputExt = path.extname(outputPath).toLowerCase();
    
    if (config.format === 'auto') {
      // Giữ nguyên format nếu là PNG (có thể có transparency)
      if (outputExt === '.png' || outputExt === '.PNG') {
        outputBuffer = await image.png({
          quality: config.quality,
          compressionLevel: 9,
          adaptiveFiltering: true
        }).toBuffer();
      } else {
        // Chuyển JPG sang WebP nếu chất lượng tốt
        if (outputExt === '.jpg' || outputExt === '.jpeg' || outputExt === '.JPG' || outputExt === '.JPEG') {
          const webpPath = outputPath.replace(/\.(jpg|jpeg)$/i, '.webp');
          outputBuffer = await image.webp({
            quality: config.quality,
            effort: 6
          }).toBuffer();
          
          // Lưu cả WebP và JPG (fallback)
          fs.writeFileSync(webpPath, outputBuffer);
          const webpStats = fs.statSync(webpPath);
          const reduction = ((originalSize - webpStats.size) / originalSize * 100).toFixed(1);
          console.log(`   ✅ Tạo WebP: ${path.basename(webpPath)} (${(webpStats.size / 1024).toFixed(2)} KB, giảm ${reduction}%)`);
          
          // Vẫn tạo JPG để tương thích
          outputBuffer = await image.jpeg({
            quality: config.quality,
            progressive: true,
            mozjpeg: true
          }).toBuffer();
        } else {
          outputBuffer = await image.toBuffer();
        }
      }
    } else if (config.format === 'jpeg') {
      outputBuffer = await image.jpeg({
        quality: config.quality,
        progressive: config.progressive || false,
        mozjpeg: config.mozjpeg || false
      }).toBuffer();
    } else {
      outputBuffer = await image.toBuffer();
    }
    
    // Ghi file
    fs.writeFileSync(outputPath, outputBuffer);
    const newStats = fs.statSync(outputPath);
    const reduction = ((originalSize - newStats.size) / originalSize * 100).toFixed(1);
    const sizeChange = originalSize > newStats.size ? `giảm ${reduction}%` : `tăng ${Math.abs(reduction)}%`;
    
    console.log(`   ✅ Hoàn tất: ${path.basename(outputPath)}`);
    console.log(`   📊 ${(newStats.size / 1024).toFixed(2)} KB (${sizeChange})`);
    
    return {
      originalSize,
      newSize: newStats.size,
      reduction: parseFloat(reduction)
    };
    
  } catch (error) {
    console.error(`❌ Lỗi khi tối ưu ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Tối ưu tất cả ảnh trong thư mục
 */
async function optimizeDirectory(dirPath, options = {}) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  let totalReduction = 0;
  let processed = 0;
  
  for (const file of files) {
    const filePath = path.join(dirPath, file.name);
    
    if (file.isDirectory()) {
      const subResults = await optimizeDirectory(filePath, options);
      totalReduction += subResults.reduction;
      processed += subResults.processed;
    } else {
      const result = await optimizeImage(filePath, options);
      if (result) {
        totalReduction += Math.abs(result.reduction);
        processed++;
      }
    }
  }
  
  return { reduction: totalReduction, processed };
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const imagePath = args[0];
  
  if (!imagePath) {
    // Tối ưu tất cả ảnh trong public/image/
    console.log('🚀 Bắt đầu tối ưu tất cả hình ảnh trong public/image/...\n');
    const publicImagePath = path.join(__dirname, '..', 'public', 'image');
    
    if (!fs.existsSync(publicImagePath)) {
      console.error('❌ Không tìm thấy thư mục public/image/');
      process.exit(1);
    }
    
    const results = await optimizeDirectory(publicImagePath, { backup: false });
    
    if (results.processed === 0) {
      console.log('\n✨ Hoàn tất! Không tìm thấy file ảnh nào cần tối ưu.');
      console.log('   💡 Hãy đảm bảo bạn đã thêm file ảnh (jpg, png, webp) vào thư mục public/image/');
    } else {
      const avgReduction = (results.reduction / results.processed).toFixed(1);
      console.log(`\n✨ Hoàn tất! Đã tối ưu ${results.processed} file, giảm trung bình ${avgReduction}%`);
    }
  } else {
    // Tối ưu file cụ thể
    const fullPath = path.isAbsolute(imagePath) 
      ? imagePath 
      : path.join(__dirname, '..', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ Không tìm thấy file: ${fullPath}`);
      process.exit(1);
    }
    
    await optimizeImage(fullPath, { backup: true });
  }
}

// Chạy script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  });
}

module.exports = { optimizeImage, optimizeDirectory };
