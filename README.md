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

### `useSelfCount<T>(value: T): readonly [T, number]`

Place une valeur dans une collection où elle est seule, puis compte combien de valeurs cette collection contient.

```ts
function useSelfCount<T>(value: T): readonly [T, number];
```

```tsx
import { useSelfCount } from "greact-hooks";

const [answer, occurrences] = useSelfCount("alone");
```

- **Paramètre :** `value`, la valeur placée toute seule pour faciliter exagérément le comptage.
- **Retour :** la valeur et le nombre `1`, puisque la collection ne contient rien d'autre.
- **Alternative raisonnable :** écrire directement `[value, 1]`.

Ce hook n'aurait jamais dû exister, car compter l'unique élément d'une collection créée exprès ne produit aucune information.

### `useWasteCall(): <T>(callback: () => T) => T`

Retourne une fonction qui appelle un callback deux fois, puis gaspille entièrement le résultat du second appel.

```ts
function useWasteCall(): <T>(callback: () => T) => T;
```

```tsx
import { useWasteCall } from "greact-hooks";

const wasteCall = useWasteCall();
const firstResult = wasteCall(() => calculate());
```

- **Paramètres :** aucun.
- **Retour :** une fonction stable qui appelle `callback` deux fois et retourne uniquement le premier résultat.
- **Alternative raisonnable :** appeler directement le callback une seule fois.

Ce hook n'aurait jamais dû exister, car refaire un travail uniquement pour jeter son résultat est strictement moins bien.

### `useSetterWithoutState<T>(initialValue: T): Dispatch<SetStateAction<T>>`

Crée un état React, jette sa valeur et ne conserve que le moyen de modifier cette valeur désormais invisible.

```ts
function useSetterWithoutState<T>(
  initialValue: T,
): Dispatch<SetStateAction<T>>;
```

```tsx
import { useSetterWithoutState } from "greact-hooks";

const setInvisibleState = useSetterWithoutState("hidden");
setInvisibleState("still hidden");
```

- **Paramètre :** `initialValue`, la première valeur que personne ne pourra lire.
- **Retour :** le setter stable d'un état volontairement inaccessible.
- **Alternative raisonnable :** utiliser directement `useState` et garder la valeur, ou ne rien faire.

Ce hook n'aurait jamais dû exister, car modifier un état impossible à consulter est une activité sans résultat.

### `useNoChangeReducer<T>(initialValue: T): readonly [T, DispatchWithoutAction]`

Crée un reducer dont le dispatch demande un changement, puis reprend exactement le même état.

```ts
function useNoChangeReducer<T>(
  initialValue: T,
): readonly [T, DispatchWithoutAction];
```

```tsx
import { useNoChangeReducer } from "greact-hooks";

const [value, refuseChange] = useNoChangeReducer("unchanged");
refuseChange();
```

- **Paramètre :** `initialValue`, la valeur que le reducer refusera ensuite de modifier.
- **Retour :** la valeur initiale et un dispatch stable qui ne change rien.
- **Alternative raisonnable :** utiliser directement `initialValue` et ne proposer aucune action.

Ce hook n'aurait jamais dû exister, car une commande incapable de produire le moindre changement est seulement une façon compliquée de ne rien faire.

### `useRefThenWrap<T>(value: T): { value: T }`

Demande à une ref de mémoriser la valeur, ignore cette mémoire, puis enveloppe la valeur courante dans un nouvel objet.

```ts
function useRefThenWrap<T>(value: T): { value: T };
```

```tsx
import { useRefThenWrap } from "greact-hooks";

const wrapped = useRefThenWrap("already available");
```

- **Paramètre :** `value`, la valeur inutilement confiée à une ref avant d'être utilisée directement.
- **Retour :** un nouvel objet `{ value }` à chaque rendu.
- **Alternative raisonnable :** écrire directement `{ value }`.

Ce hook n'aurait jamais dû exister, car oublier une ref avant de fabriquer un objet ordinaire ne constitue pas une abstraction.

### `useIdLength(): number`

Demande un identifiant à React, le jette, puis retourne uniquement son nombre de caractères.

```ts
function useIdLength(): number;
```

```tsx
import { useIdLength } from "greact-hooks";

const discardedIdLength = useIdLength();
```

- **Paramètres :** aucun.
- **Retour :** la longueur de l'identifiant React qui vient d'être rendu inaccessible.
- **Alternative raisonnable :** écrire directement `useId().length` si cette information inutile est vraiment nécessaire.

Ce hook n'aurait jamais dû exister, car compter un identifiant tout en refusant de le fournir est une abstraction sans objet.

### `useSplitAndRejoin(value: string): readonly [readonly string[], string]`

Découpe une chaîne en caractères, puis les rejoint pour récupérer la chaîne déjà fournie.

```ts
function useSplitAndRejoin(
  value: string,
): readonly [readonly string[], string];
```

```tsx
import { useSplitAndRejoin } from "greact-hooks";

const [characters, pointlesslyRestored] = useSplitAndRejoin("hook");
```

