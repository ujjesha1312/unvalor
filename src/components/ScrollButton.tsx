'use client'

import type { ReactNode } from 'react'

interface ScrollButtonProps {
  /** Element ids to try in order; scrolls smoothly to the first one present. */
  targets: readonly string[]
  className?: string
  children: ReactNode
}

/** A <button> that smooth-scrolls to an in-page section (keeps Hero/Footer server-rendered). */
export function ScrollButton({ targets, className, children }: ScrollButtonProps) {
  const handleClick = () => {
    for (const id of targets) {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  )
}
