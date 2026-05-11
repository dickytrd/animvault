'use client'
import { useState, useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function FlipCard({ frontContent, backContent, autoFlipDelay = 30000 }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (isFlipped) {
      // Auto flip back after 30s
      timerRef.current = setTimeout(() => {
        setIsFlipped(false)
      }, autoFlipDelay)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isFlipped, autoFlipDelay])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      ref={cardRef}
      onClick={handleFlip}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        cursor: 'pointer',
      }}
    >
      {/* Front */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {frontContent}
      </div>

      {/* Back */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        {backContent}
      </div>
    </div>
  )
}