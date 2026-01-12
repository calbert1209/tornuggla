export class Retries {
  #list;

  constructor(initial = []) {
    this.#list = [...initial];
  }

  add(index, question) {
    this.#list.push({ at: index + 2, question });
  }

  hasRetry(index) {
    return this.#list[0]?.at === index;
  }

  shift() {
    if (this.#list.length < 1) return;

    const { question } = this.#list.shift();
    return question;
  }

  reset() {
    this.#list = [];
  }
}
