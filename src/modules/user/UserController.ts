import { Request, Response } from 'express';
import BaseController from '../../controllers/BaseController';
import UserService from './UserService';

class UserController extends BaseController {
    private userService: UserService;

    constructor() {
        super();
        this.userService = new UserService();
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            const newUser = await this.userService.createUser(userData);
            this.sendResponse(res, 201, newUser);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await this.userService.validateUser(email, password);
            this.sendResponse(res, 200, user);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}

export default UserController;