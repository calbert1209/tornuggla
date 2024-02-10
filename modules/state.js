export class State {
  #max;
  #retries;
  #fn;
  #current;
  #done;
  #index;
  #onChange;

  constructor(max, retries, fn, onChange) {
    this.#max = max;
    this.#retries = retries;
    this.#fn = fn;
    this.#current = undefined;
    this.#done = [];
    this.#index = 0;
    this.onChange = onChange;
  }

  #report() {
    this.onChange?.({
      index: this.#index,
      current: this.#current,
      count: this.#done.length,
      isDone: this.#done.length >= this.#max,
    })
  }

  #setCurrent(next) {
    this.#current = next;
    this.#report();
  }

  #cloneCurrent() {
    if (typeof this.#current === "function") {
      throw new Error("question cannot be a function");
    }

    if (Array.isArray(this.#current)) {
      return [...this.#current];
    }

    if (typeof this.#current === "object") {
      return { ...this.#current };
    }

    return this.#current;
  }

  next() {
    if (this.#done.length >= this.#max) {
      this.#report();
      return;
    }

    if (this.#retries.hasRetry(this.#index)) {
      console.debug("use retry");
      this.#setCurrent(this.#retries.shift());
    } else {
      console.debug("use generate");
      this.#setCurrent(this.#fn());
    }

    this.#index += 1;
  }

  ok() {
    if (this.#done.length < this.#max) {
      this.#done.push(this.#cloneCurrent());
    }
    this.next();
  }

  ng() {
    this.#retries.add(this.#index, this.#cloneCurrent());
    this.next();
  }

  reset() {
    this.#current = undefined;
    this.#done = [];
    this.#index = 0;
    this.#retries.reset();
  }
}
