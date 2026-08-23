import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDiscardConfirmation } from "./use-discard-confirmation";

describe("useDiscardConfirmation", () => {
  it("confirms when the callback result is discarded as undefined", () => {
    const callback = vi.fn(() => undefined);
    const { result } = renderHook(() => useDiscardConfirmation(callback));

    expect(result.current()).toBe(true);
    expect(callback).toHaveBeenCalledOnce();
  });

  it("rejects a discarded result that was not undefined", () => {
    const callback = vi.fn(() => "discarded");
    const { result } = renderHook(() => useDiscardConfirmation(callback));

    expect(result.current()).toBe(false);
  });

  it("uses the replacement callback after a rerender", () => {
    const first = vi.fn((): string | undefined => undefined);
    const second = vi.fn((): string | undefined => "still discarded");
    const { result, rerender } = renderHook(
      ({ callback }: { callback: () => string | undefined }) =>
        useDiscardConfirmation(callback),
      { initialProps: { callback: first } },
    );

    const firstFunction = result.current;
    expect(firstFunction()).toBe(true);

    rerender({ callback: second });

    expect(result.current).not.toBe(firstFunction);
    expect(result.current()).toBe(false);
    expect(first).toHaveBeenCalledOnce();
    expect(second).toHaveBeenCalledOnce();
  });
});
