import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useBindThenInvoke } from "./use-bind-then-invoke";

describe("useBindThenInvoke", () => {
  it("binds the callback and immediately invokes the bound copy", () => {
    const calls: string[] = [];
    const callback = (value: string, suffix: string): string => {
      calls.push(`${value}${suffix}`);
      return `${value}${suffix}`;
    };
    const { result } = renderHook(() => useBindThenInvoke(callback));

    expect(result.current("un", "necessary")).toBe("unnecessary");
    expect(calls).toEqual(["unnecessary"]);
  });

  it("keeps the wrapper until the callback changes", () => {
    const first = () => "first";
    const second = () => "second";
    const { result, rerender } = renderHook(
      ({ callback }: { callback: () => string }) =>
        useBindThenInvoke(callback),
      { initialProps: { callback: first } },
    );
    const firstWrapper = result.current;

    rerender({ callback: first });
    expect(result.current).toBe(firstWrapper);

    rerender({ callback: second });
    expect(result.current).not.toBe(firstWrapper);
    expect(result.current()).toBe("second");
  });
});
