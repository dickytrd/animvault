'use client'

import { useEffect, useRef } from 'react'

export function WaterCursor({ color = 'rgba(37, 99, 235, 0.15)', size = 120, decay = 0.92 }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight

    // Resize canvas
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Particle class for water ripple
    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.radius = Math.random() * 3 + 2
        this.life = 1
        this.maxLife = 60 + Math.random() * 40
        this.hue = Math.random() * 20 + 200 // Blue-ish range
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.vx *= decay
        this.vy *= decay
        this.life -= 1 / this.maxLife
        this.radius *= 0.98
        return this.life > 0 && this.radius > 0.5
      }

      draw(ctx) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        )
        gradient.addColorStop(0, `hsla(${this.hue}, 80%, 70%, ${this.life * 0.4})`)
        gradient.addColorStop(0.5, `hsla(${this.hue}, 60%, 60%, ${this.life * 0.15})`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    // Mouse/touch tracking
    const handleMove = (e) => {
      const x = e.clientX || (e.touches?.[0]?.clientX)
      const y = e.clientY || (e.touches?.[0]?.clientY)
      if (x == null || y == null) return
      
      mouseRef.current = { x, y, isMoving: true }
      
      // Spawn particles on move
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push(new Particle(
          x + (Math.random() - 0.5) * 20,
          y + (Math.random() - 0.5) * 20
        ))
      }
    }

    const handleLeave = () => {
      mouseRef.current.isMoving = false
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      // Update & draw particles ONLY (removed the circle)
      particlesRef.current = particlesRef.current.filter(p => {
        const alive = p.update()
        if (alive) p.draw(ctx)
        return alive
      })

      ctx.globalCompositeOperation = 'source-over'
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Event listeners
    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('touchmove', handleMove, { passive: true })
    window.addEventListener('mouseleave', handleLeave)

    // Disable on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    if (isMobile) {
      canvas.style.display = 'none'
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      particlesRef.current = []
    }
  }, [color, size, decay])

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
        mixBlendMode: 'screen',
      }}
    />
  )
}