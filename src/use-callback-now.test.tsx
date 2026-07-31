import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCallbackNow } from "./use-callback-now";

describe("useCallbackNow", () => {
  it("memoizes a callback only to call it immediately", () => {
    const callback = vi.fn(() => "already available");
    const { result } = renderHook(() => useCallbackNow(callback));

    expect(result.current).toBe("already available");
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("repeats the immediate call after a rerender", () => {
    const first = vi.fn(() => "first");
    const second = vi.fn(() => "second");
    const { result, rerender } = renderHook(
      ({ callback }) => useCallbackNow(callback),
      { initialProps: { callback: first } },
    );

    rerender({ callback: second });

    expect(result.current).toBe("second");
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
  });
});
