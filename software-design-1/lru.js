import {strict as assert} from 'assert';

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LRUCache {
    constructor(capacity = 4) {
        assert(typeof capacity === 'number', 'LRUCache init capacity must be a number');
        assert(capacity > 0, 'LRUCache init capacity must positive number');

        this.head = null;
        this.tail = null;
        this.size = 0;
        this.capacity = capacity;
        this.cache = {};
    }

    put(key, value) {
        assert(!this.cache.hasOwnProperty(key), `The key: ${key} is already present in the cache`);

        let newNode = new Node(key, value);

        //if we have an empty list
        if (this.size === 0) {
            this.head = newNode;
            this.tail = newNode;
            this.size++;
            this.cache[key] = newNode;
            return;
        }

        if (this.size === this.capacity) {
            //remove from cache
            delete this.cache[this.tail.key]

            //set new tail
            this.tail = this.tail.prev;
            this.tail.next = null;
            this.size--;
        }

        //add an item to the head
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
        this.size++;

        //add to cache
        this.cache[key] = newNode;

        assert(Object.keys(this.cache).length === this.size, 'Real LRUCache size does not match the calculated size');
    }

    get(key) {
        if (!this.cache[key]) {
            return undefined;
        }

        let node = this.cache[key];

        if (node === this.head) {
            return node;
        }

        let previous = node.prev;
        let next = node.next;

        if (node === this.tail) {
            previous.next = null;
            this.tail = previous;
        } else {
            previous.next = next;
            next.prev = previous;
        }

        this.head.prev = node;
        node.next = this.head;
        node.prev = null;
        this.head = node;

        return node;
    }
}

// let cache = new LRUCache();
// cache.put(1, 1);
// cache.put(2, 2);
// cache.put(3, 3);
// cache.put(4, 4);
// cache.put(5, 5);
// // вернет Node с value 2
// console.log('get 2:\n', cache.get(2));
// // вернет undefined
// console.log('get 1:\n', cache.get(1));
