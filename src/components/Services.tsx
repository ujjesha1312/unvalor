import { SERVICE_ITEMS, services } from '@/content/services'
import { SectionHead } from './SectionHead'
import { FeatureBento } from './ui/feature-section-with-bento-grid'

interface ServicesProps {
  /** Rendered as its own page: the title becomes the page <h1>. */
  asPage?: boolean
}

export function Services({ asPage = false }: ServicesProps) {
  return (
    <section id="services" className={`uv-root uv-sec${asPage ? ' uv-sec--page' : ''}`} aria-labelledby="services-title">
      <div className="uv-sec__in">
        <SectionHead
          id="services"
          num={services.num}
          label={services.label}
          title={services.heading}
          intro={services.intro}
          asPage={asPage}
        />
        <FeatureBento items={SERVICE_ITEMS} />
      </div>
    </section>
  )
}
