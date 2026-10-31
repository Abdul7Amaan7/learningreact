import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'events',
  number: 8,
  title: 'Event Handling',
  tagline: 'Synthetic events, common handlers, bubbling, and form events.',
  topics: [
    topic(
      'react-event-handling',
      'React event handling',
      'You pass functions to camelCase props like onClick. React uses a synthetic event system on top of the browser.',
      [
        [
          'Basics',
          `\`\`\`jsx
<button onClick={handleClick}>Save</button>
<button onClick={() => save(id)}>Save</button>
\`\`\`

Pass the function, do not call it: \`onClick={handleClick}\` not \`onClick={handleClick()}\` unless you intentionally want the return value as the handler.`,
        ],
      ],
      [
        {
          q: 'How do you attach a click handler in React?',
          a: 'Pass a function to onClick: <button onClick={fn}>. Use camelCase. The first argument is a SyntheticEvent.',
        },
      ],
    ),
    topic(
      'synthetic-events',
      'Synthetic events',
      'SyntheticEvent is React’s cross-browser wrapper around the native event. In modern React (17+), events delegate to the root, not document, and pooling is gone.',
      [
        [
          'What to know',
          `\`e.preventDefault()\`, \`e.stopPropagation()\`, \`e.target\`, \`e.currentTarget\`, \`e.nativeEvent\`.

**Event pooling** (legacy): e was reused, so you could not read it in an async callback unless you called \`e.persist()\`. React 17+ does not pool. Mention pooling only as history.

Delegation: React attaches listeners at the root and dispatches to the fiber that matches — this is how event delegation works in React.`,
        ],
      ],
      [
        {
          q: 'What is a SyntheticEvent?',
          a: 'React’s normalized event object wrapping the native event so onClick etc. behave consistently. Access the real event via e.nativeEvent.',
        },
        {
          q: 'Is event pooling still a thing?',
          a: 'No in React 17+. You can read e asynchronously without persist(). Older articles still mention pooling — that is a trap.',
        },
      ],
    ),
    topic(
      'event-handlers',
      'Event handlers',
      'Handlers are functions. Class methods need binding; function components close over state. Keep them small and named if used twice.',
      [
        [
          'Signature',
          `\`function handleChange(e: ChangeEvent<HTMLInputElement>) { setV(e.target.value) }\`

Async handlers are fine; remember stale state and batching.`,
        ],
      ],
      [
        {
          q: 'What is an event handler in React?',
          a: 'A function passed to an on* prop. React calls it with a SyntheticEvent when the event occurs on that fiber’s host node (or bubbles to it).',
        },
      ],
    ),
    topic(
      'onclick',
      'onClick',
      'Fires on pointer/keyboard activation of buttons, clicks on any node. Use a real <button> for accessibility.',
      [
        [
          'Notes',
          `onClick on a div is not keyboard accessible. For lists, prefer onClick on the button inside. \`e.detail\` for double-click counts. Stop using javascript: URLs.`,
        ],
      ],
      [
        { q: 'Why not put onClick on a div?', a: 'Divs are not in the tab order and do not receive Enter/Space by default. Use button (or add role, tabIndex, and key handlers — worse).' },
      ],
    ),
    topic(
      'onchange',
      'onChange',
      'In React, onChange fires on every input, not only on blur (unlike some older HTML docs). It is the backbone of controlled inputs.',
      [
        [
          'Pattern',
          `\`<input value={v} onChange={(e) => setV(e.target.value)} />\`

For checkboxes use \`e.target.checked\`. For files, the input is usually uncontrolled.`,
        ],
      ],
      [
        { q: 'How is React onChange different from HTML onchange?', a: 'React’s onChange runs on each keystroke (like input event). Traditional HTML onchange often waited until blur.' },
      ],
    ),
    topic(
      'onsubmit',
      'onSubmit',
      'Listen on the <form>. Always preventDefault to stop a full page reload in an SPA.',
      [
        [
          'Pattern',
          `\`\`\`jsx
function onSubmit(e) {
  e.preventDefault()
  const data = new FormData(e.currentTarget)
}
\`\`\`

React 19 form actions can use \`action={fn}\` instead of onSubmit for progressive enhancement.`,
        ],
      ],
      [
        { q: 'What must you do in a React form onSubmit?', a: 'Call e.preventDefault() unless you are using a framework form action that handles it. Then read values from state or FormData.' },
      ],
    ),
    topic(
      'onmouseover',
      'onMouseOver',
      'Fires when the pointer enters the node or its children (bubbles). onMouseEnter does not bubble and is often what people actually want.',
      [
        [
          'Mouse vs pointer',
          `Prefer pointer events (\`onPointerEnter\`) for pen/touch. Hover UIs fail on touch — provide a click path.`,
        ],
      ],
      [
        { q: 'onMouseOver vs onMouseEnter?', a: 'onMouseOver bubbles and retriggers when moving between children. onMouseEnter fires once when entering the element’s bounds and does not bubble.' },
      ],
    ),
    topic(
      'onkeydown',
      'onKeyDown',
      'Fires when a key is pressed. Use it for shortcuts and to prevent default on Enter in inputs. Prefer onKeyDown over onKeyPress (deprecated).',
      [
        [
          'Accessibility',
          `\`e.key === 'Enter'\` / \`'Escape'\`. Do not rely only on keyCode (legacy). If you capture Enter in an input inside a form, know submit will also fire.`,
        ],
      ],
      [
        { q: 'onKeyDown vs onKeyPress vs onKeyUp?', a: 'KeyDown is the standard for shortcuts (repeats while held). KeyPress is deprecated. KeyUp fires on release. Use e.key, not e.keyCode.' },
      ],
    ),
    topic(
      'passing-arguments-handlers',
      'Passing arguments to event handlers',
      'Wrap in an arrow, or use a factory, or bind. The event object is still available if you pass it through.',
      [
        [
          'Idioms',
          `\`\`\`jsx
<button onClick={() => remove(id)}>x</button>
<button onClick={(e) => remove(id, e)}>x</button>
\`\`\`

In a hot list of thousands of rows, wrapping every row allocates functions — usually fine; optimize if the profiler says so (data-attributes + one parent handler).`,
        ],
      ],
      [
        { q: 'How do you pass extra arguments to onClick?', a: 'Use an arrow: onClick={() => fn(id)} or onClick={(e) => fn(id, e)}. Do not write onClick={fn(id)} unless fn returns a handler.' },
      ],
    ),
    topic(
      'event-bubbling',
      'Event bubbling',
      'After the target handles the event, it bubbles up ancestors. React’s onClick on a parent receives child clicks unless stopped.',
      [
        [
          'Use',
          `One handler on \`<ul onClick>\` can handle all row clicks (delegation). Check \`e.target\`.`,
        ],
      ],
      [
        { q: 'What is event bubbling in React?', a: 'Events propagate from the target up through parents. Parent onClick runs after the child’s unless stopPropagation is called.' },
      ],
    ),
    topic(
      'event-capturing',
      'Event capturing',
      'Capture goes window → target before bubble. In React, onClickCapture runs in the capture phase.',
      [
        [
          'API',
          `\`onClickCapture={fn}\`. Rare: intercept before children, focus traps, analytics.`,
        ],
      ],
      [
        { q: 'How do you listen in the capture phase?', a: 'Append Capture: onClickCapture, onKeyDownCapture. Those run from ancestor to target before bubbling listeners.' },
      ],
    ),
    topic(
      'event-delegation',
      'Event delegation',
      'Attach one listener to a parent instead of N children. React already delegates to the root; you can still delegate in your tree for dynamic lists.',
      [
        [
          'Why React does it',
          `Fewer native listeners, dynamic children work automatically, and the synthetic system maps native events to fibers.`,
        ],
      ],
      [
        { q: 'What is event delegation?', a: 'Handling events at a common ancestor. React uses it internally at the root. You can also put one onClick on a list parent and read data-id from e.target.' },
      ],
    ),
    topic(
      'preventdefault',
      'preventDefault()',
      'Stops the browser’s default action (form submit reload, link navigation, contenteditable quirks) without stopping propagation.',
      [
        [
          'vs return false',
          `In React, \`return false\` does **not** prevent default (unlike old inline HTML handlers). Always call \`e.preventDefault()\`.`,
        ],
      ],
      [
        { q: 'preventDefault vs stopPropagation?', a: 'preventDefault stops the browser default action. stopPropagation stops the event from reaching other listeners up/down the tree. They are independent.' },
      ],
    ),
    topic(
      'stoppropagation',
      'stopPropagation()',
      'Prevents the event from reaching other React nodes. Use sparingly; it makes parent-level features (click-outside, tracking) harder.',
      [
        [
          'stopImmediatePropagation',
          `On the native event, stops other listeners on the same node too. Modal overlay clicks often need stopPropagation so the document listener does not close immediately.`,
        ],
      ],
      [
        { q: 'When do you stop propagation?', a: 'When a nested control should not trigger a parent click (row click vs inner button). Prefer structure/checks on e.target when possible.' },
      ],
    ),
    topic(
      'handling-form-events',
      'Handling form events',
      'Combine onChange (fields), onSubmit (save), onReset, and validation. Controlled forms keep values in state; FormData reads the DOM.',
      [
        [
          'Checklist',
          `Associate labels, name attributes for FormData, disable submit while pending, announce errors, do not block paste, and never store passwords in extra places.`,
        ],
      ],
      [
        { q: 'How do you handle a form in React?', a: 'Either controlled state + onSubmit preventDefault, or uncontrolled FormData / React 19 actions. Validate, show errors, and manage pending UI.' },
      ],
    ),
  ],
}

export default ch
