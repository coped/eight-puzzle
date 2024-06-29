import { describe, it, expect, beforeEach } from "vitest";
import { Stack } from "./Stack";

describe("Stack", () => {
  let stack: Stack<number>, emptyStack: Stack<number>;

  beforeEach(() => {
    stack = new Stack([1, 2, 3, 4, 5]);
    emptyStack = new Stack();
  });

  it("should construct", () => {
    const list = [1, 2, 3, 4, 5];
    while (!stack.isEmpty()) expect(stack.pop()).toEqual(list.pop());
  });

  it("should push", () => {
    stack.push(6);
    expect(stack.peek()).toEqual(6);
  });

  it("should pop", () => {
    expect(stack.pop()).toEqual(5);
  });

  it("should not pop if empty", () => {
    expect(() => emptyStack.pop()).toThrow();
  });

  it("should peek", () => {
    expect(stack.peek()).toEqual(5);
  });

  it("should not peek if empty", () => {
    expect(() => emptyStack.peek()).toThrow();
  });

  it("should return if isEmpty or not", () => {
    expect(stack.isEmpty()).toEqual(false);
    expect(emptyStack.isEmpty()).toEqual(true);
  });
});
