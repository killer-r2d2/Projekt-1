"use strict";

// toggle theme
const themeToggler = document.getElementById("themeToggler");
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
