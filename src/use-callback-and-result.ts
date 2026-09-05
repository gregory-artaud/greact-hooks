import { useReducer } from "react";

export type CallbackAndResult = <Return>(
  callback: () => Return,
) => readonly [Return, () => Return];

export function useCallbackAndResult(): CallbackAndResult {
  const [getResult] = useReducer<CallbackAndResult, undefined, []>(
    (current) => current,
    undefined,
    () => <Return>(callback: () => Return) => {
      const parcel = [callback()];
      const result = parcel.pop()!;

      return [result, callback] as const;
    },
  );

  return getResult;
}
