import type { Config } from './config.interface';

const config: Config = {
    siteUrl: 'https://nest-starter-admin.vercel.app',
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
    graphql: {
        playgroundEnabled: true,
        debug: true,
        schemaDestination: './src/schema.graphql',
        sortSchema: true,
    },
    security: {
        expiresIn: '2m',
        refreshIn: '7d',
        bcryptSaltOrRound: 10,
    },
    database: {
        url: 'localhost'
    }
};

export default (): Config => config;