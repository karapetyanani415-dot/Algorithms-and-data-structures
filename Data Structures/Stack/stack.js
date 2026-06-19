import { BucketedDeque } from "./Deque.js";

class Stack {
  #data;
  #size;

  constructor() {
    this.#data = new BucketedDeque();
  }

  push(value) {
    this.#data.push_back(value);
  }

  pop() {
    if (this.isEmpty()) throw new Error("Stack is empty");
    return this.#data.pop_back();
  }

  peek() {
    return this.#data.back();
  }

  size() {
    return this.#data.size();
  }

  isEmpty() {
    return this.#data.size() === 0;
  }

  clear() {
    this.#data.clear();
  }

  toArray() {
    return this.#data.toArray();
  }

  *[Symbol.iterator]() {
    for (let i = this.size() - 1; i >= 0; i--) {
      yield this.#data.at(i);
    }
  }
}

const s = new Stack();

console.log("=== Empty Stack ===");
console.log(s.isEmpty());
console.log(s.size());
console.log(s.peek());

console.log("\n=== Push ===");
s.push(10);
s.push(20);
s.push(30);
console.log(s.peek());
console.log(s.size());
console.log(s.toArray());

console.log("\n=== Pop ===");
console.log(s.pop());
console.log(s.pop());
console.log(s.peek());
console.log(s.size());

console.log("\n=== Iterator (top → bottom) ===");
s.push(40);
s.push(50);
for (const item of s) {
  console.log(item);
}

console.log("\n=== Clear ===");
s.clear();
console.log(s.isEmpty());
console.log(s.size());

console.log("\n=== Error Test ===");
try {
  s.pop();
} catch (e) {
  console.log(e.message);
}
