import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
export declare class AuthService {
    private jwtService;
    private userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    register(data: {
        username: string;
        email: string;
        password: string;
    }): Promise<User>;
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
}
