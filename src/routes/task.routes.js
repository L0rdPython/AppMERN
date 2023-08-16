import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = Router();

// Obtener una lista de tareas
router.get("/tasks", authRequired, getTasks);

// Obtener detalles de una tarea por su ID
router.get("/tasks/:id", authRequired, getTaskById);

// Crear una nueva tarea
router.post("/tasks", authRequired, createTask);

// Eliminar una tarea por su ID
router.delete("/tasks/:id", authRequired, deleteTask);

// Actualizar detalles de una tarea por su ID
router.put("/tasks/:id", authRequired, updateTask);

export default router;
