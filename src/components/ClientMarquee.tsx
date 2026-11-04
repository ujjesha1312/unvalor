'use client'

import { useState, type CSSProperties } from 'react'
import { about, CLIENT_LOGOS, type ClientLogo } from '@/content/about'

/**
 * Endless left-scrolling strip of client logos (About · "(B) Our first clients").
 * The track holds the list twice and slides by exactly one copy, so the loop is seamless.
 * Pauses on hover/focus and with the Pause button (WCAG 2.2.2); reduced motion shows a still grid.
 */
export function ClientMarquee() {
  const [paused, setPaused] = useState(false)
  const hasLogos = CLIENT_LOGOS.length > 0
  const items: readonly (ClientLogo | null)[] = hasLogos
    ? CLIENT_LOGOS
    : Array.from({ length: about.clients.slotCount }, () => null)

  return (
    <div className={`uv-marquee${paused ? ' is-paused' : ''}`}>
      <div className="uv-marquee__viewport">
        <div className="uv-marquee__track" style={{ '--count': items.length } as CSSProperties}>
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="uv-marquee__list"
              role="list"
              // The second copy only exists to close the loop; placeholders carry no information.
              aria-hidden={copy === 1 || !hasLogos ? true : undefined}
            >
              {items.map((logo, i) => (
                <li key={i} className={`uv-ab__slot${logo ? ' uv-ab__slot--logo' : ''}`}>
                  {logo ? <Logo logo={logo} /> : <Placeholder />}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="uv-marquee__toggle"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? about.clients.playLabel : about.clients.pauseLabel}
      >
        <span className={`uv-marquee__icon${paused ? ' is-play' : ''}`} aria-hidden="true" />
        {paused ? about.clients.play : about.clients.pause}
      </button>
    </div>
  )
}

function Placeholder() {
  return (
    <>
      <svg viewBox="0 0 10 10" aria-hidden="true">
        <circle cx="5" cy="5" r="3.6" />
      </svg>
      <span className="uv-micro">{about.clients.slot}</span>
    </>
  )
}

function Logo({ logo }: { logo: ClientLogo }) {
  if (!logo.src) return <span className="uv-marquee__name">{logo.name}</span>
  return (
    // eslint-disable-next-line @next/next/no-img-element -- small static SVG logos
    <img className="uv-marquee__img" src={logo.src} width={logo.width} height={logo.height} alt={logo.name} loading="lazy" draggable={false} />
  )
}
