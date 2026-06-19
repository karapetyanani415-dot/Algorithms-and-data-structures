import { DArray } from "../../Array/Dynamic_Array.js";
class CircularQueue {
  #data;
  #front;
  #size;
  constructor(capacity = 8) {
    if (!Number.isInteger(capacity))
      throw new Error("Capacity must be an integer");
    if (capacity <= 0) throw new Error("Capacity must be positiv number");
    this.#data = new DArray(capacity);
    this.#front = 0;
    this.#size = 0;
    // Capacity must be a positive integer
    // If invalid → throw Error

    // Must allocate internal storage

    // Must initialize:
    //   front = 0
    //   size = 0

    // Queue must support circular indexing
  }

  /* ================= Basic State ================= */

  size() {
    return this.#size;
    // Must return current number of elements
  }

  capacity() {
    return this.#data.capacity();
    // Must return current storage capacity
  }

  isEmpty() {
    return this.size() === 0;
    // Must return true if queue contains no elements
  }

  clear() {
    this.#front = 0;
    this.#size = 0;
    // Must remove all elements
    // Must reset:
    //   front = 0
    //   size = 0
    // Capacity must remain unchanged
  }

  /* ================= Core Queue Operations ================= */

  enqueue(value) {
    if (!Number.isInteger(value)) {
      throw new Error("Value must be integer");
    }
    if (this.#size === this.capacity()) {
      this.#grow();
    }
    const rear = (this.#front + this.#size) % this.capacity();
    this.#data.setRaw(rear, value);
    this.#size++;
    // Must insert value at the logical back of the queue
    // If queue is full:
    //   must automatically grow storage
    //   preserving FIFO order
    // Must:
    //   compute circular rear position
    //   store value
    //   increment size
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    const val = this.#data.at(this.#front);
    this.#data.setRaw(this.#front, 0);
    this.#front = (this.#front + 1) % this.capacity();
    this.#size--;

    return val;
    // If queue is empty → throw Error
    // Must:
    //   read front value
    //   move front forward circularly
    //   decrement size
    //   return removed value
  }

  front() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.#data.getRaw(this.#front);
    // If queue is empty → throw Error
    // Must return first element
    // Must NOT remove it
  }

  back() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    let idx = (this.#front + this.#size - 1) % this.capacity();
    return this.#data.getRaw(idx);
    // If queue is empty → throw Error
    // Must return last element
    // Must NOT remove it
  }

  /* ================= Internal Resize ================= */

  #grow() {
    let cap = this.#data.capacity() * 2;
    let newData = new DArray(cap);
    for (let i = 0; i < this.#size; ++i) {
      let idx = (this.#front + i) % this.capacity();
      newData.setRaw(i, this.#data.getRaw(idx));
    }

    this.#data = newData;
    this.#front = 0;
    // Must create larger storage
    // New capacity should be:
    //   oldCapacity * 2
    // Must copy queue elements
    // in correct FIFO order
    // After growth:
    //   front must become 0
    // Logical queue order must remain unchanged
  }

  /* ================= Utilities ================= */

  toArray() {
    let newArr = new Array(this.#size);
    for (let i = 0; i < this.#size; i++) {
      let idx = (this.#front + i) % this.capacity();
      newArr[i] = this.#data.getRaw(idx);
    }
    return newArr;
    // Must return queue elements
    // in FIFO order
    // Internal circular layout
    // must not be exposed
  }

  toString() {
    return this.toArray().join(",");
    // Must return string representation
    // of queue contents
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.#size; i++) {
      let idx = (this.#front + i) % this.capacity();
      yield this.#data.getRaw(idx);
    }
    // Must iterate through elements
    // in FIFO order
  }
}
//console.log("--BASIC TEST--")
// let q1 = new CircularQueue();
// q1.enqueue(123);
// q1.enqueue(63);
// q1.enqueue(4);
// console.log(q1.toArray());
// q1.dequeue();
// console.log(q1.toArray());

// console.log("--FRONT / BACK TEST--")
// console.log(q1.front());
// console.log(q1.back());

// console.log("--CIRCULAR TEST--")
// let q2 = new CircularQueue(3);
// q2.enqueue(1);
// q2.enqueue(2);
// q2.enqueue(3);
// q2.dequeue();
// q2.enqueue(4);
// console.log(q2.toArray());

// console.log("--GROW TEST--");
// let q3 = new CircularQueue(2);
// q3.enqueue(10);
// q3.enqueue(20);
// q3.enqueue(30);
// console.log(q3.toArray());

// console.log("--EMPTY TEST--");
// let q4 = new CircularQueue();
// console.log(q4.isEmpty());
// q4.enqueue(99);
// q4.dequeue();
// console.log(q4.isEmpty());

// console.log("--ERROR TESTS--")
// let q5 = new CircularQueue();
// try {
//   q5.dequeue();
// } catch (e) {
//   console.log(e.message);
// }

// try {
//   q5.front();
// } catch (e) {
//   console.log(e.message); 
// }


