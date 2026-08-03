import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useNegativeUnlessZero } from "./use-negative-unless-zero";

describe("useNegativeUnlessZero", () => {
  it("keeps zero and negates every other number", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useNegativeUnlessZero(value),
      { initialProps: { value: 0 } },
    );

    expect(result.current).toEqual({ value: 0 });

    rerender({ value: 4 });

    expect(result.current).toEqual({ value: -4 });
  });

  it("memoizes the object for the same input", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useNegativeUnlessZero(value),
      { initialProps: { value: 4 } },
    );
    const firstResult = result.current;

    rerender({ value: 4 });

    expect(result.current).toBe(firstResult);
  });
});
