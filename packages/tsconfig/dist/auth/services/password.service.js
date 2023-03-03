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
exports.PasswordService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcrypt_1 = require("bcrypt");
let PasswordService = class PasswordService {
    constructor(configService) {
        this.configService = configService;
    }
    get bcryptSaltRounds() {
        const securityConfig = this.configService.get('security');
        const saltOrRounds = securityConfig.bcryptSaltOrRound;
        return Number.isInteger(Number(saltOrRounds))
            ? Number(saltOrRounds)
            : saltOrRounds;
    }
    validatePassword(password, hashedPassword) {
        return (0, bcrypt_1.compare)(password, hashedPassword);
    }
    hashPassword(password) {
        return (0, bcrypt_1.hash)(password, this.bcryptSaltRounds);
    }
};
PasswordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PasswordService);
exports.PasswordService = PasswordService;
//# sourceMappingURL=password.service.js.map