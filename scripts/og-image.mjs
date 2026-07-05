// Renders the Open Graph share image (1200x630) used for LinkedIn / Slack /
// iMessage previews when mohamadbachir.com is shared. Mirrors the site's
// value-first identity: light ground, ink type, one red, color portrait.

import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const photoBase64 = readFileSync(resolve(projectRoot, 'src/assets/portrait.jpg')).toString('base64');
const outputPath = resolve(projectRoot, 'public/og-image.png');

// Embed the site's own fonts so the card matches the page exactly and the
// render never depends on the network.
const font = (pkg, file) =>
  readFileSync(resolve(projectRoot, 'node_modules', pkg, 'files', file)).toString('base64');
const spaceGrotesk = font('@fontsource-variable/space-grotesk', 'space-grotesk-latin-wght-normal.woff2');
const geistMono = font('@fontsource-variable/geist-mono', 'geist-mono-latin-wght-normal.woff2');

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
  @font-face {
    font-family: 'Geist Mono';
    font-weight: 100 900;
    font-style: normal;
    src: url(data:font/woff2;base64,${geistMono}) format('woff2-variations');
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f7f7f9;
    --ink: #14161d;
    --ink-2: rgba(20, 22, 29, 0.64);
    --ink-3: rgba(20, 22, 29, 0.45);
    --hairline: rgba(20, 22, 29, 0.1);
    --red: #e5484d;
  }

  html, body {
    width: 1200px;
    height: 630px;
    background: var(--bg);
    color: var(--ink);
    font-family: 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  body {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 356px;
    column-gap: 64px;
    align-items: center;
    padding: 64px 72px;
    overflow: hidden;
  }

  /* quiet structure: hairline guides + warm wash behind the portrait */
  .guides {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(560px 460px at 82% 42%, rgba(229, 72, 77, 0.06), transparent 72%),
      linear-gradient(to right, transparent calc(33.3% - 1px), rgba(20, 22, 29, 0.05) 33.3%, transparent calc(33.3% + 1px)),
      linear-gradient(to right, transparent calc(66.6% - 1px), rgba(20, 22, 29, 0.05) 66.6%, transparent calc(66.6% + 1px));
  }

  .left { position: relative; }

  .label {
    font-family: 'Geist Mono', ui-monospace, Menlo, monospace;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-2);
  }

  h1 {
    margin-top: 22px;
    font-size: 84px;
    font-weight: 700;
    line-height: 1.0;
    letter-spacing: -0.015em;
  }

  h1 .dot { color: var(--red); }

  .value {
    margin-top: 26px;
    max-width: 620px;
    font-size: 31px;
    font-weight: 600;
    line-height: 1.22;
    letter-spacing: -0.01em;
  }

  .band {
    margin-top: 38px;
    padding-top: 26px;
    border-top: 1px solid var(--hairline);
    display: flex;
    gap: 56px;
  }

  .stat .n {
    font-size: 40px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.01em;
  }

  .stat .t {
    margin-top: 10px;
    font-family: 'Geist Mono', ui-monospace, Menlo, monospace;
    font-size: 12.5px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-3);
  }

  .foot {
    margin-top: 34px;
    font-family: 'Geist Mono', ui-monospace, Menlo, monospace;
    font-size: 14px;
    letter-spacing: 0.04em;
    color: var(--ink-3);
  }

  .foot b { color: var(--ink); font-weight: 500; }
  .foot .sep { color: var(--red); }

  .portrait {
    position: relative;
    width: 356px;
    height: 445px;
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 0 0 0 1px var(--hairline);
  }

  .portrait img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
</style>
</head>
<body>
  <div class="guides"></div>
  <div class="left">
    <div class="label">Principal Engineer &middot; Systems Architect</div>
    <h1>Mohamad<br />Bachir Sidani<span class="dot">.</span></h1>
    <div class="value">60,000 people start their workday on systems I architected.</div>
    <div class="band">
      <div class="stat"><div class="n">10</div><div class="t">Years at Murex</div></div>
      <div class="stat"><div class="n">300+</div><div class="t">Client banks</div></div>
      <div class="stat"><div class="n">60K+</div><div class="t">Daily users</div></div>
    </div>
    <div class="foot"><b>mohamadbachir.com</b> <span class="sep">/</span> founder of ala.menu <span class="sep">/</span> Beirut</div>
  </div>
  <div class="portrait"><img src="data:image/jpeg;base64,${photoBase64}" alt="" /></div>
</body>
</html>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(250);

await page.screenshot({
  path: outputPath,
  type: 'png',
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});

await browser.close();
console.log(`OG image written to ${outputPath}`);
