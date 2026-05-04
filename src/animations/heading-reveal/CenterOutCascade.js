import { gsap, SplitText } from '@/lib/gsap'

/**
 * CenterOutCascade
 * ───────────────
 * Characters reveal outward from the center with elegant stagger.
 * Uses GSAP's native stagger.from: 'center' for perfect symmetry.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, yFrom, scaleFrom, ease }
 * @param {function}    onComplete
 */
export function CenterOutCascade({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, yFrom = 40, scaleFrom = 0.9, ease } = controls

  // 🔁 Cleanup
  if (splitRef.current) {
    gsap.killTweensOf(splitRef.current.chars)
    gsap.set(splitRef.current.chars, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  // ✂️ Split
  splitRef.current = new SplitText(element, { type: 'chars' })
  const chars = splitRef.current.chars

  // 🔑 Performance setup
  chars.forEach((char) => {
    const text = char.textContent.trim()
    if (!text) {
      char.style.display = 'inline-block'
      char.style.width = '0.3em'
      return
    }
    char.style.display = 'inline-block'
    char.style.willChange = 'transform, opacity'
    char.style.backfaceVisibility = 'hidden'
    char.style.transformOrigin = 'center center'
  })

  //  Animate from center outward
  return gsap.from(chars, {
    y: yFrom,
    scale: scaleFrom,
    opacity: 0,
    duration,
    stagger: { each: stagger, from: 'center' }, // 🔑 GSAP magic
    ease,
    onComplete,
  })
}