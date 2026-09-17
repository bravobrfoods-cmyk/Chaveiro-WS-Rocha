const fs = require('fs');
fs.mkdirSync('dist', { recursive: true });
for (const file of ['index.html', 'privacidade.html', 'obrigado.html', '404.html', 'app.js', 'styles.css', 'refinements.css', 'robots.txt', 'sitemap.xml']) {
  fs.copyFileSync(file, 'dist/' + file);
}
fs.cpSync('assets', 'dist/assets', { recursive: true });
console.log('Site pronto em dist.');
