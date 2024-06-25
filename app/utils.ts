import { type Pos } from "~/features/board/utils";

export type RecursiveMutable<T> = {
  -readonly [Property in keyof T]: RecursiveMutable<T[Property]>;
};

export type Action = { type: string; payload?: unknown };
export type IsAction<T extends Action> = T;
export type FromActions<T extends Record<string, (...args: any[]) => Action>> =
  IsAction<ReturnType<T[keyof T]>>;
export type MakeActionSelector<T, U extends Action> = Extract<U, { type: T }>;

export type Comparator<T> = (a: T, b: T) => -1 | 0 | 1;

export class Assert {
  public static unreachable = (): never => {
    throw new Error("Unreachable");
  };

  public static notImplemented = (): never => {
    throw new Error("Not implemented");
  };

  public static indexInRange = (a: unknown[], index: number): void => {
    if (index < 0 || index >= a.length)
      throw new Error(
        `Index out of range: ${index} for array of length ${a.length}`
      );
  };
}

export const exch = <T>(list: T[], a: number, b: number): void => {
  Assert.indexInRange(list, a);
  Assert.indexInRange(list, b);

  const tmp = list[a];
  list[a] = list[b];
  list[b] = tmp;
};

export const exch2D = <T>(list: T[][], a: Pos, b: Pos): void => {
  Assert.indexInRange(list, a.x);
  Assert.indexInRange(list, b.x);
  Assert.indexInRange(list[0], a.y);
  Assert.indexInRange(list[0], b.y);

  const tmp = list[a.y][a.x];
  list[a.y][a.x] = list[b.y][b.x];
  list[b.y][b.x] = tmp;
};

export const less = <T>(a: T, b: T, c: Comparator<T>): boolean => c(a, b) < 0;

export const naturalOrder: Comparator<number | string> = (a, b) => {
  if (a < b) return -1;
  else if (b < a) return 1;
  else return 0;
};

export const shuffle = <T>(a: T[]): void => {
  for (let i = 0; i < a.length; i++) {
    const swap = Math.floor(Math.random() * (i + 1));
    exch(a, swap, i);
  }
};
