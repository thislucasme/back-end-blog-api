import { MulterModule } from '@nestjs/platform-express';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { diskStorage } from 'multer';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
              destination: './uploads',
              filename: (req, file, cb) => {
                const filename = `${Date.now()}-${file.originalname}`;
                cb(null, filename);
              },
            }),
          }),
          AuthModule,
          TypeOrmModule.forFeature([Post]),
    ],
    controllers: [
        PostController,],
    providers: [
        PostService,],
})
export class PostModule { }
