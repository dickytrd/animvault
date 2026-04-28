import { gsap, SplitText } from '@/lib/gsap'

/**
 * SplitMaskWord
 * ─────────────
 * Each word slides up from yPercent: yOffset → 0.
 * Lines act as the overflow:hidden mask container.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, yOffset, ease }
 * @param {function}    onComplete
 */
export function SplitMaskWord({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, yOffset, ease } = controls

  if (splitRef.current) {
    gsap.set(splitRef.current.words, { clearProps: 'transform' })
    splitRef.current.revert()
    splitRef.current = null
  }

  // Split into words AND lines — lines become the mask containers
  splitRef.current = new SplitText(element, { type: 'words,lines' })

  // Apply overflow:hidden to each line — this IS the mask
  splitRef.current.lines.forEach((line) => {
    line.style.display = 'block'
    line.style.overflow = 'hidden'
    // Slight padding so descenders aren't clipped
    line.style.paddingBottom = '0.08em'
  })

  const words = splitRef.current.words

  return gsap.fromTo(
    words,
    { yPercent: yOffset },
    {
      yPercent: 0,
      duration,
      stagger,
      ease,
      onComplete,
    }
  )
}
