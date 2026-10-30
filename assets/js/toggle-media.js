/* ==========================================================================
   TOGGLE MEDIA — the "AI scene" switch that swaps two images

   Used in the Legacy vs Current blocks (MA.direct, Raiffeisen Bank, T-bank).
   Each block has two images and a habibi switch. Clicking the switch:
   - flips data-active on the block ("true" ↔ "false"); the CSS then fades
     the right image in (assets/css/site/toggle-media.css)
   - flips aria-checked on the switch, which moves the knob
   - hides the invisible image from screen readers, so they only describe
     the picture that is actually on screen

   The starting state comes from the HTML: aria-checked="true" on the
   switch shows the image marked  toggle-media__image--on.
   ========================================================================== */


// Sets up one toggle block
function setUpToggle(block) {
  var switchButton = block.querySelector('[role="switch"]');
  var imageOn = block.querySelector(".toggle-media__image--on");
  var imageOff = block.querySelector(".toggle-media__image--off");

  if (!switchButton) {
    return;
  }

  // Show or hide an image for screen readers
  function hideFromScreenReaders(image, hidden) {
    if (!image) {
      return;
    }
    if (hidden) {
      image.setAttribute("aria-hidden", "true");
    } else {
      image.removeAttribute("aria-hidden");
    }
  }

  // Put the block into the on (true) or off (false) state
  function setState(isOn) {
    if (isOn) {
      block.setAttribute("data-active", "true");
      switchButton.setAttribute("aria-checked", "true");
    } else {
      block.setAttribute("data-active", "false");
      switchButton.setAttribute("aria-checked", "false");
    }
    hideFromScreenReaders(imageOn, !isOn);
    hideFromScreenReaders(imageOff, isOn);
  }

  // A click flips the state
  switchButton.addEventListener("click", function () {
    var isOnNow = switchButton.getAttribute("aria-checked") === "true";
    setState(!isOnNow);
  });

  // Start in the state written in the HTML
  setState(switchButton.getAttribute("aria-checked") === "true");
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
