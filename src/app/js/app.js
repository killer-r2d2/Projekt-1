"use strict";
import { todoController } from "./controllers/todo-controller.js";
import { initTheme, themeToggler } from "./controllers/theme-controller.js";

initTheme();
themeToggler("#themeToggler");

window.addEventListener("DOMContentLoaded", () => {
  todoController.loadTodos(todoList);
});
