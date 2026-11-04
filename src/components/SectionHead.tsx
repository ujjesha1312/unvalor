import type { ReactNode } from 'react'

interface SectionHeadProps {
  /** Used for the heading id, so the section can be `aria-labelledby={`${id}-title`}`. */
  id: string
  num: string
  label: string
  title: ReactNode
  intro?: string
  /** Right-hand slot (hint, controls, CTA). */
  aside?: ReactNode
  /** On a section's own page the title is the page's single <h1>. */
  asPage?: boolean
}

/** Shared section header: `(01) — Label`, display title, optional intro and aside. */
export function SectionHead({ id, num, label, title, intro, aside, asPage = false }: SectionHeadProps) {
  const Heading = asPage ? 'h1' : 'h2'
  return (
    <header className="uv-sec__head">
      <div className="uv-sec__head-main">
        <p className="uv-label uv-label--rule">
          <span className="uv-label__num">{num}</span> {label}
        </p>
        <Heading className="uv-sec__title" id={`${id}-title`}>
          {title}
        </Heading>
        {intro && <p className="uv-sec__intro">{intro}</p>}
      </div>
      {aside && <div className="uv-sec__aside">{aside}</div>}
    </header>
  )
}
