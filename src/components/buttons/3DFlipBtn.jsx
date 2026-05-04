'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function ThreeDFlipBtn({ duration = 0.4, axis = 'Y', label, secondary }) {
  const btnRef = useRef(null)
  const wrapperRef = useRef(null)
  const frontRef = useRef(null)
  const backRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const front = frontRef.current
    const back = backRef.current
    if (!wrapper || !front || !back) return

    // Kill existing tweens
    gsap.killTweensOf(wrapper)

    // Set initial state
    gsap.set(wrapper, { 
      rotationY: axis === 'Y' ? 0 : 0,
      rotationX: axis === 'X' ? 0 : 0,
      transformStyle: 'preserve-3d',
    })
    
    gsap.set(back, {
      rotationY: axis === 'Y' ? 180 : 0,
      rotationX: axis === 'X' ? 180 : 0,
      backfaceVisibility: 'hidden',
    })
    
    gsap.set(front, {
      backfaceVisibility: 'hidden',
    })

    const onEnter = () => {
      const rotationProps = axis === 'Y' 
        ? { rotationY: -180 }
        : { rotationX: -180 }
      
      gsap.to(wrapper, {
        ...rotationProps,
        duration: duration,
        ease: 'power2.inOut',
        overwrite: true,
      })
    }

    const onLeave = () => {
      gsap.to(wrapper, {
        rotationY: axis === 'Y' ? 0 : 0,
        rotationX: axis === 'X' ? 0 : 0,
        duration: duration,
        ease: 'power2.inOut',
        overwrite: true,
      })
    }

    const btn = btnRef.current
    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)
    
    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf(wrapper)
    }
  }, [duration, axis])

  return (
    <button 
      ref={btnRef}
      style={{
        position: 'relative',
        width: 'fit-content',
        padding: 0,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        perspective: '600px',
      }}
    >
      {/* Rotating Wrapper */}
      <div
        ref={wrapperRef}
        style={{
          position: 'relative',
          width: 'fit-content',
          transformStyle: 'preserve-3d',
          transition: 'none',
        }}
      >
        {/* Front Face */}
        <div 
          ref={frontRef}
          style={{
            padding: '12px 32px',
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            fontFamily: 'inherit',
            backfaceVisibility: 'hidden',
          }}
        >
          {label}
        </div>

        {/* Back Face - Absolute positioned on top */}
        <div 
          ref={backRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            padding: '12px 32px',
            background: 'var(--surface-2)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            fontFamily: 'inherit',
            backfaceVisibility: 'hidden',
          }}
        >
          {secondary || 'Click here'}
        </div>
      </div>
    </button>
  )
}