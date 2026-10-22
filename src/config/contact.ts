/**
 * UnValor Studio Contact Configuration
 *
 * Centralized configuration for studio contact channels and verification status.
 *
 * IMPORTANT:
 * - `isVerified`: Keep set to `false` until the official studio domain/inbox
 *   is fully configured and operational.
 * - When `isVerified` is false, UI components will render clearly marked setup
 *   placeholders rather than deceptive, nonfunctional mailto links.
 * - To activate live mailto links across the site, update `email` and switch
 *   `isVerified` to `true`.
 */

export interface ContactConfig {
  /** Studio contact email address */
  readonly email: string
  /**
   * Verification status flag.
   * Controls whether email actions render live mailto links or development setup badges.
   */
  readonly isVerified: boolean
  /** Setup explanation displayed when email is unverified */
  readonly unverifiedNotice: string
  /** Studio status badge displayed across contact touchpoints */
  readonly statusNote: string
}

export const CONTACT_CONFIG: ContactConfig = {
  // Current unverified placeholder address
  email: 'hello@unvalor.com',
  isVerified: false,
  unverifiedNotice: 'Direct inbox setup in progress — official address pending verification.',
  statusNote: "We're actively building at UnValor.",
}
