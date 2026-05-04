'use client'

import { useEffect, useRef } from 'react'

export function ClickBurstCursor({ 
  color="#ffffff", 
  lineCount = 8, 
  length = 8, 
  speed = 4, 
  decay = 0.02 
}) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Click trigger
    const handleClick = (e) => {
      const x = e.clientX
      const y = e.clientY

      // Spawn radial lines
      for (let i = 0; i < lineCount; i++) {
        const angle = (Math.PI * 2 / lineCount) * i + (Math.random() - 0.5) * 0.4
        particlesRef.current.push({
          x, y,
          angle,
          speed: speed * (0.7 + Math.random() * 0.6),
          length,
          thickness: 1.5 + Math.random() * 0.5,
          life: 1,
          decay: decay * (0.8 + Math.random() * 0.4)
        })
      }

      // Start animation loop only when particles exist
      if (!animFrameRef.current) {
        animate()
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.lineCap = 'butt'
      ctx.lineJoin = 'miter'

      particlesRef.current = particlesRef.current.filter(p => {
        // Physics
        p.x += Math.cos(p.angle) * p.speed
        p.y += Math.sin(p.angle) * p.speed
        p.life -= p.decay
        p.speed *= 0.92    // Decelerate
        p.length *= 0.94   // Shrink

        if (p.life > 0) {
          ctx.globalAlpha = p.life
          ctx.strokeStyle = color
          ctx.lineWidth = p.thickness

          const ex = p.x + Math.cos(p.angle) * p.length
          const ey = p.y + Math.sin(p.angle) * p.length

          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(ex, ey)
          ctx.stroke()
          return true
        }
        return false
      })

      ctx.globalAlpha = 1

      // Continue loop or stop to save CPU
      if (particlesRef.current.length > 0) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        animFrameRef.current = null
      }
    }

    window.addEventListener('mousedown', handleClick)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousedown', handleClick)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [color, lineCount, length, speed, decay])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none', // Never blocks clicks on buttons/links
        zIndex: 50,
      }}
    />
  )
}