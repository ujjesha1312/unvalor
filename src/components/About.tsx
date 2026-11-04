'use client'

import type { CSSProperties } from 'react'
import { about, FOUNDERS, type Photo } from '@/content/about'
import { useReveal } from '@/lib/use-reveal'
import Link from 'next/link'
import { ClientMarquee } from './ClientMarquee'
import { ArrowIcon } from './Logo'

/** Reveal step (110ms each): header 0 · large 1 · right cards 2 · note 3 · strip 4. */
const step = (i: number) => ({ '--i': i }) as CSSProperties

interface AboutProps {
  /** Rendered as its own page: the title becomes the page <h1>. */
  asPage?: boolean
}

export function About({ asPage = false }: AboutProps) {
  const ref = useReveal<HTMLDivElement>()
  const signOff = FOUNDERS.map((f) => f.name).join(' & ')
  const Heading = asPage ? 'h1' : 'h2'

  return (
    <section id="about" className={`uv-root uv-sec${asPage ? ' uv-sec--page' : ''}`} aria-labelledby="about-title">
      <div ref={ref} className="uv-sec__in uv-ab uv-reveal">
        {/* 1 · Header row */}
        <header className="uv-ab__head" style={step(0)}>
          <div>
            <p className="uv-label uv-label--rule">
              <span className="uv-label__num">{about.num}</span> {about.label}
            </p>
            <Heading className="uv-sec__title" id="about-title">
              {about.heading}
            </Heading>
          </div>
          <p className="uv-ab__lead">{about.lead}</p>
        </header>

        {/* 2 · Large card: photo slot / drawn ° */}
        <figure className="uv-crop uv-ab__card uv-ab__card--lg" style={step(1)}>
          <span className="uv-crop__m uv-crop__m--tl" aria-hidden="true" />
          <span className="uv-crop__m uv-crop__m--tr" aria-hidden="true" />
          <span className="uv-crop__m uv-crop__m--bl" aria-hidden="true" />
          <span className="uv-crop__m uv-crop__m--br" aria-hidden="true" />
          {about.photo ? (
            <DuotonePhoto photo={about.photo} className="uv-ab__photo" />
          ) : (
            <svg className="uv-ab__mark" viewBox="0 0 120 120" aria-hidden="true">
              <circle className="uv-ab__draw" cx="60" cy="60" r="44" pathLength={1} />
            </svg>
          )}
          <figcaption className="uv-ab__caption uv-micro">{about.photoCaption}</figcaption>
        </figure>

        {/* 3 · Right-top card */}
        <article className="uv-ab__card uv-ab__card--text" style={step(2)}>
          <svg className="uv-ab__icon" viewBox="0 0 20 20" aria-hidden="true">
            <circle className="uv-ab__draw" cx="10" cy="10" r="6.5" pathLength={1} />
          </svg>
          <h3 className="uv-ab__title">{about.card.title}</h3>
          <p className="uv-ab__body">{about.card.body}</p>
          <Link className="uv-btn uv-btn--secondary uv-btn--sm uv-ab__btn" href={about.card.href}>
            <span className="uv-swap">
              <span>{about.card.button}</span>
              <span aria-hidden="true">{about.card.buttonHover}</span>
            </span>
            <ArrowIcon />
          </Link>
        </article>

        {/* 4 · Right-bottom card: Understand → Simplify → Build */}
        <div id="approach" className="uv-ab__card uv-ab__card--steps" style={step(2)}>
          <svg className="uv-ab__steps" viewBox="0 0 240 150" role="img" aria-label={about.stepsLabel}>
            <path className="uv-ab__draw uv-ab__steps-link" d="M44 38v30h40M104 80v30h40" pathLength={1} />
            <rect className="uv-ab__step uv-ab__step--1" x="20" y="16" width="96" height="22" rx="11" />
            <rect className="uv-ab__step uv-ab__step--2" x="72" y="58" width="96" height="22" rx="11" />
            <rect className="uv-ab__step uv-ab__step--3" x="124" y="100" width="96" height="22" rx="11" />
            <circle className="uv-ab__draw uv-ab__steps-deg" cx="226" cy="96" r="4" pathLength={1} />
          </svg>
        </div>

        {/* 5 · Founders note: the section's one cream spotlight */}
        <article className="uv-ab__note" style={step(3)} aria-labelledby="about-note-label">
          <ul className="uv-ab__founders" role="list">
            {FOUNDERS.map((f) => (
              <li key={f.name} className="uv-ab__founder">
                <span className="uv-ab__portrait">
                  {f.photo ? (
                    <DuotonePhoto photo={f.photo} className="uv-ab__portrait-img" />
                  ) : (
                    <svg viewBox="0 0 10 10" aria-hidden="true">
                      <circle cx="5" cy="5" r="2.2" />
                    </svg>
                  )}
                </span>
                <span className="uv-micro uv-ab__founder-tag">{about.note.portraitLabel}</span>
                <span className="uv-ab__founder-name">{f.name}</span>
                <span className="uv-ab__founder-role">{f.role}</span>
              </li>
            ))}
          </ul>
          <div className="uv-ab__note-copy">
            <h3 className="uv-micro uv-ab__note-label" id="about-note-label">
              {about.note.label}
            </h3>
            <p className="uv-ab__note-text">{about.note.sentences.join(' ')}</p>
            <p className="uv-ab__signoff">— {signOff}</p>
          </div>
        </article>

        {/* 6 · First-clients marquee — fill CLIENT_LOGOS to swap placeholders for real logos */}
        <div className="uv-ab__strip" style={step(4)}>
          <h3 className="uv-label">{about.clients.label}</h3>
          <ClientMarquee />
          <p className="uv-ab__strip-line">{about.clients.line}</p>
        </div>
      </div>
    </section>
  )
}

interface DuotonePhotoProps {
  photo: Photo
  className: string
}

/** Uses the navy→cream `#uv-duotone` SVG filter defined in SiteChrome. */
function DuotonePhoto({ photo, className }: DuotonePhotoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- slot for a single local photo; swap to next/image once assets exist
    <img className={className} src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" />
  )
}
