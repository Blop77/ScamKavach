# ScamKavach 🛡️

**Check a suspicious message before you click, call or pay.**

ScamKavach is a free scam checker for UPI, SMS and WhatsApp messages in **English, हिंदी and मराठी**.
Paste a message or link and it tells you in plain language whether it looks like a scam, **why**,
and **what to do next**. That includes the 1930 cyber-fraud helpline if you have already lost money.

**Live app:** https://blop77.github.io/Newproject/

Built for the [Code for a Billion](https://github.com/karlmehta/code-for-a-billion) hackathon, **Financial Inclusion** track.

---

## The problem

- Indians lost **₹22,845 crore** to cyber fraud in 2024, up 206% from 2023. There were **36.37 lakh**
  financial-fraud complaints (Ministry of Home Affairs, Lok Sabha, July 2025).
- There were **12.64 lakh** UPI fraud incidents in FY2024-25 (Ministry of Finance, Lok Sabha).
- **51%** of UPI fraud victims never report it (LocalCircles survey).
- The people hit hardest are first-time digital users, elderly people and people who don't read English.

## What it does

| Feature | Details |
|---|---|
| Instant verdict | **Very likely a scam** / **Suspicious** / **No common scam signs found** |
| Explains why | Every warning shows the exact words or link that triggered it |
| 3 languages | English, Hindi and Marathi interfaces, and it detects scams written in all three, plus Hinglish |
| Link checks | Look-alike bank links (`sbi-kyc-update.xyz`), URL shorteners, IP links, risky domains, `http` links |
| Real OTP detection | Recognises genuine "do not share" OTP messages so it doesn't cry wolf |
| Lost money? | One-tap call to **1930**, plus links to cybercrime.gov.in and Sanchar Saathi (Chakshu) |
| Read aloud | Reads the result out loud for people who find reading hard |
| Warn family | One tap shares a scam alert on WhatsApp |
| Private | Runs entirely in the browser. **No login, no server, the message is never uploaded.** |
| Low-end friendly | Plain HTML/CSS/JS, under 250 KB including fonts, and works on any phone browser |

### Scam types it catches

OTP / PIN / CVV requests · "enter UPI PIN to receive money" and collect-request tricks · fake KYC and
account-block threats · lottery / KBC prizes · electricity disconnection threats · "task" jobs
(like videos, Telegram tasks) · fake trading groups and guaranteed returns · screen-sharing apps
(AnyDesk) and APK files · police / CBI / "digital arrest" threats · fees before a job or prize ·
instant loan apps · "new number, need money" family impersonation · urgency and secrecy pressure.

## How it works

```
message ──► normalise (lower-case, Unicode NFC)
        ├─► 18 pattern rules (English + Hindi + Marathi + Hinglish), each with a weight
        └─► link analyser (look-alike brands vs official domains, shorteners, TLDs, IPs)
                         │
             total score ├─ ≥ 6  → Very likely a scam
                         ├─ 3–5  → Suspicious
                         └─ < 3  → No common scam signs found
```

- `js/engine.js`: the detection rules. It's pure JavaScript with no dependencies and works offline.
- `js/i18n.js`: all text and example messages in English, Hindi and Marathi.
- `js/app.js`: the user interface.
- `tests/engine.test.js`: 57 tests on real scam patterns **and genuine messages**, to catch false alarms.

Before matching OTP requests, the engine strips negations ("do not share", "साझा न करें", "सांगू नका").
That way real bank OTP messages are not flagged.

## Run it locally

No build step and no install. You only need a web browser.

```bash
git clone https://github.com/Blop77/Newproject.git
cd Newproject
python3 -m http.server 8000      # or any static file server
# open http://localhost:8000
```

Run the tests (Node.js 18 or newer):

```bash
node --test
```

## Deploy (GitHub Pages)

1. Open the repo's **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Pick the branch with this code and the **/ (root)** folder, then click **Save**.
4. After about a minute the app is live at `https://<your-username>.github.io/<repo-name>/`.

If the address is different, update `siteUrl` in `js/config.js`.

## Collecting impact data

The app stores nothing, so collect usage and outcomes with a short feedback form:

1. Create a Google Form, for example: *Did ScamKavach stop you from clicking or paying? Which scam was it? Did you know about 1930 before?*
2. Paste its link into `feedbackUrl` in `js/config.js`. A "Was this helpful?" link then appears in the footer.

## Adding a new scam pattern

1. Add a rule to `RULES` in `js/engine.js` (`id`, `weight`, `patterns`).
2. Add the explanation for that `id` under `reasons` in **all three languages** in `js/i18n.js`.
3. Add a scam example **and** a genuine look-alike message to `tests/engine.test.js`, then run `node --test`.

## Limitations

- It is pattern-based, so brand-new scam wording can slip through. "No common scam signs found" does **not** mean safe.
- The Hindi and Marathi texts should be reviewed by native speakers.
- It is not affiliated with any bank, NPCI or government body.

## Credits

- Font: [Noto Sans Devanagari](https://fonts.google.com/noto/specimen/Noto+Sans+Devanagari), SIL Open Font License 1.1.
- Statistics: Ministry of Home Affairs and Ministry of Finance replies in the Lok Sabha, NPCI, LocalCircles.
- Helplines: National Cyber Crime Helpline **1930**, [cybercrime.gov.in](https://cybercrime.gov.in), [Sanchar Saathi](https://sancharsaathi.gov.in).

## License

MIT. See [LICENSE](LICENSE).
