/* ==========================================================================
   Site content — edit this file to change the name, role and menu.
   Add a case study: add one line to `menu` and create the matching page
   (copy any case study folder, e.g. t-bank/, and change its data-page and title).
   ========================================================================== */
window.SITE = {
  name: "Konstantin P",
  role: "Product Designer",

  // id    — must match <body data-page="..."> on that page
  // href  — path from the site root ("" is the home page)
  // icon  — any key from ICONS in site.js ("doc", "folder")
  menu: [
    { id: "storefront", title: "Storefront", href: "", icon: "doc" },
    { id: "sbertech", title: "Sberbank Technology", href: "sbertech/", icon: "doc" },
    { id: "ma-direct", title: "MA.direct", href: "ma-direct/", icon: "doc" },
    { id: "raiffeisen-bank", title: "Raiffeisen Bank", href: "raiffeisen-bank/", icon: "doc" },
    { id: "t-bank", title: "T-bank", href: "t-bank/", icon: "doc" }
  ]
};
