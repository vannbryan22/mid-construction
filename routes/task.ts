import { authenticateToken } from "@middlewares/authMiddleware";
import {
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
} from "@/controllers/taskController";
import { Router } from "express";
var router = Router();

router.post("/", authenticateToken, createTask);
router.get("/:id", authenticateToken, getTaskById);
router.put("/:id", authenticateToken, updateTask);
router.delete("/:id", authenticateToken, deleteTask);

export default router;
