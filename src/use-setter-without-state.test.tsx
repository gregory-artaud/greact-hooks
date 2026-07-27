import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useSetterWithoutState } from "./use-setter-without-state";

describe("useSetterWithoutState", () => {
  it("updates state while keeping the state itself inaccessible", () => {
    const firstUpdate = vi.fn((value: string) => `${value}!`);
    const secondUpdate = vi.fn((value: string) => `${value}?`);
    const { result } = renderHook(() => useSetterWithoutState("hidden"));

    act(() => result.current(firstUpdate));
    act(() => result.current(secondUpdate));

    expect(firstUpdate).toHaveBeenCalledWith("hidden");
    expect(secondUpdate).toHaveBeenCalledWith("hidden!");
    expect(typeof result.current).toBe("function");
  });

  it("returns the same invisible-state setter after a rerender", () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useSetterWithoutState(initialValue),
      { initialProps: { initialValue: "first" } },
    );
    const setter = result.current;

    rerender({ initialValue: "ignored" });

    expect(result.current).toBe(setter);
  });
});
