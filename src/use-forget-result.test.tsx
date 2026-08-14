import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useForgetResult } from "./use-forget-result";

describe("useForgetResult", () => {
  it("calls the callback and forgets its result", () => {
    const callback = vi.fn((value: string, count: number) =>
      `${value}-${count}`,
    );
    const { result } = renderHook(() => useForgetResult(callback));

    expect(result.current("answer", 2)).toBeUndefined();
    expect(callback).toHaveBeenCalledWith("answer", 2);
  });

  it("keeps the returned function stable for the same callback", () => {
    const callback = vi.fn(() => "ignored");
    const { result, rerender } = renderHook(() => useForgetResult(callback));
    const first = result.current;

    rerender();

    expect(result.current).toBe(first);
  });
});
