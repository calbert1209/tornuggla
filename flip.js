import { State } from "./modules/state.js";
import { Retries } from "./modules/retries.js";

function createGenerateFunction() {
  const items = [
    "あ",
    "う",
    "お",
    "か",
    "が",
    "く",
    "ぐ",
    "さ",
    "じ",
    "す",
    "ず",
    "た",
    "だ",
    "ち",
    "つ",
    "て",
    "で",
    "と",
    "ど",
    "な",
  ];
  const indexSet = new Set();
  function randomIndex() {
    let nextIndex = null;
    while ((nextIndex === null) | indexSet.has(nextIndex)) {
      nextIndex = Math.floor(Math.random() * items.length);
    }

    indexSet.add(nextIndex);
    return nextIndex;
  }

  function reset() {
    return indexSet.clear();
  }

  function generateNextItem() {
    const nextIndex = randomIndex();
    const item = items[nextIndex];
    const flipped = Math.random() < 0.5;
    return { item, flipped };
  }

  return [reset, generateNextItem];
}

function showQuestion(state) {
  console.debug(state);
  const { item, flipped } = state.current;
  const left = document.getElementById("left");
  const right = document.getElementById("right");
  const center = document.getElementById("center");
  left.classList.remove("flipped");
  right.classList.remove("flipped");
  left.innerText = item;
  right.innerText = item;
  const toBeFlipped = flipped ? left : right;
  toBeFlipped.classList.add("flipped");
  if (item === "ち") {
    center.innerText = "🧀";
  } else if (item === "さ") {
    center.innerText = "🐟";
  } else {
    center.innerText = "";
  }
  const templateId = state.isDone ? "dancing-template" : "static-template";
  const pikachu = document.getElementById(templateId);
  const header = document.getElementById("header");
  const fragment = document.createDocumentFragment();

  const headerCount = document.createElement("div");
  headerCount.innerText = state.count;
  fragment.appendChild(headerCount);

  for (let i = 0; i < state.count; i++) {
    const pikachuClone = pikachu.content.cloneNode(true);
    fragment.appendChild(pikachuClone);
  }
  header.replaceChildren(fragment);
}

const [reset, generate] = createGenerateFunction();

globalThis.state = new State(10, new Retries(), generate, showQuestion);

const ngButton = document.getElementById("ng-btn");
ngButton.addEventListener("click", () => {
  state.ng();
});
const okButton = document.getElementById("ok-btn");
okButton.addEventListener("click", () => {
  state.ok();
});
const resetButton = document.getElementById("reset-btn");
resetButton.addEventListener("click", () => {
  reset();
  state.reset();
  state.next();
});

const swapButton = document.getElementById("swap-btn");
swapButton?.addEventListener("click", () => {
  const center = document.getElementById("center");
  if (center.innerText === "+") {
    center.innerText = "-";
  } else {
    center.innerText = "+";
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "x") {
    state.ng();
  }
  if (event.key === "c") {
    state.ok();
  }
  if (event.key === "r") {
    state.reset();
    state.next();
  }

  if (event.key === "-") {
    document.getElementById("swap-btn").click();
  }
});

state.next();
