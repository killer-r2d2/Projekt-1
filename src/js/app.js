"use strict";
import { todoController } from "./controllers/todo-controller.js";
import { initTheme, themeToggler } from "./controllers/theme-controller.js";

initTheme();
themeToggler("#themeToggler");

window.addEventListener("DOMContentLoaded", () => {
  const todoList = document.querySelector("#todoList");
  todoController.loadTodos(todoList);
});
