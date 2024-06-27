import { describe, it, beforeEach, expect } from "vitest";
import { Queue } from "./Queue";

describe("Queue", () => {
  let initial: number[], q: Queue<number>, emptyQ: Queue<number>;

  beforeEach(() => {
    initial = [1, 2, 3, 4, 5];
    q = new Queue(initial);
    emptyQ = new Queue();
  });

  it("should initialize", () => {
    initial.forEach((n) => expect(n).toEqual(q.dequeue()));
  });

  it("should peekFirst", () => {
    expect(q.peekFirst()).toEqual(1);
  });

  it("should peekLast", () => {
    expect(q.peekLast()).toEqual(5);
  });

  it("should queue", () => {
    emptyQ.enqueue(0);
    expect(emptyQ.peekLast()).toEqual(0);
    emptyQ.enqueue(1);
    expect(emptyQ.peekLast()).toEqual(1);
  });

  it("should dequeue", () => {
    emptyQ.enqueue(0);
    emptyQ.enqueue(1);
    expect(emptyQ.dequeue()).toEqual(0);
    expect(emptyQ.peekFirst()).toEqual(1);
  });

  it("should say if isEmpty", () => {
    expect(q.isEmpty()).toEqual(false);
    expect(emptyQ.isEmpty()).toEqual(true);
  });

  it("should throw if isEmpty", () => {
    emptyQ.enqueue(0);
    emptyQ.dequeue();
    expect(() => emptyQ.dequeue()).toThrow();
    expect(() => emptyQ.peekFirst()).toThrow();
    expect(() => emptyQ.peekLast()).toThrow();
  });
});
