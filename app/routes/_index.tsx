import { useReducer } from "react";
import reducer, {
  createInitialState,
  actions,
  type State,
} from "~/features/puzzle/reducer";
import { Tile, type Props as TileProps } from "~/features/board/Tile";
import { isEqualPos, type Pos, pos } from "~/features/board/utils";
import { useOneWayToggle } from "~/hooks";

export default function Index() {
  const [state, dispatch] = useReducer(reducer, createInitialState());
  const [seenResetWarning, setSeenResetWarning] = useOneWayToggle(false);
  const [seenNewWarning, setSeenNewWarning] = useOneWayToggle(false);

  const isDisabled = state.status === "WON";

  const handleHint = () => dispatch(actions.hint());
  const handleMove = (y: number, x: number) => dispatch(actions.move(y, x));
  const handleReset = () => {
    if (seenResetWarning) {
      dispatch(actions.reset());
    } else {
      const msg =
        "Your board will reset back to the start.\n\nAny current progress will be lost. Continue?";
      if (window.confirm(msg)) dispatch(actions.reset());
      setSeenResetWarning();
    }
  };
  const handleNew = () => {
    if (seenNewWarning) {
      dispatch(actions.new());
    } else {
      const msg =
        "You will be given a new board.\n\nAny current progress will be lost. Continue?";
      if (window.confirm(msg)) dispatch(actions.new());
      setSeenNewWarning();
    }
  };

  return (
    <div className="app">
      <h1 className="title">Eight Puzzle</h1>
      <hr className="hr" />
      <div className="board">
        {state.board.map((row, y) => (
          <div key={y} className="row">
            {row.map((tile, x) => (
              <Tile
                y={y}
                x={x}
                key={`${y}-${x}`}
                onClick={handleMove}
                disabled={isDisabled}
                type={tileType(pos(y, x), tile, state.solution)}
              >
                {tile}
              </Tile>
            ))}
          </div>
        ))}
      </div>
      <hr className="hr" />
      <div className="buttons">
        <button className="button" onClick={handleNew} title="Get a new board">
          New
        </button>
        <button
          className="button"
          onClick={handleReset}
          title="Reset board back to start"
        >
          Reset
        </button>
        <button
          className="button"
          onClick={handleHint}
          disabled={isDisabled}
          title="Get a hint toward the solution"
        >
          Hint
        </button>
      </div>
      <p className="messages">{message(state)}</p>
    </div>
  );
}

const tileType = (
  pos: Pos,
  tile: number,
  solution: State["solution"]
): TileProps["type"] => {
  if (tile === 0) return "ZERO";
  else if (
    solution !== null &&
    solution.length > 0 &&
    isEqualPos(pos, solution[0])
  )
    return "SOLUTION";
  else return "DEFAULT";
};

const message = (state: State): string => {
  if (state.status === "WON") {
    return "You won!";
  } else if (state.solution === null) {
    return "This board is unsolvable.";
  } else {
    return "";
  }
};
