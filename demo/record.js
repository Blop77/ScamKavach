// Records the ScamKavach demo video: drives the real app inside a phone frame
// and captures frames with the Chrome DevTools screencast.
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PW);

const OUT = process.argv[2];
const URL = process.argv[3];
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(URL);
  await page.waitForLoadState('networkidle');
  const app = page.frames().find((f) => /\/index\.html/.test(f.url()));
  await app.waitForSelector('#check');
  await app.$eval('button[data-lang="en"]', (el) => el.click());
  await page.evaluate(() => { showOverlay('title'); });
  await page.waitForTimeout(800);

  const frames = [];
  const cdp = await page.context().newCDPSession(page);
  cdp.on('Page.screencastFrame', async (f) => {
    const file = path.join(OUT, `f${String(frames.length).padStart(5, '0')}.jpg`);
    fs.writeFileSync(file, Buffer.from(f.data, 'base64'));
    frames.push({ file, ts: f.metadata.timestamp });
    await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 1920, maxHeight: 1080, everyNthFrame: 1 });

  const wait = (s) => page.waitForTimeout(s * 1000);
  const cap = (step, title, body) => page.evaluate(([a, b, c]) => caption(a, b, c), [step, title, body]);
  const scrollApp = (y) => app.evaluate((top) => window.scrollTo({ top, behavior: 'smooth' }), y);
  const scrollTo = (sel) => app.evaluate((s) => document.querySelector(s).scrollIntoView({ behavior: 'smooth', block: 'start' }), sel);
  // The phone frame is CSS-scaled, so click through the DOM rather than the mouse.
  const click = (sel) => app.$eval(sel, (el) => el.click());
  const example = (n) => click(`#example-list button:nth-child(${n})`);
  const lang = (l) => click(`button[data-lang="${l}"]`);

  // 1. Title and problem
  await wait(5);
  await page.evaluate(() => showOverlay('problem'));
  await wait(14);

  // 2. Paste a fake bank KYC message
  await cap('How it works', 'Paste any suspicious message', 'An SMS, a WhatsApp forward or just a link — ScamKavach checks it instantly.');
  await page.evaluate(() => hideOverlay());
  await wait(2.5);
  await app.focus('#msg');
  await app.type('#msg', 'Dear Customer, your SBI YONO account will be blocked today. Update your PAN immediately: http://sbi-kyc-update.xyz/login', { delay: 28 });
  await wait(1);
  await click('#check');
  await wait(0.6);
  await cap('Instant verdict', 'Very likely a scam — and exactly why', 'It caught the fake SBI look-alike link, the account-block threat and the panic words.');
  await wait(7);
  await app.evaluate(() => window.scrollBy({ top: 330, behavior: 'smooth' }));
  await wait(4);
  await app.evaluate(() => window.scrollBy({ top: 330, behavior: 'smooth' }));
  await wait(3.5);
  await cap('Clear next steps', 'Tells you what to do now', 'Don’t click, don’t pay, never share an OTP — block and report the sender.');
  await scrollTo('#todo');
  await wait(6);

  // 3. Hindi: UPI refund collect-request trick
  await scrollApp(0);
  await wait(1);
  await cap('Built for Bharat', 'Works in हिंदी and मराठी', 'The whole app switches language, and it detects scams written in Hindi, Marathi and Hinglish.');
  await lang('hi');
  await wait(3);
  await cap('UPI refund trick', 'You never need a UPI PIN to receive money', 'Scammers send a “collect request” disguised as a refund. ScamKavach explains the trick.');
  await wait(0.5);
  await example(4);
  await wait(6);
  await app.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
  await wait(4.5);

  // 4. Marathi: digital arrest
  await cap('“Digital arrest”', 'Fake police and CBI threats', 'There is no such thing as a “digital arrest”. ScamKavach says so — in the user’s own language.');
  await scrollApp(0);
  await wait(1);
  await lang('mr');
  await wait(1.5);
  await example(6);
  await wait(6);
  await app.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
  await wait(4.5);

  // 5. Genuine OTP: no false alarm
  await cap('Doesn’t cry wolf', 'Real OTP messages are recognised', '57 automated tests check scams AND genuine bank, delivery and family messages.');
  await scrollApp(0);
  await wait(1);
  await lang('en');
  await wait(1);
  await example(7);
  await wait(9);

  // 6. Help right away
  await cap('Help right away', 'Warn family with one tap', 'Every scam result has a one-tap WhatsApp alert — so the warning spreads faster than the scam.');
  await scrollApp(0);
  await wait(1);
  await example(2);
  await wait(1.5);
  await scrollTo('#speak');
  await wait(6);
  await cap('Already lost money?', 'One tap to call 1930', 'Plus direct links to report at cybercrime.gov.in and Sanchar Saathi (Chakshu).');
  await scrollTo('.lost');
  await wait(6.5);
  await scrollTo('.rules');
  await cap('Prevention', '4 golden rules, always on screen', 'Simple rules that stop most UPI frauds before they start.');
  await wait(6);

  // 7. Privacy
  await scrollApp(0);
  await cap('Private by design', 'Your message never leaves your phone', 'No login. No server. Under 250 KB — works on low-end phones and slow networks.');
  await wait(9);

  // 8. Outro
  await page.evaluate(() => showOverlay('outro'));
  await wait(10);

  await cdp.send('Page.stopScreencast');
  await wait(0.5);
  const end = frames[frames.length - 1].ts + 0.5;
  const lines = frames.map((f, i) => {
    const next = i + 1 < frames.length ? frames[i + 1].ts : end;
    return `file '${f.file}'\nduration ${Math.max(next - f.ts, 0.001).toFixed(4)}`;
  });
  lines.push(`file '${frames[frames.length - 1].file}'`);
  fs.writeFileSync(path.join(OUT, 'list.txt'), lines.join('\n') + '\n');
  console.log('frames', frames.length, 'seconds', (end - frames[0].ts).toFixed(1));
  await browser.close();
})();
