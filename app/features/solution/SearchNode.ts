import { type Board } from "~/features/board/Board";

export class SearchNode {
  public readonly board: Board;
  private priority: number;
  public readonly turns: number;
  public readonly prev: SearchNode | null;

  public constructor(board: Board, turns: number, prev: typeof this.prev) {
    this.board = board;
    this.turns = turns;
    this.priority = Number.POSITIVE_INFINITY;
    this.prev = prev;
  }

  public getPriority = (): number => {
    if (this.priority === Number.POSITIVE_INFINITY)
      this.priority = this.board.manhattan() + this.turns;
    return this.priority;
  };

  public forEach = (fn: (node: SearchNode) => unknown): void => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    for (let cur: SearchNode | null = this; cur; cur = cur.prev) fn(cur);
  };
}
