import { useState, useCallback } from 'react'
import { BrandIntro } from './components/BrandIntro'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Check if reduced motion is requested
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return false

      // Check if intro has already played in this browser session
      const seen = sessionStorage.getItem('unvalor_intro_seen')
      return seen !== 'true'
    }
    return true
  })

  // Handle completion of intro animation
  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
    sessionStorage.setItem('unvalor_intro_seen', 'true')
  }, [])

  // Manual replay trigger (from Navbar or Footer)
  const handleReplayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    setShowIntro(true)
  }, [])

  return (
    <div className="unvalor-app">
      {/* Brand Reveal Intro (Overlay or Standalone) */}
      {showIntro && (
        <BrandIntro
          onComplete={handleIntroComplete}
        />
      )}

      {/* Main Homepage Experience */}
      <div className={`homepage-wrapper ${showIntro ? 'homepage-hidden' : 'homepage-visible'}`}>
        <Navbar onReplayIntro={handleReplayIntro} />

        <main id="main-content">
          <Hero />
          <Services />
          <About />
          <Contact />
        </main>

        <Footer onReplayIntro={handleReplayIntro} />
      </div>
    </div>
  )
}

export default App
