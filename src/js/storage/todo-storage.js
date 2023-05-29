export class TodoStorage {
  constructor() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    } else {
      this.todos = [
        {
          id: 1, // unique id
          title: "Learn JavaScript", // todo title
          description: "Learn JavaScript to build interactive websites", // todo description
          dueDate: new Date().toISOString().split("T")[0], // todo due date
          importance: 1, // todo importance
          completed: false, // todo status
          createdAt: new Date().toISOString(), // todo creation date
          creationDate: new Date().toISOString(), // todo creation date
        },
        {
          id: 2, // unique id
          title: "Learn CSS", // todo title
          description: "Learn JavaScript to build interactive websites", // todo description
          dueDate: new Date().toISOString().split("T")[0], // todo due date
          importance: 1, // todo importance
          completed: false, // todo status
          createdAt: new Date().toISOString(), // todo creation date
          creationDate: new Date().toISOString(), // todo creation date
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
