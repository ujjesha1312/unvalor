/** Hero copy. Mirrors content.md §3. */

export interface FocusCard {
  readonly index: string
  readonly tag: string
  readonly title: string
  readonly body: string
}

export const hero = {
  headline: { line1: 'Ideas,', line2: 'made tangible.' },
  subhead: 'We turn thoughtful ideas into digital products built for real life.',
  primaryButton: 'Explore our work',
  secondaryButton: "Let's talk",
  statusLine: "We're actively building at UnValor. · Direct founder collaboration",
} as const

export const FOCUS_CARDS: readonly FocusCard[] = [
  {
    index: '01',
    tag: 'Small Business Tools',
    title: 'Everyday Operations',
    body: 'Practical digital tools and simple workflows built to eliminate friction and solve routine operational headaches for small businesses.',
  },
  {
    index: '02',
    tag: 'Startup MVPs',
    title: 'Practical Software',
    body: 'Fast, dependable web applications and digital tools for early-stage founders looking to test real ideas with real people, not bloated roadmaps.',
  },
  {
    index: '03',
    tag: 'Our Approach',
    title: 'Human-Centered Utility',
    body: 'Digital craft stripped of tech jargon. We design software around existing user habits, multi-language needs, and genuine daily usefulness.',
  },
]
