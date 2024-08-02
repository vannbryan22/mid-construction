import { authenticateToken } from "@middlewares/authMiddleware";
import {
  deleteUser,
  getCurrentUserFromToken,
  updateUser,
} from "@/controllers/userController";
var express = require("express");
var router = express.Router();

router.get("/", authenticateToken, getCurrentUserFromToken);
router.put("/", authenticateToken, updateUser);
router.delete("/", authenticateToken, deleteUser);

export default router;
