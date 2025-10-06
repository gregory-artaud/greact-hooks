import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useHook } from "./use-hook";

describe("useHook", () => {
  it("throws when hook param is not a function", () => {
    expect(() =>
      renderHook(() => useHook({ hook: null as unknown as () => void, name: "useExample" })),
    ).toThrowError("Invalid hook");
  });

  it("throws when name does not start with use", () => {
    const hook = vi.fn();
    expect(() => renderHook(() => useHook({ hook, name: "hook" }))).toThrowError("Invalid hook");
  });

  it("returns a callback that runs the provided hook", () => {
    const underlyingHook = vi.fn();
    const { result } = renderHook(() => useHook({ hook: underlyingHook, name: "useUnderlying" }));

    result.current();

    expect(underlyingHook).toHaveBeenCalledTimes(1);
  });

  it("memoizes the callback while inputs stay the same", () => {
    const underlyingHook = vi.fn();
    const { result, rerender } = renderHook(
      ({ hook, name }) => useHook({ hook, name }),
      { initialProps: { hook: underlyingHook, name: "useStable" } },
    );

    const first = result.current;

    rerender({ hook: underlyingHook, name: "useStable" });

    expect(result.current).toBe(first);
  });

  it("returns a new callback when the hook changes", () => {
    const firstHook = vi.fn();
    const secondHook = vi.fn();
    const { result, rerender } = renderHook(
      ({ hook }) => useHook({ hook, name: "useDynamic" }),
      { initialProps: { hook: firstHook } },
    );

    const first = result.current;

    rerender({ hook: secondHook });

    expect(result.current).not.toBe(first);
  });
});
