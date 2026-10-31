import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'components',
  number: 2,
  title: 'Components',
  tagline: 'The building blocks of every React UI — types, composition, and lifecycle.',
  topics: [
    topic(
      'what-are-components',
      'What are components?',
      'A component is a reusable function (or class) that receives props and returns a React element tree describing a piece of UI.',
      [
        [
          'Definition',
          `Think of components as **JavaScript functions that return UI**. They encapsulate markup, styles (sometimes), and behavior. You compose them like Lego: \`Page\` uses \`Header\`, \`Header\` uses \`Logo\` and \`Nav\`.

**Rules:** name must start with a capital letter (\`<button>\` is host, \`<Button>\` is your component). They should be **pure with respect to render**: given the same props/state/context, return the same output, no side effects during render.`,
        ],
      ],
      [
        {
          q: 'What is a React component?',
          a: 'A reusable piece of UI implemented as a function or class that takes props and returns React elements.',
        },
        {
          q: 'Why must component names be capitalized?',
          a: 'JSX treats lowercase tags as HTML/host elements and capitalized names as user-defined components. \`<div>\` ≠ \`<Div>\`.',
        },
      ],
    ),
    topic(
      'functional-components',
      'Functional components',
      'Function components are JavaScript functions that accept props and return JSX. Hooks give them state, effects, and refs. They are the default in modern React.',
      [
        [
          'Shape',
          `\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>
}
\`\`\`

They can be arrow functions. They have **no \`this\`**. State is \`useState\`, side effects \`useEffect\`, etc. React 19 still uses this model; Server Components are also functions but they run on the server and cannot use most hooks.`,
        ],
      ],
      [
        {
          q: 'What is a functional component?',
          a: 'A JS function that receives a props object and returns React elements. With Hooks it can hold state and perform effects.',
        },
      ],
      {
        code: [
          {
            title: 'Functional component with state',
            lang: 'jsx',
            source: `function Counter() {
  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>{n}</button>
}`,
          },
        ],
      },
    ),
    topic(
      'class-components',
      'Class components',
      'Class components extend React.Component, implement render(), and use this.state / this.setState plus lifecycle methods. They are legacy for new code but still appear in interviews and old codebases.',
      [
        [
          'Anatomy',
          `\`\`\`jsx
class Counter extends React.Component {
  state = { n: 0 }
  increment = () => this.setState({ n: this.state.n + 1 })
  render() {
    return <button onClick={this.increment}>{this.state.n}</button>
  }
}
\`\`\`

You must call \`super(props)\` if you define a constructor. Bind event handlers or use class fields. Error boundaries (\`componentDidCatch\`) still **require a class** (or a tiny library wrapper) as of typical interview knowledge — though the ecosystem is moving.`,
        ],
      ],
      [
        {
          q: 'How do you create a class component?',
          a: 'Extend React.Component, implement render(), use this.props and this.state, update with this.setState.',
        },
        {
          q: 'Why do we bind methods in class components?',
          a: 'If you pass \`this.handleClick\` as a callback, \`this\` would be undefined in strict mode unless bound in the constructor, defined as an arrow class field, or wrapped inline.',
        },
      ],
    ),
    topic(
      'functional-vs-class',
      'Functional vs Class components',
      'Prefer functions + hooks. Know class lifecycles because interviews and legacy code still use them.',
      [
        [
          'Comparison',
          `| | **Functional** | **Class** |
|---|---|---|
| State | useState / useReducer | this.state |
| Side effects | useEffect family | componentDidMount/Update/Unmount |
| this | none | easy to get wrong |
| Bundle / hot reload | simpler | heavier |
| Error boundaries | historically no | yes |
| Reuse logic | custom hooks | HOCs / render props |

Hooks were introduced in 16.8 to reuse stateful logic without wrapper hell. Classes are not deprecated, but new features (concurrent, most docs) target functions.`,
        ],
      ],
      [
        {
          q: 'Functional vs class — which should you use?',
          a: 'Functional components with Hooks for all new code. Classes for error boundaries and maintaining existing code. Be able to map lifecycle methods to useEffect.',
        },
      ],
    ),
    topic(
      'component-composition',
      'Component composition',
      'Composition means building complex UI by nesting components and passing children, not by inheriting classes.',
      [
        [
          'Patterns',
          `**Containment:** \`<Dialog>{children}</Dialog>\` using \`props.children\`.

**Specialization:** \`<WelcomeDialog />\` renders \`<Dialog title="Welcome" />\`.

**Slots:** named props like \`header\` and \`footer\` that accept React nodes.

**Compound components:** \`<Tabs>\`, \`<Tabs.List>\`, \`<Tabs.Panel>\` sharing implicit state via context.

Avoid \`User extends Person extends Component\` — you will fight lifecycle and props.`,
        ],
      ],
      [
        {
          q: 'What is composition in React?',
          a: 'Assembling UIs by nesting components and passing children or slots, instead of inheriting component classes.',
        },
      ],
    ),
    topic(
      'reusable-components',
      'Reusable components',
      'Reusable components have a small, documented props API, minimal assumptions about parent data, and no hidden global coupling.',
      [
        [
          'How to design them',
          `- Accept variants via props (\`size\`, \`variant\`) not copy-paste.
- Style with composition (className merge) so parents can extend.
- Do not fetch inside a dumb Button.
- Prefer children over hard-coded labels.
- Keep accessibility (button vs div, keyboard, aria).
- Extract only after the second or third duplication (rule of three).`,
        ],
      ],
      [
        {
          q: 'How do you make a component reusable?',
          a: 'Push configuration into props, use children for inner content, avoid coupling to a specific store or route, and keep side effects out of presentational pieces.',
        },
      ],
    ),
    topic(
      'parent-and-child',
      'Parent and child components',
      'The parent renders the child and passes props. The child notifies the parent by calling functions it received. Data down, events up.',
      [
        [
          'Data flow',
          `Parent owns state that multiple children need, or that the child should not own (single source of truth). Child receives data as props and callbacks like \`onSelect\`.

A child re-renders when its parent re-renders (default), when its own state changes, or when consumed context changes.`,
        ],
      ],
      [
        {
          q: 'How do parent and child communicate?',
          a: 'Parent → child: props. Child → parent: callback props. Siblings: lift state to the nearest parent or use context/store.',
        },
      ],
    ),
    topic(
      'nested-components',
      'Nested components',
      'Nesting is the tree: App → Layout → Sidebar → Link. Deep nesting is fine; prop drilling and giant files are the real problems.',
      [
        [
          'Practical advice',
          `Defining a component **inside** another component is usually a mistake: it is a **new type every render**, so React unmounts the subtree and resets state.

Define components at module scope. Nest in JSX, not in function declarations.`,
        ],
      ],
      [
        {
          q: 'Is it OK to declare a component inside another?',
          a: 'Avoid it. A nested function is a different component type on every render, causing remounts and lost state. Declare components at module top level.',
        },
      ],
    ),
    topic(
      'controlled-vs-uncontrolled',
      'Controlled component vs uncontrolled component',
      'Controlled: React state is the source of truth for the value. Uncontrolled: the DOM holds the value, typically read via a ref.',
      [
        [
          'Forms example',
          `**Controlled:** \`<input value={name} onChange={e => setName(e.target.value)} />\`. Every keystroke updates state and re-renders. Easy validation, disable submit, format as-you-type.

**Uncontrolled:** \`<input defaultValue="Ada" ref={ref} />\`. You read \`ref.current.value\` on submit. Less re-renders; harder to keep UI in sync (character counters, live validation).

Most production forms in React are controlled, or use libraries (RHF) that mix refs for performance with a controlled API.`,
        ],
      ],
      [
        {
          q: 'Controlled vs uncontrolled components?',
          a: 'Controlled components take their value from React state and notify via onChange. Uncontrolled components keep the value in the DOM and are accessed with refs/defaultValue.',
        },
        {
          q: 'When would you use uncontrolled inputs?',
          a: 'Simple one-shot forms, integrating non-React widgets, file inputs (often uncontrolled), or performance-sensitive huge forms (React Hook Form’s uncontrolled defaults).',
        },
      ],
    ),
    topic(
      'pure-components',
      'Pure components',
      'A pure component re-renders only when props or state change by shallow comparison. React.PureComponent is the class version; React.memo is the function version.',
      [
        [
          'Purity vs PureComponent',
          `**Pure function:** same inputs → same output, no side effects. All components should aim for pure render.

**React.PureComponent:** implements \`shouldComponentUpdate\` with **shallow** compare of props and state.

**React.memo(fn):** same idea for functions. Nested objects/arrays that are new every render (\`style={{}}\`, \`onClick={() => {}}\`) defeat memoization.

Do not confuse with “pure” as in no JSX side effects vs the class \`PureComponent\` API.`,
        ],
      ],
      [
        {
          q: 'What is a PureComponent?',
          a: 'A class component that shallow-compares props and state to skip re-renders. Function equivalent is React.memo.',
        },
        {
          q: 'Why might React.memo not help?',
          a: 'If parents pass inline objects/functions, props never compare equal. Also if the component is cheap, memo comparison can cost more than rendering.',
        },
      ],
    ),
    topic(
      'hoc',
      'Higher-Order Components (HOC)',
      'An HOC is a function that takes a component and returns a new component with extra props or behavior. It was the main reuse pattern before Hooks.',
      [
        [
          'Pattern',
          `\`\`\`jsx
function withAuth(Wrapped) {
  return function AuthGuard(props) {
    const user = useAuth()
    if (!user) return <Login />
    return <Wrapped {...props} user={user} />
  }
}
export default withAuth(Dashboard)
\`\`\`

**Convention:** name starts with \`with\`. Pass through unknown props. Do not mutate the wrapped component.

**Problems:** wrapper hell, \`displayName\` / refs (need forwardRef), static methods not copied, types are awkward. **Custom hooks replaced most HOCs.** Still used by some libraries (\`connect()\` from old Redux).`,
        ],
      ],
      [
        {
          q: 'What is a Higher-Order Component?',
          a: 'A function that takes a component and returns another component, injecting props or wrapping behavior. Example: withRouter, connect.',
        },
        {
          q: 'HOC vs custom hook?',
          a: 'Hooks compose without extra nodes in the tree and keep logic in the same component. HOCs wrap the tree and can cause name clashes and ref issues. Prefer hooks unless a library forces an HOC.',
        },
      ],
    ),
    topic(
      'presentational-vs-container',
      'Presentational vs Container components',
      'Presentational (dumb) components render UI from props. Container (smart) components fetch data, subscribe to stores, and pass props down. The split is a guideline, not a law.',
      [
        [
          'Today’s version',
          `Hooks blurred the line: a function can fetch and render. Still useful:
- Presentational: Button, UserCard — easy to storybook/test.
- Container: UserCardContainer that uses \`useUser(id)\`.

In Next.js, **Server Components** often play the container role (fetch) and pass serializable props to client presentational components.`,
        ],
      ],
      [
        {
          q: 'Presentational vs container components?',
          a: 'Presentational: UI + props, little state. Container: data, effects, store, then render presentational children. Hooks and Server Components implement the same idea with fewer classes.',
        },
      ],
    ),
    topic(
      'lazy-loaded-components',
      'Lazy-loaded components',
      'React.lazy plus Suspense loads a component’s code on demand via dynamic import(), shrinking the initial bundle.',
      [
        [
          'Usage',
          `\`\`\`jsx
const Chart = lazy(() => import('./Chart'))
<Suspense fallback={<Spinner />}>
  <Chart />
</Suspense>
\`\`\`

Default export is required for \`React.lazy\` (or a helper that maps named exports). Combine with route-level splitting. Error boundaries should catch failed chunks.

On the server, lazy has historically been trickier; Next.js uses \`next/dynamic\` or RSC instead.`,
        ],
      ],
      [
        {
          q: 'How do you lazy-load a component?',
          a: 'const Comp = React.lazy(() => import("./Comp")) and wrap it in <Suspense fallback={...}>. The chunk downloads when Comp first renders.',
        },
      ],
    ),
    topic(
      'component-lifecycle',
      'Component lifecycle',
      'Components mount, update, and unmount. Classes expose lifecycle methods; functions emulate them with useEffect and related hooks.',
      [
        [
          'Three phases',
          `**Mounting:** constructor → render → DOM insert → componentDidMount / useEffect([]).

**Updating:** new props/state → render → DOM update → componentDidUpdate / useEffect(deps).

**Unmounting:** componentWillUnmount / effect cleanup.

**Error:** getDerivedStateFromError, componentDidCatch.

See the Lifecycle chapter for every method. Interview mapping: \`componentDidMount\` ≈ \`useEffect(() => { ... }, [])\`; cleanup ≈ unmount.`,
        ],
      ],
      [
        {
          q: 'What are the React lifecycle phases?',
          a: 'Mounting (created and inserted), updating (re-rendered due to props/state/context), and unmounting (removed). Error handling is a parallel path.',
        },
      ],
    ),
  ],
}

export default ch
