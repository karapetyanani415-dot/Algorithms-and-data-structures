class DynamicArray {
  #arr;
  #size;
  #capacity;
  #GROWTH = 2;

  constructor(cap = 0, fill = 0) {
    this.#arr = new Array(cap);
    this.#capacity = cap;
    this.#size = cap;
    if (cap > 0) {
      this.#arr.fill(fill);
    }
    if (cap < 0) throw new Error("cap must be big 0");
  }

  /* ================= Capacity ================= */

  size() {
    return this.#size;
  }

  capacity() {
    return this.#capacity;
  }

  empty() {
    return this.size() === 0;
  }

  reserve(n) {
    if (n <= this.#capacity) {
      return;
    }
    let newArray = new Array(n);
    for (let i = 0; i < this.#size; ++i) {
      newArray[i] = this.#arr[i];
    }
    this.#arr = newArray;
    this.#capacity = n;
  }

  shrinkToFit() {
    if (this.#capacity > this.#size) {
      let newArr = new Array(this.#size);
      for (let i = 0; i < this.#size; i++) {
        newArr[i] = this.#arr[i];
      }
      this.#arr = newArr;
      this.#capacity = this.#size;
    }
  }

  clear() {
    this.#size = 0;
  }

  /* ================= Element Access ================= */

  at(i) {
    if (i < 0 || i >= this.#size) throw new Error("...");
    return this.#arr[i];
  }

  set(i, value) {
    if (i < 0 || i >= this.#size) throw new Error("...");
    if (!Number.isInteger(i)) throw new Error("...");
    if (!Number.isInteger(value)) throw new Error("...");
    this.#arr[i] = value;
  }

  front() {
    if (this.empty()) throw new Error("Array is empty");
    return this.#arr[0];
    // this.at(0)
  }

  back() {
    if (this.empty()) throw new Error("Array is empty");
    return this.#arr[this.#size - 1];
    // this.at(size - 1)
  }

  toArray() {
    let newArray = new Array(this.#size);
    for (let i = 0; i < this.#size; ++i) {
      newArray[i] = this.#arr[i];
    }
    return newArray;
  }

  /* ================= Modifiers ================= */

  pushBack(value) {
    if (!Number.isInteger(value)) throw new Error("...");
    if (this.#size === this.#capacity) {
      let newCap = this.#capacity * this.#GROWTH || 1;
      this.#resize(newCap);
    }
    this.#arr[this.#size] = value;
    this.#size++;
  }

  popBack() {
    if (this.empty()) throw new Error("Array is empty");
    this.#size--;
  }

  insert(pos, value) {
    if (pos < 0 || pos > this.#size) throw new Error("...");
    if (!Number.isInteger(pos)) throw new Error("...");
    if (!Number.isInteger(value)) throw new Error("...");
    if (this.#size === this.#capacity) {
      let newCap = this.#capacity * this.#GROWTH || 1;
      this.reserve(newCap);
    }
    for (let i = this.#size; i > pos; --i) {
      this.#arr[i] = this.#arr[i - 1];
    }
    this.#arr[pos] = value;
    this.#size++;
  }

  erase(pos) {
    if (pos < 0 || pos >= this.#size) throw new Error("...");
    pos = Math.floor(pos) >> 0;
  }

  #resize(n) {
    let tmp = new Array(n).fill(null);
    if (n < this.#size) {
      this.size = n;
    }
    for (let i = 0; i < this.#size; ++i) {
      tmp[i] = this.at(i);
    }
    this.arr = tmp;
    this.#capacity = n;
  }

  swap(i, j) {
    if (i < 0 || i >= this.#size) throw new Error("...");
    if (j < 0 || j >= this.#size) throw new Error("...");
    if (!Number.isInteger(i) || !Number.isInteger(j))
      throw (new Error("...")[(this.#arr[i], this.#arr[j])] = [
        this.#arr[j],
        this.#arr[i],
      ]);
  }

  /* ================= Iteration ================= */

  [Symbol.iterator]() {
    let i = 0;
    let arr = this.#arr;
    let size = this.#size;

    return {
      next() {
        if (i >= size) {
          return { done: true, value: undefined };
        }
        return { done: false, value: arr[i++] };
      },
    };
  }
  values() {
    let i = 0;
    let arr = this.#arr;
    let size = this.#size;

    return {
      next() {
        if (i >= size) {
          return { done: true, value: undefined };
        }
        return { done: false, value: arr[i++] };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  keys() {
    let i = 0;
    let size = this.#size;

    return {
      next() {
        if (i >= size) {
          return { done: true, value: undefined };
        }
        return { done: false, value: i++ };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  *entries() {
    for (let i = 0; i < this.#size; ++i) {
      yield [i, this.#arr[i]];
    }
  }

  /* ================= High Order ================= */

  forEach(fn) {
    let arr = this.#arr;
    let size = this.#size;
    for (let i = 0; i < size - 1; i++) {
      fn(arr[i], i, arr);
    }
    return;
  }

  map(fn) {
    let result = new DynamicArray();
    let arr = this.#arr;
    let size = this.#size;
    for (let i = 0; i < size; i++) {
      result.push(fn(arr[i], i, arr));
    }
    return result;
  }

  filter(fn) {
    let arr = this.#arr;
    let size = this.#size;
    const result = new DynamicArray();
    for (let i = 0; i < size; i++) {
      if (fn(arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }
    return result;
  }

  reduce(fn, initial) {
    let arr = this.#arr;
    let size = this.#size;
    if (size === 0 && initial === undefined) {
      throw new Error("Reduce of empty array with no initial value");
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
      acc = fn(acc, arr[i], i, arr);
    }
    return acc;
  }

  some(fn) {
    let arr = this.#arr;
    let size = this.#size;
    for (let i = 0; i < size; i++) {
      if (fn(arr[i], i, arr)) {
        return true;
      }
    }
    return false;
  }

  every(fn) {
    let arr = this.#arr;
    let size = this.#size;
    for (let i = 0; i < size; i++) {
      if (!fn(arr[i], i, arr)) {
        return false;
      }
    }
    return true;
  }

  find(fn) {
    let arr = this.#arr;
    let size = this.#size;
    for (let i = 0; i < size; i++) {
      if (fn(arr[i], i, arr)) {
        return arr[i];
      }
    }
    return undefined;
  }

  findIndex(fn) {
    let arr = this.#arr;
    let size = this.#size;
    for (let i = 0; i < size; i++) {
      if (fn(arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  }

  includes(value) {
    let arr = this.#arr;
    let size = this.#size;
    for (let i = 0; i < size; i++) {
      if (arr[i] === value) {
        return true;
      }
    }
    return false;
  }

  /* ================= Extensions ================= */

  reverse() {
    let arr = this.#arr;
    let left = 0;
    let right = this.#size - 1;
    while (left < right) {
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;

      left++;
      right--;
    }
    return this;
  }
  sort(compareFn) {
    compareFn = typeof compareFn === "function" ? compareFn : (a, b) => a - b;
    let arr = this.#arr;
    function partition(low, high) {
      let pivot = arr[low];
      let i = low + 1;
      let j = high;
      while (i <= j) {
        while (compareFn(arr[i], pivot) <= 0) {
          ++i;
        }
        while (compareFn(arr[j], pivot) > 0) {
          --j;
        }
        if (i < j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          ++i;
          --j;
        }
      }
      [arr[low], arr[j]] = [arr[j], arr[low]];
      return j;
    }

    function quick(low, high) {
      if (low < high) {
        const pi = partition(low, high);
        quick(low, pi - 1);
        quick(pi + 1, high);
      }
    }
    quick(0, this.#size - 1);
  }

  clone() {
    let copy = new DynamicArray();
    let arr = this.#arr;
    let size = this.#size;
    for (let i = 0; i < size; i++) {
      copy.push(arr[i]);
    }
    return copy;
  }

  equals(other) {
    if (!(other instanceof DynamicArray)) return false;
    if (this.#size !== other.#size) return false;
    let arr1 = this.#arr;
    let arr2 = other.#arr;
    for (let i = 0; i < this.#size; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
}
