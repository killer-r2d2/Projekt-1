export class TodoStorage {
  constructor() {
    this.todos = [
      {
        id: 1,
        title: "Learn JavaScript",
        description: "Learn JavaScript to build interactive websites",
        completed: false,
        createdAt: new Date(),
        dueDate: new Date(),
        importance: "high",
        creationDate: new Date(),
      },
      {
        id: 2,
        title: "Learn React",
        description: "Learn React to build modern UIs",
        completed: false,
        createdAt: new Date(),
        dueDate: new Date(),
        importance: "high",
        creationDate: new Date(),
      },
    ];
  }
}

export const todoStorage = new TodoStorage();
