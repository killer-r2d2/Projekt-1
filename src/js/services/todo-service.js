import { todoStorage } from "../storage/todo-storage.js";

console.log(todoStorage);

export class TodoService {
  constructor() {
    this.todoStorage = todoStorage;
  }

  getAllTodos() {
    return this.todoStorage.todos;
  }
  getTodoById(id) {
    return this.todoStorage.todos.find((todo) => todo.id === id);
  }
  createTodo(todo) {
    this.todoStorage.addTodo(todo);
  }
  deleteTodoById(id) {
    this.todoStorage.deleteTodoById(id);
  }
  updateTodoById(id, updatedTodo) {
    const todoIndex = this.todoStorage.todos.findIndex(
      (todo) => todo.id === parseInt(id)
    );
    if (todoIndex !== -1) {
      this.todoStorage.todos[todoIndex] = updatedTodo;
      this.todoStorage.saveTodos();
    }
  }
  updateAllTodos(updatedTodos) {
    this.todoStorage.todos = updatedTodos;
    this.todoStorage.saveTodos();
  }
}

export const todoService = new TodoService();
