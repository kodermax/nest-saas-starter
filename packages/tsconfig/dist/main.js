"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const prismaService = app.get(prisma_service_1.PrismaService);
    await prismaService.enableShutdownHooks(app);
    const configService = app.get(config_1.ConfigService);
    const nestConfig = configService.get('nest');
    const corsConfig = configService.get('cors');
    const swaggerConfig = configService.get('swagger');
    if (swaggerConfig.enabled) {
        const options = new swagger_1.DocumentBuilder()
            .setTitle(swaggerConfig.title || 'Nestjs')
            .setDescription(swaggerConfig.description || 'The nestjs API description')
            .setVersion(swaggerConfig.version || '1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
    }
    if (corsConfig.enabled) {
        app.enableCors();
    }
    await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map