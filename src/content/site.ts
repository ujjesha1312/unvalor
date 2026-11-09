/**
 * Site meta, brand and navigation copy.
 * Mirrors content.md §1 — keep wording identical in both places.
 */

export const site = {
  name: 'UnValor°',
  title: 'UnValor° — Less chaos. More customers.',
  description: 'UnValor builds websites, WhatsApp replies and automations for local businesses.',
} as const

export const brand = {
  wordmark: 'UnValor',
  degree: '°',
} as const

export type SectionId = 'hero' | 'services' | 'work' | 'approach' | 'about' | 'contact'

/** Each section also has its own page. */
export type PageSlug = 'services' | 'work' | 'about' | 'contact'
export type PageHref = `/${PageSlug}`

export interface NavItem {
  readonly label: string
  readonly href: PageHref
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

/** Routes used by CTAs across the site. */
export const ROUTES = {
  home: '/',
  services: '/services',
  work: '/work',
  about: '/about',
  contact: '/contact',
} as const satisfies Record<string, '/' | PageHref>

export interface PageMeta {
  readonly title: string
  readonly description: string
}

/** <title> (gets the " — UnValor°" suffix from the layout template) and meta description per page. */
export const PAGE_META: Record<PageSlug, PageMeta> = {
  services: {
    title: 'Services',
    description: 'Practical digital tools, websites, MVPs and automation for small businesses and startups.',
  },
  work: {
    title: 'Work',
    description: 'Selected work from UnValor°. Case studies arrive as projects ship.',
  },
  about: {
    title: 'About',
    description: 'UnValor° is a small studio in Visakhapatnam building for busy businesses.',
  },
  contact: {
    title: 'Contact',
    description: "Tell us what you're building. Let's figure out the next step.",
  },
}

/** Footer of each sub-page: where to go next. */
export const PAGE_NEXT: Record<PageSlug, NavItem> = {
  services: { label: 'Work', href: '/work' },
  work: { label: 'About', href: '/about' },
  about: { label: 'Contact', href: '/contact' },
  contact: { label: 'Services', href: '/services' },
}

export const pageNext = {
  label: 'Next',
} as const

export const nav = {
  talk: 'Talk to us',
  book: 'Book a call',
  bookHover: 'Pick a time',
  menu: 'Menu',
  close: 'Close',
  drawerNote: 'Reply within a working day',
  drawerBook: 'Book a free 20-min call',
  drawerTalk: 'Talk to us',
} as const
