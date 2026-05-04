'use client'

import { useEffect, useRef } from 'react'

export function TrailCursor({ 
  color = '#84cc16',
  width = 3,
  maxPoints = 100,         
  smoothness = 0.15,       
  fadeSpeed = 0.025,       
  taperStart = 0.6         
}) {
  const canvasRef = useRef(null)
  const pointsRef = useRef([])
  
  // ✅ FIX 1: Gunakan default value aman (bukan window)
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })
  
  const animationRef = useRef(null)
  const mouseHistoryRef = useRef([])

  useEffect(() => {
    // ✅ FIX 2: Set posisi awal di sini (Client Side only)
    mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    smoothRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    let widthPx = window.innerWidth
    let heightPx = window.innerHeight

    const resize = () => {
      widthPx = window.innerWidth
      heightPx = window.innerHeight
      canvas.width = widthPx * window.devicePixelRatio
      canvas.height = heightPx * window.devicePixelRatio
      canvas.style.width = `${widthPx}px`
      canvas.style.height = `${heightPx}px`
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMove = (e) => {
      mouseRef.current = { 
        x: e.clientX || e.touches?.[0]?.clientX, 
        y: e.clientY || e.touches?.[0]?.clientY 
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, widthPx, heightPx)
      
      const dx = mouseRef.current.x - smoothRef.current.x
      const dy = mouseRef.current.y - smoothRef.current.y
      
      smoothRef.current.x += dx * smoothness
      smoothRef.current.y += dy * smoothness
      
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      // Tambah titik jika gerak atau belum ada titik
      if (dist > 0.3 || pointsRef.current.length === 0) {
        pointsRef.current.push({
          x: smoothRef.current.x,
          y: smoothRef.current.y,
          life: 1.0 
        })
        
        mouseHistoryRef.current.push({ x: smoothRef.current.x, y: smoothRef.current.y })
        if (mouseHistoryRef.current.length > maxPoints) {
          mouseHistoryRef.current.shift()
        }
      }
      
      // Kurangi life SEMUA titik
      for (let i = 0; i < pointsRef.current.length; i++) {
        pointsRef.current[i].life -= fadeSpeed
      }
      
      // Hapus titik mati
      pointsRef.current = pointsRef.current.filter(p => p.life > 0)
      
      // Batasi jumlah titik
      if (pointsRef.current.length > maxPoints) {
        pointsRef.current = pointsRef.current.slice(-maxPoints)
      }
      
      if (pointsRef.current.length > 2) {
        const totalPoints = pointsRef.current.length
        
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        
        for (let i = 1; i < totalPoints; i++) {
          const prev = pointsRef.current[i - 1]
          const curr = pointsRef.current[i]
          
          const segmentLife = (prev.life + curr.life) / 2
          if (segmentLife < 0.01) continue
          
          const opacity = Math.max(0, segmentLife)
          const progress = i / totalPoints
          
          const lineWidth = width * (progress < taperStart 
            ? 0.2 + (progress / taperStart) * 0.8  
            : 1.0                                    
          )
          
          ctx.beginPath()
          ctx.moveTo(prev.x, prev.y)
          ctx.lineTo(curr.x, curr.y)
          ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
          ctx.lineWidth = lineWidth * Math.max(0.3, opacity)
          ctx.stroke()
        }
        
        const tip = pointsRef.current[totalPoints - 1]
        if (tip.life > 0.3) {
          const glowGradient = ctx.createRadialGradient(
            tip.x, tip.y, 0,
            tip.x, tip.y, width * 4
          )
          const glowAlpha = Math.min(1, tip.life * 1.5)
          glowGradient.addColorStop(0, `${color}${Math.floor(glowAlpha * 60).toString(16).padStart(2, '0')}`)
          glowGradient.addColorStop(0.5, `${color}${Math.floor(glowAlpha * 20).toString(16).padStart(2, '0')}`)
          glowGradient.addColorStop(1, 'transparent')
          
          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(tip.x, tip.y, width * 4, 0, Math.PI * 2)
          ctx.fill()
        }
        
        ctx.beginPath()
        ctx.arc(tip.x, tip.y, width * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('touchmove', handleMove, { passive: true })
    
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [color, width, maxPoints, smoothness, fadeSpeed, taperStart])

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
      }}
    />
  )
}