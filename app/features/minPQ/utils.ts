import { Comparator, exch, less } from "~/utils";

/**
 * The following utility functions assume a priority queue
 * implemented with a min binary heap
 */

export const insert = <T>(heap: T[], item: T, c: Comparator<T>): void => {
  heap.push(item);
  swim(heap, heap.length - 1, c);
};

export const delMin = <T>(heap: T[], c: Comparator<T>): T => {
  const min = heap[1];
  exch(heap, 1, heap.length - 1);
  heap.pop();
  sink(heap, 1, c);
  return min;
};

export const sink = <T>(heap: T[], i: number, c: Comparator<T>): void => {
  while (2 * i <= heap.length - 1) {
    let j = 2 * i;
    if (j < heap.length - 1 && !less(heap[j], heap[j + 1], c)) j++;
    if (less(heap[i], heap[j], c)) break;
    exch(heap, i, j);
    i = j;
  }
};

export const swim = <T>(heap: T[], i: number, c: Comparator<T>): void => {
  while (i > 1 && less(heap[i], heap[Math.trunc(i / 2)], c)) {
    exch(heap, i, Math.trunc(i / 2));
    i = Math.trunc(i / 2);
  }
};

export const isEmpty = <T>(state: T[]): boolean => state.length < 2;
