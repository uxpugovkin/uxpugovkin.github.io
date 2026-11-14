/* ==========================================================================
   PREFETCH — load the case studies ahead, so nothing is missed on arrival

   Once the page has finished loading and the browser is idle:
   - every case study page in the menu (config.js) is fetched in the
     background, so opening one is instant
   - a case with a `video` in config.js also gets its Vimeo player fetched
   - images further down this page start loading now instead of when they
     scroll into view, so a fast scroll never lands on grey placeholders

   When the visitor points at, touches or tabs to a link to a case with a
   video, the connections to Vimeo are opened right away, so the video
   starts sooner after the click.

   Visitors on "data saver" or a very slow connection get none of this.
   Uses: config.js (SITE) — it loads before this file.
   ========================================================================== */


var siteRootForPrefetch = document.documentElement.getAttribute("data-root") || "./";
var thisPageId = document.body.getAttribute("data-page");

// The Vimeo servers the player and the video stream come from
var vimeoServers = [
  "https://player.vimeo.com",
  "https://f.vimeocdn.com",
  "https://i.vimeocdn.com",
  "https://vod-adaptive-ak.vimeocdn.com"
];


// Is it OK to download extra things in the background?
function canPrefetch() {
  var connection = navigator.connection;
  if (!connection) {
    return true;
  }
  if (connection.saveData) {
    return false;
  }
  return !/(^|-)2g$/.test(connection.effectiveType || "");
}

// Add one <link rel="…"> to the page head (once per address)
var addedLinks = {};

function addLink(rel, address) {
  if (addedLinks[rel + " " + address]) {
    return;
  }
  addedLinks[rel + " " + address] = true;

  var link = document.createElement("link");
  link.rel = rel;
  link.href = address;
  document.head.appendChild(link);
}


// Fetch every other case study page (and its video player)
function prefetchCasePages() {
  var menu = window.SITE.menu;

  for (var i = 0; i < menu.length; i++) {
    var item = menu[i];
    // Skip dividers, this page and links to other sites
    if (!item.href || item.id === thisPageId || item.external) {
      continue;
    }
    addLink("prefetch", siteRootForPrefetch + item.href);
    if (item.video) {
      addLink("prefetch", item.video);
    }
  }
}

// Start loading the images further down this page now
function loadImagesBelow() {
  var images = document.querySelectorAll('img[loading="lazy"]');

  for (var i = 0; i < images.length; i++) {
    images[i].loading = "eager";
  }
}


// Pointing at a link to a case with a video: open the Vimeo connections
function warmUpVideo(event) {
  var link = event.target.closest && event.target.closest("a[href]");
  if (!link) {
    return;
  }

  var menu = window.SITE.menu;
  for (var i = 0; i < menu.length; i++) {
    var item = menu[i];
    if (item.video && link.pathname.replace(/\/$/, "").endsWith("/" + item.href.replace(/\/$/, ""))) {
      for (var j = 0; j < vimeoServers.length; j++) {
        addLink("preconnect", vimeoServers[j]);
      }
      return;
    }
  }
}


// Wait until the page has loaded and the browser has nothing else to do
function whenIdle(task) {
  function run() {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(task, { timeout: 3000 });
    } else {
      setTimeout(task, 1000);
    }
  }

  if (document.readyState === "complete") {
    run();
  } else {
    window.addEventListener("load", run, { once: true });
  }
}


if (canPrefetch()) {
  whenIdle(function () {
    loadImagesBelow();
    prefetchCasePages();
  });

  document.addEventListener("pointerover", warmUpVideo, { passive: true });
  document.addEventListener("touchstart", warmUpVideo, { passive: true });
  document.addEventListener("focusin", warmUpVideo);
}
