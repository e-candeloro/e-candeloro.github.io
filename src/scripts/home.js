import AOS from "aos";
import { confetti, variation } from "party-js";

AOS.init();

const heroBlocks = document.querySelectorAll(".hero-block");
let previousBlock = null;

function highlightRandomBlock() {
  if (heroBlocks.length === 0) return;

  previousBlock?.classList.remove("active");

  const randomIndex = Math.floor(Math.random() * heroBlocks.length);
  const currentBlock = heroBlocks[randomIndex];
  currentBlock.classList.add("active");
  previousBlock = currentBlock;
}

highlightRandomBlock();
window.setInterval(highlightRandomBlock, Math.random() * 1000 + 1500);

const prefersTouchInteraction =
  window.matchMedia("(hover: none)").matches || window.matchMedia("(pointer: coarse)").matches;

if (prefersTouchInteraction) {
  const cards = document.querySelectorAll(".card");
  const icons = document.querySelectorAll(".icon");

  cards.forEach((card) => {
    card.addEventListener("pointerdown", () => {
      cards.forEach((otherCard) => {
        if (otherCard !== card) otherCard.classList.remove("in-view");
      });

      card.classList.add("in-view");
    });
  });

  icons.forEach((icon) => {
    icon.addEventListener("pointerdown", () => {
      icon.classList.add("tap-active");
      window.setTimeout(() => icon.classList.remove("tap-active"), 300);
    });
  });

  document.addEventListener(
    "pointerdown",
    (event) => {
      if (event.target instanceof Element && event.target.closest(".card")) return;

      cards.forEach((card) => card.classList.remove("in-view"));
    },
    { passive: true },
  );
}

const heartButton = document.querySelector(".heart-secret-button");

function launchHeartConfetti() {
  if (!heartButton) return;

  confetti(heartButton, {
    count: variation.range(20, 30),
    spread: variation.range(40, 90),
    speed: variation.range(300, 600),
    shapes: ["square", "rectangle", "circle", "star", "roundedSquare", "roundedRectangle"],
  });
}

heartButton?.addEventListener("click", launchHeartConfetti);
heartButton?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;

  event.preventDefault();
  launchHeartConfetti();
});
