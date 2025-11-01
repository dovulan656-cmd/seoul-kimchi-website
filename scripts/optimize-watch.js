/**
 * Script theo dõi và tự động tối ưu ảnh mới được thêm vào
 * Sử dụng: npm run optimize:watch
 */

const chokidar = require('chokidar');
const path = require('path');
const { optimizeImage } = require('./optimize-image');

const imageDir = path.join(__dirname, '..', 'public', 'image');

console.log('👀 Đang theo dõi thư mục:', imageDir);
console.log('📸 Ảnh mới sẽ được tự động tối ưu...\n');

const watcher = chokidar.watch(imageDir, {
  ignored: /(^|[\/\\])\../, // Bỏ qua file ẩn
  persistent: true,
  ignoreInitial: true, // Bỏ qua file hiện có
  awaitWriteFinish: {
    stabilityThreshold: 1000, // Đợi 1 giây sau khi file ngừng thay đổi
    pollInterval: 100
  }
});

watcher
  .on('add', async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && !filePath.includes('-optimized')) {
      console.log(`\n📥 Phát hiện file mới: ${path.relative(imageDir, filePath)}`);
      await optimizeImage(filePath, { backup: false });
      console.log('✅ Đã tối ưu xong!\n');
    }
  })
  .on('change', async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && !filePath.includes('-optimized')) {
      console.log(`\n🔄 File đã thay đổi: ${path.relative(imageDir, filePath)}`);
      await optimizeImage(filePath, { backup: false });
      console.log('✅ Đã tối ưu lại!\n');
    }
  })
  .on('error', error => {
    console.error('❌ Lỗi:', error);
  });

console.log('✅ Đang chạy... Nhấn Ctrl+C để dừng.\n');

