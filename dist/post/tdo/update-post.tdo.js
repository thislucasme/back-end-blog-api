"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_post_tdo_1 = require("./create-post.tdo");
class UpdatePostDto extends (0, swagger_1.PartialType)(create_post_tdo_1.CreatePostDto) {
}
exports.UpdatePostDto = UpdatePostDto;
//# sourceMappingURL=update-post.tdo.js.map