/* ==========================================================================
   SITE CONTENT — edit this file to change the name, role and menu

   The sidebar on every page is built from this list (by sidebar.js), so a
   change here shows up on all pages at once.

   To add a case study:
   1. Copy any case study folder (e.g. t-bank/) and rename the copy
   2. In its index.html, change <body data-page="…"> and the <title>
   3. Add one line to `menu` below
   ========================================================================== */

window.SITE = {
  name: "Konstantin P",
  role: "Product Designer",

  // One line per menu item, top to bottom:
  //   id    — must match <body data-page="..."> on that page
  //   title — the text shown in the menu
  //   href  — the page's folder, from the site's top folder
  //   icon  — an icon name from icons.js: "desktop", "phone", "worker", "doc", "folder"
  //   external — true for a link to another site: href is then the full
  //           address, and it opens in a new browser tab
  //   video — optional: the page's Vimeo player address, exactly as in the
  //           page's <iframe data-src> (with & instead of &amp;), so
  //           prefetch.js can load it ahead
  // { divider: true } draws a line between groups of items
  menu: [
    { id: "sbertech", title: "Sberbank Technology", href: "sbertech/", icon: "desktop",
      video: "https://player.vimeo.com/video/1231912882?autoplay=1&muted=1&loop=1&autopause=0&playsinline=1&dnt=1&title=0&byline=0&portrait=0&controls=0&background=1" },
    { id: "ma-direct", title: "MA.direct", href: "ma-direct/", icon: "desktop" },
    { id: "raiffeisen-bank", title: "Raiffeisen Bank", href: "raiffeisen-bank/", icon: "desktop" },
    { id: "t-bank", title: "T-bank", href: "t-bank/", icon: "desktop" },
    { divider: true },
    { id: "ma-mobile", title: "MA.mobile", href: "ma-mobile/", icon: "phone" },
    { divider: true },
    { id: "design-system", title: "Habibi UI", href: "https://uxpugovkin.github.io/habibi-ui/ds/tables",
      icon: "desktop", external: true }
  ]
};
