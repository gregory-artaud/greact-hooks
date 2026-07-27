import { useState, type Dispatch, type SetStateAction } from "react";

export function useSetterWithoutState<T>(
  initialValue: T,
): Dispatch<SetStateAction<T>> {
  const [, setState] = useState<T>(() => initialValue);

  return setState;
}
