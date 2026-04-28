import { gsap, SplitText } from '@/lib/gsap'

/**
 * ScaleFade
 * ─────────
 * Each word scales up from a small size while fading in.
 * Feels energetic and bold — good for hero headings.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, scaleFrom, ease }
 * @param {function}    onComplete
 */
export function ScaleFade({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, scaleFrom, ease } = controls

  if (splitRef.current) {
    gsap.set(splitRef.current.words, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  splitRef.current = new SplitText(element, { type: 'words' })
  const words = splitRef.current.words

  words.forEach((w) => (w.style.display = 'inline-block'))

  return gsap.from(words, {
    scale:   scaleFrom,
    opacity: 0,
    duration,
    stagger,
    ease,
    onComplete,
  })
}