'use client'
import { useEffect, useRef, useCallback } from 'react'
import { gsap } from '@/lib/gsap'

export function LiquidWaveBtn({ 
  label = 'View more',
  bgColor = '#003845',
  waveColor = '#39FF14',
  width = 220,
  height = 64,
  arrowIcon = true
}) {
  const btnRef = useRef(null)
  const textRef = useRef(null)
  const svgRef = useRef(null)
  const circle1Ref = useRef(null)
  const circle2Ref = useRef(null)
  const circle3Ref = useRef(null)
  const circle4Ref = useRef(null)

  // Default positions - forming perfect pill shape
  const getDefaultPositions = () => [
    { cx: width * 0.25, cy: height / 2, r: height * 0.5 },
    { cx: width * 0.42, cy: height / 2, r: height * 0.5 },
    { cx: width * 0.58, cy: height / 2, r: height * 0.5 },
    { cx: width * 0.75, cy: height / 2, r: height * 0.5 },
  ]

  useEffect(() => {
    const btn = btnRef.current
    const text = textRef.current
    const circles = [circle1Ref.current, circle2Ref.current, circle3Ref.current, circle4Ref.current]
    
    if (!btn || !text || circles.some(c => !c)) return

    // Set initial state - perfect pill shape
    const defaultPos = getDefaultPositions()
    circles.forEach((circle, i) => {
      gsap.set(circle, { 
        attr: { 
          cx: defaultPos[i].cx, 
          cy: defaultPos[i].cy, 
          r: defaultPos[i].r 
        } 
      })
    })

    let tl = null

    const onEnter = () => {
      if (tl) tl.kill()
      
      tl = gsap.timeline()

      // LIQUID WAVE MOTION - Left to Right
      // Circle 1 (Left edge) - moves right and down
      tl.to(circle1Ref.current, {
        attr: { 
          cx: width * 0.35,
          cy: height * 0.6,
          r: height * 0.4
        },
        duration: 0.4,
        ease: 'power2.inOut'
      })

      // Circle 2 - moves up and right (creates bulge)
      .to(circle2Ref.current, {
        attr: { 
          cx: width * 0.5,
          cy: height * 0.35,
          r: height * 0.6
        },
        duration: 0.4,
        ease: 'power2.inOut'
      }, '-=0.2')

      // Circle 3 - moves down and right (creates wave)
      .to(circle3Ref.current, {
        attr: { 
          cx: width * 0.6,
          cy: height * 0.65,
          r: height * 0.6
        },
        duration: 0.4,
        ease: 'power2.inOut'
      }, '-=0.2')

      // Circle 4 (Right edge) - moves right and up
      .to(circle4Ref.current, {
        attr: { 
          cx: width * 0.85,
          cy: height * 0.4,
          r: height * 0.45
        },
        duration: 0.4,
        ease: 'power2.inOut'
      }, '-=0.2')

      // Settle back to pill shape (one-shot complete)
      .to(circles, {
        attr: { r: height * 0.5 },
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.inOut'
      }, '+=0.2')
      
      .to(circle1Ref.current, { attr: { cx: width * 0.25, cy: height/2 }, duration: 0.3 }, '<')
      .to(circle2Ref.current, { attr: { cx: width * 0.42, cy: height/2 }, duration: 0.3 }, '<')
      .to(circle3Ref.current, { attr: { cx: width * 0.58, cy: height/2 }, duration: 0.3 }, '<')
      .to(circle4Ref.current, { attr: { cx: width * 0.75, cy: height/2 }, duration: 0.3 }, '<')

      // Text subtle float
      .to(text, {
        y: -2,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.6')
      .to(text, {
        y: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      }, '+=0.2')
    }

    const onLeave = () => {
      if (tl) tl.kill()
      
      // Smooth return to default pill shape
      const defaultPos = getDefaultPositions()
      
      gsap.to(circles, {
        attr: { r: height * 0.5 },
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.inOut'
      })
      
      circles.forEach((circle, i) => {
        gsap.to(circle, {
          attr: { 
            cx: defaultPos[i].cx, 
            cy: defaultPos[i].cy 
          },
          duration: 0.4,
          ease: 'power2.inOut',
          delay: i * 0.05
        })
      })
      
      gsap.set(text, { y: 0 })
    }

    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)

    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
      if (tl) tl.kill()
    }
  }, [width, height])

  return (
    <button
      ref={btnRef}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        background: 'transparent',
        border: 'none',
        borderRadius: '9999px',
        cursor: 'pointer',
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'inherit',
        fontSize: '16px',
        fontWeight: '500',
        color: '#fff',
        transition: 'none',
        zIndex: 10,
      }}
    >
      {/* SVG Filter for Gooey Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="liquid-gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* 1. Green Background Layer (Pill shape - always visible) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: waveColor,
          borderRadius: '9999px',
          zIndex: 0,
        }}
      />

      {/* 2. Blue Morphing Layer (SVG circles with gooey filter) */}
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{
          position: 'absolute',
          filter: 'url(#liquid-gooey)',
          zIndex: 1,
          overflow: 'visible',
        }}
      >
        <circle ref={circle1Ref} fill={bgColor} />
        <circle ref={circle2Ref} fill={bgColor} />
        <circle ref={circle3Ref} fill={bgColor} />
        <circle ref={circle4Ref} fill={bgColor} />
      </svg>

      {/* 3. Text & Icon (Top Layer) */}
      <div
        ref={textRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span>{label}</span>
        {arrowIcon && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </div>
    </button>
  )
}