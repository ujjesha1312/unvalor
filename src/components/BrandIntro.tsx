'use client'

import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { a11y } from '@/content/a11y'
import { intro } from '@/content/intro'
import { useHydrated } from '@/lib/use-hydrated'

interface LetterGlyph {
  char: string
  d: string
  length: number
  delay: string
}

const LETTERS: LetterGlyph[] = [
  {
    char: 'U',
    d: 'M110.32 141.68L110.32 141.68Q100 141.68 92.62 137.90Q85.24 134.12 81.34 127.10Q77.44 120.08 77.44 110.48L77.44 110.48L77.44 56L93.28 56L93.28 110.96Q93.28 118.64 97.66 123.08Q102.04 127.52 110.32 127.52L110.32 127.52Q118.60 127.52 122.98 123.08Q127.36 118.64 127.36 110.96L127.36 110.96L127.36 56L143.20 56L143.20 110.48Q143.20 120.08 139.30 127.10Q135.40 134.12 128.02 137.90Q120.64 141.68 110.32 141.68Z',
    length: 370,
    delay: '0.2s',
  },
  {
    char: 'n',
    d: 'M182.16 140L167.04 140L167.04 80.48L181.92 80.48L181.92 88.28L184.08 88.28Q185.52 85.16 189.48 82.34Q193.44 79.52 201.48 79.52L201.48 79.52Q208.44 79.52 213.66 82.70Q218.88 85.88 221.76 91.46Q224.64 97.04 224.64 104.48L224.64 104.48L224.64 140L209.52 140L209.52 105.68Q209.52 98.96 206.22 95.60Q202.92 92.24 196.80 92.24L196.80 92.24Q189.84 92.24 186 96.86Q182.16 101.48 182.16 109.76L182.16 109.76L182.16 140Z',
    length: 320,
    delay: '0.42s',
  },
  {
    char: 'V',
    d: 'M291.20 140L264.08 140L242.72 56L259.04 56L276.80 129.80L278.48 129.80L296.24 56L312.56 56L291.20 140Z',
    length: 330,
    delay: '0.64s',
  },
  {
    char: 'a',
    d: 'M349.60 141.68L349.60 141.68Q343.24 141.68 338.20 139.46Q333.16 137.24 330.22 132.98Q327.28 128.72 327.28 122.60L327.28 122.60Q327.28 116.48 330.22 112.34Q333.16 108.20 338.38 106.10Q343.60 104 350.32 104L350.32 104L366.64 104L366.64 100.64Q366.64 96.44 364 93.74Q361.36 91.04 355.60 91.04L355.60 91.04Q349.96 91.04 347.20 93.62Q344.44 96.20 343.60 100.28L343.60 100.28L329.68 95.60Q331.12 91.04 334.30 87.26Q337.48 83.48 342.82 81.14Q348.16 78.80 355.84 78.80L355.84 78.80Q367.60 78.80 374.44 84.68Q381.28 90.56 381.28 101.72L381.28 101.72L381.28 123.92Q381.28 127.52 384.64 127.52L384.64 127.52L389.44 127.52L389.44 140L379.36 140Q374.92 140 372.04 137.84Q369.16 135.68 369.16 132.08L369.16 132.08L369.16 131.96L366.88 131.96Q366.40 133.40 364.72 135.74Q363.04 138.08 359.44 139.88Q355.84 141.68 349.60 141.68ZM352.24 129.44L352.24 129.44Q358.60 129.44 362.62 125.90Q366.64 122.36 366.64 116.48L366.64 116.48L366.64 115.28L351.40 115.28Q347.20 115.28 344.80 117.08Q342.40 118.88 342.40 122.12L342.40 122.12Q342.40 125.36 344.92 127.40Q347.44 129.44 352.24 129.44Z',
    length: 420,
    delay: '0.86s',
  },
  {
    char: 'l',
    d: 'M423.60 140L408.48 140L408.48 56L423.60 56L423.60 140Z',
    length: 190,
    delay: '1.08s',
  },
  {
    char: 'o',
    d: 'M476.72 141.68L476.72 141.68Q467.84 141.68 460.76 138.08Q453.68 134.48 449.60 127.64Q445.52 120.80 445.52 111.20L445.52 111.20L445.52 109.28Q445.52 99.68 449.60 92.84Q453.68 86 460.76 82.40Q467.84 78.80 476.72 78.80L476.72 78.80Q485.60 78.80 492.68 82.40Q499.76 86 503.84 92.84Q507.92 99.68 507.92 109.28L507.92 109.28L507.92 111.20Q507.92 120.80 503.84 127.64Q499.76 134.48 492.68 138.08Q485.60 141.68 476.72 141.68ZM476.72 128.24L476.72 128.24Q483.68 128.24 488.24 123.74Q492.80 119.24 492.80 110.84L492.80 110.84L492.80 109.64Q492.80 101.24 488.30 96.74Q483.80 92.24 476.72 92.24L476.72 92.24Q469.76 92.24 465.20 96.74Q460.64 101.24 460.64 109.64L460.64 109.64L460.64 110.84Q460.64 119.24 465.20 123.74Q469.76 128.24 476.72 128.24Z',
    length: 330,
    delay: '1.25s',
  },
  {
    char: 'r',
    d: 'M544.96 140L529.84 140L529.84 80.48L544.72 80.48L544.72 87.20L546.88 87.20Q548.20 83.60 551.26 81.92Q554.32 80.24 558.40 80.24L558.40 80.24L565.60 80.24L565.60 93.68L558.16 93.68Q552.40 93.68 548.68 96.74Q544.96 99.80 544.96 106.16L544.96 106.16L544.96 140Z',
    length: 200,
    delay: '1.45s',
  },
]

