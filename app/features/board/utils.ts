import { State } from "./Board";
import { shuffle } from "~/utils";

export type Pos = { x: number; y: number };
export const pos = (y: number, x: number): Pos => ({ x, y });

export const isEqualPos = (a: Pos, b: Pos): boolean =>
  a.y === b.y && a.x === b.x;

export const randomState = (dimension: number): State => {
  const indices: number[] = [];
  for (let i = 0; i < dimension * dimension; i++) indices.push(i);
  shuffle(indices);
  let indexPointer = 0;

  const board: State = [];
  for (let i = 0; i < dimension; i++) {
    const row: State[number] = [];
    for (let j = 0; j < dimension; j++) {
      row.push(indices[indexPointer++]);
    }
    board.push(row);
  }
  return board;
};
