import { RequestWithUser } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    logIn(request: RequestWithUser, response: Response): Promise<Response<any, Record<string, any>>>;
}
