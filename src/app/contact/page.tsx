import type { Metadata } from 'next'
import { Contact } from '@/components/Contact'
import { NextPage } from '@/components/NextPage'
import { SiteChrome } from '@/components/SiteChrome'
import { PAGE_META } from '@/content/site'

export const metadata: Metadata = {
  title: PAGE_META.contact.title,
  description: PAGE_META.contact.description,
}

export default function ContactPage() {
  return (
    <SiteChrome>
      <Contact asPage />
      {/* Page-only content goes here — it won't appear on the home page. */}
      <NextPage current="contact" />
    </SiteChrome>
  )
}
