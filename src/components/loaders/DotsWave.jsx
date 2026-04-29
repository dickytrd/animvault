'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function DotsWave({ speed, size, color }) {
  const dotsRef = useRef([])

  useEffect(() => {
    const dots = dotsRef.current.filter(Boolean)
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(dots, { y: -(size * 1.5), duration: speed, stagger: speed * 0.35, ease: 'power2.out' })
      .to(dots, { y: 0,             duration: speed, stagger: speed * 0.35, ease: 'power2.in'  })
    return () => tl.kill()
  }, [speed, size])

  return (
    <div style={{ display: 'flex', gap: `${size * 0.8}px`, alignItems: 'center' }}>
      {[0, 1, 2].map((i) => (
        <div key={i} ref={(el) => (dotsRef.current[i] = el)} style={{
          width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0,
        }} />
      ))}
    </div>
  )
}
