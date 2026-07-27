import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRefThenWrap } from "./use-ref-then-wrap";

describe("useRefThenWrap", () => {
  it("wraps the value after pointlessly storing it in a ref", () => {
    const value = { answer: "already available" };
    const { result } = renderHook(() => useRefThenWrap(value));

    expect(result.current).toEqual({ value });
    expect(result.current.value).toBe(value);
  });

  it("wraps the current value in a fresh object after a rerender", () => {
    const first = { answer: "first" };
    const second = { answer: "second" };
    const { result, rerender } = renderHook(
      ({ value }) => useRefThenWrap(value),
      { initialProps: { value: first } },
    );
    const firstWrapper = result.current;

    rerender({ value: second });

    expect(result.current).toEqual({ value: second });
    expect(result.current.value).toBe(second);
    expect(result.current).not.toBe(firstWrapper);
  });
});
