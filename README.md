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
index.html               Storefront (home)
sbertech/, ma-direct/,   one folder per case study (header: title, role, tags)
raiffeisen-bank/, t-bank/
404.html                 "page not found"
assets/css/tokens.css    habibi tokens: colours (4 themes), radius, type, shadows, fonts
assets/css/site.css      layout and components; uses tokens only
assets/js/config.js      name, role, menu: edit this to change the menu
assets/js/site.js        renders the sidebar and runs the mobile bar scroll behaviour
assets/img/              logo favicon, empty-state image
assets/fonts/            IBM Plex Mono for habibi Code styles (OFL licence)
```

## Add a case study

1. Copy the `t-bank/` folder and rename the copy, e.g. `new-project/`.
2. In `new-project/index.html`, change `data-page="t-bank"` to `new-project` and update the `<title>`.
3. Add one line to `assets/js/config.js`:
   `{ id: "new-project", title: "New Project", href: "new-project/", icon: "doc" }`

The menu on every page updates automatically.

## Case study sections

Each section is a `<section class="case-section">` with an `h2` title and a text paragraph.
The numbers (01, 02, …) are added automatically in order and are hidden on mobile, so you can add,
remove or reorder sections without renumbering anything.

## Images

Wide images go in a `<figure class="media">` block. It fills the content area up to **1140px**
(text stays at 728px), keeps each image's proportions and shrinks on smaller screens.
Export each image at 2160px wide and add a 1140px copy, both as `.webp`:
`assets/img/<page>/<name>-2160.webp` and `<name>-1140.webp`. Retina screens get the large file,
others the small one, and clicking an image opens it full size.

Wrap every image in `<span class="image-loader">` (add `image-loader--spinner` for large ones).
While it loads, it shows the habibi skeleton pulse (and loader), sized to the image so nothing jumps.
Always write an `alt` that says what the image shows.

Two images side by side (Figma: a horizontal image frame, 12px gap) use `<figure class="media media--row">`.
Each half is up to 564px; export them at 1032px with a 564px copy. When the block is narrower than 560px
(phones), the pair stacks into one column. T-bank has two examples.

## Cards

Every case study has the five-card reflection block (Figma: `image-frame`) right after Outcomes,
as a `<section class="cards">` with two equal columns:

| Column | Card | Classes |
|---|---|---|
| left | Business goal | `card card--orange` |
| left | Smart work | `card card--green card--grow` |
| left | Hard work | `card card--grow` |
| right | Shipped impact | `card card--blue card--grow` |
| right | Fails | `card card--red` |

Both columns match the taller one's height and `card--grow` cards take the spare room. The block is up to
1140px wide and stacks into one column when it is narrower than 700px. Colours come from habibi tokens,
so they follow the page's theme and day/night. Replace each `<li>...</li>` with real items.

## Buttons

`.button` is the habibi **button** with every variant. Set the same properties as in Figma:

| Attribute | Values | Default |
|---|---|---|
| `data-appearance` | `default`, `accent`, `danger`, `white` | `default` |
| `data-mode` | `primary`, `secondary`, `ghost` | `primary` |
| `data-size` | `s` (28px), `m` (36px) | `s` |

Hover and pressed states are automatic; add `disabled` (on a `<button>`) or `aria-disabled="true"`
for the disabled state. An optional start icon goes first as `<svg class="button__icon">`:

```html
<a class="button" data-appearance="white" data-mode="primary" data-size="s" href="…">
  <svg class="button__icon" …>…</svg>
  <span class="button__label">Explore my Figma</span>
</a>
```

The button styles in `site.css` are generated from the habibi library's variant table,
so colours always come from tokens and follow day and night.

## Day & night

The site follows the visitor's system setting: **olive** by day and **olive-night** by night, the two habibi colour modes used in Figma.
All four habibi themes are in `tokens.css`. To force one, add `data-theme="olive"`, `"olive-night"`, `"light"` or `"dark"` to `<html>`.

A page can use another day / night pair, like a variable mode set on one Figma frame.
`<html data-palette="classic">` switches that page to **light** by day and **dark** by night (MA.direct uses it).
In the build script it is the page's `palette="classic"` field, which also sets the browser bar colour.

## Right-to-left

Layout uses logical properties, so `dir="rtl"` on `<html>` mirrors everything, matching the RTL variants in Figma.

## Analytics

Visits are counted with [GoatCounter](https://www.goatcounter.com) (cookieless, no banner needed).
Every page has this line just before `</head>`; new case studies copied from an existing folder keep it:

```html
<script data-goatcounter="https://uxpugovkin.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
```

Stats live at https://uxpugovkin.goatcounter.com.

Clicks on important links are counted as GoatCounter events: add `data-goatcounter-click="event-name"`
(and optionally `data-goatcounter-title`) to the link. The Sberbank "Explore my Figma" button is counted as
`explore-figma-sbertech`.

## Updating tokens

`tokens.css` mirrors the habibi-library variables and styles. When the library changes, regenerate it from Figma instead of editing values by hand.
