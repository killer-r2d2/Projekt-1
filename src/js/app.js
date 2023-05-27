"use strict";
import { todoController } from "./controllers/todo-controller.js";
import { themeToggler } from "./controllers/theme-controller.js";

themeToggler("#themeToggler");

window.addEventListener("DOMContentLoaded", () => {
  todoController.loadTodos();
});
