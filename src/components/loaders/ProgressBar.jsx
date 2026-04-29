'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function ProgressBar({ speed, color, trackColor, height }) {
  const barRef   = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 })
    tl.to(bar, { scaleX: 1, duration: speed, ease: 'power1.inOut' })
      .to(bar, { opacity: 0, duration: 0.2, ease: 'power2.in' })
      .set(bar,  { scaleX: 0, opacity: 1 })
    return () => tl.kill()
  }, [speed])

  return (
    <div ref={trackRef} style={{
      width: '200px', height, background: trackColor,
      borderRadius: height, overflow: 'hidden', position: 'relative',
    }}>
      <div ref={barRef} style={{
        position: 'absolute', inset: 0,
        background: color, borderRadius: height,
      }} />
    </div>
  )
}
