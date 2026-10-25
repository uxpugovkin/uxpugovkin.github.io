/* ==========================================================================
   Site content — edit this file to change the name, role and menu.
   Add a case study: add one line to `menu` and create the matching page
   (copy any case study folder, e.g. t-bank/, and change its data-page and title).
   ========================================================================== */
window.SITE = {
  name: "Konstantin P",
  role: "Product Designer",

  // id    — must match <body data-page="..."> on that page
  // href  — path from the site root (the logo links to the home page)
  // icon  — any key from ICONS in site.js ("desktop", "phone", "doc", "folder")
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
