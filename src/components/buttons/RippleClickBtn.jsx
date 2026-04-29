'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function RippleClickBtn({ duration, label }) {
  const btnRef = useRef(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const onClick = (e) => {
      const rect   = btn.getBoundingClientRect()
      const x      = e.clientX - rect.left
      const y      = e.clientY - rect.top
      const size   = Math.max(rect.width, rect.height) * 2

      const ripple = document.createElement('div')
      Object.assign(ripple.style, {
        position: 'absolute',
        width: `${size}px`, height: `${size}px`,
        left: `${x - size / 2}px`, top: `${y - size / 2}px`,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.25)',
        pointerEvents: 'none',
      })
      btn.appendChild(ripple)

      gsap.fromTo(ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1, opacity: 0, duration,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        }
      )
    }

    btn.addEventListener('click', onClick)
    return () => btn.removeEventListener('click', onClick)
  }, [duration])

  return (
    <button ref={btnRef} style={{
      position: 'relative', overflow: 'hidden',
      padding: '14px 32px', background: 'var(--surface-2)',
      color: 'var(--text)', border: '1px solid var(--border)',
      borderRadius: '6px', fontSize: '14px', fontWeight: '500',
      fontFamily: 'inherit', cursor: 'pointer',
    }}>
      {label}
    </button>
  )
}
