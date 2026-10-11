#!/usr/bin/env node
/**
 * Vercel Static Mirror Builder (vite build shim)
 * Copies the complete 33-page Núcleo VIP — Guia do Cidadão mirror from public/ to dist/
 */
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist');

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

if (fs.existsSync(srcDir)) {
  fs.cpSync(srcDir, distDir, { recursive: true });
  console.log('[vite-shim] Copied complete Núcleo VIP portal mirror from public/ to dist/ successfully.');
} else {
  fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(path.join(distDir, 'index.html'), '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Núcleo VIP</title></head><body></body></html>');
}
process.exit(0);
