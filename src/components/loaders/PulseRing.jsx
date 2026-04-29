'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function PulseRing({ speed, color, size, thickness }) {
  const ring1Ref = useRef(null)
  const ring2Ref = useRef(null)

  useEffect(() => {
    const r1 = ring1Ref.current
    const r2 = ring2Ref.current
    if (!r1 || !r2) return

    const pulse = (el, delay) => {
      gsap.set(el, { scale: 0.3, opacity: 1 })
      const tl = gsap.timeline({ repeat: -1, delay })
      tl.to(el, { scale: 2.2, opacity: 0, duration: speed, ease: 'power1.out' })
        .set(el, { scale: 0.3, opacity: 1 })
      return tl
    }

    const tl1 = pulse(r1, 0)
    const tl2 = pulse(r2, speed * 0.5)

    return () => { tl1.kill(); tl2.kill() }
  }, [speed])

  const ringStyle = {
    position: 'absolute',
    width: size, height: size,
    border: `${thickness}px solid ${color}`,
    borderRadius: '50%',
  }

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div ref={ring1Ref} style={ringStyle} />
      <div ref={ring2Ref} style={ringStyle} />
      {/* Center dot */}
      <div style={{ width: size * 0.12, height: size * 0.12, borderRadius: '50%', background: color, position: 'relative', zIndex: 1 }} />
    </div>
  )
}
