import type { ReactNode } from 'react'
import { a11y } from '@/content/a11y'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

/** Skip link, navbar, <main> and footer — shared by the home page and every section page. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="uv-sr uv-skip" href="#main-content">
        {a11y.skipLink}
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />

      {/* Navy→cream duotone for every photo slot (hero still, About photo, founder portraits): filter: url(#uv-duotone). */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <filter id="uv-duotone" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values=".2126 .7152 .0722 0 0  .2126 .7152 .0722 0 0  .2126 .7152 .0722 0 0  0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.004 0.988" />
            <feFuncG type="table" tableValues="0.027 0.945" />
            <feFuncB type="table" tableValues="0.212 0.816" />
          </feComponentTransfer>
        </filter>
      </svg>
    </>
  )
}
