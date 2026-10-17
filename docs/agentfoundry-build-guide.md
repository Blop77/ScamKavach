# Rebuilding ScamKavach in AgentFoundry

The first prototype of ScamKavach was built with Claude Code. This guide is for rebuilding the app
**inside AgentFoundry (AF)**, using AF's agents, so the submitted app is genuinely built in AF.

Paste the prompts below into AF's **CLAUDE CODE** (or SMART-CODE) tab **one at a time**. After each
one, read what the agent did, test it, and fix anything with follow-up messages before moving on.
That review-and-steer work is the real "building with agents" the hackathon is about.

> Keep a short log as you go (what you asked, what you changed, what broke and how you fixed it).
> You will need it for the "How we used AgentFoundry" field of the submission form.

---

## Setup (once)

1. In AgentFoundry click **+ Create New Project** and create an empty folder,
   e.g. `Documents\ScamKavach-AF`.
2. Open the **CLAUDE CODE** tab in that project.

---

## Prompt 1 — Project brief and detection engine

```
We are building "ScamKavach": a free, offline, privacy-first web app that checks whether an SMS,
WhatsApp message or link received by an Indian user looks like a scam, explains why in plain
language, and tells them what to do. Interface languages: English, Hindi and Marathi.
Plain HTML/CSS/JavaScript, no frameworks, no build step, no server. The message must never leave
the device. It will be hosted on GitHub Pages.

First, create js/engine.js: a pure, dependency-free detection engine that works both in the
browser (window.ScamEngine) and in Node (module.exports), exposing analyze(message).

How it works:
- Normalise text: Unicode NFC, lower-case, remove zero-width characters.
- A list of weighted rules. Each rule has an id, a weight and several regex patterns. A rule adds
  its weight once if any pattern matches. Patterns must cover English, Hindi (Devanagari),
  Marathi (Devanagari) and Hinglish (Hindi in Latin letters). Note: \b does not work with
  Devanagari in JavaScript, so Devanagari patterns must be plain substrings.
- Rules (id: weight — what it detects):
  otp_request: 6 — asking the user to share/tell/send an OTP, PIN, CVV or password
  upi_pin_receive: 6 — "enter UPI PIN / scan QR / accept collect request to RECEIVE money/refund"
  remote_app: 6 — AnyDesk, TeamViewer, QuickSupport, screen sharing, .apk files
  authority_threat: 5 — police, CBI, customs, court, FIR, TRAI, "digital arrest", parcel with drugs
  kyc_block: 3 — KYC/PAN/Aadhaar update or account/card/SIM will be blocked or suspended
  prize: 4 — lottery, KBC, lucky draw, "you have won", claim your reward
  electricity: 4 — electricity will be disconnected tonight / call the officer
  task_scam: 4 — like videos, rate hotels, Telegram tasks, prepaid tasks
  investment: 4 — guaranteed returns, double your money, X% daily profit
  trading_group: 3 — stock tips, trading/VIP groups, crypto trading, IPO allotment
  job_offer: 3 — work from home, part-time job, earn Rs X per day
  fee_request: 3 — processing/registration/customs/delivery fee or deposit before a prize or job
  loan: 3 — instant / pre-approved loan, no documents, no CIBIL
  impersonation: 3 — "this is my new number", "I am in trouble, send money urgently"
  urgency: 2 — immediately, urgent, today, tonight, within 24 hours, last warning
  secrecy: 2 — don't tell your family, keep this secret
  call_number: 2 — call/WhatsApp a personal 10-digit Indian mobile number
  money_request: 1 — pay/send/transfer Rs X
- IMPORTANT: genuine bank OTP messages say "do not share this OTP". Before checking otp_request,
  strip negated phrases ("do not share", "never share", "share mat karo", "साझा न करें",
  "सांगू नका", ...) so real OTP messages are NOT flagged. Return otpNotice: true for a genuine OTP
  message so the UI can show a gentle reminder instead of a warning.
- Link analysis: extract URLs and bare domains, then flag:
  link_lookalike: 6 — domain contains a bank/brand name (sbi, hdfc, icici, paytm, phonepe, npci,
    uidai, aadhaar, amazon, flipkart, mahadiscom, ...) but is not on that brand's official domain.
    Treat *.gov.in, *.nic.in and *.bank.in as official.
  link_shortener: 3 (bit.ly, tinyurl, cutt.ly, ...), link_ip: 4, link_punycode: 4 (xn--),
  link_bait: 3 (kyc/verify/reward/refund/claim words in the domain),
  link_tld: 2 (.xyz, .top, .click, .online, ...), link_http: 1 (http instead of https).
- Score = sum of weights. score >= 6 → level "scam"; 3–5 → "suspicious"; below 3 → "low".
  Empty input → "empty".
- Return { level, score, signals: [{ id, weight, match, host? }], otpNotice }, signals sorted by
  weight, where match is the exact text that triggered the rule.
```

## Prompt 2 — Tests

