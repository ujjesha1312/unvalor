'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { a11y } from '@/content/a11y'
import { NAV_ITEMS, nav, ROUTES } from '@/content/site'
import { ArrowIcon, Logo } from './Logo'
import { MagneticCta } from './MagneticCta'

const DRAWER_ID = 'uv-drawer'

/** Move the ° indicator to the end of a link (or hide it). */
function placeIndicator(ind: HTMLElement | null, links: HTMLElement | null, href: string | null) {
  if (!ind) return
  const a = href ? links?.querySelector<HTMLAnchorElement>(`a[href="${href}"]`) : null
  if (!a) {
    ind.classList.remove('is-on')
    return
  }
  ind.style.setProperty('--x', `${a.offsetLeft + a.offsetWidth - 12}px`)
  ind.classList.add('is-on')
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  // The link for the page we're on (or a page nested under it).
  const activeHref = NAV_ITEMS.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))?.href ?? null

  const linksRef = useRef<HTMLElement>(null)
  const indRef = useRef<HTMLSpanElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)

  const place = (href: string | null) => placeIndicator(indRef.current, linksRef.current, href)

  // Condensed capsule after a little scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Park the ° indicator on the current page's link (after layout, and again on route change).
  useEffect(() => {
    placeIndicator(indRef.current, linksRef.current, activeHref)
  }, [activeHref])

  // Drawer: lock page scroll, move focus in/out, close on Escape.
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden'
      drawerRef.current?.querySelector<HTMLElement>('a, button')?.focus()
      wasOpenRef.current = true
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }
      document.addEventListener('keydown', onKey)
      return () => {
        document.removeEventListener('keydown', onKey)
        document.documentElement.style.overflow = ''
      }
    }
    if (wasOpenRef.current) {
      wasOpenRef.current = false
      menuBtnRef.current?.focus()
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`uv-root uv-nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="uv-nav__bar">
          <Logo label={a11y.navbar.brand} />

          <nav ref={linksRef} className="uv-nav__links" aria-label={a11y.navbar.nav}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={activeHref === item.href ? 'is-active' : undefined}
                aria-current={activeHref === item.href ? 'page' : undefined}
                onMouseEnter={() => place(item.href)}
                onFocus={() => place(item.href)}
                onMouseLeave={() => place(activeHref)}
                onBlur={() => place(activeHref)}
              >
                {item.label}
              </Link>
            ))}
            <span ref={indRef} className="uv-nav__ind" aria-hidden="true" />
          </nav>

          <div className="uv-nav__actions">
            <Link className="uv-link" href={ROUTES.contact}>
              {nav.talk} <ArrowIcon />
            </Link>
            <MagneticCta href={ROUTES.contact} label={nav.book} hoverLabel={nav.bookHover} small />
          </div>

          <button
            ref={menuBtnRef}
            type="button"
            className="uv-nav__menu"
            aria-expanded={open}
            aria-controls={DRAWER_ID}
            onClick={() => setOpen(true)}
          >
            {nav.menu} <i aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        ref={drawerRef}
        id={DRAWER_ID}
        className={`uv-root uv-drawer${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={a11y.navbar.drawer}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="uv-drawer__top">
          <Logo label={a11y.navbar.brand} drawn />
          <button type="button" className="uv-nav__menu uv-nav__menu--close" onClick={close}>
            {nav.close} <i aria-hidden="true" />
          </button>
        </div>
        <ul className="uv-drawer__list">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.href}>
              <Link href={item.href} onClick={close} aria-current={activeHref === item.href ? 'page' : undefined}>
                <small>({String(i + 1).padStart(2, '0')})</small>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="uv-drawer__foot">
          <p className="uv-label">
            <span className="uv-label__num">°</span> {nav.drawerNote}
          </p>
          <Link className="uv-btn uv-btn--primary" href={ROUTES.contact} onClick={close}>
            {nav.drawerBook}
          </Link>
          <Link className="uv-btn uv-btn--secondary" href={ROUTES.contact} onClick={close}>
            <span className="uv-btn__dot" aria-hidden="true" />
            {nav.drawerTalk}
          </Link>
        </div>
      </div>
    </>
  )
}
