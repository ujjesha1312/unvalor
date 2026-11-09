'use client'

import { useState } from 'react'
import { a11y } from '@/content/a11y'
import { about, PRINCIPLES } from '@/content/about'

export function About() {
  const [activeCard, setActiveCard] = useState<string>('understand')

  const toggleCard = (id: string) => {
    setActiveCard((current) => (current === id ? '' : id))
  }

  return (
    <section
      id="about"
      className="relative border-t border-border-subtle bg-midnight py-28 mobile:py-20"
      aria-label={a11y.about.section}
    >
      <div className="section-container">
        {/* Section Header */}
        <header className="mb-14 max-w-[760px] text-left mobile:mb-10">
          <span className="section-eyebrow">{about.eyebrow}</span>
          <h2 className="mx-0 mt-4 mb-5 font-editorial text-[length:clamp(2rem,4vw,2.85rem)] leading-[1.2] font-semibold tracking-[-0.015em] text-warm-cream">
            {about.heading}
          </h2>
          <p className="m-0 font-brand text-[length:clamp(1.05rem,1.8vw,1.2rem)] leading-[1.65] text-warm-cream/85">
            {about.lead}
          </p>
        </header>

        {/* Interactive Principle Cards */}
        <div id="approach" className="mb-0" aria-label={a11y.about.principles}>
          <div className="mb-7 flex items-center justify-between border-b border-slate-blue/60 pb-4">
            <span className="font-brand text-[0.75rem] font-semibold tracking-[0.2em] text-warm-cream/65 uppercase">
              {about.principlesLabel}
            </span>
            <span className="font-brand text-[0.75rem] text-warm-cream/50">{about.expandHint}</span>
          </div>

          <div className="grid grid-cols-[repeat(3,1fr)] [align-items:start] gap-6 mobile:grid-cols-[1fr] mobile:gap-4">
            {PRINCIPLES.map((item) => {
              const isActive = activeCard === item.id

              return (
                <article
                  key={item.id}
                  className={`relative overflow-hidden rounded-[18px] border [transition:border-color_0.25s_ease,background-color_0.25s_ease,transform_0.25s_ease,box-shadow_0.25s_ease] hover:[transform:translateY(-2px)] motion-reduce:transition-none ${
                    isActive
                      ? 'border-warm-cream/55 bg-[#0e204b] shadow-[0_12px_30px_-10px_rgba(1,7,54,0.8),0_0_0_1px_rgba(252,241,208,0.15)]'
                      : 'border-slate-blue/70 bg-deep-navy hover:border-warm-cream/35'
                  }`}
                >
                  <button
                    type="button"
                    className="block w-full cursor-pointer border-none bg-transparent px-7 pt-7 pb-5 text-left text-inherit [font:inherit] focus-visible:rounded-[18px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-warm-cream"
                    onClick={() => toggleCard(item.id)}
                    aria-expanded={isActive}
                    aria-controls={`principle-detail-${item.id}`}
                    id={`principle-btn-${item.id}`}
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span
                        className={`font-brand text-[0.82rem] font-bold tracking-[0.16em] [transition:color_0.2s_ease] ${
                          isActive ? 'text-warm-cream' : 'text-warm-cream/60'
                        }`}
                      >
                        {item.index}
                      </span>
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-[50%] border font-brand text-[1.1rem] leading-none text-warm-cream [transition:transform_0.25s_ease,background-color_0.25s_ease,border-color_0.25s_ease] motion-reduce:transition-none ${
                          isActive ? 'border-warm-cream/40 bg-warm-cream/12' : 'border-slate-blue/90 bg-midnight/40'
                        }`}
                        aria-hidden="true"
                      >
                        {isActive ? '−' : '+'}
                      </span>
                    </div>

                    <h3 className="m-0 mb-2 font-editorial text-[1.35rem] font-semibold tracking-[-0.01em] text-warm-cream">
                      {item.title}
                    </h3>
                    <p className="m-0 font-brand text-[1.02rem] leading-[1.45] font-medium text-warm-cream/92">
                      {item.shortDesc}
                    </p>
                  </button>

                  <div
                    id={`principle-detail-${item.id}`}
                    role="region"
                    aria-labelledby={`principle-btn-${item.id}`}
                    className={`grid [transition:grid-template-rows_0.3s_cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                      isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden px-7 pb-7">
                      <div className="mb-4 h-px bg-slate-blue/70" />
                      <p className="m-0 font-brand text-[0.93rem] leading-[1.65] text-warm-cream/82">{item.expanded}</p>
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
