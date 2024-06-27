import { FromActions, type MakeActionSelector, Assert } from "~/utils";
import { Board, type State as BoardState } from "~/features/board/Board";
import { randomState, type Pos } from "~/features/board/utils";
import { aStarSearch } from "~/features/solution/utils";
import { Queue } from "~/features/structures/queue/Queue";
import { toArray } from "~/features/structures/queue/utils";

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

type InitialState = IsBaseState<{
  board: BoardState;
  prev: [];
  solution: Pos[] | null;
  turns: 0;
  status: "INITIAL";
}>;

type PlayingState = IsBaseState<{
  board: BoardState;
  prev: Pos[];
  solution: Pos[] | null;
  turns: number;
  status: "PLAYING";
}>;

type WonState = IsBaseState<{
  board: BoardState;
  prev: Pos[];
  solution: [];
  turns: number;
  status: "WON";
}>;

type State = InitialState | PlayingState | WonState;

export const initialState: InitialState = {
  board: new Board(randomState(3)).getState(),
  prev: [],
  solution: [],
  turns: 0,
  status: "INITIAL",
};

/* Actions */

type Actions = FromActions<typeof actions>;
type SelectAction<T extends Actions["type"]> = MakeActionSelector<T, Actions>;

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

const reducer = (state: State, action: Actions): State => {
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
  board.move(y, x);
  return {
    ...state,
    board: board.getState(),
    prev: [...state.prev, zero],
    solution: [],
    turns: state.turns + 1,
    status: board.isGoal() ? "WON" : "PLAYING",
  };
};

const handleHint = (state: State): State => {
  if (state.status === "WON") return state;

  const solution = aStarSearch(new Board(state.board));
  if (solution.isEmpty()) return { ...state, solution: null };

  const steps: Queue<Pos> = new Queue();

  let first = solution.pop();
  while (!solution.isEmpty()) {
    const next = solution.pop();
    const diff = first.neighborDiff(next) ?? Assert.unreachable();
    steps.enqueue(diff);
    first = next;
  }

  return {
    ...state,
    solution: toArray(steps),
  };
};

export default reducer;
