/**
 * generate-pdf.js
 * Generates the wedding invitation PDF using Puppeteer.
 * 
 * Usage:
 *   node generate-pdf.js
 *
 * Output:
 *   invitation/Haider-Ali-Lubna-Naaz-Wedding-Invitation.pdf
 */

const path = require('path');
const fs   = require('fs');

async function generate() {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch {
    console.log('Installing puppeteer (one-time download)…');
    require('child_process').execSync('npm install puppeteer', { stdio: 'inherit' });
    puppeteer = require('puppeteer');
  }

  const htmlFile = path.resolve(__dirname, 'invitation-pdf.html');
  const outFile  = path.resolve(__dirname, 'Haider-Ali-Lubna-Naaz-Wedding-Invitation.pdf');

  if (!fs.existsSync(htmlFile)) {
    console.error('invitation-pdf.html not found!');
    process.exit(1);
  }

  console.log('Launching browser…');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page    = await browser.newPage();

  await page.goto(`file://${htmlFile}`, { waitUntil: 'networkidle0' });
  // Give Google Fonts a moment to load
  await new Promise(r => setTimeout(r, 2000));

  console.log('Generating PDF…');
  await page.pdf({
    path:                outFile,
    format:              'A4',
    printBackground:     true,
    margin:              { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize:   true,
  });

  await browser.close();
  console.log(`\n✅  PDF saved to:\n   ${outFile}\n`);
}

generate().catch(err => { console.error(err); process.exit(1); });
