import { describe, it, expect, beforeEach } from "vitest";
import { MinPQ } from "./MinPQ";
import { naturalOrder } from "~/utils";

describe("MinPQ", () => {
  let pq: MinPQ<number>, emptyPq: MinPQ<number>;

  beforeEach(() => {
    pq = new MinPQ<number>(naturalOrder, [5, 4, 3, 2, 1]);
    emptyPq = new MinPQ<number>(naturalOrder);
  });

  it("should initialize heap with correct min", () => {
    expect(pq.min()).toEqual(1);
  });

  describe("min", () => {
    it("should return minimum item", () => {
      emptyPq.insert(1);
      expect(emptyPq.min()).toEqual(1);
    });

    it("should throw for empty heaps", () => {
      expect(() => emptyPq.min()).toThrow();
    });
  });

  describe("delMin", () => {
    it("should remove minimum item", () => {
      expect(pq.delMin()).toEqual(1);
      expect(pq.delMin()).toEqual(2);
      expect(pq.delMin()).toEqual(3);
    });

    it("should throw for empty heaps", () => {
      expect(() => emptyPq.delMin()).toThrow();
    });
  });

  it("should insert minimum item", () => {
    expect(pq.min()).toEqual(1);
    pq.insert(0);
    expect(pq.min()).toEqual(0);
  });

  it("should correctly return if isEmpty", () => {
    expect(pq.isEmpty()).toEqual(false);
    expect(emptyPq.isEmpty()).toEqual(true);
  });

  it("should correctly supplement a heapsort", () => {
    const ordered: number[] = [];
    while (!pq.isEmpty()) ordered.push(pq.delMin());

    expect(ordered).toEqual([1, 2, 3, 4, 5]);
  });
});
