import { Cache } from 'cache-manager';
export declare class RedisService {
    private readonly cacheManager;
    constructor(cacheManager: Cache);
    del(key: string): Promise<void>;
    get(key: string): Promise<string | null>;
    set(key: string, value: any, options: any): Promise<void>;
}
