class Node {
  #value;
  #next = null;

  constructor(val = 0) {
    this.#value = val;
    this.#next = null;
  }

  get value() {
    return this.#value;
  }

  set value(val) {
    this.#value = val;
  }

  get next() {
    return this.#next;
  }

  set next(new_node) {
    if (new_node !== null && !(new_node instanceof Node)) {
      throw new Error("next must be a type Node or null");
    }
    this.#next = new_node;
  }
}

class SinglyLinkedList {
  #head = null;
  #size = 0;

  constructor(iterable) {
    if (iterable === undefined) {
      return;
    }
    if (typeof iterable[Symbol.iterator] === "function") {
      for (let item of iterable) {
        this.push_back(iterable);
      }
    } else {
      this.push_back(iterable);
    }
  }

  /* ================= Size & State ================= */

  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  clear() {
    this.#head = null;
    this.#size = 0;
  }

  /* ================= Front Access ================= */

  front() {
    if (this.isEmpty()) {
      throw new Error("List is empty");
    }
    return this.#head.value;
  }

  /* ================= Push & Pop ================= */

  push_front(val) {
    let newNode = new Node(val);
    newNode.next = this.#head;
    this.#head = newNode;
    size++;
  }

  push_back(val) {
    let newNode = new Node(val);
    if (!newNode) {
      this.#head = newNode;
    } else {
      let curr = this.#head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = newNode;
    }
    size++;
  }

  pop_front() {
    if (this.isEmpty()) {
      throw new Error("List is empty");
    }
    let remove = this.#head;
    this.#head = remove.next;
    this.#size--;
    return remove.value;
  }

  pop_back() {
    if (this.isEmpty()) {
      throw new Error("List is empty");
    }
    let remove = null;
    if (this.#size === 1) {
      remove = remove.#head.value;
      this.#head = null;
    } else {
      let curr = this.#head;
      while (curr.next.next) {
        curr = curr.next;
      }
      remove = curr.next.value;
      curr.next = null;
    }
    this.#size--;
    return remove;
  }

  /* ================= Random-like Access ================= */

  at(index) {
    if (index < 0 || index >= this.#size) {
      throw new Error("index is invalid");
    }
    let curr = this.#head;
    let i = 0;
    while (i < index) {
      curr = curr.next;
      ++i;
    }
    return curr.value;
  }

  insert(index, val) {
    let i = 0;
    if (index < 0 || index > this.#size) {
      throw new Error("index is invalid");
    }
    if (index === 0) {
      this.push_front(val);
      return;
    }
    if (index === this.#size) {
      this.push_back(val);
      return;
    }
    let prev = this.#head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next;
    }
    let newNode = new Node(val);
    newNode.next = prev.next;
    prev.next = newNode;
    this.#size++;
  }

  erase(index) {
    if (index < 0 || index >= this.#size) {
      throw new Error("index is invalid");
    }
    if (index === 0) {
      this.pop_front();
      return;
    }
    if (index === this.#size - 1) {
      this.pop_back();
      return;
    }
    let prev = this.#head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next;
    }
    prev.next = prev.next.next;
    size--;
  }
  remove(value, equals) {
    let curr = this.#head;
    let prev = null;
    let count = 0;
    const isEqual = equals ? (a, b) => equals(a, b) : (a, b) => a === b;
    while (curr) {
      if (isEqual(curr.value, value)) {
        count++;
        if (prev === null) {
          this.#head = curr.next;
        } else {
          prev.next = curr.next;
        }

        this.#size--;
        curr = curr.next;
      } else {
        prev = curr;
        curr = curr.next;
      }
    }
    return count;
  }

  /* ================= Algorithms ================= */

  reverse() {
    if (!this.#head || !this.#head.next) {
      return this.#head;
    }
    let newHead = reverseList(this.#head.next);
    this.#head.next.next = this.#head;
    this.#head.next = null;
    return newHead;
  }

  _mergeNodes(l1, l2, cmp) {
    let dummy = new Node(0);
    let curr = dummy;

    while (l1 && l2) {
      if (cmp(l1.value, l2.value) <= 0) {
        curr.next = l1;
        l1 = l1.next;
      } else {
        curr.next = l2;
        l2 = l2.next;
      }
      curr = curr.next;
    }
    curr.next = l1 || l2;
    return dummy.next;
  }

  sort(cmp) {
    if (typeof cmp !== 'function') throw new Error("Comparator function is required");
    let getMiddle = (head) => {
      let slow = head, fast = head, prev = null;
      while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
      }
      if (prev) prev.next = null;
      return slow;
    };
    let mergeSort = (node) => {
      if (!node || !node.next) return node;

      let mid = getMiddle(node);
      let left = mergeSort(node);
      let right = mergeSort(mid);

      return this._mergeNodes(left, right, cmp);
    };
    this.#head = mergeSort(this.#head);
  }

  merge(list, cmp) {
    if (!(list instanceof SinglyLinkedList)) throw new Error("Argument must be SinglyLinkedList");
    if (typeof cmp !== 'function') throw new Error("Comparator function is required");
    if (!this._isSorted(this.#head, cmp) || !this._isSorted(list.#head, cmp)) {
      throw new Error("Both lists must be sorted according to cmp before merging");
    }
    this.#head = this._mergeNodes(this.#head, list.#head, cmp);
    this.#size += list.size();
    list.clear();
  }

  _isSorted(head, cmp) {
    let curr = head;
    while (curr && curr.next) {
      if (cmp(curr.value, curr.next.value) > 0) return false;
      curr = curr.next;
    }
    return true;
  }

  /* ================= Utilities ================= */

  toArray() {
    let res = [];
    let curr = this.#head;
    while (curr) {
      res.push(curr.value)
      curr = curr.next;
    }
    return res;
  }

  static fromArray(arr) {
    let list = new LinkedList();
    for (let i = 0; i < arr.length; i++) {
      list.this.push_back(arr[i]);
    }
    return list;
  }

  /* ================= Iteration ================= */

  [Symbol.iterator]() {
    let current = this.#head;
    return {
      next() {
        if (!current) {
          return { done: true, value: undefined };
        }
        let value = current.value;
        current = current.next;
        return { done: false, value: value };
      }
    }
  }
}
