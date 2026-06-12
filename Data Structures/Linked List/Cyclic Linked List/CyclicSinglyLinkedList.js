class Node {
  #value;
  #next;

  constructor(value, next = null) {
    this.#value = value;
    this.#next = next;
  }
  get value() {
    return this.#value;
  }
  get next() {
    return this.#next;
  }
  set next(node) {
    this.#next = node;
  }
}

class CyclicSinglyLinkedList {
  #head = null;

  constructor(value) {
    if (value !== undefined) {
      const node = new Node(value);
      node.next = node;
      this.#head = node;
    }
  }
  empty() {
    return this.#head === null;
  }
  size() {
    if (this.#head === null) {
      return 0;
    }
    let count = 1;
    let current = this.#head.next;
    while (current !== this.#head) {
      count++;
      current = current.next;
    }
    return count;
  }
  clear() {
    this.#head = null;
  }
  front() {
    if (this.empty()) throw new Error("list is empty");
    return this.#head.value;
  }
  back() {
    if (this.empty()) throw new Error("list is empty");
    let current = this.#head;
    while (current.next !== this.#head) {
      current = current.next;
    }
    return current.value;
  }
  at(index) {
    if (!Number.isInteger(index)) throw new Error("is not number index");
    if (this.empty()) throw new Error("empty");
    if (index >= this.size()) throw new Error("big index");
    let curr = this.#head;
    while (index > 0) {
      --index;
      curr = curr.next;
    }
    return curr.value;
  }
  pushFront(value) {
    let newNode = new Node(value);
    if (this.empty()) {
      newNode.next = newNode;
      this.#head = newNode;
      return;
    }
    let tail = this.#head;
    while (tail.next !== this.#head) {
      tail = tail.next;
    }
    newNode.next = this.#head;
    tail.next = newNode;
    this.#head = newNode;
  }
  pushBack(value) {
    let newNode = new Node(value);
    if (this.empty()) {
      newNode.next = newNode;
      this.#head = newNode;
      return;
    }
    let current = this.#head;
    while (current.next !== this.#head) {
      current = current.next;
    }
    current.next = newNode;
    newNode.next = this.#head;
  }
  popFront() {
    if (this.empty()) throw new Error("list is empty");
    let removedValue = this.#head.value;
    if (this.#head.next === this.#head) {
      this.#head = null;
      return removedValue;
    }
    let current = this.#head;
    while (current.next !== this.#head) {
      current = current.next;
    }
    this.#head = this.#head.next;
    current.next = this.#head;
    return removedValue;
  }
  popBack() {
    if (this.empty()) throw new Error("list is empty");
    if (this.#head.next === this.#head) {
      const removedValue = this.#head.value;
      this.#head = null;
      return removedValue;
    }
    let current = this.#head;
    while (current.next.next !== this.#head) {
      current = current.next;
    }
    let removedValue = current.next.value;
    current.next = this.#head;
    return removedValue;
  }
  insert(index, value) {
    if (!Number.isInteger(index)) throw new Error("is not number index");
    if (index > this.size()) throw new Error("big index");
    if (index === 0) {
      this.pushFront(value);
      return;
    }
    let curr = this.#head;
    while (index > 1) {
      curr = curr.next;
      --index;
    }
    let newNode = new Node(value);
    newNode.next = curr.next;
    curr.next = newNode;
  }
  erase(index) {
    if (!Number.isInteger(index) || index < 0) {
      throw new Error("invalid index");
    }
    if (index >= this.size()) {
      throw new Error("invalid index");
    }
    if (index === 0) {
      return this.popFront();
    }
    let curr = this.#head;
    while (index > 1) {
      curr = curr.next;
      --index;
    }
    let removeElement = curr.next.value;
    curr.next = curr.next.next;
    return removeElement;
  }
  find(value) {
    if (this.empty()) return -1;
    let curr = this.#head;
    let idx = 0;
    do {
      if (curr.value === value) {
        return idx;
      }
      curr = curr.next;
      idx++;
    } while (curr !== this.#head);
    return -1;
  }
  contains(value) {
    if (this.find(value) != -1) {
      return true;
    }
    return false;
  }
  toArray() {
    if (this.empty()) return [];
    let res = [];
    res.push(this.#head.value);
    let curr = this.#head;
    while (curr.next !== this.#head) {
      curr = curr.next;
      res.push(curr.value);
    }
    return res;
  }
  reverse() {
    if (this.empty() || this.#head.next === this.#head) {
      return;
    }
    let curr = this.#head;
    let prev = null;
    let tmp;
    do {
      tmp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = tmp;
    } while (curr != this.#head);
    this.#head.next = prev;
    this.#head = prev;
  }
}

const list = new CyclicSinglyLinkedList();

list.pushBack(10);
list.pushBack(20);
list.pushBack(30);

list.insert(1, 15);

console.log(list.toArray());
// [10, 15, 20, 30]

list.erase(2);

console.log(list.toArray());
// [10, 15, 30]

list.reverse();

console.log(list.toArray());
// [30, 15, 10]