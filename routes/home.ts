import * as express from "express";
import { Request, Response, NextFunction } from "express";
import {
  registerUser,
  signInUser,
  refreshToken,
} from "@controllers/userController";
var router = express.Router();

router.get("/", function (_req: Request, res: Response, _next: NextFunction) {
  res.send("HOME");
});

router.post("/register", registerUser);
router.post("/signin", signInUser);
router.post("/refresh", refreshToken);

export default router;
