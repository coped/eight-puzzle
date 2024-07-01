import { useReducer } from "react";

export const useOneWayToggle = (init: boolean) =>
  useReducer((s) => (s === init ? !s : s), init);
