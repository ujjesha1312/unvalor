'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { a11y } from '@/content/a11y'
import { CONTACT_CONFIG } from '@/content/contact'
import { brand, contactDropdown, NAV_ITEMS, navCta, SCROLL_SPY_SECTIONS, type NavItem } from '@/content/site'
import { useReplayIntro } from './IntroShell'

const dropdownActionBase = `inline-flex items-center gap-[0.4rem] font-brand text-[0.8rem] font-semibold tracking-[0.02em] py-[0.45rem] px-4 rounded-full no-underline cursor-pointer border [transition:all_0.2s_cubic-bezier(0.16,1,0.3,1)] hover:[transform:translateY(-1px)]`
const dropdownActionPrimary = `${dropdownActionBase} text-midnight bg-warm-cream border-warm-cream hover:bg-slate-blue hover:text-warm-cream hover:border-warm-cream`
const dropdownActionSecondary = `${dropdownActionBase} bg-transparent text-warm-cream border-warm-cream/30 hover:bg-slate-blue/50 hover:border-warm-cream hover:text-warm-cream`

export function Navbar() {
  const onReplayIntro = useReplayIntro()
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navListRef = useRef<HTMLUListElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const contactTriggerRef = useRef<HTMLLIElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })

  // Track active section and navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      const scrollPos = window.scrollY + 160

      for (const sectionId of SCROLL_SPY_SECTIONS) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Position understated indicator line on active link
  useEffect(() => {
    let cancelled = false

    const measure = () => {
      const navList = navListRef.current
      if (cancelled || !navList) return

      // If dropdown is open, point indicator to contact item
      const targetHref = contactDropdownOpen ? '#contact' : `#${activeSection}`
      const activeEl = navList.querySelector<HTMLElement>(`[data-nav-href="${targetHref}"]`)

      if (activeEl) {
        const navRect = navList.getBoundingClientRect()
        const linkRect = activeEl.getBoundingClientRect()
        setIndicatorStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
          opacity: 1,
        })
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
      }
    }

    measure()
    // With SSR the first measurement can happen before the web fonts load;
    // re-measure once they're ready so the underline matches the final link width.
    void document.fonts.ready.then(measure)

    return () => {
      cancelled = true
    }
  }, [activeSection, contactDropdownOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as Node
      if (
        contactDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        contactTriggerRef.current &&
        !contactTriggerRef.current.contains(target)
      ) {
        setContactDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [contactDropdownOpen])

  // Close dropdown and mobile menu on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (contactDropdownOpen) setContactDropdownOpen(false)
        if (mobileMenuOpen) setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [contactDropdownOpen, mobileMenuOpen])

  const scrollTo = (href: string) => {
    setContactDropdownOpen(false)
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavClick = (item: NavItem, e: MouseEvent) => {
    e.preventDefault()
    if (item.isDropdown) {
      setContactDropdownOpen((prev) => !prev)
    } else {
      setContactDropdownOpen(false)
      scrollTo(item.href)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 z-100 flex w-full items-center border-b backdrop-blur-[16px] [transition:background-color_0.3s_ease,border-color_0.3s_ease,height_0.3s_ease] mobile:h-16 ${
        scrolled
          ? 'h-[4.15rem] border-slate-blue/75 bg-deep-navy/94 shadow-[0_10px_30px_-10px_rgba(1,7,54,0.8)]'
          : 'h-[4.5rem] border-slate-blue/45 bg-midnight/82'
      }`}
    >
      <div className="relative mx-auto flex w-full max-w-[1240px] items-center justify-between px-8">
        {/* Far Left: Brand Wordmark */}
        <a
          href="#hero"
          className="group inline-flex shrink-0 items-baseline gap-[0.1rem] no-underline"
          onClick={(e) => {
            e.preventDefault()
            setContactDropdownOpen(false)
            scrollTo('#hero')
          }}
          aria-label={a11y.navbar.brand}
        >
          <span className="font-editorial text-[1.4rem] font-bold tracking-[-0.02em] text-warm-cream [transition:opacity_0.2s_ease] group-hover:opacity-85">
            {brand.wordmark}
          </span>
          <span className="font-brand text-[1.15rem] font-bold text-warm-cream">{brand.degree}</span>
        </a>

        {/* Centre: Visually Unified Navigation Links */}
        <nav className="block mobile:hidden" aria-label={a11y.navbar.nav}>
          <ul className="relative m-0 flex list-none items-center gap-8 p-0" ref={navListRef}>
            {NAV_ITEMS.map((item) => {
              const isContact = item.isDropdown
              const isActive = isContact
                ? contactDropdownOpen || activeSection === 'contact'
                : activeSection === item.href.slice(1)

              if (isContact) {
                return (
                  <li key={item.label} className="relative" ref={contactTriggerRef}>
                    {/* `font: inherit` in the original: this toggle inherits the body font size. */}
                    <button
                      type="button"
                      data-nav-href={item.href}
                      className={`inline-flex cursor-pointer items-center gap-[0.35rem] border-none bg-transparent px-[0.2rem] py-2 [font-family:inherit] [font-size:inherit] [font-style:inherit] [line-height:inherit] tracking-[0.02em] no-underline [transition:color_0.25s_ease] hover:text-warm-cream ${
                        isActive || contactDropdownOpen ? 'text-warm-cream' : 'text-warm-cream/72'
                      } ${isActive ? 'font-semibold' : 'font-normal'}`}
                      onClick={(e) => handleNavClick(item, e)}
                      aria-expanded={contactDropdownOpen}
                      aria-haspopup="dialog"
                      aria-controls="navbar-contact-dropdown"
                      id="navbar-contact-btn"
                    >
                      <span>{item.label}</span>
                      <span
                        className={`inline-block text-[0.72rem] leading-none [transition:transform_0.25s_cubic-bezier(0.16,1,0.3,1)] ${
                          contactDropdownOpen ? '[transform:rotate(180deg)] opacity-100' : 'opacity-75'
                        }`}
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </button>
                  </li>
                )
              }

              return (
                <li key={item.label} className="relative">
                  <a
                    href={item.href}
                    data-nav-href={item.href}
                    className={`inline-block px-[0.2rem] py-2 font-brand text-[0.86rem] tracking-[0.02em] no-underline [transition:color_0.25s_ease] hover:text-warm-cream ${
                      isActive ? 'font-semibold text-warm-cream' : 'font-medium text-warm-cream/72'
                    }`}
                    onClick={(e) => handleNavClick(item, e)}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}

            {/* Clean Underline Indicator */}
            <li
              className="navbar-active-line"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
              aria-hidden="true"
            />
          </ul>
        </nav>

        {/* Far Right: Distinct Action Area */}
        <div className="flex shrink-0 items-center gap-[0.85rem]">
          {/* Desktop Prominent CTA */}
          <a
            href="#contact"
            className={`group inline-flex items-center gap-[0.35rem] rounded-full border border-warm-cream bg-warm-cream px-[1.35rem] py-[0.55rem] font-brand text-[0.84rem] font-semibold tracking-[0.03em] text-midnight no-underline [transition:all_0.25s_cubic-bezier(0.16,1,0.3,1)] hover:border-warm-cream hover:bg-slate-blue hover:text-warm-cream hover:[transform:translateY(-1px)] mobile:hidden`}
            onClick={(e) => {
              e.preventDefault()
              setContactDropdownOpen(false)
              scrollTo('#contact')
            }}
          >
            {navCta.desktop}{' '}
            <span
              className="text-[0.95rem] [transition:transform_0.2s_ease] group-hover:[transform:translate(1px,-1px)]"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>

          {/* Mobile Compact CTA */}
          <a
            href="#contact"
            className="hidden rounded-full border border-warm-cream bg-warm-cream px-[0.95rem] py-[0.42rem] font-brand text-[0.78rem] font-semibold tracking-[0.03em] text-midnight no-underline [transition:all_0.2s_ease] hover:border-warm-cream hover:bg-slate-blue hover:text-warm-cream mobile:inline-flex"
            onClick={(e) => {
              e.preventDefault()
              setContactDropdownOpen(false)
              scrollTo('#contact')
            }}
          >
            {navCta.mobile}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="hidden h-[38px] w-[38px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-[8px] border border-slate-blue/60 bg-transparent p-0 [transition:border-color_0.2s_ease] hover:border-warm-cream mobile:flex"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? a11y.navbar.menuClose : a11y.navbar.menuOpen}
            onClick={() => {
              setContactDropdownOpen(false)
              setMobileMenuOpen(!mobileMenuOpen)
            }}
          >
            <span
              className={`h-[1.5px] w-[18px] bg-warm-cream [transition:all_0.3s_cubic-bezier(0.16,1,0.3,1)] ${
                mobileMenuOpen ? '[transform:translateY(3.25px)_rotate(45deg)]' : ''
              }`}
            />
            <span
              className={`h-[1.5px] w-[18px] bg-warm-cream [transition:all_0.3s_cubic-bezier(0.16,1,0.3,1)] ${
                mobileMenuOpen ? '[transform:translateY(-3.25px)_rotate(-45deg)]' : ''
              }`}
            />
          </button>
        </div>

        {/* Floating Contact Dropdown Panel */}
        {contactDropdownOpen && (
          <div
            id="navbar-contact-dropdown"
            ref={dropdownRef}
            className="absolute top-[calc(100%+0.65rem)] right-8 z-1000 w-[min(390px,calc(100vw-2.5rem))] animate-dropdown-entrance rounded-[18px] border border-slate-blue bg-deep-navy p-6 shadow-[0_24px_48px_-12px_rgba(1,7,54,0.82),0_0_0_1px_rgba(252,241,208,0.08)] motion-reduce:animate-none motion-reduce:transition-none mobile:fixed mobile:top-[4.5rem] mobile:right-4 mobile:left-4 mobile:w-auto mobile:max-w-none"
            role="dialog"
            aria-modal="false"
            aria-labelledby="contact-dropdown-heading"
          >
            <div className="mb-[1.15rem] flex items-center justify-between border-b border-slate-blue/60 pb-3">
              <span
                id="contact-dropdown-heading"
                className="font-brand text-[0.68rem] font-bold tracking-[0.18em] text-warm-cream/65 uppercase"
              >
                {contactDropdown.eyebrow}
              </span>
              <button
                type="button"
                className="cursor-pointer rounded-[4px] border-none bg-transparent px-[0.4rem] py-[0.2rem] text-[0.85rem] leading-none text-warm-cream/55 [transition:color_0.2s_ease,background_0.2s_ease] hover:bg-slate-blue/50 hover:text-warm-cream"
                onClick={() => setContactDropdownOpen(false)}
                aria-label={a11y.navbar.dropdownClose}
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-[0.85rem]">
              {/* Option 1: Send an Email */}
              <div className="flex flex-col items-start rounded-[14px] border border-slate-blue/65 bg-midnight/45 p-[1.15rem] [transition:border-color_0.2s_ease,background-color_0.2s_ease] hover:border-warm-cream/35 hover:bg-midnight/60">
                <div className="mb-[0.85rem] text-left">
                  <h4 className="m-0 mb-[0.3rem] font-editorial text-[1.12rem] font-semibold tracking-[-0.01em] text-warm-cream">
                    {contactDropdown.email.title}
                  </h4>
                  <p className="m-0 font-brand text-[0.84rem] leading-[1.5] text-warm-cream/78">
                    {contactDropdown.email.description}
                  </p>
                </div>

                {CONTACT_CONFIG.isVerified ? (
                  <a
                    href={`mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(contactDropdown.email.subject)}`}
                    className={dropdownActionPrimary}
                    onClick={() => setContactDropdownOpen(false)}
                  >
                    {contactDropdown.email.action}{' '}
                    <span className="text-[0.85rem]" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ) : (
                  <div
                    className="inline-flex items-center gap-[0.45rem] rounded-full border border-dashed border-warm-cream/25 bg-slate-blue/45 px-3 py-[0.35rem] font-brand text-[0.72rem] font-medium text-warm-cream/72"
                    title={CONTACT_CONFIG.unverifiedNotice}
                  >
                    <span className="h-1.5 w-1.5 rounded-[50%] bg-warm-cream/70" aria-hidden="true" />
                    <span>{contactDropdown.email.unverifiedTag}</span>
                  </div>
                )}
              </div>

              {/* Option 2: Explore UnValor */}
              <div className="flex flex-col items-start rounded-[14px] border border-slate-blue/65 bg-midnight/45 p-[1.15rem] [transition:border-color_0.2s_ease,background-color_0.2s_ease] hover:border-warm-cream/35 hover:bg-midnight/60">
                <div className="mb-[0.85rem] text-left">
                  <h4 className="m-0 mb-[0.3rem] font-editorial text-[1.12rem] font-semibold tracking-[-0.01em] text-warm-cream">
                    {contactDropdown.explore.title}
                  </h4>
                  <p className="m-0 font-brand text-[0.84rem] leading-[1.5] text-warm-cream/78">
                    {contactDropdown.explore.description}
                  </p>
                </div>

                <button type="button" className={dropdownActionSecondary} onClick={() => scrollTo('#services')}>
                  {contactDropdown.explore.action}{' '}
                  <span className="text-[0.85rem]" aria-hidden="true">
                    ↓
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-[1.15rem] flex items-center justify-between gap-2 border-t border-slate-blue/50 pt-[0.85rem]">
              <span className="font-brand text-[0.68rem] tracking-[0.04em] text-warm-cream/55">
                {CONTACT_CONFIG.statusNote}
              </span>
              <a
                href="#contact"
                className="font-brand text-[0.72rem] font-semibold whitespace-nowrap text-warm-cream no-underline [transition:opacity_0.2s_ease] hover:opacity-80"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#contact')
                }}
              >
                {contactDropdown.footerLink}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-nav-menu"
        className={`fixed top-[4.5rem] left-0 hidden w-full border-b border-slate-blue/65 bg-deep-navy/98 px-8 pt-6 pb-10 backdrop-blur-[20px] [transition:all_0.35s_cubic-bezier(0.16,1,0.3,1)] mobile:flex ${
          mobileMenuOpen ? 'visible [transform:translateY(0)] opacity-100' : 'invisible [transform:translateY(-100%)] opacity-0'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div>
          <ul className="m-0 flex list-none flex-col gap-5 p-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`block font-editorial text-[1.45rem] font-semibold no-underline [transition:color_0.2s_ease] hover:text-warm-cream ${
                    activeSection === item.href.slice(1) ? 'text-warm-cream' : 'text-warm-cream/75'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(item.href)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="mt-2 block font-editorial text-[1.45rem] font-semibold text-warm-cream no-underline [transition:color_0.2s_ease] hover:text-warm-cream"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#contact')
                }}
              >
                {navCta.drawer}
              </a>
            </li>
          </ul>

          <div className="mt-8 border-t border-border-subtle pt-5">
            <button
              type="button"
              className="cursor-pointer border-none bg-transparent p-0 font-brand text-[0.8rem] tracking-[0.12em] text-warm-cream/75 uppercase [transition:color_0.2s_ease] hover:text-warm-cream"
              onClick={() => {
                setMobileMenuOpen(false)
                onReplayIntro()
              }}
            >
              {navCta.drawerReplay}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
