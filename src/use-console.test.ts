import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { useConsole } from "./use-console";

describe("useConsole", () => {
  let originalConsole: Console;

  beforeEach(() => {
    originalConsole = globalThis.console;
  });

  afterEach(() => {
    globalThis.console = originalConsole;
  });

  it("returns the existing global console when available", () => {
    const result = useConsole();
    expect(result).toBe(originalConsole);
  });

  it("provides a noop console when the global console is missing", () => {
    // Simulate environments (like SSR) where console might not exist.
    // @ts-expect-error - override for test scenario
    globalThis.console = undefined;

    const result = useConsole();

    expect(typeof result.log).toBe("function");
    expect(typeof result.warn).toBe("function");
    expect(typeof result.error).toBe("function");

    expect(result).not.toBe(originalConsole);
    expect(() => result.log("noop")).not.toThrow();
  });
});
