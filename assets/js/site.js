/* ==========================================================================
   Site behaviour
   1. Renders the sidebar / mobile bar from config.js (one source for every page)
   2. Hides the mobile bar on scroll down, shows it again on scroll up
   ========================================================================== */
(function () {
  "use strict";

  /* Icons exported from habibi-library. They use currentColor so they follow
     the text colour token of whatever they sit in. */
  var ICONS = {
    logo:
      '<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false">' +
      '<path d="M16.0002 4.53434L13.1636 7.37077L2.83652 2.83643L5.67304 0L16.0002 4.53434Z"/>' +
      '<path d="M29.1637 2.83643L18.8365 7.37077L16.0002 4.53434L26.3272 0L29.1637 2.83643Z"/>' +
      '<path d="M27.4658 16.0001L24.6292 13.1636L29.1637 2.83643L32 5.67295L27.4658 16.0001Z"/>' +
      '<path d="M29.1637 29.1636L24.6292 18.8364L27.4658 16.0001L32 26.327L29.1637 29.1636Z"/>' +
      '<path d="M16.0002 27.4657L26.3272 32L29.1637 29.1636L18.8365 24.6292L16.0002 27.4657Z"/>' +
      '<path d="M2.83652 29.1636L5.67304 32L16.0002 27.4657L13.1636 24.6292L2.83652 29.1636Z"/>' +
      '<path d="M4.53444 16.0001L7.37078 18.8364L2.83652 29.1636L0 26.327L4.53444 16.0001Z"/>' +
      '<path d="M4.53444 16.0001L7.37078 13.1636L2.83652 2.83643L0 5.67295L4.53444 16.0001Z"/>' +
      "</svg>",
    folder:
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false">' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 3.33326H7.5V4.16659H15C16.3807 4.16659 17.5 5.28588 17.5 6.66659V13.3333C17.5 14.714 16.3807 15.8333 15 15.8333H5C3.61929 15.8333 2.5 14.714 2.5 13.3333V3.33326ZM4.16667 5.83326H15C15.4602 5.83326 15.8333 6.20636 15.8333 6.66659V13.3333C15.8333 13.7935 15.4602 14.1666 15 14.1666H5C4.53976 14.1666 4.16667 13.7935 4.16667 13.3333V5.83326Z"/>' +
      "</svg>"
  };

  var site = window.SITE || { name: "", role: "", menu: [] };
  var root = document.documentElement.getAttribute("data-root") || "./";
  var current = document.body.getAttribute("data-page");

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function url(href) {
    return root + (href || "");
  }

  /* ---- 1. Render the sidebar ------------------------------------------- */
  var sidebar = document.querySelector("[data-sidebar]");

  if (sidebar) {
    var items = site.menu
      .map(function (item) {
        var isCurrent = item.id === current;
        return (
          "<li>" +
          '<a class="menu-item body-c-regular" href="' + url(item.href) + '"' +
          (isCurrent ? ' aria-current="page"' : "") + ">" +
          '<span class="menu-item__icon">' + (ICONS[item.icon] || ICONS.folder) + "</span>" +
          "<span>" + escapeHtml(item.title) + "</span>" +
          "</a>" +
          "</li>"
        );
      })
      .join("");

    sidebar.innerHTML =
      '<a class="sidebar__brand" href="' + url("") + '" aria-label="' + escapeHtml(site.name) + ', home">' +
      '<span class="sidebar__logo">' + ICONS.logo + "</span>" +
      '<span class="sidebar__name">' +
      '<span class="sidebar__title body-a-bold">' + escapeHtml(site.name) + "</span>" +
      '<span class="sidebar__role body-d-regular">' + escapeHtml(site.role) + "</span>" +
      "</span>" +
      "</a>" +
      '<nav class="sidebar__nav" aria-label="Case studies">' +
      '<ul class="menu">' + items + "</ul>" +
      "</nav>";
  }

  /* ---- 2. Mobile bar: hide on scroll down, show on scroll up ------------ */
  if (!sidebar) return;

  var mobile = window.matchMedia("(max-width: 767.98px)");
  var lastY = window.scrollY;
  var ticking = false;
  var TOLERANCE = 6; // px of movement ignored, so tiny jitters don't toggle the bar

  function barHeight() {
    return sidebar.offsetHeight || 52;
  }

  function show() {
    sidebar.classList.remove("is-hidden");
  }

  function update() {
    ticking = false;
    var y = Math.max(window.scrollY, 0);

    if (!mobile.matches || y <= barHeight()) {
      show();
      lastY = y;
      return;
    }

    var delta = y - lastY;
    if (Math.abs(delta) < TOLERANCE) return;

    if (delta > 0 && !sidebar.contains(document.activeElement)) {
      sidebar.classList.add("is-hidden");
    } else if (delta < 0) {
      show();
    }
    lastY = y;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true }
  );

  // Keyboard users: always reveal the bar when something inside it gets focus
  sidebar.addEventListener("focusin", show);

  // Leaving mobile layout (rotate / resize) always restores the bar
  var onChange = function () { if (!mobile.matches) show(); };
  if (mobile.addEventListener) mobile.addEventListener("change", onChange);
  else if (mobile.addListener) mobile.addListener(onChange);
})();
