'use client'

import { useCallback, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react'
import { a11y } from '@/content/a11y'
import { INITIAL_CARDS, services, visuals, type FeatureCardData } from '@/content/services'

export function Services() {
  const [cards, setCards] = useState<readonly FeatureCardData[]>(INITIAL_CARDS)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dropTargetId, setDropTargetId] = useState<string | null>(null)

  // Synchronous refs to prevent stale closure bugs
  const dragStartPos = useRef<{ x: number; y: number } | null>(null)
  const isDraggingRef = useRef<boolean>(false)
  const draggingIdRef = useRef<string | null>(null)
  const dropTargetIdRef = useRef<string | null>(null)
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map())

  // Check if current order differs from initial layout
  const isRearranged = cards.some((c, idx) => c.id !== INITIAL_CARDS[idx]?.id)

  // Register card elements for hit-testing coordinates
  const setCardRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) {
      cardRefs.current.set(id, el)
    } else {
      cardRefs.current.delete(id)
    }
  }, [])

  // Reorder cards array
  const moveCard = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return
    setCards((prev) => {
      const updated = [...prev]
      const [moved] = updated.splice(fromIndex, 1)
      if (moved) updated.splice(toIndex, 0, moved)
      return updated
    })
  }, [])

  // Keyboard accessibility reordering
  const handleKeyReorder = (index: number, direction: 'prev' | 'next') => {
    const targetIndex = direction === 'prev' ? index - 1 : index + 1
    if (targetIndex >= 0 && targetIndex < cards.length) {
      moveCard(index, targetIndex)
    }
  }

  // Keyboard navigation on grip handle
  const handleGripKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (index > 0) moveCard(index, index - 1)
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      if (index < cards.length - 1) moveCard(index, index + 1)
    }
  }

  // Pointer Events drag interaction on the 6-dot grip
  const handleGripPointerDown = (e: PointerEvent<HTMLElement>, id: string) => {
    if (e.button !== 0) return // Only primary mouse click or touch
    e.stopPropagation()

    dragStartPos.current = { x: e.clientX, y: e.clientY }
    isDraggingRef.current = false
    draggingIdRef.current = id
    dropTargetIdRef.current = null
    setDraggingId(id)

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // safe fallback if not supported
    }
  }

  const handleGripPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!dragStartPos.current || !draggingIdRef.current) return

    const dx = e.clientX - dragStartPos.current.x
    const dy = e.clientY - dragStartPos.current.y
    const dist = Math.hypot(dx, dy)

    if (!isDraggingRef.current && dist > 4) {
      isDraggingRef.current = true
    }

    if (isDraggingRef.current) {
      const currentId = draggingIdRef.current
      let targetId: string | null = null

      for (const [cardId, el] of cardRefs.current.entries()) {
        if (cardId === currentId) continue
        const rect = el.getBoundingClientRect()
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          targetId = cardId
          break
        }
      }

      if (dropTargetIdRef.current !== targetId) {
        dropTargetIdRef.current = targetId
        setDropTargetId(targetId)
      }
    }
  }

  const handleGripPointerUp = (e: PointerEvent<HTMLElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // safe fallback
    }

    const sourceId = draggingIdRef.current
    const targetId = dropTargetIdRef.current

    if (isDraggingRef.current && sourceId && targetId && sourceId !== targetId) {
      setCards((prev) => {
        const fromIdx = prev.findIndex((c) => c.id === sourceId)
        const toIdx = prev.findIndex((c) => c.id === targetId)
        if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return prev
        const updated = [...prev]
        const [moved] = updated.splice(fromIdx, 1)
        if (moved) updated.splice(toIdx, 0, moved)
        return updated
      })
    }

    dragStartPos.current = null
    isDraggingRef.current = false
    draggingIdRef.current = null
    dropTargetIdRef.current = null
    setDraggingId(null)
    setDropTargetId(null)
  }

  const resetOrder = () => {
    setCards(INITIAL_CARDS)
  }

  const scrollToContact = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const target = document.getElementById('contact')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = '#contact'
    }
  }

  return (
    <section
      id="services"
      className="relative border-t border-border-subtle bg-midnight py-[clamp(2rem,4vh,3.25rem)]"
      aria-label={a11y.services.section}
    >
      <div className="section-container">
        {/* Compact Section Header */}
        <header className="mb-[clamp(1rem,2vh,1.35rem)] flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[680px]">
            <span className="section-eyebrow mb-[0.4rem]">{services.eyebrow}</span>
            <h2 className="m-0 mb-[0.35rem] font-editorial text-[length:clamp(1.55rem,2.6vw,2.25rem)] leading-[1.15] font-bold tracking-[-0.02em] text-warm-cream">
              {services.heading}
            </h2>
            <p className="m-0 font-brand text-[length:clamp(0.85rem,1vw,0.95rem)] leading-[1.45] text-warm-cream/78">
              {services.intro}
            </p>
          </div>

          <div className="mb-[0.2rem] inline-flex shrink-0 items-center gap-[0.65rem]">
            <span className="inline-flex items-center gap-[0.45rem] rounded-full border border-border-subtle bg-deep-navy/75 px-3 py-[0.3rem] font-brand text-[0.72rem] font-medium tracking-[0.1em] text-warm-cream/75 uppercase">
              <span className="text-[0.82rem] tracking-[-2px] text-warm-cream" aria-hidden="true">
                ⋮⋮
              </span>
              {services.dragHint}
            </span>
            {isRearranged && (
              <button
                type="button"
                className="cursor-pointer rounded-full border border-slate-blue/75 bg-transparent px-3 py-[0.3rem] font-brand text-[0.72rem] font-medium tracking-[0.08em] text-warm-cream uppercase [transition:all_0.25s_ease] hover:bg-slate-blue/50 hover:text-warm-cream"
                onClick={resetOrder}
                title={a11y.services.resetTitle}
              >
                {services.reset}
              </button>
            )}
          </div>
        </header>

        {/* Compact 2x2 Draggable Grid */}
        <div
          className="relative grid grid-cols-[repeat(2,1fr)] gap-[clamp(0.75rem,1.6vh,1.15rem)] mobile:grid-cols-[1fr] mobile:gap-4"
          role="list"
          aria-label={a11y.services.grid}
        >
          {cards.map((card, index) => {
            const isDragging = draggingId === card.id
            const isTarget = dropTargetId === card.id && draggingId !== card.id

            return (
              <article
                key={card.id}
                ref={(el) => setCardRef(card.id, el)}
                className={`widget-card ${isDragging ? 'is-dragging' : ''} ${isTarget ? 'is-drop-target' : ''}`}
                role="listitem"
                aria-grabbed={isDragging}
              >
                {/* Card Header & 6-Dot Drag Grip */}
                <div className="widget-header">
                  <div
                    className="widget-grip-zone"
                    tabIndex={0}
                    role="button"
                    aria-label={a11y.services.grip(card.title)}
                    title={a11y.services.gripTitle}
                    onPointerDown={(e) => handleGripPointerDown(e, card.id)}
                    onPointerMove={handleGripPointerMove}
                    onPointerUp={handleGripPointerUp}
                    onPointerCancel={handleGripPointerUp}
                    onKeyDown={(e) => handleGripKeyDown(e, index)}
                  >
                    <span className="widget-drag-dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className="widget-category-tag">{card.category}</span>
                  </div>

                  {/* Accessible Keyboard Controls */}
                  <div className="widget-keyboard-actions" aria-label={a11y.services.orderControls}>
                    <button
                      type="button"
                      className="keyboard-move-btn"
                      disabled={index === 0}
                      onClick={() => handleKeyReorder(index, 'prev')}
                      title={a11y.services.moveBackTitle}
                      aria-label={a11y.services.moveBack(card.title)}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="keyboard-move-btn"
                      disabled={index === cards.length - 1}
                      onClick={() => handleKeyReorder(index, 'next')}
                      title={a11y.services.moveForwardTitle}
                      aria-label={a11y.services.moveForward(card.title)}
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="widget-body">
                  <div className="widget-info-col">
                    <h3 className="widget-title">{card.title}</h3>
                    <p className="widget-description">{card.description}</p>
                  </div>

                  {/* Visual Preview Col */}
                  <div className="widget-visual-col" aria-hidden="true">
                    {/* Visual 1: Practical Business Tools - Operations Interface */}
                    {card.visualType === 'tools' && (
                      <div className="compact-stock-board">
                        <div className="stock-board-header">
                          <span className="stock-dot" />
                          <span className="stock-title">{visuals.tools.header}</span>
                        </div>
                        {visuals.tools.rows.map((row) => (
                          <div key={row.name} className="stock-item-row ok">
                            <div className="stock-item-info">
                              <span className="stock-name">{row.name}</span>
                              <span className="stock-qty">{row.status}</span>
                            </div>
                            <span className="stock-pill ok">{row.pill}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Visual 2: Websites & MVPs - Wireframe */}
                    {card.visualType === 'web' && (
                      <div className="compact-wireframe-board">
                        <div className="wireframe-bar">
                          <div className="wireframe-dots">
                            <span />
                            <span />
                            <span />
                          </div>
                          <span className="wireframe-address">{visuals.web.address}</span>
                        </div>
                        <div className="wireframe-body">
                          <div className="wf-hero-split">
                            <div className="wf-text-col">
                              <div className="wf-line title" />
                              <div className="wf-line subtitle" />
                              <div className="wf-pill" />
                            </div>
                            <div className="wf-preview-box" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual 3: AI & Workflow Automation - Pipeline */}
                    {card.visualType === 'automation' && (
                      <div className="compact-pipeline-board">
                        <div className="pipeline-flow">
                          {visuals.automation.steps.map((step, stepIndex) => (
                            <PipelineStep
                              key={step.tag}
                              tag={step.tag}
                              sub={step.sub}
                              highlight={stepIndex === 1}
                              withArrow={stepIndex > 0}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Visual 4: Build With UnValor - Collaboration CTA */}
                    {card.visualType === 'collaboration' && (
                      <div className="compact-collab-board">
                        <div className="collab-status-chip">
                          <span className="status-live-dot" />
                          <span>{visuals.collaboration.status}</span>
                        </div>
                        <button type="button" className="widget-cta-button" onClick={scrollToContact}>
                          {visuals.collaboration.cta}{' '}
                          <span className="arrow-icon" aria-hidden="true">
                            ↗
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

interface PipelineStepProps {
  tag: string
  sub: string
  highlight: boolean
  withArrow: boolean
}

function PipelineStep({ tag, sub, highlight, withArrow }: PipelineStepProps) {
  return (
    <>
      {withArrow && <span className="flow-arrow">→</span>}
      <div className={`pipeline-step${highlight ? ' highlight' : ''}`}>
        <span className="step-tag">{tag}</span>
        <span className="step-sub">{sub}</span>
      </div>
    </>
  )
}
