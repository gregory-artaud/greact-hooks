import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useEitherWay } from "./use-either-way";

describe("useEitherWay", () => {
  it("returns the same value whichever way it is asked to choose", () => {
    const value = { answer: "unchanged" };
    const { result } = renderHook(() => useEitherWay(value));

    expect(result.current(true)).toBe(value);
    expect(result.current(false)).toBe(value);
  });

  it("only replaces its pointless choice when the value changes", () => {
    const first = { answer: "first" };
    const second = { answer: "second" };
    const { result, rerender } = renderHook(
      ({ value }) => useEitherWay(value),
      { initialProps: { value: first } },
    );
    const originalChoice = result.current;

    rerender({ value: first });
    expect(result.current).toBe(originalChoice);

    rerender({ value: second });
    expect(result.current).not.toBe(originalChoice);
    expect(result.current(true)).toBe(second);
    expect(result.current(false)).toBe(second);
  });
});
