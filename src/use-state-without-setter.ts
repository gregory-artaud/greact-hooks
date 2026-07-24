import { useState } from "react";

export function useStateWithoutSetter<T>(initialValue: T): T {
  const [state] = useState<T>(() => initialValue);

  return state;
}
