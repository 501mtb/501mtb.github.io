# 501MTB — Photo Library

Single public photo library shared by the 501MTB website and Android app.

## Folder map and required image ratio

| Folder | Content | Required ratio | Recommended dimensions |
|---|---|---:|---:|
| `pdp/` | Official 501MTB profile image | 1:1 | 1000 × 1000 |
| `pdc/` | Official 501MTB cover image | 16:9 | 1920 × 1080 |
| `rides/` | One approved image per ride | 16:9 | 1920 × 1080 |
| `events/` | Events and competitions | 16:9 | 1920 × 1080 |
| `riders/` | Member portraits | 3:4 | 900 × 1200 |
| `leaders/` | Leader portraits | 3:4 | 900 × 1200 |
| `gallery/` | General website/app gallery | 16:9 | 1920 × 1080 |

## File format

- **WebP only** for new library images.
- Use lowercase folder names and uppercase filename identifiers.
- No spaces, accents, or special characters in filenames.
- Keep images optimized; recommended target is 150–400 KB, with a practical maximum of 500 KB per image where possible.
- Crop to the required ratio before uploading. Do not rely on the app to crop an incorrectly shaped source image.

## Naming convention

`501MTB_TYPE_DATE_OR_ID_DESCRIPTION_V01.webp`

Examples:

- `501MTB_PDP_MAIN_V01.webp`
- `501MTB_PDC_MAIN_V01.webp`
- `501MTB_RIDE_20261101_LAC-ANDOVOLALINA_V01.webp`
- `501MTB_EVENT_20260830_XC-RACE_V01.webp`
- `501MTB_RIDER_JAURES_V01.webp`
- `501MTB_LEADER_NJAKAH_V01.webp`

Use `DATE` as `YYYYMMDD`. Increment the version when replacing an image while retaining the previous file for rollback.

## Publishing workflow

1. Admin prepares and converts the image to WebP.
2. Admin checks the correct folder, ratio, dimensions, and filename.
3. Admin uploads the file manually to this GitHub repository.
4. The website and Android app may select only images already present in this library.
5. The app stores the selected public image URL and its category/reference in Firestore; it does not upload image files.
6. Do not put private, confidential, or member-only images in this public library.

## Public URL

The library is served from GitHub Pages at:

`https://501mtb.github.io/assets/app/photos/<folder>/<filename>.webp`

## Important

- This is the single shared library for the website and Android app.
- Do not add Firebase Storage, ImageKit, Cloudinary, or video files to this photo workflow.
- Keep existing website image folders unchanged; this new library is for the standardized shared app/site assets.