```
Create tests/engine.test.js using Node's built-in test runner (node:test), runnable with
`node --test`. Include at least 15 realistic scam messages (English, Hindi, Marathi, Hinglish)
that must score "scam", 2 that must be at least "suspicious", and at least 10 GENUINE messages
that must score "low" — bank OTPs in all three languages that say "do not share", a UPI debit
alert, a Swiggy delivery, a family chat, a real electricity bill linking to the official website,
links to onlinesbi.sbi and sbi.bank.in, and a college notice. Also test that genuine OTP messages
produce no signals at all, that otpNotice works, and that empty input returns "empty".
Run the tests and fix the engine until they all pass. Do not weaken a test to make it pass.
```

Add scam messages that you, your family or friends have **actually received** — they make the
project stronger and are honest evidence of the problem.

## Prompt 3 — Translations

```
Create js/i18n.js (works in browser and Node) with all user-facing text in English, Hindi and
Marathi: tagline, input label and placeholder, buttons, verdict titles for scam / suspicious /
low, a note that "low" does not guarantee safety, a plain-language reason for EVERY rule id in
engine.js (with {host} placeholders for link rules), advice lists per level, an "otpNotice" text,
an "Already lost money?" section (call 1930, report at cybercrime.gov.in, call your bank,
report at sancharsaathi.gov.in Chakshu), 4 golden rules (never share OTP/PIN; no PIN needed to
receive money; there is no "digital arrest"; never install APK/screen-sharing apps), a
disclaimer that it is not affiliated with any bank/NPCI/government, a WhatsApp warning message,
and 7 example messages per language (KYC block, lottery, task job, UPI refund, electricity cut,
digital arrest, real OTP). Use simple words a first-time smartphone user understands.
Then add tests that every language has the same keys, every rule id has a reason, and every
example gives the expected verdict.
```

Ask a native Hindi and a native Marathi speaker to read the translations and fix anything odd.

## Prompt 4 — The app

```
Build the user interface: index.html, css/style.css, js/app.js and js/config.js
(config holds siteUrl and an optional feedbackUrl for a Google Form).
Requirements:
- Mobile-first, large readable text, high contrast, works at 360px width with no sideways
  scrolling, light and dark mode.
- Header with a shield logo, the name ScamKavach and English / हिंदी / मराठी buttons. Remember
  the chosen language (localStorage, wrapped in try/catch); default from the browser language.
- A textarea, "Check message" and "Clear" buttons, and "Try an example" chips.
- A result card coloured red / amber / green with the verdict, the reasons (each showing the
  exact text that was found), what to do, a "Read aloud" button (Web Speech API, hi-IN / mr-IN /
  en-IN voices, fall back to a Hindi voice for Marathi), and a "Warn family on WhatsApp" button
  (wa.me link) for scam and suspicious results.
- Always-visible "Already lost money?" card with a big tap-to-call 1930 button, and a
  "4 golden rules" card.
- Footer with the feedback link (hidden if feedbackUrl is empty), the disclaimer and a link to
  the GitHub repo.
- Never insert user text with innerHTML — use textContent.
- Use the Noto Sans Devanagari font, self-hosted in fonts/ (no third-party requests).
- Support ?msg=... in the URL to open the checker pre-filled.
```

Then open `index.html` in your browser (or run `python -m http.server 8000`) and test every
example in every language on your phone screen size. Ask the agent to fix whatever looks wrong.

## Prompt 5 — README, licence and CI

```
Write a README.md (problem with sourced statistics, features, how detection works, how to run
locally, how to run tests, how to deploy on GitHub Pages, how to collect impact data with the
feedback form, how to add a new scam rule, limitations, credits). Add an MIT LICENSE, a
.nojekyll file, a manifest.webmanifest + icon.svg, and a GitHub Actions workflow
(.github/workflows/test.yml) that runs `node --test` on every push.
```

## Ideas to go further in AF (each one is a real feature you can describe)

- Offline mode with a service worker, so it works with no internet after the first visit.
- Another language (Gujarati, Tamil, Bengali, …).
- Share-to-app on Android (Web Share Target), so users can share an SMS straight into ScamKavach.
- More rules from real scam messages people send you through the feedback form.

---

## Publishing the AF-built version

When the AF project works and all tests pass:

1. Copy these from `ScamKavach-AF` into your `ScamKavach` folder, replacing the old ones:
   `index.html`, `css/`, `js/`, `tests/`, `fonts/`, `icon.svg`, `manifest.webmanifest`,
   `README.md`, `LICENSE`, `.nojekyll`, `.github/`. Keep `demo/`, `docs/` and `SUBMISSION_DRAFT.md`.
2. In the AF terminal inside `ScamKavach`:
   ```
   node --test
   git add -A
   git commit -m "Rebuild app in AgentFoundry"
   git -c credential.helper= push
   ```
3. Check the live site, and re-record the demo video if the app now looks different.

In the submission form, describe it honestly, e.g. *"We prototyped the idea with Claude Code, then
rebuilt and extended the app in AgentFoundry using its agents: …"* followed by what you did.
