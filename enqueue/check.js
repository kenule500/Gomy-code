

// 1. Implement a Queue

class ArrayQueue {
    constructor(size) {
        this.queue = new Array(size);
        this.capacity = size;
        this.head = 0;
        this.tail = 0;
        this.count = 0;
    }

    enqueue(element) {
        if (this.count === this.capacity) return "Queue Overflow";
        this.queue[this.tail] = element;
        this.tail = (this.tail + 1) % this.capacity; // Circular wrap
        this.count++;
    }

    dequeue() {
        if (this.isEmpty()) return "Queue Underflow";
        const element = this.queue[this.head];
        this.queue[this.head] = null;
        this.head = (this.head + 1) % this.capacity;
        this.count--;
        return element;
    }

    peek() {
        return this.isEmpty() ? "Queue is empty" : this.queue[this.head];
    }

    isEmpty() {
        return this.count === 0;
    }
}


// Linked List-based Queue (Dynamic Size)

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedListQueue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.length = 0;
    }

    enqueue(element) {
        const newNode = new Node(element);
        if (this.isEmpty()) {
            this.front = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this.length++;
    }

    dequeue() {
        if (this.isEmpty()) return "Queue is empty";
        const value = this.front.value;
        this.front = this.front.next;
        this.length--;
        if (!this.front) this.rear = null;
        return value;
    }

    peek() {
        return this.isEmpty() ? "Queue is empty" : this.front.value;
    }

    isEmpty() {
        return this.length === 0;
    }
}



// 2. Implement a Priority Queue

class MinHeapPQ {
    constructor() {
        this.heap = [];
    }

    insert(element, priority) {
        this.heap.push({ element, priority });
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].priority >= this.heap[parentIndex].priority) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    extractMin() {
        if (this.isEmpty()) return "Priority Queue is empty";
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.sinkDown();
        }
        return min;
    }

    sinkDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            let leftChild = 2 * index + 1;
            let rightChild = 2 * index + 2;
            let swap = null;

            if (leftChild < length) {
                if (this.heap[leftChild].priority < this.heap[index].priority) swap = leftChild;
            }
            if (rightChild < length) {
                if (
                    (swap === null && this.heap[rightChild].priority < this.heap[index].priority) ||
                    (swap !== null && this.heap[rightChild].priority < this.heap[leftChild].priority)
                ) swap = rightChild;
            }

            if (swap === null) break;
            [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
            index = swap;
        }
    }

    isEmpty() { return this.heap.length === 0; }
}

// Ordered Array-based Priority Queue

class OrderedArrayPQ {
    constructor() {
        this.queue = [];
    }

    insert(element, priority) {
        const item = { element, priority };
        let added = false;
        for (let i = 0; i < this.queue.length; i++) {
            if (item.priority < this.queue[i].priority) {
                this.queue.splice(i, 0, item);
                added = true;
                break;
            }
        }
        if (!added) this.queue.push(item);
    }

    extractMin() {
        return this.isEmpty() ? "Priority Queue is empty" : this.queue.shift();
    }

    isEmpty() { return this.queue.length === 0; }
}