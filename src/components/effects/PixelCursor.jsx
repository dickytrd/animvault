'use client'

import { useEffect, useRef } from 'react'

export function PixelCursor({ 
  gridSize = 8, 
  density = 0.4, 
  gravity = 0.3,
  colors = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'] // Biru tech theme
}) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const lastPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Set canvas size (pixel-accurate)
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Mouse handler
    const handleMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      
      // Spawn particles with density control
      if (Math.random() < density) {
        // Snap to grid
        const gridX = Math.round(x / gridSize) * gridSize
        const gridY = Math.round(y / gridSize) * gridSize
        
        particlesRef.current.push({
          x: gridX + (Math.random() - 0.5) * 2,
          y: gridY + (Math.random() - 0.5) * 2,
          size: gridSize,
          life: 1,
          decay: 0.015 + Math.random() * 0.01,
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * 0.2, // Start slightly upward
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
      
      lastPosRef.current = { x, y }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.imageSmoothingEnabled = false // Crucial for pixelated look

      particlesRef.current = particlesRef.current.filter(p => {
        // Physics
        p.x += p.vx
        p.y += p.vy
        p.vy += gravity * 0.01 // Subtle Minecraft-like gravity
        p.life -= p.decay
        p.size *= 0.98

        if (p.life > 0 && p.size > 1) {
          ctx.globalAlpha = p.life
          ctx.fillStyle = p.color
          ctx.fillRect(p.x, p.y, p.size, p.size)
          ctx.globalAlpha = 1
          return true
        }
        return false
      })

      requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', handleMove)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
    }
  }, [gridSize, density, gravity, colors])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 50,
        imageRendering: 'pixelated', // Enforce crisp pixels
      }}
    />
  )
}