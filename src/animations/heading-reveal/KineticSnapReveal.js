import { gsap, SplitText } from '@/lib/gsap'

/**
 * KineticSnapReveal
 * ─────────────────
 * Characters start displaced & scaled down, then snap into place
 * with elastic/bouncy easing. Pure transform + opacity = 100% GPU, 0 repaint.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, displacement, scaleFrom, ease }
 * @param {function}    onComplete
 */
export function KineticSnapReveal({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, displacement = 80, scaleFrom = 0.7, ease } = controls

  // 🔁 Cleanup previous
  if (splitRef.current) {
    gsap.killTweensOf(splitRef.current.chars)
    gsap.set(splitRef.current.chars, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  // ✂️ Split into characters
  splitRef.current = new SplitText(element, { type: 'chars' })
  const chars = splitRef.current.chars

  // 🔑 Performance: Force GPU layer + prevent sub-pixel jitter
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
    char.style.transform = 'translate3d(0,0,0)' // GPU promotion
    char.style.transformOrigin = 'center center'
  })

  //  Pre-calculate random directions (avoids function calls during tween)
  const directions = chars.map(() => ({
    x: (Math.random() > 0.5 ? 1 : -1) * displacement * (0.6 + Math.random() * 0.4),
    y: (Math.random() > 0.5 ? 1 : -1) * displacement * (0.6 + Math.random() * 0.4),
  }))

  //  Initial state
  gsap.set(chars, {
    x: (i) => directions[i].x,
    y: (i) => directions[i].y,
    scale: scaleFrom,
    opacity: 0,
  })

  // 🚀 Animate snap
  return gsap.to(chars, {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    duration,
    stagger,
    ease,
    onComplete,
  })
}