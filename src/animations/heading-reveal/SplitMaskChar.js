import { gsap, SplitText } from '@/lib/gsap'

/**
 * SplitMaskChar
 * ─────────────
 * Each character slides up from yPercent: yOffset → 0.
 * The parent word element gets overflow:hidden to create the mask.
 *
 * IMPORTANT: SplitText manages its word <span> elements — when revert() is
 * called, those spans (and our inline overflow:hidden style) are removed
 * entirely. No manual cleanup needed for the mask styles.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, yOffset, ease }
 * @param {function}    onComplete
 */
export function SplitMaskChar({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, yOffset, ease } = controls

  if (splitRef.current) {
    gsap.set(splitRef.current.chars, { clearProps: 'transform' })
    splitRef.current.revert()
    splitRef.current = null
  }

  // Split into chars AND words — words become the mask containers
  splitRef.current = new SplitText(element, { type: 'chars,words' })

  // Apply overflow:hidden to each word — this IS the mask
  splitRef.current.words.forEach((word) => {
    word.style.display = 'inline-block'
    word.style.overflow = 'hidden'
    word.style.verticalAlign = 'top'
    // Slight padding so descenders aren't clipped
    word.style.paddingBottom = '0.05em'
  })

  const chars = splitRef.current.chars

  return gsap.fromTo(
    chars,
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
