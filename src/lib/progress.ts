const KEY = 'react-interview-progress-v1'

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function isDone(href: string): boolean {
  return read().includes(href)
}

export function toggleDone(href: string): boolean {
  const set = new Set(read())
  if (set.has(href)) set.delete(href)
  else set.add(href)
  localStorage.setItem(KEY, JSON.stringify([...set]))
  return set.has(href)
}

export function doneCount(): number {
  return read().length
}
