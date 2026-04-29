'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function SpinnerArc({ speed, color, size, thickness }) {
  const svgRef = useRef(null)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    gsap.set(el, { rotation: 0, transformOrigin: 'center center' })
    const tween = gsap.to(el, {
      rotation: 360, duration: speed,
      ease: 'none', repeat: -1,
    })
    return () => tween.kill()
  }, [speed])

  const r = (size - thickness) / 2
  const circumference = 2 * Math.PI * r
  const dashArray = circumference * 0.75 // 75% visible arc

  return (
    <svg ref={svgRef} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Track */}
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="rgba(255,255,255,0.1)"
        strokeWidth={thickness}
      />
      {/* Arc */}
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color}
        strokeWidth={thickness}
        strokeDasharray={`${dashArray} ${circumference}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}
