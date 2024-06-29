import { Assert, type ValueOf, type IsAction } from "~/utils";
import { Board, type State as BoardState } from "~/features/board/Board";
import { randomState, type Pos, pos } from "~/features/board/utils";
import { aStarSearch } from "~/features/solution/utils";

/* State */

type Status = "INITIAL" | "PLAYING" | "WON";

type IsBaseState<T extends BaseState> = T;
type BaseState = {
  board: BoardState;
  prev: Pos[];
  solution: Pos[] | null;
  turns: number;
  status: Status;
};

export type InitialState = IsBaseState<{
  board: BoardState;
  prev: [];
  solution: Pos[] | null;
  turns: 0;
  status: "INITIAL";
}>;

export type PlayingState = IsBaseState<{
  board: BoardState;
  prev: Pos[];
  solution: Pos[] | null;
  turns: number;
  status: "PLAYING";
}>;

export type WonState = IsBaseState<{
  board: BoardState;
  prev: Pos[];
  solution: [];
  turns: number;
  status: "WON";
}>;

export type State = InitialState | PlayingState | WonState;

export const createInitialState = (
  boardState: BoardState = randomState(3)
): InitialState => ({
  board: boardState,
  prev: [],
  solution: [],
  turns: 0,
  status: "INITIAL",
});

/* Actions */

export type Action = IsAction<ReturnType<ValueOf<typeof actions>>>;
type SelectAction<T extends Action["type"]> = Extract<Action, { type: T }>;

export const actions = {
  move: (y: number, x: number) =>
    ({
      type: "PUZZLE/MOVE",
      payload: { y, x },
    } as const),
  hint: () =>
    ({
      type: "PUZZLE/HINT",
    } as const),
} as const;

/* Reducer */

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "PUZZLE/MOVE":
      return handleMove(state, action);
    case "PUZZLE/HINT":
      return handleHint(state);
    default:
      return Assert.unreachable();
  }
};

/* Handler */

const handleMove = (
  state: State,
  { payload: { y, x } }: SelectAction<"PUZZLE/MOVE">
): State => {
  const board = new Board(state.board);
  const zero = board.getZero();
  const move = pos(y, x);
  if (board.isValidMove(move)) {
    board.move(move);

    return {
      ...state,
      board: board.getState(),
      prev: [...state.prev, zero],
      solution: [],
      turns: state.turns + 1,
      status: board.isGoal() ? "WON" : "PLAYING",
    };
  } else {
    return state;
  }
};

const handleHint = (state: State): State => {
  if (state.status === "WON") return state;

  const solution = aStarSearch(new Board(state.board));
  if (solution.isEmpty()) return { ...state, solution: null };

  const steps: Pos[] = [];

  // Discard the first board since it represents the
  // current state, not the next board in the solution
  solution.pop();

  while (!solution.isEmpty()) steps.push(solution.pop().getZero());

  return {
    ...state,
    solution: steps,
  };
};

/* State transitions */

export const toWon = (state: PlayingState): WonState => ({
  ...state,
  solution: [],
  status: "WON",
});

export const toPlaying = (state: InitialState): PlayingState => ({
  ...state,
  status: "PLAYING",
});

export default reducer;
