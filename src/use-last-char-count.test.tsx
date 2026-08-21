import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useLastCharCount } from "./use-last-char-count";

describe("useLastCharCount", () => {
  it("counts the appearances of the final character", () => {
    const { result } = renderHook(() => useLastCharCount("banana"));

    expect(result.current).toBe(3);
  });

  it("returns zero for an empty string", () => {
    const { result } = renderHook(() => useLastCharCount(""));

    expect(result.current).toBe(0);
  });

  it("recomputes the count when the string changes", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLastCharCount(value),
      { initialProps: { value: "abca" } },
    );

    expect(result.current).toBe(2);

    rerender({ value: "abbc" });

    expect(result.current).toBe(1);
  });
});
