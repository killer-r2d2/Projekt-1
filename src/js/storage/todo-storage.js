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
          completed: false, // todo status
          createdAt: new Date().toISOString(), // todo creation date
        },
        {
          id: 2,
          title: "Learn React",
          description: "Learn React to build modern UIs",
          completed: false,
          createdAt: new Date().toISOString(),
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
}

export const todoStorage = new TodoStorage();
