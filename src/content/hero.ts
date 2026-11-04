/** Hero copy. Mirrors content.md §3. */

export interface FilmChapter {
  readonly num: string
  readonly word: string
  readonly time: string
}

export interface OrbitTag {
  readonly label: string
  readonly meta: string
  /** Solid cream variant (the "booked" moment). */
  readonly cream?: boolean
}

export const hero = {
  eyebrowNum: '(00)',
  eyebrow: 'Websites · WhatsApp · Automations',
  headline: {
    line1: 'Less chaos.',
    line2Lead: 'More',
    highlight: 'customers',
    line2End: '.',
  },
  subhead: 'We build the website, WhatsApp replies and quiet systems that catch every enquiry.',
  primaryButton: 'Book a free 20-min call',
  primaryButtonHover: 'Pick a time that suits',
  secondaryButton: 'See our work',
  marginProcess: 'Understand → Simplify → Build',
  marginIndex: 'Index °00',
  marginLocation: 'Visakhapatnam, IN',
  filmHint: 'Play · 60s',
  filmDuration: '1:00',
  caption: 'Watch how UnValor works · 60s',
} as const

export const FILM_CHAPTERS: readonly FilmChapter[] = [
  { num: '(01)', word: 'Understand', time: '0:00' },
  { num: '(02)', word: 'Simplify', time: '0:20' },
  { num: '(03)', word: 'Build', time: '0:40' },
]

/** Outcome labels that ride the ° orbit — what happens in a client's day once the systems run. */
export const ORBIT_TAGS: readonly OrbitTag[] = [
  { label: 'New enquiry', meta: 'WhatsApp' },
  { label: 'Replied in seconds', meta: 'Auto' },
  { label: 'Booked · Tue 11:30', meta: 'Calendar', cream: true },
  { label: 'Missed call → texted back', meta: 'Phone' },
  { label: 'Found on Google', meta: 'Website' },
  { label: 'Reminder sent', meta: 'Tomorrow' },
]
