import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'lists',
  number: 10,
  title: 'Lists and Keys',
  tagline: 'map(), keys, index pitfalls, filtering, sorting, and updating items.',
  topics: [
    topic('rendering-lists-map', 'Rendering lists using map()',
      'Convert an array of data into an array of React elements with Array.map.',
      [['Pattern', `\`\`\`jsx
{todos.map((todo) => (
  <TodoItem key={todo.id} todo={todo} />
))}
\`\`\`
map must return a single element (or Fragment) per item. Do not forget to return.`]],
      [{ q: 'How do you render lists in React?', a: 'Use array.map to return elements with a stable key. Extract a child component when the row has more than trivial markup.' }]),
    topic('what-are-keys', 'What are keys in React?',
      'Keys are special string props that hint identity to the reconciler so it can match children across renders.',
      [['Not a prop', 'key is not passed to the component (unless you also pass id). React consumes it. Keys must be unique among **siblings**, not globally in the app.']],
      [{ q: 'What are keys?', a: 'Identity hints for list children during reconciliation. They are not available as props inside the child. They must be unique among siblings.' }]),
    topic('why-keys-important', 'Why keys are important',
      'Without keys, React matches by index. Inserting at the start reuses the wrong DOM nodes and can mix up input state.',
      [['Demo', 'A list of inputs: add an item at index 0 without keys — typed text jumps to the wrong row. With id keys, each row keeps its state.']],
      [{ q: 'Why do lists need keys?', a: 'So React can tell which item was added, removed, or moved, and preserve state/DOM for the correct identity.' }]),
    topic('avoid-index-keys', 'Why should we avoid array indexes as keys?',
      'Index keys are unstable when the list is reordered, filtered, or prepended. They are acceptable for static lists that never change order.',
      [['When index is OK', 'Purely presentational static lists (footer links hard-coded). Never for sortable tables, drag-and-drop, or inputs inside rows.']],
      [{ q: 'Why not use index as key?', a: 'Indexes change when the array changes, so React reuses the wrong component instance. Use a stable unique id from data.' }]),
    topic('unique-keys', 'Unique keys',
      'Prefer database ids, UUIDs created when the item is created (stored on the item), or composite keys that stay stable.',
      [['Never', 'Math.random() as key — new key every render remounts everything. Duplicate keys warn and cause unpredictable matching.']],
      [{ q: 'What makes a good key?', a: 'Stable, unique among siblings, predictable across renders. Usually a backend id. Not a random number, not a changing index.' }]),
    topic('missing-keys', 'What happens when keys are missing?',
      'React warns in development and falls back to indexes. You get subtle state bugs and extra DOM work.',
      [['Console', '“Each child in a list should have a unique key prop.” Treat it as a defect, not noise.']],
      [{ q: 'What if you forget keys?', a: 'Dev warning and index-based reconciliation. Reordering and insertions can reuse the wrong state.' }]),
    topic('filtering-lists', 'Filtering lists',
      'Derive the visible array: items.filter(predicate). Do not store filtered copies unless needed for extra UX.',
      [['Immutable', 'filter already returns a new array. Combine with search debounce for API filters.']],
      [{ q: 'How should you filter a list in React?', a: 'Compute filtered = items.filter(...) during render (useMemo if large). Keep the source array as the source of truth.' }]),
    topic('sorting-lists', 'Sorting lists',
      'Never sort the state array in place. Copy then sort: [...items].sort(compare).',
      [['Direction', 'Store sortKey and sortDir in state or URL. Derive the sorted list. In-place sort mutates state and can skip renders.']],
      [{ q: 'How do you sort a list in state?', a: 'Copy the array, then sort the copy, or derive sorted from items + sort config. Do not call sort on the state array directly.' }]),
    topic('dynamic-list-rendering', 'Dynamic list rendering',
      'Lists grow and shrink from user actions or sockets. Keys + immutable updates keep this correct.',
      [['Empty state', 'Always handle items.length === 0. Virtualize (react-window) when thousands of rows.']],
      [{ q: 'What extra concerns exist for dynamic lists?', a: 'Stable keys, immutable add/remove/update, empty/loading states, and virtualization when the list is huge.' }]),
    topic('updating-list-items', 'Updating list items',
      'map the array and replace the matching item with a new object.',
      [['Pattern', 'setItems(items => items.map(it => it.id === id ? { ...it, done: !it.done } : it)). Do not mutate it.done = true.']],
      [{ q: 'How do you update one item in a list?', a: 'map to a new array, spreading a new object for the matching id. Then setState with that array.' }]),
  ],
}

export default ch
