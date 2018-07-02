export declare class Cache {
    private lockfile;
    constructor();
    fetch<T>(key: string): T | undefined;
    push(key: string, data: any): void;
}
//# sourceMappingURL=cache.d.ts.map