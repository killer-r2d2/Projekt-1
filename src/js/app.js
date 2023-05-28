"use strict";
import { todoController } from "./controllers/todo-controller.js";
import { themeToggler } from "./controllers/theme-controller.js";

themeToggler("#themeToggler");

window.addEventListener("DOMContentLoaded", () => {
  const todoList = document.querySelector("#todoList");
  todoController.loadTodos(todoList);
});
