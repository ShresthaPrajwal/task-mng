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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Specify that it's a JWT token
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply bearerAuth globally
      },
    ],
  },
  apis: [
    "./src/modules/user/UserController.ts", // User APIs
    "./src/modules/task/TaskController.ts", // Task APIs
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at http://localhost:3000/api-docs");
};
