// Records the ScamKavach demo video: drives the real app inside a phone frame
// and captures frames with the Chrome DevTools screencast.
//
// Usage: node record.js <frames_dir> <stage_url> <durations.json>
// Each scene lasts at least as long as its narration (from tts.py), and the
// start time of every scene is written to <frames_dir>/marks.json so
// build_video.py can place the voice-over and subtitles exactly.
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PW);

const [OUT, URL, DURATIONS] = process.argv.slice(2);
const speech = JSON.parse(fs.readFileSync(DURATIONS, 'utf8'));
const LEAD = 0.4;   // seconds of picture before the voice starts
const GAP = 0.35;   // pause between sentences
const TAIL = 0.7;   // seconds after the voice ends

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

function speechLength(id) {
  const lines = speech[id] || [];
  return lines.length ? LEAD + lines.reduce((a, b) => a + b, 0) + GAP * (lines.length - 1) + TAIL : 0;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(URL);
  await page.waitForLoadState('networkidle');
  const app = page.frames().find((f) => /\/index\.html/.test(f.url()));
  await app.waitForSelector('#check');
  // The phone frame is CSS-scaled, so click through the DOM rather than the mouse.
  const click = (sel) => app.$eval(sel, (el) => el.click());
  await click('button[data-lang="en"]');
  await page.evaluate(() => showOverlay('title'));
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
  const now = () => Date.now() / 1000;
  const cap = (step, title, body) => page.evaluate(([a, b, c]) => caption(a, b, c), [step, title, body]);
  const scrollApp = (y) => app.evaluate((top) => window.scrollTo({ top, behavior: 'smooth' }), y);
  const scrollBy = (y) => app.evaluate((top) => window.scrollBy({ top, behavior: 'smooth' }), y);
  const scrollTo = (sel) => app.evaluate((s) => document.querySelector(s).scrollIntoView({ behavior: 'smooth', block: 'start' }), sel);
  const example = (n) => click(`#example-list button:nth-child(${n})`);
  const lang = (l) => click(`button[data-lang="${l}"]`);

  const marks = {};
  async function scene(id, minSeconds, actions) {
    const start = now();
    marks[id] = start;
    await actions();
    const remaining = start + Math.max(minSeconds, speechLength(id)) - now();
    if (remaining > 0) await wait(remaining);
  }

  await wait(0.3);

  await scene('title', 4, async () => {});

  await scene('problem', 8, async () => {
    await page.evaluate(() => showOverlay('problem'));
  });

  await scene('paste', 7, async () => {
    await cap('How it works', 'Paste any suspicious message', 'An SMS, a WhatsApp forward or just a link — ScamKavach checks it instantly.');
    await page.evaluate(() => hideOverlay());
    await wait(1.2);
    await app.focus('#msg');
    await app.type('#msg', 'Dear Customer, your SBI YONO account will be blocked today. Update your PAN immediately: http://sbi-kyc-update.xyz/login', { delay: 26 });
  });

  await scene('verdict', 10, async () => {
    await click('#check');
    await wait(0.4);
    await cap('Instant verdict', 'Very likely a scam — and exactly why', 'It caught the fake SBI look-alike link, the account-block threat and the panic words.');
    await wait(4.5);
    await scrollBy(330);
    await wait(3.5);
    await scrollBy(330);
  });

  await scene('steps', 5, async () => {
    await cap('Clear next steps', 'Tells you what to do now', 'Don’t click, don’t pay, never share an OTP — block and report the sender.');
    await scrollTo('#todo');
  });

  await scene('hindi', 4, async () => {
    await cap('Built for Bharat', 'Works in हिंदी and मराठी', 'The whole app switches language, and it detects scams written in Hindi, Marathi and Hinglish.');
    await scrollApp(0);
    await wait(1);
    await lang('hi');
  });

  await scene('refund', 7, async () => {
    await cap('UPI refund trick', 'You never need a UPI PIN to receive money', 'Scammers send a “collect request” disguised as a refund. ScamKavach explains the trick.');
    await example(4);
    await wait(3.5);
    await scrollBy(300);
  });

  await scene('marathi', 8, async () => {
    await cap('“Digital arrest”', 'Fake police and CBI threats', 'There is no such thing as a “digital arrest”. ScamKavach says so — in the user’s own language.');
    await scrollApp(0);
    await wait(1);
    await lang('mr');
    await wait(1);
    await example(6);
    await wait(3.5);
    await scrollBy(300);
  });

  await scene('otp', 8, async () => {
    await cap('Doesn’t cry wolf', 'Real OTP messages are recognised', '57 automated tests check scams AND genuine bank, delivery and family messages.');
    await scrollApp(0);
    await wait(1);
    await lang('en');
    await wait(0.8);
    await example(7);
  });

  await scene('warn', 6, async () => {
    await cap('Help right away', 'Warn family with one tap', 'Every scam result has a one-tap WhatsApp alert — so the warning spreads faster than the scam.');
    await scrollApp(0);
    await wait(0.8);
    await example(2);
    await wait(1.2);
    await scrollTo('#speak');
  });

  await scene('helpline', 6, async () => {
    await cap('Already lost money?', 'One tap to call 1930', 'Plus direct links to report at cybercrime.gov.in and Sanchar Saathi (Chakshu).');
    await scrollTo('.lost');
  });

  await scene('rules', 5, async () => {
    await cap('Prevention', '4 golden rules, always on screen', 'Simple rules that stop most UPI frauds before they start.');
    await scrollTo('.rules');
  });

  await scene('privacy', 6, async () => {
    await cap('Private by design', 'Your message never leaves your phone', 'No login. No server. Under 250 KB — works on low-end phones and slow networks.');
    await scrollApp(0);
  });

  await scene('outro', 9, async () => {
    await page.evaluate(() => showOverlay('outro'));
  });
  await wait(1.5);

  await cdp.send('Page.stopScreencast');
  await wait(0.5);
  const t0 = frames[0].ts;
  const end = now();
  const lines = frames.map((f, i) => {
    const next = i + 1 < frames.length ? frames[i + 1].ts : end;
    return `file '${f.file}'\nduration ${Math.max(next - f.ts, 0.001).toFixed(4)}`;
  });
  lines.push(`file '${frames[frames.length - 1].file}'`);
  fs.writeFileSync(path.join(OUT, 'list.txt'), lines.join('\n') + '\n');

  const relative = {};
  for (const [id, t] of Object.entries(marks)) relative[id] = +(t - t0).toFixed(3);
  fs.writeFileSync(path.join(OUT, 'marks.json'), JSON.stringify({ duration: +(end - t0).toFixed(3), lead: LEAD, gap: GAP, scenes: relative }, null, 2));
  console.log('frames', frames.length, 'seconds', (end - t0).toFixed(1));
  await browser.close();
})();
