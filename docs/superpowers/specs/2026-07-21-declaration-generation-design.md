# Declaration Generation Design

## Goal

Generate usable TypeScript declarations for the library's existing public API. After a production build, `dist/index.d.ts` must expose `useInterval` instead of containing only `export {}`.

Adding `useTabShame` or changing the current public API is outside this change.

## Root Cause

`vite-plugin-dts` currently uses the root `tsconfig.json`. That file is a project-reference coordinator with an empty `files` list, so it provides no source files for declaration generation. The application configuration, `tsconfig.app.json`, includes `src` and is the configuration that describes the library source.

## Design

Configure `vite-plugin-dts` in `vite.config.ts` with `tsconfigPath: "./tsconfig.app.json"`. Keep `insertTypesEntry: true` and the existing Vite library build unchanged.

This is preferred over adding a second `include` list to the plugin because `tsconfig.app.json` remains the single source of truth for TypeScript source inclusion. The root project-reference configuration also remains unchanged.

## Verification

Add a small Node verification script that reads the generated declarations, plus a package script that runs the production build before that check. The check verifies:

- `dist/index.d.ts` exists.
- The declaration entry exposes `useInterval` directly or through a generated declaration module.
- The declaration entry is not the empty `export {}` placeholder.

Run the declaration check and the existing test suite to guard against type-output, runtime, and bundling regressions.

## Scope

Expected changes are limited to the DTS plugin configuration, the smallest suitable regression check, and removal of the unused React import reported when the source TypeScript project is loaded. No hook implementation, package API expansion, or other TypeScript cleanup is included.
