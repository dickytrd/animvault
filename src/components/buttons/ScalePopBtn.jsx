'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function ScalePopBtn({ duration, scaleHover, label }) {
  const btnRef = useRef(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const onEnter  = () => gsap.to(btn, { scale: scaleHover, duration, ease: 'back.out(2)' })
    const onLeave  = () => gsap.to(btn, { scale: 1,          duration, ease: 'power2.inOut' })
    const onDown   = () => gsap.to(btn, { scale: 0.93,       duration: 0.08, ease: 'power2.in'  })
    const onUp     = () => gsap.to(btn, { scale: scaleHover, duration: 0.2,  ease: 'back.out(3)' })

    btn.addEventListener('mouseenter',  onEnter)
    btn.addEventListener('mouseleave',  onLeave)
    btn.addEventListener('mousedown',   onDown)
    btn.addEventListener('mouseup',     onUp)
    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
      btn.removeEventListener('mousedown',  onDown)
      btn.removeEventListener('mouseup',    onUp)
    }
  }, [duration, scaleHover])

  return (
    <button ref={btnRef} style={{
      padding: '14px 32px', background: 'var(--accent)',
      color: '#fff', border: 'none', borderRadius: '6px',
      fontSize: '14px', fontWeight: '500', fontFamily: 'inherit',
      cursor: 'pointer', transformOrigin: 'center',
    }}>
      {label}
    </button>
  )
}
