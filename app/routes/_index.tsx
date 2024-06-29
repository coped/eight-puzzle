import { useReducer } from "react";
import reducer, { createInitialState } from "~/features/puzzle/reducer";

export default function Index() {
  const [state, dispatch] = useReducer(reducer, createInitialState());

  return (
    <div>
      <p>Hi</p>
    </div>
  );
}
