# gReact Hooks

> React hooks that answer questions nobody sensible has asked.

`gReact Hooks` is a React 19-compatible collection of technically functional abstractions with wildly inconsistent reasons to exist.

## Highlights
- Zero-footprint bundle: tree-shakeable ESM/CJS builds with type definitions out of the box.
- Hooks ranging from the occasionally defensible `useInterval` to `useZeroZero`, which returns the number JavaScript already had.
- No promise that installing this package will improve a project.

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
import { useSameSame, useZeroZero } from "greact-hooks";

function UnnecessaryArithmetic() {
  const zero = useZeroZero();
  const sameZero = useSameSame(zero);

  return <output>{sameZero}</output>;
}
```

## API Reference

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

### `useKeyMashExcuse(options?: UseKeyMashExcuseOptions): string | null`

Turns a hurried burst of typing into a calm, professionally unserious excuse. Your keyboard may be frantic, but this hook keeps the alibi polished.

```ts
interface UseKeyMashExcuseOptions {
  threshold?: number;
  pause?: number;
  messages?: readonly string[];
  document?: Document | null;
}

function useKeyMashExcuse(options?: UseKeyMashExcuseOptions): string | null;
```

```tsx
import { useKeyMashExcuse } from "greact-hooks";

function TypingIncidentReport() {
  const excuse = useKeyMashExcuse({
    threshold: 4,
    messages: ["That was an experimental keyboard solo."],
  });

  return <p>{excuse ?? "Everything is under control."}</p>;
}
```

- **Parameters:** `threshold` is the number of printable, non-repeating key presses required to trigger an excuse; it defaults to `4`, and finite values are rounded down with a minimum of `1`. `pause` is the milliseconds of keyboard silence that forget an unfinished mash; it defaults to `500`, while negative and non-finite values become `0` and `500` respectively. `messages` is the ordered, looping list of excuses; an empty list keeps the hook quiet. `document` optionally supplies the document to monitor and defaults to the current document; `null` disables monitoring.
- **Returns:** the next configured excuse after a qualifying key mash, otherwise `null`.
- **APIs and permissions:** uses `keydown` events and a timer. It needs no permission, network access, or knowledge of what the frantic typing actually meant.
- **Effects and compatibility:** while mounted, it installs one document keyboard listener and may hold one reset timer; both are removed on cleanup or when its document, threshold, or pause changes. It is inert during SSR or when the required document listener APIs are unavailable. It works in browsers with standard keyboard events.

Use it when “asdfjkl;” deserves a formal incident report instead of a backspace key.

### `useDoomScrollOracle(options?: UseDoomScrollOracleOptions): string | null`

Treats each stretch of scrolling as hard evidence that the page can predict a visitor's future. It cannot; it only counts scroll milestones and becomes increasingly confident anyway.

```ts
interface UseDoomScrollOracleOptions {
  distance?: number;
  messages?: readonly string[];
  window?: Window | null;
}

function useDoomScrollOracle(
  options?: UseDoomScrollOracleOptions,
): string | null;
```

```tsx
import { useDoomScrollOracle } from "greact-hooks";

function EndlessArticle() {
  const prophecy = useDoomScrollOracle({
    distance: 800,
    messages: ["You will discover another paragraph."],
  });

  return <aside>{prophecy ?? "Your fate is currently above the fold."}</aside>;
}
```

- **Parameters:** `distance` is the positive number of pixels between scroll milestones; it defaults to `1000`, and non-finite values use that default while finite values are rounded down with a minimum of `1`. `messages` is the ordered, looping list of prophecies; an empty list keeps the hook quiet. `window` optionally supplies the window to monitor (for example, an iframe's); it defaults to the current window, and `null` disables monitoring.
- **Returns:** the next configured prophecy after scrolling past a new milestone, otherwise `null`.
- **APIs and permissions:** uses `window` `scroll` events and `scrollY`. It needs no permission, network access, or actual knowledge of the future.
- **Effects and compatibility:** it installs one global scroll listener while mounted and removes it on cleanup or when its window or distance changes. A page opened past a milestone starts quietly, and one scroll event produces at most one prophecy even if a programmatic jump crosses several milestones. It is inert during SSR or when the required window listener APIs are unavailable. It works in browsers with standard scrolling events.

Use it when a long page needs a dubious oracle instead of a progress indicator.

### `useFocusFanfare(options?: UseFocusFanfareOptions): string | null`

Treats every focus change like the entrance of a minor royal. It does not play music, notify anyone, or improve accessibility; it merely gives the focus ring far more narrative importance than it deserves.

```ts
interface UseFocusFanfareOptions {
  messages?: readonly string[];
  document?: Document | null;
}

function useFocusFanfare(options?: UseFocusFanfareOptions): string | null;
```

```tsx
import { useFocusFanfare } from "greact-hooks";

