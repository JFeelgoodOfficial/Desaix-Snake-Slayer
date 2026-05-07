'use strict';

const fs   = require('fs');
const path = require('path');

const KB = 1024;
const MB = 1024 * KB;

const LIMITS = {
  '.png':  { warn: 1 * MB,  fail: 2 * MB,  webpHint: 200 * KB },
  '.jpg':  { warn: 1 * MB,  fail: 2 * MB },
  '.jpeg': { warn: 1 * MB,  fail: 2 * MB },
  '.webp': { warn: 1 * MB,  fail: 2 * MB },
  '.mp3':  { warn: 3 * MB,  fail: 5 * MB },
  '.ogg':  { warn: 3 * MB,  fail: 5 * MB },
  '.wav':  { warn: 3 * MB,  fail: 5 * MB },
  '.ttf':  { warn: 500 * KB, fail: 1 * MB },
  '.otf':  { warn: 500 * KB, fail: 1 * MB },
  '.woff': { warn: 500 * KB, fail: 1 * MB },
  '.woff2':{ warn: 500 * KB, fail: 1 * MB },
  '.mp4':  { warn: 5 * MB,  fail: 10 * MB },
  '.webm': { warn: 5 * MB,  fail: 10 * MB },
};

const EXCLUDE_DIRS = new Set([
  'node_modules', '.git', 'tests', 'scripts',
  '.github', 'playwright-report', 'test-results', '.lighthouseci',
]);

const ROOT = path.resolve(__dirname, '..');

function fmt(bytes) {
  if (bytes >= MB)  return `${(bytes / MB).toFixed(2)} MB`;
  if (bytes >= KB)  return `${(bytes / KB).toFixed(1)} KB`;
  return `${bytes} B`;
}

function walk(dir, results) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.has(entry.name)) walk(path.join(dir, entry.name), results);
    } else if (entry.isFile()) {
      results.push(path.join(dir, entry.name));
    }
  }
}

const files = [];
walk(ROOT, files);

// ext → { count, totalBytes, warns, fails }
const summary = {};
let totalFails = 0;

for (const file of files) {
  const ext  = path.extname(file).toLowerCase();
  const lim  = LIMITS[ext];
  if (!lim) continue;

  const size = fs.statSync(file).size;
  const rel  = path.relative(ROOT, file);

  if (!summary[ext]) summary[ext] = { count: 0, totalBytes: 0, warns: 0, fails: 0 };
  const s = summary[ext];
  s.count++;
  s.totalBytes += size;

  if (size > lim.fail) {
    console.error(`  FAIL  ${rel}  (${fmt(size)} > fail limit ${fmt(lim.fail)})`);
    s.fails++;
    totalFails++;
  } else if (size > lim.warn) {
    console.warn(`  WARN  ${rel}  (${fmt(size)} > warn limit ${fmt(lim.warn)})`);
    s.warns++;
  }

  if (ext === '.png' && lim.webpHint && size > lim.webpHint) {
    console.log(`  HINT  ${rel}  (${fmt(size)}) — consider converting to WebP`);
  }
}

// Summary table
console.log('\n─────────────────────────────────────────────────────');
console.log('Ext       Files  Total Size    Warns  Fails');
console.log('─────────────────────────────────────────────────────');
for (const [ext, s] of Object.entries(summary).sort()) {
  const total = fmt(s.totalBytes).padStart(10);
  console.log(
    `${ext.padEnd(8)}  ${String(s.count).padStart(5)}  ${total}    ${String(s.warns).padStart(5)}  ${String(s.fails).padStart(5)}`,
  );
}
console.log('─────────────────────────────────────────────────────\n');

if (totalFails > 0) {
  console.error(`Asset audit FAILED: ${totalFails} file(s) exceed size limits.`);
  process.exit(1);
} else {
  console.log('Asset audit passed.');
  process.exit(0);
}
