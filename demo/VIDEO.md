# Demo video

`ScamKavach-demo.mp4` is a 2 min 7 s, 1080p silent walkthrough of the real app, with on-screen captions.
`thumbnail.jpg` is the matching YouTube thumbnail.

## Upload to YouTube

1. Go to https://studio.youtube.com, click **Create → Upload videos** and choose `ScamKavach-demo.mp4`.
2. Paste the title and description below, and upload `thumbnail.jpg` as the thumbnail.
3. Under **Audience**, choose **No, it's not made for kids**.
4. Under **Visibility**, choose **Public** or **Unlisted**. Both let judges open the link; Private does not.
5. Copy the link (e.g. `https://youtu.be/...`) into the **Demo URL** field of the submission form.

**Title**

```
ScamKavach — Free UPI & SMS Scam Checker in English, Hindi, Marathi | Code for a Billion
```

**Description**

```
ScamKavach checks a suspicious SMS, WhatsApp message or link before you click, call or pay —
in English, हिंदी and मराठी.

Try it free: https://blop77.github.io/Newproject/
Source code: https://github.com/Blop77/Newproject

What it does:
• Instant verdict: Very likely a scam / Suspicious / No common scam signs found
• Explains WHY, showing the exact words or link that triggered the warning
• Catches fake KYC links, UPI "collect request" refund tricks, OTP requests, lottery/KBC,
  electricity-cut threats, task jobs, fake trading groups, AnyDesk/APK, "digital arrest" and more
• Recognises genuine OTP messages, so it doesn't cry wolf
• Lost money? One tap to call 1930, plus links to cybercrime.gov.in and Sanchar Saathi
• Private: runs on your phone, nothing is uploaded

Built for the Code for a Billion hackathon (Financial Inclusion track).

Lost money to cyber fraud in India? Call 1930 immediately and report at cybercrime.gov.in.
```

## Add a voice-over (recommended)

Judges remember a human voice. Record yourself reading this script over the video, for example
with the free YouTube Studio editor, CapCut or your phone's video editor. The times are approximate.

| Time | Narration |
|---|---|
| 0:00 | "Hi, we are Team ___, and this is ScamKavach." |
| 0:05 | "Indians lost over twenty-two thousand crore rupees to cyber fraud in 2024. That's three times more than the year before. And half of UPI fraud victims never even report it." |
| 0:19 | "ScamKavach is simple. You paste any suspicious SMS, WhatsApp message or link…" |
| 0:27 | "…and instantly see whether it's a scam, and exactly why. Here it caught a fake SBI link pretending to be the bank, an account-block threat and panic words like 'immediately'." |
| 0:43 | "Then it tells you what to do: don't click, don't pay, never share an OTP, and report the sender." |
| 0:50 | "It's built for Bharat. The whole app works in Hindi and Marathi, and it catches scams written in Hindi, Marathi and Hinglish. This is the UPI refund trick. Remember: you never need a UPI PIN to receive money." |
| 1:03 | "Here's a 'digital arrest' threat in Marathi. ScamKavach explains that there is no such thing as a digital arrest." |
| 1:12 | "It doesn't cry wolf. A genuine bank OTP message is recognised as normal, and we test it against real bank, delivery and family messages." |
| 1:23 | "With one tap you can warn your family on WhatsApp. If you've already lost money, you can call 1930, the cyber crime helpline, right from the app." |
| 1:39 | "And it's private: your message never leaves your phone. No login, no server, and it works on low-end phones." |
| 1:54 | "Try it free at blop77.github.io/Newproject. Thank you!" |

## Re-recording

The video is generated from the real app by `record.js` and `stage.html`. To re-record after changing the app:

```bash
python3 -m http.server 8765          # from the repo root
PW=$(npm root -g)/playwright node demo/record.js /tmp/frames http://localhost:8765/demo/stage.html
ffmpeg -f concat -safe 0 -i /tmp/frames/list.txt -vf "fps=30,format=yuv420p" \
  -c:v libx264 -crf 18 -movflags +faststart demo/ScamKavach-demo.mp4
```

This needs Node.js with Playwright installed globally (`npm i -g playwright`) and ffmpeg.
