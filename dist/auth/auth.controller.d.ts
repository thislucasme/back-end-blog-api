import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(data: {
        username: string;
        email: string;
        password: string;
    }): Promise<import("../user/entities/user.entity").User>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
    }>;
    me(req: any): any;
}
