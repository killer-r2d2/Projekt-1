import todoService from "../services/todo-service.js";

const getTodos = async (req, res) => {
  // Parse filter and sort parameters from query string
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const sort = req.query.sort ? JSON.parse(req.query.sort) : {};

  const todos = await todoService.get(filter, sort);
  res.json(todos);
};

const getTodoById = async (req, res) => {
  const { id } = req.params;
  const todo = await todoService.getById(id);
  res.json(todo);
};

const createTodo = async (req, res) => {
  const todo = req.body;
  const newTodo = await todoService.create(todo);
  res.json(newTodo);
};

const deleteTodoById = async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await todoService.deleteById(id);
  res.json(deletedTodo);
};

const updateTodoById = async (req, res) => {
  const { id } = req.params;
  const todo = req.body;
  const updatedTodo = await todoService.update(id, todo);
  res.json(updatedTodo);
};

export default {
  getTodos,
  getTodoById,
  createTodo,
  deleteTodoById,
  updateTodoById,
};
