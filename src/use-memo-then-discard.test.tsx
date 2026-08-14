import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useMemoThenDiscard } from "./use-memo-then-discard";

describe("useMemoThenDiscard", () => {
  it("returns the value after memoizing and discarding an unnecessary wrapper", () => {
    const value = { answer: "already available" };
    const { result } = renderHook(() => useMemoThenDiscard(value));

    expect(result.current).toEqual({ value });
    expect(result.current.value).toBe(value);
  });

  it("returns a fresh wrapper even when the memoized input does not change", () => {
    const { result, rerender } = renderHook(() => useMemoThenDiscard("same"));
    const firstWrapper = result.current;

    rerender();

    expect(result.current).toEqual({ value: "same" });
    expect(result.current).not.toBe(firstWrapper);
  });

  it("uses the new value after a rerender", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useMemoThenDiscard(value),
      { initialProps: { value: "first" } },
    );

    rerender({ value: "second" });

    expect(result.current).toEqual({ value: "second" });
  });
});
