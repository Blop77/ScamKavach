"""Generate the narration audio for the demo video, one WAV per sentence.

Usage: python tts.py <model.onnx> <voices.npz> <out_dir>

Uses Kokoro-82M (Apache-2.0) through the kokoro-onnx package. Writes
<out_dir>/<scene>-<n>.wav and <out_dir>/durations.json.
"""
import json
import os
import sys

import soundfile as sf
from kokoro_onnx import Kokoro

HERE = os.path.dirname(os.path.abspath(__file__))

# Indian words the English phonemizer gets wrong, as exact Kokoro phonemes.
PRONUNCIATIONS = {
    "Kavach": "kˈʌvʌtʃ",
    "Bharat": "bˈɑːɾʌt",
    "Marathi": "mʌɹˈɑːti",
    "lakh": "lˈɑːk",
}


def phonemes_for(kokoro, text):
    ph = kokoro.tokenizer.phonemize(text, "en-us")
    for word, fixed in PRONUNCIATIONS.items():
        if word in text:
            wrong = kokoro.tokenizer.phonemize(word, "en-us")
            assert wrong in ph, f"could not find {word} ({wrong}) in {ph}"
            ph = ph.replace(wrong, fixed)
    return ph


def main():
    model, voices, out = sys.argv[1:4]
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(HERE, "narration.json"), encoding="utf-8") as f:
        narration = json.load(f)

    kokoro = Kokoro(model, voices)
    durations = {}
    for scene in narration["scenes"]:
        durations[scene["id"]] = []
        for i, line in enumerate(scene["lines"]):
            ph = phonemes_for(kokoro, line["say"])
            samples, rate = kokoro.create(ph, voice=narration["voice"], speed=narration["speed"], is_phonemes=True)
            path = os.path.join(out, f"{scene['id']}-{i}.wav")
            sf.write(path, samples, rate)
            durations[scene["id"]].append(round(len(samples) / rate, 3))
            print(f"{path}: {durations[scene['id']][-1]:.2f}s")

    with open(os.path.join(out, "durations.json"), "w") as f:
        json.dump(durations, f, indent=2)


if __name__ == "__main__":
    main()
