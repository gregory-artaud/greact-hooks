import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useFirstBackwards } from "./use-first-backwards";

describe("useFirstBackwards", () => {
  it("reverses a copy to recover the first value from the end", () => {
    const values = ["first", "second", "third"];
    const { result } = renderHook(() => useFirstBackwards(values));

    expect(result.current).toBe("first");
    expect(values).toEqual(["first", "second", "third"]);
  });

  it("repeats the backwards search after a rerender", () => {
    const { result, rerender } = renderHook(
      ({ values }: { values: readonly number[] }) =>
        useFirstBackwards(values),
      { initialProps: { values: [] } as { values: readonly number[] } },
    );

    expect(result.current).toBeUndefined();

    rerender({ values: [4, 5, 6] });

    expect(result.current).toBe(4);
  });
});
