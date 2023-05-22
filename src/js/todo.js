import todoservice from "./todo-service.js";

// create html for todo
const createHtmlForTodo = (todo) => {
  const checkBoxId = `statusCheckbox${todo.id}`;
  const editButtonId = `editButton${todo.id}`;
  const deleteButtonId = `deleteButton${todo.id}`;
  let importanceIcons = "";
  for (let i = 0; i < todo.importance; i++) {
    importanceIcons += `
      <img
        class="iconArrowTrendingUp"
        src="./src/icons/iconTrendingUp.svg"
        alt="Arrow trending up"
      />  
    `;
  }
  const todoHtml = `
        <div class="statusAndDurationBox">
          <div>
            <input type="checkbox" id="${checkBoxId}" />
            <label for="${checkBoxId}">${todo.status ? "Done" : "Open"}</label>
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
          ${importanceIcons}
        </div>
        <div>
          <button data-id="${editButtonId}" class="primaryButton editButton">Edit</button>
          <button data-id="${deleteButtonId}" class="primaryButton deleteButton">Delete</button>
        </div>
    `;
  return todoHtml;
};

const prefillForm = () => {
  const todoItem = localStorage.getItem("todo");
  if (todoItem === null) return;

  const todo = JSON.parse(todoItem);

  const todoInput = document.querySelector("#todoInput");
  const descriptionInput = document.querySelector("#descriptionInput");
  const dueDateInput = document.querySelector("#dueDateInput");
  const importanceInput = document.querySelector("#importanceInput");
  const statusCheckbox = document.querySelector("#statusCheckbox");

  todoInput.value = todo.todo;
  descriptionInput.value = todo.description;
  dueDateInput.value = todo.dueDate;
  importanceInput.value = todo.importance;
  statusCheckbox.checked = todo.status;
};

// create new todo
const collectFormData = () => {
  const todo = document.querySelector("#todoInput").value;
  const description = document.querySelector("#descriptionInput").value;
  const dueDate = document.querySelector("#dueDateInput").value;
  const importance = document.querySelector("#importanceInput").value;
  const status = document.querySelector("#statusCheckbox").checked;

  // Check if todo exists in localStorage to decide whether to create new id or use existing id
  const id = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo")).id
    : Math.floor(Math.random() * 1000);

  const newTodo = {
    id,
    description,
    dueDate,
    importance,
    status,
    todo,
  };
  return newTodo;
};
// handleFormSubmit
const handleFormSubmit = (event) => {
  event.preventDefault();
  const newTodo = collectFormData();

  let todos = todoservice.getTodos();

  if (localStorage.getItem("todo")) {
    // If todo exists in localStorage, it means we're editing existing todo
    const index = todos.findIndex((todo) => todo.id === newTodo.id);
    if (index !== -1) {
      todos[index] = newTodo; // Replace the old todo with the updated one
    }
    localStorage.removeItem("todo");
  } else {
    // Else, we're creating a new todo
    todos.push(newTodo);
  }

  // store todos in local storage
  localStorage.setItem("todos", JSON.stringify(todos));
  // redirect to index.html
  window.location.href = "index.html";
};
const form = document.querySelector("#todoForm");
if (form) {
  form.addEventListener("submit", handleFormSubmit);
}

// render todos
const renderTodos = () => {
  let todos = todoservice.getTodos();
  const todoList = document.querySelector("#todoList");
  if (todoList) {
    // If todos are stored in localStorage, use them
    if (localStorage.getItem("todos")) {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const df = document.createDocumentFragment();
    todos.forEach((todo) => {
      const liElement = document.createElement("li");
      liElement.classList.add("listEntry");
      liElement.innerHTML = createHtmlForTodo(todo);
      df.appendChild(liElement);
    });
    todoList.appendChild(df);
  }

  // update todo
  const editButtons = document.querySelectorAll(".editButton");
  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = parseInt(event.target.dataset.id.replace("editButton", ""));
      console.log(id);
      todoservice.updateTodo(id);
    });
  });

  // delete todo
  const deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = parseInt(event.target.dataset.id.replace("deleteButton", ""));
      todoservice.deleteTodo(id);
    });
  });

  // update todo status
  const statusCheckboxes = document.querySelectorAll(".statusCheckbox");
  statusCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const id = parseInt(
        event.target.dataset.id.replace("statusCheckbox", "")
      );
      todoservice.updateTodoStatus(id);
    });
  });
};

// Call prefillForm if we're on todo.html and we are updating a todo, not creating a new one
if (
  window.location.href.includes("todo.html") &&
  localStorage.getItem("todo")
) {
  prefillForm();
}

export default { renderTodos, prefillForm };
