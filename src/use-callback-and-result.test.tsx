import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCallbackAndResult } from "./use-callback-and-result";

describe("useCallbackAndResult", () => {
  it("returns the callback result beside the callback that produced it", () => {
    const callback = vi.fn(() => "result");
    const { result } = renderHook(() => useCallbackAndResult());

    const [value, source] = result.current(callback);

    expect(value).toBe("result");
    expect(source).toBe(callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("keeps the returned function stable across rerenders", () => {
    const { result, rerender } = renderHook(() => useCallbackAndResult());
    const first = result.current;

    rerender();

    expect(result.current).toBe(first);
  });

  it("runs the callback again for each invocation", () => {
    const callback = vi.fn(() => 1);
    const { result } = renderHook(() => useCallbackAndResult());

    result.current(callback);
    result.current(callback);

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
