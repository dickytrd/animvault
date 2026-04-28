import { gsap, SplitText } from '@/lib/gsap'

/**
 * LetterCollapse
 * ──────────────
 * Characters start spread apart (each offset by its index distance from center)
 * then rush together to their natural position.
 * Creates a "letters assembling" feel — distinct from all other animations.
 *
 * Uses a function-based `x` value: chars on the left start left of natural pos,
 * chars on the right start right. Center char stays put.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, spread, ease }
 * @param {function}    onComplete
 */
export function LetterCollapse({ element, splitRef, controls, onComplete }) {
  const { duration, spread, ease } = controls

  if (splitRef.current) {
    gsap.set(splitRef.current.chars, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  splitRef.current = new SplitText(element, { type: 'chars,words' })

  splitRef.current.words.forEach((w) => {
    w.style.display = 'inline-block'
    w.style.verticalAlign = 'top'
  })

  const chars = splitRef.current.chars
  const total = chars.length
  const center = (total - 1) / 2

  return gsap.from(chars, {
    // Each char offset proportional to its distance from center
    x: (i) => (i - center) * spread,
    opacity: 0,
    duration,
    // No stagger — all arrive at same time, from different distances
    stagger: 0,
    ease,
    onComplete,
  })
}