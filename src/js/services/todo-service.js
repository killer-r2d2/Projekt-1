import { todoStorage } from "../storage/todo-storage.js";

// createTodo
const createTodo = (todo) => {
  todoStorage.create(todo);
  window.location.href = "index.html";
};

// readTodos
const readTodos = () => {
  return todoStorage.read();
};

// updateTodo
const updateTodo = (id) => {
  const todo = todoStorage.read(id);
  if (todo) {
    todoStorage.update(todo);
    window.location.href = "todo.html";
    todo.preefillForm();
  } else {
    console.error(`Todo with id ${id} not found`);
  }
};

// deleteTodo
const deleteTodo = (id) => {
  todoStorage.delete(id);
  window.location.href = "index.html";
};
