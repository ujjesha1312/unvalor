'use client'

import { useState } from 'react'
import { a11y } from '@/content/a11y'
import { contact, CONTACT_CONFIG, CONTACT_OPTIONS, type OptionId } from '@/content/contact'

export function Contact() {
  const [selectedOption, setSelectedOption] = useState<OptionId>('idea')
  const [copied, setCopied] = useState(false)

  const activeOption = CONTACT_OPTIONS.find((opt) => opt.id === selectedOption) ?? CONTACT_OPTIONS[0]
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
    <section
      id="contact"
      className="relative box-border flex min-h-[calc(100vh-4.5rem)] items-center border-t border-border-subtle bg-midnight py-12 mobile:block mobile:min-h-auto mobile:py-16"
      aria-label={a11y.contact.section}
    >
      <div className="section-container">
        <div className="grid w-full grid-cols-[1.05fr_1.15fr] items-center gap-[4.5rem] tablet:gap-12 mobile:grid-cols-[1fr] mobile:gap-9">
          {/* Left Column: Heading and Context */}
          <div className="max-w-[520px] text-left">
            <span className="section-eyebrow">{contact.eyebrow}</span>
            <h2 className="mx-0 mt-3 mb-[0.85rem] font-editorial text-[length:clamp(2.2rem,3.8vw,3.1rem)] leading-[1.14] font-bold tracking-[-0.02em] text-warm-cream mobile:text-[length:clamp(1.85rem,6vw,2.4rem)]">
              {contact.heading.line1}
              <br />
              {contact.heading.line2}
            </h2>
            <p className="m-0 mb-7 max-w-[480px] font-brand text-[length:clamp(1rem,1.25vw,1.12rem)] leading-[1.55] text-pretty text-warm-cream/82">
              {contact.paragraph}
            </p>

            {/* Subtle floating studio accent */}
            <div
              className="inline-flex items-center gap-[0.85rem] rounded-full border border-slate-blue/70 bg-deep-navy/60 px-[0.95rem] py-2 [transition:border-color_0.3s_ease,box-shadow_0.3s_ease] hover:border-warm-cream/35 hover:shadow-[0_0_20px_rgba(34,57,111,0.5)]"
              aria-hidden="true"
            >
              <div className="relative flex h-6 w-6 animate-orbit items-center justify-center rounded-[50%] border border-dashed border-warm-cream/45 motion-reduce:animate-none motion-reduce:transition-none">
                <span className="font-editorial text-[0.72rem] font-bold text-warm-cream">{contact.badgeMark}</span>
              </div>
              <span className="font-brand text-[0.68rem] font-semibold tracking-[0.14em] text-warm-cream/65 uppercase">
                {contact.badgeLabel}
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Contact Card */}
          <div className="relative overflow-hidden rounded-[20px] border border-slate-blue/80 bg-deep-navy px-9 py-8 text-left shadow-[0_16px_40px_-12px_rgba(1,7,54,0.85),0_0_0_1px_rgba(252,241,208,0.04)] [transition:border-color_0.3s_ease,box-shadow_0.3s_ease] before:pointer-events-none before:absolute before:top-0 before:right-0 before:h-[220px] before:w-[220px] before:bg-[radial-gradient(circle,rgba(34,57,111,0.35)_0%,transparent_70%)] before:content-[''] hover:border-slate-blue mobile:px-6 mobile:py-7">
            <div className="flex flex-col gap-[0.85rem]">
              <span className="font-brand text-[0.78rem] font-semibold tracking-[0.14em] text-warm-cream/65 uppercase">
                {contact.prompt}
              </span>
              <div className="flex flex-wrap gap-[0.6rem] small:flex-col" role="radiogroup" aria-label={a11y.contact.chipGroup}>
                {CONTACT_OPTIONS.map((opt) => {
                  const isSelected = selectedOption === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-[0.55rem] font-brand text-[0.85rem] font-medium outline-none [transition:all_0.2s_cubic-bezier(0.16,1,0.3,1)] hover:[transform:translateY(-1px)] small:w-full ${
                        isSelected
                          ? 'border-warm-cream/55 bg-slate-blue/65 text-warm-cream shadow-[0_0_14px_rgba(34,57,111,0.6),inset_0_0_0_1px_rgba(252,241,208,0.15)]'
                          : 'border-slate-blue/80 bg-midnight/50 text-warm-cream/75 hover:border-warm-cream/35 hover:bg-slate-blue/35 hover:text-warm-cream'
                      }`}
                      onClick={() => setSelectedOption(opt.id)}
                    >
                      <span
                        className={`h-[7px] w-[7px] rounded-[50%] [transition:all_0.2s_ease] ${
                          isSelected ? 'bg-warm-cream shadow-[0_0_6px_rgba(252,241,208,0.9)]' : 'bg-warm-cream/30'
                        }`}
                        aria-hidden="true"
                      />
                      <span>{opt.label}</span>
                    </button>
                  )
                })}
              </div>
              <p className="m-0 font-brand text-[0.84rem] leading-[1.45] text-warm-cream/65">{contact.chipMessage}</p>
            </div>

            <div className="my-[1.4rem] h-px bg-[linear-gradient(90deg,rgba(34,57,111,0.8),rgba(34,57,111,0.2))]" />

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-[0.3rem]">
                <span className="font-brand text-[0.7rem] font-bold tracking-[0.16em] text-warm-cream/50 uppercase">
                  {contact.channelLabel}
                </span>
                <a
                  href={mailtoHref}
                  className="self-start font-brand text-[length:clamp(1.25rem,2vw,1.55rem)] font-semibold tracking-[-0.01em] text-warm-cream no-underline [transition:color_0.2s_ease] hover:text-warm-cream/80 hover:underline hover:underline-offset-4"
                  title={a11y.contact.emailTitle}
                >
                  {CONTACT_CONFIG.email}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-[0.85rem] small:w-full small:flex-col">
                <a
                  href={mailtoHref}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-warm-cream bg-warm-cream px-[1.6rem] py-3 font-brand text-[0.9rem] font-semibold text-midnight no-underline shadow-[0_4px_18px_rgba(34,57,111,0.45)] [transition:all_0.22s_cubic-bezier(0.16,1,0.3,1)] hover:bg-[#fff6de] hover:text-midnight hover:shadow-[0_8px_24px_rgba(34,57,111,0.65),0_0_12px_rgba(252,241,208,0.3)] hover:[transform:translateY(-2px)] small:w-full small:justify-center"
                  title={a11y.contact.primaryTitle}
                >
                  <span>{contact.primaryButton}</span>
                  <span
                    className="text-[1rem] [transition:transform_0.2s_ease] group-hover:[transform:translate(2px,-2px)]"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`inline-flex cursor-pointer items-center justify-center rounded-full border px-[1.45rem] py-3 font-brand text-[0.9rem] font-medium [transition:all_0.22s_cubic-bezier(0.16,1,0.3,1)] hover:border-warm-cream hover:[transform:translateY(-2px)] small:w-full small:justify-center ${
                    copied
                      ? 'border-warm-cream bg-slate-blue/80 text-warm-cream'
                      : 'border-warm-cream/35 bg-transparent text-warm-cream hover:bg-warm-cream/8'
                  }`}
                  aria-label={a11y.contact.copy}
                >
                  <span>{copied ? contact.copiedButton : contact.copyButton}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
