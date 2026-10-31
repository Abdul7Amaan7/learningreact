import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'lifecycle',
  number: 16,
  title: 'React Lifecycle Methods',
  tagline: 'Class lifecycle phases mapped to Hooks — still a favorite interview topic.',
  topics: [
    topic('what-is-lifecycle', 'What is component lifecycle?',
      'The series of steps a component instance goes through: created, updated, destroyed, and optionally recovering from errors.',
      [['Why classes first', 'Lifecycle was originally a set of methods on React.Component. Hooks express the same moments with effects and the render body.']],
      [{ q: 'What is the React component lifecycle?', a: 'Mounting, updating, and unmounting (plus error handling). Classes use methods; functions use render + useEffect/useLayoutEffect.' }]),
    topic('mounting-phase', 'Mounting phase',
      'constructor → static getDerivedStateFromProps → render → (React inserts DOM) → componentDidMount.',
      [['Hooks', 'First function body execution ≈ render. useLayoutEffect([]) ≈ didMount before paint. useEffect([]) ≈ after paint.']],
      [{ q: 'Which methods run on mount?', a: 'constructor, getDerivedStateFromProps, render, componentDidMount. In functions: render then layout effects then paint then effects.' }]),
    topic('updating-phase', 'Updating phase',
      'Triggered by new props, setState, or forceUpdate. getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → DOM → componentDidUpdate.',
      [['Skip', 'shouldComponentUpdate false (or PureComponent) skips render and the rest.']],
      [{ q: 'What starts an update?', a: 'Parent re-render with new props, this.setState, or forceUpdate. Context changes also update consumers.' }]),
    topic('unmounting-phase', 'Unmounting phase',
      'componentWillUnmount then React removes the node. No render. Do not call setState here.',
      [['Hooks', 'All effect cleanups. Refs are nulled.']],
      [{ q: 'What should you do on unmount?', a: 'Cancel timers, abort fetches, unsubscribe. In classes: componentWillUnmount. In hooks: effect cleanup.' }]),
    topic('componentdidmount', 'componentDidMount()',
      'Runs once after the component is in the DOM. Classic place for fetches, subscriptions, and measuring layout.',
      [['Caveat', 'It does not run on the server. Fetch-on-mount causes waterfalls vs SSR loaders.']],
      [{ q: 'componentDidMount vs useEffect([])?', a: 'Both run after mount. useEffect runs after paint; didMount runs before the browser paints (closer to useLayoutEffect). Also Strict Mode double-invokes effects in dev.' }]),
    topic('componentdidupdate', 'componentDidUpdate()',
      '(prevProps, prevState, snapshot). Runs after updates, not after mount. Guard with if (prevProps.id !== this.props.id) to refetch.',
      [['Infinite loop', 'setState without a guard in didUpdate loops. Same as a badly dep’d effect.']],
      [{ q: 'How do you refetch when a prop changes in a class?', a: 'In componentDidUpdate, compare prevProps.id to this.props.id, then fetch. Always guard setState.' }]),
    topic('componentwillunmount', 'componentWillUnmount()',
      'Last chance to clean up. Counterpart to the setup in didMount.',
      [['Never', 'Do not start new async work you cannot cancel. setState here warns.']],
      [{ q: 'What belongs in componentWillUnmount?', a: 'Remove listeners, clear intervals, abort fetches — the inverse of didMount setup.' }]),
    topic('shouldcomponentupdate', 'shouldComponentUpdate()',
      'Return false to skip render. PureComponent implements a shallow compare. Easy to get wrong and drop UI updates.',
      [['Hooks analog', 'React.memo. Prefer that over hand-written shouldComponentUpdate.']],
      [{ q: 'What does shouldComponentUpdate do?', a: 'It lets you skip the render/commit if you return false. Used for performance. Incorrect comparisons cause stale UI.' }]),
    topic('getderivedstatefromprops', 'getDerivedStateFromProps()',
      'Static method: (props, state) => newState or null. Used to sync state when props change. Often an anti-pattern (derived state).',
      [['Rarely needed', 'Compute during render instead. Valid: reset a draft when an id prop changes (or use a key on the component).']],
      [{ q: 'When is getDerivedStateFromProps appropriate?', a: 'Rarely — when state must reset because a prop identity changed. Prefer key={id} to remount, or fully derived values.' }]),
    topic('getsnapshotbeforeupdate', 'getSnapshotBeforeUpdate()',
      'Runs right before DOM updates. Return a snapshot (scroll position) passed to componentDidUpdate. Used to restore scroll.',
      [['Hooks', 'useLayoutEffect reading layout before the browser paints is the usual replacement.']],
      [{ q: 'Why getSnapshotBeforeUpdate?', a: 'To read the DOM (scroll offset) before React mutates it, then restore in didUpdate. Chat windows use this pattern.' }]),
    topic('getderivedstatefromerror', 'getDerivedStateFromError()',
      'Static. After a descendant throws during render, return state to show a fallback UI. Pure, no side effects.',
      [['Pair', 'Use with componentDidCatch for logging. Together they make an error boundary.']],
      [{ q: 'What does getDerivedStateFromError do?', a: 'It lets an error boundary update state so the next render shows fallback UI after a child throw.' }]),
    topic('componentdidcatch', 'componentDidCatch()',
      '(error, info) for logging (Sentry). Side effects allowed. Does not catch event handler or async errors unless you rethrow into render.',
      [['Limits', 'Error boundaries catch render/lifecycle/constructor errors in descendants, not in the boundary itself, not in async callbacks, not in SSR the same way.']],
      [{ q: 'What errors do error boundaries catch?', a: 'Errors during render and lifecycle in the child tree. Not inside event handlers, promises, or the boundary’s own render unless handled.' }]),
    topic('lifecycle-vs-hooks', 'Lifecycle methods vs Hooks',
      'Map them in interviews, then say you prefer hooks because logic splits by concern not by method.',
      [['Cheat sheet', `didMount → useEffect([])
didUpdate → useEffect([deps])
willUnmount → cleanup
shouldComponentUpdate → memo
getSnapshotBeforeUpdate → useLayoutEffect
constructor state → useState
forceUpdate → avoid (or a dummy setState)
error boundaries → still classes (mostly)`]],
      [{ q: 'Map class lifecycle to hooks.', a: 'Mount/unmount/update → useEffect. DOM snapshot → useLayoutEffect. Skip render → React.memo. Error boundaries remain class-based in typical interviews.' }]),
  ],
}

export default ch
