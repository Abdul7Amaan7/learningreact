import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'state',
  number: 5,
  title: 'State Management',
  tagline: 'useState, immutability, batching, derived values, and lifting state.',
  topics: [
    topic(
      'what-is-state',
      'What is state?',
      'State is data a component owns that can change over time and that should trigger a re-render when it changes.',
      [
        [
          'What belongs in state',
          `Include: form fields, open/closed flags, data you fetched (or use a query library), selected ids.

Exclude: values you can compute (full name from first+last), copies of props that never diverge, duplicated server cache if React Query already has it.

If two components need the same changing value, that state does not belong in only one of them — lift or share.`,
        ],
      ],
      [
        {
          q: 'What is state in React?',
          a: 'Component-owned data that changes over time. Updating it with the official setter queues a re-render so the UI matches the new data.',
        },
      ],
    ),
    topic(
      'what-is-usestate',
      'What is useState()?',
      'useState is a Hook that adds a state variable to a function component. It returns the current value and a setter.',
      [
        [
          'API',
          `\`const [state, setState] = useState(initial)\`

\`initial\` is used only on the **first** mount of that component instance. The setter is stable (same reference). Calling it with the same primitive value (Object.is) **bails out** of re-render.`,
        ],
      ],
      [
        {
          q: 'Explain useState.',
          a: 'A Hook that returns [value, setter]. React preserves the value between renders. The setter queues an update; the initial argument is only for the first render unless you pass a lazy initializer function.',
        },
      ],
    ),
    topic(
      'how-to-update-state',
      'How to update state?',
      'Always use the setter. Never mutate in place. Use the functional form when the next value depends on the previous one.',
      [
        [
          'Correct vs wrong',
          `\`\`\`jsx
setCount(count + 1)           // OK if you do not batch-stale
setCount((c) => c + 1)        // best for increments
// wrong:
count++ 
state.list.push(x)
\`\`\`

For objects/arrays, copy: \`setUser({ ...user, name })\`, \`setItems([...items, x])\`.`,
        ],
      ],
      [
        {
          q: 'How do you update state correctly?',
          a: 'Call the setter with a new value or a function of the previous state. Do not mutate the existing object/array. Use the functional updater when the next state depends on the old one.',
        },
      ],
    ),
    topic(
      'state-vs-props-2',
      'State vs Props',
      'Same distinction as in the Props chapter: external configuration vs internal memory.',
      [
        [
          'Interview one-liner',
          `Props are passed in and immutable to the receiver. State is created inside and updated with setters. A parent’s state often becomes a child’s props.`,
        ],
      ],
      [
        {
          q: 'When do you use state instead of props?',
          a: 'When the component needs to remember something that can change because of user input, time, or a request — and that value is not already owned higher up.',
        },
      ],
    ),
    topic(
      'state-immutability',
      'State immutability',
      'React compares state with Object.is. If you mutate the same object, the reference stays equal and React may skip the re-render. Always replace.',
      [
        [
          'Why',
          `Mutation also makes time-travel, memoization, and \`useEffect\` deps unreliable. Treat state as a snapshot. Libraries like Immer (\`useImmer\`) let you write mutating syntax while producing copies.`,
        ],
      ],
      [
        {
          q: 'Why must state be updated immutably?',
          a: 'React decides to re-render by comparing the next state to the previous with Object.is. Mutating in place keeps the same reference, so the UI may not update and memoized children will not see a change.',
        },
      ],
    ),
    topic(
      'updating-objects',
      'Updating objects in state',
      'Copy the object, override fields. For nested updates, copy each level (or use Immer).',
      [
        [
          'Nested copy',
          `\`\`\`jsx
setForm({
  ...form,
  address: { ...form.address, city: 'Pune' },
})
\`\`\`

Do not: \`form.address.city = 'Pune'; setForm(form)\`.`,
        ],
      ],
      [
        {
          q: 'How do you update a nested object in state?',
          a: 'Create a new object at every level you change, spreading the rest. Directly assigning a nested field mutates the previous snapshot.',
        },
      ],
    ),
    topic(
      'updating-arrays',
      'Updating arrays in state',
      'Use map, filter, slice, and spread. Avoid push, splice, sort (mutating), and index assignment on the existing array.',
      [
        [
          'Cheatsheet',
          `- Add: \`[...arr, item]\` or \`[item, ...arr]\`
- Remove: \`arr.filter(x => x.id !== id)\`
- Update: \`arr.map(x => x.id === id ? { ...x, done: true } : x)\`
- Reorder: copy then sort the copy

Keys on lists must still identify the item identity after updates.`,
        ],
      ],
      [
        {
          q: 'How do you add/remove/update items in state arrays?',
          a: 'Always return a new array: spread to add, filter to remove, map to update. Mutating methods like push/splice on the existing state array will bite you.',
        },
      ],
    ),
    topic(
      'multiple-state-variables',
      'Multiple state variables',
      'You can call useState many times. Split state by how it changes, not into one giant object by default.',
      [
        [
          'Split vs merge',
          `Independent fields (modalOpen vs query) should be separate hooks so you do not accidentally overwrite siblings.

Related fields that always change together (x/y coordinates) can be one object.

Classes had a single \`this.state\` that merged shallowly; \`useState\` **replaces** the whole value — a common migration bug.`,
        ],
      ],
      [
        {
          q: 'Should you use one useState object or many useStates?',
          a: 'Split independent values. Group values that update together. Remember useState replaces; it does not merge like class setState.',
        },
      ],
    ),
    topic(
      'lazy-initialization',
      'Lazy initialization',
      'Pass a function to useState so expensive initial work runs once: useState(() => readFromLocalStorage()).',
      [
        [
          'Why the function form',
          `\`useState(expensive())\` runs \`expensive\` **every render** and throws away the result after mount.

\`useState(() => expensive())\` runs only on init. Use it for localStorage parsing, creating a Map, filtering a huge list once.`,
        ],
      ],
      [
        {
          q: 'What is lazy initialization in useState?',
          a: 'Passing a function as the initial argument so React calls it only on the first render. This avoids repeating expensive setup every render.',
        },
      ],
    ),
    topic(
      'functional-state-updates',
      'Functional state updates',
      'setState(prev => next) uses the latest queued state, not a possibly stale closure value.',
      [
        [
          'When it is required',
          `Multiple increments in one handler, updates inside timeouts/subscriptions, and anything that must chain on the previous value.

\`\`\`jsx
setN(n => n + 1)
setN(n => n + 1) // +2 total
\`\`\`

Without functional form, both reads might see the same \`n\`.`,
        ],
      ],
      [
        {
          q: 'When do you use the functional updater in setState?',
          a: 'Whenever the next state depends on the previous state, especially with batching, async callbacks, or multiple updates in a row.',
        },
      ],
    ),
    topic(
      'async-batched-updates',
      'Why state updates are asynchronous/batched',
      'Setters do not change the variable in the current function body. React waits, batches, then re-renders. This avoids extra layout work.',
      [
        [
          'Consequences',
          `\`\`\`jsx
setN(n + 1)
console.log(n) // old value
\`\`\`

Read the next value in the updater, in an effect, or in the next render. Do not expect setState to return a promise of the DOM (class setState callback exists; hooks useEffect).

React 18 **batches everywhere** by default (including promises). \`flushSync\` is an escape hatch that forces a DOM commit — rare.`,
        ],
      ],
      [
        {
          q: 'Why is setState asynchronous?',
          a: 'So React can batch updates and avoid rendering after every setter. The state variable in the current closure stays the old snapshot until the next render.',
        },
      ],
    ),
    topic(
      'state-batching',
      'State batching',
      'Batching means multiple setters in one event result in one re-render. React 18 extended this beyond discrete browser events.',
      [
        [
          'Example',
          `In a click handler, \`setA(1); setB(2)\` → one render with both. In React 17, inside \`setTimeout\` they might have rendered twice; in 18 they batch.

Automatic batching still respects **two separate events** (two clicks = two renders).`,
        ],
      ],
      [
        {
          q: 'What is state batching?',
          a: 'Combining multiple state updates into a single re-render. React 18 batches updates in timeouts, promises, and native events by default.',
        },
      ],
    ),
    topic(
      'derived-state',
      'Derived state',
      'If a value can be computed from props or other state, compute it during render. Storing it duplicates sources of truth.',
      [
        [
          'Good vs bad',
          `Good: \`const fullName = first + ' ' + last\`
Good: \`const visible = items.filter(...)\` (or memoize if expensive)
Bad: \`useEffect(() => setFullName(first + last), [first, last])\` — extra render, extra sync bugs.

**Exception:** a draft that the user edits independently of the prop (initialize once, then it is local).`,
        ],
      ],
      [
        {
          q: 'What is derived state and why avoid it?',
          a: 'State that is a copy of something you can calculate. It gets out of sync. Prefer calculating during render. Only store it if the user can change it independently.',
        },
      ],
    ),
    topic(
      'lifting-state-up',
      'Lifting state up',
      'Move state to the nearest common ancestor when two components need the same changing data.',
      [
        [
          'Classic example',
          `Two temperature inputs (°C and °F) share one source of truth in the parent. Each child is controlled.

Lift only as high as needed (state colocation). Lifting everything to App recreates a global store accidentally.`,
        ],
      ],
      [
        {
          q: 'What does lifting state up mean?',
          a: 'Moving shared state to the closest common parent and passing values plus setters/callbacks down as props so siblings stay in sync.',
        },
      ],
    ),
    topic(
      'sharing-state',
      'Sharing state between components',
      'Options: lift state, Context, a store, or URL/search params. Pick the smallest tool that fits the update frequency and tree distance.',
      [
        [
          'Decision guide',
          `- Adjacent siblings → lift.
- Theme/auth/locale → Context.
- Large client cache, many writers → Redux/Zustand.
- Server lists → React Query + local UI state.
- Shareable view (filters, page) → URL.`,
        ],
      ],
      [
        {
          q: 'How do you share state between distant components?',
          a: 'Context for low-frequency global values, a dedicated store for complex client state, or a server-cache library for remote data. Do not jump to Redux for a single modal flag.',
        },
      ],
    ),
    topic(
      'avoiding-unnecessary-state',
      'Avoiding unnecessary state',
      'Every piece of state is a surface for bugs. Store the minimal set and derive the rest.',
      [
        [
          'Checklist',
          `1. Can I compute it?
2. Does it already live in the parent / URL / query cache?
3. Am I mirroring props?
4. Is this duplicated in two components?

Redundant state is a top cause of “UI doesn’t update” and “UI updates twice.”`,
        ],
      ],
      [
        {
          q: 'How do you decide what not to put in state?',
          a: 'If it is derivable, already owned elsewhere, or can live in the DOM (uncontrolled) without hurting UX, do not copy it into useState.',
        },
      ],
    ),
  ],
}

export default ch
