'use client'

import { createContext, useCallback, useContext, useState, useSyncExternalStore, type ReactNode } from 'react'
import { INTRO_SEEN_KEY, readShouldShowIntro } from '@/lib/intro-gate'
import { BrandIntro } from './BrandIntro'

const noopSubscribe = () => () => {}

const ReplayIntroContext = createContext<() => void>(() => {})

/** Replays the brand intro from anywhere below <IntroShell>. */
export function useReplayIntro(): () => void {
  return useContext(ReplayIntroContext)
}

export function IntroShell({ children }: { children: ReactNode }) {
  // Server and hydration render assume the intro shows; the client snapshot then
  // applies the real per-session decision without a hydration mismatch.
  const initialShowIntro = useSyncExternalStore(noopSubscribe, readShouldShowIntro, () => true)
  const [override, setOverride] = useState<boolean | null>(null)
  const showIntro = override ?? initialShowIntro

  // Handle completion of intro animation
  const handleIntroComplete = useCallback(() => {
    setOverride(false)
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, 'true')
    } catch {
      // storage unavailable (private mode); intro may replay next load
    }
  }, [])

  // Manual replay trigger (from Navbar or Footer)
  const handleReplayIntro = useCallback(() => {
    // Lift the pre-paint gate so the intro can render again.
    delete document.documentElement.dataset.intro
    window.scrollTo({ top: 0, behavior: 'instant' })
    setOverride(true)
  }, [])

  return (
    <ReplayIntroContext.Provider value={handleReplayIntro}>
      <div className="relative min-h-screen w-full bg-midnight">
        {/* Brand Reveal Intro (Overlay) */}
        {showIntro && <BrandIntro onComplete={handleIntroComplete} />}

        {/* Main Homepage Experience */}
        <div
          className={`homepage-wrapper flex min-h-screen w-full flex-col [transition:opacity_0.8s_cubic-bezier(0.16,1,0.3,1),transform_0.8s_cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            showIntro ? 'pointer-events-none invisible opacity-0' : 'pointer-events-auto visible opacity-100'
          }`}
        >
          {children}
        </div>
      </div>
    </ReplayIntroContext.Provider>
  )
}
