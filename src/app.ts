import express from 'express';
import { json, urlencoded } from 'body-parser';
import { setupRoutes } from './routes/index';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(json());
        this.express.use(urlencoded({ extended: true }));
    }

    private routes(): void {
        setupRoutes(this.express);
    }
}

export default new App().express;