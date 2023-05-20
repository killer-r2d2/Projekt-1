"use strict";

import todosStore from "./todos-stores.js";

// toggle theme
const themeToggler = document.getElementById("themeToggler");
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const createHtmlForTodo = (todo) => {
  const todoHtml = `
      <div class="statusAndDurationBox">
        <div>
          <input type="checkbox" id="statusCheckbox" />
          <label for="statusCheckbox">${todo.status ? "Done" : "Open"}</label>
        </div>
        <p>${todo.dueDate}</p>
      </div>
      <div>
        <h2>${todo.todo}</h2>
        <p>
          ${todo.description}
        </p>
      </div>
      <div>
        <img
          class="iconArrowTrendingUp"
          src="./src/icons/iconTrendingUp.svg"
          alt="Arrow trending up"
        />
      </div>
      <div>
        <button id="editTodo" class="primaryButton">Edit</button>
        <button id="deleteTodo" class="primaryButton">Delete</button>
      </div>
  `;
  return todoHtml;
};

const renderTodos = () => {
  const todoList = document.querySelector("#todoList");
  const df = document.createDocumentFragment();
  todosStore.todos.forEach((todo) => {
    const liElement = document.createElement("li");
    liElement.classList.add("listEntry");
    liElement.innerHTML = createHtmlForTodo(todo);
    df.appendChild(liElement);
  });
  todoList.appendChild(df);
};

renderTodos();
