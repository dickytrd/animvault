'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function ShakeErrorBtn({ intensity, duration, label }) {
  const btnRef = useRef(null)
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const onClick = () => {
      if (isAnimatingRef.current) return
      isAnimatingRef.current = true

      const tl = gsap.timeline({
        onComplete: () => { isAnimatingRef.current = false }
      })

      // Flash red border briefly
      gsap.to(btn, { borderColor: '#ef4444', duration: 0.1 })

      // Shake sequence
      tl.to(btn, { x: -intensity, duration: duration * 0.1, ease: 'power2.out' })
        .to(btn, { x:  intensity, duration: duration * 0.1, ease: 'power2.inOut' })
        .to(btn, { x: -intensity * 0.7, duration: duration * 0.1, ease: 'power2.inOut' })
        .to(btn, { x:  intensity * 0.7, duration: duration * 0.1, ease: 'power2.inOut' })
        .to(btn, { x: -intensity * 0.4, duration: duration * 0.1, ease: 'power2.inOut' })
        .to(btn, { x:  0, duration: duration * 0.15, ease: 'power2.out' })
        .to(btn, { borderColor: 'var(--border)', duration: 0.3 }, '<')
    }

    btn.addEventListener('click', onClick)
    return () => btn.removeEventListener('click', onClick)
  }, [intensity, duration])

  return (
    <button ref={btnRef} style={{
      padding: '14px 32px', background: 'transparent',
      color: 'var(--text)', border: '1px solid var(--border)',
      borderRadius: '6px', fontSize: '14px', fontWeight: '500',
      fontFamily: 'inherit', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: '8px',
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {label}
    </button>
  )
}
