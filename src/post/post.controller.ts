import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './tdo/create-post.tdo';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller("post")
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({ status: 201, description: 'Post created successfully' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiBody({
        description: "Payload containing post information for posting",
        type: CreatePostDto,
        examples: {
            "application/json": {
                value: {
                    postDate: "2025-01-18T10:00:00.000Z",
                    message: "This is my message.",
                    mediaUrl: "https://thislucasme@gmail.com",
                    user: {
                        id: 1,
                        username: "thislucasme",
                        email: "email.com"
                    }
                }
            }
        }
    })
    create(@Body() createPostDto: CreatePostDto, @Req() req) {
        try {
            console.log(req.user)
            return this.postService.create(createPostDto, req.user);
        } catch (erro: any) {
            throw new InternalServerErrorException('Error while creating a post');
        }
    }

    @ApiOperation({ summary: 'Get all post for feed', description: "List all posts to be displayed in the feed"})
    @ApiResponse({ status: 200, description: 'Posts fetched successfully' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @Get('feed')
    findAll() {
        try {
            return this.postService.getAllPostFeed();
        } catch (erro: any) {
            throw new InternalServerErrorException('Erro while fetching posts');
        }

    }

    @ApiOperation({ summary: `Get all user's post` })
    @ApiResponse({ status: 200, description: 'Posts fetched successfully' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @Get()
    findAllUserPost(@Req() req) {
        try {
            return this.postService.findAllByUser(req.user.userId);
        } catch (erro: any) {
            throw new InternalServerErrorException('Erro while fetching posts');
        }

    }

    @ApiOperation({ summary: 'Delete a post' })
    @ApiResponse({ status: 200, description: 'Post deleted successfully' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiParam({
        name: "id",
        description: 'Post Id',
        type: Number,
        example: 1
    })
    @Delete()
    remove(@Query('id') id: string, @Req() req) {
        try {
            return this.postService.remove(+id, req.user.userId);
        } catch (erro: any) {
            throw new InternalServerErrorException('Erro while deleting post');
        }
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        try {
            if (!file) {
                throw new BadRequestException("No file received");
            }
            const filePath = `http://localhost:3001/uploads/${file.filename}`;
            return { url: filePath };
        } catch (erro: any) {
            throw new InternalServerErrorException('Erro while uploading file');
        }
    }
}
