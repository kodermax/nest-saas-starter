import { ThrottlerModuleOptions } from "@nestjs/throttler";

export interface Config {
    cors: CorsConfig;
    database: DatabaseConfig;
    mail: MailConfig;
    nest: NestConfig;
    production: boolean;
    security: SecurityConfig;
    siteUrl: string
    swagger: SwaggerConfig;
    throttle: ThrottlerModuleOptions;
}

export interface NestConfig {
    port: number;
}

interface DatabaseConfig {
    url: string;
}

export interface CorsConfig {
    enabled: boolean;
}

export interface SwaggerConfig {
    description: string;
    enabled: boolean;
    path: string;
    title: string;
    version: string;
}


export interface SecurityConfig {
    bcryptSaltOrRound: string | number;
    expiresIn: number;
    refreshIn: number;
}

export interface MailConfig {
    senderEmail: string;
    senderName: string;
}