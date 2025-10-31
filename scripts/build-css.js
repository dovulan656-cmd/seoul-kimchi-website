const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
// Tailwind v4 changed the PostCSS plugin packaging. Use the
// @tailwindcss/postcss package when requiring as a PostCSS plugin.
const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

const inputPath = path.resolve(__dirname, '..', 'src', 'input.css');
const outputPath = path.resolve(__dirname, '..', 'css', 'styles.css');

(async () => {
  try {
    const css = fs.readFileSync(inputPath, 'utf8');
  const result = await postcss([tailwindcss(path.resolve(__dirname, '..', 'tailwind.config.cjs')), autoprefixer]).process(css, { from: inputPath });
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, result.css);
    console.log('Wrote:', outputPath);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();