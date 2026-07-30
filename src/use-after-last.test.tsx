import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useAfterLast } from "./use-after-last";

describe("useAfterLast", () => {
  it("counts a list and reads the predictably missing value after it", () => {
    const { result } = renderHook(() =>
      useAfterLast(["first", "second", "third"]),
    );

    expect(result.current).toEqual([3, undefined]);
  });

  it("recounts before checking beyond a replacement list", () => {
    const { result, rerender } = renderHook(
      ({ values }: { values: readonly number[] }) => useAfterLast(values),
      { initialProps: { values: [] } as { values: readonly number[] } },
    );

    expect(result.current).toEqual([0, undefined]);

    rerender({ values: [4, 5] });

    expect(result.current).toEqual([2, undefined]);
  });
});
