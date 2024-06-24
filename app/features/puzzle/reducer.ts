import { type Action } from "~/utils";
import { Board, type State as BoardState } from "~/features/board/Board";
import { randomState, type Pos } from "~/features/board/utils";

/* State */

type State = {
  board: BoardState;
  prev: Pos[];
  solution: Pos[];
  turns: number;
  status: Status;
};

type Status = "PLAYING" | "WON";

/* Actions */

type Actions = Action;

const initialState: State = {
  board: new Board(randomState(3)).getState(),
  prev: [],
  solution: [],
  turns: 0,
  status: "PLAYING",
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
