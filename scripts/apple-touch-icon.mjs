// Generates a 180x180 PNG apple-touch-icon for iOS home-screen bookmarks.
// Mirrors the favicon design at higher resolution.

import { chromium } from 'playwright';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const outputPath = resolve(projectRoot, 'public/apple-touch-icon.png');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 180px;
    height: 180px;
    background: transparent;
  }
  .tile {
    width: 180px;
    height: 180px;
    border-radius: 32px;
    background: #F1ECDD;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .tile .letter {
    font-family: 'Iowan Old Style', Georgia, 'Times New Roman', serif;
    font-size: 110px;
    font-weight: 600;
    color: #1F1812;
    line-height: 1;
    margin-top: -8px;
  }
  .tile .rule {
    width: 44px;
    height: 3px;
    background: #A0322D;
    margin-top: 6px;
  }
</style>
</head>
<body>
  <div class="tile">
    <span class="letter">M</span>
    <span class="rule"></span>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 180, height: 180 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(150);

await page.screenshot({
  path: outputPath,
  type: 'png',
  clip: { x: 0, y: 0, width: 180, height: 180 },
  omitBackground: false,
});

await browser.close();
console.log(`apple-touch-icon written to ${outputPath}`);
