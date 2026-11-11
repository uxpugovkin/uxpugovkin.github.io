/* ==========================================================================
   CARD HOVER — the home page cards react to the cursor even mid-scroll

   Browsers don't update :hover while the page is scrolling: a card that
   slides under a still cursor only starts its hover animation once the
   scrolling stops. This file fixes that. It remembers where the cursor
   is and, on every scroll, marks the card under it with "is-hovered".
   home-cards.css treats "is-hovered" exactly like :hover.

   Only on devices with a real mouse or trackpad (phones have no hover).
   ========================================================================== */


(function () {
  var mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!mouse.matches) {
    return;
  }

  var pointerX = null;
  var pointerY = null;
  var hoveredCard = null;
  var checkQueued = false;

  // Moves the "is-hovered" mark to this card (or removes it with null)
  function markCard(card) {
    if (card === hoveredCard) {
      return;
    }
    if (hoveredCard) {
      hoveredCard.classList.remove("is-hovered");
    }
    if (card) {
      card.classList.add("is-hovered");
    }
    hoveredCard = card;
  }

  // Finds the card under the remembered cursor position
  function checkUnderCursor() {
    checkQueued = false;
    if (pointerX === null) {
      return;
    }
    var element = document.elementFromPoint(pointerX, pointerY);
    markCard(element ? element.closest(".case-card") : null);
  }

  // The cursor moved: remember where, and follow it card to card
  document.addEventListener("pointermove", function (event) {
    if (event.pointerType !== "mouse") {
      return;
    }
    pointerX = event.clientX;
    pointerY = event.clientY;
    markCard(event.target.closest ? event.target.closest(".case-card") : null);
  }, { passive: true });

  // The page scrolled under a still cursor: check once per screen refresh
  window.addEventListener("scroll", function () {
    if (!checkQueued) {
      checkQueued = true;
      window.requestAnimationFrame(checkUnderCursor);
    }
  }, { passive: true });

  // The cursor left the window: no card is hovered
  document.documentElement.addEventListener("mouseleave", function () {
    pointerX = null;
    markCard(null);
  });
})();
