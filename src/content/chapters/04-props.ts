import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'props',
  number: 4,
  title: 'Props',
  tagline: 'The public API of a component: passing data down and events up.',
  topics: [
    topic(
      'what-are-props',
      'What are props?',
      'Props (properties) are the inputs to a component. They are read-only from the child’s perspective and flow from parent to child.',
      [
        [
          'Mental model',
          `Props are like function arguments. React elements store them on \`element.props\`. Inside a function component, the first argument is the props object. Changing props from the parent triggers a re-render of the child (unless memoized and shallow-equal).`,
        ],
      ],
      [
        {
          q: 'What are props in React?',
          a: 'Immutable inputs passed from parent to child, analogous to function parameters. The child reads them to render and must not mutate them.',
        },
      ],
    ),
    topic(
      'how-to-pass-props',
      'How to pass props?',
      'Pass them as JSX attributes. Spread an object when forwarding. Children are a special prop.',
      [
        [
          'Examples',
          `\`\`\`jsx
<UserCard name="Ada" age={36} active />
<UserCard {...user} />
<Panel>Body text</Panel> // children
\`\`\`

Numbers, objects, arrays, functions, and React nodes are all valid. Strings can use quotes. Booleans: \`active\` means \`active={true}\`.`,
        ],
      ],
      [
        {
          q: 'How do you pass props to a component?',
          a: 'As JSX attributes: <Comp title="Hi" count={3} onSave={save} />. Use spread to forward a props object.',
        },
      ],
    ),
    topic(
      'props-destructuring',
      'Props destructuring',
      'Destructure the props object in the parameter list for readability. You can rename and set defaults.',
      [
        [
          'Pattern',
          `\`\`\`jsx
function Button({ label, onClick, variant = 'primary' }) {
  return <button className={variant} onClick={onClick}>{label}</button>
}
\`\`\`

Rest: \`{ className, ...rest }\` then \`<button {...rest} />\` to keep native attributes.`,
        ],
      ],
      [
        {
          q: 'Why destructure props?',
          a: 'It documents the API at a glance, allows default values, and avoids repeating props.foo. Rest destructuring is how you forward unknown DOM attributes.',
        },
      ],
    ),
    topic(
      'default-props',
      'Default props',
      'Modern React prefers default parameters. Component.defaultProps still exists for functions but is fading; it remains relevant for classes and some libraries.',
      [
        [
          'Today vs yesterday',
          `\`\`\`jsx
function Avatar({ size = 40 }) { /* ... */ }
// legacy
Avatar.defaultProps = { size: 40 }
\`\`\`

defaultProps on function components can behave surprisingly with \`undefined\` vs omitted props. Prefer parameter defaults. For TypeScript, optional props + defaults is the way.`,
        ],
      ],
      [
        {
          q: 'How do you set default props?',
          a: 'Use default function parameters (recommended). Historically Component.defaultProps. Defaults apply when the prop is undefined.',
        },
      ],
    ),
    topic(
      'functions-as-props',
      'Passing functions as props',
      'Parents pass callbacks so children can report events without owning the state. This is “data down, events up.”',
      [
        [
          'Stable callbacks',
          `\`\`\`jsx
function Parent() {
  const [v, setV] = useState('')
  const onChange = (e) => setV(e.target.value)
  return <Input value={v} onChange={onChange} />
}
\`\`\`

Inline arrows create a **new function every render**, which can break \`React.memo\` children. \`useCallback\` helps when a memoized child depends on referential equality. Do not wrap every function blindly.`,
        ],
      ],
      [
        {
          q: 'How does a child tell the parent something happened?',
          a: 'The parent passes a function prop; the child calls it with data. The parent updates state, which flows back down as props.',
        },
      ],
    ),
    topic(
      'objects-arrays-as-props',
      'Passing objects and arrays as props',
      'You can pass any JS value. Beware: inline objects and arrays are new references each render, which affects memo and useEffect dependencies.',
      [
        [
          'Stability',
          `\`<List items={[1,2]} />\` and \`style={{ color: 'red' }}\` allocate every time. Hoist constants outside the component, or memoize with \`useMemo\` when passing to memoized children or putting them in effect deps.

Never mutate a prop array/object; copy then setState in the owner.`,
        ],
      ],
      [
        {
          q: 'Any gotcha passing objects as props?',
          a: 'Inline objects break referential equality. Memoized children re-render, and effects with those objects as deps re-run every time. Stabilize with useMemo or lift the object.',
        },
      ],
    ),
    topic(
      'props-drilling',
      'Props drilling',
      'Prop drilling is passing props through many layers that do not use them, only to reach a distant child. It is not evil at 1–2 levels; it hurts at 6+.',
      [
        [
          'Fixes',
          `1. **Lift less / colocate** — maybe the data should live lower.
2. **Compose children higher** — pass already-built JSX so middle layers just render \`{children}\`.
3. **Context** — for theme, locale, auth.
4. **A store** — Redux/Zustand for frequent, wide state.
5. **Component composition** beats threading 12 props through Layout.`,
        ],
      ],
      [
        {
          q: 'What is prop drilling and how do you avoid it?',
          a: 'Threading props through intermediate components that do not care about them. Avoid with children composition, Context, or a global store — not by reaching into other components’ internals.',
        },
      ],
    ),
    topic(
      'props-vs-state',
      'Props vs State',
      'Props come from outside and are read-only. State is owned internally and can change over time with setState.',
      [
        [
          'Table',
          `| | **Props** | **State** |
|---|---|---|
| Source | Parent (or context mapped to props) | The component itself |
| Mutable? | No (from child) | Yes, via setter |
| Causes render | Parent passes new values | setState |
| Use for | Configuration, data in | Values that change from interaction/async |

A value that is computed from props/state should **not** be copied into state unless you need to edit a draft.`,
        ],
      ],
      [
        {
          q: 'Difference between props and state?',
          a: 'Props are inputs from the parent and immutable to the child. State is internal, mutable through setters, and private unless passed down as props.',
        },
      ],
    ),
    topic(
      'can-we-modify-props',
      'Can we modify props?',
      'No. Props are read-only. Mutating them breaks purity, causes hard-to-find bugs, and fights React’s one-way data flow.',
      [
        [
          'What to do instead',
          `If the child needs a changing value, either:
- call a parent callback to update parent state, or
- copy the prop into local state once as a **draft** (know that later prop changes will not auto-sync unless you add an effect — often an anti-pattern).

\`props.user.name = 'x'\` mutates a shared object if the parent holds it — especially bad.`,
        ],
      ],
      [
        {
          q: 'Can you modify props inside a component?',
          a: 'You should not. Treat them as immutable. Ask the parent to update, or keep local state derived carefully. Direct mutation leads to inconsistent UI.',
        },
      ],
    ),
    topic(
      'children-props',
      'Children props (props.children)',
      'Whatever you nest between a component’s tags becomes props.children — a node, string, array, or function.',
      [
        [
          'Usage',
          `\`\`\`jsx
function Card({ children }) {
  return <section className="card">{children}</section>
}
<Card><p>Hello</p></Card>
\`\`\`

Utilities: \`React.Children.map\`, \`count\`, \`only\`, \`toArray\` (handles undefined and flattens). Prefer \`toArray\` when you need keys. Function-as-child is the render-props pattern.`,
        ],
      ],
      [
        {
          q: 'What is props.children?',
          a: 'The nested JSX (or text) between opening and closing tags, passed as the children prop. Used for wrappers, layouts, and compound components.',
        },
      ],
    ),
    topic(
      'child-to-parent',
      'How to pass data from child to parent?',
      'You cannot magically push props upward. Pass a callback down; the child calls it with the data.',
      [
        [
          'Pattern',
          `\`\`\`jsx
function Parent() {
  const [msg, setMsg] = useState('')
  return <Child onSend={setMsg} />
}
function Child({ onSend }) {
  return <button onClick={() => onSend('hi')}>Send</button>
}
\`\`\`

This is the standard interview answer. Context/stores are alternatives when many nodes need the same callback.`,
        ],
      ],
      [
        {
          q: 'How do you pass data from child to parent?',
          a: 'Pass a function from parent to child. The child invokes it with the data. The parent sets state. There is no built-in upward props channel.',
        },
      ],
    ),
    topic(
      'sibling-communication',
      'How to pass data between sibling components?',
      'Siblings do not talk directly. Lift the shared state to the closest common parent, or use Context/Redux.',
      [
        [
          'Lift state up',
          `Input sibling A and list sibling B: parent holds \`query\`. A calls \`onChange\`, B receives \`query\` as a prop.

If the parent becomes bloated, extract a custom hook \`useSearch()\` used by the parent, or a small store.`,
        ],
      ],
      [
        {
          q: 'How do siblings communicate in React?',
          a: 'Lift state to the nearest common parent, or share via Context/global store. Do not try to reach another component’s state directly.',
        },
      ],
    ),
  ],
}

export default ch
