AOS.init();

const button = document.querySelector(".heart-secret-button");

button.addEventListener("click", function (e) {
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
