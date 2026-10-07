import AOS from "aos";
import { confetti, variation } from "party-js";

AOS.init();

function randomItemExcept(items, current) {
  const candidates = items.filter((item) => item !== current);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

const heroBlocks = [...document.querySelectorAll(".hero-block")];
let previousBlock = null;

function highlightRandomBlock() {
  if (heroBlocks.length === 0) return;

  previousBlock?.classList.remove("active");

  const currentBlock = randomItemExcept(heroBlocks, previousBlock);
  currentBlock.classList.add("active");
  previousBlock = currentBlock;
}

const heroVerbs = document.querySelector(".hero-verbs");
const verbs = heroVerbs ? [...heroVerbs.querySelectorAll(".hero-verb")] : [];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let activeVerb = verbs.find((verb) => verb.classList.contains("active"));

// The verbs are stacked in one grid cell; shrink the cell to the active word so "things" follows it.
function fitVerbs() {
  if (heroVerbs && activeVerb) heroVerbs.style.width = `${activeVerb.offsetWidth}px`;
}

function showRandomVerb() {
  if (verbs.length < 2 || prefersReducedMotion) return;

  activeVerb.classList.remove("active");
  activeVerb = randomItemExcept(verbs, activeVerb);
  activeVerb.classList.add("active");
  fitVerbs();
}

highlightRandomBlock();
fitVerbs();
document.fonts?.ready.then(fitVerbs);
window.addEventListener("resize", fitVerbs);

// Hero tiles and verbs share one tick so they switch together.
window.setInterval(() => {
  highlightRandomBlock();
  showRandomVerb();
}, Math.random() * 1000 + 1500);

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
