# 501MTB Shared Photo Library

This folder is the single shared photo source for the 501MTB website and Android app.

## Categories and required ratios
- `pdp/`: official 501MTB profile image, 1:1.
- `pdc/`: 501MTB cover and slideshow, 16:9.
- `rides/`: ride photos, 16:9.
- `events/`: event photos, 16:9.
- `riders/`: rider portraits, 3:4.
- `leaders/`: leader portraits, 3:4.
- `gallery/`: general MTB gallery, 16:9.

## File standard
- Keep source images in **JPG** format with the real `.jpg` extension.
- Use lowercase category folder names.
- Use descriptive uppercase filenames with underscores and no spaces or accents.
- Naming pattern: `501MTB_TYPE_DATE_OR_ID_DESCRIPTION_V01.jpg`.
- Recommended file size: 150–400 KB; keep below 500 KB where practical.
- Crop and verify the required ratio before registering an image in `photo-library.json`.
- Catalogue width and height must reflect the actual image dimensions; never guess them.

## Migration safety
Existing website image files remain untouched until both the website and Android app have been switched to this shared library and verified.
