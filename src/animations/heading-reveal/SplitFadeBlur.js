import { gsap, SplitText } from '@/lib/gsap'

/**
 * SplitFadeBlur
 * ─────────────
 * Each character fades in (opacity 0→1) while simultaneously unblurring.
 * The `filter: blur()` property is GPU-accelerated on modern browsers.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, blurAmount, ease }
 * @param {function}    onComplete
 */
export function SplitFadeBlur({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, blurAmount, ease } = controls

  if (splitRef.current) {
    // Clear blur from previous run so revert doesn't leave residual filter
    gsap.set(splitRef.current.chars, { clearProps: 'filter,opacity' })
    splitRef.current.revert()
    splitRef.current = null
  }

  splitRef.current = new SplitText(element, { type: 'chars' })
  const chars = splitRef.current.chars

  return gsap.fromTo(
    chars,
    {
      opacity: 0,
      filter: `blur(${blurAmount}px)`,
    },
    {
      opacity: 1,
      filter: 'blur(0px)',
      duration,
      stagger,
      ease,
      onComplete,
    }
  )
}
