import { NextFunction, Request, Response } from "express";
var express = require("express");
var router = express.Router();

router.get("/", function (req: Request, res: Response, _next: NextFunction) {
  res.send("respond with a resource");
});

router.get("/test", function (req: Request, res: Response, next: NextFunction) {
  res.send("TEST USER");
});

export default router;
