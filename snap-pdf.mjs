import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1130 });
  const filePath = path.resolve('invitation-pdf.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'pdf-rendered-preview.png', fullPage: true });
  await browser.close();
  console.log('Saved pdf-rendered-preview.png');
})();
