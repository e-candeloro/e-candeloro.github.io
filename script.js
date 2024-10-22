// Initialize AOS
AOS.init();

// Heart button event listener
const button = document.querySelector(".heart-secret-button");

button.addEventListener("click", function () {
  party.confetti(this, {
    count: party.variation.range(20, 30),
    spread: party.variation.range(40, 90),
    speed: party.variation.range(300, 600),
    shapes: [
      "square",
      "rectangle",
      "circle",
      "star",
      "roundedSquare",
      "roundedRectangle",
    ],
  });
});

// Select all elements to observe
const elementsToObserve = document.querySelectorAll(
  ".card, .cv-card, .contact-card, .nav-arrow, .reverse, .heart-secret-button, .block, .nav-link, .link, .button-primary, .button-secondary"
);

// Function to check elements in view
function checkElementsInView() {
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const topThreshold = viewportHeight * 0.3; // Top 10%
  const bottomThreshold = viewportHeight * 0.9; // Bottom 90%

  elementsToObserve.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top;
    const elementBottom = rect.bottom;

    if (elementBottom > topThreshold && elementTop < bottomThreshold) {
      // Element is within central 80%, add .in-view
      element.classList.add("in-view");
    } else {
      // Element is in top or bottom 10%, remove .in-view
      element.classList.remove("in-view");
    }
  });
}

// Throttle function to optimize scroll event
let isThrottled = false;

function throttle(fn, wait) {
  return function () {
    if (!isThrottled) {
      fn();
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, wait);
    }
  };
}

window.addEventListener("scroll", throttle(checkElementsInView, 100));
window.addEventListener("resize", checkElementsInView);

// Initial check on page load
checkElementsInView();
