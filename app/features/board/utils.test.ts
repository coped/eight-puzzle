import { describe, it, expect, beforeEach } from "vitest";
import { pos, randomState, type Pos, isEqualPos } from "./utils";
import flattenDeep from "lodash/flattenDeep";

describe("board utils", () => {
  describe("pos", () => {
    it("should return position", () => {
      expect(pos(1, 0)).toEqual({ x: 0, y: 1 });
    });
  });

  describe("randomState", () => {
    let ns: number[];

    beforeEach(() => {
      ns = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    });

    it("should create random state", () => {
      const random = flattenDeep(randomState(3));
      ns.forEach((n) => expect(random).toContain(n));
      expect(random).not.toEqual(ns);
    });
  });

  describe("isEqualPos", () => {
    let control: Pos, same: Pos, diff: Pos;

    beforeEach(() => {
      control = { y: 0, x: 0 };
      same = { y: 0, x: 0 };
      diff = { y: 1, x: 1 };
    });

    it("should return true for equal pos", () => {
      expect(isEqualPos(control, same)).toEqual(true);
    });

    it("should return false for diff pos", () => {
      expect(isEqualPos(control, diff)).toEqual(false);
    });
  });
});
