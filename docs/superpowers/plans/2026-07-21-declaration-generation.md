# Declaration Generation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate non-empty TypeScript declarations that expose the library's existing `useInterval` API.

**Architecture:** Keep `tsconfig.app.json` as the source-file authority and point `vite-plugin-dts` at it explicitly. Add a small post-build Node script that verifies the declaration entry and the generated hook declaration using real build output.

**Tech Stack:** TypeScript 5.9, Vite 7, vite-plugin-dts 4, Node.js ESM, pnpm 10

---

### Task 1: Add the declaration regression check

**Files:**
- Create: `scripts/verify-declarations.mjs`
- Modify: `package.json:23-28`

- [ ] **Step 1: Write the failing build-output check**

Create `scripts/verify-declarations.mjs`:

```js
import { readFile } from "node:fs/promises";

const entryDeclaration = await readFile("dist/index.d.ts", "utf8");

if (/^export\s*\{\s*\}\s*;?$/m.test(entryDeclaration)) {
  throw new Error("dist/index.d.ts contains only an empty export");
}

const hookDeclaration = await readFile("dist/use-interval.d.ts", "utf8");

if (!hookDeclaration.includes("useInterval")) {
  throw new Error("useInterval is missing from generated declarations");
}
```

Add this script to `package.json`:

```json
"check:declarations": "pnpm run build && node scripts/verify-declarations.mjs"
```

- [ ] **Step 2: Run the check to verify it fails for the existing defect**

Run: `corepack pnpm check:declarations`

Expected: FAIL with `dist/index.d.ts contains only an empty export`.

- [ ] **Step 3: Commit the regression check**

```bash
git add package.json scripts/verify-declarations.mjs
git commit --no-gpg-sign -m "test: verify generated declarations"
```

### Task 2: Generate declarations from the application TypeScript project

**Files:**
- Modify: `vite.config.ts:6`

- [ ] **Step 1: Point vite-plugin-dts at the source TypeScript configuration**

Replace the plugin configuration with:

```ts
plugins: [
  react(),
  dts({
    insertTypesEntry: true,
    tsconfigPath: "./tsconfig.app.json",
  }),
],
```

- [ ] **Step 2: Run the declaration check to verify it passes**

Run: `corepack pnpm check:declarations`

Expected: PASS after Vite creates `dist/index.d.ts` and `dist/use-interval.d.ts`.

- [ ] **Step 3: Run the existing test suite**

Run: `corepack pnpm test`

Expected: 5 test files and 20 tests pass.

- [ ] **Step 4: Inspect the generated declaration entry**

Run: `node scripts/verify-declarations.mjs`

Expected: exit code 0 with no output.

- [ ] **Step 5: Commit the production fix**

```bash
git add vite.config.ts
git commit --no-gpg-sign -m "fix: generate library declarations"
```
