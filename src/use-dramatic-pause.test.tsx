import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDramaticPause } from "./use-dramatic-pause";

describe("useDramaticPause", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("declares a dramatic pause after the chosen delay", () => {
    const { result } = renderHook(() => useDramaticPause(100));

    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(99);
    });
    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe(true);
  });

  it("turns a new pointer movement into a fresh pause", () => {
    const { result } = renderHook(() => useDramaticPause(100));

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new Event("pointermove"));
    });
    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe(true);
  });

  it("restarts its timer when the delay changes", () => {
    const { result, rerender } = renderHook(
      ({ delay }) => useDramaticPause(delay),
      { initialProps: { delay: 100 } },
    );

    act(() => {
      vi.advanceTimersByTime(50);
    });

    rerender({ delay: 20 });
    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(19);
    });
    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe(true);
  });

  it("treats an invalid delay as an immediate overreaction", () => {
    const { result } = renderHook(() => useDramaticPause(-1));

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current).toBe(true);
  });

  it("removes its listener and timer when unmounted", () => {
    const removeEventListener = vi.spyOn(window, "removeEventListener");
    const { result, unmount } = renderHook(() => useDramaticPause(100));

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "pointermove",
      expect.any(Function),
    );

    act(() => {
      window.dispatchEvent(new Event("pointermove"));
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe(false);
  });
});
