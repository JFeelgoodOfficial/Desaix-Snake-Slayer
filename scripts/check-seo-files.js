'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT           = path.resolve(__dirname, '..');
const CANONICAL_URL  = 'https://dss-flame.vercel.app';
const problems       = [];

function check(label, filePath, assertion) {
  if (!fs.existsSync(filePath)) {
    problems.push(`MISSING  ${label} (${path.relative(ROOT, filePath)})`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const result  = assertion(content);
  if (result) problems.push(`FAIL     ${label}: ${result}`);
  else        console.log(`  OK  ${label}`);
}

check(
  'sitemap.xml exists and contains canonical <loc>',
  path.join(ROOT, 'sitemap.xml'),
  (c) => c.includes(`<loc>${CANONICAL_URL}/</loc>`)
    ? null
    : `<loc>${CANONICAL_URL}/</loc> not found`,
);

check(
  'robots.txt exists and contains Sitemap directive',
  path.join(ROOT, 'robots.txt'),
  (c) => c.includes(`Sitemap: ${CANONICAL_URL}/sitemap.xml`)
    ? null
    : `Sitemap: ${CANONICAL_URL}/sitemap.xml not found`,
);

check(
  'index.html contains INJECTED-SEO-START marker',
  path.join(ROOT, 'index.html'),
  (c) => c.includes('<!-- INJECTED-SEO-START -->')
    ? null
    : '<!-- INJECTED-SEO-START --> marker missing',
);

check(
  'index.html contains INJECTED-SEO-END marker',
  path.join(ROOT, 'index.html'),
  (c) => c.includes('<!-- INJECTED-SEO-END -->')
    ? null
    : '<!-- INJECTED-SEO-END --> marker missing',
);

check(
  'index.html has non-empty content between SEO markers',
  path.join(ROOT, 'index.html'),
  (c) => {
    const m = c.match(/<!-- INJECTED-SEO-START -->([\s\S]*?)<!-- INJECTED-SEO-END -->/);
    if (!m) return 'markers not found';
    if (m[1].trim().length === 0) return 'content between markers is empty';
    return null;
  },
);

if (problems.length > 0) {
  console.error('\nSEO file check FAILED:');
  problems.forEach((p) => console.error(`  ${p}`));
  process.exit(1);
} else {
  console.log('\nSEO file check passed.');
  process.exit(0);
}
