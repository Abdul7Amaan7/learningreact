import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchTopics } from '../content'

type Props = { open: boolean; onClose: () => void }

export function Search({ open, onClose }: Props) {
  const [q, setQ] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const results = useMemo(() => searchTopics(q).slice(0, 20), [q])

  useEffect(() => {
    if (open) {
      setQ('')
      requestAnimationFrame(() => input.current?.focus())
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="search-backdrop"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
    >
      <div className="search-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Search">
        <input
          ref={input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search topics and interview questions…"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && results[0]) {
              navigate(results[0].href)
              onClose()
            }
          }}
        />
        <ul>
          {q.trim() && results.length === 0 && <li className="muted">No matches.</li>}
          {results.map((r) => (
            <li key={r.href}>
              <Link to={r.href} onClick={onClose}>
                <span className="ch">{r.chapter.number}. {r.chapter.title}</span>
                <span className="tt">{r.topic.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
