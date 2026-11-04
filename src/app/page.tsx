import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Hero } from '@/components/Hero'
import { IntroShell } from '@/components/IntroShell'
import { Services } from '@/components/Services'
import { SiteChrome } from '@/components/SiteChrome'
import { Work } from '@/components/Work'

/** Home: the brand intro, then every section in one scroll. Each section also has its own page. */
export default function HomePage() {
  return (
    <IntroShell>
      <SiteChrome>
        <Hero />
        <Services />
        <Work />
        <About />
        <Contact />
      </SiteChrome>
    </IntroShell>
  )
}
