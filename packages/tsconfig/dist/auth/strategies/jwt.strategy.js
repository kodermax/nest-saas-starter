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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const auth_service_1 = require("../services/auth.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    return request?.cookies?.Authentication;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        });
        this.configService = configService;
        this.authService = authService;
    }
    async validate(payload) {
        const user = await this.authService.validateUser(payload.userId);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, auth_service_1.AuthService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map