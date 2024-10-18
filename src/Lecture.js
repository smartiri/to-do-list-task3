import { React, useReducer } from "react";

function reducer(action, state) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
}
