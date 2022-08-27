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
exports.UserMySqlController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dtos/create-user.dto");
const update_user_dto_1 = require("./dtos/update-user.dto");
const user_my_sql_service_1 = require("./user-my-sql.service");
let UserMySqlController = class UserMySqlController {
    constructor(userMySqlService) {
        this.userMySqlService = userMySqlService;
    }
    getUsers() {
        return this.userMySqlService.findUsers();
    }
    findUser(userId) {
        return this.userMySqlService.findOneUser(userId);
    }
    addUser(createUserDto) {
        return this.userMySqlService.createUser(createUserDto);
    }
    updateUser(userId, updateUserDto) {
        return this.userMySqlService.updateUserData(userId, updateUserDto);
    }
    deleteUser(userId) {
        return this.userMySqlService.deleteUserData(userId);
    }
};
__decorate([
    (0, common_1.Get)('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserMySqlController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/find/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserMySqlController.prototype, "findUser", null);
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserMySqlController.prototype, "addUser", null);
__decorate([
    (0, common_1.Patch)('/update/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserMySqlController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/delete/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserMySqlController.prototype, "deleteUser", null);
UserMySqlController = __decorate([
    (0, common_1.Controller)('user-my-sql'),
    __metadata("design:paramtypes", [user_my_sql_service_1.UserMySqlService])
], UserMySqlController);
exports.UserMySqlController = UserMySqlController;
//# sourceMappingURL=user-my-sql.controller.js.map