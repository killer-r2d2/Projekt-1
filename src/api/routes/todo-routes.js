import express from "express";
const router = express.Router();
import todoController from "../controllers/todo-controller.js";

router.get("/todos", todoController.getTodos);
router.get("/todos/:id", todoController.getTodoById);
router.post("/todos", todoController.createTodo);
router.put("/todos/:id", todoController.updateTodoById);
router.delete("/todos/:id", todoController.deleteTodoById);

export const todoRoutes = router;
