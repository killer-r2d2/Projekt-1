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

    window.addEventListener("load", () => {
      const urlParams = new URLSearchParams(window.location.search);
      const todoId = urlParams.get("id");
      if (todoId) {
        this.loadTodo(todoId);
      }
    });
  }

  loadTodo(todoId) {
    const todo = this.todoService.getTodoById(todoId);
    if (todo) {
      const todoInput = document.querySelector("#todoInput");
      const descriptionInput = document.querySelector("#descriptionInput");
      const dueDateInput = document.querySelector("#dueDateInput");
      const importanceInput = document.querySelector("#importanceInput");

      todoInput.value = todo.title;
      descriptionInput.value = todo.description;
      dueDateInput.value = todo.dueDate;
      importanceInput.value = todo.importance;
    }
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

      const deleteButtons = this.todoList.querySelectorAll(
        ".listItem__buttons__deleteButton"
      );
      deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", (event) => {
          const todoId = event.target.dataset.id;
          this.deleteTodoById(todoId);
        });
      });

      const editButtons = this.todoList.querySelectorAll(
        ".listItem__buttons__editButton"
      );
      editButtons.forEach((editButton) => {
        editButton.addEventListener("click", (event) => {
          const todoId = event.target.dataset.id;
          this.navigateToEditTodoPage(todoId);
        });
      });
    }
  }

  navigateToEditTodoPage(id) {
    window.location.href = `/todo.html?id=${id}`;
  }

  addTodo(todo) {
    const randomId = Math.floor(Math.random() * 1000000);
    this.todoService.createTodo({
      id: randomId,
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

    const urlParams = new URLSearchParams(window.location.search);
    const todoId = urlParams.get("id");

    const todo = {
      id: todoId ? parseInt(todoId) : Math.floor(Math.random() * 1000000),
      title: todoInput.value,
      description: descriptionInput.value,
      dueDate: dueDateInput.value,
      importance: importanceInput.value,
      completed: false,
      createdAt: new Date(),
      creationDate: new Date(),
    };

    if (todoId) {
      this.updateTodoById(todoId, todo);
    } else {
      this.addTodo(todo);
    }

    // Reset the form.
    this.todoForm.reset();

    // redirect to index.html
    window.location.href = "/";
  }
}

export const todoController = new TodoController();
