import { type Queue } from "./Queue";

export const toArray = <T>(queue: Queue<T>): T[] => {
  const a: T[] = [];
  while (!queue.isEmpty()) a.push(queue.dequeue());
  return a;
};
