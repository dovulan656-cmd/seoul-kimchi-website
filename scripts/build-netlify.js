/**
 * Build script for Netlify static export
 * Temporarily replaces next.config.js with next.config.netlify.js
 */

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'next.config.js');
const netlifyConfigPath = path.join(__dirname, '..', 'next.config.netlify.js');
const backupPath = path.join(__dirname, '..', 'next.config.js.backup');

try {
  // Backup current config
  if (fs.existsSync(configPath)) {
    fs.copyFileSync(configPath, backupPath);
  }

  // Copy Netlify config
  if (fs.existsSync(netlifyConfigPath)) {
    fs.copyFileSync(netlifyConfigPath, configPath);
    console.log('✅ Using next.config.netlify.js for build');
  } else {
    console.error('❌ next.config.netlify.js not found');
    process.exit(1);
  }

  // Run build
  const { execSync } = require('child_process');
  execSync('next build', { stdio: 'inherit' });

  console.log('✅ Build completed with Netlify config');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
} finally {
  // Restore original config
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, configPath);
    fs.unlinkSync(backupPath);
    console.log('✅ Restored original next.config.js');
  }
}
