import { gsap } from '@/lib/gsap'

export function ScaleReveal({ element, controls, onComplete }) {
  gsap.set(element, { clearProps: 'all' })
  return gsap.from(element, {
    scale: controls.scaleFrom,
    opacity: 0,
    duration: controls.duration,
    ease: controls.ease,
    onComplete,
  })
}
