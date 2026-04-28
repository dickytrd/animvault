import { gsap, SplitText } from '@/lib/gsap'

/**
 * SlideFromLeft
 * ─────────────
 * Each word slides in from the left (negative x) with opacity.
 * Stagger creates a cascading horizontal entrance — editorial feel.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, xAmount, ease }
 * @param {function}    onComplete
 */
export function SlideFromLeft({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, xAmount, ease } = controls

  if (splitRef.current) {
    gsap.set(splitRef.current.words, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  splitRef.current = new SplitText(element, { type: 'words' })
  const words = splitRef.current.words

  words.forEach((w) => (w.style.display = 'inline-block'))

  return gsap.from(words, {
    x:       -xAmount,
    opacity: 0,
    duration,
    stagger,
    ease,
    onComplete,
  })
}