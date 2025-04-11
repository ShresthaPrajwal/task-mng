import { Express } from 'express';
import userRoutes from '../modules/user/UserRoutes';

const setupRoutes = (app: Express) => {
    app.use('/api/users', userRoutes());
    // Add other routes here as needed
};

export default setupRoutes;