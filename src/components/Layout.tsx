import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Search } from './Search'
import { Sidebar } from './Sidebar'

export function Layout() {
  const [side, setSide] = useState(false)
  const [search, setSearch] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    setSide(false)
    window.scrollTo(0, 0)
  }, [loc.pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearch(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="app">
      <Sidebar open={side} onNavigate={() => setSide(false)} />
      <div className="main">
        <header className="topbar">
          <button className="icon-btn menu" type="button" onClick={() => setSide(true)} aria-label="Open menu">
            ☰
          </button>
          <button className="search-launch" type="button" onClick={() => setSearch(true)}>
            Search topics… <kbd>Ctrl K</kbd>
          </button>
        </header>
        <div className="page">
          <Outlet />
        </div>
      </div>
      {side && <div className="scrim" onClick={() => setSide(false)} />}
      <Search open={search} onClose={() => setSearch(false)} />
    </div>
  )
}
