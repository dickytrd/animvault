'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function SiteLoader({ children }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const loaderRef = useRef(null)
  const contentRef = useRef(null)
  const startTime = useRef(Date.now())

  // Config
  const MIN_DISPLAY_TIME = 600   // ms: prevent flicker on fast connections
  const FALLBACK_TIMEOUT = 5000  // ms: safety net if window.load never fires

  // 1. Listen for full page load (assets + scripts)
  useEffect(() => {
    const markReady = () => {
      const elapsed = Date.now() - startTime.current
      const delay = Math.max(0, MIN_DISPLAY_TIME - elapsed)
      setTimeout(() => setIsExiting(true), delay)
    }

    // Fallback safety
    const fallback = setTimeout(markReady, FALLBACK_TIMEOUT)

    if (document.readyState === 'complete') {
      markReady()
      clearTimeout(fallback)
    } else {
      window.addEventListener('load', () => {
        markReady()
        clearTimeout(fallback)
      })
    }

    return () => {
      window.removeEventListener('load', markReady)
      clearTimeout(fallback)
    }
  }, [])

  // 2. GSAP Exit Animation
  useGSAP(() => {
    if (!isExiting || !loaderRef.current) return

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(loaderRef.current, { opacity: 0 })
      gsap.set(contentRef.current, { opacity: 1 })
      setIsVisible(false)
      return
    }

    const tl = gsap.timeline({
      onComplete: () => setIsVisible(false)
    })

    // Loader fade + slide up
    tl.to(loaderRef.current, {
      opacity: 0,
      y: -12,
      duration: 0.45,
      ease: 'power3.inOut'
    })
    // Content fade in
    .fromTo(contentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.25'
    )
  }, [isExiting])

  // 3. Render
  if (!isVisible) return children

  return (
    <>
      {/* ── Loading Overlay ── */}
      <div
        ref={loaderRef}
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'var(--bg, #0a0a0a)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Logo */}
        <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>
          Anim<span style={{ color: 'var(--accent)' }}>Vault</span>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '48px', height: '2px', background: 'var(--border)',
          borderRadius: '2px', overflow: 'hidden', position: 'relative'
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: '35%', background: 'var(--accent)',
            borderRadius: '2px',
            animation: 'loaderSlide 1.2s ease-in-out infinite'
          }} />
        </div>

        {/* Status Text */}
        <p style={{
          fontSize: '11px', color: 'var(--text-subtle)',
          letterSpacing: '0.08em', textTransform: 'uppercase'
        }}>
          Preparing experience...
        </p>
      </div>

      {/* ── Main Content (hidden until ready) ── */}
      <div
        ref={contentRef}
        style={{ opacity: 0, willChange: 'opacity', minHeight: '100vh' }}
      >
        {children}
      </div>
    </>
  )
}