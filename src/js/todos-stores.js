const todos = [
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
  todos.forEach((todo) => {
    const liElement = document.createElement("li");
    liElement.classList.add("listEntry");
    liElement.innerHTML = createHtmlForTodo(todo);
    df.appendChild(liElement);
  });
  todoList.appendChild(df);
};

export default { todos, renderTodos };
