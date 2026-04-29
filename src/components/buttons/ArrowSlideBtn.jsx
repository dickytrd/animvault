'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function ArrowSlideBtn({ duration, label }) {
  const btnRef   = useRef(null)
  const arrowRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const btn   = btnRef.current
    const arrow = arrowRef.current
    const lbl   = labelRef.current
    if (!btn || !arrow || !lbl) return

    const onEnter = () => {
      gsap.to(arrow, { x: 5,  duration, ease: 'power2.out' })
      // gsap.to(lbl,   { x: 3,  duration, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(arrow, { x: 0, duration, ease: 'power2.inOut' })
      // gsap.to(lbl,   { x: 0, duration, ease: 'power2.inOut' })
    }

    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)
    return () => { btn.removeEventListener('mouseenter', onEnter); btn.removeEventListener('mouseleave', onLeave) }
  }, [duration])

  return (
    <button ref={btnRef} style={{
      display: 'inline-flex', alignItems: 'center', gap: '10px',
      padding: '14px 28px', background: 'var(--accent)',
      color: '#fff', border: 'none', borderRadius: '6px',
      fontSize: '14px', fontWeight: '500', fontFamily: 'inherit',
      cursor: 'pointer', overflow: 'hidden',
    }}>
      <span ref={labelRef}>{label}</span>
      <span ref={arrowRef} style={{ display: 'inline-flex' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </span>
    </button>
  )
}
