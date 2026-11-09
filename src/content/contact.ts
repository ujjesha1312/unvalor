/**
 * Contact copy and studio contact configuration. Mirrors content.md §7.
 *
 * `isVerified`: keep `false` until the official studio inbox is operational.
 * When false, Contact and Footer show the address with a "setup in progress" notice
 * instead of a live mailto link. To activate live mailto links, update `email` and set `isVerified: true`.
 */

export interface ContactConfig {
  /** Studio contact email address */
  readonly email: string
  /** Controls whether email actions render live mailto links or setup badges. */
  readonly isVerified: boolean
  /** Setup explanation displayed when email is unverified */
  readonly unverifiedNotice: string
  /** Studio status badge displayed across contact touchpoints */
  readonly statusNote: string
}

export const CONTACT_CONFIG: ContactConfig = {
  email: 'hello@unvalor.com',
  isVerified: false,
  unverifiedNotice: 'Direct inbox setup in progress — official address pending verification.',
  statusNote: "We're actively building at UnValor.",
}

export type OptionId = 'idea' | 'product' | 'other'

export interface OptionItem {
  readonly id: OptionId
  readonly label: string
  readonly subject: string
}

export const CONTACT_OPTIONS: readonly [OptionItem, ...OptionItem[]] = [
  { id: 'idea', label: 'A new idea', subject: 'UnValor Inquiry: A new idea' },
  { id: 'product', label: 'A website or product', subject: 'UnValor Inquiry: A website or product' },
  { id: 'other', label: 'Something else', subject: 'UnValor Inquiry: Project conversation' },
]

export const contact = {
  num: '(04)',
  label: 'Contact',
  heading: { line1: 'Have an idea?', line2: "Let's make it real." },
  paragraph: "Tell us what you're building. Let's figure out the next step.",
  prompt: 'What are you working on?',
  /** Same message for every chip. */
  chipMessage: 'Great. Tell us a little about it in your email.',
  channelLabel: 'Direct email',
  primaryButton: 'Send us an email',
  copyButton: 'Copy email',
  copiedButton: 'Copied!',
} as const
