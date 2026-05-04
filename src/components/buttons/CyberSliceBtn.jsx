'use client'
import { useEffect, useRef, useCallback } from 'react'
import { gsap } from '@/lib/gsap'

export function CyberSliceBtn({ 
  gapSize = 12, 
  speed = 0.4, 
  innerColor = 'var(--accent)',
  label = 'ACCESS GRANTED' 
}) {
  const btnRef = useRef(null)
  const topRef = useRef(null)
  const botRef = useRef(null)
  const coreRef = useRef(null)

  useEffect(() => {
    // 🔑 FIX: Initial state = INSET(0) → Text utuh, overlapping sempurna → terlihat 1 line solid
    gsap.set([topRef.current, botRef.current], { 
      clipPath: 'inset(0)', 
      y: 0,
      willChange: 'clip-path, transform' 
    })
    gsap.set(coreRef.current, { opacity: 0, scale: 0.8 })
  }, [])

  const onEnter = useCallback(() => {
    // Split: Top shows upper half & moves up, Bottom shows lower half & moves down
    gsap.to(topRef.current, {
      clipPath: 'inset(0 0 50% 0)',
      y: -gapSize,
      duration: speed,
      ease: 'power3.out',
      overwrite: 'auto'
    })

    gsap.to(botRef.current, {
      clipPath: 'inset(50% 0 0 0)',
      y: gapSize,
      duration: speed,
      ease: 'power3.out',
      overwrite: 'auto'
    })

    // Reveal Energy Core
    gsap.to(coreRef.current, {
      opacity: 1,
      scale: 1,
      duration: speed * 0.8,
      ease: 'back.out(1.5)',
      overwrite: 'auto'
    })

    // Border Glow
    gsap.to(btnRef.current, {
      borderColor: innerColor,
      boxShadow: `0 0 20px ${innerColor}33`,
      duration: speed,
      overwrite: 'auto'
    })
  }, [gapSize, speed, innerColor])

  const onLeave = useCallback(() => {
    // Reassemble: Back to full inset, snap to center
    gsap.to(topRef.current, {
      clipPath: 'inset(0)',
      y: 0,
      duration: speed,
      ease: 'power3.inOut',
      overwrite: 'auto'
    })

    gsap.to(botRef.current, {
      clipPath: 'inset(0)',
      y: 0,
      duration: speed,
      ease: 'power3.inOut',
      overwrite: 'auto'
    })

    // Hide Core
    gsap.to(coreRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: speed * 0.6,
      ease: 'power2.in',
      overwrite: 'auto'
    })

    // Reset Glow
    gsap.to(btnRef.current, {
      borderColor: 'var(--border)',
      boxShadow: '0 0 0px transparent',
      duration: speed,
      overwrite: 'auto'
    })
  }, [speed])

  return (
    <button
      ref={btnRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        width: '200px',
        height: '54px',
        background: '#050505',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        cursor: 'pointer',
        overflow: 'hidden', // 🔑 Masks slices so they don't fly out of bounds
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        fontSize: '13px',
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        color: '#fff',
        transition: 'none',
      }}
    >
      {/* 🔹 Energy Core (Hidden behind, revealed in gap) */}
      <div ref={coreRef} style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `linear-gradient(90deg, transparent, ${innerColor}, transparent)`,
        opacity: 0, zIndex: 0,
      }}>
        <span style={{ color: '#000', fontWeight: '900', fontSize: '10px', letterSpacing: '0.2em' }}>
          ACTIVE
        </span>
      </div>

      {/* 🔹 Slices Container */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        
        {/* TOP SLICE */}
        <div ref={topRef} style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '50%',
          overflow: 'hidden', zIndex: 1,
        }}>
          <span style={{
            position: 'absolute', top: '50%', left: 0, width: '100%',
            transform: 'translateY(-50%)', textAlign: 'center', whiteSpace: 'nowrap'
          }}>
            {label}
          </span>
        </div>

        {/* BOTTOM SLICE */}
        <div ref={botRef} style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%',
          overflow: 'hidden', zIndex: 1,
        }}>
          <span style={{
            position: 'absolute', top: '50%', left: 0, width: '100%',
            transform: 'translateY(-50%)', textAlign: 'center', whiteSpace: 'nowrap'
          }}>
            {label}
          </span>
        </div>
        
      </div>
    </button>
  )
}