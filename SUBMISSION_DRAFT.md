# Code for a Billion — Submission Draft

Draft answers for the issue form at
https://github.com/karlmehta/code-for-a-billion/issues/new?template=submission.yml

Replace everything in `<ANGLE BRACKETS>` before submitting. Never put a number
in "Deployment & impact data" that you did not actually measure.

---

## Title

```
[Submission] <Team name> — ScamKavach
```

## Team / Project name

```
<Team name> — ScamKavach
```

## Team members (names + GitHub handles)

```
<Your name> (@Blop77), <Teammate> (@<handle>)
```

## Problem statement

```
Hundreds of millions of Indians now pay through UPI. Many of them are first-time digital
users, elderly people or people who don't read English, and every day they get fake KYC
alerts, "you've won a prize" links, fake job offers and UPI "collect" requests made to look
like refunds. Most victims can't tell a scam from a real message until their money is gone,
and many never report it because they don't know about the 1930 helpline or cybercrime.gov.in.
ScamKavach lets anyone check a suspicious message in seconds, in their own language,
before they tap or pay.
```

## What you built

```markdown
**ScamKavach**: a free scam checker for UPI, SMS and WhatsApp messages, in English, हिंदी and मराठी.
Live: https://blop77.github.io/ScamKavach/

**How it works**
1. The user pastes a suspicious message or link (or taps an example).
2. A detection engine with 18 weighted rules and a link analyser checks it for known Indian fraud
   patterns: OTP/PIN requests, "enter UPI PIN to receive money" collect-request tricks, fake KYC and
   account-block threats, KBC/lottery prizes, electricity-disconnection threats, task jobs, fake
   trading groups, AnyDesk/APK installs, "digital arrest" threats, fees before a job or prize, instant
   loan apps and family impersonation. It works on messages written in English, Hindi, Marathi and
   Hinglish.
3. The link analyser catches look-alike bank links (e.g. `sbi-kyc-update.xyz`) by comparing them
   against official domains and the `.gov.in` / `.bank.in` suffixes, plus URL shorteners, IP links
   and risky domains.
4. The result is shown in plain language: *Very likely a scam / Suspicious / No common scam signs
   found*, with **why** (the exact words that triggered it) and **what to do now**.
5. If the user has already lost money, there is a one-tap call to **1930** plus links to
   **cybercrime.gov.in** and **Sanchar Saathi (Chakshu)**.

**Key features**
- **Private by design:** everything runs on the phone. No login, no server, the message is never uploaded.
- **Doesn't cry wolf:** recognises genuine "do not share" OTP messages. 57 automated tests cover
  both scams and real bank, delivery and family messages.
- Read-aloud for users who find reading hard, and a one-tap "Warn family on WhatsApp" share.
- Under 250 KB and no install, so it works on low-end phones and slow networks.

**How we used AgentFoundry (AF)**
- <Be specific and truthful about what you did in AF, e.g. which features or rules you built or
  improved there, and how its agents helped.>
```

## GitHub repository URL

```
https://github.com/Blop77/ScamKavach
```

## Demo URL (live app or video)

```
https://blop77.github.io/ScamKavach/   (video: <YouTube link once uploaded>)
```

## Scale & severity of the problem

```markdown
**Scale: how many citizens face this problem**
- **55.49 crore** users were onboarded on UPI as of June 2026 (NPCI, via a Lok Sabha reply
  by the MoS Finance). Every one of them is a target for payment scams.
- **36.37 lakh** financial-fraud incidents were reported on NCRP/CFCFRMS in **2024**, up
  from 24.43 lakh in 2023 (Ministry of Home Affairs, Lok Sabha, July 2025).
- **12.64 lakh** UPI fraud incidents in **FY2024-25** and **10.64 lakh** in FY2025-26 up to
  November alone (Ministry of Finance, Lok Sabha).
- The real numbers are higher: in a LocalCircles survey, **51%** of UPI fraud victims said
  they never filed a complaint.

**Severity: the human and economic loss**
- Indians lost **₹22,845 crore** to cyber fraud in **2024**, a **206% jump** from ₹7,465 crore
  in 2023 (MHA, Lok Sabha, July 2025).
- UPI fraud alone caused about **₹981 crore** of losses in FY2024-25 (Ministry of Finance).
- The people hit hardest are the ones who can least afford it: elderly people losing their
  savings, daily-wage workers, students and first-time digital users. Money is rarely
  recovered unless the fraud is reported within the first few hours, and most victims
  don't know how to report it.

**Sources**
- MHA Lok Sabha reply, July 2025 (₹22,845 cr; 36.37 lakh incidents):
  https://scroll.in/latest/1084796/indians-lost-rs-22845-crore-to-cyber-fraud-in-2024-a-206-rise-from-previous-year-centre
- Ministry of Finance Lok Sabha reply on UPI fraud (FY22–FY26):
  https://ianslive.in/upi-frauds-worth-rs-805-crore-witnessed-this-fiscal-so-far-minister--20251215175703
- UPI user base (55.49 crore, June 2026):
  https://www.newsbytesapp.com/news/business/parliament-says-upi-has-nearly-5549-million-users-under-npci/tldr
- LocalCircles survey on UPI fraud underreporting:
  https://www.business-standard.com/finance/news/upi-transaction-fraud-india-survey-one-in-five-users-hit-localcircles-125062601141_1.html
```

## Deployment & impact data

Fill this in **only with real numbers** you collected. Template:

```markdown
**Deployment**
- Live since <date> at <URL>. Shared through <college WhatsApp groups / housing societies
  in Pune / family groups / a session at MIT-WPU / ...>.

**Reach** (from your feedback form / survey and share counts)
- <N> people used it (survey responses, WhatsApp group members reached, etc.)
- <N> scam messages they reported checking

**Outcomes**
- In a follow-up survey of <N> users: <X>% said ScamKavach stopped them from clicking or
  paying; <X>% learned about the 1930 helpline for the first time.
- <Real story, with permission: "A user's parent got a fake electricity-bill disconnection
  SMS; ScamKavach flagged it and they didn't call the number.">

**Before / after**
- Before: <X>% of surveyed users could correctly spot 5 sample scams.
- After 1 week of using ScamKavach: <Y>%.
```

## Track / category

```
Financial Inclusion
```

## Contact email

```
<your email>
```

## Confirmations

Tick these only when each one is actually true:

- [ ] Built using AgentFoundry (AF), the official IDE
- [ ] Our repository is public and includes a README with setup steps
- [ ] The demo link works and is accessible to judges
