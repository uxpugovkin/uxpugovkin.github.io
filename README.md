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
index.html               Home: case study cards
sbertech/, ma-direct/,   one folder per case study (header: title, role, tags)
raiffeisen-bank/, t-bank/
ma-mobile/               placeholder ("coming soon" empty state) until the case is written
404.html                 "page not found"
assets/css/tokens.css    habibi tokens: colours (4 themes), radius, type, shadows, fonts
assets/css/site.css      layout and components; uses tokens only
assets/js/config.js      name, role, menu: edit this to change the menu
assets/js/site.js        renders the sidebar and runs the mobile bar scroll behaviour
assets/img/              favicon, 404 empty-state image, home/ card pictures
assets/fonts/            IBM Plex Mono for habibi Code styles (OFL licence)
```

## The Figma file

Everything here comes from **habibi-portfolio**, which is organised one page per thing you can
build, with `–––` rules between the groups:

```
layout                   the page shell: github-sidebar, menu, the content column
storefront               the home page grid of case study cards
sbertech, ma-direct,     one page per case study, each holding that case's
raiffeisen, t-bank,      <page>-page frame plus its legacy-vs-new sources
ma-mobile
visuals                  cover scenes and other rendered artwork
```

A case page's `Content` frame is the page's blocks in order, so the frames read top to bottom the
same way the HTML does. The `legacy-vs-new` section beside it holds the raw 1440 × 872 screens the
Legacy vs Current block and the section images are exported from.

## Add a case study

1. Copy the `t-bank/` folder and rename the copy, e.g. `new-project/`.
2. In `new-project/index.html`, change `data-page="t-bank"` to `new-project` and update the `<title>`.
3. Add one line to `assets/js/config.js`:
   `{ id: "new-project", title: "New Project", href: "new-project/", icon: "desktop" }`

The menu on every page updates automatically. Icons (Figma `icons/…`): `desktop` for web and desktop
products, `phone` for mobile apps. `{ divider: true }` draws the 2px divider between groups, as in the
Figma `github-sidebar`: the four desktop cases, a divider, then MA.mobile.

## Case study sections

Each section is a `<section class="case-section">` with an `h2` title and a text paragraph.
The numbers (01, 02, …) are added automatically in order and are hidden on mobile, so you can add,
remove or reorder sections without renumbering anything.

Blocks in the content column sit `--vert-space` apart — the habibi `vert-space` variable, 20px,
the same at every breakpoint. Change it in one place in `site.css` and every page follows.

## Home page

The home page is a grid of case study cards (Figma: Storefront). Each card is a
`<li class="storefront__item storefront__item--<page>">` with an `<a class="case-card">` inside:
title (Header/H1) and the role (Body E, upper case). The cards sit in one column, full width,
16px apart, like the four 1160×512 frames in Figma. Cards are flexible: they fill the space between the side
paddings, and their height follows the width at 1160:512 (512px in a 1440px window), never below 240px.

To give a card a picture, add `case-card--image` to the link and an `<span class="image-loader case-card__media"><img …></span>` before the text, as the whole 16:9 scene at 1160px and 2320px into `assets/img/home/`; the picture stays centred on its focal point (set `object-position` per card to move it) (all four cards have one). Over a picture the text turns white with a
soft shadow. Card clicks are counted in GoatCounter as `home-card-<page>`.

## Images

Wide images go in a `<figure class="media">` block. It fills the content area up to **1140px**
(text stays at 728px), keeps each image's proportions and shrinks on smaller screens.
Export each image at 2160px wide and add a 1140px copy, both as `.webp`:
`assets/img/<page>/<name>-2160.webp` and `<name>-1140.webp`. Retina screens get the large file,
others the small one, and clicking an image opens it full size.

Wrap every image in `<span class="image-loader">` (add `image-loader--spinner` for large ones).
While it loads, it shows the habibi skeleton pulse (and loader), sized to the image so nothing jumps.
Always write an `alt` that says what the image shows.

MA.direct, Raiffeisen Bank and T-bank each close with a section image: the case's own
1440 × 872 screen from its `legacy-vs-new` section, exported as `cover-source-1140.webp` and
`cover-source-2160.webp` and shown at 1140 × 690.

Two images side by side (Figma: a horizontal image frame, 12px gap) use `<figure class="media media--row">`.
Each half is up to 564px; export them at 1032px with a 564px copy. When the block is narrower than 560px
(phones), the pair stacks into one column.

## Cards

Every case study has the reflection block (Figma: `image-frame`) right after Outcomes,
as a `<section class="cards">` with two equal columns. Sberbank Technology and MA.direct use all five cards;
Raiffeisen Bank and T-bank have no Fails card, and there Business goal drops `card--grow` so it hugs its text
while Hard work takes the rest of the column, as in Figma. Business goal is a plain `<p class="body-c-regular">`,
the other cards are bullet lists:

| Column | Card | Classes |
|---|---|---|
| left | Business goal | `card card--orange card--grow` |
| left | Hard work | `card card--grow` |
| right | Smart work | `card card--blue card--grow` |
| right | Shipped impact | `card card--green card--grow` |
| right | Fails | `card card--red` |

Side by side the block is at least 512px tall, like the fixed-height Figma frame; both columns match the
taller one and `card--grow` cards share the spare room equally. The block is up to
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

## Switch and image toggle

The habibi **switch** (Accent, compact) is a `<button role="switch" aria-checked="true|false">` with
`<span class="switch"><span class="switch__knob"></span></span>` inside; `switch-and-text` adds the label.
Hover and disabled states come from the library, and inside `dir="rtl"` it mirrors like the Figma rtl variant.

A **toggle-media** block puts two images in one 1140×640 slot with a switch in the corner, as in the
Figma `raif-legasy-demo` component. `data-active="true"` shows the `--on` image. site.js swaps them,
keeps screen readers on the visible one, and GoatCounter counts the clicks. MA.direct, Raiffeisen Bank and T-bank use it twice: the legacy screen (Figma `legacy-demo`) and the current design (Figma `current-demo`, `toggle-media--current`), both 1140×640. Their images are `legacy-ai-scene` / `legacy-ui` and `cover` / `current-ui`, each as `-1x.webp` (1140px) and `-2x.webp` (2280px).
In these Legacy vs Current blocks (`media media--gap-16`) the arrow sits in a pill, `<span class="media__arrow-pill">`, 16px from each image: uncreative-green/50 with the icon in uncreative-green/90, so it is green in Light and purple in Olive, as in Figma.
The switch sits in a frosted pill (`toggle-media__control`) that carries `data-theme="olive-night"`, the same fixed colour mode it has in Figma; on smaller blocks the pill gets a dark tint so the label stays readable.

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
