import Link from 'next/link'
import { brand } from '@/content/site'

interface LogoProps {
  label?: string
  /** Show the ° already drawn (no draw-in animation). */
  drawn?: boolean
}

export function Logo({ label, drawn = false }: LogoProps) {
  return (
    <Link className={`uv-logo${drawn ? ' uv-logo--drawn' : ''}`} href="/" aria-label={label}>
      <span>{brand.wordmark}</span>
      <svg className="uv-logo__deg" viewBox="0 0 10 10" aria-hidden="true">
        <circle cx="5" cy="5" r="3.6" pathLength={1} />
      </svg>
    </Link>
  )
}

export function ArrowIcon() {
  return (
    <svg className="uv-arrow" viewBox="0 0 16 12" aria-hidden="true">
      <path d="M1 6.2c4.6-.3 9.2-.2 13.6 0M10 1.5c1.6 1.7 3 3.1 4.6 4.6-1.5 1.5-3 2.9-4.6 4.4" />
    </svg>
  )
}
