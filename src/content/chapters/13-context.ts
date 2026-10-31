
import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'context',
  number: 13,
  title: 'Context API',
  tagline:
    'Escape prop drilling — understand Providers, consumers, performance optimization, and when Context is the wrong tool.',
  priority: 'high',

  topics: [
    topic(
      'what-is-context',
      'What is Context API?',
      'Context API is a built-in React feature that allows components to share data with deeply nested descendants without passing props through every intermediate component.',
      [
        [
          'Mental model',
          `Imagine a school where the principal announces a notice.

Instead of passing the notice through every teacher and classroom, Context makes the information available to all relevant descendants.

**Three important concepts:**

1. createContext() → Creates a context.
2. Provider → Supplies a value to the component tree.
3. useContext() → Reads that value from a descendant component.

**Real-world examples:**
- Theme (light/dark mode)
- Authentication (logged-in user)
- Language (English, Hindi, Marathi)
- Application settings
- Shopping cart shared across components

Context follows React's normal unidirectional data flow. It does not automatically create a global state management system with reducers, middleware, or selectors.`,
        ],
      ],
      [
        {
          q: 'What is Context API?',
          a: 'Context is a React feature that allows components to share values with descendants without explicitly passing props through every intermediate component. It works through a Provider and consumers.',
        },
        {
          q: 'Is Context API a state management library?',
          a: 'Context is a mechanism for sharing values. It can be combined with useState or useReducer to build state management, but Context alone does not manage state or update logic.',
        },
      ],
    ),

    topic(
      'why-context',
      'Why do we need Context API?',
      'Context solves prop drilling when multiple components across different levels of a component tree need the same information.',
      [
        [
          'Understanding prop drilling',
          `Imagine this component structure:

\`\`\`
App
 └── Dashboard
      └── Sidebar
           └── Profile
                └── Avatar
\`\`\`

Suppose App contains the logged-in user's information, but Avatar needs the user's profile picture.

Without Context, you must pass user through every intermediate component:

\`\`\`jsx
<App user={user}>
  <Dashboard user={user}>
    <Sidebar user={user}>
      <Profile user={user}>
        <Avatar user={user} />
      </Profile>
    </Sidebar>
  </Dashboard>
</App>
\`\`\`

This is called **prop drilling**.

With Context, Avatar can directly access the user information without every intermediate component receiving the user prop.

**Important:** Not all prop drilling is bad. Passing props through one or two components is often clearer than introducing Context.`,
        ],
      ],
      [
        {
          q: 'Why do we need Context API?',
          a: 'It prevents unnecessary prop drilling when data is required by many components at different levels of the component tree. It makes shared environmental data easier to access.',
        },
        {
          q: 'Does Context eliminate all prop drilling?',
          a: 'No. Context is useful for shared values needed by many distant descendants. For simpler cases, props and component composition are often better.',
        },
      ],
    ),

    topic(
      'createcontext',
      'createContext()',
      'createContext() creates a Context object that components can use to provide and consume shared values.',
      [
        [
          'Syntax and example',
          `\`\`\`tsx
import { createContext } from 'react'

type Theme = 'light' | 'dark'

export const ThemeContext = createContext<Theme>('light')
\`\`\`

**Syntax:**
\`\`\`tsx
const MyContext = createContext(defaultValue)
\`\`\`

The defaultValue is used only when a component has no matching Provider above it in the component tree.

**Important:** Changing the default value does not update consumers.

For required Context values, using null and creating a custom hook that throws an error when the Provider is missing is a common TypeScript best practice.

**DevTools:**
\`\`\`tsx
ThemeContext.displayName = 'ThemeContext'
\`\`\`

This makes the Context easier to identify in React DevTools.`,
        ],
      ],
      [
        {
          q: 'What is createContext() used for?',
          a: 'It creates a Context object that allows a component to provide a value and descendant components to consume it.',
        },
        {
          q: 'What is the default value of createContext()?',
          a: 'It is the fallback value returned when a consumer has no matching Provider above it. It does not automatically update and is not used when a Provider supplies a value.',
        },
      ],
    ),

    topic(
      'usecontext-api',
      'useContext()',
      'useContext() is a React Hook that reads the value from the nearest matching Context Provider above the component.',
      [
        [
          'Syntax and example',
          `\`\`\`tsx
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

function Profile() {
  const theme = useContext(ThemeContext)

  return (
    <div className={theme}>
      Current theme: {theme}
    </div>
  )
}
\`\`\`

**How it works:**

1. React searches upward for the nearest ThemeContext.Provider.
2. It reads the Provider's value.
3. The component re-renders when that Context value changes.

**Important:** React compares the previous and next Provider values using Object.is.

There is no built-in selector in useContext. If a Context contains user, theme, and language, a consumer reading only theme still re-renders when the entire value changes.`,
        ],
      ],
      [
        {
          q: 'What is useContext()?',
          a: 'useContext is a Hook that reads and subscribes to a Context value from the nearest matching Provider. The component re-renders when that provided value changes.',
        },
        {
          q: 'Does useContext cause re-renders?',
          a: 'Yes. A consumer re-renders when the nearest Provider value changes according to Object.is, even if the consumer only uses one property from the Context object.',
        },
      ],
    ),

    topic(
      'context-provider',
      'Context Provider',
      'A Provider supplies a Context value to all matching descendant consumers.',
      [
        [
          'Syntax and example',
          `\`\`\`tsx
import { createContext, useState } from 'react'

export const ThemeContext = createContext('light')

function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={theme}>
      <button
        onClick={() =>
          setTheme(theme === 'light' ? 'dark' : 'light')
        }
      >
        Toggle Theme
      </button>

      <Dashboard />
    </ThemeContext.Provider>
  )
}
\`\`\`

Any descendant of the Provider can access the current theme using useContext(ThemeContext).

**Nested Providers:**

If you create another ThemeContext.Provider inside the first one, its value overrides the outer value for its descendants.

**Performance tip:** When a Provider supplies an object or function, avoid creating unnecessary new references on every render.`,
        ],
      ],
      [
        {
          q: 'How do you provide a Context value?',
          a: 'Wrap the required component tree with the Context Provider and pass the shared value through its value prop. Descendants can read it using useContext.',
        },
        {
          q: 'Can Context Providers be nested?',
          a: 'Yes. The nearest matching Provider takes precedence for its descendants, while components outside the nested Provider continue using the outer value.',
        },
      ],
    ),

    topic(
      'context-consumer',
      'Context Consumer',
      'Context.Consumer is the older render-prop API for reading Context. In modern function components, useContext is generally preferred.',
      [
        [
          'Syntax',
          `\`\`\`tsx
<ThemeContext.Consumer>
  {(theme) => (
    <div className={theme}>
      Current theme: {theme}
    </div>
  )}
</ThemeContext.Consumer>
\`\`\`

**In class components:**

\`\`\`tsx
class Profile extends React.Component {
  static contextType = ThemeContext

  render() {
    return <div>{this.context}</div>
  }
}
\`\`\`

**Limitations:**
- contextType supports only one Context in a class.
- Context.Consumer supports multiple Context values through nested Consumers.
- Function components should generally use useContext.`,
        ],
      ],
      [
        {
          q: 'What is Context.Consumer?',
          a: 'It is a render-prop component that provides the current Context value to a function child. It is useful for legacy code and class components.',
        },
        {
          q: 'How do class components consume Context?',
          a: 'They can use static contextType for one Context or Context.Consumer for multiple Context values.',
        },
      ],
    ),

    topic(
      'props-drilling-problem',
      'Props drilling problem',
      'Prop drilling occurs when props are passed through intermediate components that do not actually need the data, simply to deliver it to a deeper component.',
      [
        [
          'Example and alternatives',
          `**Without Context:**

\`\`\`tsx
function App() {
  const user = { name: 'Rahul' }

  return <Dashboard user={user} />
}

function Dashboard({ user }) {
  return <Sidebar user={user} />
}

function Sidebar({ user }) {
  return <Profile user={user} />
}

function Profile({ user }) {
  return <h2>{user.name}</h2>
}
\`\`\`

Dashboard and Sidebar only pass user forward.

**Three possible solutions:**

1. Context — for shared data needed by distant descendants.
2. Composition — pass components as children or slots.
3. State management libraries — for complex shared application state.

**Composition example:**

\`\`\`tsx
function App() {
  return (
    <Dashboard>
      <Profile user={{ name: 'Rahul' }} />
    </Dashboard>
  )
}

function Dashboard({ children }) {
  return <div>{children}</div>
}
\`\`\`

Here Dashboard does not need to know about user at all.`,
        ],
      ],
      [
        {
          q: 'Is Context the only solution to prop drilling?',
          a: 'No. Component composition using children and slots can avoid prop drilling. Context is useful when many distant components need the same shared value.',
        },
      ],
    ),

    topic(
      'context-vs-props',
      'Context API vs Props',
      'Props explicitly communicate data between components. Context provides shared values implicitly to descendants.',
      [
        [
          'Comparison',
          `| Props | Context |
|---|---|
| Passed directly by parent | Shared through a Provider |
| Explicit dependencies | Implicit dependencies |
| Easy to trace | Requires locating the Provider |
| Best for component-specific data | Best for shared environmental data |
| No Context subscription | Consumers subscribe to Context |

**Example:**

\`\`\`tsx
<Button variant="primary" onClick={saveData} />
\`\`\`

This is often better than making Button secretly depend on ThemeContext and another Context for permissions.

**Best practice:** Prefer explicit props for component-specific behavior. Use Context for genuinely shared values.`,
        ],
      ],
      [
        {
          q: 'When are props better than Context?',
          a: 'Props are better when data is needed by only a few components or when the dependency should be explicit in the component API. They improve traceability and testability.',
        },
        {
          q: 'Is Context implicit or explicit?',
          a: 'Context dependencies are implicit because the consumer reads them without receiving them as props. Props make dependencies explicit.',
        },
      ],
    ),

    topic(
      'context-vs-redux',
      'Context API vs Redux',
      'Context is a built-in way to share values. Redux Toolkit provides a structured state-management solution with reducers, middleware, selectors, and DevTools.',
      [
        [
          'Comparison',
          `| Context API | Redux Toolkit |
|---|---|
| Built into React | External library |
| Shares values | Manages structured application state |
| No built-in reducers | Reducers and actions |
| No built-in middleware | Middleware support |
| No built-in selector system | useSelector selectors |
| Best for simpler shared values | Best for complex client state |

**Example use cases:**

Context:
- Theme
- Locale
- Authentication information
- Design-system configuration

Redux Toolkit:
- Shopping cart with complex updates
- Multi-step workflows
- Large application state
- Complex business logic
- Debugging state changes with DevTools

**Important:** Context and Redux are not competitors in every scenario. Redux itself uses React Context to make its store available to components. React-Redux then uses subscriptions and selectors to optimize updates.`,
        ],
      ],
      [
        {
          q: 'Should you replace Redux with Context?',
          a: 'Not always. Context is ideal for simpler shared values. Redux Toolkit is often better for complex client state, structured updates, middleware, selectors, and debugging',
        },
        {
          q: 'Can Redux use Context internally?',
          a: 'Yes. React-Redux uses Context to provide the Redux store, while its subscription and selector mechanisms help components update efficiently.',
        },
      ],
    ),

    topic(
      'multiple-contexts',
      'Multiple contexts',
      'You can create multiple Context objects to separate unrelated values and control which components subscribe to which data.',
      [
        [
          'Example: Separate state and dispatch',
          `\`\`\`tsx
import {
  createContext,
  useContext,
  useReducer
} from 'react'

const StateContext = createContext(null)
const DispatchContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }

    default:
      return state
  }
}

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(
    reducer,
    { count: 0 }
  )

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

function CounterDisplay() {
  const state = useContext(StateContext)

  return <h2>{state.count}</h2>
}

function CounterButton() {
  const dispatch = useContext(DispatchContext)

  return (
    <button
      onClick={() => dispatch({ type: 'increment' })}
    >
      Increment
    </button>
  )
}
\`\`\`

**Why split them?**

A component that only reads dispatch does not subscribe to the state Context. Since dispatch from useReducer is stable, it avoids Context-triggered re-renders when state changes.

However, this does not prevent re-renders caused by the component's own parent or props.`,
        ],
      ],
      [
        {
          q: 'Why should we split multiple Contexts?',
          a: 'Splitting unrelated values reduces unnecessary subscriptions. Separating state from dispatch can prevent dispatch-only consumers from re-rendering when state changes.',
        },
      ],
    ),

    topic(
      'context-performance',
      'Context performance optimization',
      'Context performance improves when you reduce unnecessary value changes, separate unrelated data, and avoid placing frequently changing state in a large shared Context.',
      [
        [
          'Optimization techniques',
          `**1. Memoize object values**

\`\`\`tsx
const value = useMemo(
  () => ({ user, login }),
  [user, login]
)
\`\`\`

This prevents a new object reference when the dependencies have not changed.

**2. Split unrelated Contexts**

\`\`\`tsx
<AuthContext.Provider value={authValue}>
  <ThemeContext.Provider value={themeValue}>
    {children}
  </ThemeContext.Provider>
</AuthContext.Provider>
\`\`\`

A theme update should not change the AuthContext value.

**3. Keep frequently changing state local**

Do not put every keystroke, animation value, or temporary UI state into a broad Context.

**4. Use composition**

Passing children from outside a stateful Provider can prevent the Provider's parent updates from unnecessarily recreating those child elements.

**5. Use selectors or a store when granular subscriptions are required**

Context does not provide built-in selectors. For large applications, consider Redux Toolkit, Zustand, or a selector-based Context library.

**Important:** React.memo does not prevent a component from re-rendering when its own Context value changes.`,
        ],
      ],
      [
        {
          q: 'How do you optimize Context performance?',
          a: 'Memoize Provider values, split unrelated Contexts, keep frequently changing state local, use composition, and use selector-based stores when granular subscriptions are required.',
        },
        {
          q: 'Does React.memo prevent Context re-renders?',
          a: 'No. React.memo can skip re-renders caused by unchanged props, but it does not block updates from a Context value the component consumes.',
        },
      ],
    ),

    topic(
      'when-use-context',
      'When should we use Context API?',
      'Use Context for shared, cross-cutting information that many components need and that does not require highly granular subscriptions.',
      [
        [
          'Decision checklist',
          `Ask these questions:

1. Is the same value needed by multiple distant components?
2. Would passing it through props create unnecessary plumbing?
3. Does the value represent shared environmental information?
4. Does it change relatively infrequently?
5. Can the component tree be organized around a clear Provider?

**Good use cases:**
- Theme
- Locale and translations
- Authenticated user
- Feature flags
- Shared modal manager
- Design-system configuration

**Avoid using Context for:**
- Every form field
- Frequently changing search text across a huge tree
- Complex server-side data caching
- Every piece of application state by default

For server data, consider TanStack Query or framework loaders.

For complex client state, consider Redux Toolkit or Zustand.`,
        ],
      ],
      [
        {
          q: 'Give examples of good Context use cases.',
          a: 'Theme, locale, authenticated user information, feature flags, shared modal management, and design-system configuration are common Context use cases.',
        },
        {
          q: 'When should Context not be used?',
          a: 'Avoid using it for every state variable, frequently changing values across large component trees, or complex server data caching. Consider local state, composition, or dedicated state-management libraries instead.',
        },
      ],
    ),
  ],
}

export default ch