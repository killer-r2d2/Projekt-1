// import { todoStorage } from "../storage/todo-storage-old.js";
export class TodoService {
  constructor() {
    // this.todoStorage = todoStorage;
  }
  // fetch todos from the server and log them to the console with try/catch

  async getAllTodos() {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/todos");
      const todos = await response.json();
      console.log(todos);
    } catch (err) {
      console.error(err);
    }
  }
  getTodoById(id) {
    // return this.todoStorage.todos.find((todo) => todo.id === parseInt(id));
  }
  createTodo(todo) {
    // this.todoStorage.addTodo(todo);
  }
  deleteTodoById(id) {
    // this.todoStorage.deleteTodoById(id);
  }
  updateTodoById(id, updatedTodo) {
    // const todoIndex = this.todoStorage.todos.findIndex(
    //   (todo) => todo.id === parseInt(id)
    // );
    // if (todoIndex !== -1) {
    //   this.todoStorage.todos[todoIndex] = updatedTodo;
    //   this.todoStorage.saveTodos();
    // }
  }
  updateAllTodos(updatedTodos) {
    //   this.todoStorage.todos = updatedTodos;
    //   this.todoStorage.saveTodos();
    // }
  }
}

export const todoService = new TodoService();
