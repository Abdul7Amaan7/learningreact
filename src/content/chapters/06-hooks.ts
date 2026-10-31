
import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'hooks',
  number: 6,
  title: 'React Hooks',
  tagline:
    'High interview priority — understand every important hook, its purpose, syntax, practical usage, and common interview mistakes.',
  priority: 'high',

  topics: [
    // =========================================================
    // 1. useState
    // =========================================================
    topic(
      'usestate-hook',
      'useState()',
      'useState is a React Hook that allows function components to store and manage state. When state changes, React re-renders the component to display the updated UI.',
      [
        [
          'Syntax',
          `\`\`\`tsx
import { useState } from 'react'

const [count, setCount] = useState<number>(0)
\`\`\`

**Returns:** An array containing the current state and a setter function.

- \`count\` → current state value
- \`setCount\` → function used to update state
- \`0\` → initial state

\`\`\`tsx
<button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>
\`\`\``,
        ],
        [
          'Functional updates',
          `When the next state depends on the previous state, use a functional update.

\`\`\`tsx
setCount(previous => previous + 1)
\`\`\`

Example:

\`\`\`tsx
setCount(count => count + 1)
setCount(count => count + 1)
setCount(count => count + 1)
\`\`\`

React processes these updates in sequence, so the count increases by 3.

Using \`setCount(count + 1)\` three times may increase it only once because all three calls can use the same render's state value.`,
        ],
        [
          'Lazy initialization',
          `If calculating the initial state is expensive, pass a function.

\`\`\`tsx
const [data, setData] = useState(() => {
  return calculateInitialData()
})
\`\`\`

React uses the initial value only when initializing the state, not on every ordinary render.

In development Strict Mode, React may call the initializer more than once to check for impurities. Keep it pure.`,
        ],
        [
          'Updating objects and arrays',
          `React state should be updated immutably.

\`\`\`tsx
const [user, setUser] = useState({
  name: 'Rahul',
  age: 20,
})

setUser(previous => ({
  ...previous,
  age: previous.age + 1,
}))
\`\`\`

For arrays:

\`\`\`tsx
setItems(previous => [...previous, newItem])
\`\`\`

Never directly mutate state using \`user.age = 21\` or \`items.push(newItem)\`. See the State chapter for deeper explanations.`,
        ],
        [
          'Interview essentials',
          `- Multiple useState calls maintain independent state variables.
- The setter function has a stable identity.
- React batches state updates in many situations.
- State updates are scheduled; they do not change the value inside the current render.
- React may skip rendering when the new value is identical according to Object.is.
- Functional updates help prevent stale state calculations.
- State belongs to a component's position in the render tree.`,
        ],
      ],
      [
        {
          q: 'Does useState return a new setter function on every render?',
          a: 'No. The setter identity is stable. You can safely include it in dependency arrays, although it usually does not need to be included.',
        },
        {
          q: 'Why does console.log show the old state after setState?',
          a: 'Because state is a snapshot of the current render. The setter schedules a future render; it does not modify the variable in the currently executing function.',
        },
        {
          q: 'What is the difference between setCount(count + 1) and setCount(prev => prev + 1)?',
          a: 'The first uses the state value captured by the current render. The second receives the latest queued state and is safer when multiple updates depend on previous state.',
        },
        {
          q: 'Can useState store an object or array?',
          a: 'Yes. However, you must create a new object or array when updating it instead of mutating the existing state.',
        },
      ],
    ),

    // =========================================================
    // 2. useEffect
    // =========================================================
    topic(
      'useeffect-hook',
      'useEffect()',
      'useEffect synchronizes a React component with external systems. It is commonly used for subscriptions, timers, browser APIs, and network requests when needed.',
      [
        [
          'Syntax',
          `\`\`\`tsx
useEffect(() => {
  // Setup or synchronization

  return () => {
    // Cleanup
  }
}, [dependencies])
\`\`\`

**Execution:** Setup runs after React commits the render. If cleanup exists, React runs it before the next setup when dependencies change and when the component unmounts.`,
        ],
        [
          'Three dependency patterns',
          `**1. No dependency array**

\`\`\`tsx
useEffect(() => {
  console.log('After every commit')
})
\`\`\`

Runs after every committed render.

**2. Empty dependency array**

\`\`\`tsx
useEffect(() => {
  console.log('After initial mount')
}, [])
\`\`\`

Runs on mount. Cleanup runs on unmount.

**3. Dependency array**

\`\`\`tsx
useEffect(() => {
  console.log('When userId changes')
}, [userId])
\`\`\`

Runs on mount and again when a dependency changes according to Object.is.`,
        ],
        [
          'Real-world example: document title',
          `\`\`\`tsx
import { useEffect, useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = \`Count: \${count}\`
  }, [count])

  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count}
    </button>
  )
}
\`\`\`

React updates the document title whenever count changes.`,
        ],
        [
          'Cleanup example: event listener',
          `\`\`\`tsx
useEffect(() => {
  function handleResize() {
    console.log(window.innerWidth)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])
\`\`\`

Cleanup prevents duplicate listeners and memory leaks.

In development Strict Mode, React intentionally performs an extra setup → cleanup → setup cycle to help identify incorrect effects.`,
        ],
        [
          'Important gotchas',
          `- Effects run only on the client, not during server rendering.
- Dependencies must include reactive values used by the effect.
- Do not suppress exhaustive-deps warnings without understanding why.
- Avoid effects for calculations that can be done during rendering.
- Avoid effects for handling user events that belong directly inside event handlers.
- Effects are for synchronization, not for making React state work unnecessarily complicated.

For example, calculate \`fullName\` directly from \`firstName\` and \`lastName\` instead of maintaining another state variable with useEffect.`,
        ],
      ],
      [
        {
          q: 'What is useEffect used for?',
          a: 'It synchronizes a component with external systems such as subscriptions, timers, browser APIs, network requests, and third-party libraries.',
        },
        {
          q: 'What does the dependency array do?',
          a: 'It tells React which reactive values should trigger the effect to re-synchronize when they change.',
        },
        {
          q: 'Why does useEffect run twice in development?',
          a: 'React Strict Mode performs an extra setup and cleanup cycle to detect effects that are not correctly cleaned up. This does not happen in production in the same way.',
        },
        {
          q: 'Should useEffect be used to calculate derived state?',
          a: 'Usually no. Calculate derived values during render or use useMemo if the calculation is expensive. Effects are meant for synchronization with external systems.',
        },
      ],
    ),

    // =========================================================
    // 3. useContext
    // =========================================================
    topic(
      'usecontext-hook',
      'useContext()',
      'useContext allows a component to read data from the nearest matching Context Provider without manually passing props through every intermediate component.',
      [
        [
          'Syntax',
          `\`\`\`tsx
import { createContext, useContext } from 'react'

const ThemeContext = createContext('light')

function Profile() {
  const theme = useContext(ThemeContext)

  return <div>Current theme: {theme}</div>
}
\`\`\`

**Returns:** The current value of the nearest matching Context Provider.

If no Provider exists above the component, React returns the default value passed to createContext.`,
        ],
        [
          'Provider example',
          `\`\`\`tsx
import { createContext, useContext, useState }from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<Theme>('light')

function App() {
  const [theme, setTheme] = useState<Theme>('light')

  return (
    <ThemeContext.Provider value={theme}>
      <button
        onClick={() =>
          setTheme(t => t === 'light' ? 'dark' : 'light')
        }
      >
        Toggle Theme
      </button>

      <Profile />
    </ThemeContext.Provider>
  )
}

function Profile() {
  const theme = useContext(ThemeContext)

  return <div className={theme}>Profile</div>
}
\`\`\`

Profile can access the theme without receiving it as a prop from App.`,
        ],
        [
          'Real-world use cases',
          `- Theme management (light/dark mode)
- Authentication (current user)
- Language or localization
- Application settings
- Shared feature configuration

Context is not automatically a complete state-management solution. It provides a way to share values; state and updates still need to be managed.`,
        ],
        [
          'Performance gotcha',
          `When a Provider's value changes, consumers of that context re-render.

\`\`\`tsx
<AuthContext.Provider value={{ user, login }}>
\`\`\`

This object is recreated on every render. In larger applications, consider stabilizing values with useMemo/useCallback or splitting contexts by responsibility.

React.memo does not prevent a component from re-rendering when its consumed context changes.`,
        ],
      ],
      [
        {
          q: 'How does useContext work?',
          a: 'It reads the value from the closest matching Provider above the component and subscribes to context updates.',
        },
        {
          q: 'What happens if no Provider is present?',
          a: 'React returns the default value supplied to createContext. If that default is undefined, the result is undefined.',
        },
        {
          q: 'Does Context replace Redux?',
          a: 'Not necessarily. Context shares values through the component tree. Redux additionally provides a structured external store, reducers, middleware, DevTools, and other state-management capabilities.',
        },
      ],
    ),

    // =========================================================
    // 4. useRef
    // =========================================================
    topic(
      'useref',
      'useRef()',
      'useRef returns a persistent mutable object whose current property can be changed without causing a component re-render.',
      [
        [
          'Syntax',
          `\`\`\`tsx
import { useRef } from 'react'

const inputRef = useRef<HTMLInputElement>(null)
\`\`\`

Returns an object:

\`\`\`tsx
{ current: null }
\`\`\`

React preserves the same ref object between renders.`,
        ],
        [
          'Use case 1: DOM access',
          `\`\`\`tsx
function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFocus() {
    inputRef.current?.focus()
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleFocus}>
        Focus Input
      </button>
    </>
  )
}
\`\`\`

This allows direct interaction with a DOM element when necessary.`,
        ],
        [
          'Use case 2: Store a timer ID',
          `\`\`\`tsx
const timerRef = useRef<number | undefined>()

function startTimer() {
  timerRef.current = window.setTimeout(() => {
    console.log('Timer completed')
  }, 2000)
}

function stopTimer() {
  if (timerRef.current !== undefined) {
    clearTimeout(timerRef.current)
  }
}
\`\`\`

The timer ID can be stored without causing a render.`,
        ],
        [
          'useRef vs useState',
          `| Feature | useState | useRef |
| |---|---|
| Stores value | Yes | Yes |
| Causes render on update | Yes | No |
| Used for visible UI | Yes | Not directly |
| Mutable current property | No | Yes |
| Preserved between renders | Yes | Yes |

Use state for values that affect the UI. Use refs for DOM references and mutable values that do not need to appear in the UI.`,
        ],
        [
          'Important gotchas',
          `- Updating ref.current does not trigger a re-render.
- Do not use refs as a replacement for state when the UI needs to update.
- Avoid reading or writing refs during rendering, except for initialization.
- useRef returns the same object between renders.
- createRef() creates a new object each time it is called, so it is generally unsuitable inside function components.`,
        ],
      ],
      [
        {
          q: 'Does changing ref.current re-render a component?',
          a: 'No. Changing ref.current is a mutable operation and does not trigger React rendering.',
        },
        {
          q: 'What is the difference between useRef and useState?',
          a: 'useState stores values that affect the UI and triggers re-renders. useRef stores persistent mutable values without triggering re-renders.',
        },
        {
          q: 'Can useRef store previous state?',
          a: 'Yes. It can store previous values between renders, although the logic must be implemented carefully.',
        },
      ],
    ),

    // =========================================================
    // 5. useMemo
    // =========================================================
    topic(
      'usememo',
      'useMemo()',
      'useMemo caches the result of a calculation between renders. React recomputes the value when one of its dependencies changes.',
      [
        [
          'Syntax',
          `\`\`\`tsx
const result = useMemo(() => {
  return expensiveCalculation(data)
}, [data])
\`\`\`

**Returns:** The cached calculation result.

It is useful when calculations are expensive or when a stable object or array reference is needed for optimization.`,
        ],
        [
          'Real-world example: filtering products',
          `\`\`\`tsx
import { useMemo, useState } from 'react'

function Products({ products }: {
  products: string[]
}) {
  const [search, setSearch] = useState('')

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.toLowerCase().includes(search.toLowerCase())
    )
  }, [products, search])

  return (
    <>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filteredProducts.map(product => (
        <p key={product}>{product}</p>
      ))}
    </>
  )
}
\`\`\`

The filtering calculation runs again when products or search changes.`,
        ],
        [
          'When to use',
          `- Expensive calculations
- Large filtering, sorting, or transformation operations
- Stable object or array references passed to memoized children
- Performance optimization after profiling

Do not use it for simple calculations like \`const sum = a + b\`. Memoization itself has a cost.`,
        ],
        [
          'Important gotchas',
          `- useMemo is a performance optimization, not a correctness guarantee.
- Dependencies are compared using Object.is.
- The calculation must be pure.
- Do not use it to store application state.
- React may discard cached values in certain circumstances.
- React Compiler can automatically memoize some calculations in supported configurations.`,
        ],
      ],
      [
        {
          q: 'What does useMemo do?',
          a: 'It caches a calculated value and recomputes it when dependencies change, helping avoid unnecessary expensive calculations.',
        },
        {
          q: 'useMemo vs useCallback?',
          a: 'useMemo caches the result of a function. useCallback caches the function identity itself.',
        },
        {
          q: 'Is useMemo always required for performance?',
          a: 'No. Use it when profiling shows a meaningful performance benefit or when stable references are needed for a memoization strategy.',
        },
      ],
    ),

    // =========================================================
    // 6. useCallback
    // =========================================================
    topic(
      'usecallback',
      'useCallback()',
      'useCallback caches a function definition between renders. It is useful when function identity matters, particularly with memoized child components or effect dependencies.',
      [
        [
          'Syntax',
          `\`\`\`tsx
const handleClick = useCallback(() => {
  console.log('Clicked')
}, [])
\`\`\`

The function is reused while its dependencies remain unchanged.

Conceptually:

\`\`\`tsx
useCallback(fn, dependencies)
\`\`\`

is equivalent to:

\`\`\`tsx
useMemo(() => fn, dependencies)
\`\`\``,
        ],
        [
          'Real-world example: memoized child',
          `\`\`\`tsx
import { memo, useCallback, useState } from 'react'

const Child = memo(function Child({
  onSave
}: {
  onSave: () => void
}) {
  console.log('Child rendered')

  return <button onClick={onSave}>Save</button>
})

function Parent() {
  const [count, setCount] = useState(0)

  const handleSave = useCallback(() => {
    console.log('Saved successfully')
  }, [])

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>

      <Child onSave={handleSave} />
    </>
  )
}
\`\`\`

When Parent re-renders, handleSave keeps the same reference, allowing the memoized Child to skip re-rendering when its other props are unchanged.`,
        ],
        [
          'When to use',
          `- Passing callbacks to React.memo components
- Maintaining stable function references
- Avoiding unnecessary effect re-synchronization
- Custom hooks that expose stable callbacks

If the child is not memoized and no other optimization needs the function identity, useCallback may provide no meaningful benefit.`,
        ],
        [
          'Important gotchas',
          `- useCallback does not prevent the parent from re-rendering.
- It does not automatically prevent a child from rendering.
- Dependencies must include reactive values referenced by the function.
- Prefer functional state updates when they help reduce dependencies.
- React Compiler may automatically optimize function identity in supported configurations.`,
        ],
      ],
      [
        {
          q: 'What is the difference between useCallback and useMemo?',
          a: 'useCallback caches a function reference. useMemo caches a computed result. useCallback(fn, deps) is conceptually equivalent to useMemo(() => fn, deps).',
        },
        {
          q: 'Does useCallback stop re-renders?',
          a: 'No. It stabilizes a function reference. It can help a memoized child skip rendering when its props remain unchanged.',
        },
        {
          q: 'Why use useCallback with React.memo?',
          a: 'React.memo compares props by reference. A new inline function on every render can cause the child to render again. useCallback can preserve the function reference.',
        },
      ],
    ),

    // =========================================================
    // 7. useReducer
    // =========================================================
    topic(
      'usereducer',
      'useReducer()',
      'useReducer manages state through a reducer function. It is useful when state transitions are complex, related, or easier to describe as actions.',
      [
        [
          'Syntax',
          `\`\`\`tsx
const [state, dispatch] = useReducer(
  reducer,
  initialState
)
\`\`\`

Reducer signature:

\`\`\`tsx
(state, action) => newState
\`\`\`

- state → current state
- action → describes what happened
- dispatch → sends an action to the reducer`,
        ],
        [
          'Practical example: counter',
          `\`\`\`tsx
import { useReducer } from 'react'

type State = {
  count: number
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }

    case 'decrement':
      return { count: state.count - 1 }

    case 'reset':
      return { count: 0 }

    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
  })

  return (
    <>
      <h2>{state.count}</h2>

      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>

      <button onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>

      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </>
  )
}
\`\`\``,
        ],
        [
          'Lazy initialization',
          `\`\`\`tsx
function init(initialCount: number) {
  return { count: initialCount }
}

const [state, dispatch] = useReducer(
  reducer,
  10,
  init
)
\`\`\`

The third argument initializes state through a function rather than directly using the second argument as state.`,
        ],
        [
          'When to use useReducer',
          `- Complex forms with multiple related fields
- Shopping cart state
- Multi-step workflows
- State transitions with multiple actions
- State logic that needs isolated testing

For simple independent values, useState is generally easier.`,
        ],
        [
          'Important gotchas',
          `- Reducers must be pure.
- Never mutate the existing state.
- dispatch has a stable identity.
- Actions should describe what happened.
- React may batch dispatches.
- State updates are not immediately visible inside the current render.`,
        ],
      ],
      [
        {
          q: 'What is the difference between useState and useReducer?',
          a: 'useState is simpler for individual state values. useReducer is useful for complex transitions, related state, and action-based updates.',
        },
        {
          q: 'What is a reducer?',
          a: 'A pure function that receives the current state and an action, then returns the next state.',
        },
        {
          q: 'Can a reducer directly modify the state?',
          a: 'No. A reducer must return the next state without mutating the existing state object.',
        },
      ],
    ),

    // =========================================================
    // 8. useLayoutEffect
    // =========================================================
    topic(
      'uselayouteffect',
      'useLayoutEffect()',
      'useLayoutEffect runs after React updates the DOM but before the browser paints. It is mainly used when DOM measurement or visual correction must happen before the user sees the screen.',
      [
        [
          'Syntax',
          `\`\`\`tsx
useLayoutEffect(() => {
  // Measure or update DOM

  return () => {
    // Cleanup
  }
}, [dependencies])
\`\`\`

It blocks browser painting while its synchronous work executes. This makes it more expensive than useEffect.`,
        ],
        [
          'Real-world use case: measuring an element',
          `\`\`\`tsx
import { useLayoutEffect, useRef, useState } from 'react'

function Box() {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height)
    }
  }, [])

  return (
    <>
      <div ref={ref}>Measure this box</div>
      <p>Height: {height}px</p>
    </>
  )
}
\`\`\`

This measurement happens before the browser paints the updated frame.`,
        ],
        [
          'useEffect vs useLayoutEffect',
          `**useEffect:** Runs after paint in the usual non-interaction case. Does not block painting.

**useLayoutEffect:** Runs after DOM mutations but before paint. Blocks painting until its synchronous work and state updates are processed.

Prefer useEffect unless the visual timing requirement specifically needs useLayoutEffect.`,
        ],
        [
          'Important gotchas',
          `- Can hurt performance because it blocks paint.
- Use for layout measurements, scroll positioning, and visual synchronization.
- Avoid using it for fetching data or ordinary state synchronization.
- It has no layout to measure during server rendering. Consider an appropriate client-only strategy or useEffect for SSR applications.`,
        ],
      ],
      [
        {
          q: 'What is the difference between useEffect and useLayoutEffect?',
          a: 'useEffect generally runs after paint. useLayoutEffect runs synchronously after DOM updates and before paint, which is useful for layout measurement and avoiding visual flicker.',
        },
        {
          q: 'Why is useLayoutEffect considered expensive?',
          a: 'It blocks browser painting until its work completes, potentially delaying the visual update.',
        },
      ],
    ),

    // =========================================================
    // 9. useImperativeHandle
    // =========================================================
    topic(
      'useimperativehandle',
      'useImperativeHandle()',
      'useImperativeHandle customizes the value exposed through a ref. It allows a child component to expose a limited imperative API instead of exposing its entire DOM node.',
      [
        [
          'Syntax',
          `\`\`\`tsx
useImperativeHandle(ref, () => ({
  focus() {
    // Imperative action
  }
}), [dependencies])
\`\`\`

Commonly used for focus, reset, scroll, or other actions that cannot be easily expressed through props.`,
        ],
        [
          'Practical example',
          `\`\`\`tsx
import {
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react'

type InputHandle = {
  focus: () => void
  clear: () => void
}

const CustomInput = forwardRef<InputHandle, {}>(
  function CustomInput(_, ref) {
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus()
      },

      clear() {
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      },
    }), [])

    return <input ref={inputRef} />
  }
)

function Parent() {
  const inputRef = useRef<InputHandle>(null)

  return (
    <>
      <CustomInput ref={inputRef} />

      <button onClick={() => inputRef.current?.focus()}>
        Focus
      </button>

      <button onClick={() => inputRef.current?.clear()}>
        Clear
      </button>
    </>
  )
}
\`\`\`

React 19 allows ref to be passed as a prop in function components. forwardRef is still relevant for React 18 compatibility and existing codebases.`,
        ],
        [
          'When to use',
          `- Expose a focus method
- Provide a reset or clear method
- Trigger a specific child imperative action
- Integrate with third-party imperative libraries

Use declarative props for normal UI behavior. Imperative APIs should be small and intentional.`,
        ],
      ],
      [
        {
          q: 'What is useImperativeHandle?',
          a: 'It allows a component to customize the object or value exposed to its parent through a ref.',
        },
        {
          q: 'Why use useImperativeHandle instead of exposing the DOM node?',
          a: 'It gives the parent a limited API such as focus or clear, without exposing unnecessary internal implementation details.',
        },
      ],
    ),

    // =========================================================
    // 10. useDebugValue
    // =========================================================
    topic(
      'usedebugvalue',
      'useDebugValue()',
      'useDebugValue adds a readable debugging label for custom hooks in React DevTools. It does not change the rendered UI.',
      [
        [
          'Syntax',
          `\`\`\`tsx
useDebugValue(value)
\`\`\`

Optional formatter:

\`\`\`tsx
useDebugValue(value, format)
\`\`\`

The formatter can be used to format the value for display in DevTools.`,
        ],
        [
          'Practical example',
          `\`\`\`tsx
import { useDebugValue, useState } from 'react'

function useUser() {
  const [user] = useState({
    name: 'Rahul',
    role: 'Admin',
  })

  useDebugValue(user ? user.name : 'Guest')

  return user
}
\`\`\`

When debugging this custom hook, DevTools can display a useful label such as Rahul.`,
        ],
        [
          'Important gotchas',
          `- Mainly useful for custom hooks.
- Does not affect production UI.
- Optional for most application developers.
- A formatter can defer formatting work until DevTools needs it.`,
        ],
      ],
      [
        {
          q: 'What is useDebugValue?',
          a: 'It displays additional debugging information for custom hooks in React DevTools.',
        },
        {
          q: 'Is useDebugValue required for every custom hook?',
          a: 'No. It is optional and is most helpful for hooks that expose complex values or state.',
        },
      ],
    ),

    // =========================================================
    // 11. useId
    // =========================================================
    topic(
      'useid',
      'useId()',
      'useId generates a unique ID that remains stable across renders and supports server rendering and hydration. It is primarily used for accessibility relationships between HTML elements.',
      [
        [
          'Syntax',
          `\`\`\`tsx
const id = useId()
\`\`\`

React generates an ID that can be reused across related accessibility attributes.`,
        ],
        [
          'Practical example',
          `\`\`\`tsx
import { useId } from 'react'

function EmailField() {
  const id = useId()

  return (
    <>
      <label htmlFor={id}>
        Email Address
      </label>

      <input
        id={id}
        type="email"
        aria-describedby={\`\${id}-hint\`}
      />

      <small id={\`\${id}-hint\`}>
        Enter your email address.
      </small>
    </>
  )
}
\`\`\`

This keeps the label, input, and description connected without manually creating IDs.`,
        ],
        [
          'Important gotchas',
          `- Do not use useId for list keys.
- Keys should come from your data.
- Do not use it as a database identifier.
- It is designed for accessibility and SSR/hydration consistency.
- Multiple independent React roots may require identifierPrefix configuration.`,
        ],
      ],
      [
        {
          q: 'Why was useId introduced?',
          a: 'To generate stable IDs for accessibility attributes that remain consistent between server rendering and client hydration.',
        },
        {
          q: 'Can useId replace the key prop?',
          a: 'No. List keys should come from stable data identifiers, not IDs generated during rendering.',
        },
      ],
    ),

    // =========================================================
    // 12. useTransition
    // =========================================================
    topic(
      'usetransition',
      'useTransition()',
      'useTransition allows React to mark certain state updates as non-urgent transitions. This keeps urgent interactions, such as typing, responsive while heavier rendering work happens in the background.',
      [
        [
          'Syntax',
          `\`\`\`tsx
const [isPending, startTransition] = useTransition()
\`\`\`

- isPending → indicates that a transition is in progress
- startTransition → marks state updates inside it as transitions`,
        ],
        [
          'Practical example: search',
          `\`\`\`tsx
import { useState, useTransition } from 'react'

function Search({ items }: {
  items: string[]
}) {
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleChange(value: string) {
    setInput(value)

    startTransition(() => {
      setQuery(value)
    })
  }

  const filtered = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <input
        value={input}
        onChange={e => handleChange(e.target.value)}
      />

      {isPending && <p>Updating results...</p>}

      {filtered.map(item => (
        <p key={item}>{item}</p>
      ))}
    </>
  )
}
\`\`\`

The input state updates urgently, while the query update is marked as a transition.`,
        ],
        [
          'Urgent vs non-urgent updates',
          `**Urgent:** Text input value, button feedback, typing, immediate interactions.

**Non-urgent:** Heavy filtering, rendering a large result list, updating complex views.

Transitions allow React to prioritize more urgent work.`,
        ],
        [
          'Important gotchas',
          `- Do not use a transition for the controlled input state itself.
- startTransition does not delay the function's execution like setTimeout.
- React schedules updates marked as transitions at a lower priority.
- State updates after an await may require another startTransition.
- useTransition is a rendering priority tool, not a replacement for debouncing or throttling.`,
        ],
      ],
      [
        {
          q: 'What problem does useTransition solve?',
          a: 'It helps keep urgent interactions responsive by marking expensive state updates as non-urgent.',
        },
        {
          q: 'What is isPending?',
          a: 'A boolean that indicates whether the transition started by that hook is currently pending.',
        },
        {
          q: 'Can useTransition replace useState?',
          a: 'No. It works alongside state setters to control update priority. It does not store application state itself.',
        },
      ],
    ),

    // =========================================================
    // 13. useDeferredValue
    // =========================================================
    topic(
      'usedeferredvalue',
      'useDeferredValue()',
      'useDeferredValue returns a deferred version of a value. React can allow the deferred value to lag behind the current value while rendering expensive UI at a lower priority.',
      [
        [
          'Syntax',
          `\`\`\`tsx
const deferredValue = useDeferredValue(value)
\`\`\`

You do not provide a dependency array. React automatically tracks changes to the value.`,
        ],
        [
          'Practical example',
          `\`\`\`tsx
import {
  useDeferredValue,
  useState,
  memo
} from 'react'

const Results = memo(function Results({
  query,
  items
}: {
  query: string
  items: string[]
}) {
  const filtered = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      {filtered.map(item => (
        <p key={item}>{item}</p>
      ))}
    </div>
  )
})

function Search({ items }: {
  items: string[]
}) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const isStale = query !== deferredQuery

  return (
    <>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <Results query={deferredQuery} items={items} />
      </div>
    </>
  )
}
\`\`\`

The input updates immediately while the results can update later.`,
        ],
        [
          'useTransition vs useDeferredValue',
          `**useTransition:** You control the state update and can mark it as non-urgent using startTransition.

**useDeferredValue:** You already have a value and want React to defer rendering that value's consumers.

Both use React's concurrent rendering capabilities to improve responsiveness.`,
        ],
        [
          'Important gotchas',
          `- It does not debounce network requests.
- It does not guarantee a specific delay.
- Expensive children often need memoization to benefit.
- It is useful when rendering is expensive, not when the underlying operation is an expensive API request.`,
        ],
      ],
      [
        {
          q: 'What is useDeferredValue?',
          a: 'It returns a deferred version of a value that may lag behind the latest value to keep urgent UI updates responsive.',
        },
        {
          q: 'Does useDeferredValue debounce API calls?',
          a: 'No. It defers rendering work. Debouncing is a separate technique that delays an operation until changes stop for a specified duration.',
        },
        {
          q: 'What is the difference between useTransition and useDeferredValue?',
          a: 'useTransition marks a state update as non-urgent. useDeferredValue defers the use of an existing value.',
        },
      ],
    ),

    // =========================================================
    // 14. useSyncExternalStore
    // =========================================================
    topic(
      'usesyncexternalstore',
      'useSyncExternalStore()',
      'useSyncExternalStore subscribes React components to external stores in a way that supports concurrent rendering and consistent snapshots.',
      [
        [
          'Syntax',
          `\`\`\`tsx
const snapshot = useSyncExternalStore(
  subscribe,
  getSnapshot,
  getServerSnapshot?
)
\`\`\`

- subscribe → registers a listener and returns an unsubscribe function
- getSnapshot → returns the current store value
- getServerSnapshot → optional snapshot for server rendering and hydration`,
        ],
        [
          'Practical example: browser online status',
          `\`\`\`tsx
import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)

  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

function getSnapshot() {
  return navigator.onLine
}

function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => true
  )
}

function Status() {
  const isOnline = useOnlineStatus()

  return (
    <p>
      {isOnline ? 'Online' : 'Offline'}
    </p>
  )
}
\`\`\`

This hook correctly subscribes to browser events and reads the latest online status.`,
        ],
        [
          'Important gotchas',
          `- getSnapshot must return a cached or stable snapshot when nothing changes.
- Returning a newly created object every time can cause repeated rendering or an error.
- subscribe should have a stable identity where practical; changing it causes re-subscription.
- It is especially important for libraries that expose external stores.
- Redux uses this API internally in modern React integration patterns.`,
        ],
      ],
      [
        {
          q: 'Why use useSyncExternalStore?',
          a: 'It provides a reliable way to subscribe to external stores and read consistent snapshots during concurrent rendering, helping prevent tearing.',
        },
        {
          q: 'What is tearing?',
          a: 'A situation where different parts of the UI observe inconsistent versions of shared state during rendering.',
        },
        {
          q: 'Is useSyncExternalStore needed for normal useState?',
          a: 'No. It is designed for external stores and subscriptions, not ordinary component state.',
        },
      ],
    ),

    // =========================================================
    // 15. useInsertionEffect
    // =========================================================
    topic(
      'useinsertioneffect',
      'useInsertionEffect()',
      'useInsertionEffect runs before layout effects. It is primarily intended for CSS-in-JS libraries that need to inject styles before layout measurement.',
      [
        [
          'Syntax',
          `\`\`\`tsx
useInsertionEffect(() => {
  // Insert styles
}, [dependencies])
\`\`\`

Execution order:

\`\`\`
useInsertionEffect
       ↓
useLayoutEffect
       ↓
Browser Paint
       ↓
useEffect
\`\`\``,
        ],
        [
          'Purpose',
          `CSS-in-JS libraries can use this hook to insert styles before layout effects read the DOM.

This prevents style injection from interfering with layout measurement.

Application developers should almost never need this hook directly.`,
        ],
        [
          'Important gotchas',
          `- Do not use it for data fetching.
- Do not use it as a replacement for useEffect.
- State updates are not the intended use.
- Refs cannot generally be accessed during this phase.
- It is designed for library authors and specialized styling systems.`,
        ],
      ],
      [
        {
          q: 'What is useInsertionEffect used for?',
          a: 'It allows CSS-in-JS libraries to inject styles before layout effects run, helping prevent incorrect layout measurements.',
        },
        {
          q: 'Should application developers use useInsertionEffect?',
          a: 'Almost never. It is primarily intended for CSS-in-JS library authors.',
        },
      ],
    ),

    // =========================================================
    // 16. useActionState (React 19)
    // =========================================================
    topic(
      'useactionstate',
      'useActionState()',
      'useActionState is a React 19 Hook that manages the result and pending state of an action, especially useful for form submissions and asynchronous actions.',
      [
        [
          'Syntax',
          `\`\`\`tsx
const [state, formAction, isPending] =
  useActionState(action, initialState)
\`\`\`

- state → result returned by the action
- formAction → function used to submit the action
- isPending → whether the action is in progress`,
        ],
        [
          'Practical example: form submission',
          `\`\`\`tsx
import { useActionState } from 'react'

type FormState = {
  message: string
}

async function submitName(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name')

  if (!name) {
    return { message: 'Please enter your name.' }
  }

  return { message: \`Hello, \${name}!\` }
}

function NameForm() {
  const [state, formAction, isPending] = useActionState(
    submitName,
    { message: '' }
  )

  return (
    <form action={formAction}>
      <input name="name" placeholder="Enter your name" />

      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>

      <p>{state.message}</p>
    </form>
  )
}
\`\`\`

The action receives the previous state and form data, then returns the next state.`,
        ],
        [
          'When to use',
          `- Form submissions
- Server Actions
- Managing submission results
- Pending and success/error feedback
- Progressive enhancement form workflows

Related React DOM hook: useFormStatus, which provides information about the parent form submission.`,
        ],
        [
          'Important gotchas',
          `- This is a React 19 API.
- The action should return the next state.
- isPending can be used to disable or update the submit button.
- Server Actions are framework-dependent; use a supported framework for server-side execution.
- Do not confuse useActionState with useReducer. One manages actions and results, while the other manages general component state transitions.`,
        ],
      ],
      [
        {
          q: 'What is useActionState?',
          a: 'A React 19 Hook that manages the state and pending status of an action, commonly used for forms and asynchronous submissions.',
        },
        {
          q: 'What is the difference between useActionState and useReducer?',
          a: 'useReducer manages synchronous state transitions through a reducer. useActionState manages the result of an action, including asynchronous actions and pending status.',
        },
      ],
    ),

    // =========================================================
    // 17. useOptimistic (React 19)
    // =========================================================
    topic(
      'useoptimistic',
      'useOptimistic()',
      'useOptimistic allows React to show an expected state immediately while an asynchronous operation is running. It is useful for creating responsive interfaces before the server confirms a change.',
      [
        [
          'Syntax',
          `\`\`\`tsx
const [optimisticState, addOptimistic] =
  useOptimistic(state, updateFn)
\`\`\`

- optimisticState → temporary state displayed in the UI
- addOptimistic → dispatches an optimistic update
- updateFn → calculates the optimistic state`,
        ],
        [
          'Practical example: adding a comment',
          `\`\`\`tsx
import { useOptimistic, useState } from 'react'

type Comment = {
  id: number
  text: string
}

function Comments() {
  const [comments, setComments] = useState<Comment[]>([])

  const [optimisticComments, addOptimisticComment] =
    useOptimistic(
      comments,
      (state, newComment: Comment) => [
        ...state,
        newComment,
      ]
    )

  async function handleSubmit(formData: FormData) {
    const text = String(formData.get('comment') ?? '')

    if (!text.trim()) return

    const newComment = {
      id: Date.now(),
      text,
    }

    addOptimisticComment(newComment)

    // Simulate saving to a server
    await new Promise(resolve => setTimeout(resolve, 1000))

    setComments(previous => [...previous, newComment])
  }

  return (
    <>
      <form action={handleSubmit}>
        <input name="comment" placeholder="Write a comment" />
        <button>Post</button>
      </form>

      {optimisticComments.map(comment => (
        <p key={comment.id}>{comment.text}</p>
      ))}
    </>
  )
}
\`\`\`

In a real application, connect this to an actual server action or API request and handle failures appropriately.`,
        ],
        [
          'When to use',
          `- Chat messages
- Likes and reactions
- Comments
- Shopping cart updates
- Form submissions
- Any action where immediate feedback improves UX`,
        ],
        [
          'Important gotchas',
          `- Optimistic state is temporary.
- The actual state should eventually be updated by the real operation.
- Handle server failures and validation.
- React can revert the optimistic state when the action or transition ends without a confirmed update.
- Do not confuse optimistic UI with permanently updating state before the server succeeds.`,
        ],
      ],
      [
        {
          q: 'What is optimistic UI?',
          a: 'It immediately displays the expected result of an action before the server confirms it, making the interface feel faster.',
        },
        {
          q: 'What does useOptimistic do?',
          a: 'It allows React to temporarily display optimistic state while an asynchronous operation is in progress.',
        },
        {
          q: 'Does useOptimistic replace useState?',
          a: 'No. It works alongside actual state and provides a temporary optimistic version of that state.',
        },
      ],
    ),

    // =========================================================
    // 18. Custom Hooks
    // =========================================================
    topic(
      'custom-hooks',
      'What are custom hooks?',
      'A custom Hook is a JavaScript or TypeScript function whose name starts with use and that can call other React Hooks. It allows developers to reuse stateful logic across multiple components without duplicating code.',
      [
        [
          'Basic syntax',
          `\`\`\`tsx
function useSomething() {
  // Call built-in Hooks here

  return something
}
\`\`\`

Naming convention: custom hooks must start with \`use\`, followed by a meaningful name.

A custom hook returns data, functions, or state. It does not return JSX like a component.`,
        ],
        [
          'Practical example: useCounter',
          `\`\`\`tsx
import { useState } from 'react'

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const increment = () => {
    setCount(previous => previous + 1)
  }

  const decrement = () => {
    setCount(previous => previous - 1)
  }

  const reset = () => {
    setCount(initialValue)
  }

  return {
    count,
    increment,
    decrement,
    reset,
  }
}

function Counter() {
  const {
    count,
    increment,
    decrement,
    reset,
  } = useCounter(10)

  return (
    <>
      <h2>{count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </>
  )
}
\`\`\`

The component stays clean because the counter logic is extracted into a reusable hook.`,
        ],
        [
          'Custom hooks share logic, not automatically state',
          `\`\`\`tsx
function ComponentA() {
  const counter = useCounter()
}

function ComponentB() {
  const counter = useCounter()
}
\`\`\`

These two components have independent counter states.

A custom hook does not automatically share state between components. To share state, use Context, an external store, or another shared state solution.`,
        ],
        [
          'When to create custom hooks',
          `- Repeated state and effect logic
- Data-fetching logic
- Form logic
- Authentication logic
- Browser event subscriptions
- Reusable stateful behavior

Keep custom hooks focused on one responsibility.`,
        ],
      ],
      [
        {
          q: 'What is a custom Hook?',
          a: 'A function starting with use that composes React Hooks to reuse stateful logic across components.',
        },
        {
          q: 'Do custom hooks share state?',
          a: 'Not by default. Each call has its own state. Shared state requires Context, an external store, or another shared mechanism.',
        },
        {
          q: 'Can a custom hook return JSX?',
          a: 'It should not return JSX as a component would. Custom hooks return values and functions. Components return JSX.',
        },
      ],
    ),

    // =========================================================
    // 19. Why Custom Hooks?
    // =========================================================
    topic(
      'why-custom-hooks',
      'Why do we need custom hooks?',
      'Custom Hooks help extract duplicated stateful logic into reusable functions. They improve maintainability, readability, and testing without introducing additional component layers.',
      [
        [
          'Before: duplicated logic',
          `\`\`\`tsx
function ComponentA() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
}
\`\`\`

The same logic may be repeated in several components.`,
        ],
        [
          'After: reusable custom hook',
          `\`\`\`tsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return width
}

function ComponentA() {
  const width = useWindowWidth()
}

function ComponentB() {
  const width = useWindowWidth()
}
\`\`\`

Both components reuse the behavior without duplicating the logic.`,
        ],
        [
          'Advantages',
          `- Avoid code duplication
- Improve component readability
- Make stateful logic reusable
- Easier to test and maintain
- Avoid deeply nested Higher-Order Components
- Allow multiple reusable hooks to compose together`,
        ],
      ],
      [
        {
          q: 'Why use custom hooks instead of Higher-Order Components?',
          a: 'Custom hooks avoid wrapper nesting, simplify logic composition, and allow stateful behavior to be reused directly inside components.',
        },
        {
          q: 'Do custom hooks replace components?',
          a: 'No. Components manage rendering. Custom hooks extract and reuse stateful logic.',
        },
      ],
    ),

    // =========================================================
    // 20. How to Create Custom Hooks
    // =========================================================
    topic(
      'how-to-create-custom-hooks',
      'How to create custom hooks?',
      'To create a custom Hook, identify reusable stateful logic, extract it into a function whose name starts with use, pass inputs as arguments, and return the values or functions that components need.',
      [
        [
          'Step-by-step recipe',
          `**Step 1:** Identify duplicated state or effect logic.

**Step 2:** Extract the logic into a function.

**Step 3:** Start the function name with \`use\`.

**Step 4:** Accept parameters for dynamic inputs.

**Step 5:** Return the state, values, or functions needed by the component.

**Step 6:** Follow the Rules of Hooks.

**Step 7:** Test the behavior and reuse it in multiple components.`,
        ],
        [
          'Practical example: useToggle',
          `\`\`\`tsx
import { useState } from 'react'

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = () => {
    setValue(previous => !previous)
  }

  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)

  return {
    value,
    toggle,
    setTrue,
    setFalse,
  }
}

function Toggle() {
  const {
    value,
    toggle,
  } = useToggle(false)

  return (
    <button onClick={toggle}>
      {value ? 'ON' : 'OFF'}
    </button>
  )
}
\`\`\`

This hook can be reused for menus, modals, dropdowns, and visibility controls.`,
        ],
        [
          'Best practices',
          `- Give the hook a clear, descriptive name.
- Keep each hook focused on a specific responsibility.
- Return only what consumers need.
- Prefer an object when returning several named values.
- Keep side effects and cleanup correct.
- Do not call hooks conditionally inside the custom hook.
- Place the hook near the feature that uses it when appropriate.`,
        ],
      ],
      [
        {
          q: 'What are the steps to create a custom Hook?',
          a: 'Identify reusable stateful logic, extract it into a use-prefixed function, accept inputs, call hooks at the top level, and return the required values or functions.',
        },
        {
          q: 'Can custom hooks accept parameters?',
          a: 'Yes. Parameters are used to customize the behavior of the hook.',
        },
      ],
    ),

    // =========================================================
    // 21. Rules of Hooks
    // =========================================================
    topic(
      'rules-of-hooks',
      'Rules of Hooks',
      'React Hooks must follow specific rules so React can correctly associate hook calls with their state and effects across renders.',
      [
        [
          'Rule 1: Call Hooks at the top level',
          `\`\`\`tsx
// Correct
function Component() {
  const [count, setCount] = useState(0)

  if (count > 0) {
    console.log(count)
  }

  return <div>{count}</div>
}
\`\`\`

Incorrect:

\`\`\`tsx
if (condition) {
  const [count, setCount] = useState(0)
}
\`\`\`

Hooks cannot be called inside conditions, loops, nested functions, or callbacks.`,
        ],
        [
          'Rule 2: Only call Hooks from React functions',
          `Hooks can be called from:

1. React function components
2. Custom Hooks

Hooks cannot be called from:

- Ordinary JavaScript utility functions
- Class components
- Event handlers
- Nested functions
- Conditional callbacks`,
        ],
        [
          'Why does the order matter?',
          `React relies on the order of Hook calls to associate state with the correct Hook.

\`\`\`tsx
function Component() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(20)

  return <div>{name} - {age}</div>
}
\`\`\`

If a Hook is skipped conditionally on a later render, the call order can shift and React may associate state with the wrong Hook.`,
        ],
        [
          'Linting',
          `Use the official React Hooks ESLint rules.

Important checks:

- \`rules-of-hooks\`
- \`exhaustive-deps\`

These help detect invalid Hook calls and missing dependencies.`,
        ],
      ],
      [
        {
          q: 'What are the Rules of Hooks?',
          a: 'Call Hooks only at the top level of React function components or custom Hooks. Do not call Hooks inside loops, conditions, nested functions, or ordinary JavaScript functions.',
        },
        {
          q: 'Why can Hooks not be called conditionally?',
          a: 'React relies on the same Hook call order between renders. Conditional calls can shift Hook positions and cause state mismatches.',
        },
        {
          q: 'Can Hooks be used inside event handlers?',
          a: 'No. Event handlers are ordinary functions. Hooks must be called at the top level of a component or custom Hook.',
        },
      ],
    ),

    // =========================================================
    // 22. Custom Hooks vs Normal Functions
    // =========================================================
    topic(
      'custom-hooks-vs-functions',
      'Custom Hooks vs Normal Functions',
      'A normal function is used for ordinary JavaScript logic. A custom Hook is used when reusable logic needs React Hooks such as useState, useEffect, or useContext.',
      [
        [
          'Normal function',
          `\`\`\`tsx
function calculateTotal(
  price: number,
  quantity: number
) {
  return price * quantity
}
\`\`\`

This function performs a calculation and does not use React Hooks.

It can be called anywhere appropriate in your JavaScript code.`,
        ],
        [
          'Custom Hook',
          `\`\`\`tsx
function useCounter() {
  const [count, setCount] = useState(0)

  return {
    count,
    setCount,
  }
}
\`\`\`

This function uses React state and must follow the Rules of Hooks.

It can be called only from a React component or another custom Hook.`,
        ],
        [
          'Naming discipline',
          `**Normal utility:** \`formatDate()\`, \`calculateTotal()\`, \`filterProducts()\`

**Custom Hook:** \`useAuth()\`, \`useCounter()\`, \`useWindowSize()\`

Do not prefix a pure utility with use if it does not actually use React Hooks. Clear naming helps developers and linting tools distinguish the intended behavior.`,
        ],
      ],
      [
        {
          q: 'When should I create a custom Hook instead of a normal function?',
          a: 'Create a custom Hook when the logic needs React Hooks or reusable stateful behavior. Use a normal function for pure calculations, formatting, and data transformations.',
        },
        {
          q: 'Can a normal function use useState?',
          a: 'No. Hooks can only be called from React function components or custom Hooks.',
        },
      ],
    ),

    // =========================================================
    // 23. Sharing Logic Using Custom Hooks
    // =========================================================
    topic(
      'sharing-logic-custom-hooks',
      'Sharing Logic Using Custom Hooks',
      'Custom Hooks share reusable behavior, not state automatically. Each component calling a custom Hook receives its own independent Hook state unless the Hook uses a shared state mechanism.',
      [
        [
          'Sharing logic',
          `\`\`\`tsx
function ComponentA() {
  const counter = useCounter()
}

function ComponentB() {
  const counter = useCounter()
}
\`\`\`

Both components reuse the same counter logic, but their state values are independent.`,
        ],
        [
          'Sharing state',
          `\`\`\`tsx
const AuthContext = createContext<User | null>(null)

function useAuth() {
  return useContext(AuthContext)
}
\`\`\`

If multiple components call useAuth, they read the same Context value provided by the nearest AuthContext.Provider.

The shared state belongs to Context, not to the custom Hook itself.`,
        ],
        [
          'Common shared-state approaches',
          `- Lift state to a common parent
- React Context
- Redux Toolkit
- Zustand or another external store
- Server state libraries such as TanStack Query

Choose the approach based on the complexity, scope, and ownership of the state.`,
        ],
      ],
      [
        {
          q: 'Do custom Hooks share state between components?',
          a: 'No, not automatically. Every invocation has its own state. Shared state requires Context, an external store, or another shared state mechanism.',
        },
        {
          q: 'How can a custom Hook share state?',
          a: 'It can consume a shared Context, subscribe to an external store, or use another shared state solution.',
        },
        {
          q: 'What is the main benefit of custom Hooks?',
          a: 'They allow stateful logic to be reused and composed across components without duplicating logic or adding extra component layers.',
        },
      ],
    ),
  ],
}

export default ch
