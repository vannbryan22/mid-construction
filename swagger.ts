import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "MID Construction",
    version: "1.0.0",
    description: "Simple project",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local server",
    },
  ],
};

// Options for the Swagger definition
const options = {
  swaggerDefinition,
  apis: ["./routes/*.ts", "./swaggerDocs/*.ts"], // Path to the API docs
};

// Initialize Swagger JSDoc
const swaggerSpec = swaggerJsdoc(options);

// Middleware to serve Swagger UI
export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
