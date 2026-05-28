import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const url = process.env.URL ?? 'http://localhost:5173/';
const outDir = './screenshots';
mkdirSync(outDir, { recursive: true });

const breakpoints = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'wide', width: 1680, height: 1050 },
];

// Force everything visible regardless of intersection observer state.
// Targets framer-motion's inline opacity/transform on motion.* components.
const forceVisibleCss = `
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }
  [style*="opacity: 0"],
  [style*="opacity:0"] {
    opacity: 1 !important;
  }
  [style*="translate"],
  [style*="translateY"],
  [style*="translateX"] {
    transform: none !important;
  }
`;

const browser = await chromium.launch();

for (const bp of breakpoints) {
  const ctx = await browser.newContext({
    viewport: { width: bp.width, height: bp.height },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: forceVisibleCss });
  // Also force CSS-animation-controlled and IntersectionObserver-revealed elements visible
  await page.addStyleTag({
    content: `
      .cover-name .line .inner, .cover-eyebrow, .cover-foot, .portrait-cap, .nav-mark, .nav-action {
        opacity: 1 !important; transform: none !important; animation: none !important;
      }
      .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
    `,
  });
  await page.waitForTimeout(2400);

  await page.screenshot({
    path: `${outDir}/${bp.name}-fold.png`,
    fullPage: false,
  });

  await page.screenshot({
    path: `${outDir}/${bp.name}-full.png`,
    fullPage: true,
  });

  await ctx.close();
}

await browser.close();
console.log(`Screenshots written to ${outDir}/`);
