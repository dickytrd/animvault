'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * SmoothScroll
 * ────────────
 * Wraps the app with Lenis smooth scroll.
 * Syncs Lenis raf with GSAP ticker so ScrollTrigger
 * works perfectly with smooth scroll — no position drift.
 *
 * Expose lenis instance on window for marquee velocity access.
 */
export function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration:   1.2,
      easing:     (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    })

    // Expose globally for velocity access (marquee)
    window.__lenis = lenis
    lenisRef.current = lenis

    // Sync with GSAP ticker — critical for ScrollTrigger accuracy
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Keep ScrollTrigger in sync
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return <>{children}</>
}