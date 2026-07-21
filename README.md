# gReact Hooks

> The definitive React hook collection built around `useState2`, the evolution of `useState` you always wanted.

`gReact Hooks` delivers production-ready hooks designed for modern React 19 apps. At its heart is `useState2`, a fully backwards-compatible drop-in replacement for `useState` that adds smarter state ergonomics, safer concurrency, and zero learning curve. Pair it with utility hooks like `useInterval` and you have a rock-solid foundation for stateful UI logic.

## Highlights
- Turbocharged `useState2` keeps the familiar API while unlocking partial patches, immutable snapshots, and ergonomic updater functions.
- Zero-footprint bundle: tree-shakeable ESM/CJS builds with type definitions out of the box.
- Optimised for React 19 with Concurrent Mode safety baked in.
- Battle-tested utilities (`useInterval`, more coming) to cover everyday patterns without boilerplate.

## Installation
```bash
# npm
npm install greact-hooks

# pnpm
pnpm add greact-hooks

# yarn
yarn add greact-hooks
```

## Quick Start
```tsx
import { useState2, useInterval } from "greact-hooks";

function PresenceBadge({ userId }: { userId: string }) {
  const [presence, setPresence] = useState2({ status: "offline", lastSeen: 0 });

  useInterval(() => {
    fetch(`/api/presence/${userId}`)
      .then((res) => res.json())
      .then((next) => setPresence(next));
  }, 3_000);

  return (
    <span data-status={presence.status}>
      {presence.status === "online" ? "●" : "○"} Updated {presence.lastSeen}s ago
    </span>
  );
}
```
`setPresence` accepts full values, partial patches, or updater functions — whichever keeps your code cleanest.

## Why `useState2` Is a Game Changer
`useState2` keeps everything you love about `useState`, but upgrades the parts that always felt clunky:
- **Immutable snapshots**: reads are backed by a read-only proxy, so accidental mutation bugs disappear.
- **Partial updates for objects**: pass `{ status: "online" }` and let `useState2` merge the rest for you.
- **Functional updates with context**: updater functions receive a snapshot, not the live mutable state, so you can branch logic safely.
- **Zero migration cost**: replace your imports and stop thinking about refactors — the signature stays `[state, setState]`.

## API Reference

### `useState2<T>(initialState: T)`
- **Parameters**
  - `initialState`: any serialisable or composite value (object, array, primitive).
- **Returns**: `[state, setState]` tuple.
  - `state`: a shallow-cloned, read-only snapshot of the latest state.
  - `setState(next)` accepts a value, partial patch, or updater function `(prev) => next` and merges intelligently.
- **Guarantees**
  - Shallow clones prevent reference sharing between renders.
  - Patches merge like `setState` in class components where it makes sense.
  - Functional updates can safely derive new state without mutation side effects.

```ts
const [todo, setTodo] = useState2({ title: "", done: false });
setTodo({ done: true }); // merges: { title: "", done: true }
setTodo((prev) => ({ ...prev, title: prev.title.trim() }));
```

### `useInterval(callback: () => void, delay: number | null)`
- Runs `callback` on a stable cadence and cleans up automatically when the component unmounts or `delay` changes.
- Pass `null` to pause the interval without removing the hook.

```ts
useInterval(() => setTick((n) => n + 1), 1000);
```

### `useDramaticPause(delay?: number): boolean`

Declares a dramatic pause whenever the pointer has stayed still for long enough. It cannot tell whether anyone is actually thinking; it simply promotes every quiet cursor to a suspenseful plot point.

```ts
function useDramaticPause(delay?: number): boolean;
```

```tsx
import { useDramaticPause } from "greact-hooks";

function IndecisiveButton() {
  const isDramatic = useDramaticPause(1_500);

  return <button>{isDramatic ? "..." : "Make a decision"}</button>;
}
```

- **Parameter:** `delay` is the number of milliseconds without a `pointermove` event before the pause becomes dramatic. It defaults to `1000`; negative and non-finite values become `0` for an immediate overreaction.
- **Returns:** `true` while the current pointer silence has reached that delay, otherwise `false`.
- **APIs and permissions:** uses `window` `pointermove` events and a timer. It needs no permission and reads no pointer coordinates.
- **Effects and compatibility:** while mounted, it installs one global pointer listener and timer, both removed on cleanup. It returns `false` during SSR or when the required event-listener APIs are unavailable. Pointer Events are supported by current evergreen browsers.

Use it when a hesitant cursor deserves an unnecessary orchestral swell instead of sensible product design.

### `useTabJealousy(options?: UseTabJealousyOptions): string | null`

Lets a browser tab issue a calm, entirely unjustified reproach after the visitor comes back from another tab.

```ts
interface UseTabJealousyOptions {
  messages?: readonly string[];
  document?: Document | null;
}

function useTabJealousy(options?: UseTabJealousyOptions): string | null;
```

```tsx
import { useTabJealousy } from "greact-hooks";

function GuiltyDashboard() {
  const gossip = useTabJealousy({
    messages: ["Oh, you are back.", "The DOM says it is not upset."],
  });

  return <p>{gossip ?? "This tab is pretending to be fine."}</p>;
}
```

- **Parameters:** `messages` is the ordered, looping list of reproaches; an empty list keeps the hook quiet. `document` optionally supplies the document to monitor (for example, one from an iframe); it defaults to the current document, and `null` disables monitoring.
- **Returns:** the next message only after that document goes from `hidden` to `visible`, otherwise `null`.
- **APIs and permissions:** uses the Document Visibility API (`visibilitychange` and `visibilityState`). It needs no permission, network access, or knowledge of where the visitor went.
- **Effects and compatibility:** it attaches one document listener while mounted and removes it on cleanup or when the monitored document changes. It returns `null` without a usable document or listener APIs. It works in browsers that support the Document Visibility API and is inert during SSR.

Use it when your interface needs to guilt-trip a multitasker instead of respecting their healthy tab-switching habits.

## `useState2` vs React `useState`
| Feature | `useState2` | React `useState` |
| --- | --- | --- |
| Drop-in `[state, setState]` | ✅ | ✅ |
| Accepts partial object patches | ✅ | ❌ |
| Protects against accidental mutation | ✅ (read-only snapshot) | ❌ |
| Functional updates with merged results | ✅ | ⚠️ manual merge |
| Ships typed definitions | ✅ | ✅ |

Once you go `useState2`, you will not look back.

## Roadmap
- Additional time-based hooks (timeouts, idle timers).
- Fetching helpers with suspense-first ergonomics.
- `useState2` devtools integrations and diagnostics.

## Contributing
Issues and pull requests are welcome! Run `pnpm test` and include coverage for new behaviour. For feature discussions, open a GitHub issue so we can design together.

## License
MIT © gReact Hooks contributors
