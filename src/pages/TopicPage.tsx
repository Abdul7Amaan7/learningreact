import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { findTopic, neighbors } from '../content'
import { Markdown } from '../lib/markdown'
import { isDone, toggleDone } from '../lib/progress'

export function TopicPage() {
  const { chapterId = '', slug = '' } = useParams()
  const ref = findTopic(chapterId, slug)
  const [done, setDone] = useState(false)
  const [openQ, setOpenQ] = useState<Record<number, boolean>>({})

  useEffect(() => {
    if (ref) setDone(isDone(ref.href))
    setOpenQ({})
  }, [ref])

  if (!ref) return <Navigate to="/" replace />

  const { chapter, topic, href } = ref
  const { prev, next } = neighbors(href)

  return (
    <article className="topic">
      <nav className="crumbs">
        <Link to="/">Guide</Link>
        <span>/</span>
        <span>
          {chapter.number}. {chapter.title}
        </span>
      </nav>
      <header className="topic-head">
        <div>
          <p className="eyebrow">
            Chapter {chapter.number}
            {chapter.priority ? ` · ${chapter.priority} interview priority` : ''}
          </p>
          <h1>{topic.title}</h1>
          <p className="lede">{topic.summary}</p>
        </div>
        <button
          type="button"
          className={`btn ${done ? 'primary' : ''}`}
          onClick={() => setDone(toggleDone(href))}
        >
          {done ? 'Marked done' : 'Mark as done'}
        </button>
      </header>

      {topic.sections.map((s) => (
        <section key={s.heading} className="block">
          <h2>{s.heading}</h2>
          <Markdown text={s.body} />
        </section>
      ))}

      {topic.code?.map((c) => (
        <section key={c.title} className="block">
          <h2>{c.title}</h2>
          <pre className="code-block" data-lang={c.lang}>
            <code>{c.source}</code>
          </pre>
        </section>
      ))}

      {topic.pitfalls && topic.pitfalls.length > 0 && (
        <section className="block pitfalls">
          <h2>Pitfalls interviewers listen for</h2>
          <ul>
            {topic.pitfalls.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="block interview">
        <h2>Interview questions</h2>
        <p className="hint">Answer out loud first, then expand the model answer.</p>
        <div className="qa-list">
          {topic.interview.map((qa, i) => (
            <div key={qa.q} className="qa">
              <button
                type="button"
                className="qa-q"
                onClick={() => setOpenQ((s) => ({ ...s, [i]: !s[i] }))}
                aria-expanded={!!openQ[i]}
              >
                <span>Q{i + 1}. {qa.q}</span>
                <span>{openQ[i] ? '−' : '+'}</span>
              </button>
              {openQ[i] && (
                <div className="qa-a">
                  <Markdown text={qa.a} />
                  {qa.followUp && (
                    <p className="follow">
                      <strong>Follow-up:</strong> {qa.followUp}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <nav className="pager">
        {prev ? (
          <Link to={prev.href}>
            <span>Previous</span>
            {prev.topic.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={next.href} className="next">
            <span>Next</span>
            {next.topic.title}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
