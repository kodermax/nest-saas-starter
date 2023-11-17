import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }
    async del(key: string) {
        return this.cacheManager.del(key);
    }

    async get(key: string): Promise<string | null> {
        return this.cacheManager.get(key);
    }
    async set(key: string, value: any, options: any) {
        await this.cacheManager.set(key, value, options.ttl);
    }
}
