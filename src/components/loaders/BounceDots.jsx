'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function BounceDots({ speed, color, size }) {
  const dotsRef = useRef([])

  useEffect(() => {
    const dots = dotsRef.current.filter(Boolean)
    const tl = gsap.timeline({ repeat: -1 })

    // Each dot bounces independently with offset phase
    dots.forEach((dot, i) => {
      tl.to(dot, { y: -(size * 2), duration: speed * 0.5, ease: 'power2.out' }, i * speed * 0.2)
        .to(dot, { y: 0,           duration: speed * 0.5, ease: 'bounce.out'  }, `<${speed * 0.5}`)
    })

    return () => tl.kill()
  }, [speed, size])

  return (
    <div style={{ display: 'flex', gap: `${size}px`, alignItems: 'flex-end', height: `${size * 4}px` }}>
      {[0, 1, 2].map((i) => (
        <div key={i} ref={(el) => (dotsRef.current[i] = el)} style={{
          width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0,
        }} />
      ))}
    </div>
  )
}
