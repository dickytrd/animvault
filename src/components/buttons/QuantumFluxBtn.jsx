'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function QuantumFluxBtn({
  superpositionBlur = 4,
  collapseSpeed = 0.4,
  teleportDistance = 30,
  showTrail = true,
  label = 'Flux State'
}) {
  const btnRef = useRef(null)
  const mainRef = useRef(null)
  const ghost1Ref = useRef(null)
  const ghost2Ref = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    const btn = btnRef.current
    const main = mainRef.current
    const g1 = ghost1Ref.current
    const g2 = ghost2Ref.current
    const trail = trailRef.current
    if (!btn || !main || !g1 || !g2 || !trail) return

    // 🔹 Initial: Superposition (blur + random offset)
    gsap.set([g1, g2], {
      opacity: 0.5,
      filter: `blur(${superpositionBlur}px)`,
      x: gsap.utils.random(-12, 12),
      y: gsap.utils.random(-12, 12),
      color: 'var(--accent)'
    })
    gsap.set(main, { opacity: 0.85, filter: `blur(${superpositionBlur}px)` })
    gsap.set(trail, { opacity: 0, scale: 0.9, filter: 'blur(3px)' })

    // 🔹 Hover: Wave Function Collapse
    const onEnter = () => {
      gsap.to([main, g1, g2], {
        opacity: 1,
        filter: 'blur(0px)',
        x: 0, y: 0,
        duration: collapseSpeed,
        ease: 'power2.out',
        overwrite: true
      })
    }

    // 🔹 Leave: Return to Superposition
    const onLeave = () => {
      gsap.to([main, g1, g2], {
        opacity: 1,
        filter: `blur(${superpositionBlur}px)`,
        x: gsap.utils.random(-12, 12),
        y: gsap.utils.random(-12, 12),
        duration: collapseSpeed * 1.5,
        ease: 'power2.inOut',
        overwrite: true
      })
    }

    // 🔹 Click: Quantum Teleport
    const onClick = (e) => {
      e.preventDefault()
      gsap.killTweensOf([btn, main, g1, g2, trail])

      const shiftX = gsap.utils.random(-teleportDistance, teleportDistance)
      const shiftY = gsap.utils.random(-teleportDistance, teleportDistance)

      // Interference Trail (fades at old position)
      if (showTrail) {
        gsap.fromTo(trail, 
          { opacity: 0.7, scale: 1, filter: 'blur(2px)' },
          { opacity: 0, scale: 1.3, duration: 0.5, ease: 'power2.out' }
        )
      }

      // Teleport Sequence
      gsap.timeline()
        .to(btn, { scale: 0.85, duration: 0.12, ease: 'power2.in' })
        .to(btn, { x: shiftX, y: shiftY, duration: 0 }) // Instant jump
        .to(btn, { scale: 1, duration: 0.35, ease: 'back.out(1.4)' })
        .to([main, g1, g2], {
          opacity: 1,
          filter: 'blur(0px)',
          x: 0, y: 0,
          duration: 0.4,
          ease: 'power2.out'
        }, '-=0.2')
    }

    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)
    btn.addEventListener('click', onClick)

    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
      btn.removeEventListener('click', onClick)
      gsap.killTweensOf([btn, main, g1, g2, trail])
    }
  }, [superpositionBlur, collapseSpeed, teleportDistance, showTrail])

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
        overflow: 'visible',
        transform: 'translate3d(0,0,0)',
        minWidth: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Main Text */}
      <span ref={mainRef} style={{ position: 'relative', zIndex: 2 }}>{label}</span>
      
      {/* Ghost Layers (Superposition) */}
      <span ref={ghost1Ref} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1 }}>{label}</span>
      <span ref={ghost2Ref} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1 }}>{label}</span>
      
      {/* Interference Trail */}
      <span ref={trailRef} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 0, opacity: 0, color: 'var(--accent)' }}>{label}</span>
    </button>
  )
}