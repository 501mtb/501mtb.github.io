# Refresh catalogue after the 9:16 portrait standard update.
#!/usr/bin/env python3
"""Build the 501MTB photo catalogue using dimensions read from the JPG files."""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PHOTO_ROOT = ROOT / "assets" / "app" / "photos"
CATALOGUE = PHOTO_ROOT / "photo-library.json"

SOF_MARKERS = {
    0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7,
    0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF,
}


def jpeg_dimensions(path: Path) -> tuple[int, int]:
    data = path.read_bytes()
    if data[:2] != b"\xff\xd8":
        raise ValueError("not a JPEG file")

    index = 2
    while index < len(data):
        if data[index] != 0xFF:
            index += 1
            continue

        while index < len(data) and data[index] == 0xFF:
            index += 1
        if index >= len(data):
            break

        marker = data[index]
        index += 1

        if marker in {0xD8, 0xD9, 0x01} or 0xD0 <= marker <= 0xD7:
            continue
        if index + 2 > len(data):
            break

        segment_length = int.from_bytes(data[index:index + 2], "big")
        if segment_length < 2:
            break

        if marker in SOF_MARKERS:
            if index + 7 > len(data):
                break
            height = int.from_bytes(data[index + 3:index + 5], "big")
            width = int.from_bytes(data[index + 5:index + 7], "big")
            if width > 0 and height > 0:
                return width, height
            break

        index += segment_length

    raise ValueError("JPEG dimensions could not be read")


def expected_ratio(value: str) -> float:
    width, height = (int(part) for part in value.split(":"))
    return width / height


def image_id(category: str, filename: str) -> str:
    stem = Path(filename).stem.lower()
    match = re.search(r"(\d+)$", stem)
    suffix = f"{int(match.group(1)):03d}" if match else re.sub(r"[^a-z0-9]+", "_", stem).strip("_")
    return f"{category}_{suffix}"


def main() -> None:
    catalogue = json.loads(CATALOGUE.read_text(encoding="utf-8"))
    categories = catalogue["categories"]
    existing = {
        image["fileName"]: image
        for image in catalogue.get("images", [])
        if image.get("fileName")
    }
    supported = {
        ratio: expected_ratio(ratio)
        for ratio in catalogue.get("supportedRatios", [])
    }

    images = []
    skipped = []
    for category, definition in categories.items():
        folder = PHOTO_ROOT / category
        if not folder.is_dir():
            continue

        for path in sorted(folder.glob("*.jpg")):
            try:
                width, height = jpeg_dimensions(path)
            except ValueError as error:
                skipped.append(f"{path.relative_to(ROOT)}: {error}")
                continue

            actual = width / height
            matched_ratio = min(supported, key=lambda ratio: abs(actual - supported[ratio]))
            if abs(actual - supported[matched_ratio]) > 0.01:
                skipped.append(
                    f"{path.relative_to(ROOT)}: {width}x{height} does not match a supported ratio"
                )
                continue

            previous = existing.get(path.name, {})
            images.append({
                "id": previous.get("id") or image_id(category, path.name),
                "category": category,
                "fileName": path.name,
                "width": width,
                "height": height,
                "ratio": matched_ratio,
                "alt": previous.get("alt") or f"501MTB {category} photo {path.stem}",
                "tags": previous.get("tags") or ["501MTB", category],
                "active": previous.get("active", True),
            })

    images.sort(key=lambda item: (
        list(categories).index(item["category"]),
        item["fileName"].lower(),
    ))
    catalogue["images"] = images

    slideshows = catalogue.setdefault("slideshows", {})
    cover = slideshows.setdefault("501mtb.pdc", {
        "enabled": True,
        "autoplay": True,
        "intervalMs": 6000,
        "transition": "fade",
        "pauseOnUserInteractionMs": 8000,
        "loop": True,
        "showIndicators": True,
        "showArrows": True,
    })
    cover["imageIds"] = [
        item["id"] for item in images
        if item["category"] == "pdc" and item["active"]
    ]

    CATALOGUE.write_text(
        json.dumps(catalogue, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    counts = {}
    for item in images:
        counts[item["category"]] = counts.get(item["category"], 0) + 1

    print(f"Registered {len(images)} verified JPG images: {counts}")
    print(f"Skipped {len(skipped)} image(s) that failed validation.")
    for item in skipped:
        print(f"SKIP: {item}")


if __name__ == "__main__":
    main()
