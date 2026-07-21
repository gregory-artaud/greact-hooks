import { readFile } from "node:fs/promises";

const entryDeclaration = await readFile("dist/index.d.ts", "utf8");

if (/^export\s*\{\s*\}\s*;?$/m.test(entryDeclaration)) {
  throw new Error("dist/index.d.ts contains only an empty export");
}

const hookDeclaration = await readFile("dist/use-interval.d.ts", "utf8");

if (!hookDeclaration.includes("useInterval")) {
  throw new Error("useInterval is missing from generated declarations");
}
