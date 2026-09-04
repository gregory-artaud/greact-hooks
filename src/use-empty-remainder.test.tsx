import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useEmptyRemainder } from "./use-empty-remainder";

describe("useEmptyRemainder", () => {
  it("returns the value and the empty parcel left after restoring it", () => {
    const value = { answer: 42 };
    const { result } = renderHook(() => useEmptyRemainder(value));

    expect(result.current[0]).toBe(value);
    expect(result.current[1]).toEqual([]);
    expect(result.current[1]).toHaveLength(0);
  });

  it("restores the new value and empties a new parcel after a rerender", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useEmptyRemainder(value),
      { initialProps: { value: 1 } },
    );

    rerender({ value: 2 });

    expect(result.current).toEqual([2, []]);
  });
});
