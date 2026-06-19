/**
 * Class representing a "Dynamic Array" data structure.
 * Uses a typed array (Uint32Array) as internal storage.
 */
export class DArray {
  // Private fields
  /** @private @type {number} Current number of elements in the array */
  #size = 0;

  /** @private @type {number} Current capacity (allocated memory) of the array */
  #capacity = 0;

  /** @private @type {Uint32Array|null} Internal array for storing data */
  #arr = null;

  // Public fields
  /** @public @type {number} Capacity multiplier when the array is full */
  CAP_EXPONENT = 2;

  /**
   * Initializes the dynamic array with a given initial capacity.
   * @param {number} initialCapacity - Initial capacity of the array (must be a strictly positive integer).
   * @throws {TypeError} If initialCapacity is not a positive integer.
   */
  constructor(initialCapacity = 8, fill = 0) {
    if (!Number.isInteger(initialCapacity))
      throw new Error("Capacity must be integer");
    if (initialCapacity <= 0)
      throw new Error("Capacity must be positiv number");
    if (!Number.isInteger(fill)) throw new Error("Fill must be integer");
    this.#capacity = initialCapacity;
    this.#size = 0;
    this.#arr = new Uint32Array(initialCapacity);
    // TODO: Initialize #capacity and #arr. Add validation for initialCapacity.
  }

  /**
   * Changes the capacity of the internal array.
   * @param {number} newCapacity - The new capacity of the array.
   * @param {number} [fill=0] - The value used to fill new elements if newCapacity > #size.
   */
  resize(newCapacity, fill = 0) {
    // TODO: Create a new internal array, copy old data, fill the remainder with 'fill', update references.
    if (!Number.isInteger(newCapacity))
      throw new Error("newCapacity must be integer");
    if (newCapacity <= 0) throw new Error("newCapacity must be > 0");
    if (newCapacity < this.#size) {
      this.#size = newCapacity;
    }
    let newArray = new Uint32Array(newCapacity);
    for (let i = 0; i < this.#size; i++) {
      newArray[i] = this.#arr[i];
    }
    for (let i = this.#size; i < newCapacity; i++) {
      newArray[i] = fill;
    }
    this.#arr = newArray;
    this.#capacity = newCapacity;
  }

