"use strict";

const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

quoteInputElement.addEventListener("input", () => {
  const quote = document.querySelectorAll("span");
  const value = quoteInputElement.value.split("");

  let correct = true;
  quote.forEach((characterSpan, index) => {
    const character = value[index];
    if (character == null) {
      characterSpan.classList.remove("incorrect");
      characterSpan.classList.remove("correct");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) renderNewQuote();
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

function renderNewQuote() {
  getRandomQuote().then((quote) => {
    quoteDisplayElement.innerHTML = "";
    quote.split("").forEach((element) => {
      const character = document.createElement("span");
      character.innerText = element;
      quoteDisplayElement.appendChild(character);
    });
  });
  quoteInputElement.value = null;
  startTimer();
}

let start;
function startTimer() {
  timerElement.innerText = 0;
  start = new Date();
  setInterval(() => {
    timerElement.innerText = getTimer();
  }, 1000);
}

function getTimer() {
  return Math.floor((new Date() - start) / 1000);
}

renderNewQuote();
