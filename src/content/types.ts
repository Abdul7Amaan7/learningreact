export type InterviewQA = {
  q: string
  a: string
  followUp?: string
}

export type Section = {
  heading: string
  body: string
}

export type CodeSample = {
  title: string
  lang: string
  source: string
}

export type Topic = {
  slug: string
  title: string
  summary: string
  sections: Section[]
  code?: CodeSample[]
  pitfalls?: string[]
  interview: InterviewQA[]
}

export type Chapter = {
  id: string
  number: number
  title: string
  tagline: string
  priority?: 'high' | 'extreme'
  topics: Topic[]
}

export function topic(
  slug: string,
  title: string,
  summary: string,
  sections: [string, string][],
  interview: InterviewQA[],
  extras?: { code?: CodeSample[]; pitfalls?: string[] },
): Topic {
  return {
    slug,
    title,
    summary,
    sections: sections.map(([heading, body]) => ({ heading, body })),
    interview,
    code: extras?.code,
    pitfalls: extras?.pitfalls,
  }
}
