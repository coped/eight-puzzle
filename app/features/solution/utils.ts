import { type Board } from "~/features/board/Board";
import { type Comparator } from "~/utils";
import { SearchNode } from "./SearchNode";
import { MinPQ } from "~/features/structures/minPQ/MinPQ";
import { Stack } from "~/features/structures/stack/Stack";

export const aStarSearch = (board: Board): Stack<Board> => {
  const solution: Stack<Board> = new Stack();

  const pq: MinPQ<SearchNode> = new MinPQ(searchNodeOrder);
  const twinPq: MinPQ<SearchNode> = new MinPQ(searchNodeOrder);

  pq.insert(new SearchNode(board, 0, null));
  twinPq.insert(new SearchNode(board.twin(), 0, null));

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const min = pq.delMin();
    const twinMin = twinPq.delMin();

    if (min.board.isGoal()) {
      min.forEach((node) => solution.push(node.board));
      break;
    } else if (twinMin.board.isGoal()) break;

    min.board.neighbors().forEach((neighbor) => {
      if (min.prev == null || !neighbor.equals(min.prev.board)) {
        pq.insert(new SearchNode(neighbor, min.turns + 1, min));
      }
    });

    twinMin.board.neighbors().forEach((neighbor) => {
      if (twinMin.prev == null || !neighbor.equals(twinMin.prev.board)) {
        twinPq.insert(new SearchNode(neighbor, twinMin.turns + 1, twinMin));
      }
    });
  }

  return solution;
};

const searchNodeOrder: Comparator<SearchNode> = (a, b) => {
  const aPriority = a.getPriority();
  const bPriority = b.getPriority();
  if (aPriority < bPriority) return -1;
  else if (bPriority < aPriority) return 1;
  else return 0;
};
