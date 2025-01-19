import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
    @ApiProperty({
        description: 'Post date',
        example: '2025-01-18T15:30:00Z',
        required: true,
    })
    @IsDate()
    postDate: Date;

    @ApiProperty({
        description: 'Message of the post, can include text and media links (images or videos)',
        example: 'Hello! Today I am flying to USA!',
        required: true,
    })
    @IsString()
    message: string;

    @ApiProperty({
        description: 'Author of the message',
        example: 'Lucas Dias',
        required: true,
    })
    @IsString()
    author: string;

    @ApiProperty({
        description: 'Media URL (image or video)',
        example: 'https://example.com/image1.jpg',
        required: false,
    })
    @IsOptional()
    mediaUrl?: string;
}
