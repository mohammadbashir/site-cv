// Renders cv/principal-track.md to src/assets/Mohamad_Bachir_Sidani_CV.pdf
// using Playwright and a print-styled HTML template.

import { chromium } from 'playwright';
import { readFileSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { marked } from 'marked';

const projectRoot = resolve(import.meta.dirname, '..');
const inputPath = process.env.INPUT
  ? resolve(projectRoot, process.env.INPUT)
  : resolve(projectRoot, 'cv/principal-track.md');
const outputPath = process.env.OUTPUT
  ? resolve(projectRoot, process.env.OUTPUT)
  : resolve(projectRoot, 'src/assets/Mohamad_Bachir_Sidani_CV.pdf');

const md = readFileSync(inputPath, 'utf8');
const bodyHtml = marked.parse(md);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Mohamad Bachir Sidani — Curriculum Vitae</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&display=swap"
  rel="stylesheet"
/>
<style>
  @page {
    size: Letter;
    margin: 0.55in 0.65in 0.55in 0.65in;
  }

  *, *::before, *::after { box-sizing: border-box; }

  html, body { margin: 0; padding: 0; }

  body {
    font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
    font-size: 9.8pt;
    line-height: 1.34;
    color: #1A1A1A;
    font-feature-settings: 'kern', 'liga', 'onum';
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  h1, h2, h3, h4 {
    font-family: 'Inter', Arial, sans-serif;
    color: #1A1A1A;
    margin: 0;
  }

  h1 {
    font-size: 19pt;
    font-weight: 700;
    letter-spacing: 0.04em;
    margin: 0 0 0.12em 0;
    text-transform: uppercase;
    line-height: 1.05;
  }

  h1 + p,
  h1 + p + p,
  h1 + p + p + p {
    margin: 0.1em 0;
    font-size: 9.5pt;
    line-height: 1.35;
    color: #2E2620;
  }

  h2 {
    font-size: 9.6pt;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #1A1A1A;
    margin: 0.65em 0 0.3em 0;
    padding-bottom: 0.13em;
    border-bottom: 0.6pt solid #C4BBA8;
  }

  h3 {
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 10.7pt;
    font-weight: 600;
    margin: 0.5em 0 0.02em 0;
  }

  h3 + p {
    font-style: italic;
    color: #5A5550;
    font-size: 9.2pt;
    margin: 0 0 0.22em 0;
  }

  hr {
    border: 0;
    border-top: 0.6pt solid #C4BBA8;
    margin: 0.3em 0 0.45em 0;
  }

  p {
    margin: 0.22em 0;
    orphans: 3;
    widows: 3;
  }

  ul {
    margin: 0.2em 0 0.4em 0;
    padding-left: 1.05em;
  }

  li {
    margin: 0.13em 0;
    line-height: 1.32;
  }

  li::marker { color: #5A5550; }

  strong { font-weight: 600; color: #1A1A1A; }

  a { color: inherit; text-decoration: none; }

  h2 + ul,
  h2 + p,
  h2 + ol {
    margin-top: 0.22em;
  }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });

await page.pdf({
  path: outputPath,
  format: 'Letter',
  printBackground: true,
  margin: { top: '0.55in', bottom: '0.55in', left: '0.65in', right: '0.65in' },
});

// Debug screenshot: render the same HTML at a fixed letter-content width so
// we can see where pages would break. 612pt × 792pt = letter; minus margins.
if (process.env.DEBUG_SCREENSHOT) {
  await page.setViewportSize({ width: 816, height: 1056 }); // Letter at 96dpi
  await page.screenshot({
    path: resolve(projectRoot, 'screenshots/cv-debug.png'),
    fullPage: true,
  });
  console.log('debug screenshot written to screenshots/cv-debug.png');
}

await browser.close();
console.log(`PDF written to ${outputPath}`);

// Mirror to the public path served at /cv so the site and the shareable URL
// stay in sync with the canonical CV.
const publicCopy = resolve(projectRoot, 'public/cv.pdf');
copyFileSync(outputPath, publicCopy);
console.log(`PDF copied to ${publicCopy}`);
