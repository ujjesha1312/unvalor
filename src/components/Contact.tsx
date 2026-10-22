import { useState } from 'react'
import { CONTACT_CONFIG } from '../config/contact'

type OptionId = 'idea' | 'product' | 'other'

interface OptionItem {
  id: OptionId
  label: string
  subject: string
}

const OPTIONS: OptionItem[] = [
  { id: 'idea', label: 'A new idea', subject: 'UnValor Inquiry: A new idea' },
  { id: 'product', label: 'A website or product', subject: 'UnValor Inquiry: A website or product' },
  { id: 'other', label: 'Something else', subject: 'UnValor Inquiry: Project conversation' },
]

export function Contact() {
  const [selectedOption, setSelectedOption] = useState<OptionId>('idea')
  const [copied, setCopied] = useState(false)

  const activeOption = OPTIONS.find((opt) => opt.id === selectedOption) ?? OPTIONS[0]
  const mailtoHref = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(activeOption.subject)}`

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CONTACT_CONFIG.email)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = CONTACT_CONFIG.email
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        textArea.remove()
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="contact-section" aria-label="Contact and Inquiries">
      <div className="section-container">
        <div className="contact-grid">
          {/* Left Column: Heading and Context */}
          <div className="contact-intro">
            <span className="section-eyebrow">LET'S CONNECT</span>
            <h2 className="contact-main-heading">
              Have an idea?<br />
              Let's make it real.
            </h2>
            <p className="contact-supporting-copy">
              Tell us what you're building. Let's figure out the next step.
            </p>

            {/* Subtle floating studio accent */}
            <div className="contact-studio-accent" aria-hidden="true">
              <div className="accent-orbit">
                <span className="accent-core">U°</span>
              </div>
              <span className="accent-label">UNVALOR° · EARLY-STAGE STUDIO</span>
            </div>
          </div>

          {/* Right Column: Interactive Contact Card */}
          <div className="contact-interactive-card">
            <div className="contact-prompt-block">
              <span className="contact-prompt-title">What are you working on?</span>
              <div className="contact-options-group" role="radiogroup" aria-label="What are you working on?">
                {OPTIONS.map((opt) => {
                  const isSelected = selectedOption === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`contact-option-chip ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedOption(opt.id)}
                    >
                      <span className="chip-indicator" aria-hidden="true" />
                      <span className="chip-label">{opt.label}</span>
                    </button>
                  )
                })}
              </div>
              <p className="contact-feedback-line">
                Great. Tell us a little about it in your email.
              </p>
            </div>

            <div className="contact-card-divider" />

            <div className="contact-channel-block">
              <div className="contact-email-row">
                <span className="contact-channel-label">DIRECT EMAIL</span>
                <a
                  href={mailtoHref}
                  className="contact-prominent-email"
                  title="Compose email to hello@unvalor.com"
                >
                  {CONTACT_CONFIG.email}
                </a>
              </div>

              <div className="contact-buttons-row">
                <a
                  href={mailtoHref}
                  className="contact-btn-primary"
                  title="Send email via your email client"
                >
                  <span>Send us an email</span>
                  <span className="btn-arrow" aria-hidden="true">↗</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`contact-btn-secondary ${copied ? 'is-copied' : ''}`}
                  aria-label="Copy email address"
                >
                  <span>{copied ? 'Copied!' : 'Copy email'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
