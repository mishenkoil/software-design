import { LRUCache } from "./lru.js";

test('Capacity init value', () => {
    expect(() => (new LRUCache('aboba'))).toThrow('LRUCache init capacity must be a number');
    expect(() => (new LRUCache(-1))).toThrow('LRUCache init capacity must positive number >=1');
    expect(() => (new LRUCache(999))).not.toThrow();
});

test('Overwriting', () => {
    let cache1 = new LRUCache();
    cache1.put(1, 1);
    cache1.put(2, 2);
    cache1.put(3, 3);
    cache1.put(4, 4);
    cache1.put(5, 5);
    expect(cache1.get(1)).toBe(undefined);

    let cache2 = new LRUCache(6);
    cache2.put(1, 1);
    cache2.put(2, 2);
    cache2.put(3, 3);
    cache2.put(4, 4);
    cache2.put(5, 5);
    expect(cache2.get(1)).toBe(1);
});

test('Default workflow', () => {
    let cache = new LRUCache(2);
    cache.put(1, 2);
    cache.put(2, 3);
    cache.put(6, 7);
    cache.put(1, 5);
    cache.put(4, 5);
    expect(cache.get(1)).toBe(5);
    cache.put(6, 7);
    expect(cache.get(4)).toBe(undefined);
    expect(cache.get(6)).toBe(7);
});