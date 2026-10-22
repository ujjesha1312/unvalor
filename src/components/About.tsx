import { useState } from 'react'

export interface PrincipleItem {
  id: string
  index: string
  title: string
  shortDesc: string
  expanded: string
}

const PRINCIPLES: PrincipleItem[] = [
  {
    id: 'understand',
    index: '01',
    title: 'Understand',
    shortDesc: 'Find the real problem.',
    expanded:
      'We start by understanding the everyday problem, the people experiencing it, and the way they already work.',
  },
  {
    id: 'simplify',
    index: '02',
    title: 'Simplify',
    shortDesc: 'Remove unnecessary steps.',
    expanded:
      'We look for simpler workflows that reduce friction instead of adding more tools, complicated dashboards, or unnecessary processes.',
  },
  {
    id: 'build',
    index: '03',
    title: 'Build',
    shortDesc: 'Make something useful.',
    expanded:
      'We turn practical ideas into thoughtful digital products, then refine them around what people actually need.',
  },
]

export function About() {
  const [activeCard, setActiveCard] = useState<string>('understand')

  const toggleCard = (id: string) => {
    setActiveCard((current) => (current === id ? '' : id))
  }

  return (
    <section id="about" className="about-section" aria-label="About UnValor Studio">
      <div className="section-container">
        {/* Section Header */}
        <header className="about-section-header">
          <span className="section-eyebrow">ABOUT UNVALOR°</span>
          <h2 className="about-heading">
            We believe useful software starts with understanding the problem.
          </h2>
          <p className="about-lead">
            We're building UnValor around a simple idea: technology should make everyday work easier, not add another layer of complexity.
          </p>
        </header>

        {/* Interactive Principle Cards */}
        <div id="approach" className="about-principles-container" aria-label="Studio Principles">
          <div className="principles-meta">
            <span className="principles-meta-title">Studio Principles</span>
            <span className="principles-meta-hint">Click cards to expand detail</span>
          </div>

          <div className="about-principles-grid">
            {PRINCIPLES.map((item) => {
              const isActive = activeCard === item.id

              return (
                <article
                  key={item.id}
                  className={`about-principle-card ${isActive ? 'is-active' : ''}`}
                >
                  <button
                    type="button"
                    className="principle-card-action"
                    onClick={() => toggleCard(item.id)}
                    aria-expanded={isActive}
                    aria-controls={`principle-detail-${item.id}`}
                    id={`principle-btn-${item.id}`}
                  >
                    <div className="principle-card-top">
                      <span className="principle-index">{item.index}</span>
                      <span className="principle-expand-indicator" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </div>

                    <h3 className="principle-title">{item.title}</h3>
                    <p className="principle-short-desc">{item.shortDesc}</p>
                  </button>

                  <div
                    id={`principle-detail-${item.id}`}
                    role="region"
                    aria-labelledby={`principle-btn-${item.id}`}
                    className={`principle-expand-wrapper ${isActive ? 'is-expanded' : ''}`}
                  >
                    <div className="principle-expand-inner">
                      <div className="principle-divider" />
                      <p className="principle-expanded-text">{item.expanded}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
