'use client'

import type { CSSProperties } from 'react'
import { useReveal } from '@/lib/use-reveal'
import { ROUTES } from '@/content/site'
import { visuals, type ServiceIcon, type ServiceItem, type VisualType } from '@/content/services'
import { MagneticCta } from '../MagneticCta'

/**
 * Feature bento grid — adapted from the 21st.dev "feature-section-with-bento-grid" block.
 * Same layout idea (3 columns; cards 1 and 4 span two), restyled with UnValor tokens.
 * lucide-react / shadcn Badge are replaced by inline SVG and `.uv-label` so no deps are added.
 */

interface FeatureBentoProps {
  items: readonly ServiceItem[]
}

export function FeatureBento({ items }: FeatureBentoProps) {
  const ref = useReveal<HTMLUListElement>()

  return (
    <ul ref={ref} className="uv-bento uv-reveal" role="list">
      {items.map((item, i) => (
        <li
          key={item.id}
          className={`uv-bento__card${item.wide ? ' uv-bento__card--wide' : ''}`}
          style={{ '--i': i } as CSSProperties}
        >
          <div className="uv-bento__top">
            <FeatureIcon name={item.icon} />
            <span className="uv-label">
              <span className="uv-label__num">({String(i + 1).padStart(2, '0')})</span> {item.tag}
            </span>
          </div>
          <div className="uv-bento__main">
            <div className="uv-bento__copy">
              <h3 className="uv-bento__title">{item.title}</h3>
              <p className="uv-bento__body">{item.body}</p>
            </div>
            <FeatureVisual type={item.visual} />
          </div>
        </li>
      ))}
    </ul>
  )
}

/** The small product-flavoured visual on each card. Decorative except the collaboration CTA. */
function FeatureVisual({ type }: { type: VisualType }) {
  if (type === 'tools') {
    return (
      <div className="uv-bv uv-bv--board" aria-hidden="true">
        <p className="uv-bv__head uv-micro">
          <i /> {visuals.tools.header}
        </p>
        {visuals.tools.rows.map((row) => (
          <div key={row.name} className="uv-bv__row">
            <span>
              <b>{row.name}</b>
              <small>{row.status}</small>
            </span>
            <span className="uv-bv__pill uv-micro">{row.pill}</span>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'web') {
    return (
      <div className="uv-bv uv-bv--browser" aria-hidden="true">
        <p className="uv-bv__bar">
          <span className="uv-bv__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="uv-micro">{visuals.web.address}</span>
        </p>
        <div className="uv-bv__page">
          <span className="uv-bv__lines">
            <i />
            <i />
            <i />
          </span>
          <span className="uv-bv__box" />
        </div>
      </div>
    )
  }

  if (type === 'automation') {
    return (
      <ol className="uv-bv uv-bv--flow" aria-hidden="true">
        {visuals.automation.steps.map((s, i) => (
          <li key={s.tag} className={i === 1 ? 'is-on' : undefined}>
            <b>{s.tag}</b>
            <small>{s.sub}</small>
          </li>
        ))}
      </ol>
    )
  }

  return (
    <div className="uv-bv uv-bv--collab">
      <p className="uv-bv__chip">
        <span className="uv-btn__dot" aria-hidden="true" /> {visuals.collaboration.status}
      </p>
      <MagneticCta href={ROUTES.contact} label={visuals.collaboration.cta} hoverLabel={visuals.collaboration.ctaHover} small />
    </div>
  )
}

/** 32px line icons, 1.5px stroke, drawn in the house style (ends in a ° ring where it fits). */
function FeatureIcon({ name }: { name: ServiceIcon }) {
  return (
    <svg className="uv-bento__icon" viewBox="0 0 32 32" aria-hidden="true">
      {name === 'tools' && (
        <>
          <rect x="4" y="5" width="24" height="22" rx="2" />
          <path d="M4 11h24M9 16h8M9 21h5" />
          <circle cx="22" cy="19" r="2.5" />
        </>
      )}
      {name === 'web' && (
        <>
          <rect x="3" y="6" width="26" height="20" rx="2" />
          <path d="M3 11h26M7 8.5h.01M10 8.5h.01M8 16h9M8 20h6" />
          <circle cx="23" cy="18" r="2.5" />
        </>
      )}
      {name === 'flow' && (
        <>
          <circle cx="7" cy="8" r="3" />
          <circle cx="25" cy="16" r="3" />
          <circle cx="7" cy="24" r="3" />
          <path d="M10 8h5a4 4 0 0 1 4 4v0a4 4 0 0 0 3 3.9M10 24h5a4 4 0 0 0 4-4v0a4 4 0 0 1 3-3.9" />
        </>
      )}
      {name === 'build' && (
        <>
          <path d="M5 27h22M8 27V15l8-7 8 7v12" />
          <path d="M13 27v-6h6v6" />
          <circle cx="24" cy="6" r="2.5" />
        </>
      )}
    </svg>
  )
}
