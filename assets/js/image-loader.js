/* ==========================================================================
   IMAGE LOADER — the grey pulsing placeholder until each image loads

   For every  <span class="image-loader">  on the page:
   - image still loading → mark the box with data-loading
                           (the CSS shows the skeleton pulse and spinner)
   - image loaded        → remove the mark (the image fades in)
   - image failed        → mark the box with data-failed (calm grey box)

   The look is in assets/css/site/image-loader.css.

   Videos (the Vimeo player) work the same way, with one extra: their
   address is kept in data-src and only set here, so the placeholder shows
   until the player is ready. Visitors who turned on "reduce motion" on
   their device get the video without autoplay and with its controls.
   ========================================================================== */


// Did the visitor turn on "reduce motion" on their device?
var visitorPrefersLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


function markAsLoading(box) {
  box.setAttribute("data-loading", "");
  box.setAttribute("aria-busy", "true");   // tells screen readers it's loading
}

function markAsLoaded(box) {
  box.removeAttribute("data-loading");
  box.removeAttribute("aria-busy");
}


// One image box
function watchImage(box) {
  var image = box.querySelector("img");

  // No image inside, or it's already loaded (e.g. from the browser cache)
  if (!image) {
    return;
  }
  if (image.complete && image.naturalWidth > 0) {
    return;
  }

  markAsLoading(box);

  image.addEventListener("load", function () {
    markAsLoaded(box);
  }, { once: true });

  image.addEventListener("error", function () {
    markAsLoaded(box);
    box.setAttribute("data-failed", "");
  }, { once: true });
}


// One video box
function watchVideo(box, video) {
  var address = video.getAttribute("data-src");

  if (visitorPrefersLessMotion) {
    // No autoplay, and give the controls back so it can be played by hand
    address = address.replace("autoplay=1", "autoplay=0");
    address = address.replace("&background=1", "");
    address = address.replace("&controls=0", "");
    video.removeAttribute("tabindex");
    video.removeAttribute("aria-hidden");
  }

  markAsLoading(box);

  video.addEventListener("load", function () {
    markAsLoaded(box);
  }, { once: true });

  // Now start loading the video
  video.removeAttribute("data-src");
  video.src = address;
}


// Go through every image-loader box on the page
function startImageLoaders() {
  var boxes = document.querySelectorAll(".image-loader");

  for (var i = 0; i < boxes.length; i++) {
    var box = boxes[i];
    var video = box.querySelector("iframe[data-src]");

    if (video) {
      watchVideo(box, video);
    } else {
      watchImage(box);
    }
  }
}


// This file loads before the page content, so wait until the whole page
// is read before looking for images
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startImageLoaders);
} else {
  startImageLoaders();
}
