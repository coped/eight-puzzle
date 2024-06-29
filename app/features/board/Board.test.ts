import { describe, it, expect, beforeEach } from "vitest";
import { Board } from "./Board";
import { pos, type Pos } from "./utils";

describe("Board", () => {
  describe("dimension", () => {
    let two: Board, three: Board;

    beforeEach(() => {
      two = new Board([
        [1, 2],
        [3, 0],
      ]);

      three = new Board([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],
      ]);
    });

    it("should return dimension for two", () => {
      expect(two.dimension()).toEqual(2);
    });

    it("should return dimension for three", () => {
      expect(three.dimension()).toEqual(3);
    });
  });

  it("should return manhattan distance", () => {
    const a = new Board([
      [1, 2],
      [3, 0],
    ]);
    expect(a.manhattan()).toEqual(0);

    const b = new Board([
      [0, 2],
      [3, 1],
    ]);
    expect(b.manhattan()).toEqual(2);

    const c = new Board([
      [0, 1],
      [2, 3],
    ]);
    expect(c.manhattan()).toEqual(4);
  });

  it("should return state", () => {
    const initial = [
      [1, 2],
      [3, 0],
    ];
    expect(new Board(initial).getState()).toEqual(initial);
  });

  describe("isGoal", () => {
    it("should return true if goal board", () => {
      const board = new Board([
        [1, 2],
        [3, 0],
      ]);
      expect(board.isGoal()).toEqual(true);
    });

    it("should return false if not goal board", () => {
      const board = new Board([
        [0, 1],
        [2, 3],
      ]);
      expect(board.isGoal()).toEqual(false);
    });
  });

  describe("equals", () => {
    let control: Board, same: Board, different: Board;

    beforeEach(() => {
      control = new Board([
        [1, 2],
        [3, 0],
      ]);
      same = new Board([
        [1, 2],
        [3, 0],
      ]);
      different = new Board([
        [0, 1],
        [2, 3],
      ]);
    });

    it("should return true for equal boards", () => {
      expect(control.equals(same)).toEqual(true);
    });

    it("should return false for different boards", () => {
      expect(control.equals(different)).toEqual(false);
    });

    it("should return false for boards of different dimensions", () => {
      const board = new Board([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],
      ]);
      expect(control.equals(board)).toEqual(false);
    });
  });

  describe("neighbors", () => {
    const testNeighbors = (board: Board, expectedNeighbors: Board[]) => {
      let neighborEqualToExpected = 0;
      let expectedEqualToNeighbor = 0;

      board.neighbors().forEach((neighbor) => {
        expectedNeighbors.forEach((expectedNeighbor) => {
          if (neighbor.equals(expectedNeighbor)) neighborEqualToExpected++;
        });
      });

      expectedNeighbors.forEach((expectedNeighbor) => {
        board.neighbors().forEach((neighbor) => {
          if (expectedNeighbor.equals(neighbor)) expectedEqualToNeighbor++;
        });
      });

      expect(neighborEqualToExpected).toEqual(expectedEqualToNeighbor);
      expect(neighborEqualToExpected).toEqual(expectedNeighbors.length);
    };

    it("should return correct neighbors for corner space", () => {
      const board = new Board([
        [1, 2],
        [3, 0],
      ]);
      const expected = [
        new Board([
          [1, 2],
          [0, 3],
        ]),
        new Board([
          [1, 0],
          [3, 2],
        ]),
      ];
      testNeighbors(board, expected);
    });

    it("should return correct neighbors for wall space", () => {
      const board = new Board([
        [1, 2, 3],
        [4, 5, 0],
        [7, 8, 6],
      ]);
      const expected = [
        new Board([
          [1, 2, 0],
          [4, 5, 3],
          [7, 8, 6],
        ]),
        new Board([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 0],
        ]),
        new Board([
          [1, 2, 3],
          [4, 0, 5],
          [7, 8, 6],
        ]),
      ];
      testNeighbors(board, expected);
    });

    it("should return correct neighbors for surrounded space", () => {
      const board = new Board([
        [1, 2, 3],
        [4, 0, 6],
        [7, 5, 8],
      ]);
      const expected = [
        new Board([
          [1, 0, 3],
          [4, 2, 6],
          [7, 5, 8],
        ]),
        new Board([
          [1, 2, 3],
          [4, 6, 0],
          [7, 5, 8],
        ]),
        new Board([
          [1, 2, 3],
          [4, 5, 6],
          [7, 0, 8],
        ]),
        new Board([
          [1, 2, 3],
          [0, 4, 6],
          [7, 5, 8],
        ]),
      ];
      testNeighbors(board, expected);
    });
  });

  describe("twin", () => {
    it("should return twin", () => {
      const board = new Board([
        [1, 2],
        [3, 0],
      ]);
      expect(board.twin().getState()).toEqual([
        [3, 2],
        [1, 0],
      ]);
    });

    it("should return twin ignoring empty space in first row", () => {
      const board = new Board([
        [0, 1],
        [2, 3],
      ]);
      expect(board.twin().getState()).toEqual([
        [0, 2],
        [1, 3],
      ]);
    });

    it("should return twin ignoring empty space in second row", () => {
      const board = new Board([
        [1, 2],
        [0, 3],
      ]);
      expect(board.twin().getState()).toEqual([
        [3, 2],
        [0, 1],
      ]);
    });
  });

  describe("getZero", () => {
    it.each([
      [
        [
          [1, 2],
          [3, 0],
        ],
        pos(1, 1),
      ],
      [
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 0],
        ],
        pos(2, 2),
      ],
      [
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 0, 8],
        ],
        pos(2, 1),
      ],
      [
        [
          [1, 2, 3],
          [4, 0, 5],
          [6, 7, 8],
        ],
        pos(1, 1),
      ],
    ])("should get zero", (state, expectedZero) => {
      const board = new Board(state);
      expect(board.getZero()).toEqual(expectedZero);
    });
  });

  describe("isValidMove", () => {
    let board: Board;

    beforeEach(() => {
      board = new Board([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],
      ]);
    });

    it("should return true for valid moves", () => {
      const move: Pos = pos(2, 1);
      expect(board.isValidMove(move)).toEqual(true);
    });

    it("should return false for invalid moves", () => {
      const move: Pos = pos(0, 0);
      expect(board.isValidMove(move)).toEqual(false);
    });

    it("should return false for diagonal moves", () => {
      const move: Pos = pos(1, 1);
      expect(board.isValidMove(move)).toEqual(false);
    });

    it("should return false for out of bounds moves", () => {
      const move: Pos = pos(10, 10);
      expect(board.isValidMove(move)).toEqual(false);
    });
  });

  describe("move", () => {
    it("should move", () => {
      const board = new Board([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],
      ]);
      board.move(pos(2, 1));
      expect(board.getState()).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 0, 8],
      ]);
    });
  });
});
