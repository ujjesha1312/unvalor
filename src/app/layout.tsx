import type { Metadata } from 'next'
import { Space_Grotesk, Syne } from 'next/font/google'
import type { CSSProperties, ReactNode } from 'react'
import { INTRO_GATE_SCRIPT } from '@/lib/intro-gate'
import { site } from '@/content/site'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

/**
 * Expose only the web font's own family to the theme (globals.css appends the
 * original -apple-system… stack). next/font also generates a size-adjusted Arial
 * "Fallback" face, which would render glyphs missing from the subset (arrows like
 * → ↗ ✕) in Arial instead of the system font. `adjustFontFallback: false` should
 * disable it but is ignored by Turbopack builds in Next 16.4.4.
 */
const primaryFamily = (font: { style: { fontFamily: string } }) => font.style.fontFamily.split(',')[0]?.trim() ?? ''

const fontVariables = {
  '--font-space-grotesk': primaryFamily(spaceGrotesk),
  '--font-syne': primaryFamily(syne),
} as CSSProperties

export const metadata: Metadata = {
  // TODO: set metadataBase to the production origin once the domain is final,
  // e.g. new URL('https://<production-domain>'), so OG/Twitter URLs resolve.
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.title,
    description: site.description,
    // TODO: add `url` (canonical production URL) and `images` (1200×630 share image).
  },
  twitter: {
    // TODO: switch to 'summary_large_image' and add `images` once a share image exists.
    card: 'summary',
    title: site.title,
    description: site.description,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: the intro-gate script below may add data-intro to <html> before hydration.
    <html lang="en" style={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_GATE_SCRIPT }} />
      </head>
      <body>
        <div className="uv-grain relative flex min-h-screen w-full flex-col bg-midnight">{children}</div>
      </body>
    </html>
  )
}
