class Node {
    #value
    #next
    #prev
    constructor(value, next = null, prev = null) {
        this.#value = value
        this.#next = next
        this.#prev = prev
    }
    get value() {
        return this.#value
    }
    get next() {
        return this.#next
    }
    get prev() {
        return this.#prev
    }
    set next(value) {
        this.#next = value
    }
    set prev(value) {
        this.#prev = value
    }
}
class CyclicDoublyLinkedList {
    #head
    #tail
    constructor(value) {
        this.#head = null
        this.#tail = null
        if (value !== undefined) {
            const newNode = new Node(value)
            newNode.next = newNode
            newNode.prev = newNode
            this.#head = newNode
            this.#tail = newNode
        }
    }
    empty() {
        return this.#head === null
    }
    size() {
        if (this.#head === null) return 0
        let current = this.#head.next
        let length = 1
        while (current != this.#head) {
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
        if (this.empty()) {
            throw new Error("List is empty")
        }
        return this.#head.value
    }
    back() {
        if (this.empty()) {
            throw new Error("List is empty")
        }
        return this.#tail.value
    }
    at(index) {
        if (!Number.isInteger(index)) throw new Error("Index is not a number")
        if (this.empty()) throw new Error("List is empty")
        if (index < 0 || index >= this.size()) throw new Error("Index out of range")
        let current = this.#head
        while (index > 0) {
            --index
            current = current.next
        }
        return current.value
    }
    pushFront(value) {
        let newNode = new Node(value)
        if (this.empty()) {
            newNode.next = newNode
            newNode.prev = newNode
            this.#head = newNode
            this.#tail = newNode
            return
        }
        newNode.next = this.#head
        newNode.prev = this.#tail
        this.#head.prev = newNode
        this.#tail.next = newNode
        this.#head = newNode
    }
    pushBack(value) {
        let newNode = new Node(value)
        if (this.empty()) {
            newNode.next = newNode
            newNode.prev = newNode
            this.#head = newNode
            this.#tail = newNode
            return
        }
        newNode.next = this.#head
        newNode.prev = this.#tail
        this.#tail.next = newNode
        this.#head.prev = newNode
        this.#tail = newNode
    }
    popFront() {
        if (this.empty()) throw new Error("List is empty")
        if (this.size() === 1) {
            this.clear()
            return
        }
        let removeNode = this.#head.value
        let oldHead = this.#head
        let newHead = oldHead.next
        this.#tail.next = newHead
        newHead.prev = this.#tail
        this.#head = newHead
        return removeNode
    }
    popBack() {
        if (this.empty()) throw new Error("List is empty")
        if (this.size() === 1) {
            this.clear()
            return
        }
        let removeNode = this.#tail
        let newTail = this.#tail.prev
        newTail.next = this.#head
        this.#head.prev = newTail
        this.#tail = newTail
        return removeNode
    }
    insert(index, value) {
        if (!Number.isInteger(index)) {
            throw new Error("Invalid index")
        }
        if (index < 0 || index > this.size()) {
            throw new Error("Index out of range")
        }
        if (index === 0) return this.pushFront(value)
        if (index === this.size()) return this.pushBack(value)
        let newNode = new Node(value)
        let current = this.#head
        while (index > 1) {
            current = current.next
            --index
        }
        let nextNode = current.next
        newNode.prev = current
        newNode.next = nextNode
        current.next = newNode
        nextNode.prev = newNode
    }
    erase(index) {
        if (!Number.isInteger(index)) {
            throw new Error("Invalid index")
        }
        if (index < 0 || index > this.size()) {
            throw new Error("Index out of range")
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
        if (this.empty()) return -1
        if (this.#head.value === value) return 0
        let index = 1
        let current = this.#head.next
        while (current != this.#head) {
            if (current.value === value) return index
            ++index
            current = current.next
        }
        return -1
    }
    contains(value) {
        if (this.empty()) return false
        if (this.#head.value === value) return true
        let current = this.#head.next
        while (current != this.#head) {
            if (current.value === value) return true
            current = current.next
        }
        return false
    }
    toArray() {
        if (this.empty()) return []
        let res = []
        let current = this.#head
        do {
            res.push(current.value)
            current = current.next
        } while (current !== this.#head)
        return res
    }
    reverse() {
        if (!this.#head || !this.#head.next) return this.#head
        let curr = this.#head
        do {
            let tmp = curr.next
            curr.next = curr.prev
            curr.prev = tmp
            curr = tmp
        } while (curr != this.#head)
        const oldHead = this.#head
        this.#head = this.#tail
        this.#tail = oldHead
    }
    *[Symbol.iterator]() {
        if (!this.#head) return;
        let current = this.#head
        do {
            yield current.value
            current = current.next
        } while (current != this.#head)
    }
    *reverseIterator() {
        let current = this.#tail
        do {
            yield current.value
            current = current.prev
        } while (current != this.#head)
    }
    *entries() {
        let current = this.#head
        let index = 0
        do {
            yield [index, current.value]
            ++index
            current = current.next
        } while (current != this.#head)
    }
}

const list = new CyclicDoublyLinkedList();

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