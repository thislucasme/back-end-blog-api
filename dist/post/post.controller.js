"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const swagger_1 = require("@nestjs/swagger");
const create_post_tdo_1 = require("./tdo/create-post.tdo");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    create(createPostDto, req) {
        try {
            console.log(req.user);
            return this.postService.create(createPostDto, req.user);
        }
        catch (erro) {
            throw new common_1.InternalServerErrorException('Error while creating a post');
        }
    }
    findAll() {
        try {
            return this.postService.getAllPostFeed();
        }
        catch (erro) {
            throw new common_1.InternalServerErrorException('Erro while fetching posts');
        }
    }
    findAllUserPost(req) {
        try {
            return this.postService.findAllByUser(req.user.userId);
        }
        catch (erro) {
            throw new common_1.InternalServerErrorException('Erro while fetching posts');
        }
    }
    remove(id, req) {
        try {
            return this.postService.remove(+id, req.user.userId);
        }
        catch (erro) {
            throw new common_1.InternalServerErrorException('Erro while deleting post');
        }
    }
    uploadFile(file) {
        try {
            if (!file) {
                throw new common_1.BadRequestException("No file received");
            }
            const filePath = `http://localhost:3001/uploads/${file.filename}`;
            return { url: filePath };
        }
        catch (erro) {
            throw new common_1.InternalServerErrorException('Erro while uploading file');
        }
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Not authorized' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    (0, swagger_1.ApiBody)({
        description: "Payload containing post information for posting",
        type: create_post_tdo_1.CreatePostDto,
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
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_tdo_1.CreatePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all post for feed', description: "List all posts to be displayed in the feed" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Posts fetched successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Not authorized' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    (0, common_1.Get)('feed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Get all user's post` }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Posts fetched successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Not authorized' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findAllUserPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Not authorized' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: 'Post Id',
        type: Number,
        example: 1
    }),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "uploadFile", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)("post"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map