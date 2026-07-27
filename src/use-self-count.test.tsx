import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSelfCount } from "./use-self-count";

describe("useSelfCount", () => {
  it("returns a value beside the size of the collection containing only it", () => {
    const value = { answer: "alone" };
    const { result } = renderHook(() => useSelfCount(value));

    expect(result.current).toEqual([value, 1]);
    expect(result.current[0]).toBe(value);
  });

  it("recounts a replacement value as its sole occurrence", () => {
    const first = { answer: "first" };
    const second = { answer: "second" };
    const { result, rerender } = renderHook(
      ({ value }) => useSelfCount(value),
      { initialProps: { value: first } },
    );

    rerender({ value: second });

    expect(result.current).toEqual([second, 1]);
    expect(result.current[0]).toBe(second);
  });
});
