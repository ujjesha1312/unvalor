'use client'

import { useEffect, useRef, useState } from 'react'
import { a11y } from '@/content/a11y'
import { contact, CONTACT_CONFIG, CONTACT_OPTIONS, type OptionId } from '@/content/contact'
import { SectionHead } from './SectionHead'

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.left = '-9999px'
  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  ta.remove()
}

interface ContactProps {
  /** Rendered as its own page: the title becomes the page <h1>. */
  asPage?: boolean
}

export function Contact({ asPage = false }: ContactProps) {
  const [selectedOption, setSelectedOption] = useState<OptionId>('idea')
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const activeOption = CONTACT_OPTIONS.find((opt) => opt.id === selectedOption) ?? CONTACT_OPTIONS[0]
  const mailtoHref = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(activeOption.subject)}`
  const live = CONTACT_CONFIG.isVerified

  const handleCopy = async () => {
    try {
      await copyText(CONTACT_CONFIG.email)
      setCopied(true)
      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className={`uv-root uv-sec${asPage ? ' uv-sec--page' : ''}`} aria-labelledby="contact-title">
      <div className="uv-sec__in uv-contact">
        <div className="uv-contact__lead">
          <SectionHead
            id="contact"
            num={contact.num}
            label={contact.label}
            title={
              <>
                {contact.heading.line1}
                <br />
                {contact.heading.line2}
              </>
            }
            intro={contact.paragraph}
            asPage={asPage}
          />
          <p className="uv-contact__status">
            <span className="uv-btn__dot" aria-hidden="true" /> {CONTACT_CONFIG.statusNote}
          </p>
        </div>

        <div className="uv-crop uv-contact__card">
          <span className="uv-crop__m uv-crop__m--tl" aria-hidden="true" />
          <span className="uv-crop__m uv-crop__m--tr" aria-hidden="true" />
          <span className="uv-crop__m uv-crop__m--bl" aria-hidden="true" />
          <span className="uv-crop__m uv-crop__m--br" aria-hidden="true" />

          <p className="uv-label" id="contact-prompt">
            {contact.prompt}
          </p>
          <div className="uv-contact__chips" role="radiogroup" aria-labelledby="contact-prompt">
            {CONTACT_OPTIONS.map((opt) => {
              const isSelected = selectedOption === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`uv-chip${isSelected ? ' is-selected' : ''}`}
                  onClick={() => setSelectedOption(opt.id)}
                >
                  <i aria-hidden="true" />
                  {opt.label}
                </button>
              )
            })}
          </div>
          <p className="uv-contact__hint">{contact.chipMessage}</p>

          <div className="uv-contact__channel">
            <span className="uv-micro">{contact.channelLabel}</span>
            {live ? (
              <a className="uv-contact__email" href={mailtoHref}>
                {CONTACT_CONFIG.email}
              </a>
            ) : (
              <span className="uv-contact__email">{CONTACT_CONFIG.email}</span>
            )}
            {!live && <p className="uv-contact__notice">{CONTACT_CONFIG.unverifiedNotice}</p>}
          </div>

          <div className="uv-contact__actions">
            {live && (
              <a className="uv-btn uv-btn--primary" href={mailtoHref}>
                {contact.primaryButton} <span aria-hidden="true">↗</span>
              </a>
            )}
            <button
              type="button"
              className={`uv-btn ${live ? 'uv-btn--secondary' : 'uv-btn--primary'}`}
              onClick={handleCopy}
              aria-label={a11y.contact.copy}
            >
              {copied ? contact.copiedButton : contact.copyButton}
            </button>
            <span className="uv-sr" aria-live="polite">
              {copied ? contact.copiedButton : ''}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
