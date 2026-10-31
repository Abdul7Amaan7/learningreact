
import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'useeffect',
  number: 7,
  title: 'useEffect',
  tagline:
    'Extremely important — dependencies, cleanup, fetching, race conditions, stale closures, and Strict Mode.',
  priority: 'extreme',

  topics: [
    topic(
      'what-is-useeffect',
      'What is useEffect()?',
      'useEffect is a React Hook that synchronizes a component with an external system after React renders.',
      [
        [
          'Mental model',
          `Think of useEffect as a synchronization mechanism, not simply a lifecycle method.

It helps React components interact with things outside React, such as:
- Browser APIs (document.title, localStorage)
- Timers (setInterval, setTimeout)
- Event listeners
- WebSockets
- Third-party widgets
- Network requests

**Important:** If something can be calculated directly during rendering, you usually do not need useEffect.

Example:
\`\`\`jsx
const fullName = firstName + ' ' + lastName
\`\`\`

Do not use useEffect to calculate fullName and store it in state. Derive it directly instead.

Fetching data is often better handled by framework loaders or libraries like TanStack Query, but useEffect remains important for understanding React.`,
        ],
      ],
      [
        {
          q: 'What is useEffect?',
          a: 'useEffect is a React Hook that synchronizes a component with an external system after rendering. It can optionally return a cleanup function to undo that synchronization.',
        },
        {
          q: 'Why should we not use useEffect for every operation?',
          a: 'Because unnecessary effects create extra renders, complexity, and synchronization bugs. Values that can be calculated during rendering should be derived directly.',
        },
      ],
    ),

    topic(
      'syntax-useeffect',
      'Syntax of useEffect',
      'useEffect accepts a setup function and an optional dependency array. The setup function may return a cleanup function.',
      [
        [
          'Signature',
          `\`\`\`jsx
useEffect(() => {
  // Setup: synchronize with an external system

  return () => {
    // Cleanup: undo the synchronization
  }
}, [dependency1, dependency2])
\`\`\`

**Three important parts:**

1. Setup function — performs the side effect.
2. Cleanup function — removes or cancels the side effect.
3. Dependency array — tells React when synchronization must happen again.

The effect captures values from the render in which it was created. Its cleanup uses those same values to clean up the correct resource.`,
        ],
      ],
      [
        {
          q: 'Write the syntax of useEffect.',
          a: 'useEffect(() => { /* setup */; return () => { /* cleanup */ } }, [dependencies]). The dependency array is optional, but should be specified correctly whenever the effect uses reactive values.',
        },
      ],
    ),

    topic(
      'dependency-array',
      'Dependency array',
      'The dependency array contains reactive values used inside the effect. React compares dependencies using Object.is.',
      [
        [
          'Understanding dependencies',
          `**1. Include every reactive value used inside the effect.**

Reactive values include props, state, and variables or functions declared inside your component.

**2. React compares dependencies using Object.is.**

If at least one dependency changes, React:
1. Runs the previous cleanup.
2. Runs the new setup function.

**3. Follow the exhaustive-deps ESLint rule.**

Do not intentionally omit dependencies to prevent an effect from running.

If a dependency causes unnecessary re-runs, restructure the code instead of lying to the linter.

**Example:**
\`\`\`jsx
useEffect(() => {
  console.log('Current user:', userId)
}, [userId])
\`\`\`

The effect re-runs whenever userId changes.`,
        ],
      ],
      [
        {
          q: 'What does the dependency array do?',
          a: 'It tells React which reactive values the effect depends on. When any dependency changes according to Object.is, React runs the previous cleanup and executes the new setup.',
        },
        {
          q: 'What is the exhaustive-deps rule?',
          a: 'It is an ESLint rule that ensures reactive values used inside an effect are included in its dependency array, helping prevent stale closures.',
        },
      ],
    ),

    topic(
      'no-dependency-array',
      'useEffect without dependency array',
      'When the dependency array is omitted, the effect runs after every committed render.',
      [
        [
          'Example and warning',
          `\`\`\`jsx
useEffect(() => {
  console.log('Component rendered')
})
\`\`\`

This executes after every commit.

**Potential problem:**
\`\`\`jsx
useEffect(() => {
  setCount(count + 1)
})
\`\`\`

This causes an infinite loop because:
1. The effect runs.
2. State changes.
3. React renders again.
4. The effect runs again.

Use this pattern only when synchronization genuinely needs to happen after every commit.`,
        ],
      ],
      [
        {
          q: 'What happens if you omit the dependency array?',
          a: 'The effect runs after every committed render. If it updates state on every execution, it can create an infinite rendering loop.',
        },
      ],
    ),

    topic(
      'empty-dependency-array',
      'useEffect with empty dependency array',
      'An empty dependency array means the effect has no reactive dependencies and does not need to re-synchronize when props or state change.',
      [
        [
          'Important details',
          `\`\`\`jsx
useEffect(() => {
  console.log('Effect executed')

  return () => {
    console.log('Cleanup executed')
  }
}, [])
\`\`\`

Typical behavior:
- Setup runs after the initial commit.
- Cleanup runs when the component unmounts.
- In development Strict Mode, React performs an extra setup → cleanup → setup cycle.

**Important:** Empty dependencies do not mean the effect should ignore values that change. If you read userId inside this effect, ask whether the effect should synchronize when userId changes. If yes, userId belongs in the dependency array.`,
        ],
      ],
      [
        {
          q: 'What does useEffect(fn, []) mean?',
          a: 'It means the effect has no reactive dependencies. Setup runs after the initial commit and cleanup runs on unmount. In development Strict Mode, an additional setup-cleanup cycle occurs.',
        },
      ],
    ),

    topic(
      'effect-with-deps',
      'useEffect with dependencies',
      'When a dependency changes, React runs the previous cleanup and then the new setup function.',
      [
        [
          'Practical example',
          `\`\`\`jsx
import { useEffect, useState } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.title = \`User: \${userId}\`
  }, [userId])

  return <div>{userId}</div>
}
\`\`\`

Whenever userId changes, the browser tab title is synchronized with the new value.

**Execution:**
- Initial render → setup executes.
- userId changes → cleanup executes, then setup executes.
- Component unmounts → cleanup executes if provided.`,
        ],
      ],
      [
        {
          q: 'When does an effect re-run?',
          a: 'After the initial commit and whenever at least one dependency changes according to Object.is.',
        },
      ],
    ),

    topic(
      'cleanup-function',
      'Cleanup function',
      'The cleanup function undoes the work performed by the effect setup. It prevents resource leaks and unwanted duplicate subscriptions.',
      [
        [
          'Setup and cleanup pairs',
          `| Setup | Cleanup |
|---|---|
| addEventListener | removeEventListener |
| setInterval | clearInterval |
| setTimeout | clearTimeout |
| WebSocket connection | close connection |
| Subscribe | unsubscribe |
| Fetch request | abort request |

**Example:**
\`\`\`jsx
useEffect(() => {
  const handleResize = () => {
    console.log(window.innerWidth)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])
\`\`\`

Cleanup runs:
1. Before the effect re-runs with changed dependencies.
2. When the component unmounts.
3. During the extra Strict Mode development cycle.

Cleanup does not execute immediately after the initial setup.`,
        ],
      ],
      [
        {
          q: 'Why return a cleanup function from useEffect?',
          a: 'To undo the side effect, such as removing event listeners, clearing timers, disconnecting subscriptions, or aborting requests. It prevents resource leaks and stale work.',
        },
      ],
    ),

    topic(
      'component-mounting-effect',
      'Component mounting',
      'An effect setup runs after a component has been committed to the DOM. This is commonly used to establish an external connection.',
      [
        [
          'Class component comparison',
          `\`\`\`jsx
useEffect(() => {
  console.log('Component committed')
}, [])
\`\`\`

Approximate comparison:

- componentDidMount → effect setup after initial commit
- componentDidUpdate → effect setup after dependency changes
- componentWillUnmount → effect cleanup

**Important:** These are not exact equivalents.

useEffect generally runs after the browser paints. If you need to measure the DOM or make a visual adjustment before paint, consider useLayoutEffect.`,
        ],
      ],
      [
        {
          q: 'How do you run code after mounting in a function component?',
          a: 'Use useEffect(() => { ... }, []) when there are no reactive dependencies. For DOM measurements that must happen before paint, use useLayoutEffect.',
        },
      ],
    ),

    topic(
      'component-updating-effect',
      'Component updating',
      'An effect re-synchronizes whenever one of its dependencies changes. It also runs after the initial commit.',
      [
        [
          'Example',
          `\`\`\`jsx
useEffect(() => {
  console.log('Count changed:', count)
}, [count])
\`\`\`

This runs after the initial commit and whenever count changes.

**If you must skip the initial execution:**

\`\`\`jsx
const isFirstRender = useRef(true)

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false
    return
  }

  console.log('Count updated:', count)
}, [count])
\`\`\`

However, first ask whether skipping the initial synchronization is really necessary. Often, modeling the effect as synchronization with count is simpler.`,
        ],
      ],
      [
        {
          q: 'How do you emulate componentDidUpdate?',
          a: 'Use useEffect with the relevant dependencies. Remember that it also executes after the initial commit, unlike componentDidUpdate. A ref can skip the initial execution when genuinely necessary.',
        },
      ],
    ),

    topic(
      'component-unmounting-effect',
      'Component unmounting',
      'When a component unmounts, React runs the cleanup functions of its active effects.',
      [
        [
          'Example',
          `\`\`\`jsx
useEffect(() => {
  const connection = createConnection()

  connection.connect()

  return () => {
    connection.disconnect()
  }
}, [])
\`\`\`

The cleanup disconnects the external connection.

**Best practice:** Cancel or unsubscribe from the actual resource instead of relying on an isMounted flag to prevent state updates.`,
        ],
      ],
      [
        {
          q: 'How do you run code when a component unmounts?',
          a: 'Return a cleanup function from useEffect. React executes it when the component unmounts and before the effect re-synchronizes.',
        },
      ],
    ),

    topic(
      'api-calls-useeffect',
      'API calls using useEffect',
      'The classic API-fetching pattern uses useEffect to request data, state to store the result, and cleanup to cancel outdated requests.',
      [
        [
          'Practical example',
          `\`\`\`jsx
import { useEffect, useState } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUser() {
      setLoading(true)
      setError(null)
      setUser(null)

      try {
        const response = await fetch(
          \`https://jsonplaceholder.typicode.com/users/\${userId}\`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }

        const data = await response.json()
        setUser(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchUser()

    return () => controller.abort()
  }, [userId])

  if (loading) return <p>Loading user...</p>
  if (error) return <p>Error: {error}</p>
  if (!user) return <p>No user found.</p>

  return <h2>{user.name}</h2>
}
\`\`\`

**Important concepts:**
- Include userId in dependencies.
- Handle loading, success, and error.
- Check response.ok.
- Abort outdated requests.
- Avoid displaying data belonging to the previous user.`,
        ],
      ],
      [
        {
          q: 'How do you fetch data using useEffect?',
          a: 'Start the request inside the effect, store the result in state, include all request dependencies, handle loading and errors, and abort the request during cleanup.',
        },
      ],
    ),

    topic(
      'fetching-data-useeffect',
      'Fetching data using useEffect',
      'A fetch UI should manage loading, success, error, and empty states while preventing outdated responses from affecting the UI.',
      [
        [
          'Common UI states',
          `\`\`\`
idle
  |
loading
  |
  +---- success (data)
  |
  +---- error
  |
  +---- empty (no data)
\`\`\`

**Important:** When the request key changes, make sure the old data is not mistakenly displayed as if it belonged to the new request.

For production applications, consider TanStack Query, SWR, or framework data-fetching solutions. They offer caching, deduplication, refetching, and better request management.`,
        ],
      ],
      [
        {
          q: 'What states should an API-fetching component handle?',
          a: 'Loading, success with data, error, and optionally empty or idle states. It should also avoid displaying stale data for a different request.',
        },
      ],
    ),

    topic(
      'infinite-loop-useeffect',
      'Infinite loop in useEffect',
      'An infinite effect loop happens when an effect triggers a state update that causes the effect to execute again.',
      [
        [
          'Common causes and solutions',
          `**Cause 1: No dependency array**
\`\`\`jsx
useEffect(() => {
  setCount(count + 1)
})
\`\`\`

Solution: Add the correct dependencies or remove unnecessary effect-driven state.

**Cause 2: Object created during render**
\`\`\`jsx
const options = { theme: 'dark' }

useEffect(() => {
  setData(options)
}, [options])
\`\`\`

Because options is a new object on every render, the dependency changes every time.

Solution: Move the object inside the effect or stabilize it with useMemo when appropriate.

**Cause 3: Unnecessary derived state**
\`\`\`jsx
useEffect(() => {
  setFullName(firstName + lastName)
}, [firstName, lastName])
\`\`\`

Solution:
\`\`\`jsx
const fullName = firstName + lastName
\`\`\`

Derive values during rendering instead of synchronizing redundant state.`,
        ],
      ],
      [
        {
          q: 'What causes an infinite useEffect loop?',
          a: 'The effect updates state, causing a re-render, and the effect runs again because a dependency changed or no dependency array was provided. Avoid unnecessary state updates and unstable dependencies.',
        },
      ],
    ),

    topic(
      'multiple-useeffects',
      'Multiple useEffect hooks',
      'Use separate effects for independent synchronization tasks. This makes dependencies and cleanup easier to understand.',
      [
        [
          'Example',
          `\`\`\`jsx
// Effect 1: Update document title
useEffect(() => {
  document.title = title
}, [title])

// Effect 2: Listen for window resize
useEffect(() => {
  const handleResize = () => {
    console.log(window.innerWidth)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])

// Effect 3: Fetch user
useEffect(() => {
  // Fetch user data
}, [userId])
\`\`\`

**Why separate them?**

A window resize should not trigger a user API request. Each effect has its own responsibility and dependency list.`,
        ],
      ],
      [
        {
          q: 'Should you use one useEffect or multiple useEffect hooks?',
          a: 'Use multiple effects when synchronizing independent concerns. Each effect should have a focused responsibility, appropriate dependencies, and its own cleanup.',
        },
      ],
    ),

    topic(
      'conditional-effects',
      'Conditional execution of effects',
      'Hooks must always be called in the same order. Place conditions inside the effect instead of conditionally calling useEffect.',
      [
        [
          'Correct vs incorrect',
          `**Correct:**
\`\`\`jsx
useEffect(() => {
  if (!userId) return

  // Fetch user
}, [userId])
\`\`\`

**Incorrect:**
\`\`\`jsx
if (userId) {
  useEffect(() => {
    // Fetch user
  }, [userId])
}
\`\`\`

The incorrect example violates the Rules of Hooks.

**Remember:** Hooks belong at the top level of a function component or custom Hook, not inside conditions, loops, or nested functions.`,
        ],
      ],
      [
        {
          q: 'How do you execute an effect only when a condition is true?',
          a: 'Call useEffect unconditionally and place the condition inside its setup function. Never call a Hook conditionally.',
        },
      ],
    ),

    topic(
      'stale-closures',
      'Stale closures',
      'A stale closure occurs when a function uses outdated props or state captured from an earlier render.',
      [
        [
          'Practical example',
          `\`\`\`jsx
import { useEffect, useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <h2>{count}</h2>
}
\`\`\`

**Problem:** The interval captures count = 0 from the initial render. It repeatedly sets count to 1 instead of incrementing.

**Solution 1: Functional state update**
\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => {
    setCount(previous => previous + 1)
  }, 1000)

  return () => clearInterval(timer)
}, [])
\`\`\`

**Solution 2:** Include count in dependencies, but this restarts the interval whenever count changes.

**Solution 3:** Use a ref when a stable callback must read the latest value.

Use the simplest solution that correctly models the behavior.`,
        ],
      ],
      [
        {
          q: 'What is a stale closure in React?',
          a: 'It is a function that captures old props or state from a previous render. It commonly occurs when dependencies are omitted. Fix it with correct dependencies, functional state updates, or refs when appropriate.',
        },
      ],
    ),

    topic(
      'race-conditions',
      'Race conditions in API calls',
      'A race condition occurs when multiple asynchronous requests finish in an unexpected order and an older response overwrites newer data.',
      [
        [
          'Example scenario',
          `Suppose the user changes the profile from ID 1 to ID 2.

1. Request A starts for user 1.
2. Request B starts for user 2.
3. Request B finishes first and displays user 2.
4. Request A finishes later and overwrites the screen with user 1.

The UI now displays incorrect data.

**Solution: AbortController**
\`\`\`jsx
useEffect(() => {
  const controller = new AbortController()

  async function fetchUser() {
    try {
      const response = await fetch(
        \`/api/users/\${userId}\`,
        { signal: controller.signal }
      )

      const data = await response.json()
      setUser(data)
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(error)
      }
    }
  }

  fetchUser()

  return () => controller.abort()
}, [userId])
\`\`\`

When userId changes, React cleans up the previous effect and aborts the old request.`,
        ],
      ],
      [
        {
          q: 'How do you prevent API race conditions?',
          a: 'Abort outdated requests using AbortController or ignore responses from obsolete requests. Ensure only the latest relevant request can update the UI.',
        },
      ],
    ),

    topic(
      'abortcontroller',
      'AbortController',
      'AbortController is a browser API that cancels supported asynchronous operations, including fetch requests.',
      [
        [
          'How it works',
          `**Step 1:** Create a controller.
\`\`\`jsx
const controller = new AbortController()
\`\`\`

**Step 2:** Pass its signal to fetch.
\`\`\`jsx
fetch('/api/users', {
  signal: controller.signal
})
\`\`\`

**Step 3:** Abort the request during cleanup.
\`\`\`jsx
return () => controller.abort()
\`\`\`

**Important:** An aborted fetch rejects with an AbortError. Handle it separately from genuine request failures.

Axios also supports AbortController in modern versions.`,
        ],
      ],
      [
        {
          q: 'How do you use AbortController with useEffect?',
          a: 'Create an AbortController inside the effect, pass its signal to fetch, and call abort() inside the cleanup function. Ignore AbortError in the catch block.',
        },
      ],
    ),

    topic(
      'useeffect-vs-uselayout',
      'useEffect vs useLayoutEffect',
      'The main difference is when the effect executes relative to browser painting.',
      [
        [
          'Comparison',
          `| useEffect | useLayoutEffect |
|---|---|
| Generally runs after paint | Runs before browser paint |
| Does not block paint in typical cases | Blocks paint while executing |
| Best for normal synchronization | Best for layout measurement |
| Default choice | Use only when necessary |

**Example useLayoutEffect:**
\`\`\`jsx
useLayoutEffect(() => {
  const height = ref.current.getBoundingClientRect().height

  setHeight(height)
}, [])
\`\`\`

Use useLayoutEffect when the user must not see an incorrect layout before the measurement and update.

For most API calls, subscriptions, and regular side effects, prefer useEffect.`,
        ],
      ],
      [
        {
          q: 'When should you use useLayoutEffect instead of useEffect?',
          a: 'Use useLayoutEffect when you need to measure or synchronously update the DOM before the browser paints to prevent visual flickering. Otherwise, use useEffect.',
        },
      ],
    ),

    topic(
      'strict-mode-double-effect',
      'Why effects run twice in development Strict Mode',
      'React Strict Mode performs an additional setup-cleanup-setup cycle in development to detect effects that are not correctly cleaned up.',
      [
        [
          'Understanding the behavior',
          `In development Strict Mode, React tests whether your effect is resilient to being stopped and restarted.

Example:
\`\`\`
Setup
  ↓
Cleanup
  ↓
Setup again
\`\`\`

This helps detect:
- Duplicate subscriptions
- Missing cleanup functions
- Unclosed WebSocket connections
- Timers that were not cleared
- Requests that were not cancelled

**Important:** This is a development-only behavior. It does not mean you should disable Strict Mode.

Instead, make the setup and cleanup functions correctly mirror each other.

For data fetching, frameworks and libraries such as TanStack Query can also help with caching and request deduplication.`,
        ],
      ],
      [
        {
          q: 'Why does useEffect run twice in development?',
          a: 'React Strict Mode intentionally performs an extra setup-cleanup-setup cycle in development to reveal missing cleanup logic and unsafe effects. Make effects resilient instead of disabling Strict Mode.',
        },
      ],
    ),
  ],
}

export default ch
