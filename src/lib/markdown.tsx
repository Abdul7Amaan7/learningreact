import type { ReactNode } from 'react'

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const token = m[0]
    if (token.startsWith('**')) {
      parts.push(<strong key={k++}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('`')) {
      parts.push(<code key={k++}>{token.slice(1, -1)}</code>)
    } else {
      parts.push(<em key={k++}>{token.slice(1, -1)}</em>)
    }
    last = m.index + token.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function isTableLine(line: string) {
  return line.trim().startsWith('|')
}

function parseTable(lines: string[], start: number) {
  const rows: string[][] = []
  let i = start
  while (i < lines.length && isTableLine(lines[i])) {
    const cells = lines[i]
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim())
    if (!cells.every((c) => /^[-:]+$/.test(c))) rows.push(cells)
    i++
  }
  return { rows, end: i }
}

export function Markdown({ text }: { text: string }) {
  const chunks: ReactNode[] = []
  const parts = text.split(/```/)
  let key = 0

  parts.forEach((part, pi) => {
    if (pi % 2 === 1) {
      const nl = part.indexOf('\n')
      const lang = nl === -1 ? '' : part.slice(0, nl).trim()
      const source = (nl === -1 ? part : part.slice(nl + 1)).replace(/\n$/, '')
      chunks.push(
        <pre key={key++} className="code-block" data-lang={lang}>
          <code>{source}</code>
        </pre>,
      )
      return
    }

    const lines = part.split('\n')
    let i = 0
    let para: string[] = []

    const flushPara = () => {
      if (!para.length) return
      const joined = para.join(' ').trim()
      if (joined) chunks.push(<p key={key++}>{inline(joined)}</p>)
      para = []
    }

    while (i < lines.length) {
      const line = lines[i]
      const t = line.trim()

      if (isTableLine(line)) {
        flushPara()
        const { rows, end } = parseTable(lines, i)
        if (rows.length) {
          const [head, ...body] = rows
          chunks.push(
            <div key={key++} className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {head.map((c, ci) => (
                      <th key={ci}>{inline(c)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {body.map((r, ri) => (
                    <tr key={ri}>
                      {r.map((c, ci) => (
                        <td key={ci}>{inline(c)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>,
          )
        }
        i = end
        continue
      }

      if (!t) {
        flushPara()
        i++
        continue
      }

      if (t.startsWith('- ')) {
        flushPara()
        const items: string[] = []
        while (i < lines.length && lines[i].trim().startsWith('- ')) {
          items.push(lines[i].trim().slice(2))
          i++
        }
        chunks.push(
          <ul key={key++}>
            {items.map((item, ii) => (
              <li key={ii}>{inline(item)}</li>
            ))}
          </ul>,
        )
        continue
      }

      if (/^\d+\. /.test(t)) {
        flushPara()
        const items: string[] = []
        while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
          items.push(lines[i].trim().replace(/^\d+\. /, ''))
          i++
        }
        chunks.push(
          <ol key={key++}>
            {items.map((item, ii) => (
              <li key={ii}>{inline(item)}</li>
            ))}
          </ol>,
        )
        continue
      }

      para.push(t)
      i++
    }
    flushPara()
  })

  return <div className="md">{chunks}</div>
}
