'use client'

import type { ReactNode } from 'react'
import { useReplayIntro } from './IntroShell'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/** Footer wordmark: a #hero link that smooth-scrolls to the top. */
export function FooterBrandLink({ className, children }: { className: string; children: ReactNode }) {
  return (
    <a
      href="#hero"
      className={className}
      onClick={(e) => {
        e.preventDefault()
        scrollToTop()
      }}
    >
      {children}
    </a>
  )
}

export function BackToTopButton({ className, children }: { className: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={scrollToTop}>
      {children}
    </button>
  )
}

export function ReplayIntroButton({
  className,
  title,
  children,
}: {
  className: string
  title: string
  children: ReactNode
}) {
  const onReplayIntro = useReplayIntro()
  return (
    <button type="button" className={className} onClick={onReplayIntro} title={title}>
      {children}
    </button>
  )
}
