'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function LiquidFillBtn({ duration = 0.6, bounce = 1.8 }) {
  const btnRef = useRef(null)
  const fillRef = useRef(null)
  const waveRef = useRef(null)
  const textSliderRef = useRef(null)
  const isAnimating = useRef(false)

  useEffect(() => {
    const btn = btnRef.current
    const fill = fillRef.current
    const wave = waveRef.current
    const slider = textSliderRef.current
    if (!btn || !fill || !wave || !slider) return

    // Initial Setup
    gsap.set(btn, { borderColor: 'var(--border)', scale: 1 })
    gsap.set([fill, wave], { yPercent: 100, opacity: 0 })
    gsap.set(slider, { yPercent: 0 }) // Shows "Hover Me!"

    // ── HOVER ──
    const onEnter = () => {
      if (isAnimating.current) return
      gsap.killTweensOf([btn, wave, slider])
      
      gsap.to(btn, { borderColor: 'var(--accent)', duration: 0.3, ease: 'power2.out' })
      gsap.to(slider, { yPercent: -33.33, duration: 0.3, ease: 'power2.out' }) // -> "Click Me!"
      
      gsap.set(wave, { yPercent: 100, opacity: 1 })
      gsap.to(wave, {
        yPercent: 85, duration: 0.4, ease: 'power2.out',
        repeat: -1, yoyo: true, repeatDelay: 0.6
      })
    }

    // ── UNHOVER (only if not clicked) ──
    const onLeave = () => {
      if (isAnimating.current) return
      gsap.killTweensOf([btn, wave, slider])
      
      gsap.to(btn, { borderColor: 'var(--border)', duration: 0.3, ease: 'power2.out' })
      gsap.to(slider, { yPercent: 0, duration: 0.3, ease: 'power2.out' }) // -> "Hover Me!"
      gsap.to(wave, { yPercent: 100, opacity: 0, duration: 0.3, ease: 'power2.in' })
    }

    // ── CLICK ──
    const onClick = (e) => {
      e.preventDefault()
      if (isAnimating.current) return
      isAnimating.current = true
      gsap.killTweensOf([btn, wave, slider])

      const tl = gsap.timeline({
        onComplete: () => {
          // Auto-Reverse Sequence
          const revTl = gsap.timeline({
            onComplete: () => { isAnimating.current = false }
          })
          
          revTl.to(slider, { yPercent: 0, duration: 0.4, ease: 'power2.inOut' }) // -> "Hover Me!"
            .to(fill, { yPercent: 100, opacity: 0, duration: 0.4, ease: 'power2.inOut' }, '<')
            .to(wave, { yPercent: 100, opacity: 0, duration: 0.4, ease: 'power2.inOut' }, '<')
            .to(btn, { borderColor: 'var(--border)', duration: 0.3 }, '-=0.3')
        }
      })

      // Lock wave at pooled position before rising
      gsap.set(wave, { yPercent: 85, opacity: 1 })

      tl.to(slider, { yPercent: -66.66, duration: 0.3, ease: 'power2.inOut' }) // -> "Nice!"
        .to(fill, { yPercent: 0, opacity: 1, duration: duration * 0.6, ease: 'power2.out' }, '<')
        .to(wave, { yPercent: 0, duration: duration * 0.5, ease: `back.out(${bounce})` }, '<0.1')
        .to(btn, { scale: 1.05, duration: 0.12, ease: 'power2.out', yoyo: true, repeat: 1 }, '-=0.2')
        .to({}, { duration: 0.8 }) // Pause before reverse
    }

    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)
    btn.addEventListener('click', onClick)

    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
      btn.removeEventListener('click', onClick)
      gsap.killTweensOf([btn, fill, wave, slider])
    }
  }, [duration, bounce])

  return (
    <button
      ref={btnRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '14px 32px',
        background: 'transparent',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: 'inherit',
        cursor: 'pointer',
        zIndex: 1,
        transform: 'translate3d(0,0,0)',
      }}
    >
      {/* Background Layers */}
      <div ref={fillRef} style={{ position: 'absolute', inset: 0, background: 'var(--accent)', zIndex: -2 }} />
      <div ref={waveRef} style={{
        position: 'absolute', inset: 0, background: 'var(--accent)',
        borderRadius: '50%', zIndex: -1, opacity: 0,
        width: '140%', left: '-20%',
      }} />

      {/* Text Mask Container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        height: '1.2em',
        lineHeight: '1.2em',
        textAlign: 'center',
      }}>
        <div ref={textSliderRef} style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Hover Me!</span>
          <span>Click Me!</span>
          <span>Nice!</span>
        </div>
      </div>
    </button>
  )
}