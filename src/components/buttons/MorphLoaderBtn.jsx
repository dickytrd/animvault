'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function MorphLoaderBtn({ loadingDuration = 1.5, successDuration = 0.8, label = 'Submit' }) {
  const btnRef = useRef(null)
  const textRef = useRef(null)
  const spinnerRef = useRef(null)
  const checkRef = useRef(null)
  const isAnimating = useRef(false)

  useEffect(() => {
    const btn = btnRef.current
    const text = textRef.current
    const spinner = spinnerRef.current
    const check = checkRef.current
    if (!btn || !text || !spinner || !check) return

    // Initial setup
    gsap.set(btn, { 
      borderRadius: '8px', 
      scale: 1,
      backgroundColor: 'var(--accent)',
      overflow: 'hidden'
    })
    gsap.set(text, { opacity: 1, y: 0 })
    gsap.set(spinner, { transformOrigin: 'center center', opacity: 0, scale: 0.5, rotation: 0 })
    gsap.set(check, { transformOrigin: 'center center', opacity: 0, scale: 0.3 })

    const handleClick = () => {
      if (isAnimating.current) return
      isAnimating.current = true
      gsap.killTweensOf([btn, text, spinner, check])

      const tl = gsap.timeline({
        onComplete: () => {
          // Auto-reset sequence
          gsap.timeline({
            onComplete: () => { isAnimating.current = false }
          })
            .to(check, { opacity: 0, scale: 0.3, duration: 0.2, ease: 'power2.in' })
            .to(spinner, { rotation: 0, duration: 0.2 }, '<')
            .to(btn, { 
              backgroundColor: 'var(--accent)', 
              borderRadius: '8px', 
              scale: 1, 
              duration: 0.35, 
              ease: 'power2.inOut' 
            }, '<0.1')
            .to(text, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, '<0.1')
        }
      })

      // 1. Morph to loader (Circle via borderRadius + uniform scale)
      tl
        .to(text, { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in' })
        .to(btn, { 
          borderRadius: '50%', 
          scale: 0.85, // 🔑 Uniform shrink prevents squashing
          duration: 0.35, 
          ease: 'power2.inOut' 
        }, '<0.1')
        .to(spinner, { 
          opacity: 1, 
          scale: 1, 
          duration: 0.2, 
          ease: 'back.out(1.7)' 
        }, '-=0.1')
        .to(spinner, { 
          rotation: 360, 
          duration: loadingDuration, 
          ease: 'linear' 
        })
      
      // 2. Success state
        .to(spinner, { opacity: 0, scale: 0.5, duration: 0.15, ease: 'power2.in' })
        .to(btn, { backgroundColor: '#10b981', duration: 0.2 }, '<')
        .to(check, { opacity: 1, scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' }, '<0.05')
        .to({}, { duration: successDuration }) // Hold success state
    }

    btn.addEventListener('click', handleClick)
    return () => {
      btn.removeEventListener('click', handleClick)
      gsap.killTweensOf([btn, text, spinner, check])
    }
  }, [loadingDuration, successDuration])

  return (
    <button
      ref={btnRef}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '14px 32px',
        background: 'var(--accent)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'inherit',
        cursor: 'pointer',
        overflow: 'hidden',
        transform: 'translate3d(0,0,0)',
        minWidth: '120px',
      }}
    >
      {/* Text Label */}
      <span ref={textRef} style={{ position: 'relative', zIndex: 2 }}>{label}</span>
      
      {/* Spinner SVG */}
      <svg ref={spinnerRef} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ position: 'absolute', opacity: 0 }}>
        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
        <path d="M12 2a10 10 0 0 1 10 10" />
      </svg>

      {/* Checkmark SVG */}
      <svg ref={checkRef} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', opacity: 0 }}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </button>
  )
}