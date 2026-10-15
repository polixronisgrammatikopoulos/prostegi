#!/usr/bin/env python3
"""Transparent logo v2: global chroma-key + smooth alpha edges."""
from PIL import Image, ImageFilter

SRC = '/home/z/my-project/scripts/prostegi_assets/img1.jpeg'
img = Image.open(SRC).convert('RGB')
w, h = img.size
px = img.load()

# Background color from corners
corners = [px[0, 0], px[w-1, 0], px[0, h-1], px[w-1, h-1]]
bg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))
print('bg:', '#%02x%02x%02x' % bg)

TOL = 30
TOL2 = 48

rgba = Image.new('RGBA', (w, h))
out = rgba.load()
for y in range(h):
    for x in range(w):
        r, g, b = px[x, y]
        d = max(abs(r-bg[0]), abs(g-bg[1]), abs(b-bg[2]))
        if d <= TOL:
            a = 0
        elif d >= TOL2:
            a = 255
        else:
            a = int((d - TOL) / (TOL2 - TOL) * 255)
        out[x, y] = (r, g, b, a)

# Smooth the alpha channel edges
alpha = rgba.split()[3].filter(ImageFilter.GaussianBlur(0.8))
rgba.putalpha(alpha)

# Trim
bbox = rgba.getbbox()
rgba = rgba.crop(bbox)
print('trimmed:', rgba.size)
rgba.save('/home/z/my-project/public/logo.png', 'PNG')

# Square padded variant
sq = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
lw, lh = rgba.size
scale = min(470 / lw, 470 / lh)
nlw, nlh = int(lw * scale), int(lh * scale)
resized = rgba.resize((nlw, nlh), Image.LANCZOS)
sq.paste(resized, ((512 - nlw) // 2, (512 - nlh) // 2), resized)
sq.save('/home/z/my-project/public/logo-square.png', 'PNG')
print('done')
