import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useGrandparentPrototype } from "./use-grandparent-prototype";

describe("useGrandparentPrototype", () => {
  it("returns the prototype of a plain object's prototype", () => {
    const { result } = renderHook(() => useGrandparentPrototype({}));

    expect(result.current).toBeNull();
  });

  it("returns the next prototype for an instance with a custom prototype", () => {
    class Example {}
    const { result } = renderHook(() => useGrandparentPrototype(new Example()));

    expect(result.current).toBe(Object.prototype);
  });

  it("repeats the detour for a replacement object", () => {
    class First {}
    class Second {}
    const first = new First();
    const second = new Second();
    const { result, rerender } = renderHook(
      ({ value }: { value: object }) => useGrandparentPrototype(value),
      { initialProps: { value: first } },
    );

    expect(result.current).toBe(Object.prototype);

    rerender({ value: second });

    expect(result.current).toBe(Object.prototype);
  });
});
