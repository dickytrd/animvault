import { gsap } from '@/lib/gsap'

/**
 * StaggerCards
 * ────────────
 * Each direct child card fades up with stagger.
 * Works great for 3-col card grids.
 */
export function StaggerCards({ element, controls, onComplete }) {
  const cards = Array.from(element.children)
  gsap.set(cards, { clearProps: 'all' })

  return gsap.from(cards, {
    y:       controls.yAmount,
    opacity: 0,
    duration:controls.duration,
    stagger: controls.stagger,
    ease:    controls.ease,
    onComplete,
  })
}
