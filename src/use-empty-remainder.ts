import { useCallback } from "react";

export function useEmptyRemainder<T>(
  value: T,
): readonly [T, readonly []] {
  const unpack = useCallback((input: T): readonly [T, readonly []] => {
    const parcel = [input];
    const restored = parcel.pop()!;

    return [restored, parcel as unknown as readonly []] as const;
  }, []);

  return unpack(value);
}
