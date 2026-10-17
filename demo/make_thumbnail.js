// Renders demo/thumbnail.html to demo/thumbnail.jpg (1280x720, YouTube size).
// Usage (repo root served on :8765): PW=$(npm root -g)/playwright node demo/make_thumbnail.js
const path = require('path');
const { chromium } = require(process.env.PW);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto('http://localhost:8765/demo/thumbnail.html');
  await page.waitForLoadState('networkidle');
  const app = page.frames().find((f) => /\/index\.html/.test(f.url()));
  await app.$eval('button[data-lang="en"]', (el) => el.click());
  await app.$eval('#example-list button:nth-child(1)', (el) => el.click());
  // Show the verdict at the top of the phone screen.
  await app.evaluate(() => { document.getElementById('result').scrollIntoView({ block: 'start' }); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(__dirname, 'thumbnail.jpg'), type: 'jpeg', quality: 92 });
  await browser.close();
})();
