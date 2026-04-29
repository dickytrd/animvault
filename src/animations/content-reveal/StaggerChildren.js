import { gsap } from '@/lib/gsap'

export function StaggerChildren({ element, controls, onComplete }) {
  const children = Array.from(element.children)
  gsap.set(children, { clearProps: 'all' })
  return gsap.from(children, {
    y: controls.yAmount,
    opacity: 0,
    duration: controls.duration,
    stagger: controls.stagger,
    ease: controls.ease,
    onComplete,
  })
}
