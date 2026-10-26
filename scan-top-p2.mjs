import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 674, height: 1095 });
  const p2Path = path.resolve('page2-bg.jpg');
  await page.goto('file://' + p2Path);

  const topScan = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 674;
    canvas.height = 1095;
    const ctx = canvas.getContext('2d');
    const img = document.querySelector('img');
    ctx.drawImage(img, 0, 0);

    const res = [];
    for (let y = 100; y <= 350; y += 20) {
      const p = ctx.getImageData(250, y, 1, 1).data;
      res.push({ y, pct: (y / 1095 * 100).toFixed(1) + '%', r: p[0], g: p[1], b: p[2] });
    }
    return res;
  });

  console.log('Page 2 top scan:', topScan);
  await browser.close();
})();
