/**
 * generate-pdf.mjs
 * Generates the premium 3-page Muslim wedding invitation PDF using Puppeteer.
 *
 * Usage:
 *   node generate-pdf.mjs
 *
 * Output:
 *   Haider-Ali-Lubna-Naaz-Wedding-Invitation-Final.pdf
 *   page1-preview.png
 *   page2-preview.png
 *   page3-preview.png
 */

import { existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));

const htmlFile = resolve(__dirname, 'invitation-pdf.html');
const outFile  = resolve(__dirname, 'Haider-Ali-Lubna-Naaz-Wedding-Invitation-Final.pdf');

if (!existsSync(htmlFile)) {
  console.error('❌  invitation-pdf.html not found next to this script.');
  process.exit(1);
}

console.log('🖥  Launching headless browser…');
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 1700, deviceScaleFactor: 2 });

await page.goto(`file://${htmlFile}`, { waitUntil: 'networkidle0', timeout: 30000 });

// Ensure Google Fonts are loaded
await page.evaluateHandle('document.fonts.ready');
await new Promise(r => setTimeout(r, 2000));

// Verify layout metrics
const pageCount = await page.evaluate(() => document.querySelectorAll('.page').length);
console.log(`📑  Found ${pageCount} pages in HTML template.`);

// Capture individual page preview screenshots
console.log('📸  Capturing individual page previews…');
const pages = await page.$$('.page');
for (let i = 0; i < pages.length; i++) {
  const previewPath = resolve(__dirname, `page${i + 1}-preview.png`);
  await pages[i].screenshot({ path: previewPath });
  console.log(`   ✓ Page ${i + 1} preview saved to: page${i + 1}-preview.png`);
}

console.log('📄  Rendering 3-Page Print-Ready PDF…');
await page.pdf({
  path:              outFile,
  format:            'A4',
  printBackground:   true,
  preferCSSPageSize: true,
  margin:            { top: '0', right: '0', bottom: '0', left: '0' },
});

await browser.close();

// Simple check on PDF page count
const pdfBuffer = readFileSync(outFile);
const matches = pdfBuffer.toString('binary').match(/\/Type\s*\/Page\b/g);
const actualPages = matches ? matches.length : 'unknown';

console.log(`\n✅  PDF generated successfully!`);
console.log(`   File: ${outFile}`);
console.log(`   Page count: ${actualPages} pages\n`);
