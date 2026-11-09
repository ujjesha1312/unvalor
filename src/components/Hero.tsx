import { a11y } from '@/content/a11y'
import { FOCUS_CARDS, hero } from '@/content/hero'
import { ScrollButton } from './ScrollButton'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-dvh items-center justify-start overflow-hidden bg-midnight pt-32 pb-20 mobile:pt-24 mobile:pb-14"
      aria-label={a11y.hero.section}
    >
      <div className="section-container flex w-full flex-col items-start text-left">
        {/* Core Typographic Statement */}
        <div className="m-0 flex max-w-[820px] flex-col items-start text-left">
          <h1 className="m-0 mb-[1.15rem] text-left font-editorial text-[length:clamp(2rem,3.4vw,2.9rem)] leading-[1.15] font-bold tracking-[-0.02em] text-balance text-warm-cream mobile:text-[length:clamp(1.75rem,5.5vw,2.15rem)] small:text-[1.55rem]">
            {hero.headline.line1} <br className="block tablet:inline" />
            {hero.headline.line2}
          </h1>

          <p className="m-0 mb-9 max-w-[580px] text-left font-brand text-[length:clamp(1.02rem,1.35vw,1.18rem)] leading-[1.6] font-normal text-pretty text-warm-cream/82 mobile:mb-7 mobile:text-[0.98rem] mobile:leading-[1.55] small:text-[0.92rem] small:leading-[1.5]">
            {hero.subhead}
          </p>

          <div className="mb-[3.25rem] flex flex-wrap items-center justify-start gap-[1.15rem] mobile:mb-9 mobile:gap-[0.85rem] small:w-full small:flex-col">
            <ScrollButton
              targets={['services', 'approach']}
              className="group inline-flex cursor-pointer items-center gap-[0.45rem] rounded-full border border-warm-cream bg-warm-cream px-[1.95rem] py-[0.85rem] font-brand text-[0.9rem] font-semibold tracking-[0.03em] text-midnight [transition:all_0.25s_cubic-bezier(0.16,1,0.3,1)] hover:border-warm-cream hover:bg-slate-blue hover:text-warm-cream hover:shadow-[0_10px_24px_-6px_rgba(34,57,111,0.5)] hover:[transform:translateY(-2px)] small:w-full small:justify-center"
            >
              {hero.primaryButton}{' '}
              <span
                className="text-[1.05rem] [transition:transform_0.2s_ease] group-hover:[transform:translate(2px,-2px)]"
                aria-hidden="true"
              >
                ↗
              </span>
            </ScrollButton>

            <ScrollButton
              targets={['contact']}
              className="inline-flex cursor-pointer items-center gap-[0.45rem] rounded-full border border-warm-cream/30 bg-transparent px-[1.95rem] py-[0.85rem] font-brand text-[0.9rem] font-medium tracking-[0.03em] text-warm-cream [transition:all_0.25s_cubic-bezier(0.16,1,0.3,1)] hover:border-warm-cream hover:bg-slate-blue/40 hover:[transform:translateY(-2px)] small:w-full small:justify-center"
            >
              {hero.secondaryButton}
            </ScrollButton>
          </div>
        </div>

        {/* Distinctive Studio Practice Matrix */}
        <div
          className="m-0 w-full max-w-[1200px] overflow-hidden rounded-[20px] border border-slate-blue/75 bg-deep-navy text-left shadow-[0_20px_48px_-12px_rgba(1,7,54,0.7)]"
          aria-label={a11y.hero.focusCards}
        >
          <div className="grid grid-cols-[repeat(3,1fr)] tablet:grid-cols-[1fr]">
            {FOCUS_CARDS.map((card) => (
              <div
                key={card.index}
                className="relative flex flex-col px-8 py-[1.85rem] [transition:background-color_0.25s_ease] not-last:border-r not-last:border-slate-blue/60 hover:bg-slate-blue/20 tablet:not-last:border-r-0 tablet:not-last:border-b mobile:px-5 mobile:py-[1.35rem]"
              >
                <div className="mb-[0.85rem] flex items-baseline justify-between">
                  <span className="font-editorial text-[0.85rem] font-bold tracking-[0.05em] text-warm-cream/40">
                    {card.index}
                  </span>
                  <span className="font-brand text-[0.68rem] font-semibold tracking-[0.16em] text-warm-cream uppercase">
                    {card.tag}
                  </span>
                </div>
                <h2 className="m-0 mb-[0.65rem] font-editorial text-[1.25rem] font-bold tracking-[-0.02em] text-warm-cream">
                  {card.title}
                </h2>
                <p className="m-0 font-brand text-[0.86rem] leading-[1.6] text-warm-cream/78">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-[0.55rem] border-t border-slate-blue/55 bg-midnight/65 px-6 py-3">
            <span
              className="h-1.5 w-1.5 rounded-[50%] bg-warm-cream shadow-[0_0_6px_rgba(252,241,208,0.6)]"
              aria-hidden="true"
            />
            <span className="font-brand text-[0.72rem] tracking-[0.06em] text-warm-cream/65 uppercase mobile:text-center mobile:text-[0.65rem]">
              {hero.statusLine}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
