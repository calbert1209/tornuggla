export interface Question {
  a: number;
  b: number;
}

export interface GameState {
  index: number;
  current: Question;
  count: number;
  isDone: boolean;
}

export class Retries {
  private list: Array<{ at: number; question: Question }> = [];

  add(index: number, question: Question): void {
    this.list.push({ at: index + 2, question });
  }

  hasRetry(index: number): boolean {
    return this.list[0]?.at === index;
  }

  shift(): Question | undefined {
    if (this.list.length < 1) return undefined;
    const { question } = this.list.shift()!;
    return question;
  }

  reset(): void {
    this.list = [];
  }
}

export class State {
  private max: number;
  private retries: Retries;
  private fn: () => Question;
  private current: Question | undefined;
  private done: Question[] = [];
  private index: number = 0;
  private onChange?: (state: GameState) => void;

  constructor(
    max: number,
    retries: Retries,
    fn: () => Question,
    onChange?: (state: GameState) => void
  ) {
    this.max = max;
    this.retries = retries;
    this.fn = fn;
    this.onChange = onChange;
  }

  private report(): void {
    this.onChange?.({
      index: this.index,
      current: this.current!,
      count: this.done.length,
      isDone: this.done.length >= this.max,
    });
  }

  private setCurrent(next: Question): void {
    this.current = next;
    this.report();
  }

  private cloneCurrent(): Question {
    if (!this.current) throw new Error("Current question is undefined");
    return { ...this.current };
  }

  next(): void {
    if (this.done.length >= this.max) {
      this.report();
      return;
    }

    if (this.retries.hasRetry(this.index)) {
      const retry = this.retries.shift();
      if (retry) this.setCurrent(retry);
    } else {
      this.setCurrent(this.fn());
    }

    this.index += 1;
  }

  ok(): void {
    if (this.done.length < this.max) {
      this.done.push(this.cloneCurrent());
    }
    this.next();
  }

  ng(): void {
    this.retries.add(this.index, this.cloneCurrent());
    this.next();
  }

  reset(): void {
    this.current = undefined;
    this.done = [];
    this.index = 0;
    this.retries.reset();
  }

  getCurrent(): Question | undefined {
    return this.current;
  }

  getCount(): number {
    return this.done.length;
  }

  isDone(): boolean {
    return this.done.length >= this.max;
  }
}
