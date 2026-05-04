'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function PressHoldBtn({ holdDuration = 1.5, ringThickness = 4, ease = 'none', showSuccessCheck = true, label = 'Hold me' }) {
  const btnRef = useRef(null)
  const ringRef = useRef(null)
  const textRef = useRef(null)
  const checkRef = useRef(null)
  const tlRef = useRef(null)
  const proxyRef = useRef({ val: 0 })

  useEffect(() => {
    const btn = btnRef.current
    const ring = ringRef.current
    const text = textRef.current
    const check = checkRef.current
    if (!btn || !ring) return

    const r = 46
    const circumference = 2 * Math.PI * r
    
    // Initial setup
    gsap.set(ring, { strokeDasharray: circumference, strokeDashoffset: circumference })
    gsap.set(check, { opacity: 0, scale: 0.5 })
    gsap.set(text, { opacity: 1, y: 0 })

    // Progress timeline
    tlRef.current = gsap.to(proxyRef.current, {
      val: circumference,
      duration: holdDuration,
      ease,
      paused: true,
      onUpdate: function() {
        gsap.set(ring, { strokeDashoffset: circumference - this.targets()[0].val })
      },
      onComplete: () => {
        // Success state
        gsap.to(text, { opacity: 0, y: -5, duration: 0.2, ease: 'power2.in' })
        if (showSuccessCheck) {
          gsap.to(check, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.7)' })
        }
        gsap.to(btn, { backgroundColor: '#10b981', borderColor: '#10b981', duration: 0.2 })
      }
    })

    const onDown = () => {
      if (tlRef.current.progress() === 1) {
        resetState()
        return
      }
      gsap.to(btn, { scale: 0.96, duration: 0.12, ease: 'power2.out' })
      tlRef.current.play()
    }

    const onUp = () => {
      if (tlRef.current.isActive() && tlRef.current.progress() < 1) {
        // Cancel: smooth reverse
        tlRef.current.pause()
        gsap.to(proxyRef.current, {
          val: 0,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true,
          onUpdate: () => gsap.set(ring, { strokeDashoffset: circumference - proxyRef.current.val })
        })
        gsap.to(btn, { scale: 1, duration: 0.2 })
      }
    }

    const resetState = () => {
      gsap.killTweensOf([btn, ring, text, check, proxyRef.current])
      gsap.set(ring, { strokeDashoffset: circumference })
      gsap.set(proxyRef.current, { val: 0 })
      gsap.set(text, { opacity: 1, y: 0 })
      gsap.set(check, { opacity: 0, scale: 0.5 })
      gsap.set(btn, { backgroundColor: 'transparent', borderColor: 'var(--border)', scale: 1 })
      tlRef.current.restart().pause()
    }

    btn.addEventListener('pointerdown', onDown)
    btn.addEventListener('pointerup', onUp)
    btn.addEventListener('pointerleave', onUp)

    return () => {
      btn.removeEventListener('pointerdown', onDown)
      btn.removeEventListener('pointerup', onUp)
      btn.removeEventListener('pointerleave', onUp)
      gsap.killTweensOf([btn, ring, text, check, proxyRef.current])
    }
  }, [holdDuration, ringThickness, ease, showSuccessCheck])

  return (
    <button
      ref={btnRef}
      style={{
        position: 'relative',
        padding: '14px 32px',
        background: 'transparent',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'inherit',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translate3d(0,0,0)',
        minWidth: '110px',
        minHeight: '48px',
      }}
    >
      <span ref={textRef}>{label}</span>
      {showSuccessCheck && (
        <svg ref={checkRef} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', opacity: 0 }}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', transform: 'rotate(-90deg)' }}>
        <circle ref={ringRef} cx="50" cy="50" r="46" fill="none" stroke="var(--accent)" strokeWidth={ringThickness} strokeLinecap="round" />
      </svg>
    </button>
  )
}