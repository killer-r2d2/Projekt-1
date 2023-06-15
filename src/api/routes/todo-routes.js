import express from "express";
const router = express.Router();
import todoController from "../controllers/todo-controller.js";

router.get("/todos", todoController.getTodos);
router.get("/todos/:id", todoController.getTodoById);
// router.post("/", todoController.createTodo);
// router.delete("/:id", todoController.deleteTodoById);
// router.put("/:id", todoController.updateTodoById);

export const todoRoutes = router;
