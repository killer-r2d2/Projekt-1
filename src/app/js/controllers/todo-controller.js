import { todoService } from "../services/todo-service.js";

export class TodoController {
  constructor() {
    this.showCompleted = false;
    this.sortAsc = true;

    const todoTemplateElement = document.querySelector("#todo-list-template");
    if (todoTemplateElement) {
      // eslint-disable-next-line no-undef
      Handlebars.registerHelper("formatToDateAndTime", (dateTime) => {
        const dateObject = new Date(dateTime);
        return `${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`;
      });

      // eslint-disable-next-line no-undef
      Handlebars.registerHelper("formatToDate", (dueDate) => {
        const dateObject = new Date(dueDate);
        return dateObject.toLocaleDateString("de-DE", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
      });

      // eslint-disable-next-line no-undef
      this.todoTemplateCompiled = Handlebars.compile(
        todoTemplateElement.innerHTML
      );
    }
    this.todoService = todoService;
    this.todoList = document.querySelector("#todoList");
    // Add event listener to form submit event
    const todoForm = document.querySelector("#todoForm");
    if (todoForm) {
      todoForm.addEventListener("submit", (event) => {
        this.handleTodoFormSubmit(event);
      });
    }
    this.todoToEdit = null;

    const sortCriteria = [
      "name",
      "dueDate",
      "creationDate",
      "importance",
      "completed",
    ];

    sortCriteria.forEach((criteria) => {
      const button = document.querySelector(
        `button[data-sort-by="${criteria}"]`
      );
      button.addEventListener("click", () => {
        this.sortAndFilterTodos(criteria);
      });
    });

    // Add event listener to "add todo" button
    const addTodoButton = document.querySelector("#addTodoButton");
    addTodoButton.addEventListener("click", () => {
      this.openDialog();
    });

    // Add event listener to "close" button
    const closeDialogButton = document.querySelector("#closeDialogButton");
    if (closeDialogButton) {
      closeDialogButton.addEventListener("click", () => {
        this.closeDialog();
      });
    }

    const filterButtons = document.querySelectorAll(".filterButton");
    filterButtons.forEach((filterButton) => {
      filterButton.addEventListener("click", (event) => {
        // eslint-disable-next-line no-shadow
        filterButtons.forEach((filterButton) => {
          filterButton.classList.remove("filterButtonActive");
        });
        event.target.classList.add("filterButtonActive");
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  openDialog() {
    const dialog = document.querySelector("#todoDialog");
    if (dialog) {
      dialog.showModal();
    }
  }

  closeDialog() {
    const dialog = document.querySelector("#todoDialog");
    if (dialog) {
      dialog.close();
    }
    this.todoToEdit = null;
  }

  async sortAndFilterTodos(criteria) {
    const criteriaToSortBy = criteria;
    let todos = await this.todoService.getAllTodos();
    if (criteriaToSortBy === "name") {
      todos.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteriaToSortBy === "dueDate") {
      todos.sort((a, b) => a.dueDate - b.dueDate);
    } else if (criteriaToSortBy === "creationDate") {
      todos.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
    } else if (criteriaToSortBy === "importance") {
      todos.sort((a, b) => b.importance - a.importance);
    } else if (criteriaToSortBy === "completed") {
      if (!this.showCompleted) {
        todos = todos.filter((todo) => todo.completed);
      }
      this.showCompleted = !this.showCompleted;
    }
    if (!this.sortAsc) {
      todos.reverse();
    }
    this.sortAsc = !this.sortAsc;
    let todoHTML = "";
    if (this.todoTemplateCompiled) {
      todos.forEach((todo) => {
        const todoTemplate = this.todoTemplateCompiled(todo);
        todoHTML += todoTemplate;
      });
    }
    if (this.todoList) {
      this.todoList.innerHTML = todoHTML;
    }
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    const deleteButtons = this.todoList.querySelectorAll(".deleteButton");
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", (event) => {
        const todoId = event.target.dataset.id;
        this.deleteTodoById(todoId);
      });
    });

    const editButtons = this.todoList.querySelectorAll(".editButton");
    editButtons.forEach((editButton) => {
      editButton.addEventListener("click", (event) => {
        const todoId = event.target.dataset.id;
        this.openDialogForEdit(todoId);
      });
    });

    const checkboxes = this.todoList.querySelectorAll(
      'input[name="completedCheckbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", async (event) => {
        const todoId = event.target.id;
        const todo = await this.todoService.getTodoById(todoId);

        if (todo) {
          todo.completed = event.target.checked;
          await this.todoService.updateTodoById(todoId, todo);
        }
      });
    });
  }

  async loadTodos() {
    try {
      const todos = await this.todoService.getAllTodos();
      let todoHTML = "";

      if (!todos) {
        console.error("No todos found");
        return;
      }

      todos.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
      if (this.todoTemplateCompiled) {
        todos.forEach((todo) => {
          const todoTemplate = this.todoTemplateCompiled(todo);
          todoHTML += todoTemplate;
        });
      }
      if (this.todoList) {
        this.todoList.innerHTML = todoHTML;

        this.attachEventHandlers();
      }
    } catch (error) {
      console.error("Error loading todos: ", error);
    }
  }

  async addTodo(todo) {
    try {
      await this.todoService.createTodo({
        ...todo,
      });
      await this.loadTodos();
    } catch (error) {
      console.error("Error in addTodo: ", error);
    }
  }

  async deleteTodoById(id) {
    await this.todoService.deleteTodoById(id);
    await this.loadTodos();
  }

  async updateTodoById(id, updatedTodo) {
    await this.todoService.updateTodoById(id, updatedTodo);
    await this.loadTodos();
  }

  async openDialogForEdit(event) {
    const todoId = event;
    try {
      this.todoToEdit = await this.todoService.getTodoById(todoId);
      // check if the todo is not found
      if (!this.todoToEdit) {
        console.error("Todo not found");
        return;
      }
      const titleInput = document.querySelector("#title");
      const descriptionInput = document.querySelector("#description");
      const dueDateInput = document.querySelector("#dueDate");
      const importanceInput = document.querySelector("#importance");

      titleInput.value = this.todoToEdit.title;
      descriptionInput.value = this.todoToEdit.description;
      const dueDate = new Date(this.todoToEdit.dueDate);
      dueDateInput.value = dueDate.toISOString().substring(0, 10);
      importanceInput.value = this.todoToEdit.importance;

      this.openDialog();
    } catch (error) {
      console.error("Error in openDialogForEdit: ", error);
    }
  }

  handleTodoFormSubmit(event) {
    event.preventDefault();

    const now = new Date();
    // eslint-disable-next-line no-undef
    const todo = {
      // eslint-disable-next-line no-undef
      title: title.value,
      // eslint-disable-next-line no-undef
      description: description.value,
      // eslint-disable-next-line no-undef
      dueDate: new Date(dueDate.value), // create a Date object
      daysLeft: Math.floor(
        // eslint-disable-next-line no-undef
        (new Date(dueDate.value) - now) / (1000 * 60 * 60 * 24)
      ),
      creationDate: now, // directly store the current date
      // eslint-disable-next-line no-undef
      importance: importance.value,
      completed: false,
    };

    if (this.todoToEdit) {
      // eslint-disable-next-line no-underscore-dangle
      todo._id = this.todoToEdit._id;
      todo.completed = this.todoToEdit.completed;
      todo.createdAt = this.todoToEdit.createdAt;
      // eslint-disable-next-line no-underscore-dangle
      this.updateTodoById(this.todoToEdit._id, todo);
      this.todoToEdit = null;
    } else {
      this.addTodo(todo);
    }

    // eslint-disable-next-line no-undef
    title.value = "";
    // eslint-disable-next-line no-undef
    description.value = "";
    // eslint-disable-next-line no-undef
    dueDate.value = "";
    // eslint-disable-next-line no-undef
    importance.value = "";

    this.todoToEdit = null;
    document.getElementById("todoDialog").close();
  }
}

export const todoController = new TodoController();
