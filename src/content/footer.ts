/** Footer copy. Mirrors content.md §8. */

import { NAV_ITEMS, type NavItem } from './site'

export const footer = {
  bigLine1: 'Let’s make it',
  bigLine2: 'run calm',
  studioHeading: '(A) Studio',
  talkHeading: '(B) Talk',
  copyright: '© UnValor° Studio',
  signature: 'By Ujjesha',
  motto: 'Understand → Simplify → Build',
  backToTop: 'Back to top ↑',
} as const

export const FOOTER_LINKS: readonly NavItem[] = NAV_ITEMS
