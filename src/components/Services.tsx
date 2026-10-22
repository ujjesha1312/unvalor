import { useState, useRef, useCallback } from 'react'

export interface FeatureCardData {
  id: string
  title: string
  category: string
  description: string
  visualType: 'tools' | 'web' | 'automation' | 'collaboration'
}

const INITIAL_CARDS: FeatureCardData[] = [
  {
    id: 'card-tools',
    title: 'Practical Business Tools',
    category: 'SMALL BUSINESS SOFTWARE',
    description: 'Practical digital tools that help small businesses streamline daily operations.',
    visualType: 'tools',
  },
  {
    id: 'card-web',
    title: 'Websites & MVPs',
    category: 'WEB DEVELOPMENT',
    description: 'Fast, thoughtful websites and useful first versions of digital products.',
    visualType: 'web',
  },
  {
    id: 'card-ai',
    title: 'AI & Workflow Automation',
    category: 'AI & AUTOMATION',
    description: 'Practical automation that reduces repetitive work and makes information easier to use.',
    visualType: 'automation',
  },
  {
    id: 'card-collab',
    title: 'Build With UnValor',
    category: 'EARLY-STAGE COLLABORATION',
    description: "Have a real problem to solve? Let's explore a practical first version together.",
    visualType: 'collaboration',
  },
]

export function Services() {
  const [cards, setCards] = useState<FeatureCardData[]>(INITIAL_CARDS)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dropTargetId, setDropTargetId] = useState<string | null>(null)

  // Synchronous refs to prevent stale closure bugs
  const dragStartPos = useRef<{ x: number; y: number } | null>(null)
  const isDraggingRef = useRef<boolean>(false)
  const draggingIdRef = useRef<string | null>(null)
  const dropTargetIdRef = useRef<string | null>(null)
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map())

  // Check if current order differs from initial layout
  const isRearranged = cards.some((c, idx) => c.id !== INITIAL_CARDS[idx].id)

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
      updated.splice(toIndex, 0, moved)
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
  const handleGripKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (index > 0) moveCard(index, index - 1)
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      if (index < cards.length - 1) moveCard(index, index + 1)
    }
  }

  // Pointer Events drag interaction on the 6-dot grip
  const handleGripPointerDown = (e: React.PointerEvent<HTMLElement>, id: string) => {
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

  const handleGripPointerMove = (e: React.PointerEvent<HTMLElement>) => {
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
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
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

  const handleGripPointerUp = (e: React.PointerEvent<HTMLElement>) => {
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
        updated.splice(toIdx, 0, moved)
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

  const scrollToContact = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const target = document.getElementById('contact')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = '#contact'
    }
  }

  return (
    <section id="services" className="services-section" aria-label="Services & Capabilities">
      <div className="section-container">
        {/* Compact Section Header */}
        <header className="services-section-header">
          <div className="services-header-text">
            <span className="section-eyebrow">Services & Focus</span>
            <h2 className="services-title">Capabilities crafted for everyday utility.</h2>
            <p className="services-subtitle">
              We build practical digital tools for small businesses and focused software for startups. Drag cards to reorganize your view.
            </p>
          </div>

          <div className="grid-meta-bar">
            <span className="grid-hint">
              <span className="grip-icon-sample" aria-hidden="true">⋮⋮</span>
              Drag grip to rearrange
            </span>
            {isRearranged && (
              <button
                type="button"
                className="grid-reset-btn"
                onClick={resetOrder}
                title="Reset cards to default layout"
              >
                ↺ Reset layout
              </button>
            )}
          </div>
        </header>

        {/* Compact 2x2 Draggable Grid */}
        <div className="draggable-widget-grid" role="list" aria-label="Rearrangeable services cards">
          {cards.map((card, index) => {
            const isDragging = draggingId === card.id
            const isTarget = dropTargetId === card.id && draggingId !== card.id

            return (
              <article
                key={card.id}
                ref={(el) => setCardRef(card.id, el)}
                className={`widget-card ${isDragging ? 'is-dragging' : ''} ${
                  isTarget ? 'is-drop-target' : ''
                }`}
                role="listitem"
                aria-grabbed={isDragging}
              >
                {/* Card Header & 6-Dot Drag Grip */}
                <div className="widget-header">
                  <div
                    className="widget-grip-zone"
                    tabIndex={0}
                    role="button"
                    aria-label={`Drag to reorder ${card.title}. Use arrow keys to reorder when focused.`}
                    title="Drag grip or use arrow keys to reorder"
                    onPointerDown={(e) => handleGripPointerDown(e, card.id)}
                    onPointerMove={handleGripPointerMove}
                    onPointerUp={handleGripPointerUp}
                    onPointerCancel={handleGripPointerUp}
                    onKeyDown={(e) => handleGripKeyDown(e, index)}
                  >
                    <span className="widget-drag-dots" aria-hidden="true">
                      <span /><span />
                      <span /><span />
                      <span /><span />
                    </span>
                    <span className="widget-category-tag">{card.category}</span>
                  </div>

                  {/* Accessible Keyboard Controls */}
                  <div className="widget-keyboard-actions" aria-label="Card order controls">
                    <button
                      type="button"
                      className="keyboard-move-btn"
                      disabled={index === 0}
                      onClick={() => handleKeyReorder(index, 'prev')}
                      title="Move card backward"
                      aria-label={`Move ${card.title} backward`}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="keyboard-move-btn"
                      disabled={index === cards.length - 1}
                      onClick={() => handleKeyReorder(index, 'next')}
                      title="Move card forward"
                      aria-label={`Move ${card.title} forward`}
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
                          <span className="stock-title">Operations · Workflow</span>
                        </div>
                        <div className="stock-item-row ok">
                          <div className="stock-item-info">
                            <span className="stock-name">Order Processing</span>
                            <span className="stock-qty">Active</span>
                          </div>
                          <span className="stock-pill ok">Live</span>
                        </div>
                        <div className="stock-item-row ok">
                          <div className="stock-item-info">
                            <span className="stock-name">Task Schedule</span>
                            <span className="stock-qty">Synced</span>
                          </div>
                          <span className="stock-pill ok">OK</span>
                        </div>
                      </div>
                    )}

                    {/* Visual 2: Websites & MVPs - Wireframe */}
                    {card.visualType === 'web' && (
                      <div className="compact-wireframe-board">
                        <div className="wireframe-bar">
                          <div className="wireframe-dots">
                            <span /><span /><span />
                          </div>
                          <span className="wireframe-address">studio.unvalor.com</span>
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
                          <div className="pipeline-step">
                            <span className="step-tag">Input</span>
                            <span className="step-sub">"New task"</span>
                          </div>
                          <span className="flow-arrow">→</span>
                          <div className="pipeline-step highlight">
                            <span className="step-tag">Automation</span>
                            <span className="step-sub">Workflow active</span>
                          </div>
                          <span className="flow-arrow">→</span>
                          <div className="pipeline-step">
                            <span className="step-tag">Summary</span>
                            <span className="step-sub">Clear update</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual 4: Build With UnValor - Collaboration CTA */}
                    {card.visualType === 'collaboration' && (
                      <div className="compact-collab-board">
                        <div className="collab-status-chip">
                          <span className="status-live-dot" />
                          <span>Direct Founder Collaboration</span>
                        </div>
                        <button
                          type="button"
                          className="widget-cta-button"
                          onClick={scrollToContact}
                        >
                          Start a project <span className="arrow-icon" aria-hidden="true">↗</span>
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
