export class Queue<T> {
  private first: QueueNode<T> | null = null;
  private last: QueueNode<T> | null = null;

  public constructor(initial: T[] = []) {
    if (initial.length > 0) initial.forEach((item) => this.enqueue(item));
  }

  public enqueue = (item: T): void => {
    const newLast = new QueueNode<T>(item);
    if (!this.last) {
      this.last = newLast;
      this.first = newLast;
    } else {
      this.last.next = newLast;
      this.last = newLast;
    }
  };

  public dequeue = (): T => {
    if (this.first === null) throw new Error("Queue underflow");
    const oldFirst = this.first;
    this.first = this.first.next;
    if (this.first === null) this.last = null;
    return oldFirst.value;
  };

  public peekFirst = (): T => {
    if (this.first === null) throw new Error("Queue underflow");
    return this.first.value;
  };

  public peekLast = (): T => {
    if (this.last === null) throw new Error("Queue underflow");
    return this.last.value;
  };

  public isEmpty = (): boolean => this.last === null;
}

class QueueNode<T> {
  public readonly value: T;
  public next: QueueNode<T> | null;

  public constructor(value: T, next: QueueNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}
