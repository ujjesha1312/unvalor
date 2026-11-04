import type { CSSProperties } from 'react'
import Link from 'next/link'
import { hero } from '@/content/hero'
import { ROUTES } from '@/content/site'
import { HeroStage } from './HeroStage'
import { MagneticCta } from './MagneticCta'

/** Stagger index for the load choreography (.uv-in). */
const rise = (i: number) => ({ '--i': i }) as CSSProperties

export function Hero() {
  return (
    <section id="hero" className="uv-root uv-hero" aria-labelledby="hero-title">
      <p className="uv-hero__margin uv-hero__margin--l uv-label">{hero.marginProcess}</p>
      <div className="uv-hero__margin uv-hero__margin--r uv-label">
        <span className="uv-label__num">{hero.marginIndex}</span>
        <span>{hero.marginLocation}</span>
      </div>

      <div className="uv-hero__copy">
        <p className="uv-label uv-label--rule uv-in" style={rise(0)}>
          <span className="uv-label__num">{hero.eyebrowNum}</span> {hero.eyebrow}
        </p>
        <h1 className="uv-hero__title" id="hero-title">
          <span className="ln uv-in" style={rise(1)}>
            {hero.headline.line1}
          </span>
          <span className="ln ln--offset uv-in" style={rise(2)}>
            {hero.headline.line2Lead}{' '}
            <span className="uv-hl">
              {hero.headline.highlight}
              <svg className="uv-hl__u" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength={1} d="M3 13.5C58 8.2 121 5.6 196 7.4c66 1.6 128 4.6 172 1.9 9-.6 18-1.9 29-4" />
              </svg>
            </span>
            {hero.headline.line2End}
          </span>
        </h1>
        <p className="uv-hero__sub uv-in" style={rise(3)}>
          {hero.subhead}
        </p>
        <div className="uv-hero__ctas uv-in" style={rise(4)}>
          <MagneticCta href={ROUTES.contact} label={hero.primaryButton} hoverLabel={hero.primaryButtonHover} />
          <Link className="uv-btn uv-btn--secondary" href={ROUTES.work}>
            <span className="uv-btn__dot" aria-hidden="true" />
            {hero.secondaryButton}
          </Link>
        </div>
      </div>

      <HeroStage />
    </section>
  )
}
