// Post-build static-render step. Spins up a tiny static server on dist/,
// loads it with Playwright, lets the SPA render, then writes the rendered
// HTML back to dist/index.html so search engines and non-JS social crawlers
// see the full page on first byte.

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { resolve, join, extname } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const distDir = resolve(projectRoot, 'dist');
const indexPath = resolve(distDir, 'index.html');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json',
  '.ico': 'image/x-icon',
};

const server = createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    const filePath = join(distDir, urlPath);
    const fileStat = await stat(filePath).catch(() => null);
    if (!fileStat || !fileStat.isFile()) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] ?? 'application/octet-stream' });
    res.end(await readFile(filePath));
  } catch (err) {
    res.writeHead(500);
    res.end(String(err));
  }
});

await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const url = `http://127.0.0.1:${port}/`;
console.log(`prerender: serving dist/ on ${url}`);

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle' });

// Trigger any IntersectionObserver-based reveals so the rendered DOM has all
// content visible (not stuck at framer-motion's initial opacity:0 state).
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let total = 0;
    const distance = 240;
    const timer = setInterval(() => {
      const { scrollHeight } = document.documentElement;
      window.scrollBy(0, distance);
      total += distance;
      if (total >= scrollHeight) {
        clearInterval(timer);
        resolve();
      }
    }, 60);
  });
});
await page.waitForTimeout(400);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(200);

// Force any motion.* element still at opacity:0 to be visible IN MEMORY ONLY,
// then strip the inline opacity/transform styles directly from the DOM so the
// final HTML snapshot ships with content visible AND no leftover override CSS
// that would break framer-motion animations on the live site.
await page.evaluate(() => {
  document.querySelectorAll('[style]').forEach((el) => {
    const s = el.getAttribute('style') || '';
    let next = s
      .replace(/(^|;)\s*opacity\s*:\s*0(\.0+)?\s*(;|$)/gi, '$1$3')
      .replace(/(^|;)\s*transform\s*:\s*[^;]+(;|$)/gi, '$1$2')
      .replace(/^;|;$/g, '')
      .trim();
    if (next === '' || next === ';') {
      el.removeAttribute('style');
    } else if (next !== s) {
      el.setAttribute('style', next);
    }
  });
});

const renderedHtml = await page.evaluate(() => {
  return '<!doctype html>\n' + document.documentElement.outerHTML;
});

await browser.close();
server.close();

await writeFile(indexPath, renderedHtml, 'utf8');
console.log(`prerender: wrote ${indexPath} (${Buffer.byteLength(renderedHtml)} bytes)`);
