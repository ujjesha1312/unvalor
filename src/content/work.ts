/**
 * Work copy. Mirrors content.md §5.
 * PLACEHOLDERS — every slot below stands in for a real case study. Replace the title/desc
 * and add `image` once a project ships. Don't invent clients or results.
 */

export type WorkSpan = 'lg' | 'wide' | 'tall' | 'sm'

export interface WorkImage {
  readonly src: string
  readonly width: number
  readonly height: number
}

export interface WorkItem {
  readonly id: string
  readonly index: string
  readonly kind: string
  readonly title: string
  readonly desc: string
  readonly span: WorkSpan
  readonly image?: WorkImage
}

export const work = {
  num: '(02)',
  label: 'Work',
  heading: 'Selected work, on the way.',
  intro: "We're early, and honest about it. These slots fill up as projects ship.",
  hint: 'Drag or scroll to explore',
  status: 'Case study soon',
  open: 'Open',
} as const

export const WORK_ITEMS: readonly WorkItem[] = [
  {
    id: 'w1',
    index: '01',
    kind: 'Website',
    title: 'A booking-ready website',
    desc: 'For a local service business. The full story once it ships.',
    span: 'lg',
  },
  {
    id: 'w2',
    index: '02',
    kind: 'WhatsApp',
    title: 'An enquiry reply flow',
    desc: 'Answers the usual questions before anyone picks up the phone.',
    span: 'sm',
  },
  {
    id: 'w3',
    index: '03',
    kind: 'Automation',
    title: 'Missed-call text-back',
    desc: 'Every missed call gets a reply and a way to book.',
    span: 'sm',
  },
  {
    id: 'w4',
    index: '04',
    kind: 'First version',
    title: 'A founder’s first product',
    desc: 'A focused MVP, built to learn from real users.',
    span: 'tall',
  },
  {
    id: 'w5',
    index: '05',
    kind: 'Automation',
    title: 'Appointment reminders',
    desc: 'Fewer no-shows, without anyone chasing.',
    span: 'sm',
  },
  {
    id: 'w6',
    index: '06',
    kind: 'Website',
    title: 'A calmer storefront',
    desc: 'Clear pages, one obvious next step.',
    span: 'wide',
  },
]
