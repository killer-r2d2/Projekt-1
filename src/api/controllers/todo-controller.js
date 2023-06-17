import todoService from "../services/todo-service.js";

const getTodos = async (req, res) => {
  const todos = await todoService.get({});
  res.json(todos);
};

const getTodoById = async (req, res) => {
  const id = req.params.id;
  const todo = await todoService.getById(id);
  res.json(todo);
};

const createTodo = async (req, res) => {
  const todo = req.body;
  const newTodo = await todoService.create(todo);
  res.json(newTodo);
};

const deleteTodoById = async (req, res) => {
  const id = req.params.id;
  const deletedTodo = await todoService.deleteById(id);
  res.json(deletedTodo);
};

const updateTodoById = async (req, res) => {
  const id = req.params.id;
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
