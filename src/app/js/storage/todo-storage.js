// start using nedb
import Datastore from "nedb";
export class TodoStorage {
  constructor() {
    this.db = new Datastore({
      filename: "./src/data/database.db",
      autoload: true,
    });

    // initial data
    this.db.find({}, (err, docs) => {
      if (docs.length === 0) {
        const initialTodos = [
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
        ];
        this.db.insert(initialTodos);
      }
    });
  }
  // add todo
  addTodo(todo, callback) {
    this.db.insert(todo, callback);
  }
  // get all todos
  getAllTodos(callback) {
    this.db.find({}, callback);
  }
  // delete todo
  deleteTodoById(id, callback) {
    this.db.remove({ _id: id }, {}, callback);
  }
  // update todo
  updateTodoById(id, updatedTodo, callback) {
    this.db.update({ _id: id }, updatedTodo, {}, callback);
  }
}

export const todoStorage = new TodoStorage();
