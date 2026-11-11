# Konstantin P — portfolio

A static site built from the **habibi** design library. No build step and no dependencies: upload the files and it works.

## Upload to GitHub Pages

1. Create a public repository named `your-username.github.io`.
2. **Add file → Upload files**, then drag in everything from this folder. `index.html` must be at the top level.
   `.nojekyll` is a hidden file. If your computer hides it, the site still works without it.
3. **Settings → Pages →** Deploy from a branch → `main` / `(root)` → Save.

After a minute the site is live at `https://your-username.github.io`.

## What's where

Think of it like the Figma file: one page per thing. Every file starts with a comment that explains
what it is, and every block in the HTML pages has a label above it.

```
index.html                 Home: greeting + case study cards
sbertech/  ma-direct/      one folder per case study (header: title, role, tags)
raiffeisen-bank/  t-bank/
ma-mobile/                 placeholder ("coming soon" empty state) until the case is written
404.html                   "page not found"

assets/css/                HOW THINGS LOOK
  tokens.css               table of contents for the habibi tokens ↓
  tokens/
    fonts.css              font family and weights
    radius.css             radius/xs … radius/full
    shadows.css            default-s, default-l, accent-l
    text-styles.css        Body A–E, Header, Code — one class per Figma text style
    colours-olive.css      day theme (default)
    colours-olive-night.css   night theme
    colours-light.css      Light (also the "classic" palette by day)
    colours-dark.css       Dark  (also the "classic" palette by night)

  site.css                 table of contents for the site styles ↓  (order matters)
  site/
    settings.css           spacing, vert-space, sidebar width, animation speed
    base.css               browser clean-up, page background and text
    layout.css             sidebar + content column side by side
    sidebar.css            the left panel
    menu.css               one menu row: default / hover / active, divider
    empty-state.css        "coming soon" and "page not found"
    case-header.css        case study title, role, tags + the paragraph block
    case-section.css       numbered text sections (01, 02…), tablet layout
    home-cards.css         the big cards on the home page
    media.css              image blocks, video, images side by side
    toggle-media.css       Legacy vs Current: four images, segments + a switch
    arrow.css              the down arrow between before / after
    reflection-cards.css   Problem, Hard work, Smart work, Shipped impact, Fails
    button.css             habibi button, all variants
    switch.css             habibi switch
    segment.css            habibi segment-group
    cta-banner.css         picture strip with a button ("Explore my Figma")
    image-loader.css       grey pulsing placeholder while images load
    tag.css                habibi tag
    mobile.css             phone layout (below 768px) — always last

assets/js/                 WHAT MOVES
  config.js                name, role, menu: edit this to change the menu
  icons.js                 the sidebar icons (SVG from habibi-library)
  sidebar.js               builds the sidebar on every page from config.js
  mobile-bar.js            hides the phone top bar on scroll down, shows it on scroll up
  image-loader.js          shows the placeholder until each image has loaded
  toggle-media.js          the Legacy / Current segments and "AI scene" switch
  prefetch.js              loads the other case studies, the video and the images below ahead

assets/img/                favicon, 404 empty-state image, one folder of images per page
assets/fonts/              IBM Plex Mono for habibi Code styles (OFL licence)
```

Every page loads the same files. CSS: `tokens.css`, then `site.css`, and those two load the rest.
JavaScript: the seven files above, listed in each page's HTML in that order. If you add a new
JavaScript file, add its `<script>` line to every page. If you add a new CSS file, add one
`@import` line to `site.css`.

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

The menu on every page updates automatically. Icons (Figma `icons/…`, stored in `icons.js`):
`desktop` for web and desktop products, `phone` for mobile apps. `{ divider: true }` draws the 2px
divider between groups, as in the Figma `github-sidebar`: the four desktop cases, a divider, then MA.mobile.

## Case study sections

Each section is a `<section class="case-section">` with an `h2` title and a text paragraph.
The numbers (01, 02, …) are added automatically in order and are hidden on mobile, so you can add,
remove or reorder sections without renumbering anything.

Blocks in the content column sit `--vert-space` apart — the habibi `vert-space` variable, 20px,
the same at every breakpoint. Change it in one place (`assets/css/site/settings.css`) and every page follows.

## Home page

The home page starts with a greeting (Figma: Greetings): "I am Konstantin" in Header/Display B with the
44px avatar beside it (`assets/img/home/avatar-1x.webp` / `-2x.webp`) and one line in Header/H1. On phones
it steps down to H1 + H3.

Below it is a column of case study cards (Figma: Card component). Each card is a
`<li class="storefront__item storefront__item--<page>">` with an `<a class="case-card">` inside:
title (Header/H1) and the role (Body E, upper case). The cards sit in one column, full width,
16px apart, like the five 1140×568 cards in Figma. Cards are flexible: they fill the space between the side
paddings, and their height follows the width at 1140:568, never below 240px.

