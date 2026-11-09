'use client'

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent } from 'react'
import { a11y } from '@/content/a11y'
import { useReveal } from '@/lib/use-reveal'
import type { WorkItem } from '@/content/work'

/**
 * Interactive bento gallery — adapted from the 21st.dev "bento-gallery" block.
 * Keeps its behaviour (horizontal two-row bento, drag to explore, click to expand) without
 * framer-motion / lucide-react:
 *  - drag: mouse pointer events on a native overflow scroller (touch uses native scrolling)
 *  - expand: a native <dialog> (focus handling + Esc for free)
 *  - entrance: the shared `useReveal` stagger
 * Items without an `image` render a branded placeholder frame.
 */

interface BentoGalleryProps {
  items: readonly WorkItem[]
  /** Shown in the expanded view for slots without an image. */
  status: string
}

const labels = a11y.work

const DRAG_THRESHOLD = 5

export function BentoGallery({ items, status }: BentoGalleryProps) {
  const [selected, setSelected] = useState<WorkItem | null>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0, pointerId: -1 })
  const gridRef = useReveal<HTMLUListElement>()

  // Open/close the native dialog in step with state.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (selected && !dialog.open) dialog.showModal()
    if (!selected && dialog.open) dialog.close()
  }, [selected])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const el = e.currentTarget
    drag.current = { active: true, moved: false, startX: e.clientX, startScroll: el.scrollLeft, pointerId: e.pointerId }
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.startX
    const el = e.currentTarget
    if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      d.moved = true
      el.classList.add('is-dragging')
      try {
        el.setPointerCapture(d.pointerId)
      } catch {
        // capture unsupported — dragging still works while the pointer stays inside
      }
    }
    if (d.moved) el.scrollLeft = d.startScroll - dx
  }

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    drag.current.active = false
    e.currentTarget.classList.remove('is-dragging')
  }

  // A drag shouldn't also count as a click on the tile under the pointer.
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (!drag.current.moved) return
    drag.current.moved = false
    e.preventDefault()
    e.stopPropagation()
  }

  const scrollByPage = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    let behavior: ScrollBehavior = 'smooth'
    try {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) behavior = 'auto'
    } catch {
      // keep smooth
    }
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior })
  }

  return (
    <div className="uv-gallery">
      <div className="uv-gallery__controls">
        <button type="button" className="uv-gallery__nav" onClick={() => scrollByPage(-1)} aria-label={labels.prev}>
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" className="uv-gallery__nav" onClick={() => scrollByPage(1)} aria-label={labels.next}>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="uv-gallery__scroller"
        role="region"
        aria-label={labels.scroller}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <ul ref={gridRef} className="uv-gallery__grid uv-reveal" role="list">
          {items.map((item, i) => (
            <li key={item.id} className={`uv-gallery__item uv-gallery__item--${item.span}`} style={{ '--i': i } as CSSProperties}>
              <button
                type="button"
                className="uv-gallery__tile"
                onClick={() => setSelected(item)}
                aria-label={labels.open(item.title)}
                aria-haspopup="dialog"
              >
                <WorkVisual item={item} />
                <span className="uv-gallery__meta">
                  <span className="uv-micro">
                    {item.index} · {item.kind}
                  </span>
                  <span className="uv-gallery__title">{item.title}</span>
                  <span className="uv-gallery__desc">{item.desc}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        className="uv-root uv-gallery__dialog"
        aria-labelledby="uv-gallery-dialog-title"
        onClose={() => setSelected(null)}
        onClick={(e) => {
          // Backdrop click: the event target is the <dialog> itself, not its content.
          if (e.target === e.currentTarget) setSelected(null)
        }}
      >
        {selected && (
          <div className="uv-gallery__dialog-in">
            <div className="uv-gallery__dialog-frame">
              <WorkVisual item={selected} large />
            </div>
            <div className="uv-gallery__dialog-copy">
              <p className="uv-label">
                <span className="uv-label__num">{selected.index}</span> {selected.kind}
              </p>
              <h3 className="uv-gallery__dialog-title" id="uv-gallery-dialog-title">
                {selected.title}
              </h3>
              <p className="uv-gallery__dialog-desc">{selected.desc}</p>
              {!selected.image && (
                <p className="uv-gallery__status">
                  <span className="uv-btn__dot" aria-hidden="true" /> {status}
                </p>
              )}
            </div>
            <button
              type="button"
              className="uv-nav__menu uv-nav__menu--close uv-gallery__close"
              onClick={() => setSelected(null)}
              aria-label={labels.close}
            >
              Close <i aria-hidden="true" />
            </button>
          </div>
        )}
      </dialog>
    </div>
  )
}

interface WorkVisualProps {
  item: WorkItem
  large?: boolean
}

/** The project image, or a placeholder frame (dot grid, thirds, outlined index, ° ring). */
function WorkVisual({ item, large = false }: WorkVisualProps) {
  if (item.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static placeholders today; swap to next/image with real assets
      <img
        className="uv-gallery__img"
        src={item.image.src}
        width={item.image.width}
        height={item.image.height}
        alt=""
        loading={large ? 'eager' : 'lazy'}
        draggable={false}
      />
    )
  }
  return (
    <span className={`uv-gallery__ph${large ? ' uv-gallery__ph--lg' : ''}`} aria-hidden="true">
      <span className="uv-gallery__ph-third uv-gallery__ph-third--v" />
      <span className="uv-gallery__ph-third uv-gallery__ph-third--h" />
      <span className="uv-gallery__ph-num">{item.index}</span>
      <svg className="uv-gallery__ph-deg" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="3.8" />
      </svg>
    </span>
  )
}
