/**
 * About copy. Mirrors content.md §5.
 * Every value marked [PLACEHOLDER] is waiting on real copy, names or photos.
 */

export interface Photo {
  readonly src: string
  readonly width: number
  readonly height: number
  readonly alt: string
}

export interface Founder {
  /** [PLACEHOLDER] */
  readonly name: string
  /** [PLACEHOLDER] */
  readonly role: string
  /** [PLACEHOLDER] 1:1 portrait. Rendered with the site's navy→cream duotone. */
  readonly photo?: Photo
}

export const about = {
  num: '(A)',
  label: 'Studio',
  /** [PLACEHOLDER] */
  heading: 'A small studio for busy businesses.',
  /** [PLACEHOLDER] Keep it to ~2 lines. */
  lead: 'We set up the website and the quiet systems behind it, so you can get back to the work only you can do.',

  /** [PLACEHOLDER] 4:5 or 1:1 studio/founder photo. Rendered with the navy→cream duotone. */
  photo: undefined as Photo | undefined,
  photoCaption: '[PLACEHOLDER] Photo: studio, Visakhapatnam',

  card: {
    /** [PLACEHOLDER] */
    title: 'Built around your day',
    /** [PLACEHOLDER] */
    body: 'We start with how you already work: the calls, the messages, the busy hours. Then we fit the tools to that, not the other way round.',
    button: 'See how we work',
    buttonHover: 'Understand first',
    /** [PLACEHOLDER] Point at a process page once one exists. */
    href: '/services',
  },

  steps: ['Understand', 'Simplify', 'Build'],
  stepsLabel: 'Understand, then simplify, then build',

  note: {
    label: '(A) A note from the founders',
    portraitLabel: 'Founder',
    /** [PLACEHOLDER] 4–6 short sentences. No claims, numbers or "trusted by". */
    sentences: [
      'We started UnValor° after watching good local businesses lose customers to missed calls and slow replies.',
      'Not because the work was bad, but because nobody had a spare minute to answer.',
      'We build for the people running the shop, the clinic, the studio.',
      "We keep things simple enough that you'll actually use them.",
      "And we'll always tell you plainly what something will and won't do.",
    ],
  },

  clients: {
    label: '(B) Our first clients',
    /** Placeholder slot text, shown until CLIENT_LOGOS has entries. */
    slot: 'Your business',
    slotCount: 6,
    pause: 'Pause',
    play: 'Play',
    pauseLabel: 'Pause the client logos',
    playLabel: 'Play the client logos',
    /** [PLACEHOLDER] */
    line: "We're taking our first five clients.",
  },
} as const

/** 1 or 2 founders. A second entry stacks a second portrait under the first. */
export const FOUNDERS: readonly Founder[] = [
  // [PLACEHOLDER] name + role
  { name: 'Ujjesha', role: 'Design & build' },
]

export interface ClientLogo {
  /** Business name — the logo's alt text. */
  readonly name: string
  /** Logo file (SVG preferred), e.g. '/clients/acme.svg'. Without it the name is set in type. */
  readonly src?: string
  readonly width?: number
  readonly height?: number
}

/**
 * [PLACEHOLDER] Real client logos for the About marquee — only add businesses that have agreed to be shown.
 * While this is empty the marquee shows `about.clients.slotCount` "Your business" slots.
 */
export const CLIENT_LOGOS: readonly ClientLogo[] = []
