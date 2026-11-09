/** Footer copy. Mirrors content.md §7. */

import type { SectionId } from './site'

export interface FooterLink {
  readonly label: string
  readonly href: `#${SectionId}`
}

export const footer = {
  signature: 'BY UJJESHA',
  tagline: 'Digital product studio for founders, creators, and engineering teams.',
  navHeading: 'Navigation',
  experienceHeading: 'Experience',
  replay: 'Replay Brand Reveal',
  backToTop: '↑ Back to Top',
  copyright: (year: number) => `© ${year} UnValor. All rights reserved.`,
  colophon: 'Midnight Navy · Deep Navy · Slate Blue · Warm Cream',
} as const

export const FOOTER_LINKS: readonly FooterLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'About Studio', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
