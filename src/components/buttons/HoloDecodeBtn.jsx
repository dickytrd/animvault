'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function HoloDecodeBtn({ 
  decodeSpeed = 0.6, 
  scanlineSpeed = 0.4, 
  holoIntensity = 0.5, 
  enableScanline = true, 
  label = 'SYSTEM READY' 
}) {
  const btnRef = useRef(null)
  const textRef = useRef(null)
  const scanlineRef = useRef(null)
  const holoRef = useRef(null)
  const decodeRef = useRef(null)

  const NOISE_CHARS = '01!@#$%^&*()_+-=[]{}|;:,.<>?/~░▒▓█'
  const TARGET = label

  useEffect(() => {
    const btn = btnRef.current
    const textEl = textRef.current
    const scanline = scanlineRef.current
    const holo = holoRef.current
    if (!btn || !textEl || !scanline || !holo) return

    let progress = 0
    let scanlineTl = null

    // 🔹 Decode Engine
    const startDecode = () => {
      clearInterval(decodeRef.current)
      progress = 0
      const duration = decodeSpeed * 1000
      const intervalTime = 30
      const increment = intervalTime / duration

      decodeRef.current = setInterval(() => {
        progress += increment
        if (progress >= 1) {
          textEl.textContent = TARGET
          clearInterval(decodeRef.current)
          return
        }
        let str = ''
        for (let i = 0; i < TARGET.length; i++) {
          str += Math.random() < progress 
            ? TARGET[i] 
            : NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)]
        }
        textEl.textContent = str
      }, intervalTime)
    }

    const resetDecode = () => {
      clearInterval(decodeRef.current)
      textEl.textContent = TARGET // Snap to clear for stable UX
    }

    // 🔹 Scanline Engine
    const triggerScanline = () => {
      if (!enableScanline) return
      gsap.killTweensOf(scanline)
      gsap.set(scanline, { top: '-20%', opacity: 0 })
      scanlineTl = gsap.timeline()
        .to(scanline, { opacity: holoIntensity, duration: scanlineSpeed * 0.2, ease: 'power2.out' })
        .to(scanline, { top: '120%', duration: scanlineSpeed, ease: 'power1.inOut' })
        .to(scanline, { opacity: 0, duration: scanlineSpeed * 0.1 }, '<0.1')
    }

    //  Holo & Border Engine
    const activateHolo = () => {
      gsap.to(holo, { opacity: holoIntensity, duration: 0.3, ease: 'power2.out' })
      gsap.to(btn, { 
        borderColor: 'var(--accent)', 
        boxShadow: `0 0 ${12 * holoIntensity}px rgba(37, 99, 255, 0.4)`, 
        duration: 0.3 
      })
    }

    const deactivateHolo = () => {
      gsap.to(holo, { opacity: 0, duration: 0.2, ease: 'power2.in' })
      gsap.to(btn, { 
        borderColor: 'var(--border)', 
        boxShadow: '0 0 0px rgba(0,0,0,0)', 
        duration: 0.2 
      })
    }

    // ─ Handlers ──
    const onEnter = () => {
      startDecode()
      triggerScanline()
      activateHolo()
    }

    const onLeave = () => {
      resetDecode()
      deactivateHolo()
      if (scanlineTl) scanlineTl.kill()
    }

    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)

    // Init state
    textEl.textContent = TARGET
    gsap.set(btn, { borderColor: 'var(--border)' })
    gsap.set(holo, { opacity: 0 })

    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
      clearInterval(decodeRef.current)
      gsap.killTweensOf([btn, scanline, holo])
    }
  }, [decodeSpeed, scanlineSpeed, holoIntensity, enableScanline, label])

  return (
    <button
      ref={btnRef}
      style={{
        position: 'relative',
        padding: '14px 32px',
        background: 'transparent',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        fontSize: '13px',
        fontWeight: '600',
        fontFamily: 'monospace',
        letterSpacing: '0.1em',
        cursor: 'pointer',
        overflow: 'hidden',
        transform: 'translate3d(0,0,0)',
        textTransform: 'uppercase',
        transition: 'none',
      }}
    >
      {/* Main Text */}
      <span ref={textRef} style={{ position: 'relative', zIndex: 2, display: 'inline-block' }}>{label}</span>
      
      {/* Holographic Overlay (Chromatic Shift) */}
      <div ref={holoRef} style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.15), rgba(255,0,100,0.15), transparent)',
        zIndex: 1, pointerEvents: 'none', opacity: 0,
        mixBlendMode: 'screen',
      }} />

      {/* Scanline Sweep */}
      <div ref={scanlineRef} style={{
        position: 'absolute', left: 0, right: 0, height: '2px',
        background: 'var(--accent)',
        boxShadow: '0 0 8px var(--accent)',
        zIndex: 3, pointerEvents: 'none', opacity: 0, top: '-20%'
      }} />
    </button>
  )
}