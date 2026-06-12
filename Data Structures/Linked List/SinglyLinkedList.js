class Node {
  #value
  #next
  constructor(value, next = null) {
    this.#value = value
    this.#next = next
  }
  get value() {
    return this.#value
  }
  get next() {
    return this.#next
  }
  set next(node) {
    this.#next = node
  }
}
class SinglyLinkedList {
  #head
  constructor(head = null) {
    this.#head = head
  }
  empty() {
    if (this.#head === null) {
      return true
    }
    return false
  }
  size() {
    if (this.empty()) return 0
    if (this.#head.next === null) return 1
    let curr = this.#head
    let length = 0
    while (curr) {
      ++length
      curr = curr.next
    }
    return length
  }
  clear() {
    this.#head = null
  }
  front() {
    if (this.empty()) throw new Error("list is empty")
    return this.#head.value
  }
  back() {
    if (this.empty()) throw new Error("list is empty")
    let curr = this.#head
    while (curr.next) {
      curr = curr.next
    }
    return curr.value
  }
  at(index) {
    if (!Number.isInteger(index)) throw new Error("is not number index")
    if (this.empty()) throw new Error("empty")
    if (index > this.size()) throw new Error("big index")
    let curr = this.#head
    while (index === 0) {
      --index
      curr = curr.next
    }
    return curr.value
  }
  pushFront(value) {
    if (this.empty()) {
      this.#head = new Node(value)
      return
    }
    let newNode = new Node(value)
    newNode.next = this.#head
    this.#head = newNode
  }
  pushBack(value) {
    if (this.empty()) {
      this.#head = new Node(value)
      return
    }
    let curr = this.#head
    while (curr.next) {
      curr = curr.next
    }
    curr.next = new Node(value)
  }
  popFront() {
    if (this.empty()) throw new Error("list is empty")
    let res = this.#head.value
    this.#head = this.#head.next
    return res
  }
  popBack() {
    if (this.empty()) throw new Error("list is empty")
    if (this.#head.next === null) {
      let res = this.#head.value
      this.#head = null
      return res
    }
    let curr = this.#head
    while (curr.next.next) {
      curr = curr.next
    }
    let res = curr.next.value
    curr.next = null
    return res
  }
  toArray() {
    let res = new Array(this.size())
    let curr = this.#head
    let i = 0
    while (curr) {
      res[i++] = curr.value
      curr = curr.next
    }
    return res
  }
  insert(index, value) {
    if (!Number.isInteger(index)) throw new Error("is not number index")
    if (index < 0 && index > this.size()) throw new Error("invalid index")
    if (index === 0) {
      this.pushFront(value)
      return
    }
    let curr = this.#head
    while (index > 1) {
      curr = curr.next
      --index
    }
    let newNode = new Node(value)
    newNode.next = curr.next
    curr.next = newNode
  }
  erase(index) {
    if (!Number.isInteger(index)) throw new Error("is not number index")
    if (index < 0 && index > this.size()) throw new Error("invalid index")
    if (index === 0) {
      this.popFront()
      return
    }
    let curr = this.#head
    while (index != 1 && curr.next) {
      curr = curr.next
      --index
    }
    let removedNode = curr.next
    curr.next = curr.next.next
    return removedNode.value
  }
  find(value) {
    let curr = this.#head
    let idx = 0
    while (curr.next) {
      if (curr.value === value) {
        return idx
      }
      curr = curr.next
      idx++
    }
    return -1
  }
  contains(value) {
    if (this.find() != -1) {
      return true
    }
    return false
  }
  reverse() {
    let curr = this.#head;
    let next = this.#head.next;
    let prev = null;
    while (curr) {
      curr.next = prev;
      prev = curr;
      curr = next;
      next = next?.next ?? null;
    }
    this.#head = prev;
  }
  *[Symbol.iterator]() {
    let current = this.#head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
  *entries() {
    let current = this.#head;
    let index = 0;
    while (current) {
      yield [index, current.value];
      current = current.next;
      index++;
    }
  }
  merge(list1,list2){
    let dummy = new Node(-1)
    let current = dummy
    while(list1 && list2){
      if(list1.value < list2.value){
        current.next = list1
        list1 = list1.next
        current = current.next
      }else{
        current.next = list2
        list2 = list2.next
        current = current.next
      }
    }
    current.next = list1 || list2
    return dummy.next
  }
  mergeSort(head = this.#head){
    if (!this.#head || !this.#head.next) return this.#head
    let prev = null
    let slow = this.#head
    let fast = this.#head
    while(fast && fast.next){
      prev = slow
      fast = fast.next.next
      slow = slow.next
    }
    prev.next = null
    let left = this.mergeSort(head)
    let right = this.mergeSort(slow)
    return this.merge(left,right)
  }
}
const list = new SinglyLinkedList();

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

