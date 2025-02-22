import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    PostModule,
    UserModule, ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'test',
      autoLoadEntities: true,
      synchronize: true,
    }), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
