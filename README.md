# Konstantin P — portfolio

A static site built from the **habibi** design library. No build step and no dependencies: upload the files and it works.

## Upload to GitHub Pages

1. Create a public repository named `your-username.github.io`.
2. **Add file → Upload files**, then drag in everything from this folder. `index.html` must be at the top level.
   `.nojekyll` is a hidden file. If your computer hides it, the site still works without it.
3. **Settings → Pages →** Deploy from a branch → `main` / `(root)` → Save.

After a minute the site is live at `https://your-username.github.io`.

## What's where

```
index.html               Case Study #1 (home)
case-study-2/ … 5/       one folder per case study
404.html                 "page not found"
assets/css/tokens.css    habibi tokens: colours (4 themes), radius, type, shadows, fonts
assets/css/site.css      layout and components; uses tokens only
assets/js/config.js      name, role, menu: edit this to change the menu
assets/js/site.js        renders the sidebar and runs the mobile bar scroll behaviour
assets/img/              logo favicon, empty-state image
```

## Add a case study

1. Copy `case-study-5/` to `case-study-6/`.
2. In `case-study-6/index.html`, change `data-page="case-study-5"` to `case-study-6` and update the `<title>`.
3. Add one line to `assets/js/config.js`:
   `{ id: "case-study-6", title: "Case Study #6", href: "case-study-6/", icon: "folder" }`

The menu on every page updates automatically.

## Day & night

The site follows the visitor's system setting: **olive** by day and **olive-night** by night, the two habibi colour modes used in Figma.
All four habibi themes are in `tokens.css`. To force one, add `data-theme="olive"`, `"olive-night"`, `"light"` or `"dark"` to `<html>`.

## Right-to-left

Layout uses logical properties, so `dir="rtl"` on `<html>` mirrors everything, matching the RTL variants in Figma.

## Updating tokens

`tokens.css` mirrors the habibi-library variables and styles. When the library changes, regenerate it from Figma instead of editing values by hand.
