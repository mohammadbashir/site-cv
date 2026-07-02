// Renders the Open Graph share image (1200x630) used for LinkedIn / Slack /
// iMessage previews when mohamadbachir.com is shared. Mirrors the site's
// drafting-sheet identity: paper, dot grid, ink node boxes, one signal orange.

import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const photoBase64 = readFileSync(resolve(projectRoot, 'src/assets/portrait.jpg')).toString('base64');
const outputPath = resolve(projectRoot, 'public/og-image.png');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&display=swap"
  rel="stylesheet"
/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --paper: #f6f4ee;
    --paper-2: #eeebe1;
    --ink: #191511;
    --ink-2: #4c4536;
    --ink-3: #8b8270;
    --rule: #d8d2c0;
    --accent: oklch(0.55 0.16 50);
  }

  html, body {
    width: 1200px;
    height: 630px;
    background: var(--paper);
    color: var(--ink);
    font-family: 'Newsreader', Georgia, serif;
    -webkit-font-smoothing: antialiased;
  }

  body {
    position: relative;
    background-image: radial-gradient(rgba(25,21,17,0.09) 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    display: grid;
    grid-template-columns: 1fr 300px;
    column-gap: 56px;
    align-items: center;
    padding: 72px 80px;
  }

  .crop { position: absolute; width: 22px; height: 22px; }
  .crop::before { content: ""; position: absolute; width: 100%; height: 2px; background: var(--ink-3); }
  .crop::after { content: ""; position: absolute; width: 2px; height: 100%; background: var(--ink-3); }
  .crop.tl { top: 26px; left: 26px; } .crop.tl::before { top: 0; left: 0; } .crop.tl::after { top: 0; left: 0; }
  .crop.tr { top: 26px; right: 26px; } .crop.tr::before { top: 0; right: 0; } .crop.tr::after { top: 0; right: 0; }
  .crop.bl { bottom: 26px; left: 26px; } .crop.bl::before { bottom: 0; left: 0; } .crop.bl::after { bottom: 0; left: 0; }
  .crop.br { bottom: 26px; right: 26px; } .crop.br::before { bottom: 0; right: 0; } .crop.br::after { bottom: 0; right: 0; }

  .eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 18px;
  }

  .name {
    font-weight: 300;
    font-size: 96px;
    line-height: 0.98;
    letter-spacing: -0.04em;
    margin-bottom: 26px;
  }
  .name .it { font-style: italic; color: var(--accent); }
  .name .stop { color: var(--accent); font-weight: 400; }

  .nodes {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 26px;
  }
  .node {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13.5px;
    font-weight: 600;
    letter-spacing: 0.1em;
    border: 2px solid var(--ink);
    background: var(--paper-2);
    padding: 12px 18px;
    white-space: nowrap;
  }
  .node.accent { border-color: var(--accent); color: var(--accent); }
  .wire { width: 34px; height: 2px; background: var(--ink-2); opacity: 0.6; }

  .tagline {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-2);
  }
  .tagline .sep { color: var(--accent); margin: 0 10px; }

  .portrait { justify-self: end; }
  .portrait .ph {
    width: 300px;
    height: 300px;
    border: 3px solid var(--ink);
    border-radius: 18px;
    overflow: hidden;
    background: var(--paper-2);
  }
  .portrait img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) contrast(1.06) brightness(1.02);
  }
  .portrait .cap {
    margin-top: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-3);
    display: flex;
    justify-content: space-between;
  }
</style>
</head>
<body>
  <div class="crop tl"></div><div class="crop tr"></div><div class="crop bl"></div><div class="crop br"></div>
  <div class="content">
    <div class="eyebrow">Principal Engineer · Systems Architect</div>
    <h1 class="name">Mohamad <span class="it">Bachir</span><br/>Sidani<span class="stop">.</span></h1>
    <div class="nodes">
      <span class="node">2 CRM PLATFORMS</span><span class="wire"></span><span class="node">300+ BANKS</span><span class="wire"></span><span class="node accent">MCP · AI</span>
    </div>
    <div class="tagline">Murex · 10 yrs<span class="sep">/</span>À La Menu<span class="sep">/</span>iOS · 10+ apps<span class="sep">/</span>Beirut</div>
  </div>
  <figure class="portrait">
    <div class="ph"><img src="data:image/jpeg;base64,${photoBase64}" alt="" /></div>
    <figcaption class="cap"><span>M.B.S.</span><span>ala.menu</span></figcaption>
  </figure>
</body>
</html>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

await page.screenshot({
  path: outputPath,
  type: 'png',
  fullPage: false,
  omitBackground: false,
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});

await browser.close();
console.log(`og-image written to ${outputPath}`);
