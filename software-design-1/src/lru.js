import { strict as assert } from 'assert';

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export class LRUCache {
    constructor(capacity = 4) {
        assert(typeof capacity === 'number', 'LRUCache init capacity must be a number');
        assert(capacity >= 1, 'LRUCache init capacity must positive number >=1');

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
            return node.value;
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

        return node.value;
    }
}
