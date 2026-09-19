# Original full-resolution source images.

These are the masters for the WebP files served from `public/`. They are kept
out of `public/` so they are not deployed, and regenerated with:

```sh
cwebp -q 82 -resize 1672 0 design-assets/solar-hero.png -o public/solar-hero.webp
cwebp -q 90 -resize 380 0 design-assets/vr-logo-white.png -o public/vr-logo-white.webp
cwebp -q 82 design-assets/industrial-rooftop.jpg -o public/industrial-rooftop.webp
cwebp -q 82 design-assets/pm-kusum-plant.jpg -o public/pm-kusum-plant.webp
cwebp -q 82 design-assets/ashish-rathor.jpg -o public/ashish-rathor.webp
```
