import Link from 'next/link'
import { PAGE_NEXT, pageNext, type PageSlug } from '@/content/site'
import { ArrowIcon } from './Logo'

interface NextPageProps {
  current: PageSlug
}

/** Closing band on each section page: a large link to the next page. */
export function NextPage({ current }: NextPageProps) {
  const next = PAGE_NEXT[current]
  return (
    <nav className="uv-root uv-next" aria-label={pageNext.label}>
      <Link className="uv-next__link" href={next.href}>
        <span className="uv-label">{pageNext.label}</span>
        <span className="uv-next__title">
          {next.label}
          <ArrowIcon />
        </span>
      </Link>
    </nav>
  )
}