To give a card a picture, add `case-card--image` to the link and an `<span class="image-loader case-card__media"><img …></span>`
before the text. Export the card's picture layer (Hover=False variant) already cropped to the card, at 1x (1140×568) and
2x (2280×1136), as lossless `assets/img/home/<page>-card-1x.webp` / `-2x.webp` (`cwebp -lossless`). Over a picture the text turns white with a soft
shadow; on hover the picture zooms in slightly (Hover=True). Card clicks are counted in GoatCounter as `home-card-<page>`.

## Images

Wide images go in a `<figure class="media">` block. It fills the content area up to **1140px**
(text stays at 728px), keeps each image's proportions and shrinks on smaller screens.
Export each image at 2160px wide and add a 1140px copy, both as `.webp`:
`assets/img/<page>/<name>-2160.webp` and `<name>-1140.webp`. Retina screens get the large file,
others the small one, and clicking an image opens it full size.

Wrap every image in `<span class="image-loader">` (add `image-loader--spinner` for large ones).
Every image slot is rounded with habibi `radius/l` (10px) and clips its image, as in Figma, so images,
the video, the Legacy vs Current switchers, the home cards and the Figma button block all share one corner.
While it loads, it shows the habibi skeleton pulse (and loader), sized to the image so nothing jumps.
Always write an `alt` that says what the image shows.

Two images side by side (Figma: a horizontal image frame, 12px gap) use `<figure class="media media--row">`.
Each half is up to 564px; export them at 1032px with a 564px copy. When the block is narrower than 560px
(phones), the pair stacks into one column.

## Cards

Every case study has the reflection block (Figma: `image-frame`) right after Outcomes,
as a `<section class="cards">` with two equal columns. Sberbank Technology and MA.direct use all five cards;
Raiffeisen Bank and T-bank have no Fails card, and there Problem drops `card--grow` so it hugs its text
while Hard work takes the rest of the column, as in Figma. Problem is a plain `<p class="body-c-regular">`,
the other cards are bullet lists:

| Column | Card | Classes |
|---|---|---|
| left | Problem | `card card--grow` |
| left | Hard work | `card card--grow` |
| right | Smart work | `card card--grow` |
| right | Shipped impact | `card card--grow` |
| right | Fails | `card` |

All cards look the same: `uncolorful-grey/surface` fill, `uncolorful-grey/secondary` text, 3px corners,
16px top / 20px sides / 24px bottom padding, 4px between title and text. The title is Body A / Regular
(`card__title body-a-regular`), the text Body C / Regular. List bullets sit right at the card's text edge,
with no indent. Cards and columns are 4px apart.

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

The button styles in `site/button.css` are generated from the habibi library's variant table,
so colours always come from tokens and follow day and night.

## Switch and image toggle

The habibi **switch** (Accent, compact) is a `<button role="switch" aria-checked="true|false">` with
`<span class="switch"><span class="switch__knob"></span></span>` inside; `switch-and-text` adds the label.
Hover and disabled states come from the library, and inside `dir="rtl"` it mirrors like the Figma rtl variant.

A **toggle-media** block is the Legacy vs Current block on MA.direct, Raiffeisen Bank and T-bank (Figma
`legaсy-demo-ma`, `legaсy-demo-raiffeisen`, `legaсy-demo-t-bank`). Four images share one 1140×640 slot, one per
component variant: `legacy-ai-scene`, `legacy-ui`, `current-ai-scene` and `current-ui`, each as `-1x.webp` (1140px) and
`-2x.webp` (2280px). Export each variant whole, with the segment group and the switch hidden, so the picture comes out
already cropped to the slot. Each `<img>` carries `data-type="legacy|current"` and `data-ai="true|false"`.
The habibi **segment group** (`site/segment.css`, top left) picks Legacy or Current, the switch picks the AI scene;
`toggle-media.js` shows the matching image, keeps screen readers on it, and GoatCounter counts the clicks.
The switch sits in a frosted pill (`toggle-media__control`) that carries `data-theme="olive-night"`, the same fixed colour mode it has in Figma; on smaller blocks the pill gets a dark tint so the label stays readable.

## Prefetch

`prefetch.js` makes sure nothing is missed when a case study opens. Once a page has loaded and the browser is idle,
it fetches every other case study page from the menu in the background, and starts loading this page's images
further down instead of waiting until they scroll into view. Pointing at or touching a link to a case with a video
opens the connections to Vimeo right away. Visitors on data saver or a 2G connection get none of this.

A case with a video gets one more field in `config.js`: `video`, the Vimeo player address exactly as in that page's
`<iframe data-src>` (with `&` instead of `&amp;`), so the player is fetched ahead too. The Sberbank page also opens
the Vimeo connections in its `<head>`, and its video iframe is not lazy-loaded, so the showreel starts as early as possible.

## Day & night

The site follows the visitor's system setting: **olive** by day and **olive-night** by night, the two habibi colour modes used in Figma.
All four habibi themes are in `assets/css/tokens/`, one file each. To force one, add `data-theme="olive"`, `"olive-night"`, `"light"` or `"dark"` to `<html>`.

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

The files in `assets/css/tokens/` mirror the habibi-library variables and styles. When the library changes,
regenerate them from Figma instead of editing values by hand.
