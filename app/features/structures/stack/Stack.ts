export class Stack<T> {
  private readonly state: T[];

  public constructor(initial: T[] = []) {
    this.state = initial;
  }

  public push = (item: T): void => {
    this.state.push(item);
  };

  public pop = (): T => {
    if (this.isEmpty()) throw new Error("Stack underflow");
    return this.state.pop() as T;
  };

  public peek = (): T => {
    if (this.isEmpty()) throw new Error("Stack underflow");
    return this.state[this.state.length - 1];
  };

  public isEmpty = (): boolean => this.state.length === 0;
}
