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
exports.UserMySqlService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserMySqlService = class UserMySqlService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    findUsers() {
        return this.usersRepository.find();
    }
    findOneUser(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
    createUser(createUserDto) {
        return this.usersRepository.save(createUserDto);
    }
    updateUserData(userId, updateUserDtos) {
        return this.usersRepository.update(userId, updateUserDtos);
    }
    deleteUserData(userId) {
        return this.usersRepository.delete(userId);
    }
};
UserMySqlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserMySQL)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserMySqlService);
exports.UserMySqlService = UserMySqlService;
//# sourceMappingURL=user-my-sql.service.js.map