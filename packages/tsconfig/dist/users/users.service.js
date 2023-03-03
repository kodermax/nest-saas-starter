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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const password_service_1 = require("../auth/services/password.service");
const prisma_service_1 = require("../prisma.service");
let UsersService = class UsersService {
    constructor(prisma, passwordService) {
        this.prisma = prisma;
        this.passwordService = passwordService;
    }
    updateUser(userId, newUserData) {
        return this.prisma.user.update({
            data: newUserData,
            where: {
                id: userId,
            },
        });
    }
    async changePassword(userId, userPassword, changePassword) {
        const passwordValid = await this.passwordService.validatePassword(changePassword.oldPassword, userPassword);
        if (!passwordValid) {
            throw new common_1.BadRequestException('Invalid password');
        }
        const hashedPassword = await this.passwordService.hashPassword(changePassword.newPassword);
        return this.prisma.user.update({
            data: {
                password: hashedPassword,
            },
            where: { id: userId },
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        password_service_1.PasswordService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map