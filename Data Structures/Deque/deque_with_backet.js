class BucketedDeque {
  // === State ===
  #everyBucketsLength;
  #bucketSize;
  #buckets;
  #frontBucket;
  #backBucket;
  #frontIndex;
  #backIndex;
  #size;

  /**
   * @param {number} [everyBucketsLength]
   * @param {number} [bucketSize]
   */
  constructor(everyBucketsLength = 8, bucketSize = 4) {
    this.#everyBucketsLength = everyBucketsLength;
    this.#bucketSize = bucketSize;
    this.#init();
  }

  // === Core operations ===

  /**
   * @param {*} value
   */
  push_front(value) {
    if (this.#frontIndex <= 0) {
      --this.#frontBucket;
      if (this.#frontBucket < 0) {
        this._ensureBucket();
      }
      this.#frontIndex = this.#everyBucketsLength;
    }
    this.#buckets[this.#frontBucket][--this.#frontIndex] = value;
    ++this.#size;
  }

  /**
   * @param {*} value
   */
  push_back(value) {
    if (this.#backIndex >= this.#everyBucketsLength) {
      this.#backIndex = 0;
      ++this.#backBucket;
      if (this.#backBucket >= this.#buckets.length) {
        this._ensureBucket();
      }
    }
    this.#buckets[this.#backBucket][this.#backIndex++] = value;
    ++this.#size;
  }

  /**
   * @returns {*}
   * @throws {RangeError} If the deque is empty.
   */
  pop_front() {
    if (this.#size === 0) {
      throw new Error("Deque is empty");
    }
    let value = this.#buckets[this.#frontBucket][this.#frontIndex];
    this.#buckets[this.#frontBucket][this.#frontIndex] = undefined;
    this.#frontIndex++;
    if (this.#frontIndex >= this.#everyBucketsLength) {
      this.#frontIndex = 0;
      ++this.#frontBucket;
    }
    --this.#size;
    return value;
  }

  /**
   * @returns {*}
   * @throws {RangeError} If the deque is empty.
   */
  pop_back() {
    if (this.#size === 0) {
      throw new Error("Deque is empty");
    }
    this.#backIndex--;
    if (this.#backIndex < 0) {
      this.#backIndex = this.#everyBucketsLength - 1;
      --this.#backBucket;
    }
    let value = this.#buckets[this.#backBucket][this.#backIndex];
    this.#buckets[this.#backBucket][this.#backIndex] = undefined;
    --this.#size;
    return value;
  }

  // === Access ===

  /**
   * @returns {*|undefined}
   */
  front() {
    return this.#size === 0 ? undefined : this.at(0);
  }

  /**
   * @returns {*|undefined}
   */
  back() {
    if (this.size() === 0) return undefined;
    return this.at(this.size() - 1);
  }

  // === Utilities ===

  /**
   * @returns {void}
   */
  clear() {
    this.#init();
  }

  /**
   * @returns {number}
   */
  size() {
    return this.#size;
  }

  /**
   * @boolean
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * @returns {Array}
   */
  toArray() {
    let arr = [];
    for (let i = 0; i < this.size(); i++) {
      arr.push(this.at(i));
    }
    return arr;
  }

  /**
   * @param {number} globalIndex
   * @returns {*|undefined}
   */
  at(globalIndex) {
    if (globalIndex < 0 || globalIndex >= this.#size) return undefined;
    let [localIdx, bucketIdx] = this._bucketIndex(globalIndex);
    return this.#buckets[bucketIdx][localIdx];
  }

  // === Iterator ===

  /**
   * @returns {Iterator}
   */
  *[Symbol.iterator]() {
    for (let i = 0; i < this.#size; i++) {
      yield this.at(i);
    }
  }

  // === Internal methods ===

  _ensureBucket() {
    let newBucketSize = this.#bucketSize * 2;
    let newBuckets = new Array(newBucketSize);
    for (let i = 0; i < newBucketSize; ++i) {
      newBuckets[i] = new Array(this.#everyBucketsLength).fill(null);
    }
    let shift = Math.floor(this.#bucketSize / 2);
    for (let k = 0; k < this.#bucketSize; ++k) {
      newBuckets[k + shift] = this.#buckets[k];
    }
    this.#frontBucket += shift;
    this.#backBucket += shift;
    this.#buckets = newBuckets;
    this.#bucketSize = newBucketSize;
  }

  /**
   * @param {number} globalIndex
   * @returns {Array<number>}
   */
  _bucketIndex(globalIndex) {
    let total = this.#frontBucket * this.#everyBucketsLength + this.#frontIndex + globalIndex;
    let bucketIdx = Math.floor(total / this.#everyBucketsLength);
    let localIdx = total % this.#everyBucketsLength;

    return [localIdx, bucketIdx];
  }

  #init() {
    this.#buckets = new Array(this.#bucketSize);
    for (let i = 0; i < this.#bucketSize; ++i) {
      this.#buckets[i] = new Array(this.#everyBucketsLength);
    }
    this.#frontBucket = Math.floor(this.#bucketSize / 2) - 1;
    this.#backBucket = Math.floor(this.#bucketSize / 2);
    this.#frontIndex = this.#everyBucketsLength;
    this.#backIndex = 0;
    this.#size = 0;
  }
}

// function log(title) {
//     console.log("\n===== " + title + " =====");
// }
// log("TEST 1: Empty");
// let dq = new BucketedDeque();
// console.log(dq.isEmpty());
// console.log(dq.size());
// console.log(dq.front());
// console.log(dq.back());
// try {
//     dq.pop_front();
// } catch (e) {
//     console.log("pop_front() throws");
// }

// try {
//     dq.pop_back();
// } catch (e) {
//     console.log("pop_back() throws");
// }

// // =====================
// log("TEST 2: push_back");
// dq = new BucketedDeque();
// dq.push_back(1);
// dq.push_back(2);
// dq.push_back(3);
// console.log(dq.front());
// console.log(dq.back());
// console.log(dq.size());
// console.log(dq.toArray());
// console.log(dq.pop_front());
// console.log(dq.pop_front());
// console.log(dq.pop_front());
// console.log(dq.isEmpty());

// // =====================
// log("TEST 3: push_front");
// dq = new BucketedDeque();
// dq.push_front(1);
// dq.push_front(2);
// dq.push_front(3);
// console.log(dq.front());
// console.log(dq.back());
// console.log(dq.toArray());
// console.log(dq.pop_back());
// console.log(dq.pop_back());
// console.log(dq.pop_back());
// console.log(dq.isEmpty());

// // =====================

// log("TEST 4: Mixed");
// dq = new BucketedDeque();
// dq.push_front(1);
// dq.push_back(2);
// dq.push_front(3);
// dq.push_back(4);
// console.log(dq.toArray());
// console.log(dq.pop_front());
// console.log(dq.pop_back());
// console.log(dq.toArray());

// // =====================

// log("TEST 5: push_back stress");
// dq = new BucketedDeque();
// for (let i = 0; i < 20; i++) dq.push_back(i);
// console.log(dq.front());
// console.log(dq.back());
// console.log(dq.size());
// while (!dq.isEmpty()) {
//     console.log(dq.pop_front());
// }

// // =====================

// log("TEST 6: push_front stress");
// dq = new BucketedDeque();
// for (let i = 0; i < 20; i++) dq.push_front(i);
// console.log(dq.front());
// console.log(dq.back());
// console.log(dq.size());
// while (!dq.isEmpty()) {
//     console.log(dq.pop_back());
// }

// // =====================

// log("TEST 9: at()");
// dq = new BucketedDeque();
// for (let i = 0; i < 30; i++) dq.push_back(i);
// for (let i = 0; i < dq.size(); i++) {
//     console.log(dq.at(i));
// }

// // =====================

// log("TEST 10: Iterator");
// for (const x of dq) {
//     console.log(x);
// }

// // =====================

// log("TEST 11: clear");
// dq.clear();
// console.log(dq.isEmpty());
// console.log(dq.size());
// dq.push_back(100);
// console.log(dq.front());
// console.log(dq.back());
// dq.clear();

// // =====================

// log("TEST 14: reuse");
// dq.push_back(1);
// console.log(dq.pop_back());
// dq.push_front(2);
// console.log(dq.pop_front());
// dq.push_back(3);
// dq.push_front(4);
// console.log(dq.toArray());
// console.log("\n===== ALL TESTS FINISHED =====");
