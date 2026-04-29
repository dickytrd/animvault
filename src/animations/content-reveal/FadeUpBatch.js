import { gsap } from '@/lib/gsap'

/**
 * FadeUpBatch
 * ───────────
 * All cards reveal simultaneously — one unified motion.
 * Subtle y + opacity, no stagger. Clean editorial feel.
 */
export function FadeUpBatch({ element, controls, onComplete }) {
  gsap.set(element, { clearProps: 'all' })

  return gsap.from(element, {
    y:        controls.yAmount,
    opacity:  0,
    duration: controls.duration,
    ease:     controls.ease,
    onComplete,
  })
}
