import type { Metadata } from 'next'
import { About } from '@/components/About'
import { NextPage } from '@/components/NextPage'
import { SiteChrome } from '@/components/SiteChrome'
import { PAGE_META } from '@/content/site'

export const metadata: Metadata = {
  title: PAGE_META.about.title,
  description: PAGE_META.about.description,
}

export default function AboutPage() {
  return (
    <SiteChrome>
      <About asPage />
      {/* Page-only content goes here — it won't appear on the home page. */}
      <NextPage current="about" />
    </SiteChrome>
  )
}
