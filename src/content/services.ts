/** Services copy. Mirrors content.md §4. */

export const services = {
  num: '(01)',
  label: 'Services & Focus',
  heading: 'Capabilities crafted for everyday utility.',
  intro: 'We build practical digital tools for small businesses and focused software for startups.',
} as const

export type ServiceIcon = 'tools' | 'web' | 'flow' | 'build'
export type VisualType = 'tools' | 'web' | 'automation' | 'collaboration'

export interface ServiceItem {
  readonly id: string
  readonly icon: ServiceIcon
  readonly tag: string
  readonly title: string
  readonly body: string
  readonly visual: VisualType
  /** Spans two columns on desktop. */
  readonly wide: boolean
}

export const SERVICE_ITEMS: readonly ServiceItem[] = [
  {
    id: 'card-tools',
    icon: 'tools',
    tag: 'Small business software',
    title: 'Practical Business Tools',
    body: 'Practical digital tools that help small businesses streamline daily operations.',
    visual: 'tools',
    wide: true,
  },
  {
    id: 'card-web',
    icon: 'web',
    tag: 'Web development',
    title: 'Websites & MVPs',
    body: 'Fast, thoughtful websites and useful first versions of digital products.',
    visual: 'web',
    wide: false,
  },
  {
    id: 'card-ai',
    icon: 'flow',
    tag: 'AI & automation',
    title: 'AI & Workflow Automation',
    body: 'Practical automation that reduces repetitive work and makes information easier to use.',
    visual: 'automation',
    wide: false,
  },
  {
    id: 'card-collab',
    icon: 'build',
    tag: 'Early-stage collaboration',
    title: 'Build With UnValor',
    body: "Have a real problem to solve? Let's explore a practical first version together.",
    visual: 'collaboration',
    wide: true,
  },
]

/** Text inside each card's mini visual. */
export const visuals = {
  tools: {
    header: 'Operations · Workflow',
    rows: [
      { name: 'Order Processing', status: 'Active', pill: 'Live' },
      { name: 'Task Schedule', status: 'Synced', pill: 'OK' },
    ],
  },
  web: {
    address: 'studio.unvalor.com',
  },
  automation: {
    steps: [
      { tag: 'Input', sub: '"New task"' },
      { tag: 'Automation', sub: 'Workflow active' },
      { tag: 'Summary', sub: 'Clear update' },
    ],
  },
  collaboration: {
    status: 'Direct Founder Collaboration',
    cta: 'Start a project',
    ctaHover: "Let's talk",
  },
} as const
