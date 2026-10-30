/* ==========================================================================
   MOBILE BAR — hides the top bar on scroll down, shows it on scroll up

   Phones only (window under 768px). Scrolling down to read: the bar slides
   away to give more room. Scrolling up a little: it comes back.

   How: this file adds or removes the class "is-hidden" on the sidebar.
   The slide itself is in assets/css/site/mobile.css.
   ========================================================================== */


var mobileBar = document.querySelector("[data-sidebar]");

// "Is the window phone-sized?" — the same 768px breakpoint as mobile.css
var phoneScreen = window.matchMedia("(max-width: 767.98px)");

// Where the page was scrolled to last time we checked (in px from the top)
var lastScrollPosition = window.scrollY;

// Scroll movements smaller than this (in px) are ignored, so tiny jitters
// don't flick the bar in and out
var SCROLL_TOLERANCE = 6;

// True while a check is already waiting for the next screen refresh
var checkIsWaiting = false;


function showMobileBar() {
  mobileBar.classList.remove("is-hidden");
}

function hideMobileBar() {
  mobileBar.classList.add("is-hidden");
}

// The bar's height (52px unless it changed)
function mobileBarHeight() {
  if (mobileBar.offsetHeight) {
    return mobileBar.offsetHeight;
  }
  return 52;
}


// Runs after each scroll: decides whether the bar should be shown or hidden
function checkScroll() {
  checkIsWaiting = false;

  var scrollPosition = window.scrollY;
  if (scrollPosition < 0) {
    scrollPosition = 0;   // iPhones report negative values when bouncing at the top
  }

  // Not on a phone, or near the very top of the page: always show the bar
  if (!phoneScreen.matches || scrollPosition <= mobileBarHeight()) {
    showMobileBar();
    lastScrollPosition = scrollPosition;
    return;
  }

  // How far the page moved since last time (positive = down, negative = up)
  var movement = scrollPosition - lastScrollPosition;

  // Too small to count
  if (Math.abs(movement) < SCROLL_TOLERANCE) {
    return;
  }

  if (movement > 0) {
    // Scrolling down: hide — unless a keyboard user is inside the bar
    if (!mobileBar.contains(document.activeElement)) {
      hideMobileBar();
    }
  } else {
    // Scrolling up: show
    showMobileBar();
  }

  lastScrollPosition = scrollPosition;
}


// Leaving the phone layout (rotating the phone, resizing the window)
// always brings the bar back
function whenScreenSizeChanges() {
  if (!phoneScreen.matches) {
    showMobileBar();
  }
}


if (mobileBar) {

  // On every scroll, check once per screen refresh (not hundreds of
  // times a second, which would make scrolling stutter)
  window.addEventListener("scroll", function () {
    if (!checkIsWaiting) {
      checkIsWaiting = true;
      window.requestAnimationFrame(checkScroll);
    }
  }, { passive: true });

  // Keyboard users: always show the bar when something inside it gets focus
  mobileBar.addEventListener("focusin", showMobileBar);

  // Watch for the window crossing the 768px breakpoint
  if (phoneScreen.addEventListener) {
    phoneScreen.addEventListener("change", whenScreenSizeChanges);
  } else if (phoneScreen.addListener) {
    phoneScreen.addListener(whenScreenSizeChanges);   // older Safari
  }
}
