import { ThrottlerModuleOptions } from "@nestjs/throttler";

export interface Config {
    siteUrl: string
    database: DatabaseConfig;
    nest: NestConfig;
    cors: CorsConfig;
    mail: MailConfig;
    swagger: SwaggerConfig;
    security: SecurityConfig;
    throttle: ThrottlerModuleOptions;
    production: boolean;
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
    enabled: boolean;
    title: string;
    description: string;
    version: string;
    path: string;
}


export interface SecurityConfig {
    expiresIn: number;
    refreshIn: number;
    bcryptSaltOrRound: string | number;
}

export interface MailConfig {
    senderName: string;
    senderEmail: string;
}