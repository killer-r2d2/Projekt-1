import { todoService } from "../services/todo-service.js";

export class TodoController {
  constructor() {
    const todoTemplateElement = document.querySelector("#todo-list-template");
    if (todoTemplateElement) {
      this.todoTemplateCompiled = Handlebars.compile(
        todoTemplateElement.innerHTML
      );
    }
    this.todoService = todoService;
    this.todoList = document.querySelector("#todoList");
    window.addEventListener("load", () => {
      this.todoForm = document.querySelector("#todoForm");
      if (this.todoForm) {
        this.todoForm.addEventListener("submit", (event) =>
          this.handleTodoFormSubmit(event)
        );
      }
    });
  }

  loadTodos() {
    this.todos = this.todoService.getAllTodos();
    let todoHTML = "";
    if (this.todoTemplateCompiled) {
      this.todos.forEach((todo) => {
        const todoTemplate = this.todoTemplateCompiled(todo);
        todoHTML += todoTemplate;
      });
    }
    if (this.todoList) {
      this.todoList.innerHTML = todoHTML;
    }
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

  handleTodoFormSubmit(event) {
    event.preventDefault();

    // Extract the data from the form.
    const todoInput = document.querySelector("#todoInput");
    const descriptionInput = document.querySelector("#descriptionInput");
    const dueDateInput = document.querySelector("#dueDateInput");
    const importanceInput = document.querySelector("#importanceInput");

    const todo = {
      title: todoInput.value,
      description: descriptionInput.value,
      dueDate: dueDateInput.value,
      importance: importanceInput.value,
      completed: false,
      createdAt: new Date(),
      creationDate: new Date(),
    };

    // Add the new todo item.
    this.addTodo({
      id: Date.now(),
      ...todo,
    });

    // Reset the form.
    this.todoForm.reset();

    // redirect to index.html
    window.location.href = "/";
  }
}

export const todoController = new TodoController();
