"use strict";

// toggle theme
const themeToggler = document.getElementById("themeToggler");
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// get the todos from local storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);
const todoList = document.querySelector("#todos");

// render html for each todo with template literals
const createTodoHtml = (todo) => {
  const li = `
  <li class="listEntry">
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
  </li>`;
  return li;
};

const renderTodos = () => {
  const df = document.createDocumentFragment();
  todos.forEach((todo) => {
    const todoHtml = document
      .createRange()
      .createContextualFragment(createTodoHtml(todo));
    df.appendChild(todoHtml); // append li to the document fragment
  });
  todoList.appendChild(df); // append document fragment to the todoList
};

renderTodos();
