require("dotenv").config();
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { initializeDatabase } from "./utils/database";
import validateEnv from "./utils/validateEnv";
dotenv.config();

import * as routes from "./routes";
import path from "path";
import { setupSwagger } from "./swagger";

validateEnv();

const PORT = process.env.PORT || 3000;

//intializing the express app
const app = express();

//using the dependancies
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

initializeDatabase();

routes.register(app);
setupSwagger(app);
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
