// getTodos
const getTodos = () => {
  const todos = localStorage.getItem("todos");
  if (!todos) return [];
  return JSON.parse(todos);
};
// createTodo
const createTodo = (todo) => {
  const todos = getTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  window.location.href = "index.html";
};
// updateTodo
const updateTodo = (id) => {
  const todos = getTodos();
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    localStorage.setItem("todo", JSON.stringify(todo));
    window.location.href = "todo.html";
  } else {
    console.error(`Todo with id ${id} not found`);
  }
};
// deleteTodo
const deleteTodo = (id) => {
  let todos = getTodos();
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
  window.location.href = "index.html";
};

export default { deleteTodo, updateTodo, createTodo, getTodos };
