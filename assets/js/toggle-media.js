/* ==========================================================================
   TOGGLE MEDIA — the Legacy vs Current block

   Used on MA.direct, Raiffeisen Bank and T-bank. One block holds four
   images, a Legacy / Current segment group and an "AI scene" switch.
   - a segment click sets data-type on the block ("legacy" or "current")
     and presses that segment (aria-pressed)
   - a switch click flips aria-checked, which moves the knob
   Then the one image that matches both (data-type and data-ai) is shown;
   the other three get aria-hidden="true", which the CSS fades out
   (assets/css/site/toggle-media.css) and screen readers skip.

   The starting state comes from the HTML: data-type on the block and
   aria-checked on the switch.
   ========================================================================== */


// Sets up one toggle block
function setUpToggle(block) {
  var switchButton = block.querySelector('[role="switch"]');
  var segments = block.querySelectorAll(".segment");
  var images = block.querySelectorAll(".toggle-media__image");

  if (!switchButton) {
    return;
  }

  // Show the image that matches the segment and the switch, hide the rest
  function update() {
    var type = block.getAttribute("data-type");
    var ai = switchButton.getAttribute("aria-checked");

    for (var i = 0; i < segments.length; i++) {
      var isPressed = segments[i].getAttribute("data-type") === type;
      segments[i].setAttribute("aria-pressed", isPressed ? "true" : "false");
    }

    for (var j = 0; j < images.length; j++) {
      var image = images[j];
      if (image.getAttribute("data-type") === type && image.getAttribute("data-ai") === ai) {
        image.removeAttribute("aria-hidden");
      } else {
        image.setAttribute("aria-hidden", "true");
      }
    }
  }

  // A switch click flips the AI scene
  switchButton.addEventListener("click", function () {
    var isOnNow = switchButton.getAttribute("aria-checked") === "true";
    switchButton.setAttribute("aria-checked", isOnNow ? "false" : "true");
    update();
  });

  // A segment click picks Legacy or Current
  for (var k = 0; k < segments.length; k++) {
    segments[k].addEventListener("click", function () {
      block.setAttribute("data-type", this.getAttribute("data-type"));
      update();
    });
  }

  // Start in the state written in the HTML
  update();
}


// Go through every toggle block on the page
function startToggles() {
  var blocks = document.querySelectorAll(".toggle-media");
  for (var i = 0; i < blocks.length; i++) {
    setUpToggle(blocks[i]);
  }
}


// This file loads before the page content, so wait until the whole page
// is read before looking for toggles
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startToggles);
} else {
  startToggles();
}
