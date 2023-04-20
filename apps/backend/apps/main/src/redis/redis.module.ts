import { CacheModule, Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Global()
@Module({
    imports: [
        CacheModule.register({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    store: redisStore,
                    host: configService.get('REDIS_HOST'),
                    ttl: configService.get('CACHE_TTL') || 600,
                    db: 0,
                };
            },
        }),
    ],
    providers: [RedisService],
    exports: [RedisService],

})
export class RedisModule { }
