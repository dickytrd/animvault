import { gsap } from '@/lib/gsap'

export function ClipReveal({ element, controls, onComplete }) {
  gsap.set(element, { clipPath: 'inset(0 100% 0 0)', opacity: 1 })
  return gsap.to(element, {
    clipPath: 'inset(0 0% 0 0)',
    duration: controls.duration,
    ease: controls.ease,
    onComplete,
  })
}
