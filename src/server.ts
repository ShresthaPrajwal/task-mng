import express from "express";
import cookieParser from "cookie-parser";
import config from "./config";
import setupRoutes from "./routes";
import { setupSwagger } from "./config/swagger";

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
    setupSwagger(this.app); // Add Swagger setup
  }

  private configureMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser()); // Add this line to parse cookies
  }

  private setupRoutes() {
    setupRoutes(this.app);
  }

  public start() {
    const port = config.port || 3000;
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

const server = new Server();
server.start();
