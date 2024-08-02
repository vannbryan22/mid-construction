import * as express from "express";
import { Request, Response, NextFunction } from "express";
var router = express.Router();

router.get("/", function (_req: Request, res: Response, _next: NextFunction) {
  res.send({
    test: "HOME",
  });
});

export default router;
