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
// reducedMotion makes JS-driven values (count-up stats) render their final
// state immediately, so the snapshot never bakes a mid-animation number.
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle' });

// Trigger IntersectionObserver-based reveals so the rendered DOM has all
// content visible. Scrolling must be behavior:'instant': the page CSS sets
// scroll-behavior:smooth, and smooth scrolls lag behind a rapid scrollBy
// loop, so the pass would end before ever reaching the bottom.
await page.evaluate(async () => {
  const step = 300;
  for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
    window.scrollTo({ top: y, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
});
await page.waitForTimeout(400);

// Belt and braces: any reveal the observer still missed ships visible. React
// re-renders these elements on hydration, so live scroll animations are kept.
await page.evaluate(() => {
  document.querySelectorAll('.sr:not(.is-in)').forEach((el) => el.classList.add('is-in'));
});
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
