'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { a11y } from '@/content/a11y'
import { FILM_CHAPTERS, ORBIT_TAGS, hero } from '@/content/hero'

/** Length of the (simulated) film in seconds. */
const FILM_SECONDS = 60

const prefersReducedMotion = () => {
  try {
    return matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

const formatTime = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`

/**
 * The film frame and the ° orbit around it.
 * Film: poster → hover → playing (simulated until the real film exists); the current chapter's word fills in cream.
 * Orbit: a ring in perspective around the frame. Tags ride it once a minute — in front of the frame on the
 * lower half, behind it on the upper half. Both are driven imperatively (rAF), not through React state.
 */
export function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<SVGSVGElement>(null)
  const frontRef = useRef<SVGSVGElement>(null)
  const tagsRef = useRef<HTMLUListElement>(null)

  // ---- Film ----
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const chapters = Array.from(el.querySelectorAll<HTMLButtonElement>('.uv-chapter'))
    const time = el.querySelector<HTMLElement>('.uv-video__time')
    const btn = el.querySelector<HTMLButtonElement>('.uv-video__play')
    let t0 = 0
    let pos = 0
    let playing = false
    let raf = 0

    const render = (p: number) => {
      const sec = p * FILM_SECONDS
      let cur = -1
      chapters.forEach((c, i) => {
        const a = (i * FILM_SECONDS) / 3
        const b = ((i + 1) * FILM_SECONDS) / 3
        c.style.setProperty('--p', Math.max(0, Math.min(1, (sec - a) / (b - a))).toFixed(3))
        const on = sec >= a && sec < b && p > 0
        c.classList.toggle('is-current', on)
        if (on) cur = i
      })
      if (cur > -1 && playing) el.setAttribute('data-ch', String(cur))
      else el.removeAttribute('data-ch')
      if (time) time.textContent = `${formatTime(sec)} / ${hero.filmDuration}`
    }
    const label = () => btn?.setAttribute('aria-label', playing ? a11y.hero.pauseFilm : a11y.hero.playFilm)
    const tick = (now: number) => {
      pos = Math.min(1, (now - t0) / (FILM_SECONDS * 1000))
      render(pos)
      if (pos >= 1) stop(true)
      else if (playing) raf = requestAnimationFrame(tick)
    }
    const play = () => {
      playing = true
      el.classList.add('is-playing')
      t0 = performance.now() - pos * FILM_SECONDS * 1000
      raf = requestAnimationFrame(tick)
      label()
    }
    function stop(end: boolean) {
      playing = false
      cancelAnimationFrame(raf)
      if (end) {
        el?.classList.remove('is-playing')
        pos = 0
        render(0)
      }
      label()
    }
    const onClick = (e: MouseEvent) => {
      const ch = (e.target as Element | null)?.closest<HTMLButtonElement>('.uv-chapter')
      if (ch) {
        pos = chapters.indexOf(ch) / 3 + 0.001
        if (!playing) play()
        else t0 = performance.now() - pos * FILM_SECONDS * 1000
        render(pos)
        return
      }
      if (playing) stop(false)
      else play()
    }

    el.addEventListener('click', onClick)
    render(0)
    return () => {
      el.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
    }
  }, [])

  // ---- Orbit ----
  useEffect(() => {
    const stage = stageRef.current
    const frame = frameRef.current
    const back = backRef.current
    const front = frontRef.current
    const tagList = tagsRef.current
    const bp = back?.querySelector('path')
    const fp = front?.querySelector('path')
    if (!stage || !frame || !back || !front || !tagList || !bp || !fp) return

    const reduce = prefersReducedMotion()
    const tags = Array.from(tagList.querySelectorAll<HTMLElement>('.uv-tag'))
    const g = { cx: 0, cy: 0, rx: 0, ry: 0, vis: [] as HTMLElement[] }
    let phase = 0.35
    let speed = 1
    let last = 0
    let hover = false
    let raf = 0

    const place = () => {
      const n = g.vis.length
      g.vis.forEach((t, i) => {
        const a = phase + (i / n) * Math.PI * 2
        const s = Math.sin(a)
        const x = g.cx + g.rx * Math.cos(a)
        const y = g.cy + g.ry * s
        const k = 0.9 + 0.1 * s
        t.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translate(-50%,-50%) scale(${k.toFixed(3)})`
        t.style.zIndex = s > 0 ? '4' : '1'
        t.classList.toggle('is-back', s <= 0)
      })
    }

    const layout = () => {
      const sr = stage.getBoundingClientRect()
      const vr = frame.getBoundingClientRect()
      const mob = sr.width < 700
      g.cx = vr.left - sr.left + vr.width / 2
      g.cy = vr.top - sr.top + vr.height * (mob ? 0.5 : 0.58)
      g.rx = vr.width * (mob ? 0.4 : 0.6)
      // keep every tag a safe distance inside the viewport (48px desktop, 16px mobile)
      g.vis = tags.filter((t) => t.offsetParent !== null)
      const half = g.vis.reduce((m, t) => Math.max(m, t.offsetWidth / 2), 0)
      const vw = document.documentElement.clientWidth
      const cxAbs = sr.left + g.cx
      const safe = mob ? 16 : 48
      g.rx = Math.max(40, Math.min(g.rx, Math.min(cxAbs, vw - cxAbs) - safe - half))
      g.ry = vr.height * (mob ? 1.02 : 0.46)
      for (const s of [back, front]) {
        s.setAttribute('width', String(sr.width))
        s.setAttribute('height', String(sr.height))
        s.setAttribute('viewBox', `0 0 ${sr.width} ${sr.height}`)
      }
      const L = g.cx - g.rx
      const R = g.cx + g.rx
      bp.setAttribute('d', `M${L} ${g.cy}A${g.rx} ${g.ry} 0 1 1 ${R} ${g.cy}A${g.rx} ${g.ry} 0 1 1 ${L} ${g.cy}`)
      fp.setAttribute('d', `M${R} ${g.cy}A${g.rx} ${g.ry} 0 0 1 ${L} ${g.cy}`)
      place()
    }

    const loop = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16
      last = now
      speed += ((hover ? 0.25 : 1) - speed) * 0.06
      phase += (dt / 60000) * Math.PI * 2 * speed
      place()
      raf = requestAnimationFrame(loop)
    }

    let lastY = window.scrollY
    const onScroll = () => {
      phase += (window.scrollY - lastY) * 0.0025
      lastY = window.scrollY
    }
    const onEnter = () => {
      hover = true
    }
    const onLeave = () => {
      hover = false
    }

    layout()
    const ro = new ResizeObserver(layout)
    ro.observe(stage)
    window.addEventListener('resize', layout)
    stage.addEventListener('pointerenter', onEnter)
    stage.addEventListener('pointerleave', onLeave)

    const draws: Animation[] = []
    if (!reduce) {
      ;[bp, fp].forEach((p, i) => {
        p.style.strokeDasharray = '1'
        p.style.strokeDashoffset = '1'
        draws.push(
          p.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
            duration: 1800,
            delay: 500 + i * 120,
            easing: 'cubic-bezier(0.65,0,0.35,1)',
            fill: 'forwards',
          }),
        )
      })
      raf = requestAnimationFrame(loop)
      window.addEventListener('scroll', onScroll, { passive: true })
    }
    const liveTimer = window.setTimeout(() => stage.classList.add('is-live'), reduce ? 0 : 900)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(liveTimer)
      ro.disconnect()
      window.removeEventListener('resize', layout)
      window.removeEventListener('scroll', onScroll)
      stage.removeEventListener('pointerenter', onEnter)
      stage.removeEventListener('pointerleave', onLeave)
      draws.forEach((d) => d.cancel())
    }
  }, [])

  return (
    <div ref={stageRef} className="uv-hero__stage uv-orbit-stage">
      <svg ref={backRef} className="uv-orbit uv-orbit--back" aria-hidden="true">
        <path pathLength={1} />
      </svg>

      <div className="uv-crop uv-in" style={{ '--i': 5 } as CSSProperties}>
        <span className="uv-crop__m uv-crop__m--tl" />
        <span className="uv-crop__m uv-crop__m--tr" />
        <span className="uv-crop__m uv-crop__m--bl" />
        <span className="uv-crop__m uv-crop__m--br" />

        <div ref={frameRef} className="uv-video">
          <span className="uv-video__time uv-micro" aria-hidden="true">
            0:00 / {hero.filmDuration}
          </span>

          {/* Still frame: drop real footage in as <img className="uv-still__img"> and add .has-img to the figure. */}
          <figure className="uv-still">
            <div className="uv-still__slot" aria-hidden="true">
              <span className="uv-still__third uv-still__third--v1" />
              <span className="uv-still__third uv-still__third--v2" />
              <span className="uv-still__third uv-still__third--h1" />
              <span className="uv-still__third uv-still__third--h2" />
              <div className="uv-still__subject" />
            </div>
            <div className="uv-still__scrim" aria-hidden="true" />
          </figure>

          <div className="uv-poster">
            {FILM_CHAPTERS.map((c, i) => (
              <span key={c.word} className={`uv-poster__w uv-poster__w--${i + 1}`}>
                <small>{c.num}</small>
                {c.word}
                {i < FILM_CHAPTERS.length - 1 ? '.' : null}
                {i === FILM_CHAPTERS.length - 1 && (
                  <button type="button" className="uv-video__play" aria-label={a11y.hero.playFilm}>
                    <svg viewBox="0 0 120 120" aria-hidden="true">
                      <circle className="orbit" cx="60" cy="60" r="72" />
                      <circle className="ring" cx="60" cy="60" r="59" />
                      <path className="glyph play" d="M50 42 78 60 50 78z" />
                      <path className="glyph pause" d="M50 44v32M70 44v32" />
                    </svg>
                    <span className="uv-video__hint uv-micro">{hero.filmHint}</span>
                  </button>
                )}
              </span>
            ))}
          </div>

          <div className="uv-video__chapters uv-micro">
            {FILM_CHAPTERS.map((c) => (
              <button key={c.word} type="button" className="uv-chapter">
                <span>
                  {c.num} {c.word}
                </span>
                <span className="t">{c.time}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <svg ref={frontRef} className="uv-orbit uv-orbit--front" aria-hidden="true">
        <path pathLength={1} />
      </svg>

      <ul ref={tagsRef} className="uv-orbit__tags" aria-label={a11y.hero.orbitTags}>
        {ORBIT_TAGS.map((t) => (
          <li key={t.label} className={`uv-tag${t.cream ? ' uv-tag--cream' : ''}`}>
            <i aria-hidden="true" />
            {t.label}
            <small>{t.meta}</small>
          </li>
        ))}
      </ul>

      <p className="uv-video__caption uv-label uv-in" style={{ '--i': 6 } as CSSProperties}>
        {hero.caption}
      </p>
    </div>
  )
}