- **Paramètre :** `value`, la chaîne que React doit superviser pendant qu'elle devient brièvement des caractères.
- **Retour :** ces caractères et la même chaîne reconstruite à partir d'eux.
- **Alternative raisonnable :** utiliser directement `value` et `[...value]`.

Ce hook n'aurait jamais dû exister, car découper une chaîne n'est pas un cycle de vie.

### `useTypeTwice<T>(value: T): () => readonly [string, string]`

Retourne un callback qui copie une valeur, vérifie que la copie est l'original, puis annonce deux fois son type déjà évident.

```ts
function useTypeTwice<T>(
  value: T,
): () => readonly [string, string];
```

```tsx
import { useTypeTwice } from "greact-hooks";

const reportTypeTwice = useTypeTwice("hook");
const redundantTypes = reportTypeTwice();
```

- **Paramètre :** `value`, la valeur dont le type doit attendre un callback React.
- **Retour :** une fonction qui retourne deux fois le résultat de `typeof value`.
- **Alternative raisonnable :** écrire directement `typeof value`.

Ce hook n'aurait jamais dû exister, car le type d'une valeur n'a besoin ni d'un rendez-vous ni d'un doublon.

### `usePlusOneProof(value: number): readonly [number, 1]`

Ajoute `1` à un nombre, puis retourne aussi le `1` comme preuve inutile de l'opération.

```ts
function usePlusOneProof(value: number): readonly [number, 1];
```

```tsx
import { usePlusOneProof } from "greact-hooks";

const [incremented, unnecessaryProof] = usePlusOneProof(4);
```

- **Paramètre :** `value`, le nombre qui pouvait être incrémenté sans supervision de React.
- **Retour :** `value + 1` et le littéral `1` qui révèle exactement comment revenir en arrière.
- **Alternative raisonnable :** écrire directement `value + 1`.

Ce hook n'aurait jamais dû exister, car une addition n'a pas besoin de fournir sa propre pièce justificative.

### `useFirstBackwards<T>(values: readonly T[]): T | undefined`

Copie un tableau, l'inverse, puis prend son dernier élément pour retrouver le premier élément original.

```ts
function useFirstBackwards<T>(values: readonly T[]): T | undefined;
```

```tsx
import { useFirstBackwards } from "greact-hooks";

const firstAfterDetour = useFirstBackwards(["first", "second", "third"]);
```

- **Paramètre :** `values`, le tableau qui doit faire demi-tour avant de livrer son premier élément.
- **Retour :** le premier élément de `values`, ou `undefined` si le tableau est vide.
- **Alternative raisonnable :** écrire directement `values[0]`.

Ce hook n'aurait jamais dû exister, car le début d'un tableau n'est pas plus accessible depuis sa copie inversée.

### `useAfterLast<T>(values: readonly T[]): readonly [number, T | undefined]`

Compte un tableau, puis lit l'élément situé juste après sa fin pour confirmer l'absence déjà garantie.

```ts
function useAfterLast<T>(
  values: readonly T[],
): readonly [number, T | undefined];
```

```tsx
import { useAfterLast } from "greact-hooks";

const [count, predictablyMissing] = useAfterLast(["first", "second"]);
```

- **Paramètre :** `values`, le tableau dont la fin doit être dépassée avec précision.
- **Retour :** sa longueur et l'élément à cet index, donc `undefined`.
- **Alternative raisonnable :** utiliser directement `values.length` et ne pas lire après la fin.

Ce hook n'aurait jamais dû exister, car connaître la fin d'un tableau suffit pour ne pas la dépasser.

### `useCallbackNow<T>(callback: () => T): T`

Mémorise un callback pour plus tard, puis l'appelle immédiatement.

```ts
function useCallbackNow<T>(callback: () => T): T;
```

```tsx
import { useCallbackNow } from "greact-hooks";

const result = useCallbackNow(() => "déjà disponible");
```

- **Paramètre :** `callback`, la fonction qui n'aura finalement pas à attendre.
- **Retour :** le résultat immédiat de `callback`.
- **Alternative raisonnable :** appeler directement `callback()`.

Ce hook n'aurait jamais dû exister, car mémoriser l'avenir ne sert à rien quand on l'exécute tout de suite.

### `useReadThenErase<T>(value: T): { readonly value: T | undefined }`

Retourne la valeur lors de la première lecture de la propriété, puis efface cette réponse.

```ts
function useReadThenErase<T>(
  value: T,
): { readonly value: T | undefined };
```

```tsx
import { useReadThenErase } from "greact-hooks";

const answer = useReadThenErase("déjà disponible");
const firstRead = answer.value;
const secondRead = answer.value;
```

- **Paramètre :** `value`, la valeur qui n'avait besoin que d'être lue.
- **Retour :** un objet dont `value` fournit `value` une fois, puis `undefined`.
- **Alternative raisonnable :** utiliser directement `value`.

Ce hook n'aurait jamais dû exister, car une propriété n'a aucune raison de s'autodétruire après avoir répondu.

### `useLowerThenUpper(value: string): string`

Transforme une chaîne en minuscules, puis transforme immédiatement le résultat en majuscules.
Une personne raisonnable écrirait directement `value.toLowerCase().toUpperCase()`.

