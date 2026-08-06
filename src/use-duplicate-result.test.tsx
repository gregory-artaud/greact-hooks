import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDuplicateResult } from "./use-duplicate-result";

describe("useDuplicateResult", () => {
  it("calls the callback once and returns its result twice", () => {
    const resultObject = { answer: 42 };
    const callback = vi.fn((value: number) => ({ ...resultObject, value }));
    const { result } = renderHook(() => useDuplicateResult(callback));

    const pair = result.current(7);

    expect(pair).toEqual([{ answer: 42, value: 7 }, { answer: 42, value: 7 }]);
    expect(pair[0]).toBe(pair[1]);
    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith(7);
  });

  it("clears its recording between calls and uses a new callback after rerender", () => {
    const first = vi.fn(() => "first");
    const second = vi.fn(() => "second");
    const { result, rerender } = renderHook(
      ({ callback }: { callback: () => string }) => useDuplicateResult(callback),
      { initialProps: { callback: first } },
    );

    expect(result.current()).toEqual(["first", "first"]);
    rerender({ callback: second });
    expect(result.current()).toEqual(["second", "second"]);
    expect(first).toHaveBeenCalledOnce();
    expect(second).toHaveBeenCalledOnce();
  });
});
