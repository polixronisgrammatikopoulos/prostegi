#!/usr/bin/env python3
"""Extract dominant colors from the ProStegi logo."""
from PIL import Image
from collections import Counter

img = Image.open('/home/z/my-project/scripts/prostegi_assets/img1.jpeg').convert('RGB')
img = img.resize((200, 200))
pixels = list(img.getdata())

# Quantize colors to buckets of 16
def bucket(c, step=16):
    return tuple((v // step) * step for v in c)

counts = Counter(bucket(p) for p in pixels)
print("Top 12 color buckets (RGB -> HEX, share):")
total = len(pixels)
for color, count in counts.most_common(12):
    hexc = '#%02x%02x%02x' % color
    print(f"  {color} -> {hexc}  {count/total*100:.1f}%")

# Filter out near-white/near-gray background to find brand colors
print("\nSaturated brand colors only:")
brand = Counter()
for p in pixels:
    r, g, b = p
    mx, mn = max(p), min(p)
    if mx - mn > 40 and mx > 60:  # saturated, not too dark
        brand[bucket(p)] += 1
for color, count in brand.most_common(10):
    hexc = '#%02x%02x%02x' % color
    print(f"  {color} -> {hexc}  {count/total*100:.1f}%")
