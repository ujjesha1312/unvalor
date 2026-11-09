/**
 * Site meta, brand and navigation copy.
 * Mirrors content.md §1 — keep wording identical in both places.
 */

export const site = {
  title: 'UnValor°',
  /** No description existed before the migration; this reuses the Hero subhead verbatim. */
  description: 'We turn thoughtful ideas into digital products built for real life.',
} as const

export const brand = {
  wordmark: 'UnValor',
  degree: '°',
} as const

export type SectionId = 'hero' | 'services' | 'approach' | 'about' | 'contact'

export interface NavItem {
  readonly label: string
  readonly href: `#${SectionId}`
  readonly isDropdown?: boolean
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact', isDropdown: true },
]

/** Section ids tracked by the Navbar scroll spy, in page order. */
export const SCROLL_SPY_SECTIONS: readonly SectionId[] = ['hero', 'services', 'approach', 'about', 'contact']

export const navCta = {
  desktop: "Let's talk",
  mobile: "Let's talk",
  drawer: "Let's talk ↗",
  drawerReplay: 'Replay Brand Reveal',
} as const

export const contactDropdown = {
  eyebrow: 'START A CONVERSATION',
  email: {
    title: 'Send an Email',
    description: 'Have a project, product idea, or question? Write to us.',
    action: 'Compose Email',
    subject: 'UnValor Inquiry',
    unverifiedTag: 'Setup in progress · Email pending',
  },
  explore: {
    title: 'Explore UnValor',
    description: "See what we're building and the problems we want to solve.",
    action: 'Explore the Studio',
  },
  footerLink: 'Go to inquiry section ↓',
} as const
