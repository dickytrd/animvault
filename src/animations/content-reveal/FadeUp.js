import { gsap } from '@/lib/gsap'

export function FadeUp({ element, controls, onComplete }) {
  gsap.set(element, { clearProps: 'all' })
  return gsap.from(element, {
    y: controls.yAmount,
    opacity: 0,
    duration: controls.duration,
    ease: controls.ease,
    onComplete,
  })
}
