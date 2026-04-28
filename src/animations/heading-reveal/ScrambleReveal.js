import { gsap, ScrambleText } from '@/lib/gsap'

/**
 * ScrambleReveal
 * ──────────────
 * Uses GSAP ScrambleTextPlugin — random characters replace the text
 * before gradually revealing the real content left-to-right.
 * No SplitText needed; works on the whole element.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef   - unused but kept for API consistency; set to null
 * @param {object}      controls   - { duration, chars, speed, revealDelay }
 * @param {function}    onComplete
 */
export function ScrambleReveal({ element, splitRef, controls, onComplete }) {
  const { duration, chars, speed, revealDelay } = controls

  // Revert any previous SplitText (safety — in case switching from another anim)
  if (splitRef.current) {
    splitRef.current.revert()
    splitRef.current = null
  }

  // Store original text before we do anything
  const originalText = element.dataset.originalText || element.textContent
  element.dataset.originalText = originalText

  // Reset to original text first (ScrambleText mutates innerHTML)
  element.textContent = originalText

  return gsap.to(element, {
    duration,
    scrambleText: {
      text:         '{original}', // reveal the existing text
      chars,
      speed,
      revealDelay,
      tweenLength:  false,
    },
    ease: 'none',
    onComplete,
  })
}