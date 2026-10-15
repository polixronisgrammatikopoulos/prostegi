#!/usr/bin/env python3
"""Create transparent-background version of the ProStegi logo + prep assets."""
from PIL import Image
import os

SRC = '/home/z/my-project/scripts/prostegi_assets'
PUB = '/home/z/my-project/public'
os.makedirs(PUB, exist_ok=True)
os.makedirs(f'{PUB}/products', exist_ok=True)

# --- 1. Transparent logo ---
img = Image.open(f'{SRC}/img1.jpeg').convert('RGBA')
w, h = img.size
px = img.load()

# Detect background color from corners
corners = [px[0, 0], px[w-1, 0], px[0, h-1], px[w-1, h-1]]
bg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))
print('Detected background:', bg, '#%02x%02x%02x' % bg)

# Flood-fill from all edges: remove pixels close to bg color
from collections import deque
visited = [[False] * w for _ in range(h)]
q = deque()
for x in range(w):
    q.append((x, 0)); q.append((x, h-1))
for y in range(h):
    q.append((0, y)); q.append((w-1, y))

TOL = 26  # tolerance for "close to background"
def close(c, bg):
    return abs(c[0]-bg[0]) <= TOL and abs(c[1]-bg[1]) <= TOL and abs(c[2]-bg[2]) <= TOL

removed = 0
while q:
    x, y = q.popleft()
    if x < 0 or x >= w or y < 0 or y >= h or visited[y][x]:
        continue
    visited[y][x] = True
    c = px[x, y]
    if close(c, bg):
        px[x, y] = (255, 255, 255, 0)
        removed += 1
        q.extend([(x+1, y), (x-1, y), (x, y+1), (x, y-1)])

print(f'Removed {removed} background pixels ({removed/(w*h)*100:.1f}%)')

# Soft-edge cleanup: pixels adjacent to transparency get partial alpha
img2 = img.copy()
px2 = img2.load()
for y in range(h):
    for x in range(w):
        c = px[x, y]
        if c[3] == 255 and close(c, bg):
            px2[x, y] = (c[0], c[1], c[2], 120)
img = img2

# Trim to content bounding box
bbox = img.getbbox()
img = img.crop(bbox)
print('Trimmed logo size:', img.size)

img.save(f'{PUB}/logo.png', 'PNG')

# Also make a white-text-friendly variant is not needed; logo has own colors.
# Square padded version for favicon/og
sq = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
lw, lh = img.size
scale = min(480 / lw, 480 / lh)
nlw, nlh = int(lw * scale), int(lh * scale)
resized = img.resize((nlw, nlh), Image.LANCZOS)
sq.paste(resized, ((512 - nlw) // 2, (512 - nlh) // 2), resized)
sq.save(f'{PUB}/logo-square.png', 'PNG')

# --- 2. Copy other assets ---
import shutil
shutil.copy(f'{SRC}/img6.jpeg', f'{PUB}/hero-solar.jpg')
shutil.copy(f'{SRC}/img3.png', f'{PUB}/products/deye-inverter.png')
shutil.copy(f'{SRC}/img2.png', f'{PUB}/products/vtac-battery.png')
shutil.copy(f'{SRC}/img5.png', f'{PUB}/products/deye-rack.png')
shutil.copy(f'{SRC}/img4.png', f'{PUB}/products/solar-panels.png')
print('Assets copied to public/')
