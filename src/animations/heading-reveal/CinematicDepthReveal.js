import { gsap, SplitText } from '@/lib/gsap'

/**
 * CinematicDepthReveal
 * ────────────────────
 * Characters fly in from "depth" (scaled down, blurred, low opacity)
 * and settle into sharp focus. Creates a premium editorial/cinematic feel.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, blurAmount, scaleFrom, depthY, ease }
 * @param {function}    onComplete
 */
export function CinematicDepthReveal({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, blurAmount = 12, scaleFrom = 0.6, depthY = 40, ease } = controls

  // 🔁 Cleanup previous
  if (splitRef.current) {
    gsap.killTweensOf(splitRef.current.chars)
    gsap.set(splitRef.current.chars, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  // Apply perspective for subtle 3D depth feel
  gsap.set(element, { perspective: 800, transformStyle: 'preserve-3d' })

  // ✂️ Split into characters
  splitRef.current = new SplitText(element, { type: 'chars' })
  const chars = splitRef.current.chars

  // 🎭 Set initial cinematic state
  chars.forEach((char) => {
    const text = char.textContent.trim()
    if (!text) {
      char.style.display = 'inline-block'
      char.style.width = '0.3em'
      return
    }

    char.style.display = 'inline-block'
    char.style.willChange = 'transform, filter, opacity'
    char.style.backfaceVisibility = 'hidden'
    char.style.transformOrigin = 'center center'

    gsap.set(char, {
      scale: scaleFrom,
      y: depthY,
      opacity: 0,
      filter: `blur(${blurAmount}px)`
    })
  })

  //  Animate to sharp focus
  return gsap.to(chars, {
    scale: 1,
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    duration,
    stagger,
    ease,
    onComplete,
  })
}