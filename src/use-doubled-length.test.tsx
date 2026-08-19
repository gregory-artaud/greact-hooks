import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDoubledLength } from "./use-doubled-length";

describe("useDoubledLength", () => {
  it("duplicates a list before reporting its original length", () => {
    const { result } = renderHook(() => useDoubledLength(["first", "second"]));

    expect(result.current).toEqual({ value: 2 });
  });

  it("uses the replacement list after a rerender", () => {
    const { result, rerender } = renderHook(
      ({ values }: { values: readonly number[] }) => useDoubledLength(values),
      { initialProps: { values: [1] } },
    );

    rerender({ values: [1, 2, 3] });

    expect(result.current).toEqual({ value: 3 });
  });
});
