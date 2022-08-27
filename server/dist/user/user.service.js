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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findUsers(query) {
        const page = query.page || 0;
        const itemsPerPage = query.limit || 10;
        const totalPosts = await this.userModel.find().count();
        let pageCount = totalPosts / itemsPerPage;
        let NumberBeforeDecimalPoint = Math.floor(pageCount);
        const NumberAfterDecimalPoint = (pageCount - NumberBeforeDecimalPoint) * 10;
        if (NumberAfterDecimalPoint > 0) {
            NumberBeforeDecimalPoint += 1;
        }
        pageCount = NumberBeforeDecimalPoint;
        let skip = (page - 1) * itemsPerPage;
        skip = skip > -1 ? skip : 0;
        const users = await this.userModel
            .find()
            .sort({ _id: -1 })
            .limit(itemsPerPage)
            .skip(skip)
            .exec();
        return {
            users: users,
            total: totalPosts,
            pages: pageCount,
        };
    }
    async findOneUser(_id) {
        return await this.userModel.findById(_id).exec();
    }
    async findByEmail(email) {
        return await this.userModel.findOne({ email }).exec();
    }
    async createUser(createUserDto) {
        try {
            const createdUser = await new this.userModel(createUserDto).save();
            return createdUser;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async updateUserData(_id, updateUserDtos) {
        try {
            const updatedUser = await this.userModel
                .findByIdAndUpdate(_id, updateUserDtos)
                .exec();
            if (updatedUser) {
                return updatedUser;
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async deleteUserData(_id) {
        const deletedUser = await this.userModel.findByIdAndDelete(_id).exec();
        return deletedUser;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map