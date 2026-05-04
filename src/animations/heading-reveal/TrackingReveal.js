import { gsap, SplitText } from '@/lib/gsap'

/**
 * TrackingReveal
 * ──────────────
 * Characters start with wide letter-spacing + opacity 0,
 * then converge to normal spacing with stagger cascade.
 * Premium editorial feel — lightweight & performant.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, trackingFrom, yFrom, ease }
 * @param {function}    onComplete
 */
export function TrackingReveal({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, trackingFrom = 200, yFrom = 30, ease } = controls

  // 🔁 Cleanup
  if (splitRef.current) {
    gsap.killTweensOf(splitRef.current.chars)
    gsap.set(splitRef.current.chars, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  // ✂️ Split into characters
  splitRef.current = new SplitText(element, { type: 'chars' })
  const chars = splitRef.current.chars

  // 🔑 Performance: Force GPU layer
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
    char.style.transform = 'translate3d(0,0,0)'
  })

  // 🎬 Initial state: wide tracking + displaced Y + invisible
  gsap.set(chars, {
    x: (i) => i * trackingFrom, // Each char starts far apart
    y: yFrom,
    opacity: 0,
  })

  // 🚀 Animate converge to normal position
  return gsap.to(chars, {
    x: 0,
    y: 0,
    opacity: 1,
    duration,
    stagger,
    ease,
    onComplete,
  })
}