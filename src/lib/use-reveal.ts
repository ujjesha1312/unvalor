import { useEffect, useRef } from 'react'

/**
 * Adds `is-armed` (hidden) to the element once it mounts below the fold, then `is-in` when it
 * scrolls into view. Content is visible without JS and when already on screen, so nothing flashes.
 * CSS for `.uv-reveal` lives in sections.css; reduced motion skips it entirely.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    try {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    } catch {
      return
    }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return

    el.classList.add('is-armed')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        el.classList.add('is-in')
        io.disconnect()
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
