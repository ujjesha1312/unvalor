/** Services copy. Mirrors content.md §4. */

export const services = {
  eyebrow: 'Services & Focus',
  heading: 'Capabilities crafted for everyday utility.',
  intro:
    'We build practical digital tools for small businesses and focused software for startups. Drag cards to reorganize your view.',
  dragHint: 'Drag grip to rearrange',
  reset: '↺ Reset layout',
} as const

export type VisualType = 'tools' | 'web' | 'automation' | 'collaboration'

export interface FeatureCardData {
  readonly id: string
  readonly title: string
  readonly category: string
  readonly description: string
  readonly visualType: VisualType
}

export const INITIAL_CARDS: readonly FeatureCardData[] = [
  {
    id: 'card-tools',
    title: 'Practical Business Tools',
    category: 'SMALL BUSINESS SOFTWARE',
    description: 'Practical digital tools that help small businesses streamline daily operations.',
    visualType: 'tools',
  },
  {
    id: 'card-web',
    title: 'Websites & MVPs',
    category: 'WEB DEVELOPMENT',
    description: 'Fast, thoughtful websites and useful first versions of digital products.',
    visualType: 'web',
  },
  {
    id: 'card-ai',
    title: 'AI & Workflow Automation',
    category: 'AI & AUTOMATION',
    description: 'Practical automation that reduces repetitive work and makes information easier to use.',
    visualType: 'automation',
  },
  {
    id: 'card-collab',
    title: 'Build With UnValor',
    category: 'EARLY-STAGE COLLABORATION',
    description: "Have a real problem to solve? Let's explore a practical first version together.",
    visualType: 'collaboration',
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
  },
} as const
