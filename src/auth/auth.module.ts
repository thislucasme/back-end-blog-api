import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from 'src/user/entities/user.entity';

@Module({
    imports:[
      PassportModule,
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
        secret: "mysecretkey",
        signOptions: { expiresIn: '1h' }, 
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalAuthGuard]
  })
export class AuthModule { }
