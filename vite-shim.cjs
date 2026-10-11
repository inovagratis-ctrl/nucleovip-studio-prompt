#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=https://nucleovip.com.br/">
  <title>Núcleo VIP — Guia do Cidadão</title>
</head>
<body>
  <p>Redirecionando para o portal oficial <a href="https://nucleovip.com.br/">Núcleo VIP — Guia do Cidadão (https://nucleovip.com.br/)</a>...</p>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
console.log('Vercel static redirect built successfully -> dist/index.html');
