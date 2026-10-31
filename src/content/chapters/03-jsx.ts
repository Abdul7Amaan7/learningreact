import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'jsx',
  number: 3,
  title: 'JSX',
  tagline: 'Syntax, expressions, fragments, and the rules that trip people up in interviews.',
  topics: [
    topic(
      'jsx-overview',
      'What is JSX?',
      'JSX is syntactic sugar for creating React elements. It is neither a string nor HTML; it is compiled JavaScript.',
      [
        [
          'Core idea',
          `You write XML-like tags inside JS. The compiler turns them into \`jsx(type, props, key)\` calls. The result is a plain object describing UI. React later turns that object into DOM (or native views).

You can use React without JSX (\`createElement\`) — JSX is convenience, not a runtime requirement.`,
        ],
      ],
      [
        {
          q: 'Is JSX a requirement for React?',
          a: 'No. JSX compiles to createElement/jsx(). You can write those calls by hand. JSX is the standard because it is readable.',
        },
      ],
    ),
    topic(
      'embedding-javascript',
      'Embedding JavaScript in JSX',
      'Anything inside curly braces is a JavaScript expression that becomes a child or prop value.',
      [
        [
          'What you can embed',
          `\`{user.name}\`, \`{items.map(...)}\`, \`{isOn && <Badge />}\`, \`{fn()}\`, template-ish \`{\`Hello \${name}\`}\`.

**Not allowed:** statements like \`if\`, \`for\`, \`let\` directly in \`{}\`. Use a ternary, &&, or compute above the return.

Functions as children are valid (render props): \`{({ row }) => <td>{row}</td>}\`.`,
        ],
      ],
      [
        {
          q: 'How do you embed JS in JSX?',
          a: 'Wrap an expression in curly braces: <h1>{title}</h1> or prop={value}. Statements must live outside the JSX or be rewritten as expressions.',
        },
      ],
    ),
    topic(
      'jsx-expressions',
      'JSX expressions',
      'JSX itself is an expression: you can assign it, return it, store it in arrays, and pass it as props.',
      [
        [
          'Consequences',
          `\`const hello = <span>Hi</span>\` is valid. Arrays of elements need keys. \`null\`, \`undefined\`, \`true\`, \`false\` render nothing. \`0\` **does render** — a famous \`&&\` bug: \`{count && <List />}\` shows 0 when count is 0. Prefer \`{count > 0 && <List />}\` or a ternary.`,
        ],
      ],
      [
        {
          q: 'What values render nothing in JSX?',
          a: 'true, false, null, and undefined. Numbers (including 0) and strings do render. That is why {0 && <X/>} shows 0.',
        },
      ],
    ),
    topic(
      'jsx-attributes',
      'JSX attributes',
      'Attributes map to props. Use quotes for string literals and braces for expressions. Spread to forward props.',
      [
        [
          'Patterns',
          `\`\`\`jsx
<img src={url} alt="Cat" width={40} />
<button disabled={busy} {...rest} />
\`\`\`

Unknown DOM attributes are usually passed through. Reserved React props: \`key\`, \`ref\` (not in \`...props\` the same way historically; \`ref\` is a prop in React 19).

Boolean true can be shorthand: \`<input required />\`.`,
        ],
      ],
      [
        {
          q: 'How do you pass a non-string attribute in JSX?',
          a: 'Use braces: width={40}, data={obj}, onClick={handler}. Quotes always make a string.',
        },
      ],
    ),
    topic(
      'conditional-rendering-jsx',
      'Conditional rendering in JSX',
      'Use if/else before return, ternaries, &&, or early returns. Switch is fine for variants. Do not put if statements inside braces.',
      [
        [
          'Idioms',
          `\`\`\`jsx
if (!user) return <Login />
return (
  <>
    {isAdmin ? <Admin /> : <User />}
    {error && <p>{error}</p>}
  </>
)
\`\`\`

Extract \`<Header />\` vs \`null\` for show/hide. For CSS, toggle class names rather than always mounting heavy trees if you need to preserve state — or keep mounted and hide with CSS.`,
        ],
      ],
      [
        {
          q: 'Ways to conditionally render in React?',
          a: 'Early return, ternary, logical AND, switch on a variant, or rendering null. Avoid executing hooks inside conditions.',
        },
      ],
    ),
    topic(
      'rendering-lists-jsx',
      'Rendering lists using JSX',
      'Transform arrays with map() into an array of elements, each with a stable unique key.',
      [
        [
          'Pattern',
          `\`\`\`jsx
<ul>
  {users.map((u) => (
    <li key={u.id}>{u.name}</li>
  ))}
</ul>
\`\`\`

\`filter\` and \`sort\` (on a copy) before map. Do not use \`for\` loops inside JSX — build the array first.`,
        ],
      ],
      [
        {
          q: 'How do you render a list in React?',
          a: 'Array.map to elements with a unique key, usually a database id, not the index if the list can reorder.',
        },
      ],
    ),
    topic(
      'fragments',
      'Fragments (<> </>)',
      'Fragments group children without extra DOM nodes. Short syntax <> </> cannot take keys or attributes; <Fragment key={id}> can.',
      [
        [
          'Why',
          `Tables and CSS flex/grid break if you inject a wrapper \`div\`. Fragments solve “JSX needs one parent” without a host node.

Keyed fragments are used when mapping: \`<Fragment key={item.id}>...</Fragment>\`.`,
        ],
      ],
      [
        {
          q: 'What are Fragments and when do you need keys on them?',
          a: 'Fragments group elements without a DOM node. When returning a list of fragments from map, use <Fragment key={...}> because <> cannot accept key.',
        },
      ],
    ),
    topic(
      'single-parent',
      'Why JSX requires a single parent (or Fragment)',
      'A return statement can return one expression. Adjacent JSX tags would be two expressions. A parent or Fragment wraps them into one tree.',
      [
        [
          'Compiler view',
          `\`return (<div/> <div/>)\` is invalid JS. \`return (<> <div/> <div/> </>)\` is one expression. React 16+ also allows arrays of elements as a return value, but keys become required and the syntax is uglier than a Fragment.`,
        ],
      ],
      [
        {
          q: 'Why must JSX have one parent?',
          a: 'Because the function must return a single expression. Adjacent elements would be two expressions. Wrap them in a node or Fragment.',
        },
      ],
    ),
    topic(
      'class-vs-classname',
      'Difference between class and className',
      'In JS, class is a reserved word. DOM elements expose the property className. JSX therefore uses className, which React maps to the HTML class attribute.',
      [
        [
          'Details',
          `Writing \`class\` in JSX is a common beginner bug (and some linters flag it). SVG sometimes uses \`className\` too. CSS Modules: \`className={styles.btn}\`. Multiple classes: template strings or \`clsx\`.`,
        ],
      ],
      [
        {
          q: 'Why className instead of class in React?',
          a: 'class is reserved in JavaScript. React follows the DOM property name className and sets the class attribute on the HTML element.',
        },
      ],
    ),
    topic(
      'html-vs-jsx-again',
      'Difference between HTML and JSX',
      'Same theme as Fundamentals: camelCase, style objects, self-closing tags, and JS expressions.',
      [
        [
          'Quick drill',
          `HTML: \`<div class="box" onclick="go()" style="color:red" for="x">\`
JSX: \`<div className="box" onClick={go} style={{ color: 'red' }} htmlFor="x" />\`

Inline event handlers in HTML are strings; in JSX they are functions. \`innerHTML\` is replaced by children or carefully \`dangerouslySetInnerHTML\` (XSS risk).`,
        ],
      ],
      [
        {
          q: 'Convert this HTML to JSX: <label for="email" class="lbl">',
          a: '<label htmlFor="email" className="lbl">',
        },
      ],
    ),
  ],
}

export default ch
