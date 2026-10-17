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
**ScamKavach**: a free scam and fraud checker for UPI and SMS/WhatsApp messages.

**How it works**
1. The user pastes or forwards a suspicious message, link, phone number or UPI ID.
2. A rule engine checks it for known fraud patterns: fake KYC/bank alerts, lottery and
   prize scams, fake job offers, "collect request = refund" tricks, shortened or look-alike
   URLs, urgency or threat language, and requests for a PIN or OTP.
3. An AI layer explains the result in simple **Hindi, Marathi or English**:
   *Likely scam / Suspicious / Looks safe*, *why*, and *what to do now*.
4. If the user has already lost money, it shows the **1930** helpline and a
   **cybercrime.gov.in** reporting checklist. Reporting quickly is what makes it possible
   to freeze the money.

**Key features**
- Works on low-end phones with a lightweight web app (no install needed)
- Multilingual output with a read-aloud option for users who can't read easily
- No login, and messages aren't stored. Only anonymous counts are kept for impact tracking.
- <Any extra feature you actually build, e.g. WhatsApp bot, browser extension>

**How we used AgentFoundry (AF)**
- <Be specific and truthful, e.g. "Started the project in AF and used its agents to
  generate the scam-pattern rule set, build the web UI, write tests for 200+ sample
  scam/real messages, and iterate on the Hindi/Marathi explanations.">
```

## GitHub repository URL

```
https://github.com/Blop77/Newproject
```

## Demo URL (live app or video)

```
<https://blop77.github.io/Newproject/  or  https://youtu.be/...>
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

**Reach** (anonymous counts from the app)
- <N> unique users, <N> messages checked
- <N> flagged as likely scam (<X>%)

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
