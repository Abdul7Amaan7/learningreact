import { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { chapters } from '../content'

type Props = { open: boolean; onNavigate: () => void }

export function Sidebar({ open, onNavigate }: Props) {
  const loc = useLocation()
  const activeChapter = useMemo(() => {
    const m = loc.pathname.match(/^\/topic\/([^/]+)/)
    return m?.[1]
  }, [loc.pathname])

  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() =>
    activeChapter ? { [activeChapter]: true } : { fundamentals: true },
  )

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <NavLink to="/" className="brand" onClick={onNavigate}>
        <span className="logo">R</span>
        <div>
          <strong>React Interview Guide</strong>
          <em>In-depth notes + Q&amp;A</em>
        </div>
      </NavLink>
      <nav>
        {chapters.map((ch) => {
          const expanded = openIds[ch.id] ?? activeChapter === ch.id
          return (
            <div key={ch.id} className="nav-ch">
              <button
                type="button"
                className="nav-ch-btn"
                onClick={() => setOpenIds((s) => ({ ...s, [ch.id]: !expanded }))}
              >
                <span className="num">{String(ch.number).padStart(2, '0')}</span>
                <span className="name">{ch.title}</span>
                {ch.priority && <span className={`pri ${ch.priority}`}>{ch.priority === 'extreme' ? 'must' : 'high'}</span>}
                <span className="chev">{expanded ? '▾' : '▸'}</span>
              </button>
              {expanded && (
                <ul>
                  {ch.topics.map((t) => (
                    <li key={t.slug}>
                      <NavLink
                        to={`/topic/${ch.id}/${t.slug}`}
                        onClick={onNavigate}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        {t.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
