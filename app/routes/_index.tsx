import { useReducer } from "react";
import reducer, {
  createInitialState,
  actions,
  type State,
} from "~/features/puzzle/reducer";
import { Tile, type Props as TileProps } from "~/features/board/Tile";
import { isEqualPos, type Pos, pos } from "~/features/board/utils";

export default function Index() {
  const [state, dispatch] = useReducer(reducer, createInitialState());

  const isDisabled = state.status === "WON";

  const handleHint = () => dispatch(actions.hint());
  const handleMove = (y: number, x: number) => dispatch(actions.move(y, x));

  return (
    <>
      <div>{state.solution === null && "No solution"}</div>
      <div>
        <button onClick={handleHint} disabled={isDisabled}>
          Hint
        </button>
      </div>
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
    </>
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
