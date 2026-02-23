class Deque {
  #arr;
  #front;
  #size;
  #capacity;

  constructor(capacity = 8) {
    if (capacity >= 2) {
      throw new Error("Capacity must be >= 2");
    }
    this.#front = 0;
    this.#size = 0;
    this.#arr = new Array(capacity);
    this.#capacity = capacity;
  }

  /* ================= Basic State ================= */

  size() {
    return this.#size;
  }

  capacity() {
    return this.#capacity;
  }

  empty() {
    return this.#size === 0;
  }

  full() {
    return this.#size === this.#capacity;
  }

  /* ================= Internal Helpers ================= */

  #mod(i) {
    return i % this.#capacity;
  }

  #index(i) {
    return this.#mod(this.#front + i);
  }

  #ensureCapacityForOneMore() {
    if (this.#size < this.#capacity) return;

    let newArray = new Array(this.#capacity * 2);
    for (let i = 0; i < this.#size; ++i) {
      newArray[i] = this.#arr[this.#index(this.#front + i)];
    }
    this.#arr = newArray;
    this.#capacity = this.#capacity * 2;
    this.#front = 0;
  }

  /* ================= Element Access ================= */

  front() {
    if (this.empty()) {
      throw new Error("Deque is empty");
    }
    return this.#arr[this.#index(this.#front)];
  }

  back() {
    if (this.empty()) {
      throw new Error("Deque is empty");
    }
    return this.#arr[this.#index(this.#front + this.#size - 1)];
  }

  at(i) {
    if (i < 0 || i >= this.#size) {
      throw new Error("index is invalid");
    }
    return this.#arr[this.#index(this.#front + i)];
  }

  /* ================= Modifiers ================= */

  push_back(value) {
    this.#ensureCapacityForOneMore();
    this.#arr[this.#index(this.#size)] = value;
    ++this.#size;
  }

  push_front(value) {
    this.#ensureCapacityForOneMore();
    this.#front = this.#mod(this.#front - 1);
    this.#arr[this.#front] = value;
    ++this.#size;
  }

  pop_front() {
    if (this.empty()) throw new Error("Deque is empty");
    let removed = this.#arr[this.#front];
    this.#front = this.#mod(this.#front + 1);
    --this.#size;
    return removed;
  }

  pop_back() {
    if (this.empty()) throw new Error("Deque is empty");
    let removed = this.#arr[this.#index(this.#size - 1)];
    --this.#size;
    return removed;
  }

  clear() {
    this.#size = 0
    this.#front = 0
  }

  /* ================= Extended Professional Methods ================= */

  reserve(newCapacity) {
    if (newCapacity <= this.#capacity) return;
    let newDeque = new Array(newCapacity);
    for (let i = 0; i < this.#capacity; ++i) {
      newDeque[i] = this.#arr[this.#index(this.#front + i)];
    }
    this.#arr = newDeque;
    this.#capacity = newCapacity;
    this.#front = 0;
  }

  shrinkToFit() {
    if (this.#capacity > this.#size) {
      let newArr = new Array(this.#size);
      for (let i = 0; i < this.#size; i++) {
        newArr[i] = this.#arr[this.#index(this.#front + i)];
      }
      this.#arr = newArr;
      this.#capacity = this.#size;
      this.#front = 0;
    }
  }

  rotateLeft(k = 1) {
    if (this.#size === 0) return;
    k = k % this.#size;
    this.#front = this.#index(this.#front + k);
  }

  rotateRight(k = 1) {
    if (this.#size === 0) return;
    k = k % this.#size;
    this.#front = this.#index(this.#front - k);
  }

  swap(i, j) {
    if (i < 0 || j < 0 || i >= this.#size || j >= this.#size) throw new Error("Invalid indices");
    let idxI = this.#index(this.#front + i);
    let idxJ = this.#index(this.#front + j);
    [this.#arr[idxI], this.#arr[idxJ]] = [this.#arr[idxJ], this.#arr[idxI]];
  }

  /* ================= Search & Utilities ================= */

  find(value) {
    for (let i = 0; i < this.#size; i++) {
      let idx = this.#index(this.#front + i);
      if (this.#arr[idx] === value) {
        return i;
      }
    }
    return -1;
  }

  includes(value) {
    for (let i = 0; i < this.#size; i++) {
      let idx = this.#index(this.#front + i);
      if (this.#arr[idx] === value) {
        return true;
      }
    }
    return false;
  }

  toArray() {
    let result = new Array(this.#size);
    for (let i = 0; i < this.#size; i++) {
      result[i] = this.#arr[this.#index(this.#front + i)];
    }
    return result;
  }

  clone() {
    let newDeque = new Deque();
    newDeque.#arr = new Array(this.#capacity);
    for (let i = 0; i < this.#size; i++) {
      newDeque.#arr[i] = this.#arr[this.#index(this.#front + i)];
    }
    newDeque.#size = this.#size;
    newDeque.#capacity = this.#capacity;
    newDeque.#front = 0;
    return newDeque;
  }

  equals(otherDeque) {
    if (this.#size !== otherDeque.#size) return false;
    for (let i = 0; i < this.#size; i++) {
      if (this.#arr[this.#index(this.#front + i)] !==
        otherDeque.#arr[otherDeque.#index(otherDeque.#front + i)]) {
        return false;
      }
    }
    return true;
  }

  /* ================= Iteration ================= */

  [Symbol.iterator]() {
    let i = 0;
    let size = this.#size;
    let deque = this;
    return {
      next() {
        if (i < size) {
          let value = deque.#arr[deque.#index(deque.#front + i)];
          i++;
          return { value, done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }

  values() {
    return this[Symbol.iterator]();
  }

  keys() {
    let i = 0;
    let size = this.#size;
    return {
      next() {
        if (i < size) {
          return { value: i++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
      [Symbol.iterator]() { return this; }
    };
  }

  entries() {
    let i = 0;
    let size = this.#size;
    let deque = this;
    return {
      next() {
        if (i < size) {
          let value = deque.#arr[deque.#index(deque.#front + i)];
          let entry = [i, value];
          i++;
          return { value: entry, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
      [Symbol.iterator]() { return this; }
    };
  }

  /* ================= Functional Style ================= */

  forEach(fn) {
    let arr = this.#arr;
    let size = this.#size;
    for (let i = 0; i < size; i++) {
      fn(arr[i], i, this);
    }
    return;
  }

  map(fn) {
    let result = new Deque();
    let arr = this.#arr;
    let size = this.#size;
    for (let i = 0; i < size; i++) {
      result.push(fn(arr[i], i, this));
    }
    return result;
  }

  filter(fn) {
    let arr = this.#arr;
    let size = this.#size;
    const result = new Deque();
    for (let i = 0; i < size; i++) {
      if (fn(arr[i], i, this)) {
        result.push(arr[i]);
      }
    }
    return result;
  }

  reduce(fn, initial) {
    if (size === 0 && initial === undefined) {
      throw new Error("Reduce of empty deque with no initial value");
    }
    let acc;
    let startIndex;
    if (initial !== undefined) {
      acc = initial;
      startIndex = 0;
    } else {
      acc = arr[0];
      startIndex = 1;
    }
    for (let i = startIndex; i < size; i++) {
      acc = fn(acc, arr[i], i, this);
    }
    return acc;
  }
}
