import { gsap } from '@/lib/gsap'

/**
 * AuroraShimmer
 * ─────────────
 * A luminous gradient wave sweeps across the text horizontally.
 * Uses background-clip: text + background-position animation.
 * Lightweight, modern, high-tech vibe.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef  - Kept for consistency, not strictly needed
 * @param {object}      controls  - { duration, ease, shimmerColor, angle, width }
 * @param {function}    onComplete
 */
export function AuroraShimmer({ element, splitRef, controls, onComplete }) {
  const { duration, ease, shimmerColor = '#38bdf8', angle = 90, width = 200 } = controls

  // 🔁 Cleanup previous tweens & split
  gsap.killTweensOf(element)
  if (splitRef.current) {
    splitRef.current.revert()
    splitRef.current = null
  }

  // 🎨 Build gradient string
  const gradient = `linear-gradient(${angle}deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`

  // 🎬 Initial state
  gsap.set(element, {
    backgroundImage: gradient,
    backgroundSize: `${width}% 100%`,
    backgroundPosition: `-${width}% 0`,
    backgroundClip: 'text',
    webkitBackgroundClip: 'text',
    color: 'transparent', // Hide solid text, show gradient
    willChange: 'background-position',
    transform: 'translate3d(0,0,0)', // Force GPU layer
  })

  // 🚀 Animate sweep
  const tl = gsap.timeline({ onComplete })
  
  tl.to(element, {
    backgroundPositionX: '100%',
    duration,
    ease,
  })

  // Optional: Revert to solid color after animation (uncomment if needed)
  // tl.call(() => {
  //   gsap.set(element, { color: 'var(--text)', backgroundImage: 'none', backgroundClip: 'border-box' })
  // })

  return tl
}