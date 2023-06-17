// import { todoStorage } from "../storage/todo-storage-old.js";
export class TodoService {
  constructor() {
    this.baseUrl = "http://127.0.0.1:5000/api/todos";
  }
  async getAllTodos(filter = {}) {
    try {
      const response = await fetch(
        `${this.baseUrl}?filter=${encodeURIComponent(JSON.stringify(filter))}`
      );
      const todos = await response.json();
      return todos;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getTodoById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      const todo = await response.json();
      return todo;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async createTodo(todo) {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const createdTodo = await response.json();
      return createdTodo;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async deleteTodoById(id) {
    try {
      // console.log("deleteTodoById: ", id);
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      });
      // Check the response from the server
      if (!response.ok) {
        throw new Error(
          `Failed to delete todo with id ${id}: ${response.status}`
        );
      }
      const deletedTodo = await response.json();
      return deletedTodo;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async updateTodoById(id, updatedTodo) {
    console.log("updateTodoById: ", id, updatedTodo);
    console.log("updateTodoById: ", id, updatedTodo);

    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      const updatedTodoFromServer = await response.json();
      return updatedTodoFromServer;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export const todoService = new TodoService();
