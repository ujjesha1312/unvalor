import type { Metadata } from 'next'
import { Work } from '@/components/Work'
import { NextPage } from '@/components/NextPage'
import { SiteChrome } from '@/components/SiteChrome'
import { PAGE_META } from '@/content/site'

export const metadata: Metadata = {
  title: PAGE_META.work.title,
  description: PAGE_META.work.description,
}

export default function WorkPage() {
  return (
    <SiteChrome>
      <Work asPage />
      {/* Page-only content goes here — it won't appear on the home page. */}
      <NextPage current="work" />
    </SiteChrome>
  )
}
