import { a11y } from '@/content/a11y'
import { FOOTER_LINKS, footer } from '@/content/footer'
import { brand } from '@/content/site'
import { BackToTopButton, FooterBrandLink, ReplayIntroButton } from './FooterActions'

const footerAction =
  'inline-flex cursor-pointer items-center gap-[0.4rem] border-none bg-transparent p-0 font-brand text-[0.86rem] text-warm-cream [transition:color_0.2s_ease] hover:text-warm-cream/80'

export function Footer() {
  // Rendered at build time (static page); the client-only app computed this in the browser.
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border-subtle bg-midnight pt-20 pb-12" role="contentinfo">
      <div className="section-container">
        <div className="mb-16 grid grid-cols-[1.8fr_1fr_1fr] gap-14 mobile:grid-cols-[1fr] mobile:gap-10">
          <div>
            <FooterBrandLink className="inline-flex items-baseline gap-[0.1rem] font-editorial text-[1.6rem] font-bold text-warm-cream no-underline">
              {brand.wordmark}
              <span className="font-brand text-[1.15rem] font-bold text-warm-cream">{brand.degree}</span>
            </FooterBrandLink>
            <p className="mx-0 mt-[0.35rem] mb-4 font-brand text-[0.65rem] font-medium tracking-[0.42em] text-warm-cream uppercase">
              {footer.signature}
            </p>
            <p className="m-0 max-w-[340px] font-brand text-[0.9rem] leading-[1.6] text-warm-cream/82">{footer.tagline}</p>
          </div>

          <div>
            <span className="mb-5 block font-brand text-[0.72rem] font-semibold tracking-[0.22em] text-warm-cream/60 uppercase">
              {footer.navHeading}
            </span>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-brand text-[0.86rem] text-warm-cream/75 no-underline [transition:color_0.2s_ease] hover:text-warm-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="mb-5 block font-brand text-[0.72rem] font-semibold tracking-[0.22em] text-warm-cream/60 uppercase">
              {footer.experienceHeading}
            </span>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              <li>
                <ReplayIntroButton className={footerAction} title={a11y.footer.replayTitle}>
                  <span aria-hidden="true">↺</span> {footer.replay}
                </ReplayIntroButton>
              </li>
              <li>
                <BackToTopButton className={footerAction}>{footer.backToTop}</BackToTopButton>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border-subtle pt-8 font-brand text-[0.78rem] text-warm-cream/60 mobile:flex-col mobile:gap-3 mobile:text-center">
          <p className="m-0">{footer.copyright(currentYear)}</p>
          <p className="m-0">{footer.colophon}</p>
        </div>
      </div>
    </footer>
  )
}
