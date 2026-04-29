import { gsap } from '@/lib/gsap'

/**
 * ClipSlideCards
 * ──────────────
 * Each card wipes in left→right via clipPath with stagger.
 * Dramatic reveal — works best with stagger 0.15–0.25s.
 */
export function ClipSlideCards({ element, controls, onComplete }) {
  const cards = Array.from(element.children)

  gsap.set(cards, { clipPath: 'inset(0 100% 0 0)' })

  return gsap.to(cards, {
    clipPath: 'inset(0 0% 0 0)',
    duration: controls.duration,
    stagger:  controls.stagger,
    ease:     controls.ease,
    onComplete,
  })
}
