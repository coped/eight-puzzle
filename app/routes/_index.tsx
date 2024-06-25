import { useReducer } from "react";
import reducer, { initialState } from "~/features/puzzle/reducer";

export default function Index() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Hi</p>
    </div>
  );
}
