// Generates a 180x180 PNG apple-touch-icon for iOS home-screen bookmarks.
// Mirrors the favicon design at higher resolution: ink tile, white M, red dot.

import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const outputPath = resolve(projectRoot, 'public/apple-touch-icon.png');

const spaceGrotesk = readFileSync(
  resolve(projectRoot, 'node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2'),
).toString('base64');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  @font-face {
    font-family: 'Space Grotesk';
    font-weight: 300 700;
    font-style: normal;
    src: url(data:font/woff2;base64,${spaceGrotesk}) format('woff2-variations');
  }
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
    background: #14161d;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tile .letter {
    font-family: 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif;
    font-size: 104px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1;
    margin-top: -10px;
  }
  .tile .letter .dot { color: #e5484d; }
</style>
</head>
<body>
  <div class="tile">
    <span class="letter">M<span class="dot">.</span></span>
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
