import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });
  const filePath = path.resolve('test-bg.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'load' });
  await page.screenshot({ path: 'bg-preview.png' });
  await browser.close();
  console.log('Saved bg-preview.png');
})();
