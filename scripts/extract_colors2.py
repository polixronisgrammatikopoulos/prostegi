#!/usr/bin/env python3
"""Refine exact brand colors from logo."""
from PIL import Image
from collections import Counter

img = Image.open('/home/z/my-project/scripts/prostegi_assets/img1.jpeg').convert('RGB')
img = img.resize((400, 400))
pixels = list(img.getdata())

# Fine-grained: only strongly saturated pixels, bucket of 8
def bucket(c, step=8):
    return tuple((v // step) * step + step // 2 for v in c)

green = Counter()
navy = Counter()
for p in pixels:
    r, g, b = p
    if g > r + 30 and g > b + 30 and g > 80:
        green[bucket(p)] += 1
    if b > r + 40 and b >= g and b > 90 and r < 120:
        navy[bucket(p)] += 1

print("GREEN candidates:", ['#%02x%02x%02x (%d)' % (c[0], c[1], c[2], n) for c, n in green.most_common(5)])
print("NAVY candidates:", ['#%02x%02x%02x (%d)' % (c[0], c[1], c[2], n) for c, n in navy.most_common(5)])
