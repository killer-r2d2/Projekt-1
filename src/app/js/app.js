import { todoController } from "./controllers/todo-controller.js";
import { initTheme, themeToggler } from "./controllers/theme-controller.js";

initTheme();
themeToggler("#themeToggler");

window.addEventListener("DOMContentLoaded", () => {
  // eslint-disable-next-line no-undef
  todoController.loadTodos(todoList);
});
