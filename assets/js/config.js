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
  //   icon  — an icon name from icons.js: "desktop", "phone", "doc", "folder"
  // { divider: true } draws a line between groups of items
  menu: [
    { id: "sbertech", title: "Sberbank Technology", href: "sbertech/", icon: "desktop" },
    { id: "ma-direct", title: "MA.direct", href: "ma-direct/", icon: "desktop" },
    { id: "raiffeisen-bank", title: "Raiffeisen Bank", href: "raiffeisen-bank/", icon: "desktop" },
    { id: "t-bank", title: "T-bank", href: "t-bank/", icon: "desktop" },
    { divider: true },
    { id: "ma-mobile", title: "MA.mobile", href: "ma-mobile/", icon: "phone" }
  ]
};