interface BrandIntroProps {
  onComplete: () => void
}

export function BrandIntro({ onComplete }: BrandIntroProps) {
  const [animationKey, setAnimationKey] = useState(0)
  const [isHeld, setIsHeld] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  // The animated stage mounts only after hydration so the CSS animation and the
  // JS hold/finish timers below start together (as they did in the client-only app).
  const hydrated = useHydrated()

  // Handle completion trigger
  const handleTransitionComplete = useCallback(() => {
    setIsFadingOut(true)
    setTimeout(() => {
      onComplete()
    }, 850)
  }, [onComplete])

  // Sequence: Reveal completes ~3.7s -> Hold 4s -> Transition at ~7.7s
  useEffect(() => {
    const holdTimer = setTimeout(() => {
      setIsHeld(true)
    }, 3700)

    const finishTimer = setTimeout(() => {
      handleTransitionComplete()
    }, 7700)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(finishTimer)
    }
  }, [animationKey, handleTransitionComplete])

  const replay = useCallback(() => {
    setIsHeld(false)
    setIsFadingOut(false)
    setAnimationKey((prev) => prev + 1)
  }, [])

  // Keyboard shortcut: Space or R to replay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'r' || e.key === 'R') {
        replay()
      } else if (e.key === 'Escape') {
        handleTransitionComplete()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [replay, handleTransitionComplete])

  return (
    <div
      className={`brand-reveal-wrapper ${isFadingOut ? 'fade-out' : ''}`}
      role="region"
      aria-label={a11y.intro.wrapper}
    >
      <div className="brand-backdrop" aria-hidden="true" />

      {/* Skip button for quick access during testing or browsing */}
      <button
        type="button"
        className="intro-skip-btn"
        onClick={handleTransitionComplete}
        aria-label={a11y.intro.skip}
      >
        {intro.skip}
      </button>

      {hydrated && (
        <>
          <div key={animationKey} className="brand-stage">
            {/* Animated Brand Wordmark: UnValor° */}
            <svg
              className="brand-svg"
              viewBox="59 39 540 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label={a11y.intro.wordmark}
            >
              <g id="unvalor-letterforms">
                {LETTERS.map((letter) => (
                  <path
                    key={letter.char}
                    d={letter.d}
                    className="letter-outline"
                    style={
                      {
                        '--stroke-len': letter.length,
                        '--delay': letter.delay,
                      } as CSSProperties
                    }
                  />
                ))}
              </g>

              {/* Distinctive Warm Cream Accent: Degree Symbol ° */}
              <circle className="degree-symbol" cx="575" cy="64" r="6" aria-hidden="true" />
            </svg>

            {/* Subtitle / Signature */}
            <div className="signature-block">
              <p className="signature-text">{intro.signature}</p>
            </div>
          </div>

          {/* Review & Replay Controls */}
          <footer className="controls-dock" aria-label={a11y.intro.controls}>
            <button type="button" className="replay-button" onClick={replay} title={a11y.intro.replayTitle}>
              <svg className="replay-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
              </svg>
              {intro.replay}
            </button>
            {isHeld && <span className="hold-indicator">{intro.holdIndicator}</span>}
          </footer>
        </>
      )}
    </div>
  )
}
