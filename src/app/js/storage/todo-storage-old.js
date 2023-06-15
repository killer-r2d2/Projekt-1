export class TodoStorage {
  constructor() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    } else {
      this.todos = [
        {
          id: 1, // unique id
          title: "a", // todo title
          description: "Learn JavaScript to build interactive websites", // todo description
          dueDate: "2023-08-25", // todo due date
          daysLeft: "5",
          importance: 1, // todo importance
          completed: false, // todo status
          createdAt: "2023-04-03", // todo creation date
          creationDate: "2023-04-03", // todo creation date
        },
        {
          id: 2, // unique id
          title: "b", // todo title
          description: "Learn JavaScript to build interactive websites", // todo description
          dueDate: "2023-12-03", // todo due date
          daysLeft: "88",
          importance: 1, // todo importance
          completed: false, // todo status
          createdAt: "2023-02-03", // todo creation date
          creationDate: "2023-02-03", // todo creation date
        },
      ];
      this.saveTodos();
    }
  }
  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  addTodo(todo) {
    this.todos.push(todo);
    this.saveTodos();
  }
  deleteTodoById(id) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === parseInt(id));
    this.todos.splice(todoIndex, 1);
    this.saveTodos();
  }
  updateTodoById(id, updatedTodo) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === parseInt(id));
    if (todoIndex !== -1) {
      this.todos[todoIndex] = updatedTodo;
      this.saveTodos();
    }
  }
}

export const todoStorage = new TodoStorage();