function VeryImportantForm() {
  const fanfare = useFocusFanfare({
    messages: ["The email field has graced us with its presence."],
  });

  return (
    <>
      <input aria-label="Email" type="email" />
      <p>{fanfare ?? "Awaiting a suitably important entrance."}</p>
    </>
  );
}
```

- **Parameters:** `messages` is the ordered, looping list of announcements; an empty list silences the hook. `document` optionally supplies the document to observe (for example, one from an iframe); it defaults to the current document, and `null` disables observation.
- **Returns:** the next configured announcement after a `focusin` event, otherwise `null`.
- **APIs and permissions:** uses the DOM `focusin` event. It needs no permission, does not read the focused element, and does not make any sound despite its name.
- **Effects and compatibility:** it installs one document listener while mounted and removes it on cleanup or when the monitored document changes. It is inert during SSR or when the required listener APIs are unavailable. It works in browsers with standard bubbling focus events.

Use it when a form control needs a red-carpet entrance instead of ordinary, respectful focus management.

### `useClipboardSuspicion(options?: UseClipboardSuspicionOptions): string | null`

Treats every copy operation like the opening scene of a low-budget investigation. It never examines the copied text; apparently the existence of a duplicate is evidence enough.

```ts
interface UseClipboardSuspicionOptions {
  messages?: readonly string[];
  document?: Document | null;
}

function useClipboardSuspicion(
  options?: UseClipboardSuspicionOptions,
): string | null;
```

```tsx
import { useClipboardSuspicion } from "greact-hooks";

function EvidenceBoard() {
  const suspicion = useClipboardSuspicion({
    messages: ["A suspicious duplicate is now at large."],
  });

  return <p>{suspicion ?? "The clipboard currently has an alibi."}</p>;
}
```

- **Parameters:** `messages` is the ordered, looping list of accusations; an empty list clears and silences the hook. `document` optionally supplies the document to monitor (for example, one from an iframe); it defaults to the current document, and `null` disables monitoring.
- **Returns:** the next configured accusation after a `copy` event, otherwise `null`.
- **APIs and permissions:** uses the DOM `copy` event. It requests no clipboard permission and deliberately does not read, alter, or retain copied content.
- **Effects and compatibility:** it installs one document listener while mounted and removes it on cleanup or when the monitored document changes. It is inert during SSR or without usable event-listener APIs. Browsers with standard Clipboard Events are supported. Displaying its accusations may annoy users, so do not present them as real security warnings.

Use it when ordinary copy-and-paste needs theatrical suspicion instead of a useful confirmation toast.

### `useBackButtonRegret(options?: UseBackButtonRegretOptions): string | null`

Turns every browser history traversal into melodrama about revisiting old decisions. Despite the name, browsers do not reveal whether a `popstate` came from Back, Forward, or another history traversal, so the hook judges them all equally.

```ts
interface UseBackButtonRegretOptions {
  messages?: readonly string[];
  window?: Window | null;
}

function useBackButtonRegret(
  options?: UseBackButtonRegretOptions,
): string | null;
```

```tsx
import { useBackButtonRegret } from "greact-hooks";

function NavigationTherapist() {
  const regret = useBackButtonRegret({
    messages: ["History repeats itself, but with more clicking."],
  });

  return <p>{regret ?? "No navigation decisions have been questioned yet."}</p>;
}
```

- **Parameters:** `messages` is the ordered, looping list of regrets; an empty list clears and silences the hook. `window` optionally supplies the window to monitor (for example, one from an iframe); it defaults to the current window, and `null` disables monitoring.
- **Returns:** the next configured regret after a `popstate` event, otherwise `null`.
- **APIs and permissions:** uses the browser History API's `popstate` event. It needs no permission and neither reads nor changes history entries.
- **Effects and compatibility:** it installs one window listener while mounted and removes it on cleanup or when the monitored window changes. It is inert during SSR or without usable event-listener APIs. Browsers with the standard History API are supported. It cannot distinguish Back from Forward, and displaying its regrets may make ordinary navigation unnecessarily judgmental.

Use it when a router needs an unqualified therapist instead of another loading indicator.

### `useZeroZero(): number`

Retourne `0`, mais le fait mémoriser par React pour être absolument certain.

```ts
function useZeroZero(): number;
```

```tsx
import { useZeroZero } from "greact-hooks";

const zero = useZeroZero();
```

- **Paramètres :** aucun.
- **Retour :** le nombre `0`, à chaque rendu.
- **Alternative raisonnable :** écrire directement `0`.

Ce hook n'aurait jamais dû exister, car JavaScript savait déjà compter jusque-là.

### `useSameSame<T>(value: T): T`

Retourne exactement la valeur fournie, mais après lui avoir fait visiter `useMemo`.

```ts
function useSameSame<T>(value: T): T;
```

```tsx
import { useSameSame } from "greact-hooks";

const sameName = useSameSame("Greg");
```

- **Paramètre :** `value`, la valeur qui n'avait rien demandé.
- **Retour :** cette même valeur, avec la même référence.
- **Alternative raisonnable :** utiliser directement `value`.

Ce hook n'aurait jamais dû exister, car passer une valeur à travers React ne la rend pas plus identique.

### `useStateWithoutSetter<T>(initialValue: T): T`

Crée un état React, puis jette le seul moyen prévu pour le modifier.

```ts
function useStateWithoutSetter<T>(initialValue: T): T;
```

```tsx
import { useStateWithoutSetter } from "greact-hooks";

