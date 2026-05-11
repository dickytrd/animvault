'use client'

import { useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════
// 🎨 COLOR STATES
// D = Dark palette  |  L = Light palette
// Edit these values to change the atmosphere colors globally.
// ═══════════════════════════════════════════════════════════════
const D = {
  bg:  [10, 10, 10], sf:  [20, 20, 20], sf2: [28, 28, 28],
  tx:  [255,255,255], bd: [255,255,255],
  bdA: 0.07, bdHA: 0.14, txMA: 0.45, txSA: 0.20, acA: 0.12,
}
const L = {
  bg:  [244,243,240], sf:  [255,255,255], sf2: [235,235,234],
  tx:  [10, 10, 10],  bd: [0, 0, 0],
  bdA: 0.08, bdHA: 0.16, txMA: 0.55, txSA: 0.35, acA: 0.10,
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
const lerp  = (a, b, t) => a + (b - a) * t
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const lerpC = (a, b, t) => a.map((v, i) => Math.round(lerp(v, b[i], t)))

// Update all CSS vars in ONE call → atomic, no 1-frame gaps
function applyAtmosphere(p) {
  const r   = document.documentElement
  const bg  = lerpC(D.bg,  L.bg,  p)
  const sf  = lerpC(D.sf,  L.sf,  p)
  const sf2 = lerpC(D.sf2, L.sf2, p)
  const tx  = lerpC(D.tx,  L.tx,  p)
  const bd  = lerpC(D.bd,  L.bd,  p)

  // Batch all setProperty in one function → single CSS recalc
  r.style.setProperty('--bg',           `rgb(${bg})`)
  r.style.setProperty('--surface',      `rgb(${sf})`)
  r.style.setProperty('--surface-2',    `rgb(${sf2})`)
  r.style.setProperty('--text',         `rgb(${tx})`)
  r.style.setProperty('--text-muted',   `rgba(${tx},${lerp(D.txMA, L.txMA, p).toFixed(3)})`)
  r.style.setProperty('--text-subtle',  `rgba(${tx},${lerp(D.txSA, L.txSA, p).toFixed(3)})`)
  r.style.setProperty('--border',       `rgba(${bd},${lerp(D.bdA,  L.bdA,  p).toFixed(3)})`)
  r.style.setProperty('--border-hover', `rgba(${bd},${lerp(D.bdHA, L.bdHA, p).toFixed(3)})`)
  r.style.setProperty('--accent-dim',   `rgba(37,99,255,${lerp(D.acA, L.acA, p).toFixed(3)})`)
  // Note: body { background-color: var(--bg) } in globals.css handles body bg
  // → NO document.body.style.backgroundColor here → zero 1-frame gap
}

// ═══════════════════════════════════════════════════════════════
// GEOMETRY CALCULATION
// ─────────────────────────────────────────────────────────────
// Pure scroll math — reads window.scrollY and stored positions.
// No ScrollTrigger, no events, no global state conflicts.
//
// 🎨 TRANSITION ZONES:
//
// Dark → Light:
//   start = marqueeTop - wh * 2.5  (during Introduction cards exit)
//   end   = marqueeTop - wh * 0.4  (Marquee scrolled ~60% through viewport)
//
// Light → Dark:
//   start = inspTop - wh           (Inspiration enters from bottom)
//   end   = inspTop - wh * 0.3     (Inspiration top at 30% viewport)
//
// 🎨 To adjust timing, change the multipliers above.
// ═══════════════════════════════════════════════════════════════
function buildCalculator(positions) {
  return function calculateAtmosphere() {
    const { wh, marqueeTop, inspTop } = positions
    if (!wh || !marqueeTop) return 0

    const sy = window.scrollY

    // ── Dark → Light ─────────────────────────────────────────
    const d2lStart = marqueeTop - wh * 2.5  // start: during intro cards exit
    const d2lEnd   = marqueeTop - wh * 0.4  // end: midpoint of marquee
    const p1 = clamp((sy - d2lStart) / (d2lEnd - d2lStart), 0, 1)

    // ── Light → Dark ─────────────────────────────────────────
    const l2dStart = inspTop - wh * 0.85     // inspiration enters earlier, faster transition
    const l2dEnd   = inspTop - wh * 0.45     // faster collapse into dark theme
    const p2 = clamp((sy - l2dStart) / (l2dEnd - l2dStart), 0, 1)

    // Combine: d2l first, l2d overrides when active
    let atmosphere = p1
    if (p2 > 0) atmosphere = 1 - p2

    return clamp(atmosphere, 0, 1)
  }
}

// ═══════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════
export function Smoothatmosphere({ children }) {
  const curRef  = useRef(0)
  const rafRef  = useRef(null)
  const calcRef = useRef(null)

  useEffect(() => {
    // ── Measure positions once at mount ──────────────────────
    // By the time this runs, GSAP has already set up all pins
    // and created spacer divs → offsetTop values are correct
    function measure() {
      const wh       = window.innerHeight
      const marqueeEl = document.getElementById('section-marquee')
      const inspEl    = document.getElementById('inspiration')

      const positions = {
        wh,
        // offsetTop is correct even for elements after pinned sections
        // because GSAP pin spacers push them to the right position
        marqueeTop: marqueeEl ? marqueeEl.offsetTop : 0,
        inspTop:    inspEl    ? inspEl.offsetTop    : 0,
      }

      calcRef.current = buildCalculator(positions)
    }

    measure()

    // Re-measure on resize (viewport height changes affect the math)
    const onResize = () => {
      cancelAnimationFrame(rafRef.current)
      measure()
      rafRef.current = requestAnimationFrame(tick)
    }
    window.addEventListener('resize', onResize, { passive: true })

    // ── RAF smooth lerp loop ──────────────────────────────────
    // Speed 0.08: smooth but responsive.
    // Increase for snappier feel, decrease for more floaty.
    // Only updates CSS vars when value actually changed → no wasted paints.
    function tick() {
      if (calcRef.current) {
        const target = calcRef.current()
        const diff   = target - curRef.current
        if (Math.abs(diff) > 0.0003) {
          curRef.current += diff * 0.16
          applyAtmosphere(curRef.current)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <>{children}</>
}