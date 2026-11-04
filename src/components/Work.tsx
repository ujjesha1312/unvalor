import { WORK_ITEMS, work } from '@/content/work'
import { SectionHead } from './SectionHead'
import { BentoGallery } from './ui/bento-gallery'

interface WorkProps {
  /** Rendered as its own page: the title becomes the page <h1>. */
  asPage?: boolean
}

export function Work({ asPage = false }: WorkProps) {
  return (
    <section id="work" className={`uv-root uv-sec uv-sec--work${asPage ? ' uv-sec--page' : ''}`} aria-labelledby="work-title">
      <div className="uv-sec__in">
        <SectionHead
          id="work"
          num={work.num}
          label={work.label}
          title={work.heading}
          intro={work.intro}
          aside={<p className="uv-label">{work.hint}</p>}
          asPage={asPage}
        />
      </div>
      <BentoGallery items={WORK_ITEMS} status={work.status} />
    </section>
  )
}