```ts
function useLowerThenUpper(value: string): string;
```

```tsx
import { useLowerThenUpper } from "greact-hooks";

const loud = useLowerThenUpper("MiXeD"); // "MIXED"
```

- **Paramètre :** `value`, la chaîne à faire passer par deux transformations de casse.
- **Retour :** la chaîne mise en minuscules puis en majuscules.
- **Alternative raisonnable :** écrire directement `value.toLowerCase().toUpperCase()`.

Ce hook n'aurait jamais dû exister, car React n'améliore pas une transformation de chaîne en la regardant faire un détour.

### `usePopThenPeek<T>(values: readonly T[]): T | undefined`

Copie un tableau uniquement pour en retirer le dernier élément et vous le rendre.

```ts
function usePopThenPeek<T>(values: readonly T[]): T | undefined;
```

```tsx
import { usePopThenPeek } from "greact-hooks";

const last = usePopThenPeek(["first", "last"]); // "last"
```

- **Paramètre :** `values`, le tableau à copier avant de lui retirer son dernier élément.
- **Retour :** le dernier élément de `values`, ou `undefined` si le tableau est vide.
- **Alternative raisonnable :** utiliser directement `values.at(-1)`.

Ce hook n'aurait jamais dû exister, car copier un tableau avant de jeter son dernier élément n'améliore pas sa lecture.

### `useCeilThenFloor(value: number): number`

Arrondit un nombre vers le haut, puis arrondit immédiatement le résultat vers le bas. Cela revient exactement à `Math.ceil(value)`.

```ts
function useCeilThenFloor(value: number): number;
```

```tsx
import { useCeilThenFloor } from "greact-hooks";

const rounded = useCeilThenFloor(1.2); // 2
```

- **Paramètre :** `value`, le nombre à faire passer par deux arrondis incompatibles mais redondants.
- **Retour :** le résultat de `Math.floor(Math.ceil(value))`.
- **Alternative raisonnable :** écrire directement `Math.ceil(value)`.

Ce hook n'aurait jamais dû exister, car arrondir deux fois ne devient pas plus utile parce que React est présent.

### `useCallbackWithNothing<Args extends unknown[], Return>(callback: (...args: Args) => Return): (...args: Args) => readonly [Return, undefined]`

Appelle un callback, puis range son résultat à côté de `undefined` dans un tuple. Le vide est fourni avec une rigueur mémoïsée.

```ts
function useCallbackWithNothing<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => readonly [Return, undefined];
```

```tsx
import { useCallbackWithNothing } from "greact-hooks";

const getResultAndNothing = useCallbackWithNothing(() => "résultat");
const [result, nothing] = getResultAndNothing(); // "résultat", undefined
```

- **Paramètre :** `callback`, la fonction à appeler plus tard.
- **Retour :** une fonction mémoïsée qui renvoie le résultat du callback et `undefined`.
- **Alternative raisonnable :** appeler directement le callback, ou utiliser `useCallback` sans ajouter le tuple.

Ce hook n'aurait jamais dû exister, car ajouter une case vide à un résultat ne crée pas une information.

### `useEraseThenReverse(value: string): string`

Supprime le dernier caractère d'une chaîne, puis inverse tout ce qui reste. React supervise cette petite marche arrière sans raison.

```ts
function useEraseThenReverse(value: string): string;
```

```tsx
import { useEraseThenReverse } from "greact-hooks";

const result = useEraseThenReverse("abcd"); // "cba"
```

- **Paramètre :** `value`, la chaîne à raccourcir et à inverser.
- **Retour :** la chaîne privée de son dernier caractère, puis renversée.
- **Alternative raisonnable :** écrire directement `value.slice(0, -1).split("").reverse().join("")`.

Ce hook n'aurait jamais dû exister, car une découpe et une inversion ne deviennent pas une responsabilité React.

### `useNegativeUnlessZero(value: number): { readonly value: number }`

Inverse un nombre sauf quand il vaut zéro, puis range le résultat dans un objet dont personne n'avait besoin.

```ts
function useNegativeUnlessZero(value: number): { readonly value: number };
```

```tsx
import { useNegativeUnlessZero } from "greact-hooks";

const result = useNegativeUnlessZero(4); // { value: -4 }
```

- **Paramètre :** `value`, le nombre qui doit subir une inversion conditionnelle.
- **Retour :** un objet mémorisé contenant `value` inchangé pour zéro, ou son opposé dans les autres cas.
- **Alternative raisonnable :** écrire directement `{ value: value === 0 ? value : -value }`.

Ce hook n'aurait jamais dû exister, car une négation conditionnelle n'a besoin ni de React ni d'un objet cérémoniel.

## Roadmap
- Additional time-based hooks (timeouts, idle timers).
- Fetching helpers with suspense-first ergonomics.
- More abstractions that would be simpler without hooks.

## Contributing
Issues and pull requests are welcome! Run `pnpm test` and include coverage for new behaviour. For feature discussions, open a GitHub issue so we can design together.

## License
MIT © gReact Hooks contributors