const permanentlyInitial = useStateWithoutSetter("still initial");
```

- **Paramètre :** `initialValue`, la valeur condamnée à rester initiale.
- **Retour :** l'état initial, sans setter et donc sans avenir.
- **Alternative raisonnable :** utiliser directement `initialValue`, ou `useState` si l'état doit réellement changer.

Ce hook n'aurait jamais dû exister, car retirer le setter de `useState` ne constitue pas une amélioration.

### `useRefRef<T>(initialValue: T): RefObject<RefObject<T>>`

Range une ref React dans une autre ref React, au cas où une seule couche d'indirection semblerait trop directe.

```ts
function useRefRef<T>(initialValue: T): RefObject<RefObject<T>>;
```

```tsx
import { useRefRef } from "greact-hooks";

const refRef = useRefRef("deeply unnecessary");
const value = refRef.current.current;
```

- **Paramètre :** `initialValue`, la valeur qui sera immobilisée deux niveaux plus loin.
- **Retour :** une ref stable dont `current` est une autre ref stable contenant la valeur initiale.
- **Alternative raisonnable :** utiliser directement `useRef(initialValue)`.

Ce hook n'aurait jamais dû exister, car une ref n'a pas besoin d'une ref pour la surveiller.

### `useEffectWithoutEffect(): void`

Planifie un effet React dont l'effet consiste à n'avoir aucun effet.

```ts
function useEffectWithoutEffect(): void;
```

```tsx
import { useEffectWithoutEffect } from "greact-hooks";

useEffectWithoutEffect();
```

- **Paramètres :** aucun.
- **Retour :** rien.
- **Alternative raisonnable :** ne rien faire du tout.

Ce hook n'aurait jamais dû exister, car React n'a pas besoin d'être prévenu quand rien ne doit arriver.

### `useCallbackCallback<Args extends unknown[], Return>(callback: (...args: Args) => Return): (...args: Args) => Return`

Mémorise une fonction, puis mémorise une autre fonction uniquement chargée d'appeler la première.

```ts
function useCallbackCallback<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => Return;
```

```tsx
import { useCallbackCallback } from "greact-hooks";

const greetAgain = useCallbackCallback((name: string) => `Hello ${name}`);
```

- **Paramètre :** `callback`, la fonction qui va subir deux couches d'attention.
- **Retour :** une fonction mémorisée qui appelle la fonction mémorisée.
- **Alternative raisonnable :** utiliser directement `useCallback(callback, [callback])`.

Ce hook n'aurait jamais dû exister, car un callback n'a pas besoin d'un callback pour le rappeler.

### `useTrueTrue(): boolean`

Retourne `true`, mais seulement après avoir demandé confirmation à React.

```ts
function useTrueTrue(): boolean;
```

```tsx
import { useTrueTrue } from "greact-hooks";

const stillTrue = useTrueTrue();
```

- **Paramètres :** aucun.
- **Retour :** `true`, obstinément.
- **Alternative raisonnable :** écrire directement `true`.

Ce hook n'aurait jamais dû exister, car le booléen était déjà vrai avant d'entrer dans React.

### `useTransitionWithoutTransition(): boolean`

Prépare une transition React, puis jette la fonction indispensable pour la démarrer.

```ts
function useTransitionWithoutTransition(): boolean;
```

```tsx
import { useTransitionWithoutTransition } from "greact-hooks";

const isNothingPending = useTransitionWithoutTransition();
```

- **Paramètres :** aucun.
- **Retour :** `false`, puisqu'aucune transition ne peut être lancée.
- **Alternative raisonnable :** écrire directement `false`.

Ce hook n'aurait jamais dû exister, car une transition sans moyen de démarrer est seulement une attente qui n'arrivera pas.

### `useEitherWay<T>(value: T): (either: boolean) => T`

Retourne une fonction qui exige un choix booléen, puis renvoie la même valeur dans les deux cas.

```ts
function useEitherWay<T>(value: T): (either: boolean) => T;
```

```tsx
import { useEitherWay } from "greact-hooks";

const chooseAnswer = useEitherWay("same answer");
const answer = chooseAnswer(false);
```

- **Paramètre :** `value`, la valeur déjà décidée avant le faux choix.
- **Retour :** une fonction qui retourne `value`, que son argument soit `true` ou `false`.
- **Alternative raisonnable :** utiliser directement `value`.

Ce hook n'aurait jamais dû exister, car demander un choix entre deux réponses identiques ne choisit rien.

## Roadmap
- Additional time-based hooks (timeouts, idle timers).
- Fetching helpers with suspense-first ergonomics.
- More abstractions that would be simpler without hooks.

## Contributing
Issues and pull requests are welcome! Run `pnpm test` and include coverage for new behaviour. For feature discussions, open a GitHub issue so we can design together.

## License
MIT © gReact Hooks contributors
