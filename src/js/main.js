"use strict";

import todosStore from "./todos-stores.js";

// toggle theme
const themeToggler = document.getElementById("themeToggler");
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

todosStore.renderTodos();
