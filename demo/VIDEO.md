# Demo video

| File | What it is |
|---|---|
| `ScamKavach-demo.mp4` | 2 min 1 s, 1080p walkthrough of the real app, with an English voice-over and burned-in subtitles |
| `ScamKavach-demo.srt` | The same subtitles as a separate file, for YouTube captions |
| `thumbnail.jpg` | YouTube thumbnail |

The voice-over is an AI voice (Kokoro-82M, Apache-2.0), generated from `narration.json`.

## Upload to YouTube

1. Go to https://studio.youtube.com, click **Create → Upload videos** and choose `ScamKavach-demo.mp4`.
2. Paste the title and description below, and upload `thumbnail.jpg` as the thumbnail.
3. Under **Audience**, choose **No, it's not made for kids**.
4. *Optional:* under **Subtitles**, choose **Upload file → With timing** and select `ScamKavach-demo.srt`.
   The subtitles are already in the picture; uploading the file as well lets YouTube auto-translate them
   (e.g. into Hindi) for viewers who turn on captions.
5. Under **Visibility**, choose **Public** or **Unlisted**. Both let judges open the link; Private does not.
6. Copy the link (e.g. `https://youtu.be/...`) into the **Demo URL** field of the submission form.

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
Narration: AI voice (Kokoro TTS).

Lost money to cyber fraud in India? Call 1930 immediately and report at cybercrime.gov.in.
```

## Changing the narration

Edit `narration.json`. Each line has `show` (the subtitle text) and `say` (what the voice reads).
Write `say` the way it should sound: "U P I" for UPI, "one, nine, three, zero" for 1930.
Indian words the voice mispronounces are fixed in `PRONUNCIATIONS` in `tts.py`.

## Rebuilding the video

The video is generated from the real app, so it can be rebuilt after the app changes.

Requirements: Node.js with Playwright (`npm i -g playwright`), ffmpeg with libass, and Python 3 with
`pip install kokoro-onnx soundfile fonttools brotli`. You also need the Kokoro model and voices:

- model: `model_quantized.onnx` from `onnx-community/Kokoro-82M-v1.0-ONNX` on Hugging Face
  (also on npm as the `kokoro-q8-shards` package; join its six parts in order)
- voices: the `voices/*.bin` files in the `kokoro-js` npm package, packed into one `.npz`:
  `python -c "import numpy as np,glob,os; np.savez('voices.npz', **{os.path.basename(f)[:-4]: np.fromfile(f, np.float32).reshape(-1,1,256) for f in glob.glob('voices/*.bin')})"`
- subtitle font: convert `fonts/noto-sans-devanagari-latin.woff2` to TTF into a folder, e.g. with fontTools

```bash
python3 -m http.server 8765                                              # from the repo root, keep running
python demo/tts.py model_quantized.onnx voices.npz /tmp/narration        # 1. voice, one WAV per sentence
PW=$(npm root -g)/playwright node demo/record.js /tmp/frames \
  http://localhost:8765/demo/stage.html /tmp/narration/durations.json    # 2. record, timed to the voice
python demo/build_video.py /tmp/frames /tmp/narration /tmp/subfonts demo  # 3. mix voice, subtitles, encode
```
