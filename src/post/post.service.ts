import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) { }

  create(product: Partial<Post>, user: any) {
    try {
      return this.postRepository.save({ ...product, user: { id: user.userId, username: user.username } });
    } catch (error: any) {
      console.error(error)
      throw new Error('Error while creating a post')
    }
  }

  findAllByUser(userId: number) {
    try {
      return this.postRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
        select: {
          id: true,
          postDate: true,
          message: true,
          mediaUrl: true,
          user: {
            id: true,
            username: true,
          },
        },
        order: {
          postDate: 'DESC', 
        }
      });
    } catch (error: any) {
      console.error(error)
      throw new Error('Error while fetching products')
    }
  }

  getAllPostFeed() {
    try {
      return this.postRepository.find({
        relations: ['user'], 
        select: {
          id: true,
          postDate: true,
          message: true,
          mediaUrl: true,
          user: {
            id: true,
            username: true,
          },
        },
        order: {
          postDate: 'DESC', 
        }
      });
    } catch (error: any) {
      console.error(error);
      throw new Error('Error while fetching posts');
    }
  }
  

  remove(id: number, userId: number) {
    try {
      return this.postRepository.delete({ id, user: { id: userId } });
    } catch (error: any) {
      console.error(error)
      throw new Error('Error while deleting post')
    }
  }

  handleFileUpload(file: Express.Multer.File) {
    try {
      return { message: 'File uploaded successfully', filePath: file.path };
    } catch (error: any) {
      console.error(error)
      throw new Error('Error while updating products')
    }
  }
}
