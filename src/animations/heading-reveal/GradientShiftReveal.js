import { gsap } from '@/lib/gsap'

/**
 * GradientShiftReveal — Pure Shimmer & Crossfade
 * No scale, no pop-up. Just a beautiful gradient sweep 
 * that settles into a solid color.
 */
export function GradientShiftReveal({ element, splitRef, controls, onComplete }) {
  const { duration, ease, shimmerColor = '#38bdf8', finalColor = '#ffffff', angle = 90, width = 200 } = controls

  // 🔁 Cleanup previous tweens
  gsap.killTweensOf(element)
  if (splitRef.current) {
    splitRef.current.revert()
    splitRef.current = null
  }

  //  Initial state: Text transparent, Gradient ready at left edge
  gsap.set(element, {
    color: 'transparent', // Text is invisible, only gradient shows
    backgroundImage: `linear-gradient(${angle}deg, transparent 0%, ${shimmerColor} 40%, transparent 100%)`,
    backgroundSize: `${width}% 100%`,
    backgroundPosition: '-100% 0', // Start off-screen left
    backgroundClip: 'text',
    webkitBackgroundClip: 'text',
    willChange: 'background-position, color',
    force3D: true
  })

  const tl = gsap.timeline({ onComplete })

  // 1. Sweep: Gradient moves from Left to Right
  tl.to(element, {
    backgroundPosition: '200% 0', // Move off-screen right
    duration: duration * 0.8,
    ease: 'power2.inOut'
  })

  // 2. Fill: Text color fades to solid (Overlaps the sweep)
  // This creates the effect that the shimmer "leaves behind" the solid color
  tl.to(element, {
    color: finalColor,
    duration: duration * 0.6,
    ease: 'power2.inOut'
  }, '<+=0.1') // Start 0.1s after the sweep begins

  // 3. Cleanup: Remove gradient only AFTER color transition is done
  // This prevents the "flicker"
  tl.call(() => {
    gsap.set(element, {
      backgroundImage: 'none',
      backgroundClip: 'border-box',
      willChange: 'auto'
    })
  })

  return tl
}