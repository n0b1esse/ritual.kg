"""
Slice RITUAL catalog PDF into per-monument crops.
Auto-detects layout: 2x2 (4 per page), 2x1 (2 ogradki), 1x1 (before/after or cover).
Run: python scripts/slice-catalog.py
Output: public/catalog/crops/{page}_{row}_{col}.webp  +  data/catalog-crops.json
For variant 3: each crop can be imported as Product in data/products.ts
"""
import pymupdf, pathlib, json
from PIL import Image

SRC = pathlib.Path("КАТАЛОГ- RITUAL.KGZ (1).pdf")
if not SRC.exists():
    SRC = pathlib.Path("public/catalog.pdf")

OUT_DIR = pathlib.Path("public/catalog/crops")
OUT_DIR.mkdir(parents=True, exist_ok=True)
JSON_OUT = pathlib.Path("data/catalog-crops.json")

doc = pymupdf.open(str(SRC))
manifest = []

for i in range(len(doc)):
    page = doc[i]
    pix = page.get_pixmap(dpi=180)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    w, h = img.size

    # Heuristic: detect layout by image count and page number
    # Pages 92-95 are before/after or ogradki with 1-2 images, keep as single
    # Otherwise assume 2x2
    page_num = i + 1
    if page_num == 1:
        # cover - keep single
        out = OUT_DIR / f"{page_num:03d}_1_1.webp"
        # center crop with padding
        img.save(str(out), "WEBP", quality=82, method=4)
        manifest.append({"page": page_num, "row": 1, "col": 1, "file": str(out).replace("\\","/"), "layout": "1x1"})
        continue
    if page_num >= 90:
        # last pages: 2 per page or 1
        # split horizontally in half for 2-item pages, keep full for single
        # heuristic: if aspect suggests 2 stacked images, split
        # We'll split by half height if image height > 1.5*w (we handle in gallery, but for crops just split)
        # For safety, save both full and halves
        # Save full first
        out_full = OUT_DIR / f"{page_num:03d}_full.webp"
        img.save(str(out_full), "WEBP", quality=78, method=4)
        manifest.append({"page": page_num, "row": 0, "col": 0, "file": str(out_full).replace("\\","/"), "layout": "1x1-full"})
        # also split in 2
        top = img.crop((0, 0, w, h//2))
        bot = img.crop((0, h//2, w, h))
        for idx, crop in enumerate([top, bot], 1):
            out = OUT_DIR / f"{page_num:03d}_{idx}_1.webp"
            crop.save(str(out), "WEBP", quality=78, method=4)
            manifest.append({"page": page_num, "row": idx, "col": 1, "file": str(out).replace("\\","/"), "layout": "2x1"})
        continue

    # default 2x2
    half_w, half_h = w // 2, h // 2
    crops = [
        (0, 0, half_w, half_h),
        (half_w, 0, w, half_h),
        (0, half_h, half_w, h),
        (half_w, half_h, w, h),
    ]
    for idx, box in enumerate(crops):
        c = img.crop(box)
        # add small trim to remove border lines (2%)
        trim =  int(w * 0.015)
        c = c.crop((trim, trim, c.width - trim, c.height - trim))
        row, col = (idx // 2) + 1, (idx % 2) + 1
        out = OUT_DIR / f"{page_num:03d}_{row}_{col}.webp"
        c.save(str(out), "WEBP", quality=80, method=4)
        manifest.append({"page": page_num, "row": row, "col": col, "file": str(out).replace("\\","/"), "layout": "2x2"})

JSON_OUT.parent.mkdir(parents=True, exist_ok=True)
with open(JSON_OUT, "w", encoding="utf-8") as f:
    json.dump({"source": str(SRC), "total_pages": len(doc), "crops": manifest}, f, ensure_ascii=False, indent=2)

print(f"Done: {len(manifest)} crops from {len(doc)} pages -> {OUT_DIR}")
print(f"Manifest: {JSON_OUT}")
