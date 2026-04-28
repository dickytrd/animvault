import { gsap, SplitText } from '@/lib/gsap'

/**
 * FadeSubtle
 * ──────────
 * The most minimal animation in the collection.
 * Per line — tiny y offset (8–20px) + gentle opacity.
 * Designed for refined, editorial contexts where less is more.
 * Long duration, gentle ease.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, yAmount, ease }
 * @param {function}    onComplete
 */
export function FadeSubtle({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, yAmount, ease } = controls

  if (splitRef.current) {
    gsap.set(splitRef.current.lines, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  splitRef.current = new SplitText(element, { type: 'lines' })
  const lines = splitRef.current.lines

  return gsap.from(lines, {
    y:       yAmount,
    opacity: 0,
    duration,
    stagger,
    ease,
    onComplete,
  })
}