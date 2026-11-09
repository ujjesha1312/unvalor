import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { IntroShell } from '@/components/IntroShell'
import { Navbar } from '@/components/Navbar'
import { Services } from '@/components/Services'

export default function HomePage() {
  return (
    <IntroShell>
      <Navbar />

      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>

      <Footer />
    </IntroShell>
  )
}
