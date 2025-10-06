import { useCallback } from "react";
import { useState2 } from "./use-state-2";

export function useToggleToggle(initialState = false) {
  const [state, setState] = useState2(initialState);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, [setState]);

  return [state, toggle] as const;
}
