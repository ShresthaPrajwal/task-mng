export class BaseController {
    protected sendResponse(res: any, data: any, statusCode: number = 200) {
        res.status(statusCode).json({
            success: true,
            data,
        });
    }

    protected sendError(res: any, message: string, statusCode: number = 400) {
        res.status(statusCode).json({
            success: false,
            message,
        });
    }
}