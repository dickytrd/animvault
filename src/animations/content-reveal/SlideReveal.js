import { gsap } from '@/lib/gsap'

export function SlideReveal({ element, controls, onComplete }) {
  gsap.set(element, { clearProps: 'all' })
  return gsap.from(element, {
    x: -controls.xAmount,
    opacity: 0,
    duration: controls.duration,
    ease: controls.ease,
    onComplete,
  })
}
