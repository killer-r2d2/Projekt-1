let todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [
      {
        id: 1,
        description: "This is a description",
        dueDate: "2021-10-10",
        importance: "high",
        status: false,
        todo: "This is a todo",
      },
      {
        id: 2,
        description: "This is a description",
        dueDate: "2021-10-10",
        importance: "high",
        status: false,
        todo: "This is a todo",
      },
      {
        id: 3,
        description: "This is a description",
        dueDate: "2021-10-10",
        importance: "high",
        status: false,
        todo: "This is a todo",
      },
      {
        id: 4,
        description: "This is a description",
        dueDate: "2021-10-10",
        importance: "high",
        status: false,
        todo: "This is a todo",
      },
      {
        id: 5,
        description: "This is a description",
        dueDate: "2021-10-10",
        importance: "high",
        status: false,
        todo: "This is a todo",
      },
    ];

console.log(todos);

const createHtmlForTodo = (todo) => {
  const checkBoxId = `statusCheckbox${todo.id}`;
  const editButtonId = `editButton${todo.id}`;
  const deleteButtonId = `deleteButton${todo.id}`;
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
          <img
            class="iconArrowTrendingUp"
            src="./src/icons/iconTrendingUp.svg"
            alt="Arrow trending up"
          />
        </div>
        <div>
          <button id="${editButtonId}" class="primaryButton">Edit</button>
          <button id="${deleteButtonId}" class="primaryButton">Delete</button>
        </div>
    `;
  return todoHtml;
};

// create new todo in todo.html
// save todo to todos array in todos-stores.js
// render todos in index.html
const collectFormData = () => {
  const todo = document.querySelector("#todoInput").value;
  const description = document.querySelector("#descriptionInput").value;
  const dueDate = document.querySelector("#dueDateInput").value;
  const importance = document.querySelector("#importanceInput").value;
  const status = document.querySelector("#statusCheckbox").checked;
  const newTodo = {
    id: Math.floor(Math.random() * 1000),
    description,
    dueDate,
    importance,
    status,
    todo,
  };
  return newTodo;
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  const newTodo = collectFormData();
  todos.push(newTodo);
  console.log(todos);
  // store todos in local storage
  localStorage.setItem("todos", JSON.stringify(todos));
  // redirect to index.html
  window.location.href = "index.html";
};

const form = document.querySelector("#todoForm");
if (form) {
  form.addEventListener("submit", handleFormSubmit);
}

const renderTodos = () => {
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
};

export default { todos, renderTodos };
