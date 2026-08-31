import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCallbackThenObject } from "./use-callback-then-object";

describe("useCallbackThenObject", () => {
  it("calls a memoized callback only to put the value in an object", () => {
    const value = { answer: "already available" };
    const { result } = renderHook(() => useCallbackThenObject(value));

    expect(result.current).toEqual({ value });
    expect(result.current.value).toBe(value);
  });

  it("returns a fresh object after a rerender", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useCallbackThenObject(value),
      { initialProps: { value: "same" } },
    );
    const firstObject = result.current;

    rerender({ value: "same" });

    expect(result.current).toEqual({ value: "same" });
    expect(result.current).not.toBe(firstObject);
  });

  it("uses the new value after a rerender", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useCallbackThenObject(value),
      { initialProps: { value: "first" } },
    );

    rerender({ value: "second" });

    expect(result.current).toEqual({ value: "second" });
  });
});
