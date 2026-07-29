import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSplitAndRejoin } from "./use-split-and-rejoin";

describe("useSplitAndRejoin", () => {
  it("splits a string before pointlessly rejoining it", () => {
    const { result } = renderHook(() => useSplitAndRejoin("hook"));

    expect(result.current).toEqual([["h", "o", "o", "k"], "hook"]);
  });

  it("repeats the round trip for a replacement string", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useSplitAndRejoin(value),
      { initialProps: { value: "first" } },
    );
    const firstCharacters = result.current[0];

    rerender({ value: "next" });

    expect(result.current).toEqual([["n", "e", "x", "t"], "next"]);
    expect(result.current[0]).not.toBe(firstCharacters);
  });
});
