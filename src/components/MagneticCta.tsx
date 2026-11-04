'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

interface MagneticCtaProps {
  href: string
  label: string
  /** Text that slides in on hover (decorative; the accessible name stays `label`). */
  hoverLabel: string
  small?: boolean
}

/** Primary cream pill with a gentle magnetic pull and a text swap on hover. */
export function MagneticCta({ href, label, hoverLabel, small = false }: MagneticCtaProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const inner = innerRef.current
    if (!el) return
    try {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(hover: none)').matches) return
    } catch {
      return
    }

    const k = 0.28
    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect()
      const dx = e.clientX - (b.left + b.width / 2)
      const dy = e.clientY - (b.top + b.height / 2)
      const mx = Math.max(-10, Math.min(10, dx * k))
      const my = Math.max(-8, Math.min(8, dy * k * 1.2))
      el.style.transform = `translate(${mx}px,${my}px)`
      if (inner) inner.style.transform = `translate(${mx * 0.35}px,${my * 0.35}px)`
    }
    const onLeave = () => {
      el.style.transform = ''
      if (inner) inner.style.transform = ''
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <Link ref={ref} className={`uv-btn uv-btn--primary${small ? ' uv-btn--sm' : ''}`} href={href}>
      <span ref={innerRef} className="uv-magnetic__inner">
        <span className="uv-swap">
          <span>{label}</span>
          <span aria-hidden="true">{hoverLabel}</span>
        </span>
      </span>
    </Link>
  )
}
