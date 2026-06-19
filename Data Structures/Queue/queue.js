import { BucketedDeque } from "./Deque.js";
class Queue {
  #data;
  #size;

  constructor() {
    this.#data = new BucketedDeque();
  }

  enqueue(value) {
    this.#data.push_back(value);
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.#data.pop_front();
  }

  front() {
    return this.#data.front();
  }

  back() {
    return this.#data.back();
  }

  size() {
    return this.#data.size();
  }

  isEmpty() {
    return this.#data.isEmpty();
  }

  clear() {
    this.#data.clear();
  }

  toArray() {
    return this.#data.toArray();
  }

  *[Symbol.iterator]() {
    yield* this.#data;
  }
}

const q = new Queue();

console.log("=== Empty Queue ===");
console.log(q.isEmpty());
console.log(q.size());
console.log(q.front());
console.log(q.back());

console.log("\n=== Enqueue ===");
q.enqueue(10);
q.enqueue(20);
q.enqueue(30);
console.log(q.front());
console.log(q.back());
console.log(q.size());
console.log(q.toArray());

console.log("\n=== Dequeue ===");
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.front());
console.log(q.back());
console.log(q.size());

console.log("\n=== Iterator ===");
q.enqueue(40);
q.enqueue(50);
for (const item of q) {
  console.log(item);
}

console.log("\n=== Clear ===");
q.clear();
console.log(q.isEmpty());
console.log(q.size());

console.log("\n=== Error Test ===");
try {
  q.dequeue();
} catch (e) {
  console.log(e.message);
}
