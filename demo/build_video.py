"""Combine the recorded frames, the narration and subtitles into the final video.

Usage: python build_video.py <frames_dir> <narration_dir> <fonts_dir> <out_dir>

<frames_dir> comes from record.js (list.txt, marks.json), <narration_dir> from
tts.py, and <fonts_dir> must contain a TTF font for the burned-in subtitles.
Writes ScamKavach-demo.mp4 (voice-over + burned-in subtitles) and
ScamKavach-demo.srt (captions to upload to YouTube).
"""
import json
import os
import re
import subprocess
import sys

import numpy as np
import soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
MAX_CHUNK = 72                       # characters per subtitle card
OVERLAY_SCENES = {"title", "problem", "outro"}


def chunks(text):
    """Split a sentence into subtitle-sized pieces at natural breaks."""
    if len(text) <= MAX_CHUNK:
        return [text]
    parts = re.split(r"(?<=[.!?:,—])\s+", text)
    out, cur = [], ""
    for p in parts:
        if cur and len(cur) + 1 + len(p) > MAX_CHUNK:
            out.append(cur)
            cur = p
        else:
            cur = f"{cur} {p}".strip()
    if cur:
        out.append(cur)
    return out


def ts_srt(t):
    ms = int(round(t * 1000))
    return f"{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02},{ms % 1000:03}"


def ts_ass(t):
    cs = int(round(t * 100))
    return f"{cs // 360000}:{cs // 6000 % 60:02}:{cs // 100 % 60:02}.{cs % 100:02}"


def main():
    frames_dir, narration_dir, fonts_dir, out_dir = sys.argv[1:5]
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(HERE, "narration.json"), encoding="utf-8") as f:
        narration = json.load(f)
    with open(os.path.join(frames_dir, "marks.json")) as f:
        marks = json.load(f)

    rate = 24000
    track = np.zeros(int((marks["duration"] + 1) * rate), dtype=np.float32)
    cues = []  # (start, end, text, scene)

    for scene in narration["scenes"]:
        t = marks["scenes"][scene["id"]] + marks["lead"]
        for i, line in enumerate(scene["lines"]):
            audio, sr = sf.read(os.path.join(narration_dir, f"{scene['id']}-{i}.wav"), dtype="float32")
            assert sr == rate
            start = int(t * rate)
            track[start:start + len(audio)] += audio
            length = len(audio) / rate

            pieces = chunks(line["show"])
            total = sum(len(p) for p in pieces)
            pt = t
            for p in pieces:
                d = length * len(p) / total
                cues.append((pt, pt + d, p, scene["id"]))
                pt += d
            t += length + marks["gap"]

    track /= max(1e-6, float(np.abs(track).max())) / 0.9
    wav = os.path.join(out_dir, "narration.wav")
    sf.write(wav, track, rate)

    # Captions for YouTube. Each card stays up until the next one starts (max +0.6 s).
    srt = os.path.join(out_dir, "ScamKavach-demo.srt")
    with open(srt, "w", encoding="utf-8") as f:
        for n, (s, e, text, _) in enumerate(cues, 1):
            nxt = cues[n][0] if n < len(cues) else e + 0.6
            f.write(f"{n}\n{ts_srt(s)} --> {ts_srt(min(e + 0.6, nxt))}\n{text}\n\n")

    # Styled subtitles burned into the picture: bottom-left beside the phone,
    # bottom-centre on full-screen title cards.
    ass = os.path.join(out_dir, "subtitles.ass")
    with open(ass, "w", encoding="utf-8") as f:
        f.write(
            "[Script Info]\nScriptType: v4.00+\nPlayResX: 1920\nPlayResY: 1080\nWrapStyle: 0\n\n"
            "[V4+ Styles]\n"
            "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, "
            "Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n"
            "Style: Side,Noto Sans Devanagari,62,&H00FFFFFF,&H00FFFFFF,&H90000000,&H90000000,0,0,0,0,100,100,0,0,3,16,0,1,140,800,60,1\n"
            "Style: Center,Noto Sans Devanagari,66,&H00FFFFFF,&H00FFFFFF,&H90000000,&H90000000,0,0,0,0,100,100,0,0,3,16,0,2,240,240,60,1\n\n"
            "[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n"
        )
        for n, (s, e, text, scene_id) in enumerate(cues):
            nxt = cues[n + 1][0] if n + 1 < len(cues) else e + 0.6
            style = "Center" if scene_id in OVERLAY_SCENES else "Side"
            f.write(f"Dialogue: 0,{ts_ass(s)},{ts_ass(min(e + 0.6, nxt))},{style},,0,0,0,,{text}\n")

    mp4 = os.path.join(out_dir, "ScamKavach-demo.mp4")
    vf = f"fps=30,format=yuv420p,subtitles={ass}:fontsdir={fonts_dir}"
    subprocess.run([
        "ffmpeg", "-y", "-loglevel", "error",
        "-f", "concat", "-safe", "0", "-i", os.path.join(frames_dir, "list.txt"),
        "-i", wav,
        "-vf", vf, "-c:v", "libx264", "-preset", "medium", "-crf", "18",
        "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-c:a", "aac", "-b:a", "160k", "-ar", "48000",
        "-shortest", "-movflags", "+faststart", mp4,
    ], check=True)
    print("wrote", mp4, "and", srt, f"({len(cues)} subtitle cards)")


if __name__ == "__main__":
    main()
