/**
 * Copy Vite production output to the repository root for GitHub Pages (master branch).
 * Preserves source files, images/, and other static paths not produced by the build.
 */
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')

if (!fs.existsSync(dist)) {
  console.error('dist/ not found. Run vite build first.')
  process.exit(1)
}

const preserve = new Set([
  'src',
  'scripts',
  'node_modules',
  'dist',
  'images',
  'public',
  '.git',
  '.github',
  'README.md',
  'package.json',
  'package-lock.json',
  'vite.config.js',
  'tailwind.config.js',
  'postcss.config.js',
  'index.vite.html',
  '.gitignore'
])

function copyRecursive(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry))
    }
    return
  }
  fs.copyFileSync(src, dest)
}

for (const entry of fs.readdirSync(dist)) {
  const srcPath = path.join(dist, entry)
  const destPath = path.join(root, entry)
  if (preserve.has(entry)) continue
  if (fs.existsSync(destPath)) {
    fs.rmSync(destPath, { recursive: true, force: true })
  }
  copyRecursive(srcPath, destPath)
}

const builtIndex =
  ['index.html', 'index.vite.html']
    .map((name) => path.join(dist, name))
    .find((p) => fs.existsSync(p))

if (builtIndex) {
  let html = fs.readFileSync(builtIndex, 'utf8')
  fs.writeFileSync(path.join(root, 'index.html'), html)
  fs.writeFileSync(path.join(root, '404.html'), html)
} else {
  console.warn('No index.html or index.vite.html found in dist/.')
}

console.log('Published dist/ to repository root (index.html, 404.html, assets/).')
