import { State } from "./modules/state.js";
import { Retries } from "./modules/retries.js";

function generateTwoDigits() {
  return Array.from(Array(2), () => {
    return Math.floor(Math.random() * 10);
  });
}

function generateTwoDigitObject() {
  const values = Array.from(Array(2), () => {
    return Math.floor(Math.random() * 6);
  });

  const [a, b] = [Math.max(...values), Math.min(...values)];

  return { a, b };
}

function generateDots() {
  const length = Math.ceil(Math.random() * 6);
  return Array.from(Array(length), () => ".").join("");
}

function showQuestion(state) {
  console.debug(state);
  const {a, b} = state.current;
  document.getElementById('left').innerText = a;
  document.getElementById('right').innerText = b;
  const templateId = state.isDone ? 'dancing-template' : 'static-template';
  const pikachu = document.getElementById(templateId);
  const header = document.getElementById('header');
  const fragment = document.createDocumentFragment();

  const headerCount = document.createElement('div');
  headerCount.innerText = state.count;
  fragment.appendChild(headerCount);

  for(let i = 0; i < state.count; i++) {
    const pikachuClone = pikachu.content.cloneNode(true);
    fragment.appendChild(pikachuClone);
  }
  header.replaceChildren(fragment);
}

globalThis.state = new State(10, new Retries(), generateTwoDigitObject, showQuestion);

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
