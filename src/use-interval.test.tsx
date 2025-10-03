import { describe, it, vi, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useInterval } from "./use-interval";

describe("useInterval", () => {
  it("ticks", async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    renderHook(() => useInterval(fn, 100));
    vi.advanceTimersByTime(350);
    expect(fn).toHaveBeenCalledTimes(3);
    vi.useRealTimers();
  });
});
