import type { Metadata } from 'next'
import { Services } from '@/components/Services'
import { NextPage } from '@/components/NextPage'
import { SiteChrome } from '@/components/SiteChrome'
import { PAGE_META } from '@/content/site'

export const metadata: Metadata = {
  title: PAGE_META.services.title,
  description: PAGE_META.services.description,
}

export default function ServicesPage() {
  return (
    <SiteChrome>
      <Services asPage />
      {/* Page-only content goes here — it won't appear on the home page. */}
      <NextPage current="services" />
    </SiteChrome>
  )
}
