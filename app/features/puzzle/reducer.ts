import { FromActions, type MakeActionSelector } from "~/utils";
import { Board, type State as BoardState } from "~/features/board/Board";
import { randomState, type Pos } from "~/features/board/utils";

/* State */

type Status = "PLAYING" | "WON";

type State = {
  board: BoardState;
  prev: Pos[];
  solution: Pos[];
  turns: number;
  status: Status;
};

export const initialState: State = {
  board: new Board(randomState(3)).getState(),
  prev: [],
  solution: [],
  turns: 0,
  status: "PLAYING",
};

/* Actions */

type Actions = FromActions<typeof actions>;
type SelectAction<T extends Actions["type"]> = MakeActionSelector<T, Actions>;

export const actions = {
  move: (row: number, column: number) =>
    ({
      type: "MOVE",
      payload: { row, column },
    } as const),
  another: () =>
    ({
      type: "ANOTHER",
    } as const),
} as const;

/* Reducer */

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "MOVE":
      return handleMove(state, action);
    default:
      return state;
  }
};

/* Handler */

const handleMove = (
  state: State,
  { payload: { row, column } }: SelectAction<"MOVE">
): State => {
  return state;
};

export default reducer;
