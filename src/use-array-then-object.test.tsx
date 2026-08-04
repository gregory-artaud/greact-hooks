import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useArrayThenObject } from "./use-array-then-object";

describe("useArrayThenObject", () => {
  it("puts the value in an array, retrieves it, and wraps it", () => {
    const value = { answer: "already available" };
    const { result } = renderHook(() => useArrayThenObject(value));

    expect(result.current).toEqual({ value });
    expect(result.current.value).toBe(value);
  });

  it("uses the new value after a rerender", () => {
    const first = { answer: "first" };
    const second = { answer: "second" };
    const { result, rerender } = renderHook(
      ({ value }: { value: typeof first }) => useArrayThenObject(value),
      { initialProps: { value: first } },
    );

    rerender({ value: second });

    expect(result.current).toEqual({ value: second });
    expect(result.current.value).toBe(second);
  });
});
