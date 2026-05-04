'use client'

import { useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

export default function PageTransition({ children, type = 'wipe' }) {
  const pathname = usePathname()
  const overlayRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    // Skip animation on first render (initial page load)
    if (isFirstRender.current) {
      isFirstRender.current = false
      // Set overlay hidden tapi siap untuk animasi nanti
      gsap.set(overlay, { 
        scaleY: 0, 
        transformOrigin: 'top center',
        visibility: 'hidden'
      })
      return
    }

    // ROUTE CHANGE: Jalankan transisi
    const tl = gsap.timeline({
      onStart: () => {
        gsap.set(overlay, { visibility: 'visible' })
      },
      onComplete: () => {
        gsap.set(overlay, { visibility: 'hidden' })
      }
    })

    if (type === 'wipe') {
      // 1. Tutup layar (dari atas ke bawah)
      tl.set(overlay, { 
        scaleY: 1, 
        transformOrigin: 'top center' 
      })
      // 2. Buka layar (dari bawah ke atas - swipe up)
      .to(overlay, {
        scaleY: 0,
        transformOrigin: 'bottom center',
        duration: 0.6,
        ease: 'power4.inOut'
      })
    } else if (type === 'fade') {
      tl.set(overlay, { opacity: 1 })
        .to(overlay, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        })
    } else if (type === 'slide') {
      tl.set(overlay, { yPercent: 0 })
        .to(overlay, {
          yPercent: -100,
          duration: 0.6,
          ease: 'power3.inOut'
        })
    }

    // Cleanup
    return () => {
      tl.kill()
    }
  }, [pathname, type])

  return (
    <>
      {/* Transition Overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--accent, #2563eb)',
          zIndex: 9999,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      />

      {/* Page Content - Force remount on route change */}
      <div key={pathname} style={{ position: 'relative', minHeight: '100vh' }}>
        {children}
      </div>
    </>
  )
}