#!/usr/bin/env bash
set -euo pipefail

# One-time boomerang generation. Reads the source clip already committed under
# assets/ and emits ONLY the web artifacts (boomerang + poster) into public/video/.
# ponytail: source is not re-copied — it already lives in git at the path below.

SRC="assets/davinci_locked_off__completely_static_camera__the_camera_d.mp4"
OUT="public/video"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

# First 4s, no audio.
ffmpeg -y -i "$SRC" -t 4 -an "$TMP/fwd.mp4"

# Reverse that segment.
ffmpeg -y -i "$TMP/fwd.mp4" -vf reverse -an "$TMP/rev.mp4"

# Concat forward+reverse → native-loopable boomerang. +faststart for web streaming.
# ponytail: seam knob — fwd's last frame == rev's first frame, a ~1-frame (42ms @24fps)
# repeat at the midpoint. Imperceptible here; if it ever shows, drop the dup with
# rev's `-vf reverse,trim=start_frame=1,setpts=PTS-STARTPTS`.
ffmpeg -y -i "$TMP/fwd.mp4" -i "$TMP/rev.mp4" \
  -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0" \
  -movflags +faststart "$OUT/sintra-boomerang.mp4"

# Poster = first frame, for the idle state.
ffmpeg -y -i "$SRC" -frames:v 1 -q:v 2 "$OUT/sintra-poster.webp"

echo "✓ wrote $OUT/sintra-boomerang.mp4 + sintra-poster.webp"
