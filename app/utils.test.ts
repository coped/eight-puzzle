import { describe, it, expect, beforeEach } from "vitest";
import { Assert, exch, naturalOrder, less, exch2D, shuffle } from "~/utils";
import { pos, type Pos } from "~/features/board/utils";

describe("utils", () => {
  describe("Assert", () => {
    describe("unreachable", () => {
      it("should throw", () => {
        expect(() => Assert.unreachable()).toThrow();
      });
    });

    describe("notImplemented", () => {
      it("should throw", () => {
        expect(() => Assert.notImplemented()).toThrow();
      });
    });

    describe("indexInRange", () => {
      let a: string[];

      beforeEach(() => {
        a = ["a"];
      });

      it("should throw for indices out of range", () => {
        expect(() => Assert.indexInRange(a, -1)).toThrow();
        expect(() => Assert.indexInRange(a, 1)).toThrow();
      });

      it("should not throw for valid indices", () => {
        expect(() => Assert.indexInRange(a, 0)).not.toThrow();
      });
    });
  });

  describe("exch", () => {
    let a: string[];

    beforeEach(() => {
      a = ["a", "b"];
    });
    it("should exchange elements", () => {
      exch(a, 0, 1);
      expect(a).toEqual(["b", "a"]);
    });

    it("should throw for indices out of range", () => {
      expect(() => exch(a, -1, 1)).toThrow();
      expect(() => exch(a, 0, 3)).toThrow();
    });
  });

  describe("exch2D", () => {
    let list: string[][];

    beforeEach(() => {
      list = [
        ["a", "b"],
        ["c", "d"],
      ];
    });

    it("should exchange elements", () => {
      const a: Pos = pos(0, 1);
      const b: Pos = pos(1, 0);
      exch2D(list, a, b);

      expect(list).toEqual([
        ["a", "c"],
        ["b", "d"],
      ]);
    });

    it("should throw for indices out of range", () => {
      const positions = [
        [pos(-1, 0), pos(0, 0)],
        [pos(0, 0), pos(-1, 0)],
        [pos(0, -1), pos(0, 0)],
        [pos(0, 0), pos(0, -1)],
        [pos(list.length, 0), pos(0, 0)],
        [pos(0, 0), pos(list.length, 0)],
        [pos(0, list.length), pos(0, 0)],
        [pos(0, 0), pos(0, list.length)],
      ] as const;

      positions.forEach(([a, b]) => {
        expect(() => exch2D(list, a, b)).toThrow();
      });
    });
  });

  describe("naturalOrder", () => {
    it("should return correct output for natural order", () => {
      expect(naturalOrder(1, 2)).toBeLessThan(0);
      expect(naturalOrder(1, 1)).toEqual(0);
      expect(naturalOrder(2, 1)).toBeGreaterThan(0);
    });
  });

  describe("less", () => {
    it("should return true for lesser items", () => {
      expect(less(1, 2, naturalOrder)).toEqual(true);
    });

    it("should return false for greater items", () => {
      expect(less(2, 1, naturalOrder)).toEqual(false);
    });
  });

  describe("shuffle", () => {
    let list: number[];

    beforeEach(() => {
      list = [1, 2, 3, 4, 5];
    });

    it("should shuffle array of items", () => {
      const copy = [...list];
      shuffle(copy);
      expect(copy).not.toEqual(list);
    });
  });
});
