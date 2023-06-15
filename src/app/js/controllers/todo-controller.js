import { todoService } from "../services/todo-service.js";
export class TodoController {
  constructor() {
    this.sortAsc = true;

    const todoTemplateElement = document.querySelector("#todo-list-template");
    if (todoTemplateElement) {
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

    // Add event listener to "By Name" button
    const sortByNameButton = document.querySelector(
      'button[data-sort-by="name"]'
    );

    sortByNameButton.addEventListener("click", () => {
      this.sortTodosByTitle();
    });

    // Add event listener to "By Due Date" button
    const sortByDueDateButton = document.querySelector(
      'button[data-sort-by="dueDate"]'
    );

    sortByDueDateButton.addEventListener("click", () => {
      this.sortTodosByDueDate();
    });
    // Add event listener to "By creationDate" button
    const sortByCreationDateButton = document.querySelector(
      'button[data-sort-by="creationDate"]'
    );
    sortByCreationDateButton.addEventListener("click", () => {
      this.sortTodosByCreationDate();
    });

    // Add event listener to "By importance" button
    const sortByImportanceButton = document.querySelector(
      'button[data-sort-by="importance"]'
    );
    sortByImportanceButton.addEventListener("click", () => {
      this.sortTodosByImportance();
    });

    // Add event listener to "By completed" button
    const sortByCompletedButton = document.querySelector(
      'button[data-sort-by="completed"]'
    );
    sortByCompletedButton.addEventListener("click", () => {
      this.sortTodosByCompleted();
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

    // when filter button is clicked, first remove all filterButtonActive classes from buttons
    // then add filterButtonActive class to the clicked button
    const filterButtons = document.querySelectorAll(".filterButton");
    filterButtons.forEach((filterButton) => {
      filterButton.addEventListener("click", (event) => {
        filterButtons.forEach((filterButton) => {
          filterButton.classList.remove("filterButtonActive");
        });
        event.target.classList.add("filterButtonActive");
      });
    });
  }

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

  sortTodosByCriteria(criteria) {
    const sortedTodos = this.todos.slice().sort((a, b) => {
      const valueA = a[criteria];
      const valueB = b[criteria];

      if (valueA < valueB) {
        return this.sortAsc ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortAsc ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.todoService.updateAllTodos(sortedTodos);
    this.sortAsc = !this.sortAsc;
    this.loadTodos();
  }

  sortTodosByTitle() {
    this.sortTodosByCriteria("title");
  }

  sortTodosByDueDate() {
    this.sortTodosByCriteria("dueDate");
  }

  sortTodosByCreationDate() {
    this.sortTodosByCriteria("creationDate");
  }

  sortTodosByImportance() {
    this.sortTodosByCriteria("importance");
  }

  sortTodosByCompleted() {
    this.sortTodosByCriteria("completed");
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
          // Get the todo id from the data-id attribute
          const todoId = event.target.dataset.id;
          this.openDialogForEdit(todoId);
        });
      });

      const checkboxes = this.todoList.querySelectorAll(
        'input[name="completedCheckbox"]'
      );
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (event) => {
          const todoId = Number(event.target.id);
          const todo = this.todoService.getTodoById(todoId);
          if (todo) {
            // Toggle the completed status of the todo
            todo.completed = !todo.completed;
            this.updateTodoById(todoId, todo);
          }
        });
      });

      // if todo is completed, add class to the list item
      const listItems = this.todoList.querySelectorAll(".listItem");
      listItems.forEach((listItem) => {
        const checkbox = listItem.querySelector(
          'input[name="completedCheckbox"]'
        );
        if (checkbox.checked) {
          listItem.classList.add("completed");
        } else {
          listItem.classList.remove("completed");
        }
      });
    }
  }

  addTodo(todo) {
    const randomId = Math.floor(Math.random() * 1000000);
    this.todoService.createTodo({
      id: randomId,
      ...todo,
    });
    // Ensure new todo is at the top
    const sortedTodos = this.todoService
      .getAllTodos()
      .sort((a, b) => dayjs(b.creationDate).diff(dayjs(a.creationDate)));
    this.todoService.updateAllTodos(sortedTodos);

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

  openDialogForEdit(todoId) {
    this.todoToEdit = this.todoService.getTodoById(parseInt(todoId));

    const titleInput = document.querySelector("#title");
    const descriptionInput = document.querySelector("#description");
    const dueDateInput = document.querySelector("#dueDate");
    const importanceInput = document.querySelector("#importance");

    titleInput.value = this.todoToEdit.title;
    descriptionInput.value = this.todoToEdit.description;
    dueDateInput.value = this.todoToEdit.dueDate;
    importanceInput.value = this.todoToEdit.importance;

    this.openDialog();
  }

  handleTodoFormSubmit(event) {
    event.preventDefault();

    const todo = {
      id: this.todoToEdit
        ? this.todoToEdit.id
        : Math.floor(Math.random() * 1000000),
      title: title.value,
      description: description.value,
      dueDate: dueDate.value,
      // Calculate the number of days left until the due date from the current date on.
      daysLeft: dayjs(dueDate.value).diff(dayjs(), "day"),
      creationDate: this.createdAt
        ? this.createdAt
        : dayjs().format("YYYY-MM-DD"),
      importance: importance.value,
      completed: false,
      createdAt: dayjs().format("YYYY-MM-DD"),
    };

    // If a todo is being edited, update it. Otherwise, add a new todo.
    if (this.todoToEdit) {
      todo.completed = this.todoToEdit.completed;
      todo.createdAt = this.todoToEdit.createdAt;
      this.updateTodoById(this.todoToEdit.id, todo);
      this.todoToEdit = null;
    } else {
      this.addTodo(todo);
    }

    // Reset the form.
    title.value = "";
    description.value = "";
    dueDate.value = "";
    importance.value = "";

    // Reset the todoToEdit.
    this.todoToEdit = null;

    // Close the dialog.
    document.getElementById("todoDialog").close();
  }
}

export const todoController = new TodoController();