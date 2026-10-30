/* ==========================================================================
   SIDEBAR — builds the sidebar on every page

   Each page's HTML has only an empty  <header class="sidebar" data-sidebar>.
   This file fills it with the logo, the name and the menu, using the list
   in config.js. So the menu is written once and every page gets the same.

   It also marks the menu item of the page you are on as Active. It knows
   the current page from  <body data-page="…">, which must match an "id"
   in config.js.

   Uses: config.js (SITE) and icons.js (ICONS) — they load before this file.
   ========================================================================== */


/* --- What we need ------------------------------------------------------- */

// The site settings from config.js
var siteSettings = window.SITE;

// The way back to the site's top folder from this page, e.g. "../" for
// a case study page. Set on <html data-root="…"> in each page.
var siteRoot = document.documentElement.getAttribute("data-root");
if (!siteRoot) {
  siteRoot = "./";
}

// Which page is this? From <body data-page="…">
var currentPageId = document.body.getAttribute("data-page");


/* --- Small helpers ------------------------------------------------------ */

// Makes a link that works from any folder: "t-bank/" becomes "../t-bank/"
function makeLink(href) {
  if (!href) {
    href = "";
  }
  return siteRoot + href;
}

// Makes text safe to put into HTML: a name like "Vkusno & Tochka" would
// otherwise confuse the browser, because & < > " ' have special meanings
function safeText(text) {
  text = String(text);
  text = text.split("&").join("&amp;");
  text = text.split("<").join("&lt;");
  text = text.split(">").join("&gt;");
  text = text.split('"').join("&quot;");
  text = text.split("'").join("&#39;");
  return text;
}


/* --- Build one menu row ------------------------------------------------- */

function buildMenuRow(item) {
  // A divider: the 2px line between groups (Figma: divider)
  if (item.divider) {
    return '<li class="menu-divider" aria-hidden="true"></li>';
  }

  // The icon from icons.js; the "doc" icon if none is set
  var icon = ICONS[item.icon];
  if (!icon) {
    icon = ICONS.doc;
  }

  // The page you are on gets aria-current="page" → the Active style
  var activeMark = "";
  if (item.id === currentPageId) {
    activeMark = ' aria-current="page"';
  }

  return (
    "<li>" +
      '<a class="menu-item body-c-regular" href="' + makeLink(item.href) + '"' + activeMark + ">" +
        '<span class="menu-item__icon">' + icon + "</span>" +
        "<span>" + safeText(item.title) + "</span>" +
      "</a>" +
    "</li>"
  );
}


/* --- Build the whole sidebar -------------------------------------------- */

var sidebarElement = document.querySelector("[data-sidebar]");

if (sidebarElement && siteSettings) {

  // All menu rows, one after another
  var menuRows = "";
  for (var i = 0; i < siteSettings.menu.length; i++) {
    menuRows = menuRows + buildMenuRow(siteSettings.menu[i]);
  }

  sidebarElement.innerHTML =
    // Logo + name + role, linking to the home page
    '<a class="sidebar__brand" href="' + makeLink("") + '" aria-label="' + safeText(siteSettings.name) + ', home">' +
      '<span class="sidebar__logo">' + ICONS.logo + "</span>" +
      '<span class="sidebar__name">' +
        '<span class="sidebar__title body-a-bold">' + safeText(siteSettings.name) + "</span>" +
        '<span class="sidebar__role body-d-regular">' + safeText(siteSettings.role) + "</span>" +
      "</span>" +
    "</a>" +
    // The menu
    '<nav class="sidebar__nav" aria-label="Case studies">' +
      '<ul class="menu">' + menuRows + "</ul>" +
    "</nav>";
}