  /**
   * Adds an element to the end of the array. If the array is full, increases its capacity by CAP_EXPONENT.
   * @param {number} elem - The element to add.
   */
  push_back(elem) {
    // TODO: Implement the logic to add an element, handling potential resizing.
    if (!Number.isInteger(elem)) throw new Error("element must be integer");
    if (this.#size === this.#capacity) {
      this.resize(this.#capacity * this.CAP_EXPONENT);
    }
    this.#arr[this.#size++] = elem;
  }

  /**
   * Removes the last element from the array (decreases the size). Does nothing if the array is empty.
   */
  pop_back() {
    // TODO: Implement the removal of the element from the end.
    if (this.empty()) return undefined;
    return this.#arr[--this.#size];
  }

  /**
   * Removes an element at the specified index, shifting all subsequent elements to the left.
   * @param {number} index - The index of the element to remove.
   * @throws {Error} If the index is out of bounds.
   */
  erase(index) {
    // TODO: Implement removal with left-shifting.
    throw new Error("Not implemented");
  }

  /**
   * Returns the element at the specified index.
   * @param {number} index - The index of the element.
   * @returns {number} The value of the element.
   * @throws {Error} If the index is out of bounds.
   */
  at(index) {
    // TODO: Implement safe retrieval of the element.
    if (index < 0 || index >= this.#capacity) {
      throw new Error("Out of range");
    }
    return this.#arr[index];
  }

  /**
   * Checks if the array is empty.
   * @returns {boolean} true if the array is empty, otherwise false.
   */
  empty() {
    return this.#size === 0;
  }

  /**
   * Clears the array (logically, by resetting the size to 0).
   */
  clear() {
    // TODO: Reset the array size to 0.
    this.#size = 0;
  }

  /**
   * Sets a new value for the element at the specified index.
   * @param {number} i - The index of the element.
   * @param {number} value - The new value.
   */
  setValue(i, value) {
    // TODO: Safely set the value if the index is valid.
    if (!Number.isInteger(i)) throw new Error("index must be integer");
    if (!Number.isInteger(value)) throw new Error("value must be integer");
    if (i < 0 || i > this.#size - 1) throw new Error("Out of range");
    this.#arr[i] = value;
  }

  /**
   * Returns the first element of the array.
   * @returns {number|undefined} The first element.
   */
  front() {
    // TODO: Return the first element.
    if (this.empty()) return -1;
    return this.#arr[0];
  }

  /**
   * Returns the last element of the array.
   * @returns {number|undefined} The last element.
   */
  back() {
    // TODO: Return the last element.
    if (this.empty()) return -1;
    return this.#arr[this.#size - 1];
  }

  /**
   * Returns the current capacity of the array.
   * @returns {number} The capacity.
   */
  capacity() {
    // TODO: Return #capacity.
    return this.#capacity;
  }

  /**
   * Makes the object iterable (allows the use of a for...of loop).
   * @returns {Iterator} Iterator object.
   */
  [Symbol.iterator]() {
    // TODO: Implement iterator logic with next() methods.
    let i = 0;
    return {
      next: () => {
        if (i < this.#size) {
          return {
            value: this.#arr[i++],
            done: false,
          };
        }
        return {
          value: undefined,
          done: true,
        };
      },
    };
  }

  /**
   * Reserves memory, increasing capacity to n if the current capacity is less than n.
   * @param {number} n - The desired minimum capacity.
   */
  reserve(n) {
    // TODO: Call resize if n is greater than the current capacity.
    if (n > this.#capacity) {
      this.resize(n);
    }
  }

  /**
   * Shrinks the capacity of the array to fit its actual size (#size).
   */
  shrinkToFit() {
    // TODO: Call resize to the current size.
    if (this.#capacity !== this.#size) {
      this.resize(this.#size);
    }
  }

  /**
   * Converts the structure to a standard JavaScript array.
   * @returns {Array<number>} A standard array of elements.
   */
  toArray() {
    // TODO: Assemble and return a standard [] array.
    let res = [];
    for (let i = 0; i < this.#size; ++i) {
      res[i] = this.#arr[i];
    }
    return res;
  }

  /**
   * Inserts an element at the specified position, shifting the rest of the elements to the right.
   * @param {number} pos - The index to insert at.
   * @param {number} value - The value to insert.
   * @throws {Error} If the position is out of bounds.
   */
  insert(pos, value) {
    // TODO: Implement insertion with right-shifting (and potential resizing).
    if (!Number.isInteger(pos)) throw new Error("index must be integer");
    if (!Number.isInteger(value)) throw new Error("value must be integer");
    if (pos < 0 || pos > this.#size) throw new Error("Out of range");

    if (this.#size === this.#capacity) {
      this.resize(this.#capacity * this.CAP_EXPONENT);
    }

    for (let i = this.#size; i > pos; i--) {
      this.#arr[i] = this.#arr[i - 1];
    }

    this.#arr[pos] = value;
    this.#size++;
  }

  /**
   * Swaps two elements by their indices.
   * @param {number} i - The index of the first element.
   * @param {number} j - The index of the second element.
   * @throws {RangeError} If either index is out of bounds.
   */
  swap(i, j) {
    // TODO: Swap the values.
    if (i < 0 || i >= this.#size || j < 0 || j >= this.#size) {
      throw new Error("Index out of bounds");
    }
    [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
  }

  /**
   * Returns an iterator for the array's values.
   * @returns {Iterator} Value iterator.
   */
  *values() {
    // TODO: Return the values iterator.
    for (let i = 0; i < this.#size; ++i) {
      yield this.#arr[i];
    }
  }

  /**
   * Returns an iterator for the array's keys (indices).
   * @returns {Iterator} Key iterator.
   */
  *keys() {
    // TODO: Return the keys iterator.
    for (let i = 0; i < this.#size; ++i) {
      yield i;
    }
  }

  /**
   * Returns an iterator for [index, value] pairs.
   * @returns {Iterator} Entries iterator.
   */
  *entries() {
    // TODO: Return the entries iterator.
    for (let i = 0; i < this.#size; ++i) {
      yield [i, this.#arr[i]];
    }
  }

  /**
   * Executes a provided function once for each array element.
   * @param {Function} callback - Function to execute on each element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @throws {TypeError} If callback is not a function.
   */
  forEach(callback, thisArg) {
    // TODO: Implement element iteration.
    for (let i = 0; i < this.#size; ++i) {
      callback.call(thisArg, this.#arr[i], i, this);
    }
  }

  /**
   * Creates a new DArray populated with the results of calling a provided function on every element.
   * @param {Function} callback - Function that is called for every element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @returns {DArray} A new dynamic array.
   */
  map(callback, thisArg) {
    // TODO: Implement the map logic returning a new DArray instance.
    let res = new DArray();
    for (let i = 0; i < this.#size; ++i) {
      res.push_back(callback.call(thisArg, this.#arr[i], i, this));
    }
    return res;
  }

  /**
   * Creates a new DArray with all elements that pass the test implemented by the provided function.
   * @param {Function} callback - Predicate function to test each element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @returns {DArray} A filtered dynamic array.
   */
  filter(callback, thisArg) {
    // TODO: Implement filtering.
    let res = new DArray();
    for (let i = 0; i < this.#size; ++i) {
      if (callback.call(thisArg, this.#arr[i], i, this)) {
        res.push_back(this.#arr[i]);
      }
    }
    return res;
  }

  /**
   * Executes a user-supplied "reducer" callback function on each element of the array, passing in the return value from the calculation on the preceding element.
   * @param {Function} callback - Function to execute on each element.
   * @param {*} [initialValue] - Initial value for the accumulator.
   * @returns {*} The final reduced value.
   * @throws {TypeError} If the array is empty and no initialValue is provided.
   */
  reduce(callback, initialValue) {
    // TODO: Implement the reduce logic.
    throw new Error("Not implemented");
    //if (this.empty() && initialValue === undefined) throw new Error("Reduce of empty array with no initial value")
  }

  /**
   * Tests whether at least one element in the array passes the test implemented by the provided function.
   * @param {Function} callback - Function to test for each element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @returns {boolean} true if at least one element passes the test, otherwise false.
   */
  some(callback, thisArg) {
    // TODO: Return true on the first match.
    for (let i = 0; i < this.#size; ++i) {
      if (callback.call(thisArg, this.#arr[i], i, this)) return true;
    }
    return false;
  }

  /**
   * Tests whether all elements in the array pass the test implemented by the provided function.
   * @param {Function} callback - Function to test for each element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @returns {boolean} true if all elements pass the test, otherwise false.
   */
  every(callback, thisArg) {
    // TODO: Return false on the first mismatch.
    for (let i = 0; i < this.#size; ++i) {
      if (!callback.call(thisArg, this.#arr[i], i, this)) return false;
    }
    return true;
  }

  /**
   * Returns the value of the first element in the array that satisfies the provided testing function.
   * @param {Function} callback - Function to test for each element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @returns {number|undefined} The value of the found element, or undefined.
   */
  find(callback, thisArg) {
    // TODO: Find and return the element.
    for (let i = 0; i < this.#size; ++i) {
      if (callback.call(thisArg, this.#arr[i], i, this)) {
        return this.#arr[i];
      }
    }
    return undefined;
  }

  /**
   * Returns the index of the first element in the array that satisfies the provided testing function.
   * @param {Function} callback - Function to test for each element.
   * @param {Object} [thisArg] - Value to use as 'this' when executing the callback.
   * @returns {number} The index of the found element, or -1 if not found.
   */
  findIndex(callback, thisArg) {
    // TODO: Find and return the index.
    for (let i = 0; i < this.#size; ++i) {
      if (callback.call(thisArg, this.#arr[i], i, this)) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Determines whether an array includes a certain value among its entries.
   * @param {number} value - The value to search for.
   * @returns {boolean} true if the value is found, otherwise false.
   */
  includes(value) {
    // TODO: Check if the value is present in the array.
    for (let i = 0; i < this.#size; ++i) {
      if (this.#arr[i] === value) return true;
    }
    return false;
  }
  getRaw(index) {
    return this.#arr[index];
  }

  setRaw(index, value) {
    this.#arr[index] = value;
  }
}
