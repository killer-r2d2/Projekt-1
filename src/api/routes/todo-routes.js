import express from "express";
import todoController from "../controllers/todo-controller.js";

const router = express.Router();

router.get("/todos", todoController.getTodos);
router.get("/todos/:id", todoController.getTodoById);
router.post("/todos", todoController.createTodo);
router.put("/todos/:id", todoController.updateTodoById);
router.delete("/todos/:id", todoController.deleteTodoById);

// eslint-disable-next-line import/prefer-default-export
export const todoRoutes = router;
