const header = document.querySelector("header");
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const signUp = document.querySelector(".sign-up");
const modalOverlay = document.querySelector(".modal-overlay");
const close = document.querySelector(".close");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("nav-display");
  header.classList.toggle("header-width");
});

signUp.addEventListener("click", () => {
  modalOverlay.classList.add("modal-overlay-toggle");
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("modal-overlay-toggle");
  }
});

close.addEventListener("click", () => {
  modalOverlay.classList.remove("modal-overlay-toggle");
});
