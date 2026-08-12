import { useDebugValue } from "react";

export function useParityPick<T>(values: readonly T[]): T | undefined {
  const count = values.length;
  const parcel = [values[count % 2]];
  const picked = parcel[0];

  useDebugValue(picked);

  return picked;
}
