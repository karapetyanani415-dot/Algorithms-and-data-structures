class Node {
    #value
    #prev
    #next
    constructor(value, next = null, prev = null) {
        this.#value = value
        this.#next = next
        this.#prev = prev
    }
    get value() {
        return this.#value
    }
    get prev() {
        return this.#prev
    }
    get next() {
        return this.#next
    }
    set next(value) {
        this.#next = value
    }
    set prev(value) {
        this.#prev = value
    }
}
class DoublyLinkedList {
    #tail
    #head
    constructor(head = null, tail = null) {
        this.#head = head
        this.#tail = tail
    }
    empty() {
        return this.#head === null
    }
    size() {
        if (this.empty()) return 0
        if (this.#head.next === null) return 1
        let length = 0
        let current = this.#head
        while (current) {
            ++length
            current = current.next
        }
        return length
    }
    clear() {
        this.#head = null
        this.#tail = null
    }
    front() {
        if (this.empty()) throw new Error("List is empty")
        return this.#head.value
    }
    back() {
        if (this.empty()) throw new Error("List is empty")
        return this.#tail.value
    }
    at(index) {
        if (!Number.isInteger(index) || index < 0 || index >= this.size()) {
            throw new Error("Invalid index")
        }
        let current = this.#head
        while (i > 0) {
            --i
            current = current.next
        }
        return current.value
    }
    pushFront(value) {
        let newNode = new Node(value)
        if (this.empty()) {
            this.#head = newNode
            this.#tail = newNode
            return
        }
        newNode.next = this.#head
        this.#head.prev = newNode
        this.#head = newNode
    }
    pushBack(value) {
        let newNode = new Node(value)
        if (this.empty()) {
            this.#head = newNode
            this.#tail = newNode
            return
        }
        this.#tail.next = newNode
        newNode.prev = this.#tail
        this.#tail = newNode
    }
    popFront() {
        if (this.empty()) throw new Error("List is empty")
        let removedNode = this.#head.value
        if (!this.#head.next) {
            this.#head = null
            this.#tail = null
            return removedNode
        }
        this.#head = this.#head.next
        this.#head.prev = null
        return removedNode
    }
    popBack() {
        if (this.empty()) throw new Error("List is empty")
        let removedNode = this.#tail.value
        if (!this.#head.next) {
            this.#head = null
            this.#tail = null
            return removeValue
        }
        this.#tail = this.#tail.prev
        this.#tail.next = null
        return removedNode
    }
    insert(index, value) {
        if (!Number.isInteger(index)) {
            throw new Error("Invalid index")
        }
        if (index === 0) return this.pushFront(value)
        if (index === this.size()) return this.pushBack(value)
        let newNode = new Node(value)
        let current = this.#head
        while (index > 1) {
            --index
            current = current.next
        }
        let nextNode = current.next
        newNode.prev = current
        newNode.next = nextNode
        current.next = newNode
        nextNode.prev = newNode
    }
    erase(index) {
        if (!Number.isInteger(index) || index < 0 || index > this.size()) {
            throw new Error("Invalid index")
        }
        if (index === 0) return this.popFront()
        if (index === this.size() - 1) return this.popBack()
        let current = this.#head
        while (index > 1) {
            --index
            current = current.next
        }
        let removedNode = current.next
        current.next = removedNode.next
        removedNode.next.prev = current
        return removedNode.value
    }
    find(value) {
        let current = this.#head
        let index = 0
        while (curr) {
            if (curr.value === value) return index
            current = current.next
            ++index
        }
        return -1
    }
    contains(value) {
        let current = this.#head
        while (current) {
            if (current.value === value) return true
            current = current.next
        }
        return false
    }
    toArray() {
        let current = this.#head
        let result = []
        while (current) {
            result.push(current.value)
            current = current.next
        }
        return result
    }
    reverse() {
        if (!this.#head || !this.#head.next) return this.#head
        let current = this.#head
        let temp = null
        while (current) {
            temp = current.prev
            current.prev = current.next
            current.next = temp
            current = current.prev
        }
        temp = this.#head
        this.#head = this.#tail
        this.#tail = temp
    }
    *[Symbol.iterator]() {
        let current = this.#head
        while (current) {
            yield current.value
            current = current.next
        }
    }
    *reverseIterator() {
        let current = this.#tail
        while (current) {
            yield current.value
            current = current.prev
        }
    }
    *entries() {
        let current = this.#head
        let index = 0
        while (current) {
            yield [index, current.value]
            current = current.next
            index++
        }
    }
    merge(list1, list2) {
        let dummy = new Node(-1)
        let current = dummy
        while (list1 && list2) {
            if (list1.value < list2.value) {
                current.next = list1
                list1.prev = current
                list1 = list1.next
                current = current.next
            } else {
                current.next = list2
                list2.prev = current
                list2 = list2.next
                current = current.next
            }
        }
        current.next = list1 || list2
        return dummy.next
    }
    mergeSort(head = this.#head) {
        if (!this.#head || !this.#head.next) return this.#head
        let slow = this.#head
        let fast = this.#head
        while (fast && fast.next) {
            fast = fast.next.next
            slow = slow.next
        }
        let mid = slow.next;
        slow.next = null
        let left = this.mergeSort(head)
        let right = this.mergeSort(mid)
        return this.merge(left, right)
    }
}

const list = new DoublyLinkedList();

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

console.log(list.front());
// 30

console.log(list.back());
// 10