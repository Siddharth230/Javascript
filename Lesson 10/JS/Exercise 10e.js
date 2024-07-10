function click(selector) {
  const button = document.querySelector(selector);
  if (!button.classList.contains("is-toggled")) {
    button.classList.add("is-toggled");
  } else {
    button.classList.remove("is-toggled");
  }
}
console.log(12 + 21);
