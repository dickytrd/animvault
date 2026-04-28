import { gsap, SplitText } from '@/lib/gsap'

/**
 * SplitFadeOpacity
 * ────────────────
 * Each character fades in from opacity 0 → 1 with stagger.
 *
 * @param {HTMLElement} element   - The heading DOM node to animate
 * @param {object}      splitRef  - React ref to store SplitText instance (for cleanup)
 * @param {object}      controls  - { duration, stagger, ease }
 * @param {function}    onComplete
 * @returns {gsap.core.Tween}
 */
export function SplitFadeOpacity({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, ease } = controls

  // ① Always revert previous split before re-splitting
  //   (prevents DOM corruption on rapid control changes)
  if (splitRef.current) {
    splitRef.current.revert()
    splitRef.current = null
  }

  // ② Split into individual characters
  splitRef.current = new SplitText(element, { type: 'chars' })
  const chars = splitRef.current.chars

  // ③ Animate fromTo for predictable start state every time
  return gsap.fromTo(
    chars,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      stagger,
      ease,
      onComplete,
    }
  )
}
