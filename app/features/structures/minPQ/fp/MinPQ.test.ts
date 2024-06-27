import { describe, it, expect, beforeEach } from "vitest";
import { MinPQ } from "./MinPQ";
import { naturalOrder } from "~/utils";

describe("MinPQ", () => {
  let minHeap: number[];

  beforeEach(() => {
    minHeap = [Number.NEGATIVE_INFINITY, 1, 2, 3, 5, 4];
  });

  it("should construct", () => {
    expect(MinPQ.construct([5, 4, 3, 2, 1], naturalOrder)).toEqual(minHeap);
  });

  describe("min", () => {
    it("should return minimum item", () => {
      expect(MinPQ.min(minHeap)).toEqual(1);
    });

    it("should throw for empty heaps", () => {
      const emptyHeap = MinPQ.construct([], naturalOrder);
      expect(() => MinPQ.min(emptyHeap)).toThrow();
    });
  });

  describe("delMin", () => {
    it("should remove minimum item", () => {
      const [min, newMinHeap] = MinPQ.delMin(minHeap, naturalOrder);
      expect(min).toEqual(1);
      expect(newMinHeap).not.toContain(1);
      expect(MinPQ.min(newMinHeap)).toEqual(2);
    });

    it("should throw for empty heaps", () => {
      const emptyHeap = MinPQ.construct([], naturalOrder);
      expect(() => MinPQ.delMin(emptyHeap, naturalOrder)).toThrow();
    });
  });

  it("should insert minimum item", () => {
    expect(MinPQ.min(minHeap)).toEqual(1);
    const newMinHeap = MinPQ.insert(minHeap, 0, naturalOrder);
    expect(MinPQ.min(newMinHeap)).toEqual(0);
  });

  it("should correctly return if isEmpty", () => {
    const nonEmptyHeap = MinPQ.construct([0], naturalOrder);
    expect(MinPQ.isEmpty(nonEmptyHeap)).toEqual(false);

    const emptyHeap = MinPQ.construct([], naturalOrder);
    expect(MinPQ.isEmpty(emptyHeap)).toEqual(true);
  });

  it("should correctly supplement a heapsort", () => {
    let heap = MinPQ.construct([5, 4, 3, 2, 1], naturalOrder);
    const ordered: number[] = [];

    while (!MinPQ.isEmpty(heap)) {
      const [min, newHeap] = MinPQ.delMin(heap, naturalOrder);
      heap = newHeap;
      ordered.push(min);
    }

    expect(ordered).toEqual([1, 2, 3, 4, 5]);
  });
});
