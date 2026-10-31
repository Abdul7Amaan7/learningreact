import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'conditional',
  number: 9,
  title: 'Conditional Rendering',
  tagline: 'if/else, ternaries, && pitfalls, fallbacks, and conditional classes.',
  topics: [
    topic('if-else-rendering', 'if/else rendering',
      'Use statements before the return, or early returns for entire screens (auth gates, loading).',
      [['Pattern', `\`\`\`jsx
if (isLoading) return <Spinner />
if (error) return <Error msg={error} />
return <Page data={data} />
\`\`\`
This is the cleanest pattern for mutually exclusive full-tree UI.`]],
      [{ q: 'How do you conditionally render with if/else?', a: 'Use early returns for exclusive screens, or compute a variable (let content = ...) before the main return. You cannot write if statements inside {} in JSX.' }]),
    topic('ternary-operator', 'Ternary operator',
      'Inline expression: condition ? a : b. Ideal when both branches are small elements.',
      [['Watch size', 'Nested ternaries are unreadable. Extract a component or a function getBadge(status).']],
      [{ q: 'When do you use a ternary vs if?', a: 'Ternary inside JSX for small either/or. if/else outside for large branches or multiple exclusive states.' }]),
    topic('logical-and', 'Logical AND (&&)',
      'condition && <Node /> renders Node when condition is truthy. Falsy 0 and "" will render, which is the classic bug.',
      [['Safe form', '{count > 0 && <List />} or Boolean(count) && ... or a ternary with null. Never {array.length && <X/>} if length can be 0 — you will see a 0 on the page.']],
      [{ q: 'What is the && pitfall in React?', a: '0 and empty string are falsy but still render. {count && <Comp/>} shows 0. Compare explicitly: count > 0.' }]),
    topic('switch-case-rendering', 'Switch-case rendering',
      'Useful for variant enums: tab ids, step wizards, status machines.',
      [['Pattern', 'function Panel({ tab }) { switch (tab) { case "a": return <A/>; default: return null } } Prefer maps: const TABS = { a: A, b: B }; const C = TABS[tab] ?? Fallback.']],
      [{ q: 'How do you render by enum/status?', a: 'switch in the component body, or a lookup object mapping status to a component. Always include a default/fallback.' }]),
    topic('conditional-component-rendering', 'Conditional component rendering',
      'Choose a component type: const Icon = isOn ? Sun : Moon; return <Icon />. Changing type unmounts state.',
      [['Identity', 'If you toggle between two component types, local state resets. If you need to keep state, render both and hide one, or lift state.']],
      [{ q: 'What happens if the component type changes?', a: 'React unmounts the old tree and mounts the new one. State is lost. Use keys deliberately if you want a reset.' }]),
    topic('showing-hiding', 'Showing and hiding components',
      '{show && <Modal/>} unmounts when hidden (state lost, effects cleanup). CSS display:none keeps it mounted.',
      [['Choose', 'Unmount to reset forms and stop network. Hide with CSS to keep video position or expensive mount. For a11y, hidden modals should not be focusable.']],
      [{ q: 'Hide with CSS or not render?', a: 'Not rendering unmounts (cleanup, lost state). CSS hide keeps state. Pick based on whether you want a fresh instance.' }]),
    topic('fallback-ui', 'Rendering fallback UI',
      'Loading spinners, skeletons, error messages, empty states, and Suspense fallbacks are all conditional UI.',
      [['Levels', 'Local: if (!data). Route: React Router errorElement / Next error.tsx. Tree: Error Boundary. Async component: <Suspense fallback>.']],
      [{ q: 'What is a fallback UI?', a: 'UI shown when the primary UI cannot render yet or failed: spinner, skeleton, error, empty. Interviewers expect loading AND empty AND error, not just success.' }]),
    topic('conditional-css', 'Conditional CSS classes',
      'Toggle class names from state. Use template strings, arrays.filter.join, or clsx/classnames.',
      [['Example', '`className={[styles.btn, open && styles.open, variant].filter(Boolean).join(" ")}`. CSS modules + clsx is the usual stack. Avoid building huge inline style objects if classes suffice.']],
      [{ q: 'How do you apply a class conditionally?', a: 'Compute className from booleans (clsx({ active: isOn })). Do not put class in JSX — it is className.' }]),
  ],
}

export default ch
