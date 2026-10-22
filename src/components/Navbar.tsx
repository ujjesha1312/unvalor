import { useState, useEffect, useRef } from 'react'
import { CONTACT_CONFIG } from '../config/contact'

interface NavbarProps {
  onReplayIntro?: () => void
}

interface NavItem {
  label: string
  href: string
  isDropdown?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact', isDropdown: true },
]

export function Navbar({ onReplayIntro }: NavbarProps) {
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

      const sections = ['hero', 'services', 'approach', 'about', 'contact']
      const scrollPos = window.scrollY + 160

      for (const sectionId of sections) {
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
    if (!navListRef.current) return

    // If dropdown is open, point indicator to contact item
    const targetHref = contactDropdownOpen ? '#contact' : `#${activeSection}`
    const activeEl = navListRef.current.querySelector<HTMLElement>(
      `[data-nav-href="${targetHref}"]`
    )

    if (activeEl) {
      const navRect = navListRef.current.getBoundingClientRect()
      const linkRect = activeEl.getBoundingClientRect()
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      })
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
    }
  }, [activeSection, contactDropdownOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault()
    if (item.isDropdown) {
      setContactDropdownOpen((prev) => !prev)
    } else {
      setContactDropdownOpen(false)
      scrollTo(item.href)
    }
  }

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Far Left: Brand Wordmark */}
        <a
          href="#hero"
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault()
            setContactDropdownOpen(false)
            scrollTo('#hero')
          }}
          aria-label="UnValor home"
        >
          <span className="brand-text">UnValor</span>
          <span className="brand-degree">°</span>
        </a>

        {/* Centre: Visually Unified Navigation Links */}
        <nav className="navbar-desktop-nav" aria-label="Main Navigation">
          <ul className="navbar-links" ref={navListRef}>
            {NAV_ITEMS.map((item) => {
              const isContact = item.isDropdown
              const isActive = isContact
                ? contactDropdownOpen || activeSection === 'contact'
                : activeSection === item.href.slice(1)

              if (isContact) {
                return (
                  <li
                    key={item.label}
                    className="navbar-item navbar-item-dropdown"
                    ref={contactTriggerRef}
                  >
                    <button
                      type="button"
                      data-nav-href={item.href}
                      className={`navbar-link navbar-dropdown-toggle ${
                        isActive ? 'is-active' : ''
                      } ${contactDropdownOpen ? 'is-dropdown-open' : ''}`}
                      onClick={(e) => handleNavClick(item, e)}
                      aria-expanded={contactDropdownOpen}
                      aria-haspopup="dialog"
                      aria-controls="navbar-contact-dropdown"
                      id="navbar-contact-btn"
                    >
                      <span>{item.label}</span>
                      <span
                        className={`dropdown-chevron-icon ${
                          contactDropdownOpen ? 'is-open' : ''
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
                <li key={item.label} className="navbar-item">
                  <a
                    href={item.href}
                    data-nav-href={item.href}
                    className={`navbar-link ${isActive ? 'is-active' : ''}`}
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
        <div className="navbar-right">
          {/* Desktop Prominent CTA */}
          <a
            href="#contact"
            className="navbar-cta-desktop"
            onClick={(e) => {
              e.preventDefault()
              setContactDropdownOpen(false)
              scrollTo('#contact')
            }}
          >
            Let's talk <span className="cta-arrow" aria-hidden="true">↗</span>
          </a>

          {/* Mobile Compact CTA */}
          <a
            href="#contact"
            className="navbar-cta-mobile"
            onClick={(e) => {
              e.preventDefault()
              setContactDropdownOpen(false)
              scrollTo('#contact')
            }}
          >
            Let's talk
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => {
              setContactDropdownOpen(false)
              setMobileMenuOpen(!mobileMenuOpen)
            }}
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>

        {/* Floating Contact Dropdown Panel */}
        {contactDropdownOpen && (
          <div
            id="navbar-contact-dropdown"
            ref={dropdownRef}
            className="navbar-contact-dropdown"
            role="dialog"
            aria-modal="false"
            aria-labelledby="contact-dropdown-heading"
          >
            <div className="dropdown-panel-header">
              <span id="contact-dropdown-heading" className="dropdown-eyebrow">
                START A CONVERSATION
              </span>
              <button
                type="button"
                className="dropdown-close-btn"
                onClick={() => setContactDropdownOpen(false)}
                aria-label="Close contact dropdown"
              >
                ✕
              </button>
            </div>

            <div className="dropdown-panel-body">
              {/* Option 1: Send an Email */}
              <div className="dropdown-option-card">
                <div className="dropdown-option-info">
                  <h4 className="dropdown-option-title">Send an Email</h4>
                  <p className="dropdown-option-desc">
                    Have a project, product idea, or question? Write to us.
                  </p>
                </div>

                {CONTACT_CONFIG.isVerified ? (
                  <a
                    href={`mailto:${CONTACT_CONFIG.email}?subject=UnValor%20Inquiry`}
                    className="dropdown-action-btn"
                    onClick={() => setContactDropdownOpen(false)}
                  >
                    Compose Email <span className="action-arrow" aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <div className="dropdown-unverified-tag" title={CONTACT_CONFIG.unverifiedNotice}>
                    <span className="unverified-pulse" aria-hidden="true" />
                    <span>Setup in progress · Email pending</span>
                  </div>
                )}
              </div>

              {/* Option 2: Explore UnValor */}
              <div className="dropdown-option-card">
                <div className="dropdown-option-info">
                  <h4 className="dropdown-option-title">Explore UnValor</h4>
                  <p className="dropdown-option-desc">
                    See what we're building and the problems we want to solve.
                  </p>
                </div>

                <button
                  type="button"
                  className="dropdown-action-btn dropdown-action-btn-secondary"
                  onClick={() => scrollTo('#services')}
                >
                  Explore the Studio <span className="action-arrow" aria-hidden="true">↓</span>
                </button>
              </div>
            </div>

            <div className="dropdown-panel-footer">
              <span className="dropdown-status-pill">{CONTACT_CONFIG.statusNote}</span>
              <a
                href="#contact"
                className="dropdown-direct-link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#contact')
                }}
              >
                Go to inquiry section ↓
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-nav-menu"
        className={`navbar-mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-content">
          <ul className="mobile-nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`mobile-nav-link ${
                    activeSection === item.href.slice(1) ? 'is-active' : ''
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
            <li className="mobile-drawer-cta-row">
              <a
                href="#contact"
                className="mobile-nav-link mobile-cta"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#contact')
                }}
              >
                Let's talk ↗
              </a>
            </li>
          </ul>

          {onReplayIntro && (
            <div className="mobile-drawer-footer">
              <button
                type="button"
                className="mobile-replay-btn"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onReplayIntro()
                }}
              >
                Replay Brand Reveal
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
