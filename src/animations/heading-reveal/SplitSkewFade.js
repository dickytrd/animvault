import { gsap, SplitText } from '@/lib/gsap'

/**
 * SplitSkewFade
 * ─────────────
 * Each word fades in while skewing from skewX + y offset → natural position.
 * Creates a dynamic, editorial motion feel.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, skewAmount, yAmount, ease }
 * @param {function}    onComplete
 */
export function SplitSkewFade({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, skewAmount, yAmount, ease } = controls

  if (splitRef.current) {
    gsap.set(splitRef.current.words, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  // Split per word — skew per-word feels best for this effect
  splitRef.current = new SplitText(element, { type: 'words' })
  const words = splitRef.current.words

  return gsap.fromTo(
    words,
    {
      opacity: 0,
      skewX: skewAmount,
      y: yAmount,
    },
    {
      opacity: 1,
      skewX: 0,
      y: 0,
      duration,
      stagger,
      ease,
      onComplete,
    }
  )
}
