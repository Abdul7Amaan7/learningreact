import type { Chapter, Topic } from './types'
import fundamentals from './chapters/01-fundamentals'
import components from './chapters/02-components'
import jsx from './chapters/03-jsx'
import props from './chapters/04-props'
import state from './chapters/05-state'
import hooks from './chapters/06-hooks'
import useeffect from './chapters/07-useeffect'
import events from './chapters/08-events'
import conditional from './chapters/09-conditional'
import lists from './chapters/10-lists'
import forms from './chapters/11-forms'
import router from './chapters/12-router'
import context from './chapters/13-context'
import redux from './chapters/14-redux'
import performance from './chapters/15-performance'
import lifecycle from './chapters/16-lifecycle'
import api from './chapters/17-api'
import advanced from './chapters/18-advanced'
import nextjs from './chapters/19-nextjs'

export const chapters: Chapter[] = [
  fundamentals,
  components,
  jsx,
  props,
  state,
  hooks,
  useeffect,
  events,
  conditional,
  lists,
  forms,
  router,
  context,
  redux,
  performance,
  lifecycle,
  api,
  advanced,
  nextjs,
]

export type TopicRef = {
  chapter: Chapter
  topic: Topic
  href: string
}

export const allTopics: TopicRef[] = chapters.flatMap((chapter) =>
  chapter.topics.map((topic) => ({
    chapter,
    topic,
    href: `/topic/${chapter.id}/${topic.slug}`,
  })),
)

export function findTopic(chapterId: string, slug: string): TopicRef | undefined {
  return allTopics.find((t) => t.chapter.id === chapterId && t.topic.slug === slug)
}

export function neighbors(href: string): { prev?: TopicRef; next?: TopicRef } {
  const i = allTopics.findIndex((t) => t.href === href)
  if (i < 0) return {}
  return { prev: allTopics[i - 1], next: allTopics[i + 1] }
}

export function searchTopics(query: string): TopicRef[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return allTopics.filter(({ topic, chapter }) => {
    const blob = [
      topic.title,
      topic.summary,
      chapter.title,
      ...topic.sections.map((s) => s.heading),
      ...topic.interview.map((i) => i.q),
    ]
      .join(' ')
      .toLowerCase()
    return blob.includes(q)
  })
}

export const stats = {
  chapters: chapters.length,
  topics: allTopics.length,
  questions: allTopics.reduce((n, t) => n + t.topic.interview.length, 0),
}
