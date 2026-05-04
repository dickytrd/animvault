'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function GlitchTextBtn({ 
  duration = 0.4, 
  intensity = 6, 
  enableJitter = true, 
  pulseSpeed = 0.6,
  label = 'Hover Me!' 
}) {
  const btnRef = useRef(null)
  const textRef = useRef(null)
  const scrambleRef = useRef(null)
  const hoverStateRef = useRef(false)
  const jitterRef = useRef(null)

  const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
  const TARGET_HOVER = 'Click Me!'
  const TARGET_DEFAULT = 'Hover Me!'

  useEffect(() => {
    const btn = btnRef.current
    const textEl = textRef.current
    if (!btn || !textEl) return

    let progress = 0
    let currentTarget = TARGET_DEFAULT
    let pulseTl = null

    // ── Scramble Engine ──
    const startScramble = (target) => {
      currentTarget = target
      progress = 0
      clearInterval(scrambleRef.current)
      
      const totalTicks = (duration * 1000) / 30
      const increment = 1 / totalTicks

      scrambleRef.current = setInterval(() => {
        progress += increment
        if (progress >= 1) {
          textEl.textContent = currentTarget
          clearInterval(scrambleRef.current)
          return
        }

        let str = ''
        for (let i = 0; i < currentTarget.length; i++) {
          str += Math.random() < progress 
            ? currentTarget[i] 
            : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        }
        textEl.textContent = str
      }, 30)
    }

    // ── Pulse Engine (Isolated from jitter) ──
    const startPulse = () => {
      if (pulseTl) pulseTl.kill()
      pulseTl = gsap.timeline({ repeat: -1 })
      pulseTl
        .to(btn, { borderColor: 'var(--accent)', duration: pulseSpeed / 2, ease: 'power2.out', overwrite: false })
        .to(btn, { borderColor: 'var(--border)', duration: pulseSpeed / 2, ease: 'power2.in', overwrite: false })
    }

    const stopPulse = () => {
      if (pulseTl) pulseTl.kill()
      gsap.to(btn, { borderColor: 'var(--border)', duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
    }

    // ── Jitter Engine (Safe Coexistence) ──
    const applyJitter = () => {
      if (jitterRef.current) {
        jitterRef.current.kill()
        jitterRef.current = null
      }

      if (!enableJitter || !hoverStateRef.current) {
        gsap.to(btn, { x: 0, y: 0, duration: 0.15, ease: 'power2.out', overwrite: 'auto' })
        return
      }

      jitterRef.current = gsap.to(btn, {
        x: () => gsap.utils.random(-intensity, intensity),
        y: () => gsap.utils.random(-intensity, intensity),
        duration: 0.04,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.02,
        overwrite: 'auto', // ✅ FIX: Hanya timpa x/y, biarkan borderColor (pulse) jalan
      })
    }

    // ── Hover Handlers ──
    const onEnter = () => {
      hoverStateRef.current = true
      startPulse()
      startScramble(TARGET_HOVER)
      applyJitter()
    }

    const onLeave = () => {
      hoverStateRef.current = false
      stopPulse()
      startScramble(TARGET_DEFAULT)
      
      gsap.killTweensOf(btn)
      gsap.to(btn, { x: 0, y: 0, borderColor: 'var(--border)', duration: 0.2, ease: 'power2.out' })
      
      if (jitterRef.current) jitterRef.current.kill()
    }

    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)

    gsap.set(btn, { x: 0, y: 0, borderColor: 'var(--border)' })
    textEl.textContent = TARGET_DEFAULT

    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf(btn)
      clearInterval(scrambleRef.current)
      if (pulseTl) pulseTl.kill()
      if (jitterRef.current) jitterRef.current.kill()
    }
  }, [duration, intensity, enableJitter, pulseSpeed])

  return (
    <button
      ref={btnRef}
      style={{
        position: 'relative',
        padding: '14px 32px',
        background: 'transparent',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'inherit',
        cursor: 'pointer',
        transform: 'translate3d(0,0,0)',
        whiteSpace: 'nowrap',
        transition: 'none',
      }}
    >
      <span ref={textRef}>{label}</span>
    </button>
  )
}