import { User } from '../../user/entities/user.entity';
export declare class Post {
    id: number;
    postDate: Date;
    message: string;
    user: User;
    mediaUrl?: string;
}
