import type { Config } from './config.interface';

const config: Config = {
    siteUrl: 'http://localhost:3000',
    production: false,
    mail: {
        senderEmail: 'kodermax@yandex.ru',
        senderName: 'Info'
    },
    nest: {
        port: 8000,
    },
    cors: {
        enabled: true,
    },
    swagger: {
        enabled: true,
        title: 'NestJS Starter',
        description: 'The nestjs API description',
        version: '1.5',
        path: 'api',
    },
    security: {
        expiresIn: 3600, // 1h
        refreshIn: 604_800, // 7d
        bcryptSaltOrRound: 10,
    },
    database: {
        url: 'localhost'
    },
    throttle: {
        limit: 10,
        ttl: 60,
        ignoreUserAgents: [/googlebot/gi, /bingbot/gi],
    },
};

export default (): Config => config;