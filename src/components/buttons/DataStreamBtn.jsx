'use client'
import { useEffect, useRef, useCallback } from 'react'
import { gsap } from '@/lib/gsap'

export function DataStreamBtn({ 
  density = 30, 
  convergeSpeed = 0.4, 
  burstRadius = 60, 
  streamOpacity = 0.4, 
  label = 'EXECUTE' 
}) {
  const btnRef = useRef(null)
  const textRef = useRef(null)
  const streamRef = useRef(null)
  const charsRef = useRef([])
  const loopTweensRef = useRef([])
  const flickerRef = useRef(null)
  
  const CHARS = '01'

  useEffect(() => {
    const container = streamRef.current
    if (!container) return

    container.innerHTML = ''
    charsRef.current = []
    loopTweensRef.current = []

    // 1. Create Pool
    for (let i = 0; i < density; i++) {
      const span = document.createElement('span')
      span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
      span.style.cssText = `
        position: absolute;
        font-family: monospace;
        font-size: 11px;
        font-weight: bold;
        color: var(--accent);
        pointer-events: none;
        user-select: none;
        opacity: ${streamOpacity};
        left: ${Math.random() * 100}%;
        top: ${gsap.utils.random(-20, 80)}%;
      `
      container.appendChild(span)
      charsRef.current.push(span)
    }

    // 2. Matrix Flicker (Background noise)
    if (flickerRef.current) clearInterval(flickerRef.current)
    flickerRef.current = setInterval(() => {
      charsRef.current.forEach(char => {
        if (Math.random() > 0.7) {
          char.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      })
    }, 80)

    // 3. Continuous Loop (NEVER KILLED, NEVER PAUSED)
    charsRef.current.forEach((char) => {
      const tween = gsap.to(char, {
        top: "110%",
        duration: gsap.utils.random(1.2, 2.2),
        delay: gsap.utils.random(0, 2.5),
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          // Seamless reset
          gsap.set(char, { top: "-20%" })
          char.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      })
      loopTweensRef.current.push(tween)
    })

    return () => {
      loopTweensRef.current.forEach(t => t.kill())
      if (flickerRef.current) clearInterval(flickerRef.current)
    }
  }, [density, streamOpacity])

  // ── Hover: Only Scale & Opacity ──
  const onEnter = useCallback(() => {
    gsap.to(charsRef.current, {
      scale: 0.3,
      opacity: 0,
      duration: convergeSpeed,
      ease: "power2.in",
      stagger: { each: 0.015, from: "random" },
      overwrite: "auto" // ✅ CRITICAL: Only overwrites scale/opacity, leaves 'top' loop alone
    })

    gsap.to(textRef.current, {
      opacity: 1, 
      scale: 1, 
      letterSpacing: "0.12em", 
      color: "#fff",
      duration: convergeSpeed * 0.8, 
      ease: "back.out(1.4)"
    })
  }, [convergeSpeed])

  // ── Leave: Only Reverse Scale & Opacity ──
  const onLeave = useCallback(() => {
    gsap.to(charsRef.current, {
      scale: 1,
      opacity: streamOpacity,
      duration: convergeSpeed,
      ease: "power2.out",
      overwrite: "auto" // ✅ CRITICAL: Coexists with loop tween
    })

    gsap.to(textRef.current, {
      opacity: 0.7, 
      scale: 0.95, 
      letterSpacing: "0.08em",
      duration: convergeSpeed, 
      ease: "power2.out"
    })
  }, [convergeSpeed, streamOpacity])

  // ── Click: Packet Burst ──
  const onClick = useCallback(() => {
    const rect = btnRef.current.getBoundingClientRect()
    const cx = rect.width / 2
    const cy = rect.height / 2
    const count = 16

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const p = document.createElement('div')
      p.style.cssText = `
        position:absolute; left:${cx}px; top:${cy}px;
        width:4px; height:4px; background:#fff;
        border-radius:50%; pointer-events:none; transform:translate(-50%,-50%);
        box-shadow: 0 0 6px var(--accent);
      `
      btnRef.current.appendChild(p)

      const dist = burstRadius * gsap.utils.random(0.6, 1.2)
      gsap.to(p, {
        x: Math.cos(angle) * dist, y: Math.sin(angle) * dist,
        opacity: 0, scale: 0, duration: 0.45, ease: "power2.out",
        onComplete: () => p.remove()
      })
    }

    gsap.to(btnRef.current, { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1, ease: "power2.in" })
  }, [burstRadius])

  return (
    <button
      ref={btnRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        position: "relative", overflow: "hidden",
        padding: "14px 32px", background: "#000",
        color: "var(--accent)", border: "1px solid var(--border)",
        borderRadius: "4px", fontSize: "13px", fontWeight: "600",
        fontFamily: "monospace", letterSpacing: "0.08em",
        cursor: "pointer", transform: "translate3d(0,0,0)",
        minWidth: "120px", display: "flex", alignItems: "center",
        justifyContent: "center", transition: "none",
        boxShadow: "inset 0 0 20px rgba(0,0,0,0.8)"
      }}
    >
      {/* Gradient Mask for Seamless Edges */}
      <div 
        ref={streamRef} 
        style={{ 
          position: "absolute", inset: 0, pointerEvents: "none",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"
        }} 
      />
      
      <span ref={textRef} style={{ position: "relative", zIndex: 2, opacity: 0.7, mixBlendMode: "screen" }}>
        {label}
      </span>
    </button>
  )
}