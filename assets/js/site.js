/* ==========================================================================
   Site behaviour
   1. Renders the sidebar / mobile bar from config.js (one source for every page)
   2. Hides the mobile bar on scroll down, shows it again on scroll up
   3. Shows the habibi skeleton (and loader) on images until they load
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
      "</svg>",
    doc:
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false">' +
      '<path d="M12.9167 9.16651V10.8332H7.08333V9.16651H12.9167Z"/>' +
      '<path d="M12.9167 14.1665V12.4998H7.08333V14.1665H12.9167Z"/>' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M6.66667 2.49985H10.6311C11.2942 2.49985 11.9301 2.76324 12.3989 3.23208L15.1011 5.93428C15.5699 6.40312 15.8333 7.03901 15.8333 7.70205V14.9998C15.8333 16.3806 14.714 17.4998 13.3333 17.4998H6.66667C5.28595 17.4998 4.16667 16.3806 4.16667 14.9998V4.99985C4.16667 3.61914 5.28595 2.49985 6.66667 2.49985ZM14.1667 8.33318C14.1667 7.87294 13.7936 7.49985 13.3333 7.49985H10.8333V4.99985C10.8333 4.53961 10.4602 4.16651 10 4.16651H6.66667C6.20643 4.16651 5.83333 4.53961 5.83333 4.99985V14.9998C5.83333 15.4601 6.20643 15.8332 6.66667 15.8332H13.3333C13.7936 15.8332 14.1667 15.4601 14.1667 14.9998V8.33318Z"/>' +
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
          '<span class="menu-item__icon">' + (ICONS[item.icon] || ICONS.doc) + "</span>" +
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

  /* ---- 3. Image loaders: skeleton until each image has loaded ----------- */
  function watchImage(box) {
    var img = box.querySelector("img");
    if (!img || (img.complete && img.naturalWidth > 0)) return; // already there
    box.setAttribute("data-loading", "");
    box.setAttribute("aria-busy", "true");
    function done(failed) {
      box.removeAttribute("data-loading");
      box.removeAttribute("aria-busy");
      if (failed) box.setAttribute("data-failed", "");
    }
    img.addEventListener("load", function () { done(false); }, { once: true });
    img.addEventListener("error", function () { done(true); }, { once: true });
  }

  function initImageLoaders() {
    Array.prototype.forEach.call(document.querySelectorAll(".image-loader"), watchImage);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initImageLoaders);
  } else {
    initImageLoaders();
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
