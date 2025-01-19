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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./entities/post.entity");
const typeorm_2 = require("typeorm");
let PostService = class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    create(product, user) {
        try {
            return this.postRepository.save({ ...product, user: { id: user.userId, username: user.username } });
        }
        catch (error) {
            console.error(error);
            throw new Error('Error while creating a post');
        }
    }
    findAllByUser(userId) {
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
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Error while fetching products');
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
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Error while fetching posts');
        }
    }
    remove(id, userId) {
        try {
            return this.postRepository.delete({ id, user: { id: userId } });
        }
        catch (error) {
            console.error(error);
            throw new Error('Error while deleting post');
        }
    }
    handleFileUpload(file) {
        try {
            return { message: 'File uploaded successfully', filePath: file.path };
        }
        catch (error) {
            console.error(error);
            throw new Error('Error while updating products');
        }
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map