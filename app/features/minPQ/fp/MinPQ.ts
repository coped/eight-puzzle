import cloneDeep from "lodash/cloneDeep";
import { Comparator } from "~/utils";
import { sink, isEmpty, insert, delMin } from "../utils";

export class MinPQ {
  public static insert = <T>(heap: T[], item: T, c: Comparator<T>): T[] => {
    const copy = cloneDeep(heap);
    insert(copy, item, c);
    return copy;
  };

  public static min = <T>(heap: T[]): T => {
    if (isEmpty(heap)) throw new Error("Priority queue is empty");
    else return cloneDeep(heap[1]);
  };

  public static delMin = <T>(heap: T[], c: Comparator<T>): [T, T[]] => {
    if (isEmpty(heap)) throw new Error("Priority queue is empty");
    const copy = cloneDeep(heap);
    const min = delMin(copy, c);
    return [min, copy];
  };

  public static construct = <T>(state: T[], c: Comparator<T>): T[] => {
    const copy = [Number.NEGATIVE_INFINITY as T, ...cloneDeep(state)];
    for (let k = Math.trunc(copy.length / 2); k >= 1; k--) {
      sink(copy, k, c);
    }

    return copy;
  };

  public static isEmpty = <T>(heap: T[]): boolean => isEmpty(heap);
}
