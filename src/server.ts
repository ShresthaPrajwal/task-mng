import express from 'express';
import { config } from './config';
import { setupRoutes } from './routes';

class Server {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.setupRoutes();
    }

    private configureMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
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