import cloneDeep from "lodash/cloneDeep";
import { exch2D } from "~/utils";
import { pos, Pos } from "./utils";

export type State = number[][];

export class Board {
  private readonly state: State;

  public constructor(board: State) {
    this.state = cloneDeep(board);
  }

  public getState = (): State => this.state;

  public static goalBoard = (dimension: number): Board => {
    const goal: State = [];

    let goalTile = 1;
    for (let i = 0; i < dimension; i++) {
      const row: number[] = [];
      for (let j = 0; j < dimension; j++) {
        if (goalTile === dimension * dimension) row.push(0);
        else row.push(goalTile++);
      }
      goal.push(row);
    }
    return new Board(goal);
  };

  public dimension = (): number => this.state.length;

  public manhattan = (): number => {
    let sum = 0;
    for (let i = 0; i < this.dimension(); i++) {
      for (let j = 0; j < this.dimension(); j++) {
        if (this.state[i][j] === 0) continue;
        const correctRow = Math.trunc(
          (this.state[i][j] - 1) / this.dimension()
        );
        const correctCol = (this.state[i][j] - 1) % this.dimension();

        sum += Math.abs(i - correctRow) + Math.abs(j - correctCol);
      }
    }
    return sum;
  };

  public isGoal = (): boolean => this.equals(Board.goalBoard(this.dimension()));

  public equals = (that: Board): boolean => {
    if (this.dimension() !== that.dimension()) return false;

    for (let i = 0; i < this.dimension(); i++) {
      for (let j = 0; j < this.dimension(); j++) {
        if (this.state[i][j] !== that.state[i][j]) return false;
      }
    }
    return true;
  };

  public neighbors = (): Board[] => {
    const neighbors: Board[] = [];

    let zero: Pos = pos(0, 0);
    for (let i = 0; i < this.dimension(); i++) {
      for (let j = 0; j < this.dimension(); j++) {
        if (this.state[i][j] === 0) {
          zero = pos(i, j);
          break;
        }
      }
    }

    const surroundings = [
      pos(zero.y - 1, zero.x),
      pos(zero.y, zero.x + 1),
      pos(zero.y + 1, zero.x),
      pos(zero.y, zero.x - 1),
    ] as const;

    surroundings.forEach((surrounding) => {
      if (this.isInBounds(surrounding)) {
        const neighbor = cloneDeep(this.state);
        exch2D(neighbor, zero, surrounding);
        neighbors.push(new Board(neighbor));
      }
    });

    return neighbors;
  };

  public twin = (): Board => {
    const twinState = cloneDeep(this.state);
    let a = pos(0, 0);
    let b = pos(1, 0);

    if (twinState[a.y][a.x] === 0) a = pos(0, 1);
    else if (twinState[b.y][b.x] === 0) b = pos(1, 1);

    exch2D(twinState, a, b);
    return new Board(twinState);
  };

  private isInBounds = (pos: Pos): boolean => {
    if (pos.x < 0 || pos.x >= this.dimension()) return false;
    if (pos.y < 0 || pos.y >= this.dimension()) return false;
    return true;
  };
}
