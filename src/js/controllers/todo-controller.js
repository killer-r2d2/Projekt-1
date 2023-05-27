import { todoService } from "../services/todo-service.js";

export class TodoController {
  constructor() {
    this.todoTemplateCompiled = Handlebars.compile(
      document.querySelector("#todo-list-template").innerHTML
    );
    this.todoService = todoService;
    this.todoList = document.querySelector("#todoList");
  }

  loadTodos() {
    this.todos = this.todoService.getAllTodos();
    let todoHTML = "";
    this.todos.forEach((todo) => {
      const todoTemplate = this.todoTemplateCompiled(todo);
      todoHTML += todoTemplate;
    });
    this.todoList.innerHTML = todoHTML;
  }

  addTodo(todo) {
    this.todoService.createTodo({
      id: Date.now(),
      ...todo,
    });
    this.loadTodos();
  }

  deleteTodoById(id) {
    this.todoService.deleteTodoById(id);
    this.loadTodos();
  }

  updateTodoById(id, updatedTodo) {
    this.todoService.updateTodoById(id, updatedTodo);
    this.loadTodos();
  }
}

export const todoController = new TodoController();
