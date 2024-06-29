import { describe, it, beforeEach, expect } from "vitest";
import { SearchNode } from "./SearchNode";
import { Board } from "~/features/board/Board";

describe("SearchNode", () => {
  let board: Board, first: SearchNode, second: SearchNode, third: SearchNode;

  beforeEach(() => {
    board = new Board([
      [1, 2],
      [0, 3],
    ]);
    first = new SearchNode(board, 0, null);
    second = new SearchNode(board, 1, first);
    third = new SearchNode(board, 2, second);
  });

  it("should have correct priority", () => {
    expect(first.getPriority()).toEqual(1);
    expect(second.getPriority()).toEqual(2);
    expect(third.getPriority()).toEqual(3);
  });

  it("should correctly iterate through node tree", () => {
    let expectedTurns = 0;
    first.forEach((node) => {
      expect(node.turns).toEqual(expectedTurns++);
    });
  });
});
