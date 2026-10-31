import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'fundamentals',
  number: 1,
  title: 'React Fundamentals',
  tagline: 'Core mental models interviewers expect you to explain from first principles.',
  topics: [
    topic(
      'what-is-react',
      'What is React?',
      'React is a JavaScript library for building user interfaces from reusable components. It describes UI as a function of state and lets a reconciler turn those descriptions into efficient DOM updates.',
      [
        [
          'Definition that interviewers want',
          `React (created at Meta, open-sourced in 2013) is a **UI library**, not a full application framework. You write components that return a description of the UI (usually JSX). React keeps a **Virtual DOM** (a tree of React elements) and updates the real DOM only where it must.

React answers one problem extremely well: *given data, what should the screen look like?* Routing, HTTP, global store, and build tooling are separate libraries. That is why people say React is unopinionated.

Internally, a component is a function (or class) that React calls during render. The return value is not the DOM; it is a lightweight object tree. After render, React Fiber walks that tree, diffs it with the previous tree, and schedules mutations.`,
        ],
        [
          'What React is not',
          `React is not a templating language, not MVC by itself, and not a replacement for JavaScript. It does not magically make apps fast. Poor state design, unnecessary renders, and huge lists still hurt. React also does not include a router or official data-fetching layer in the core package — those come from the ecosystem (React Router, TanStack Query, Redux, Next.js).`,
        ],
      ],
      [
        {
          q: 'What is React in one sentence?',
          a: 'React is a JavaScript library for building component-based user interfaces by describing the UI as a function of state and efficiently updating the DOM through reconciliation.',
        },
        {
          q: 'Is React a framework or a library? Why does it matter?',
          a: 'It is a library: you choose routing, state, and data fetching. Frameworks like Angular or Next.js own those decisions. Interviewers use this to see if you understand React’s scope and the ecosystem around it.',
        },
        {
          q: 'Who created React and why?',
          a: 'Jordan Walke at Facebook. The original pain was Facebook Ads / Instagram-style UIs that mixed data and DOM updates until bugs exploded. React’s insight was unidirectional data flow and declarative rendering so UI always matches state.',
        },
      ],
      {
        pitfalls: [
          'Calling React a “framework” without explaining the difference.',
          'Saying React “updates the DOM automatically” without mentioning the Virtual DOM / Fiber / reconciliation.',
        ],
      },
    ),
    topic(
      'features-of-react',
      'Features of React',
      'The features that actually show up in interviews are JSX, components, Virtual DOM, unidirectional data flow, hooks, and a declarative programming model — not a laundry list of buzzwords.',
      [
        [
          'Features worth naming',
          `- **Component-based architecture** — UI is composed of independent, reusable pieces.
- **JSX** — XML-like syntax that compiles to React.createElement / jsx() calls.
- **Virtual DOM + reconciliation** — compute the next UI, diff, patch.
- **Unidirectional data flow** — data goes parent → child via props; events go up via callbacks.
- **Declarative UI** — you describe *what* the UI should be, not *how* to mutate the DOM.
- **Hooks** — stateful logic in functions, reusable as custom hooks.
- **One-way binding** — no two-way ngModel-style magic in core React (you wire value + onChange yourself).
- **React Fiber** — incremental, interruptible rendering (React 16+).
- **Concurrent features** — transitions, Suspense, streaming (modern React).
- **Rich ecosystem** — Router, Redux/Zustand, Next.js, React Native.`,
        ],
        [
          'How to talk about features in an interview',
          `Do not recite a slide. Pick 4–5 features and connect each to a problem: Virtual DOM → fewer layout thrash updates; unidirectional flow → easier debugging than two-way binding; hooks → share logic without HOCs; Fiber → keep the main thread responsive.`,
        ],
      ],
      [
        {
          q: 'Name five important features of React.',
          a: 'Component architecture, JSX, Virtual DOM/reconciliation, unidirectional data flow, and Hooks. Bonus: Fiber, concurrent rendering, and a huge ecosystem.',
        },
        {
          q: 'What is unidirectional data flow?',
          a: 'State lives in a component (or store). It is passed down as props. Children cannot mutate parent state directly; they call functions passed as props. This makes data changes predictable and easier to trace than two-way binding.',
        },
      ],
    ),
    topic(
      'advantages-disadvantages',
      'Advantages and disadvantages of React',
      'Interviewers want a balanced answer: React’s ecosystem and mental model are strengths; its “just a library” nature and re-render model are trade-offs.',
      [
        [
          'Advantages',
          `- Huge community, jobs, and libraries.
- Reusable components and a consistent mental model (UI = f(state)).
- Virtual DOM / Fiber make many UI updates practical.
- React Native reuses the component model for mobile.
- Strong tooling (Vite, Next.js, React DevTools, Profiler).
- Declarative code is usually easier to reason about than manual DOM scripts.
- Backed by Meta and used at scale (Facebook, Instagram, Netflix, etc.).`,
        ],
        [
          'Disadvantages / trade-offs',
          `- Not a full framework: you assemble routing, state, forms, i18n yourself (or pick Next.js).
- JSX and the React mental model have a learning curve (hooks rules, stale closures).
- Easy to create performance issues with poor memoization or giant trees.
- Rapid ecosystem churn (class → hooks, CRA → Vite, Pages Router → App Router).
- SEO for pure CSR apps needs SSR/SSG (Next.js, Remix) if that matters.
- “Too many ways to do state” (useState, Context, Redux, Zustand, React Query).`,
        ],
      ],
      [
        {
          q: 'What are the main advantages of React?',
          a: 'Component reuse, declarative UI, a massive ecosystem, strong performance primitives (Fiber, memoization), and the ability to target web and native with a similar model.',
        },
        {
          q: 'What are React’s disadvantages?',
          a: 'It is only a view library, so architecture is on you. SEO needs extra work in CSR. The ecosystem moves fast. Poor state design causes extra renders. JSX and hooks have non-obvious rules.',
        },
      ],
    ),
    topic(
      'react-vs-angular-vs-vue',
      'React vs Angular vs Vue',
      'Compare on architecture (library vs framework), language (JSX vs templates), state, learning curve, and ecosystem — not on “which is best.”',
      [
        [
          'Side-by-side',
          `| | **React** | **Angular** | **Vue** |
|---|---|---|---|
| Type | UI library | Full framework | Progressive framework |
| Language | JSX / JS/TS | TypeScript-first, templates | SFCs: template + script + style |
| Data flow | Unidirectional | Two-way optional + RxJS | Unidirectional + optional v-model |
| Learning curve | Medium (ecosystem choices) | Steep (modules, DI, RxJS) | Gentle |
| State | You choose | Services + RxJS / signals | Pinia / Vuex |
| Rendering | Virtual DOM / Fiber | Incremental DOM | Virtual DOM (Vue 3 compiler is very smart) |
| Backing | Meta | Google | Community (Evan You) |`,
        ],
        [
          'How to pick an answer',
          `React wins on jobs and flexibility. Angular wins when a company wants batteries-included structure, TypeScript, and DI. Vue wins on approachability and excellent SFCs. Mention that Next.js makes React feel more like a framework.`,
        ],
      ],
      [
        {
          q: 'How is React different from Angular?',
          a: 'React is a view library with JSX and one-way data flow; you pick the rest. Angular is a complete framework: CLI, router, HTTP, forms, DI, and TypeScript by default. Angular uses templates and (historically) two-way binding; React uses explicit value + onChange.',
        },
        {
          q: 'React vs Vue — what would you say?',
          a: 'Both are component-based with a Virtual DOM. Vue’s single-file components and template syntax are easier for many beginners. React’s JSX is just JavaScript, which scales well for complex UI logic. React’s ecosystem and hiring market are larger.',
        },
      ],
    ),
    topic(
      'library-vs-framework',
      'Library vs Framework',
      'A library is a tool you call. A framework is an architecture that calls your code (inversion of control). React is a library; Next.js and Angular are frameworks.',
      [
        [
          'The inversion of control test',
          `With a **library**, your code is in charge: you import React and decide when to render, which router to use, how to fetch.

With a **framework**, the framework is in charge: file-based routing, lifecycle hooks it invokes, folder conventions, build pipeline. Next.js \`app/page.tsx\` is a framework contract — Next calls your page. Angular’s NgModule/standalone bootstrap is the same idea.

React *core* does not dictate folders, routing, or data loading. That is why “React is a library” is the expected answer — and why Next.js is the common “React framework.”`,
        ],
      ],
      [
        {
          q: 'Why do people say React is a library not a framework?',
          a: 'Because React only handles rendering components. It does not impose routing, HTTP, or project structure. You call React; a framework would call you through conventions and inversion of control.',
        },
        {
          q: 'Is Next.js a library or a framework?',
          a: 'A framework built on React. It owns routing, rendering modes (SSR/SSG/RSC), bundling, and many conventions.',
        },
      ],
    ),
    topic(
      'what-is-spa',
      'What is SPA (Single Page Application)?',
      'An SPA loads one HTML document and then updates the UI with JavaScript as the user navigates, instead of requesting a full new page from the server for every click.',
      [
        [
          'How SPAs work',
          `The browser downloads a shell (\`index.html\`) plus a JS bundle. Client-side routing (React Router) maps URLs to components without a full reload. APIs provide JSON. The address bar still changes via the History API (\`pushState\`).

**MPA (multi-page app):** each navigation is a full document request.

**SPA benefits:** snappy transitions, rich interactivity, app-like UX.

**SPA costs:** larger initial JS, SEO/social previews need SSR or pre-rendering, you must handle loading and error states yourself, and the first paint can be slower without SSR.`,
        ],
        [
          'SPA vs MPA vs Next.js hybrid',
          `Modern React apps often are **hybrids**: Next.js can SSR the first page (MPA-like HTML) then hydrate into an SPA for subsequent client navigations. Interview gold: “CSR SPA vs SSR + hydration.”`,
        ],
      ],
      [
        {
          q: 'What is a Single Page Application?',
          a: 'An app that loads one HTML page and dynamically updates content with JavaScript as the user navigates, using client-side routing instead of full page reloads.',
        },
        {
          q: 'What are SPA disadvantages?',
          a: 'Heavy initial bundle, weaker SEO without SSR, more complexity around history, auth, and error boundaries, and potential performance issues if routing and data fetching are naive.',
        },
      ],
    ),
    topic(
      'how-react-works-internally',
      'How React works internally',
      'Render produces a tree of React elements. Fiber represents that tree as a linked list of work units. The reconciler diffs alternate trees and the renderer commits DOM updates.',
      [
        [
          'Three phases (mental model)',
          `1. **Trigger** — setState, a parent render, or a hook update schedules work.
2. **Render (reconciliation / “render phase”)** — React calls your components, builds a new Fiber tree (work-in-progress), diffs props/type/keys. This phase is **pure** in theory and can be **interrupted** (concurrent features).
3. **Commit** — React applies DOM mutations, runs layout effects (\`useLayoutEffect\`), then paint, then passive effects (\`useEffect\`). Commit is **synchronous** and not interruptible.`,
        ],
        [
          'Host vs composite',
          `Function/class components are **composite** fibers. \`div\`, \`span\`, etc. are **host** fibers. React DOM is a **renderer**. React Native is another renderer sharing the same reconciler. That split is why React can target multiple platforms.`,
        ],
      ],
      [
        {
          q: 'Explain how React updates the UI internally.',
          a: 'A state change schedules an update. React re-renders the component tree into a work-in-progress Fiber tree, diffs it with the current tree (reconciliation), then commits the minimal host mutations. Effects run after commit.',
        },
        {
          q: 'What is the difference between render phase and commit phase?',
          a: 'Render phase calculates the next UI and can be paused/restarted in concurrent mode. Commit phase mutates the DOM and runs refs/effects; it must finish synchronously so the user never sees a half-updated tree.',
        },
      ],
      {
        pitfalls: [
          'Confusing “render” (calling the function) with “painting the screen.”',
          'Saying Virtual DOM is always faster than Real DOM — it is a strategy, not magic.',
        ],
      },
    ),
    topic(
      'declarative-programming',
      'What is declarative programming?',
      'Declarative UI describes the desired end state. Imperative UI issues step-by-step DOM commands. React is declarative: you return elements; React figures out the mutations.',
      [
        [
          'Contrast with imperative',
          `**Imperative (vanilla JS):** find the button, if logged in set text to “Logout”, else “Login”, add/remove classes, attach listeners, remember to clean up.

**Declarative (React):** \`<button>{isLoggedIn ? 'Logout' : 'Login'}</button>\`. When \`isLoggedIn\` changes, React re-renders and patches the DOM.

Declarative code is easier to reason about because the UI is a snapshot of state, not a log of mutations. You still drop to imperative for focus, measurements, third-party widgets, and canvas — usually inside effects or refs.`,
        ],
      ],
      [
        {
          q: 'What is declarative programming in React?',
          a: 'You declare what the UI should look like for the current state. React computes the DOM updates. You do not manually call document.appendChild for routine UI.',
        },
        {
          q: 'Give an imperative vs declarative example.',
          a: 'Imperative: document.querySelector("#n").textContent = count. Declarative: return <span>{count}</span> and let React update when count changes.',
        },
      ],
    ),
    topic(
      'component-based-architecture',
      'What is component-based architecture?',
      'The UI is a tree of encapsulated components. Each component owns a piece of view, optional state, and a public props interface. Apps scale by composition, not by one giant template.',
      [
        [
          'Why it matters',
          `Components give **reuse** (Button, Modal), **isolation** (a bug in Cart does not mean rewriting Header), and **clear contracts** (props in, events out). Composition (\`<Card><Card.Header/></Card>\`) beats deep inheritance.

Good architecture: small presentational pieces, containers that fetch/wire data, colocate state with the lowest common parent, and extract shared logic into hooks rather than mega-components.`,
        ],
      ],
      [
        {
          q: 'What is component-based architecture?',
          a: 'Building UIs from independent, reusable pieces that receive data via props and emit events via callbacks, composed into a tree rather than one monolithic view.',
        },
        {
          q: 'Composition vs inheritance in React?',
          a: 'React favors composition: nest children, pass components as props, use children/slots. Inheritance of component classes is discouraged because it tightly couples lifecycle and render.',
        },
      ],
    ),
    topic(
      'what-is-jsx',
      'What is JSX?',
      'JSX is a syntax extension that looks like HTML in JavaScript. Compilers (Babel, SWC, esbuild) transform it into function calls that create React elements.',
      [
        [
          'Mental model',
          `\`<Foo bar={1}>hi</Foo>\` is not HTML. It becomes something like \`jsx(Foo, { bar: 1, children: 'hi' })\` (modern automatic runtime) or \`React.createElement(Foo, { bar: 1 }, 'hi')\` (classic runtime).

JSX must be compiled. Browsers do not understand it natively. Expressions go in \`{}\`. Attributes use camelCase (\`className\`, \`onClick\`).`,
        ],
      ],
      [
        {
          q: 'What is JSX?',
          a: 'A syntax extension that lets you write HTML-like markup in JavaScript. It compiles to React.createElement or jsx() calls that return React elements, not DOM nodes.',
        },
        {
          q: 'Does the browser understand JSX?',
          a: 'No. A compiler must transform JSX to JavaScript before it runs in the browser.',
        },
      ],
    ),
    topic(
      'how-jsx-works-internally',
      'How JSX works internally',
      'JSX is sugar over element-creation calls. Those calls return immutable React element objects. React later reconciles those objects into Fiber nodes and host instances.',
      [
        [
          'createElement / jsx runtime',
          `Classic:
\`React.createElement(type, props, ...children)\` returns
\`{ type, props, key, ref, $$typeof: Symbol.for('react.element') }\`.

The \`$$typeof\` symbol helps prevent XSS from JSON that looks like an element.

**Automatic runtime** (React 17+): files with JSX import \`jsx\` from \`react/jsx-runtime\` so you do not need \`import React from 'react'\` just for JSX.

Components receive the **props object**, not the element. Function components are called during render with those props.`,
        ],
      ],
      [
        {
          q: 'What does JSX compile to?',
          a: 'Function calls: React.createElement or jsx/jsxs from react/jsx-runtime. Those return React element objects describing type, props, and children.',
        },
        {
          q: 'Why can we skip importing React in modern JSX?',
          a: 'The automatic JSX runtime injects jsx() imports. React 17+ plus a modern compiler (Vite, CRA 5, Next) enables this.',
        },
      ],
      {
        code: [
          {
            title: 'JSX desugars to elements',
            lang: 'jsx',
            source: `const el = <button className="primary">{label}</button>
// roughly:
const el = {
  type: 'button',
  props: { className: 'primary', children: label },
}`,
          },
        ],
      },
    ),
    topic(
      'jsx-vs-html',
      'JSX vs HTML',
      'JSX looks like HTML but is JavaScript. Attribute names, event handlers, style objects, and a required root (or Fragment) are the usual interview deltas.',
      [
        [
          'Key differences',
          `- \`class\` → \`className\`; \`for\` → \`htmlFor\` (because class/for are reserved in JS).
- Events: \`onclick\` → \`onClick\` (camelCase), receive SyntheticEvent.
- Inline styles are **objects**: \`style={{ color: 'red' }}\`, not strings (except custom).
- Self-close all tags: \`<img />\`, \`<input />\`.
- Attributes that are JS keywords or multi-word use camelCase: \`tabIndex\`, \`autoComplete\`.
- Embed JS with \`{}\`, not Angular/Vue mustaches in the same way.
- Comments: \`{/* comment */}\`.
- One parent node or a Fragment.
- Boolean attributes: \`disabled={true}\` or \`disabled\`.
- Custom data: \`data-*\` still works; aria attributes often camelCase like \`ariaLabel\` or kebab \`aria-label\` (both often accepted).`,
        ],
      ],
      [
        {
          q: 'List differences between JSX and HTML.',
          a: 'className vs class, htmlFor vs for, camelCase events and attributes, style as object, must self-close void tags, JS expressions in braces, and a single parent/Fragment.',
        },
      ],
    ),
    topic(
      'virtual-dom',
      'Virtual DOM',
      'The Virtual DOM is an in-memory tree of React elements (later Fiber nodes) that represents the UI. React diffs trees and applies a small set of real DOM operations.',
      [
        [
          'Why it exists',
          `The real DOM is relatively expensive to read/write (layout, paint). Creating a lightweight JS object tree is cheap. React can compute the next tree, compare it to the previous tree, and touch the real DOM only for changes.

Important nuance: Virtual DOM is **not always faster** than well-written vanilla DOM code. It is a **productive, consistent** strategy that batches updates and avoids most manual bookkeeping.

In modern React, the in-memory representation is **Fiber**, not a simple JSON tree — but “Virtual DOM” is still the interview phrase.`,
        ],
      ],
      [
        {
          q: 'What is the Virtual DOM?',
          a: 'A lightweight JavaScript representation of the UI tree. React uses it to diff successive UI descriptions and update the real DOM efficiently.',
        },
        {
          q: 'Is Virtual DOM always faster than Real DOM?',
          a: 'No. Diffing has cost. Its value is predictable updates and developer productivity. Hand-optimized DOM code can win in tiny widgets; Virtual DOM wins as apps grow messy.',
        },
      ],
    ),
    topic(
      'real-dom-vs-virtual-dom',
      'Real DOM vs Virtual DOM',
      'Real DOM is the browser’s tree of nodes. Virtual DOM is React’s JS description of what that tree should look like.',
      [
        [
          'Comparison',
          `| | **Real DOM** | **Virtual DOM** |
|---|---|---|
| What | Browser document tree | JS objects / Fibers |
| Cost of update | Can be expensive (reflow/repaint) | Cheap object create + diff |
| Who mutates | Browser / you / React renderer | React reconciler |
| Persistence | Actual UI | Snapshot used to plan updates |
| Direct access | document, refs | Not for layout measurement |`,
        ],
      ],
      [
        {
          q: 'Differentiate Real DOM and Virtual DOM.',
          a: 'Real DOM is what the browser paints. Virtual DOM is React’s in-memory UI tree used to compute minimal real DOM updates. Direct DOM APIs talk to the real DOM; JSX talks to the virtual one.',
        },
      ],
    ),
    topic(
      'reconciliation',
      'Reconciliation',
      'Reconciliation is React’s diffing algorithm: compare the previous tree and the next tree, reuse nodes when type and key match, and destroy/recreate when they do not.',
      [
        [
          'Heuristic (O(n), not O(n³))',
          `React assumes:
1. **Different component types** produce different trees — unmount the old, mount the new (\`<Header>\` vs \`<Footer>\`, or \`div\` vs \`span\`).
2. **Keys** hint which child is which across renders so lists can insert/move/delete correctly.

If state lives on a component and you change its \`type\` or \`key\`, React **resets state** because it is a different identity.

This is why \`key={index}\` on reorderable lists causes bugs: items get the wrong state (input text jumping between rows).`,
        ],
      ],
      [
        {
          q: 'What is reconciliation?',
          a: 'The process of diffing the previous Virtual DOM/Fiber tree with the next one to decide which host nodes to update, insert, or remove.',
        },
        {
          q: 'What happens if two elements have different types?',
          a: 'React tears down the old tree (unmount, state gone) and builds a new one. It does not try to morph a div into a span.',
        },
      ],
    ),
    topic(
      'react-fiber',
      'React Fiber architecture',
      'Fiber (React 16+) is a rewrite of the reconciler. Each component instance is a Fiber node in a linked list that can be paused, reused, and prioritized.',
      [
        [
          'Why Fiber',
          `The old Stack reconciler was recursive and **could not interrupt** work. A deep tree blocked the main thread (jank).

Fiber nodes form a tree via \`child\`, \`sibling\`, \`return\` pointers — like a linked list walk instead of a recursive JS call stack. React can:
- pause work to handle user input
- assign **priorities** (urgent: typing; transition: dimmed list filter)
- reuse work or throw it away (double render in Strict Mode is related)
- support error boundaries, Suspense, and concurrent rendering

**Current tree** vs **work-in-progress tree** (double buffering): React builds WIP, then **commits** by pointer swap.`,
        ],
      ],
      [
        {
          q: 'What is React Fiber?',
          a: 'The reconciler architecture since React 16. UI work is split into Fiber units that can be incremental, prioritized, and interrupted, enabling concurrent features.',
        },
        {
          q: 'How does Fiber enable concurrent rendering?',
          a: 'Because work is a linked list of units, React can yield to the browser between units, continue later, or discard a WIP tree if a higher-priority update arrives.',
        },
      ],
    ),
    topic(
      'how-react-updates-ui',
      'How React updates the UI',
      'setState/useState queues an update. React schedules a re-render, diffs, commits DOM patches, then runs effects. Batching collapses multiple updates in the same event.',
      [
        [
          'Step by step',
          `1. Event or effect calls \`setCount(c => c + 1)\`.
2. React schedules an update on that Fiber (and in React 18+, often batches even in promises/timeouts).
3. Starting at the dirty root (or subtree), React re-executes function components.
4. Reconcile children; bail out if props are equal and the component is memoized.
5. Commit: update DOM text/attributes, attach/detach listeners.
6. Run layout effects, browser paint, then passive effects.

Parents re-rendering re-render children **by default**, unless \`React.memo\` / \`useMemo\` / context splitting prevent it.`,
        ],
      ],
      [
        {
          q: 'Walk through a setState update.',
          a: 'setState queues an update, React re-renders the component, reconciles the new element tree, patches the DOM in commit, then runs useLayoutEffect and useEffect.',
        },
        {
          q: 'Does a parent re-render always re-render children?',
          a: 'Yes by default. memo, stable props, and splitting context can skip child work. Children still re-render if their state/context changed.',
        },
      ],
    ),
    topic(
      'react-project-structure',
      'React project structure',
      'There is no single official folder layout. Interviews expect a practical structure: features or layers, colocated tests, a clear entry file, and separation of UI vs data.',
      [
        [
          'A solid Vite React layout',
          `\`\`\`
src/
  app/ or main.tsx     // bootstrap, router
  pages/ or routes/    // route-level screens
  features/auth/       // slice of the product
    components/
    hooks/
    api.ts
  shared/ui/           // Button, Modal
  shared/lib/          // cn(), formatDate
  assets/
\`\`\`

**Colocation** (component + CSS + test + hook in one folder) beats dumping 200 files in \`components/\`.

**Feature folders** scale better than \`containers/\` vs \`components/\` alone.

Config lives at root: \`package.json\`, \`vite.config.ts\`, \`.env\`. Public static files in \`public/\`.`,
        ],
      ],
      [
        {
          q: 'How would you structure a large React app?',
          a: 'By features (auth, billing, catalog), each with components, hooks, and API. Shared UI in a design-system folder. Routes at the edge. Colocate styles and tests. Keep the store/query layer next to the feature that owns it.',
        },
      ],
    ),
    topic(
      'cra-vs-vite',
      'Create React App vs Vite',
      'CRA (webpack, retired as the recommended path) vs Vite (esbuild/Rollup, native ESM dev server). New apps should use Vite or a framework like Next.js.',
      [
        [
          'Comparison',
          `| | **CRA** | **Vite** |
|---|---|---|
| Bundler | webpack | esbuild (dev) + Rollup/Rolldown (prod) |
| Dev start | Slow on large apps | Instant native ESM |
| Status | Maintenance mode | Actively recommended for SPA |
| Config | Hidden webpack (eject) | Simple vite.config |
| HMR | webpack HMR | Fast HMR |
| Official React docs | Point to Next / Vite | First-class SPA option |

CRA’s hidden webpack made customization painful (eject or CRACO). Vite is transparent. For SSR, SEO, and RSC, pick **Next.js** rather than either SPA tool.`,
        ],
      ],
      [
        {
          q: 'Why did the React team move away from CRA?',
          a: 'CRA aged poorly: slow webpack starts, hard config, and no SSR story. The docs now recommend a framework (Next.js) or Vite for client-only SPAs.',
        },
        {
          q: 'Vite vs CRA in one line?',
          a: 'Vite uses native ESM and esbuild for a much faster dev loop; CRA used webpack and is no longer the recommended starter.',
        },
      ],
    ),
  ],
}

export default ch
