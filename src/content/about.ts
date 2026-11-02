/** About copy. Mirrors content.md §5. */

export interface PrincipleItem {
  readonly id: string
  readonly index: string
  readonly title: string
  readonly shortDesc: string
  readonly expanded: string
}

export const about = {
  eyebrow: 'ABOUT UNVALOR°',
  heading: 'We believe useful software starts with understanding the problem.',
  lead: "We're building UnValor around a simple idea: technology should make everyday work easier, not add another layer of complexity.",
  principlesLabel: 'Studio Principles',
  expandHint: 'Click cards to expand detail',
} as const

export const PRINCIPLES: readonly PrincipleItem[] = [
  {
    id: 'understand',
    index: '01',
    title: 'Understand',
    shortDesc: 'Find the real problem.',
    expanded:
      'We start by understanding the everyday problem, the people experiencing it, and the way they already work.',
  },
  {
    id: 'simplify',
    index: '02',
    title: 'Simplify',
    shortDesc: 'Remove unnecessary steps.',
    expanded:
      'We look for simpler workflows that reduce friction instead of adding more tools, complicated dashboards, or unnecessary processes.',
  },
  {
    id: 'build',
    index: '03',
    title: 'Build',
    shortDesc: 'Make something useful.',
    expanded:
      'We turn practical ideas into thoughtful digital products, then refine them around what people actually need.',
  },
]
