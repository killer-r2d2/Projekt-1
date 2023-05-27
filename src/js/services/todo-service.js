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
    this.todoStorage.todos.push(todo);
  }
  deleteTodoById(id) {
    const todoIndex = this.todoStorage.todos.findIndex(
      (todo) => todo.id === id
    );
    this.todoStorage.todos.splice(todoIndex, 1);
  }
  updateTodoById(id, updatedTodo) {
    const todoIndex = this.todoStorage.todos.findIndex(
      (todo) => todo.id === id
    );
    this.todoStorage.todos[todoIndex] = updatedTodo;
  }
}

export const todoService = new TodoService();
