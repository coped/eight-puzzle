import { describe, it, beforeEach, expect } from "vitest";
import reducer, {
  createInitialState,
  type InitialState,
  type PlayingState,
  actions,
  type Action,
  toWon,
  toPlaying,
} from "./reducer";

describe("reducer", () => {
  let initialState: InitialState,
    preWinState: PlayingState,
    move: (typeof actions)["move"],
    hint: (typeof actions)["hint"];

  beforeEach(() => {
    initialState = createInitialState([
      [1, 2, 3],
      [4, 0, 5],
      [6, 7, 8],
    ]);
    preWinState = {
      board: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 0, 8],
      ],
      initial: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 0, 8],
      ],
      turns: 1,
      solution: [],
      status: "PLAYING",
    };
    ({ move, hint } = actions);
  });

  describe("handleMove", () => {
    it("should handle valid move", () => {
      const state = reducer(initialState, move(1, 0));
      expect(state).toEqual({
        ...state,
        board: [
          [1, 2, 3],
          [0, 4, 5],
          [6, 7, 8],
        ],
        solution: [],
        turns: 1,
        status: "PLAYING",
      });
    });

    it("should handle invalid starting move", () => {
      const state = reducer(initialState, move(0, 0));
      expect(state).toEqual(initialState);
    });

    it("should transition to won state upon winning move", () => {
      const state = reducer(preWinState, move(2, 2));
      expect(state).toEqual({
        ...state,
        board: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 0],
        ],
        solution: [],
        turns: 2,
        status: "WON",
      });
    });
  });

  describe("handleHint", () => {
    it("should give 1 step path for winnable game", () => {
      const state = reducer(
        createInitialState([
          [1, 2, 3],
          [4, 5, 6],
          [7, 0, 8],
        ]),
        hint()
      );

      expect(state.solution).toEqual([{ y: 2, x: 2 }]);
    });

    it("should give 2 step path for winnable game", () => {
      const state = reducer(
        createInitialState([
          [1, 2, 3],
          [4, 5, 6],
          [0, 7, 8],
        ]),
        hint()
      );

      expect(state.solution).toEqual([
        { y: 2, x: 1 },
        { y: 2, x: 2 },
      ]);
    });

    it("should indicate when game is unwinnable", () => {
      const state = reducer(
        createInitialState([
          [1, 2, 3],
          [4, 5, 6],
          [8, 7, 0],
        ]),
        hint()
      );

      expect(state.solution).toEqual(null);
    });

    it("should handle when board is solved", () => {
      const state = reducer(toWon(toPlaying(createInitialState())), hint());

      expect(state.solution).toEqual([]);
    });
  });

  describe("default", () => {
    let state: InitialState;

    beforeEach(() => {
      state = createInitialState();
    });

    it("should be unreachable", () => {
      expect(() => reducer(state, {} as Action)).toThrow();
    });
  });
});
