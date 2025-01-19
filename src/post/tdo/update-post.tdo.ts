import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.tdo';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
