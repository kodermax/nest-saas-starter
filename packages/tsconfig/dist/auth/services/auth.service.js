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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../prisma.service");
const password_service_1 = require("./password.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService, prisma, passwordService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.prisma = prisma;
        this.passwordService = passwordService;
    }
    getCookieWithJwtAccessToken(userId) {
        const payload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`,
        });
        return `Authentication=${token}; HttpOnly; Domain=${this.getCookieDomain()}; ${this.configService.get('SECURE_COOKIE') === 'true' ?
            'SameSite=None;' : ''} ${this.configService.get('SECURE_COOKIE') === 'true' ? 'Secure;' : ''} Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
    }
    getCookieWithJwtRefreshToken(userId) {
        const payload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`,
        });
        const cookie = `Refresh=${token}; HttpOnly; Domain=${this.getCookieDomain()}; ${this.configService.get('SECURE_COOKIE') === 'true'
            ? 'SameSite=None;' : ''} ${this.configService.get('SECURE_COOKIE') === 'true' ? 'Secure;' : ''} Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
        return {
            cookie,
            token,
        };
    }
    async validateUserPassword(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException(`No user found for email: ${email}`);
        }
        const passwordValid = await this.passwordService.validatePassword(password, user.password);
        if (!passwordValid) {
            throw new common_1.BadRequestException('Invalid password');
        }
        return true;
    }
    validateUser(userId) {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }
    async login(user) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    getCookieDomain() {
        switch (this.configService.get('ENVIRONMENT')) {
            case 'production':
                return this.configService.get('AUTH_COOKIE_DOMAIN');
            case 'staging':
                return this.configService.get('AUTH_COOKIE_DOMAIN');
            default:
                return 'localhost';
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        prisma_service_1.PrismaService,
        password_service_1.PasswordService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map