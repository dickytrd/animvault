'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function MagneticBtn({ duration = 0.4, magneticRange = 30, label }) {
  const btnRef = useRef(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    let currentX = 0
    let currentY = 0

    const onMouseMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Calculate distance from center
      const deltaX = (e.clientX - centerX) / rect.width * 2
      const deltaY = (e.clientY - centerY) / rect.height * 2
      
      // Magnetic pull (capped at magneticRange)
      const targetX = deltaX * magneticRange
      const targetY = deltaY * magneticRange
      
      // Animate with smooth follow
      gsap.to(btn, {
        x: targetX,
        y: targetY,
        duration: duration,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    const onMouseLeave = () => {
      // Snap back to center
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: duration * 0.8,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto'
      })
    }

    btn.addEventListener('mousemove', onMouseMove)
    btn.addEventListener('mouseleave', onMouseLeave)
    
    return () => {
      btn.removeEventListener('mousemove', onMouseMove)
      btn.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [duration, magneticRange])

  return (
    <button ref={btnRef} style={{
      padding: '14px 32px',
      background: 'var(--accent)',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      fontFamily: 'inherit',
      cursor: 'pointer',
      transform: 'translate3d(0,0,0)', // GPU acceleration
      willChange: 'transform',
    }}>
      {label}
    </button>
  )
}