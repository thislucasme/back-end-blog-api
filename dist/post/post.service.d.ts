import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
export declare class PostService {
    private postRepository;
    constructor(postRepository: Repository<Post>);
    create(product: Partial<Post>, user: any): Promise<{
        user: {
            id: any;
            username: any;
        };
        id?: number;
        postDate?: Date;
        message?: string;
        mediaUrl?: string;
    } & Post>;
    findAllByUser(userId: number): Promise<Post[]>;
    getAllPostFeed(): Promise<Post[]>;
    remove(id: number, userId: number): Promise<import("typeorm").DeleteResult>;
    handleFileUpload(file: Express.Multer.File): {
        message: string;
        filePath: string;
    };
}
