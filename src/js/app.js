"use strict";

import todo from "./todo.js";

// toggle theme
const themeToggler = document.querySelector("#themeToggler");
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

todo.renderTodos();
