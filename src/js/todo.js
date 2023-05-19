// create a new todo in todo.html
const todoForm = document.querySelector("#todoForm");
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoInput = document.querySelector("#todoInput");
  const descriptionInput = document.querySelector("#descriptionInput");
  const dueDateInput = document.querySelector("#dueDateInput");
  const importanceInput = document.querySelector("#importanceInput");
  const statusCheckbox = document.querySelector("#statusCheckbox");

  const newTodo = {
    todo: todoInput.value,
    description: descriptionInput.value,
    dueDate: dueDateInput.value,
    importance: importanceInput.value,
    status: statusCheckbox.checked,
  };
  // clear the form
  todoForm.reset();

  // save the todo to local storage
  // get the existing todos from local storage
  let todos = localStorage.getItem("todos");
  // if there are no todos, create an empty array
  if (!todos) {
    todos = [];
  }
  // if there are todos, parse them into an array
  else {
    todos = JSON.parse(todos);
  }
  // add the new todo to the array
  todos.push(newTodo);
  // save the array back to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
});
