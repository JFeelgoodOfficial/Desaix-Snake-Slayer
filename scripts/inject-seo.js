'use strict';

const fs = require('fs');
const path = require('path');

// ─── Edit these two values after pasting into the repo ────────────────────────
const CONFIG = {
  PROJECT_NAME:  'DESAIX Snake Slayer',
  DESCRIPTION:   'Desaix is a vibrant woman with unabashed and unbridled contempt for the snakes of the world. Join her mission to destroy them all in this top-down action shooter.',
  CANONICAL_URL: 'https://dss-flame.vercel.app',
  OG_IMAGE_PATH: 'Snakeular Reactor.png',   // ← set to your chosen hero sprite
  AUTHOR:        'JFeelgoodStudios',
};
// ──────────────────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');

function log(msg) {
  process.stdout.write(`[inject-seo] ${msg}\n`);
}

function die(msg) {
  process.stderr.write(`[inject-seo] ERROR: ${msg}\n`);
  process.exit(1);
}

function buildSeoBlock() {
  const base = CONFIG.CANONICAL_URL;
  const imgUrl = `${base}/${CONFIG.OG_IMAGE_PATH.split('/').map(encodeURIComponent).join('/')}`;
  const canonicalHref = `${base}/`;

  const ldJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: CONFIG.PROJECT_NAME,
    description: CONFIG.DESCRIPTION,
    url: canonicalHref,
    image: imgUrl,
    applicationCategory: 'Game',
    genre: 'Action',
    operatingSystem: 'Web Browser',
    author: {
      '@type': 'Organization',
      name: CONFIG.AUTHOR,
    },
  });

  return [
    '<!-- INJECTED-SEO-START -->',
    `<title>${CONFIG.PROJECT_NAME}</title>`,
    `<meta name="description" content="${CONFIG.DESCRIPTION}">`,
    `<meta property="og:title" content="${CONFIG.PROJECT_NAME}">`,
    `<meta property="og:description" content="${CONFIG.DESCRIPTION}">`,
    `<meta property="og:image" content="${imgUrl}">`,
    `<meta property="og:url" content="${canonicalHref}">`,
    `<meta property="og:type" content="website">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${CONFIG.PROJECT_NAME}">`,
    `<meta name="twitter:description" content="${CONFIG.DESCRIPTION}">`,
    `<meta name="twitter:image" content="${imgUrl}">`,
    `<link rel="canonical" href="${canonicalHref}">`,
    `<script type="application/ld+json">${ldJson}</script>`,
    '<!-- INJECTED-SEO-END -->',
  ].join('\n    ');
}

function injectIntoHtml() {
  const htmlPath = path.join(ROOT, 'index.html');
  if (!fs.existsSync(htmlPath)) die('index.html not found at repo root');

  let html = fs.readFileSync(htmlPath, 'utf8');
  const block = buildSeoBlock();
  const markerRe = /<!-- INJECTED-SEO-START -->[\s\S]*?<!-- INJECTED-SEO-END -->/;

  if (markerRe.test(html)) {
    html = html.replace(markerRe, block);
    log('Replaced existing SEO block in index.html');
  } else {
    html = html.replace('<head>', `<head>\n    ${block}`);
    log('Inserted new SEO block into index.html');
  }

  fs.writeFileSync(htmlPath, html, 'utf8');
  log('Wrote index.html');
}

function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${CONFIG.CANONICAL_URL}/</loc>`,
    `    <lastmod>${today}</lastmod>`,
    '    <changefreq>monthly</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>',
    '</urlset>',
    '',
  ].join('\n');

  const dest = path.join(ROOT, 'sitemap.xml');
  fs.writeFileSync(dest, xml, 'utf8');
  log('Wrote sitemap.xml');
}

function writeRobots() {
  const txt = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${CONFIG.CANONICAL_URL}/sitemap.xml`,
    '',
  ].join('\n');

  const dest = path.join(ROOT, 'robots.txt');
  fs.writeFileSync(dest, txt, 'utf8');
  log('Wrote robots.txt');
}

try {
  injectIntoHtml();
  writeSitemap();
  writeRobots();
  log('Done.');
  process.exit(0);
} catch (err) {
  die(err.message || String(err));
}
