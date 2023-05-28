export class TodoStorage {
  constructor() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
      console.log("Retrieved todos:", this.todos);
    } else {
      this.todos = [
        {
          id: 198498494984,
          title: "Learn JavaScript",
          description: "Learn JavaScript to build interactive websites",
          completed: false,
          createdAt: new Date(),
          dueDate: new Date(),
          importance: "high",
          creationDate: new Date(),
        },
        {
          id: 24181848,
          title: "Learn React",
          description: "Learn React to build modern UIs",
          completed: false,
          createdAt: new Date(),
          dueDate: new Date(),
          importance: "high",
          creationDate: new Date(),
        },
        {
          id: 25919,
          title: "Learn CSS",
          description: "Learn React to build modern UIs",
          completed: false,
          createdAt: new Date(),
          dueDate: new Date(),
          importance: "high",
          creationDate: new Date(),
        },
      ];
      this.saveTodos();
    }
  }
  saveTodos() {
    console.log("Saving todos:", this.todos);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  addTodo(todo) {
    console.log("Adding todo", todo);
    this.todos.push(todo);
    this.saveTodos();
  }
}

export const todoStorage = new TodoStorage();
