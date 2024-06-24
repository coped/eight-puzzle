import { Comparator } from "~/utils";
import { MinPQ as FPMinPQ } from "./fp/MinPQ";
import { isEmpty, insert, delMin } from "./utils";

export class MinPQ<T> {
  private readonly heap: T[];
  private readonly c: Comparator<T>;

  public constructor(c: Comparator<T>, init: T[] = []) {
    this.c = c;
    this.heap = FPMinPQ.construct(init, c);
  }

  public insert = (item: T): void => insert(this.heap, item, this.c);

  public min = (): T => {
    if (this.isEmpty()) throw new Error("Priority queue is empty");
    else return this.heap[1];
  };

  public delMin = (): T => {
    if (this.isEmpty()) throw new Error("Priority queue is empty.");
    return delMin(this.heap, this.c);
  };

  public isEmpty = (): boolean => isEmpty(this.heap);
}
