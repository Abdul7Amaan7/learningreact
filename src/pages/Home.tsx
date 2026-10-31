import { Link } from 'react-router-dom'
import { chapters, stats } from '../content'

export function Home() {
  return (
    <article className="home">
      <p className="eyebrow">React interview encyclopedia</p>
      <h1>Every core React topic, explained for interviews.</h1>
      <p className="lede">
        {stats.chapters} chapters · {stats.topics} topics · {stats.questions} interview questions
        with model answers. Built as a study site you can search, mark complete, and drill from
        fundamentals through Next.js.
      </p>
      <div className="hero-actions">
        <Link className="btn primary" to="/topic/fundamentals/what-is-react">
          Start with fundamentals
        </Link>
        <Link className="btn" to="/topic/hooks/usestate-hook">
          Jump to Hooks
        </Link>
      </div>
      <section className="how">
        <h2>How to use this</h2>
        <ol>
          <li>Read the explanation, then the pitfalls — that is what interviewers poke at.</li>
          <li>Open the interview questions and answer out loud before revealing the model answer.</li>
          <li>Mark a topic done when you can teach it without the notes.</li>
        </ol>
      </section>
      <ul className="chapter-grid">
        {chapters.map((ch) => (
          <li key={ch.id}>
            <Link to={`/topic/${ch.id}/${ch.topics[0].slug}`}>
              <span className="num">{String(ch.number).padStart(2, '0')}</span>
              <h3>{ch.title}</h3>
              <p>{ch.tagline}</p>
              <span className="meta">
                {ch.topics.length} topics
                {ch.priority ? ` · ${ch.priority} priority` : ''}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
