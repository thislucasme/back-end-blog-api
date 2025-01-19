import { PostService } from './post.service';
import { CreatePostDto } from './tdo/create-post.tdo';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto, req: any): Promise<{
        user: {
            id: any;
            username: any;
        };
        id?: number;
        postDate?: Date;
        message?: string;
        mediaUrl?: string;
    } & import("./entities/post.entity").Post>;
    findAll(): Promise<import("./entities/post.entity").Post[]>;
    findAllUserPost(req: any): Promise<import("./entities/post.entity").Post[]>;
    remove(id: string, req: any): Promise<import("typeorm").DeleteResult>;
    uploadFile(file: Express.Multer.File): {
        url: string;
    };
}
