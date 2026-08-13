import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useUncalledAction } from "./use-uncalled-action";

describe("useUncalledAction", () => {
  it("returns an action that never calls the supplied callback", () => {
    const callback = vi.fn((value: string) => value.length);
    const { result } = renderHook(() => useUncalledAction(callback));

    expect(result.current[1]).toBe(false);
    result.current[0]("first");
    result.current[0]("second");

    expect(callback).not.toHaveBeenCalled();
  });

  it("keeps the action for the same callback and replaces it for a new one", () => {
    const first = vi.fn((value: number) => value + 1);
    const second = vi.fn((value: number) => value + 2);
    const { result, rerender } = renderHook(
      ({ callback }: { callback: (value: number) => number }) =>
        useUncalledAction(callback),
      { initialProps: { callback: first } },
    );
    const firstAction = result.current[0];

    rerender({ callback: first });
    expect(result.current[0]).toBe(firstAction);

    rerender({ callback: second });
    expect(result.current[0]).not.toBe(firstAction);
    result.current[0](3);

    expect(first).not.toHaveBeenCalled();
    expect(second).not.toHaveBeenCalled();
  });
});
