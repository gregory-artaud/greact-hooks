import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCallbackNameLength } from "./use-callback-name-length";

describe("useCallbackNameLength", () => {
  it("calls the callback and returns the length of its name", () => {
    let calls = 0;
    const callback = function namedCallback(value: string): string {
      calls += 1;
      return value;
    };
    const { result } = renderHook(() => useCallbackNameLength(callback));

    expect(result.current("discarded")).toBe("namedCallback".length);
    expect(calls).toBe(1);
  });

  it("does the same pointless measurement on every call", () => {
    let calls = 0;
    const callback = function callbackToMeasure(): string {
      calls += 1;
      return "ignored";
    };
    const { result } = renderHook(() => useCallbackNameLength(callback));

    expect(result.current()).toBe("callbackToMeasure".length);
    expect(result.current()).toBe("callbackToMeasure".length);
    expect(calls).toBe(2);
  });

  it("replaces the wrapper when the callback changes", () => {
    const first = function firstCallback(): string {
      return "first";
    };
    const second = function secondCallback(): string {
      return "second";
    };
    const { result, rerender } = renderHook(
      ({ callback }: { callback: () => string }) =>
        useCallbackNameLength(callback),
      { initialProps: { callback: first } },
    );
    const firstWrapper = result.current;

    rerender({ callback: first });
    expect(result.current).toBe(firstWrapper);

    rerender({ callback: second });
    expect(result.current).not.toBe(firstWrapper);
    expect(result.current()).toBe("secondCallback".length);
  });
});
