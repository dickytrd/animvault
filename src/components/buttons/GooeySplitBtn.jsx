'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function GooeySplitBtn({ 
  label = 'Hover Me',
  activeLabel = 'Click Me',
  color = '#34495e',
  width = 160,
  height = 54
}) {
  const containerRef = useRef(null)
  const mainRef = useRef(null)
  const arrowRef = useRef(null)
  const textOldRef = useRef(null)
  const textNewRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const main = mainRef.current
    const arrow = arrowRef.current
    const textOld = textOldRef.current
    const textNew = textNewRef.current
    
    if (!container || !main || !arrow || !textOld || !textNew) return

    // Initial state - OVERLAPPING
    gsap.set(arrow, { 
      x: width - height/2,
      scale: 1,
      opacity: 1 
    })

    // Text mask setup
    gsap.set(textNew, { y: '100%' })
    gsap.set(textOld, { y: '0%' })

    let tl = null

    const onEnter = () => {
      if (tl) tl.kill()

      tl = gsap.timeline()
        // Text slide animation
        .to(textOld, {
          y: '-100%',
          duration: 0.3,
          ease: 'power2.inOut'
        })
        .to(textNew, {
          y: '0%',
          duration: 0.3,
          ease: 'power2.inOut'
        }, '<')
        
        // Main button shrinks
        .to(main, {
          width: width * 0.7,
          duration: 0.5,
          ease: 'power2.inOut'
        }, '-=0.2')
        
        // Arrow button moves right
        .to(arrow, {
          x: width + 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)'
        }, '-=0.4')
    }

    const onLeave = () => {
      if (tl) tl.kill()

      tl = gsap.timeline()
        .to(arrow, {
          x: width - height/2,
          duration: 0.4,
          ease: 'power2.inOut'
        })
        .to(main, {
          width: width,
          duration: 0.4,
          ease: 'power2.inOut'
        }, '-=0.3')
        .to(textNew, {
          y: '100%',
          duration: 0.3,
          ease: 'power2.inOut'
        }, '-=0.3')
        .to(textOld, {
          y: '0%',
          duration: 0.3,
          ease: 'power2.inOut'
        }, '<')
    }

    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mouseleave', onLeave)

    return () => {
      // ✅ FIX: Check if container exists before removing listeners
      if (container) {
        container.removeEventListener('mouseenter', onEnter)
        container.removeEventListener('mouseleave', onLeave)
      }
      if (tl) tl.kill()
    }
  }, [width, height])

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      
      {/* SVG Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo-split">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
              result="goo" 
            />
            <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>

      {/* Container */}
      <div style={{
        position: 'relative',
        width: `${width + 80}px`,
        height: `${height}px`,
        filter: 'url(#goo-split)',
      }}>
        
        {/* Main Button */}
        <div
          ref={mainRef}
          style={{
            position: 'absolute',
            left: 0,
            width: `${width}px`,
            height: `${height}px`,
            background: color,
            borderRadius: `${height/2}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'inherit',
            fontSize: '15px',
            fontWeight: '600',
            color: '#fff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            zIndex: 2,
            cursor: 'pointer',
          }}
        >
          {/* Text Mask Container - FIXED HEIGHT */}
          <div style={{ 
            position: 'relative', 
            height: `${height}px`, 
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span 
              ref={textOldRef}
              style={{ 
                position: 'absolute', 
                width: '100%',
                textAlign: 'center',
                transform: 'translateY(0)',
              }}
            >
              {label}
            </span>
            <span 
              ref={textNewRef}
              style={{ 
                position: 'absolute', 
                width: '100%',
                textAlign: 'center',
                transform: 'translateY(100%)',
              }}
            >
              {activeLabel}
            </span>
          </div>
        </div>

        {/* Arrow Button */}
        <div
          ref={arrowRef}
          style={{
            position: 'absolute',
            left: 0,
            width: `${height}px`,
            height: `${height}px`,
            background: color,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            cursor: 'pointer',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

      </div>
    </div>
  )
}