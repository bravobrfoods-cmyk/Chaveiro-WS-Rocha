// Run after choosing the public domain: node configurar-dominio.cjs https://your-domain
const fs = require('fs');
const input = process.argv[2];
if (!input) throw new Error('Informe o domínio HTTPS público do site.');
const url = new URL(input);
if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
  throw new Error('Use apenas a origem HTTPS, sem caminho, credenciais ou parâmetros.');
}
const origin = url.origin;
const pages = ['index.html', 'privacidade.html', 'obrigado.html', '404.html'];
for (const file of pages) {
  const publicUrl = origin + (file === 'index.html' ? '/' : '/' + file);
  let html = fs.readFileSync(file, 'utf8')
    .replace(/<link rel="canonical"[^>]*>\s*/g, '')
    .replace(/<meta property="og:url"[^>]*>\s*/g, '')
    .replace(/<script id="breadcrumb-schema"[\s\S]*?<\/script>/g, '')
    .replace(/(<meta property="og:image" content=")[^"]+(">)/g, '$1' + origin + '/assets/social-share.jpg$2');
  if (file !== '404.html') html = html.replace('</head>', `<link rel="canonical" href="${publicUrl}"><meta property="og:url" content="${publicUrl}"></head>`);
  if (file === 'index.html') {
    html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_, json) => {
      const business = JSON.parse(json);
      Object.assign(business, { '@id': origin + '/#negocio', url: origin + '/', image: origin + '/assets/social-share.jpg', logo: origin + '/assets/logo-ws-rocha.png', hasMap: 'https://www.google.com/maps?q=R.+Rafael+Sampaio,+29,+Campinas+SP' });
      return '<script type="application/ld+json">' + JSON.stringify(business) + '</script>';
    });
  }
  if (file === 'privacidade.html') {
    const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: origin + '/' },
      { '@type': 'ListItem', position: 2, name: 'Política de Privacidade', item: publicUrl }
    ] };
    html = html.replace('</head>', '<script id="breadcrumb-schema" type="application/ld+json">' + JSON.stringify(breadcrumb) + '</script></head>');
  }
  fs.writeFileSync(file, html);
}
fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + ['/', '/privacidade.html'].map(path => `<url><loc>${origin}${path}</loc></url>`).join('') + '</urlset>\n');
console.log('Domínio, sitemap, URLs sociais e marcação do negócio configurados.');
