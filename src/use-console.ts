export function useConsole() {
  const consoleObj = console;

  if (!consoleObj) {
    return {
      log: () => {},
      warn: () => {},
      error: () => {},
    };
  }

  return consoleObj;
}
