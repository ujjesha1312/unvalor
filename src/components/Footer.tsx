import Link from 'next/link'
import { CONTACT_CONFIG } from '@/content/contact'
import { FOOTER_LINKS, footer } from '@/content/footer'
import { hero } from '@/content/hero'
import { ROUTES } from '@/content/site'
import { MagneticCta } from './MagneticCta'

export function Footer() {
  // Until the inbox is verified, the address is shown but links to the contact page instead of a live mailto.
  const emailHref = CONTACT_CONFIG.isVerified ? `mailto:${CONTACT_CONFIG.email}` : ROUTES.contact

  return (
    <footer className="uv-root uv-footer">
      <div className="uv-footer__in">
        <div>
          <p className="uv-footer__big">
            {footer.bigLine1}
            <br />
            {footer.bigLine2}
            <svg className="uv-deg" viewBox="0 0 10 10" aria-hidden="true">
              <circle cx="5" cy="5" r="3.8" />
            </svg>
          </p>
          <MagneticCta href={ROUTES.contact} label={hero.primaryButton} hoverLabel={hero.primaryButtonHover} />
        </div>

        <nav className="uv-footer__col" aria-labelledby="footer-studio">
          <h2 className="uv-label" id="footer-studio">
            {footer.studioHeading}
          </h2>
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="uv-footer__col">
          <h2 className="uv-label">{footer.talkHeading}</h2>
          {CONTACT_CONFIG.isVerified ? (
            <a href={emailHref}>{CONTACT_CONFIG.email}</a>
          ) : (
            <Link href={emailHref}>{CONTACT_CONFIG.email}</Link>
          )}
          <p className="uv-footer__note">{CONTACT_CONFIG.statusNote}</p>
        </div>
      </div>

      <div className="uv-footer__base uv-micro">
        <span>
          {footer.copyright} · {footer.signature}
        </span>
        <span>{footer.motto}</span>
        <a href="#top">{footer.backToTop}</a>
      </div>
    </footer>
  )
}
