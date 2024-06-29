import { describe, it, expect } from "vitest";
import { aStarSearch } from "./utils";
import { Board } from "~/features/board/Board";

describe("utils", () => {
  describe("aStarSearch", () => {
    it("should provide 1 step solution", () => {
      const board = new Board([
        [1, 2, 3],
        [4, 5, 6],
        [7, 0, 8],
      ]);

      const solution = aStarSearch(board);

      expect(solution.pop().getState()).toEqual(board.getState());
      expect(solution.pop().getState()).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],
      ]);
      expect(solution.isEmpty()).toEqual(true);
    });

    it("should provide 2 step solution", () => {
      const board = new Board([
        [1, 2, 3],
        [4, 5, 6],
        [0, 7, 8],
      ]);

      const solution = aStarSearch(board);

      expect(solution.pop().getState()).toEqual(board.getState());
      expect(solution.pop().getState()).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 0, 8],
      ]);
      expect(solution.pop().getState()).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],
      ]);
      expect(solution.isEmpty()).toEqual(true);
    });

    it("should provide empty stack when board is unsolvable", () => {
      const board = new Board([
        [1, 2, 3],
        [4, 5, 6],
        [8, 7, 0],
      ]);

      const solution = aStarSearch(board);

      expect(solution.isEmpty()).toEqual(true);
    });

    it("should handle when board is solution", () => {
      const board = new Board([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],
      ]);

      const solution = aStarSearch(board);

      expect(solution.pop().getState()).toEqual(board.getState());
      expect(solution.isEmpty()).toEqual(true);
    });
  });
});
