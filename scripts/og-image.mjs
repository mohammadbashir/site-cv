// Renders the Open Graph share image (1200x630) used for LinkedIn / Slack /
// iMessage previews when mohamadbachir.com is shared. Keeps the editorial
// look of the site itself.

import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const photoBase64 = readFileSync(resolve(projectRoot, 'src/assets/profile.jpg')).toString('base64');
const outputPath = resolve(projectRoot, 'public/og-image.png');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Newsreader:ital,opsz,wght@1,6..72,400&display=swap"
  rel="stylesheet"
/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --paper: #F1ECDD;
    --paper-deep: #E8E1CD;
    --ink: #1F1812;
    --ink-mute: #6E6457;
    --ink-faint: #9C927F;
    --rule: #C4BBA8;
    --accent-red: #A0322D;
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
    background-image:
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 280 280'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.13  0 0 0 0 0.07  0 0 0 0.10 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    background-size: 280px 280px;
    background-repeat: repeat;
    display: grid;
    grid-template-columns: 360px 1fr;
    align-items: center;
    column-gap: 60px;
    padding: 80px;
  }

  .photo-plate {
    background: var(--paper-deep);
    padding: 8px;
    box-shadow:
      0 0 0 1px var(--rule),
      0 24px 40px -16px rgba(31, 24, 18, 0.18);
  }

  .photo-plate img {
    display: block;
    width: 320px;
    height: 400px;
    object-fit: cover;
    object-position: center;
  }

  .content {
    max-width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent-red);
    margin-bottom: 22px;
  }

  .name {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 600;
    font-size: 92px;
    line-height: 0.96;
    letter-spacing: -0.015em;
    color: var(--ink);
    margin-bottom: 22px;
  }

  .rule {
    width: 96px;
    height: 1.5px;
    background: var(--accent-red);
    margin-bottom: 22px;
  }

  .deck {
    font-family: 'Newsreader', Georgia, serif;
    font-style: italic;
    font-size: 24px;
    line-height: 1.4;
    color: var(--ink);
    margin-bottom: 32px;
    max-width: 640px;
  }

  .tagline {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }

  .tagline span:not(:last-child)::after {
    content: ' / ';
    color: var(--ink-faint);
    margin: 0 6px;
  }
</style>
</head>
<body>
  <div class="photo-plate">
    <img src="data:image/jpeg;base64,${photoBase64}" alt="" />
  </div>
  <div class="content">
    <div class="eyebrow">The Profile</div>
    <h1 class="name">Mohamad Bachir<br/>Sidani</h1>
    <div class="rule"></div>
    <p class="deck">Senior Software Engineer &amp; Pega Architect at Murex Lebanon. Production AI integrations with Claude and MCP. iOS Tech Lead.</p>
    <div class="tagline">
      <span>Pega CSSA</span><span>MCP</span><span>Claude</span><span>iOS</span><span>Beirut</span>
    </div>
  </div>
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
