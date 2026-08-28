import { useMemo } from "react";

export function useAppendThenRestore(value: string): readonly [string, string] {
  return useMemo(() => {
    const appended = `${value}!`;
    const restored = appended.slice(0, -1);

    return [appended, restored] as const;
  }, [value]);
}
