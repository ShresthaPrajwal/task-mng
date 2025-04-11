import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js Express Clean Architecture API",
      version: "1.0.0",
      description: "API documentation for the Node.js Express application",
    },
    servers: [
      {
        url: "http://localhost:3000", // Update this to match your server URL
      },
    ],
  },
  apis: ["./src/modules/user/UserController.ts"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at http://localhost:3000/api-docs");
};
