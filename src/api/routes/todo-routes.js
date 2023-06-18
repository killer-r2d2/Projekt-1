import express from "express";
import todoController from "../controllers/todo-controller.js";
const router = express.Router();

router.get("/todos", todoController.getTodos);
router.get("/todos/:id", todoController.getTodoById);
router.post("/todos", todoController.createTodo);
router.put("/todos/:id", todoController.updateTodoById);
router.delete("/todos/:id", todoController.deleteTodoById);

export const todoRoutes = router;
