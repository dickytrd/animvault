'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function FillSlideBtn({ duration = 0.4, label }) {
  const btnRef  = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const btn  = btnRef.current
    const fill = fillRef.current
    if (!btn || !fill) return

    // posisi awal: tidak terlihat, origin kiri
    gsap.set(fill, { scaleX: 0, transformOrigin: 'left center' })

    const onEnter = () => {
      // selalu mulai dari scaleX:0 (kiri → kanan)
      gsap.fromTo(fill,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration, ease: 'power3.out', overwrite: 'auto' }
      )
    }

    const onLeave = () => {
      // keluar ke kiri (origin kanan → scaleX:0)
      gsap.to(fill, {
        scaleX: 0,
        duration: duration * 0.8,
        ease: 'power3.in',
        transformOrigin: 'right center',
        overwrite: 'auto'
      })
      // reset origin ke kiri lagi setelah selesai
      gsap.set(fill, { transformOrigin: 'left center', delay: duration * 0.8 })
    }

    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [duration])

  return (
    <button ref={btnRef} style={{
      position: 'relative', overflow: 'hidden',
      padding: '14px 32px', background: 'transparent',
      color: 'var(--text)', border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '6px', fontSize: '14px', fontWeight: '500',
      fontFamily: 'inherit', cursor: 'pointer', zIndex: 0,
    }}>
      {/* Sliding fill background */}
      <div ref={fillRef} style={{
        position: 'absolute', inset: 0,
        background: 'var(--accent)', zIndex: -1,
      }} />
      <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
    </button>
  )
}
